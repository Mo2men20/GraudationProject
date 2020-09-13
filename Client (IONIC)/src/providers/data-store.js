var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { SQLite, Device } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Location } from '../app/location-model';
/*
  Generated class for the DataStore provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DataStore = (function () {
    function DataStore(platform) {
        var _this = this;
        this.platform = platform;
        this.platform.ready().then(function () {
            _this._SQL = new SQLite();
            _this._SQL.openDatabase({ name: 'data.db', location: 'default' });
        });
    }
    DataStore.prototype.InsertLocation = function (temp) {
        this._SQL.executeSql("INSERT INTO Locations(Name,Long,Latit) VALUES ('" + Device.uuid + "','" + temp.Long + "','" + temp.Latit + "')", []).then(function (ok) {
            //executed cmd successfully
        }, function (err) {
            //error in executed cmd
            console.log('Error in inserting record.');
        });
    };
    DataStore.prototype.GetAllLocations = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var locations = new Array();
            ;
            _this._SQL.executeSql("SELECT * FROM Locations", []).then(function (data) {
                //executed cmd successfully
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++)
                        locations.push(new Location(data.rows.item(i).Name, data.rows.item(i).Long, data.rows.item(i).Latit));
                    resolve(locations);
                }
            }, function (err) {
                //error in executing cmd
                reject('There was an error in retrieving all locations.');
            });
        });
    };
    DataStore.prototype.DeleteAllLocations = function () {
        this._SQL.executeSql("DELETE FROM Locations", {}).then(function (data) {
            //executed cmd successfully
            console.log('All locations were deleted!');
        }, function (err) {
            //error in executing cmd
            console.log('There was an error in deleting all locations.');
        });
    };
    return DataStore;
}());
DataStore = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Platform])
], DataStore);
export { DataStore };
//# sourceMappingURL=data-store.js.map