using Microsoft.AspNetCore.Identity;
using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Middleware
{
    public class lastActiveMiddleware
    {
        private readonly RequestDelegate _next;
        public lastActiveMiddleware(RequestDelegate next)

        {
            _next = next;
        }
        public async Task Invoke(HttpContext context, UserManager<ApplicationUser> userManager)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var user = await userManager.GetUserAsync(context.User);
                if (user != null)
                {

                    user.LastActiveAt = DateTime.UtcNow;
                    await userManager.UpdateAsync(user);


                }
            }
            await _next(context);
        }
    }
}
