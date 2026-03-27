namespace SmartTaskAPI.Models.DTO
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Status { get; set; }
        public string Icon { get; set; }
        public string colorTheme { get; set; }
        public List<ProjectMemberResponseDto> Members { get; set; } = new();
    }
}