using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using CapstoneProject.Models;

namespace CapstoneProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            JWT_KEY = Configuration["JWT_KEY"];
        }

        public IConfiguration Configuration { get; }
        private readonly string JWT_KEY;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CapstoneProject", Version = "v1" });
            });

            services.AddDbContext<DatabaseContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JWT_KEY))
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (JWT_KEY == null || JWT_KEY.Length < 20)
            {
                app.Run(async (context) =>
                {
                    var message = env.IsDevelopment() ?
                        $"You do not have a valid JWT_KEY. Use\n\n\ndotnet user-secrets set JWT_KEY {Guid.NewGuid()}\n\n\nto set one." :
                        $"You do not have a valid JWT_KEY. Use\n\n\nheroku config:set JWT_KEY={Guid.NewGuid()}\n\n\nto set one";

                    await context.Response.WriteAsync(message);
                });
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");

                // Only enforce https in production
                app.UseHttpsRedirection();

                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CapstoneProject");
            });

            app.UseRouting();

            // Allow for authorization of endpoints (using JWT)
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // Give a long startup time. On some systems the initial npm install takes a long time.
                    // If that times out then we sometimes see partial installs which lead to confusing errors.
                    spa.Options.StartupTimeout = new TimeSpan(10 * TimeSpan.TicksPerMinute);

                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
