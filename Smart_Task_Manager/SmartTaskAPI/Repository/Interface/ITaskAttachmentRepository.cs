using SmartTaskAPI.Models.DB;

namespace SmartTaskAPI.Repository.Interface
{
    public interface ITaskAttachmentRepository
    {
        Task AddAsync(TaskAttachment attachement);
    }
}
