using Microsoft.AspNetCore.Mvc;
using Strongly_typede_view.Models;
using System.Diagnostics;

namespace Strongly_typede_view.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //Employee emp = new Employee()
            //{
            //    id = 1,
            //    Name = "sarbjeet"
            //};

            var emp = new List<Employee>
            {
                new Employee(){id=1,Name="Sarbjeet"},
                new Employee(){id=2,Name="Sanam"},
                new Employee(){id=3,Name="Khushi"},
                new Employee(){id=4,Name="Aarush"},

            };
            return View(emp);
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
