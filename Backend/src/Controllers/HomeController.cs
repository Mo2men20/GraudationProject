using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor;
using GraduationProject.Models;
using Microsoft.AspNetCore.Authorization;
using GraduationProject.Infrastructure;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GraduationProject.Controllers
{

    public class HomeController : Controller
    {
        private ApplicationContext _Data;
       

        public HomeController(ApplicationContext temp) {
            _Data = temp;
          
        }

        public ViewResult Index()=> View(_Data.Locations.ToList());

        [HttpGet]
        public ViewResult Settings() => View(GetLatestSettings());

        [HttpPost]
        public ViewResult Settings(Settings temp)
        {
            _Data.Add(temp);
            _Data.SaveChanges();
            return View(GetLatestSettings());
        }

        //returns the latest saved settings
        private  Settings GetLatestSettings() => new Settings
        {
            Debug = _Data.Settings.Last().Debug,
            DesiredAccuracy = _Data.Settings.Last().DesiredAccuracy,
            DistanceFilter = _Data.Settings.Last().DistanceFilter,
            MinimumInterval = _Data.Settings.Last().MinimumInterval,
            StationaryRadius = _Data.Settings.Last().StationaryRadius,
            UseBatteryLife = _Data.Settings.Last().UseBatteryLife,
            UseSpeed = _Data.Settings.Last().UseSpeed
        };


    }
}
