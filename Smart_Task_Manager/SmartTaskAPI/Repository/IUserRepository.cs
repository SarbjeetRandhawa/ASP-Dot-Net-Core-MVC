using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Repository
{
    public interface IUserRepository
    {
        Task<List<ApplicationUser>> GetAllAsync();
    }
}
