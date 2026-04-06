namespace SmartTaskAPI.Models.DTO.Task
{
    public class QueryParams
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 2;
        public int? Status { get; set; }
        public int? Priority { get; set; }
        public string? Search { get; set; }

        public bool MyTasks { get; set; } = false;
     }
}
