using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    public class Options
    {
        public string type { set; get; } = "OptionsCore";

        private static  Options instance;

        private Options() { }

        public static Options Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Options();
                }
                return instance;
            }
        }
    }
}
