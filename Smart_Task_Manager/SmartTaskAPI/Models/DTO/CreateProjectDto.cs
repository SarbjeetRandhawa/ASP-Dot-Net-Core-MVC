namespace SmartTaskAPI.Models.DTO
{
    public class CreateProjectDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Status { get; set; }
        public string Icon { get; set; }
        public string colorTheme { get; set; }
        public List<AddMemberDto> Members { get; set; } = new();
    }
}