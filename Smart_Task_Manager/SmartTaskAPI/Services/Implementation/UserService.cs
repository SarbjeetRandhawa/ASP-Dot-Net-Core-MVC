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

        public async Task DeleteUserWithProjectRelationAsync(string userId)
        {
            await _uow.UserRepository.DeleteUserWithProjectRelationAsync(userId);
            await _uow.SaveAsync();
        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            return await _uow.UserRepository.GetAllAsync();
        }

        public async Task<string> GetUserRoleAsync(string userId)
        {
            return await _uow.UserRepository.GetUserRoleAsync(userId);
        }

        public async Task<List<UserSearchDto>> SearchUsersAsync(string query)
        {
            var users = await _uow.UserRepository.SearchUserAsync(query);
            return  users.Select(u => new UserSearchDto
            {
                Id = u.Id,
                Name = u.FirstName + " " + u.LastName,
            }).ToList();
        }
    }
}
