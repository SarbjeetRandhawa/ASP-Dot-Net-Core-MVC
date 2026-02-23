using FluentValidation;
using Inventory_Crud.Models;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Repository.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

//1 way of adding db service
//var provider = builder.Services.BuildServiceProvider();
//var config = provider.GetRequiredService<IConfiguration>();
//builder.Services.AddDbContext<InventoryDbContext>(item => item.UseSqlServer(config.GetConnectionString("Dbcs")));

//2nd way of adding db service
builder.Services.AddDbContext<InventoryDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Dbcs")));

builder.Services.AddTransient<IInventory, InventoryService>();
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly, includeInternalTypes: true);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
