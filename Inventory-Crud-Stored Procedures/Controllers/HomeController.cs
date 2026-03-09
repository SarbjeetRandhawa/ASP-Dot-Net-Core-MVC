using Inventory_Crud.Models;

using Inventory_Crud.Models.DataBases;
using Inventory_Crud.Models.DTOs;
using Inventory_Crud.Repository.Interface;
using Inventory_Crud.UnitOfWork;
using Inventory_Crud.Validator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Diagnostics;


namespace Inventory_Crud.Controllers
{
    public class HomeController : Controller
    {
        //private readonly InventoryDbContext inventoryDb;
        //public HomeController( InventoryDbContext inventoryDb)
        //{
        //    this.inventoryDb = inventoryDb;S
        //}

       
        private readonly IUnitOfWork unitOfWork;
        InventoryValidator validator = new InventoryValidator();

        public HomeController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }



        public async Task<IActionResult> Index( List<int> category, string searchOn, string search, string sortColumn, string sortOrder, int pg, int pageSize)
        {
          

            var _inventories = await unitOfWork.Inventory.GetallData(category, searchOn, search, sortColumn, sortOrder, pg, pageSize);
            var categories = await unitOfWork.Category.GetAll();
            var vm = new DashBoardVM
            {
                Inventories = _inventories.Items,
                Category = categories
            };
            //var std = await inventoryDb.Products.ToListAsync();
            ViewBag.search = search;
            ViewBag.sortColumn = sortColumn ?? "Name";
            ViewBag.sortOrder = sortOrder ?? "asc";
            ViewBag.category = category;
            ViewBag.searchOn = searchOn;
            ViewBag.pageSize = pageSize;
            ViewBag.pg = pg;

            //var std = await dashboardVM.GetDashBoardData(category , searchOn, search, sortColumn, sortOrder, pg);
            ViewBag.pager = _inventories.Pager;
            return View(vm);
        }

        public async Task<IActionResult> Create()
        {
            var categories = await unitOfWork.Category.GetAll();
            ViewBag.Categories = new SelectList(categories, "Id", "Name");
            return View(new CreateViewDto());
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateViewDto inv)
        {

            var result = validator.Validate(inv);

            if (result != null)
            {
                foreach (var errors in result.Errors)
                {
                    ModelState.AddModelError(errors.PropertyName, errors.ErrorMessage);
                }
            }

            if (!ModelState.IsValid)
            {

                //await inventoryDb.Products.AddAsync(inv);
                //await inventoryDb.SaveChangesAsync();
                var categories = await unitOfWork.Category.GetAll();
                ViewBag.Categories = new SelectList(categories, "Id", "Name");

                return View(inv);


            }
            var entity = new Inventory
            {
                Name = inv.Name,
                Price = inv.Price.Value,
                CategoryId = inv.CategoryId,
                Quantity = inv.Quantity,
                Discription = inv.Discription,
                CreatedDate = inv.CreatedDate,
                ExpiryDate = inv.ExpiryDate
            };
            await unitOfWork.Inventory.CreateNew(entity);
            await unitOfWork.SaveAsync();
            return RedirectToAction("index", "Home");

        }



        public async Task<IActionResult> Details(int id)
        {
            var data = await unitOfWork.Inventory.Details(id);

            if (data == null)
            {
                return NotFound();
            }

            return View(data);
        }



        public async Task<IActionResult> Edit(int id)
        {
            //var data = await inventoryDb.Products.FindAsync(id);
            var data = await unitOfWork.Inventory.Details(id);
            var entity = new CreateViewDto
            {
                Id = data.Id,
                Name = data.Name,
                Price = data.Price,
                CategoryId = data.CategoryId,
                Quantity = data.Quantity,
                Discription = data.Discription,
                CreatedDate = data.CreatedDate,
                ExpiryDate = data.ExpiryDate

            };

            if (data == null)
            {
                return NotFound();
            }
            var categories = await unitOfWork.Category.GetAll();
            ViewBag.Categories = new SelectList(categories, "Id", "Name");

            return View(entity);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, CreateViewDto inv)
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

            if (!ModelState.IsValid)
            {
                var categories = await unitOfWork.Category.GetAll();
                ViewBag.Categories = new SelectList(categories, "Id", "Name");
                return View(inv);

            }
            var entity = new Inventory
            {
                Id = inv.Id,
                Name = inv.Name,
                Price = inv.Price.Value,
                CategoryId = inv.CategoryId,
                Quantity = inv.Quantity,
                Discription = inv.Discription,
                CreatedDate = inv.CreatedDate,
                ExpiryDate = inv.ExpiryDate
            };
            await unitOfWork.Inventory.Update(entity);
            await unitOfWork.SaveAsync();

            return RedirectToAction("index", "Home");
        }



        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            //var data = await inventoryDb.Products.FirstOrDefaultAsync(x => x.Id == id);

            var data = await unitOfWork.Inventory.Details(id);

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
            await unitOfWork.Inventory.Remove(id);
            await unitOfWork.SaveAsync();
            return RedirectToAction("Index", "Home");
        }



        public async Task<IActionResult> AddCategory()
        {
            return View(new AddCategoryDTO());
        }
        [HttpPost]
        public async Task<IActionResult> AddCategory(AddCategoryDTO category)
        {
            var entity = new Categories
            {
                Name = category.Name,
            };
            if (!ModelState.IsValid)
            {
                return View(category);
            }
            await unitOfWork.Category.CreateNew(entity);
            await unitOfWork.SaveAsync();

            return RedirectToAction("index", "Home");
        }




        public async Task<IActionResult> DeleteCategory()
        {   
            var data = await unitOfWork.Category.GetAll();

            ViewBag.Categories = new SelectList(data, "Id", "Name");

            if (data == null)
            {
                return NotFound();
            }
            return View(new DeleteCategoryDTO());
        } 
        [HttpPost]
        public async Task<IActionResult> DeleteCategory(DeleteCategoryDTO dto)
        {   
            
            if (!ModelState.IsValid)
            {
                var data = await unitOfWork.Category.GetAll();

                ViewBag.Categories = new SelectList(data, "Id", "Name");
                return View(dto);
            }
            var result = await unitOfWork.Category.Remove(dto.id.Value);
            await unitOfWork.SaveAsync();

            if (!result)
            {
                TempData["Error"] = "This Category is used by Products, Cannot Delete";
                return RedirectToAction("DeleteCategory");
            }

            return RedirectToAction("index", "Home");
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



