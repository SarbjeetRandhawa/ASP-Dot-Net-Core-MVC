using Microsoft.AspNetCore.Mvc;
using Modelss.Models;
using System.Diagnostics;

namespace Modelss.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var students = new List<StudentModel>
            {
                new StudentModel{ id = 1 , Name = "Sarbjeet" , Gender = "Male" , standard = 10},
                new StudentModel{ id = 2 , Name = "Vishal" , Gender = "Male" , standard = 8},
                new StudentModel{ id = 3 , Name = "Nishan" , Gender = "Male" , standard = 9},

            };
            ViewBag.Mystudents = students;
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
