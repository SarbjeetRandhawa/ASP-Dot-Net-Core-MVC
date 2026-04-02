using SmartTaskAPI.Data;
using SmartTaskAPI.Repository.Implementation;
using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly AppDbContext _context;
       public IProjectRepository ProjectRepository { get; }
        public IProjectMemberRepository ProjectMemberRepository { get; }
        public IProjectRoleRepository ProjectRoleRepository { get; }
        public IUserRepository UserRepository { get; }

        public ITaskRepository TaskRepository { get; }
        public ITaskAttachmentRepository TaskAttachmentRepository { get; }

        public UnitOfWork(AppDbContext context, IUserRepository userRepository)
        {
            this._context=context;
            this.UserRepository=userRepository;

            this.ProjectRepository = new ProjectRepository(context);
            this.ProjectMemberRepository = new ProjectMemberRepository(context);
            this.ProjectRoleRepository = new ProjectRoleRepository(context);
            this.TaskRepository = new TaskRepository(context);
            this.TaskAttachmentRepository = new TaskAttachmentRepository(context);
        }

        public async Task SaveAsync() 
        {
            await _context.SaveChangesAsync();
        }

    }
}
