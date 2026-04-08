namespace SmartTaskAPI.Models.DTO.Task
{
    public class TaskResponseDetailDto
    {
        public int Id { get; set; }
        //public string TaskCode { get; set; }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string AssignedToName { get; set; }
        public string AssignedByName { get; set; }
        public string AssignedBy { get; set; }
        public int Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public List<AttachmentDto> Files { get; set; } = new List<AttachmentDto>();
    }
}
