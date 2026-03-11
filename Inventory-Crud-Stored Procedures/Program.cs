using FluentValidation;
using Inventory_Crud.Models.Domain;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Repository.Service;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;
using Inventory_Crud.UnitOfWork;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using Inventory_Crud.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

//1 way of adding db service
//var provider = builder.Services.BuildServiceProvider();
//var config = provider.GetRequiredService<IConfiguration>();
//builder.Services.AddDbContext<InventoryDbContext>(item => item.UseSqlServer(config.GetConnectionString("Dbcs")));

//2nd way of adding db service
builder.Services.AddDbContext<InventoryDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Dbcs")));

builder.Services.AddDefaultIdentity<InventoryUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<InventoryDbContext>();


builder.Services.AddTransient<IUnitOfWork,UnitOfWork>();
builder.Services.AddTransient<IInventory, InventoryService>();
builder.Services.AddTransient<ICategory, CategoryService>();
builder.Services.AddScoped<JwtTokenService>();

builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});
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

app.MapRazorPages();
app.Run();
