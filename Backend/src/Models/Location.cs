using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Models
{
    public class Location 
    {
        public Location()
        {
            //
        }

        public Location(string n, double g, double l,double speed,string time) {
            UUID = n;
            Longitude = g;
            Latitude=l;
            Speed = speed;
            GeneratingTime = time;
        }

        public string UUID { set; get; }
        public double Longitude { set; get; }
        public double Latitude { set; get; }

        [Key]
        public int ID { set; get; }
        public double Speed { set; get; }
        public string GeneratingTime { set; get; }


    
    }
}
