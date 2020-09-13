using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Models
{
    public class InMemoryRepository : IRepository
    {
        public Location[] Locations;

        public InMemoryRepository() {

            Locations = new Location[] {
                 new Location(n: "one", g: "1111111", l: "11111111"),
                 new Location(n: "two", g: "2222222", l: "22222222"),
                 new Location(n: "three", g: "333333", l: "33333333"),
                 new Location(n: "four", g: "4444444", l: "44444444")
            };
        }

        public void AddLocation(Location newLocation)
        {
            Locations.ToList<Location>().Add(newLocation);
        }

        public Location[] ReadLocations() => Locations;
           
        
        
        
    }
}
