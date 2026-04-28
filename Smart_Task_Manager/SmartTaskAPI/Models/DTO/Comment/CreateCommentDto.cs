namespace SmartTaskAPI.Models.DTO.Comment
{
    public class CreateCommentDto
    {
        public int TaskId { get; set; }
        public int? ParentCommentId { get; set; }
        public string CommentText { get; set; }
    }
}
