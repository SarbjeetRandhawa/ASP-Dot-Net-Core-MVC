namespace SmartTaskAPI.Models.DTO.Task
{
    public class AttachmentDto
    { 
        public int Id { get; set; }
        public string OrignalName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public long FileSize { get; set; }
        public string UploadedByUser { get; set; }
        public DateTime UploadedAt { get; set; }



    }
}
