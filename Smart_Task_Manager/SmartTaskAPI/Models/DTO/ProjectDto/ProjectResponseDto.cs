namespace SmartTaskAPI.Models.DTO.ProjectDto
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

        public int TotalTasks { get; set; }
        public int DoneTasks { get; set; }
        public double Progress { get; set; }
        public int OverdueTasks { get; set; }
        public string colorTheme { get; set; }
        public List<ProjectMemberResponseDto> Members { get; set; } = new();
    }
}