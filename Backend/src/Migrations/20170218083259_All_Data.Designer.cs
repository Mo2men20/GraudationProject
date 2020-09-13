using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GraduationProject.Models;

namespace GraduationProject.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20170218083259_All_Data")]
    partial class All_Data
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GraduationProject.Infrastructure.Settings", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Debug");

                    b.Property<int>("DesiredAccuracy");

                    b.Property<int>("DistanceFilter");

                    b.Property<int>("MinimumInterval");

                    b.Property<int>("StationaryRadius");

                    b.Property<bool>("UseBatterLife");

                    b.Property<bool>("UseSpeed");

                    b.HasKey("ID");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("GraduationProject.Models.Location", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("GeneratingTime");

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<double>("Speed");

                    b.Property<string>("UUID");

                    b.HasKey("ID");

                    b.ToTable("Locations");
                });
        }
    }
}
