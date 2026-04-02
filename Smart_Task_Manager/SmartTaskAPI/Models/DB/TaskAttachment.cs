namespace SmartTaskAPI.Models.DB
{
    public class TaskAttachment
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public string UploadeByUserId { get; set; }
        public string MimeType { get; set; }
        public DateTime UploadeAt { get; set; } = DateTime.UtcNow;
        public TaskItem Task { get; set; }
    }
}
