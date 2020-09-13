using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GraduationProject.Models;

namespace GraduationProject.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20170211035313_secMigration")]
    partial class secMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GraduationProject.Infrastructure.Background_Settings", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Debug");

                    b.Property<int>("DesiredAccuracy");

                    b.Property<int>("DistanceFilter");

                    b.Property<int>("Interval");

                    b.Property<int>("StationaryRadius");

                    b.HasKey("ID");

                    b.ToTable("Background_Settings_Collection");
                });

            modelBuilder.Entity("GraduationProject.Infrastructure.Foreground_Settings", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("EnableHighAccuracy");

                    b.Property<int>("Frequency");

                    b.HasKey("ID");

                    b.ToTable("Foreground_Settings_Collection");
                });

            modelBuilder.Entity("GraduationProject.Models.Location", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Latit");

                    b.Property<string>("Long");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Locations");
                });
        }
    }
}
