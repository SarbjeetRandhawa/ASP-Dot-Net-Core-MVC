namespace SmartTaskAPI.Models.DTO.Comment
{
    public class ResponseCommentDto
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public int LikeCount { get; set; }
        public string CommentedbyUserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<ResponseCommentDto> Replies { get; set; }


    }
}
