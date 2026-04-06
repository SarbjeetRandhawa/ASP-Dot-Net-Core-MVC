namespace SmartTaskAPI.Models.DTO.Task
{
    public class QueryParams
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int? Status { get; set; }
        public int? Priority { get; set; }
        public string? Search { get; set; }
     }
}
