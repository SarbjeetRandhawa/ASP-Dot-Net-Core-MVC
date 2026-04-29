using SmartTaskAPI.Models.DTO.Comment;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface ICommentService
    {
        Task AddCommentAsync(CreateCommentDto dto , string userId);
        Task<List<ResponseCommentDto>> GetCommentsAsync( int taskId, string userId);
    }
}
