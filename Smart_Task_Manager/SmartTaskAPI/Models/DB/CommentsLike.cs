using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Models.DB
{
    public class CommentsLike
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public Comment Comment { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
