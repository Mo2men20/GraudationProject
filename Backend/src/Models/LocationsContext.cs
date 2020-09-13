using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GraduationProject.Models
{
    public class LocationsContext : DbContext
    {
        public LocationsContext(DbContextOptions<LocationsContext> options) : base(options) { }

        public DbSet<Location> Locations { set; get; }

    }
}
