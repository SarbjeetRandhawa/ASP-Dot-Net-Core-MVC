using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
    public class CommentLikeService : ICommentLikeService
    {
        private readonly IUnitOfWork _uow;

        public CommentLikeService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task ToogleLike(int CommentId, string userId)
        {
               await _uow.CommentLikesRepository.ToggleLike(CommentId, userId);
            await _uow.SaveAsync();
        }
    }
}
