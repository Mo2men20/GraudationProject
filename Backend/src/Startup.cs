using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using GraduationProject.Models;
using Microsoft.EntityFrameworkCore;
using GraduationProject.Infrastructure;



namespace GraduationProject
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddCors();
            services.AddMvc()
            .AddJsonOptions(jsonOptions =>
             {
                 jsonOptions.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                 jsonOptions.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
             });
            
            var connection = @"Data Source=.\SQLEXPRESS;Initial Catalog=master;Integrated Security=True";
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:4200/"));


            app.UseStaticFiles();
            app.UseStatusCodePages();
            app.UseDeveloperExceptionPage();
            app.UseMiddleware<MySecurity>();
            app.UseMvc(routes=>
            {
                routes.MapRoute(
                    name: "API",
                    template: "API/{Controller}/{Action}"
                    );

                routes.MapRoute(
                    name:"default",
                    template:"{controller=Home}/{action=index}"
                    );
            });
           

        }
    }
}
