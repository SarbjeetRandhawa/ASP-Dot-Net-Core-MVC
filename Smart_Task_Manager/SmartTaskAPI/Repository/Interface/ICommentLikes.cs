namespace SmartTaskAPI.Repository.Interface
{
    public interface ICommentLikes
    {
        Task ToggleLike(int commentId, string userId);
    }
}
