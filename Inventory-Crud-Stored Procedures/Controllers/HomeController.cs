using Inventory_Crud.Controllers;
using Inventory_Crud.Models;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.Validator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Inventory_Crud.Controllers
{
    public class HomeController : Controller
    {


        //private readonly InventoryDbContext inventoryDb;

        //public HomeController( InventoryDbContext inventoryDb)
        //{
        //    this.inventoryDb = inventoryDb;
        //}

        private readonly IInventory inventoryService;
        InventoryValidator validator = new InventoryValidator();
        public HomeController(IInventory inventory)
        {
            this.inventoryService = inventory;
        }

        public async Task<IActionResult> Index(string search, string sortColumn, string sortOrder , int pg =1)    
        {
            //var std = await inventoryDb.Products.ToListAsync();
            ViewBag.search = search;
            ViewBag.sortColumn = sortColumn ?? "Name" ;
            ViewBag.sortOrder = sortOrder ?? "asc" ;

            //var std = await inventoryService.GetallData(search , sortColumn , sortOrder, pg);
            var std = await inventoryService.GetallData(search, sortColumn, sortOrder, pg);
            ViewBag.pager = std.Pager;
            return View(std.Items);
        }




        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Inventory inv)
        {
            
            var result = validator.Validate(inv);

            if (result != null)
            {
                foreach (var errors in result.Errors)
                {
                    ModelState.AddModelError(errors.PropertyName , errors.ErrorMessage);
                }
            }

            if (ModelState.IsValid)
            {
                //await inventoryDb.Products.AddAsync(inv);
                //await inventoryDb.SaveChangesAsync();

                await inventoryService.CreateNew(inv);
                return RedirectToAction("index", "Home");
            }

            return View(inv);
        }





        public async Task<IActionResult> Details(int id)
        {
            var data = await inventoryService.Details(id);
            
            if (data == null)
            {
                return NotFound();
            }
            return View(data);
        }
        




        public async Task<IActionResult> Edit(int id)
        {
            //var data = await inventoryDb.Products.FindAsync(id);
            var data = await inventoryService.Details(id);
           
            if (data == null)
            {
                return NotFound();
            }

            return View(data);
        }
        

        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<IActionResult> Edit(int id, Inventory inv)
        {


            var result = validator.Validate(inv);

            if (result != null)
            {
                foreach (var errors in result.Errors)
                {
                    ModelState.AddModelError(errors.PropertyName, errors.ErrorMessage);
                }
            }
            if (id != inv.Id)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {

               await inventoryService.Update(inv);
                return RedirectToAction("index", "Home");
            }
            return View(inv);

        }






        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            //var data = await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);
            var data = await inventoryService.Details(id);
            
            if (data == null)
            {
                return NotFound();
            }
            return View(data);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> Delete2(int id)
        {
            await inventoryService.Remove(id);
            return RedirectToAction("Index", "Home");
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



