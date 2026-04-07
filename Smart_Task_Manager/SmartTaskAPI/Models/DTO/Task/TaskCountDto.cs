namespace SmartTaskAPI.Models.DTO.Task
{
    public class TaskCountDto
    {
        public int TotalTasks { get; set; }
        public int MyTasks { get; set; }
        public int ToDo { get; set; }
        public int InProgress { get; set; }
        public int Done { get; set; }
        public int OverDue { get; set; }
    }
}
