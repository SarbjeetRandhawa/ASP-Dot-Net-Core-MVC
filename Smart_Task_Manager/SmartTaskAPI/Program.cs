using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Middleware;
using SmartTaskAPI.Models.Identity;
using SmartTaskAPI.Repository.Implementation;
using SmartTaskAPI.Repository.Interface;
using SmartTaskAPI.Service;
using SmartTaskAPI.Services.Implementation;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.`

builder.Services.AddControllers();

builder.Services.AddScoped<JwtService>();

builder.Services.AddScoped<IProjectRepository,ProjectRepository>();
builder.Services.AddScoped<IProjectMemberRepository,ProjectMemberRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped<IProjectRoleRepository,ProjectRoleRepository>();
builder.Services.AddScoped<ITaskRepository,TaskRepository>();
builder.Services.AddScoped<ITaskAttachmentRepository,TaskAttachmentRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICommentLikes, CommentLikes>();

builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectMemberService, ProjectMemberService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectRoleService, ProjectRoleService>();
builder.Services.AddScoped<ITaskService,TaskService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ICommentLikeService, CommentLikeService>();



builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Dbcs")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
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
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
var provider = new FileExtensionContentTypeProvider();

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider,
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers["Content-Disposition"] = "inline";
    }
});
    

using (var scope = app.Services.CreateScope())
{

    var rolemanager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    string[] roles = new string[] { "Admin", "Manager", "Employee" };

    foreach (var role in roles)
    {

        if (!await rolemanager.RoleExistsAsync(role))
        {
            await rolemanager.CreateAsync(new IdentityRole(role));
        }
    }
};

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseMiddleware<lastActiveMiddleware>();
app.UseAuthorization();


app.MapControllers();

app.Run();
