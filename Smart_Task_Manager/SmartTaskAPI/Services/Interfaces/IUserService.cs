using SmartTaskAPI.Models.DTO;

namespace SmartTaskAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserResponseDto>> GetAllAsync();
        Task<string> GetUserRoleAsync(string userId);
    }
}
