using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IProjectRepository ProjectRepository { get; }
        IProjectMemberRepository ProjectMemberRepository { get; }
        IProjectRoleRepository ProjectRoleRepository { get; }
        IUserRepository UserRepository { get; }
        
        Task SaveAsync();
    }
}
