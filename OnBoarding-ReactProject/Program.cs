using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OnBoarding_ReactProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ThisProjectDbContextClass>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ThisProjectDbContext")));

var app = builder.Build();

//ADDED 
//builder.Services.AddSwaggerGen(options => { options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "ASP.NET CORE API", Version = "v1" }); });


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

//ADDED NEXT 2 LINES 
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "React ASP.NET");
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
