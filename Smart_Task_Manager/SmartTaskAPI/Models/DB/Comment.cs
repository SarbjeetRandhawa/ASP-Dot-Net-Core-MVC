using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Models.DB
{
    public class Comment
    {
        public int Id { get; set; }
        public int TaskId { get; set; }
        public TaskItem Task { get; set; }
        public int? ParentCommentId { get; set; }

        public Comment ParentComment { get; set; }

        public List<Comment> Replies { get; set; } = new List<Comment>();
        public string CommentText { get; set; }

        public List<CommentsLike> Likes { get; set; } = new();

        public string CommentedByUserId { get; set; }
        public ApplicationUser CommentedByUser { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
