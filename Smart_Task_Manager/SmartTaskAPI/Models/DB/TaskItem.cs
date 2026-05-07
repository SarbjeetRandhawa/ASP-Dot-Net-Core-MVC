using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Models.DB
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string TaskCode { get; set; }
        public Project Project { get; set; }

        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public bool OverdueFlag { get; set; } = false;
        public string AssignedToUserId { get; set; }
        public ApplicationUser AssignedToUser { get; set; }
        public string CreatedByUserId { get; set; }

        public ApplicationUser CreatedByUser { get; set; }

        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<TaskAttachment> Attachments { get; set; }


    }
}
