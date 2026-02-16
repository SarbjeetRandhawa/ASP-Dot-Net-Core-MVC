var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

//Preffered:

app.Map("/Home", () => "This is Home");
app.MapGet("/Home", () => "This is Home");
app.MapPost("/Home", () => "This is Home");
app.MapPut("/Home", () => "This is Home");
app.MapDelete("/Home", () => "This is Home");

// or

//app.UseEndpoints(endpoint =>
//{
//    endpoint.MapGet("/Home", async (context) =>
//    {
//        await context.Response.WriteAsync("this is Home");
//    });
//    endpoint.MapPost("/Home", async (context) =>
//    {
//        await context.Response.WriteAsync("this is Home");
//    });

//});
#pragma warning restore ASP0014 // Suggest using top level route registrations


app.Run();
