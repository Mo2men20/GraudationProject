using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    //this class is used for the foreground geolocation
    public class Foreground_Settings
    {

        public int ID { set; get; }
        public int Frequency { set; get; }

        public bool EnableHighAccuracy { set; get; }

       

        public Foreground_Settings() { }

        
    }
}
