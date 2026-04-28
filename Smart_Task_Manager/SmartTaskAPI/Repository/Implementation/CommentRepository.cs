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

        public Task<List<Comment>> GetCommentsByIdAsync(int TaskId)
        {

        }
    }
}
