namespace SmartTaskAPI.Models.DTO.ProjectDto
{
    public class ProjectDetailsResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public string Icon { get; set; }
        public string colorTheme { get; set; }
        public double progress { get; set; }

        public List<ProjectDetailsMemberResponseDto> Members { get; set; } = new();
    }
}