namespace Inventory_Crud.Models.Pagination
{
    public class Pager
    {
        public int TotalItems { get; private set; }
        public int  CurrentPage{ get; private set; }
        public int PageSize { get; private set; }
        public int TotalPages { get; private set; }
        public int StartPage { get; private set; }
        public int EndPage { get; private set; }

        public Pager()
        {

        }

        public Pager(int Page , int totalItems, int pagesize = 5)
        {
            int totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pagesize);
            int currentPage = Page;

            int startPage = currentPage - 5;
            int endPage = currentPage + 4;

            if(StartPage <= 0)
            {
                endPage = endPage - (startPage - 1);
                startPage = 1;
            }
            if(endPage > totalPages)
            {
                endPage = totalPages;
                if(endPage > 10)
                {
                    startPage = endPage - 9;
                }
            }

            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pagesize;
            TotalPages = totalPages;
            StartPage = startPage;
            EndPage = endPage;


        }


    }
}
