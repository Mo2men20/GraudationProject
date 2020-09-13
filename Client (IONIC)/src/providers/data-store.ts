import { Injectable } from '@angular/core';
import { SQLite, Device } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Location } from '../app/models';


@Injectable()
export class DataStore {

  private _SQL: SQLite;

  constructor(private platform: Platform) {


    this.platform.ready().then(() => {

      this._SQL = new SQLite();
      this._SQL.openDatabase({ name: 'data.db', location: 'default' });
    });


  }


  public InsertLocation(temp: Location) {
    this._SQL.executeSql(`INSERT INTO Locations(UUID,Longitude,Latitude,Speed,GeneratingTime) VALUES ('${Device.uuid}','${temp.Longitude}','${temp.Latitude}','${temp.Speed}','${temp.GeneratingTime.toLocaleString()}')`, []).then((ok) => {
      //executed cmd successfully

    }, (err) => {
      //error in executed cmd
      console.log(err);
    });
  }

  public GetAllLocations(): Promise<any> {

    return new Promise<Location[]>((resolve, reject) => {
      let locations: Location[] = new Array<Location>();;
      this._SQL.executeSql(`SELECT * FROM Locations`, []).then((data) => {


        //executed cmd successfully
        if (data.rows.length > 0) {

          for (let i = 0; i < data.rows.length; i++)
            locations.push(new Location(data.rows.item(i).UUID, data.rows.item(i).Longitude, data.rows.item(i).Latitude, data.rows.item(i).GeneratingTime, data.rows.item(i).Speed));

          resolve(locations);
        }
        else
          resolve(null);


      }, (err) => {
        //error in executing cmd
        reject('There was an error in retrieving all locations.');
      });
    });


  }

  public DeleteAllLocations(): void {
    this._SQL.executeSql(`DELETE FROM Locations`, {}).then((data) => {
      //executed cmd successfully
      console.log('All locations were deleted!');
    }, (err) => {
      //error in executing cmd
      console.log('There was an error in deleting all locations.');
    });
  }



}
