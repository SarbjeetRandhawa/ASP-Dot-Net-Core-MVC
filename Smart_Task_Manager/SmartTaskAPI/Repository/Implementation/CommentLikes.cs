using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class CommentLikes : ICommentLikes
    {
        private readonly AppDbContext _context;

        public CommentLikes(AppDbContext context)
        {
            _context = context; 
        }


        public async Task ToggleLike(int commentId, string userId)
        {
           var existing = await _context.commentsLike.FirstOrDefaultAsync(x => x.CommentId == commentId && x.userId == userId);
            if (existing != null) { 
                _context.commentsLike.Remove(existing);
            }
            else {
                await _context.commentsLike.AddAsync(new CommentsLike
                {
                    CommentId = commentId,
                    userId = userId
                });
            }
        }
    }


}
