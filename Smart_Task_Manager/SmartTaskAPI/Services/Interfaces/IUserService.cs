using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllAsync();
        Task<string> GetUserRoleAsync(string userId);
        Task DeleteUserWithProjectRelationAsync(string userId);

        Task<List<UserSearchDto>> SearchUsersAsync(string query);

    }
    
}
