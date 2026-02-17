using Microsoft.AspNetCore.Mvc;
using Repositry_Pattern.Models;
using Repositry_Pattern.Repositry;
using System.Diagnostics;

namespace Repositry_Pattern.Controllers
{
    public class HomeController : Controller
    {
        private readonly StudentsRepo _StudentsRepo = new StudentsRepo();

        public List<StudentModel> Getall()
        {
            return _StudentsRepo.GetAllStudents();
        }

        public StudentModel Getbyid(int id)
        {
            return _StudentsRepo.GetStudentById(id);
        }
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
