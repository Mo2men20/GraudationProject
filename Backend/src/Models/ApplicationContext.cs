using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GraduationProject.Infrastructure;

namespace GraduationProject.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<Location> Locations { set; get; }

        public DbSet<Settings> Settings { set; get; }

    }
}
