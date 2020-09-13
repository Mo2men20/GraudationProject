using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GraduationProject.Migrations
{
    public partial class secMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Background_Settings_Collection");

            migrationBuilder.DropTable(
                name: "Foreground_Settings_Collection");
        }
    }
}
