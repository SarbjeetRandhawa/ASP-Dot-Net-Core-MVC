namespace SmartTaskAPI.Services.Interfaces
{
    public interface ICommentLikeService
    {
        Task ToogleLike(int CommentId , string userId);
    }
}
