export  class Location {
  public UUID: string;
  public Longitude: number;
  public Latitude: number;
  public GeneratingTime: string;
  public Speed: number;
  public ID:number;


 
  public constructor(uuid: string, long: number, latit: number, now: string, speed: number) {

    this.UUID = uuid;
    this.Longitude = long;
    this.Latitude = latit;
    this.GeneratingTime = now;
    this.Speed = speed;

  }
}


export class Settings {

  MinimumInterval: number;
  DesiredAccuracy: number;
  DistanceFilter: number;
  StationaryRadius: number;
  UseSpeed: boolean;
  UseBatteryLife: boolean;
  Debug:boolean;

  public constructor(minimum: number, da: number, df: number, sr: number, us: boolean, ubl: boolean,debug:boolean) {

    this.MinimumInterval = minimum;
    this.DesiredAccuracy = da;
    this.DistanceFilter = df;
    this.StationaryRadius = sr;
    this.UseSpeed = us;
    this.UseBatteryLife = ubl;
    this.Debug=debug;
  }
  
}
