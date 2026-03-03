using Inventory_Crud.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Inventory_Crud.ViewComponents
{
    public class CategoryMenuViewComponent : ViewComponent
    {
        private readonly ICategory categoryService;
        public CategoryMenuViewComponent(ICategory categoryService)
        {
            this.categoryService = categoryService;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var categories = await categoryService.GetAll();
            return View(categories);
        }
    }
}
