using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Models.Identity;

namespace SmartTaskAPI.Repository.Interface
{
    public interface IUserRepository
    {
        Task<List<UserResponseDto>> GetAllAsync();
        Task<string> GetUserRoleAsync(string userId);
        Task DeleteUserWithProjectRelationAsync(string userId);

        
    }
}
