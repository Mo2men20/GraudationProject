using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GraduationProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Threading;
using GraduationProject.Infrastructure;
using Newtonsoft.Json;
using System.Device.Location;
using Microsoft.EntityFrameworkCore.Internal;
using MoreLinq;



// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GraduationProject.Controllers
{
    
    
    public class LocationsController : Controller
    {
        private ApplicationContext _Data;
       
        private static object locker = new object();

        public LocationsController(ApplicationContext temp)
        {
            _Data = temp;
            
        }



        [HttpGet]
        public JsonResult getSettings()
        {
            return Json(GetLatestSettings());
        }

        [HttpPost]
        public  JsonResult Post([FromBody]Location[] locations)
        {
            foreach (Location item in locations.OrderByDescending(p=>Methods.GetTime(p.GeneratingTime)))
            {
                if (_Data.Locations.Where(p=>p.GeneratingTime.Equals(item.GeneratingTime)).Select(p=>p).First()==null)
                _Data.Locations.Add(item);
            }
            _Data.SaveChanges();

            return Json(GetLatestSettings());
            
            

        }

        //this will return a list of nearby devices
        [HttpPost]
        public JsonResult GetNearByDevices([FromBody]Location temp) {

            if (_Data.Locations.Where(p => p.GeneratingTime.Equals(temp.GeneratingTime)).Select(p => p).First() == null)
                _Data.Locations.Add(temp);

            var currentLocation = new GeoCoordinate(temp.Latitude, temp.Longitude);
            var currentDate = Methods.GetTime(temp.GeneratingTime);

           
            var x = (from location in _Data.Locations.Where(p=>!p.UUID.Equals(temp.UUID))
                     where (currentLocation.GetDistanceTo(new GeoCoordinate(location.Latitude, location.Longitude)) < 1000
                     && (currentDate - Methods.GetTime(location.GeneratingTime)).Hours<=1
                     )
                     select location).DistinctBy(p => p.UUID);
            return Json(x);
        }

        //returns the latest saved settings
        private Settings GetLatestSettings() => new Settings
        {
            Debug = _Data.Settings.Last().Debug,
            DesiredAccuracy = _Data.Settings.Last().DesiredAccuracy,
            DistanceFilter = _Data.Settings.Last().DistanceFilter,
            MinimumInterval = _Data.Settings.Last().MinimumInterval,
            StationaryRadius = _Data.Settings.Last().StationaryRadius,
            UseBatteryLife = _Data.Settings.Last().UseBatteryLife,
            UseSpeed = _Data.Settings.Last().UseSpeed
        };

        public JsonResult GetCloseTime() {
            return Json(new { x = 5 });
        }

        


    }

   

}   


