import { Injectable } from '@angular/core';
import { BackgroundGeolocation, Network, BackgroundMode,BatteryStatusResponse,BackgroundGeolocationConfig,Device } from 'ionic-native';
import { DataStore } from './data-store';
import { AESEncryptor } from './aes-encryptor';
import { Location, Settings } from '../app/models';
import {MyApp} from '../app/app.component';
import 'rxjs/add/operator/filter';
import { Response, Request, Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';


@Injectable()
export class LocationTracker {

  public trackingRunning:boolean=true;
  public nearbyList:Location[];
  public nearbyURL:string="http://192.168.1.184:80/locations/GetNearByDevices";

  //data needed to configure the tracker service
  public config = {
    desiredAccuracy: 10,
    stationaryRadius: 10,
    distanceFilter: 10,
    debug: false,
    interval: 20000
  };

  public canUpdateInterval:boolean=false;
  public useSpeed: boolean = false;
  public useBatteryLife: boolean = false;
  public minInterval:number=0;

  private lastLocation: Location = new Location('', 0, 0, '', 0);
  private firstTime: boolean = true;

  constructor(private db: DataStore,private http:Http,private encryptor:AESEncryptor) { }

  public StartTracking() {

    BackgroundMode.enable();
    console.log('Starting!');
    BackgroundGeolocation.configure((location) => this.TrackerConfigCallback(location),
      (err) => {
        console.log(err);
      }, this.config);

    //turning on background Geolocation
    BackgroundGeolocation.start();

    this.trackingRunning=true;
    


  }

  public StopTracking() {


    BackgroundMode.disable();
    console.log('Stopped Tracking.');
    BackgroundGeolocation.stop();
    this.trackingRunning=false;
  }

  public GetLocations(): Promise<any> {
    return this.db.GetAllLocations();
  }

  public DeleteLocations() {
    this.db.DeleteAllLocations();
  }

  public EditConfigurations(data: Settings) {


    this.config['desiredAccuracy'] = data.DesiredAccuracy;
    this.config['stationaryRadius'] = data.StationaryRadius;
    this.config['distanceFilter'] = data.DistanceFilter;
    this.config['debug'] = data.Debug;
    this.config['interval']=data.MinimumInterval;

    this.useBatteryLife = data.UseBatteryLife;
    this.useSpeed = data.UseSpeed;
    this.minInterval=data.MinimumInterval;


    //this is neccesery for interval editing options
    this.canUpdateInterval=true;

    //applying changes
    BackgroundGeolocation.configure((location)=>this.TrackerConfigCallback(location),(err)=>{console.log(err);},this.config);
    

    console.log('Done editing configurations');

  }

  public UpdateInterval(batteryStatus:BatteryStatusResponse){
    

    if (this.useSpeed && this.useBatteryLife)
    {
      console.log("Updating interval to use speed and battery life.");

      if (this.lastLocation.Speed==0)
      {
        console.log("Speed is zero, no update for the interval");
        return;
      }

      let interval: number = this.minInterval + (10 - (9/80)*this.lastLocation.Speed) + ((49/4)-(9/80)*batteryStatus.level);
      console.log(`Last Speed was ${this.lastLocation.Speed}`);
      console.log(`Interval is ${interval}ms`);

     

      this.config['interval'] = interval;
    }
    else if (this.useBatteryLife)
    {
      console.log("Updating interval to use battery life only.");
      if (this.lastLocation.Speed==0)
      {
        console.log("Speed is zero, no update for the interval");
        return;
      }
      let interval: number = this.minInterval +  ((49/4)-(9/80)*batteryStatus.level);
      console.log(`Last Speed was ${this.lastLocation.Speed}`);
      console.log(`Interval is ${interval}ms`);

      

      this.config['interval'] = interval;
    }
    else if (this.useSpeed)
    {
      console.log("Updating interval to use speed only");
      if (this.lastLocation.Speed==0)
      {
        console.log("Speed is zero, no update for the interval");
        return;
      }
      let interval:number = this.minInterval + (10 - (9/80)*this.lastLocation.Speed);
      console.log(`Last Speed was ${this.lastLocation.Speed}`);
      console.log(`Interval is ${interval}ms`);


      this.config['interval']=interval;
    }
    else
      {
        console.log("Updating interval to use minimum interval only.");
        this.config['interval']=this.minInterval;
      }

    BackgroundGeolocation.configure((location)=>this.TrackerConfigCallback,(err)=>{console.log(err)},this.config);
}

  private CalculateSpeed(one: Location, two: Location): number {
    if (one.Latitude == two.Latitude && one.Longitude == two.Longitude)
      return 0;
    
    let time:number = this.GetTimeDifference(one,two);
    
    if (time==0)
      return 0;

    return (this.GetDistanceDifferenceInKM(one, two) * 1000) / (time / 1000);
  }


  private GetDistanceDifferenceInKM(one: Location, two: Location): number {

    let R = 6371; // Radius of the earth in km
    let dLat = this.Deg2rad(Math.abs(two.Latitude - one.Latitude));  // deg2rad below
    let dLon = this.Deg2rad(Math.abs(two.Longitude - one.Longitude));
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.Deg2rad(one.Latitude)) * Math.cos(this.Deg2rad(two.Latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;

  }

  private Deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  private GetTimeDifference(one: Location, two: Location): number {
    return (Math.abs(+new Date(this.FixDate(one.GeneratingTime)) - +new Date(this.FixDate(two.GeneratingTime))));
  }

  private FixDate(temp: string):string {
    let date: string[] = temp.split(',')[0].split('/');
    return date[1] + '/' + date[0] + '/' + date[2] + ',' + temp.split(',')[1];
  }

  private TrackerConfigCallback(location: any) {
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

    let time: Date = new Date();
    let timeString: string = time.toLocaleString();
    let currentLocation: Location = new Location('', location.longitude, location.latitude, timeString, 0);

    //first location has no speed
    if (this.firstTime)
      this.firstTime =false;
    else
      currentLocation.Speed = this.CalculateSpeed(currentLocation, this.lastLocation);
    
    if (currentLocation.Speed!=0)
      this.db.InsertLocation(currentLocation);


    //saving last location so we can calculate the speed of the next movement
    this.lastLocation.Latitude = location.latitude;
    this.lastLocation.Longitude = location.longitude;
    this.lastLocation.GeneratingTime = timeString;
    this.lastLocation.Speed = currentLocation.Speed;
    this.lastLocation.UUID = Device.uuid;


    
    
  }

  public GetNearbyDevices():Promise<any>{

    return new Promise<Location[]>((resolve,reject)=>{

      let requestHeaders: Headers = this.PrepareHeaders(this.lastLocation);
      let options = new RequestOptions({ headers: requestHeaders });

      console.log("Sending get nearby devices Request..");

      this.http.post(this.nearbyURL,JSON.stringify(this.lastLocation),options).map(res=><Location[]>res.json()).toPromise().then(data=>{
      if (data.length>0)
        {
          console.log("Data is recieved");
         resolve(data);
      }
      else
      {
        let locations:Location[] = new Array<Location>();
        locations.push(new Location("There's no nearby devices. :(",0,0,"",0));
        resolve(locations);
      }}).catch(err=>{
      reject(err);
    });


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
