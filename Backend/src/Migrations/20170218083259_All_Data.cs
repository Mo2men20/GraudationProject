using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GraduationProject.Migrations
{
    public partial class All_Data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Background_Settings_Collection");

            migrationBuilder.DropTable(
                name: "Foreground_Settings_Collection");

            migrationBuilder.DropColumn(
                name: "Latit",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Long",
                table: "Locations");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Locations",
                newName: "UUID");

            migrationBuilder.AddColumn<DateTime>(
                name: "GeneratingTime",
                table: "Locations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Locations",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Locations",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Speed",
                table: "Locations",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Debug = table.Column<bool>(nullable: false),
                    DesiredAccuracy = table.Column<int>(nullable: false),
                    DistanceFilter = table.Column<int>(nullable: false),
                    MinimumInterval = table.Column<int>(nullable: false),
                    StationaryRadius = table.Column<int>(nullable: false),
                    UseBatterLife = table.Column<bool>(nullable: false),
                    UseSpeed = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropColumn(
                name: "GeneratingTime",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Speed",
                table: "Locations");

            migrationBuilder.RenameColumn(
                name: "UUID",
                table: "Locations",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Latit",
                table: "Locations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Long",
                table: "Locations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Background_Settings_Collection",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Debug = table.Column<bool>(nullable: false),
                    DesiredAccuracy = table.Column<int>(nullable: false),
                    DistanceFilter = table.Column<int>(nullable: false),
                    Interval = table.Column<int>(nullable: false),
                    StationaryRadius = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Background_Settings_Collection", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Foreground_Settings_Collection",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EnableHighAccuracy = table.Column<bool>(nullable: false),
                    Frequency = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foreground_Settings_Collection", x => x.ID);
                });
        }
    }
}
