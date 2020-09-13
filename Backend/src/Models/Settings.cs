using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    
    public  class Settings
    {
        
        public Settings() { }

        public int MinimumInterval { set; get; }
        public int DesiredAccuracy { set; get; }
        public int DistanceFilter { set; get; }
        public int StationaryRadius { set; get; }

        public bool UseSpeed { set; get; }
        public bool UseBatteryLife { set; get; }
        public bool Debug { set; get; }

        [Key]
        public int ID { set; get; }

    }
}

