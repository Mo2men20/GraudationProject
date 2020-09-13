import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LocationTracker} from '../../providers/location-tracker';
import {Http, Headers,RequestOptions} from '@angular/http';
import {Settings} from '../../app/models';
import {MyApp} from '../../app/app.component';
import 'rxjs/add/operator/toPromise';
import {Location} from '../../app/models';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nearbyList:Array<Location>;    

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker,private http:Http) {}

  public GetNearbyDevices(){

    this.locationTracker.GetNearbyDevices().then(data=>{
      this.nearbyList = data;
    }).catch(err=>{
      this.nearbyList = new Array<Location>();
      this.nearbyList.push(new Location(err,0,0,"",0));
    })

  }

}

