var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Geolocation, BackgroundGeolocation, Network, BackgroundMode } from 'ionic-native';
import { DataStore } from './data-store';
import { Location } from '../app/location-model';
import 'rxjs/add/operator/filter';
/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var LocationTracker = (function () {
    function LocationTracker(zone, db) {
        this.zone = zone;
        this.db = db;
        this.lat = 0;
        this.lng = 0;
        this.locations = new Array();
        //background tracking
        this.config = {
            desiredAccuracy: 1000,
            stationaryRadius: 0,
            distanceFilter: 0,
            debug: true,
            interval: 500
        };
        //forground tracking
        this.options = {
            frequency: 30000,
            enableHighAccuracy: true
        };
    }
    LocationTracker.prototype.startTracking = function () {
        var _this = this;
        if (Network.type === 'wifi') {
            console.log("Can't start while WIFI is running.");
            return;
        }
        BackgroundMode.enable();
        console.log('Starting!');
        BackgroundGeolocation.configure(function (location) {
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            _this.zone.runOutsideAngular(function () {
                _this.db.InsertLocation(new Location("", location.latitude, location.longitude));
                _this.lat = location.latitude;
                _this.lng = location.longitude;
            });
        }, function (err) {
            console.log(err);
        }, this.config);
        //turning on background Geolocation
        BackgroundGeolocation.start();
        this.watch = Geolocation.watchPosition(this.options).filter(function (p) { return p.code === undefined; }).subscribe(function (position) {
            //console.log(position);
            //run update inside of angulars zone
            _this.zone.run(function () {
                //this.db.InsertLocation(new Location("", position.coords.latitude + '', position.coords.longitude + ''));
                _this.lat = position.coords.latitude;
                _this.lng = position.coords.longitude;
            });
        });
    };
    LocationTracker.prototype.stopTracking = function () {
        BackgroundMode.disable();
        console.log('stopTracking');
        BackgroundGeolocation.stop();
        this.watch.unsubscribe();
    };
    LocationTracker.prototype.getLocations = function () {
        return this.db.GetAllLocations();
    };
    LocationTracker.prototype.deleteLocations = function () {
        this.db.DeleteAllLocations();
    };
    return LocationTracker;
}());
LocationTracker = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone, DataStore])
], LocationTracker);
export { LocationTracker };
//# sourceMappingURL=location-tracker.js.map