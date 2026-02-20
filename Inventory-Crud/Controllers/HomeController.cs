using Inventory_Crud.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IActionResult> Index()    
        {
            var std = await inventoryDb.Products.ToListAsync();
            
            return View(std);
        }



        
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Inventory inv)
        {
            if (ModelState.IsValid)
            {
                await inventoryDb.Products.AddAsync(inv);
                await inventoryDb.SaveChangesAsync();
                return RedirectToAction("index", "Home");
            }

            return View(inv);
        }



        public async Task<IActionResult> Details(int? id)
        {
            if(id == null || inventoryDb.Products == null)
            {
                return NotFound();
            }
            var data = await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
            {
                return NotFound();
            }
            return View(data);
        }
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || inventoryDb.Products == null)
            {
                return NotFound();
            }
            
            
            var data = await inventoryDb.Products.FindAsync(id);
            if (data == null)
            {
                return NotFound();
            }

            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> Edit(int? id , Inventory inv)
        {

            if(id != inv.Id)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {

            inventoryDb.Update(inv);
            await inventoryDb.SaveChangesAsync();
            return RedirectToAction("index", "Home");
            }
            return View(inv);
            
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || inventoryDb.Products == null)
            {
                return NotFound();
            }
            var data = await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
            {
                return NotFound();
            }
            return View(data);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> Delete(int id)
        {
            
            var data = await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);
            
            if(data != null)
            {
            inventoryDb.Products.Remove(data);
            }
            await inventoryDb.SaveChangesAsync();
            return RedirectToAction("Index" , "Home");

           

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
