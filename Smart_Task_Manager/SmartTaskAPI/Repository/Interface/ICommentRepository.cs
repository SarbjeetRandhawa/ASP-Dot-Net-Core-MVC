using SmartTaskAPI.Models.DB;

namespace SmartTaskAPI.Repository.Interface
{
    public interface ICommentRepository
    {
        Task AddCommentAsync(Comment Comment);
        Task<List<Comment>> GetCommentsByIdAsync(int TaskId);
    }
}
