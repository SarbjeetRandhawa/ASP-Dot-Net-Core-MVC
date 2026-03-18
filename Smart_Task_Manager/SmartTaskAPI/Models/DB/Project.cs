
using System.ComponentModel.DataAnnotations;

namespace SmartTaskAPI.Models.DB
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; }
        public string Icon { get; set; }
        public string colorTheme { get; set; }

        public ICollection<ProjectMember> Members { get; set; }
    }
}
