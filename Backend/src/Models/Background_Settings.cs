using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    //this class is used for the background geolocation
    public  class Background_Settings
    {
       
        public int ID { set; get; }
        public int DesiredAccuracy { set; get; }
        public int StationaryRadius { set; get; }
        public int DistanceFilter { set; get; }
        public int Interval { set; get; }
        public bool Debug { set; get; } 
 
       

        public Background_Settings() { }

        
    }
}
