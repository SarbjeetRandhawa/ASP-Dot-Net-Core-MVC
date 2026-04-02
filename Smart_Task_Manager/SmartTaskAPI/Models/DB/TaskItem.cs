namespace SmartTaskAPI.Models.DB
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string TaskCode { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public string AssignedToUserId { get; set; }
        public string CreatedByUserId { get; set; }

        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<TaskAttachment> Attachments { get; set; }


    }
}
