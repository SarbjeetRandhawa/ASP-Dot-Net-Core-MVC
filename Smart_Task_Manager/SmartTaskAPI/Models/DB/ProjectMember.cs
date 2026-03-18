using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Models.DB
{
    public class ProjectMember
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Project project { get; set; }
        public string UserId { get; set; }
        public int? ProjectRoleID { get; set; }
        public ProjectRole Role { get; set; }
        public ApplicationUser User { get; set; }

        public DateTime JoinedAt { get; set; }= DateTime.UtcNow;
    }
}
