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
           var existing = await _context.CommentsLike.AsNoTracking().FirstOrDefaultAsync(x => x.CommentId == commentId && x.UserId == userId);
            if (existing != null) { 
                _context.CommentsLike.Remove(existing);
            }
            else {
                await _context.CommentsLike.AddAsync(new CommentsLike
                {
                    CommentId = commentId,
                    UserId = userId
                });
            }
        }
    }


}
