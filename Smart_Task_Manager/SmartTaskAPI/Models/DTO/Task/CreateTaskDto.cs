using SmartTaskAPI.Models.DB;

namespace SmartTaskAPI.Models.DTO.Task
{
    public class CreateTaskDto
    {
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public string AssignedToUserId { get; set; }
        public DateTime DueDate { get; set; }

        public List<IFormFile> Files { get; set; }
    }
}
