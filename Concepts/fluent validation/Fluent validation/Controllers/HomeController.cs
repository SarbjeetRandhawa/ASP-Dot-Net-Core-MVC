using Fluent_validation.Models;
using Fluent_validation.validator;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Fluent_validation.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            

            return View();
        }

        [HttpPost]
        
        public IActionResult Index(Studentdto std)
        {
            
            StudentValidator validator = new StudentValidator();

            
            var result = validator.Validate(std);

            if (!result.IsValid)
            {
                
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }

                // Return the same view with validation messages
                return View(std);
            }

            // If valid, you can process the data (e.g., save
            // to DB)
            ViewBag.Message = "Student data is valid!";
            return View(std);
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
