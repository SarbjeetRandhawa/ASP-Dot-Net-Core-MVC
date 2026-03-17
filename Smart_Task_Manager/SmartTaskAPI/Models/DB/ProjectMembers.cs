namespace SmartTaskAPI.Models.DB
{
    public class ProjectMembers
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Projects project { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
        public DateTime JoinedAt { get; set; }= DateTime.UtcNow;
    }
}
