using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Data;
using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.Repository.Implementation
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context) { 
            _context = context;
        }

        public async Task AddCommentAsync(Comment Comment)
        {
            await _context.comments.AddAsync(Comment);
            
        }

        public async Task<List<Comment>> GetCommentsByIdAsync(int TaskId)
        {
            return await _context.comments.Where(c => c.TaskId == TaskId && c.ParentCommentId == null)
                .Include(c => c.CommentedByUser)
                .Include(c => c.Likes)
                .Include(c => c.Replies)
                .ThenInclude(r => r.CommentedByUser)
                .Include(c => c.Replies)
                .ThenInclude(r => r.Likes).ToListAsync();
        }
    }
}
