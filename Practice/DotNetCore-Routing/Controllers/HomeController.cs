using DotNetCore_Routing.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DotNetCore_Routing.Controllers
{
    
    //[Route("Home")]
    //[Route("[Controller]/[Action]")]

    public class HomeController : Controller
    {
       
        [Route("~/")]
        [Route("Home/Index")]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
