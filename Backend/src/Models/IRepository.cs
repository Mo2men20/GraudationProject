using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraduationProject.Models
{
    public interface IRepository
    {
        void AddLocation(Location newLocation);
        Location[] ReadLocations();
    }
}
