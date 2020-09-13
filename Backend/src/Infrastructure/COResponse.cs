using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Infrastructure
{
    public class COResponse
    {
        public Config config = Config.Instance;
        public Options options = Options.Instance;

        public string type { set; get; } = "COResponseCore";

        private static COResponse instance;

        private COResponse() { }

        public static COResponse Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new COResponse();
                }
                return instance;
            }
        }
    }
}
