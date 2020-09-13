import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite, BatteryStatus, BatteryStatusResponse, Network, Device } from 'ionic-native';
import { LocationTracker } from '../providers/location-tracker';
import { Observable } from 'rxjs/Observable';
import { Settings, Location } from './models';
import { Response, Request, Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { HomePage } from '../pages/home/home';
import { AESEncryptor } from '../providers/aes-encryptor';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  //api url
  private URL:string="http://192.168.1.184:80/locations/post";

  //subscribtions
  public static batterySubscription: any;
  public static networkSubscriptionOnConnect: any;
  public static networkSubscriptionOnDisconnect: any;
  public static trackingRunning: boolean = true;

  constructor(platform: Platform, private locationTracker: LocationTracker, private http: Http, private encryptor: AESEncryptor) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();



      //creating table
      SQLite.openDatabase({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLite) => {

        //opened database successfully
        db.executeSql(`CREATE TABLE IF NOT EXISTS Locations(
        UUID nvarchar(100),
        Longitude REAL,
        Latitude REAL,
        Speed REAL,
        GeneratingTime nvarchar(20)
      )`, {});
      }, (err) => {
        //error while opening database
        console.log(err);
      });


      //disable back button so it cannot close the app
      platform.backButton = null;

      //starting the tracking service .. required to start here from ionic docs
      locationTracker.StartTracking();


      //watching battery status changes
      MyApp.batterySubscription = BatteryStatus.onChange().subscribe((status: BatteryStatusResponse) => {

        if (locationTracker.canUpdateInterval)
          locationTracker.UpdateInterval(status);

        if (status.level == 20)
          locationTracker.StopTracking();
        console.log(status.level + "------------" + status.isPlugged);

      });



      //watching network changes and send data when we have WIFI connection
      let connectCounter: number = 0;
      MyApp.networkSubscriptionOnConnect = Network.onConnect().subscribe(() => {
        if (Network.type === 'wifi' && connectCounter == 0) {
          connectCounter++;

          this.SendData();

        }
      }); // end of subscribe function


      Network.onDisconnect().subscribe(() => {

        //if connections is 3g 4g etc.
        if (Network.type !== 'wifi' && Network.type !== 'none') {
          locationTracker.StartTracking();
          connectCounter = 0;
        }

        //if no connection and tracking is not running
        else if (Network.type === 'none' && !locationTracker.trackingRunning) {
          locationTracker.StartTracking();
          connectCounter = 0;
        }
      });

    });


  }

  private SendData(): void {

    this.locationTracker.StopTracking();
    this.locationTracker.GetLocations().then((data) => {

      if (data != null) {

        let locations: Location[] = data;
        let requestHeaders: Headers = this.PrepareHeaders(locations[0]);
        let options = new RequestOptions({ headers: requestHeaders });


        console.log(locations);

        console.log('Sending Data..');
        this.http.post(this.URL, JSON.stringify(locations), options).map(res => <Settings>res.json()).toPromise().then((data) => {


          //editing configurations
          this.locationTracker.EditConfigurations(data);


          //removing all stored data after trasfering it to the server
          this.locationTracker.DeleteLocations();
          this.locationTracker.StartTracking();
        }).catch((err) => {

          //handle bad requests here
          console.log(err);
        });

      } else {
        console.log('There\'s no data to send.');
      }

    }, (err) => {
      console.log('There was an error in getting the locations from the database.');
    });

  }

  private PrepareHeaders(temp: Location): Headers {

    let time: string = temp.GeneratingTime;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("time", temp.GeneratingTime);
    time = time.substr(0, 16);
    let encryptedPassword: string = this.encryptor.Encrypt(this.encryptor.primaryPassword, Device.uuid, Device.uuid);
    let encryptedUUID: string = this.encryptor.Encrypt(Device.uuid, time, time);
    headers.append("Password", encryptedPassword);
    headers.append("CustomEncryptor", encryptedUUID);

    return headers;

  }
}






