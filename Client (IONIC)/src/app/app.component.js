var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite, BatteryStatus, Network } from 'ionic-native';
import { LocationTracker } from '../providers/location-tracker';
import { Headers, RequestOptions, Http } from '@angular/http';
import { HomePage } from '../pages/home/home';
var MyApp = MyApp_1 = (function () {
    function MyApp(platform, locationTracker, http) {
        this.rootPage = HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            //creating table
            SQLite.openDatabase({
                name: 'data.db',
                location: 'default'
            }).then(function (db) {
                //opened database successfully
                db.executeSql("CREATE TABLE Locations(\n        Name nvarchar(100),\n        Long nvarchar(100),\n        Latit nvarchar(100)\n      )", {});
            }, function (err) {
                //error while opening database
                console.log(err);
            });
            //starting the tracking service .. required to start here from ionic docs
            locationTracker.startTracking();
            platform.backButton = null;
            //watching battery status changes
            MyApp_1.batterySubscription = BatteryStatus.onChange().subscribe(function (status) {
                if (status.level == 20)
                    locationTracker.stopTracking();
                console.log(status.level + "------------" + status.isPlugged);
            });
            //watching network changes and send data when we have WIFI connection
            MyApp_1.networkSubscriptionOnConnect = Network.onConnect().subscribe(function () {
                setTimeout(function () {
                    if (Network.type === 'wifi') {
                        MyApp_1.usedWIFI = true;
                        locationTracker.stopTracking();
                        console.log('Sending Data..');
                        locationTracker.getLocations().then(function (data) {
                            var locations = data;
                            var headers = new Headers({ 'Content-Type': 'application/json' });
                            var options = new RequestOptions({ headers: headers });
                            http.post('http://192.168.1.184:80/locations/post', JSON.stringify(data), options).toPromise().then(function (res) {
                                var x = JSON.stringify(res);
                                console.log("Response " + JSON.parse(x));
                                //handle responses here
                                console.log("Done Sending Data!");
                                //removing all stored data after trasfering it to the server
                                locationTracker.deleteLocations();
                            }).catch(function (err) {
                                //handle bad requests here
                                console.log(err);
                            });
                        }, function (err) {
                            console.log('There was an error in getting the locations from the database.');
                        });
                    }
                    else
                        MyApp_1.usedWIFI = false;
                }, 1000);
            }); // end of subscribe function
            MyApp_1.networkSubscriptionOnDisconnect = Network.onDisconnect().subscribe(function (data) {
                if (MyApp_1.usedWIFI)
                    locationTracker.startTracking();
            });
        });
    }
    return MyApp;
}());
MyApp.usedWIFI = false;
MyApp = MyApp_1 = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, LocationTracker, Http])
], MyApp);
export { MyApp };
var MyApp_1;
//# sourceMappingURL=app.component.js.map