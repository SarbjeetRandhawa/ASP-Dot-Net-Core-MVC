using Inventory_Crud.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Inventory_Crud.Controllers
{
    public class HomeController : Controller
    {

        
        private readonly InventoryDbContext inventoryDb;

       

        public HomeController( InventoryDbContext inventoryDb)
        {
            this.inventoryDb = inventoryDb;
        }

        public IActionResult Index()    
        {
            var std = inventoryDb.Products.ToList();
            
            return View(std);
        }
        public IActionResult Create(Inventory inv)
        {
            if (ModelState.IsValid)
            {
                inventoryDb.Products.Add(inv);
                inventoryDb.SaveChanges();
                return RedirectToAction("index", "Home");
            }

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
