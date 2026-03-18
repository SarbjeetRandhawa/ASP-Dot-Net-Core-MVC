using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _uow;
        public UserService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            return await _uow.UserRepository.GetAllAsync();
        }

        public async Task<string> GetUserRoleAsync(string userId)
        {
            return await _uow.UserRepository.GetUserRoleAsync(userId);
        }
    }
}
