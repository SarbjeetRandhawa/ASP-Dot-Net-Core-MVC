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

        public async Task<List<ResponseCommentDto>> GetCommentsAsync(int taskId)
        {
            var comments = await _uow.CommentRepository.GetCommentsByIdAsync(taskId);

            return comments.Select(c => new ResponseCommentDto
            {
                Id = c.Id,
                CommentText = c.CommentText,
                LikeCount = c.LikeCount,
                CommentedbyUserName = c.CommentedByUser.FirstName + " " + c.CommentedByUser.LastName,
                CreatedAt = c.CreatedAt,
                Replies = c.Replies.Select(r => new ResponseCommentDto
                {
                    Id = r.Id,
                    CommentText= r.CommentText,
                    LikeCount= r.LikeCount,
                    CreatedAt= r.CreatedAt
                }).ToList()

                

            }).ToList();
        }
    }
}
