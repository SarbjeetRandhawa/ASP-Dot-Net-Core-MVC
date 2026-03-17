using SmartTaskAPI.Repository;

namespace SmartTaskAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IProjectRepository ProjectRepository { get; }
        IProjectMemberRepository ProjectMemberRepository { get; }
        IUserRepository UserRepository { get; }
        
        Task SaveAsync();
    }
}
