using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Comment;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _uow;

        public CommentService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task AddCommentAsync(CreateCommentDto dto , string userId)
        {

            var Comment = new Comment
            {
                TaskId = dto.TaskId,
                ParentCommentId = dto.ParentCommentId,
                CommentText = dto.CommentText,
                CommentedByUserId = userId
            };
            await _uow.CommentRepository.AddCommentAsync(Comment);
            await _uow.SaveAsync();

        }

        public async Task<List<ResponseCommentDto>> GetCommentsAsync(int taskId ,string userId)
        {

            var comments = await _uow.CommentRepository.GetCommentsByIdAsync(taskId);

            return comments.Select(c => new ResponseCommentDto
            {
                Id = c.Id,
                CommentText = c.CommentText,
                CommentedbyUserName = c.CommentedByUser.FirstName + " " + c.CommentedByUser.LastName,
                CreatedAt = c.CreatedAt,
                LikeCount = c.Likes.Count,
                isLikedByCurrentUser = c.Likes.Any(l => l.UserId == userId),
                Replies = c.Replies.Select(r => new ResponseCommentDto
                {
                    Id = r.Id,
                    CommentText= r.CommentText,
                    LikeCount = r.Likes.Count,
                    isLikedByCurrentUser = r.Likes.Any(l => l.UserId == userId),
                    CommentedbyUserName = r.CommentedByUser.FirstName + " " + r.CommentedByUser.LastName,
                    CreatedAt= r.CreatedAt
                }).ToList()

                

            }).ToList();
        }
    }
}
