using SmartTaskAPI.Repository.Interface;

namespace SmartTaskAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IProjectRepository ProjectRepository { get; }
        IProjectMemberRepository ProjectMemberRepository { get; }
        IProjectRoleRepository ProjectRoleRepository { get; }
        IUserRepository UserRepository { get; }

        public ITaskRepository TaskRepository { get; }
        public ITaskAttachmentRepository TaskAttachmentRepository { get; }

        public ICommentRepository CommentRepository { get; }



        Task SaveAsync();
    }
}
