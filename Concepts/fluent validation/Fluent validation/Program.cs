using FluentValidation;
using System.Reflection;
using System.Reflection.PortableExecutable;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly,includeInternalTypes : true);
builder.Services.AddControllersWithViews();


var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
   
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
