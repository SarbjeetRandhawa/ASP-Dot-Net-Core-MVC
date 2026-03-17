using SmartTaskAPI.Data;
using SmartTaskAPI.Repository;

namespace SmartTaskAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly AppDbContext _context;
       public IProjectRepository ProjectRepository { get; }
        public IProjectMemberRepository ProjectMemberRepository { get; }
        public IUserRepository UserRepository { get; }
        public UnitOfWork(AppDbContext context,IProjectRepository projectRepository , IUserRepository userRepository, IProjectMemberRepository projectMemberRepository)
        {
            this._context=context;
            this.ProjectRepository=projectRepository;
            this.ProjectMemberRepository=projectMemberRepository;
            this.UserRepository=userRepository;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
