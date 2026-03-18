using Microsoft.EntityFrameworkCore;
using SmartTaskAPI.Models.DTO;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
    public class ProjectMemberService : IProjectMemberService
    {
        private readonly IUnitOfWork _uow;
        public ProjectMemberService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task AddMemberAsync(int projectId, AddMemberDto dto, string currentUserId , int ProjectRoleId)
        {
            string adderRole = _uow.UserRepository.GetUserRoleAsync(currentUserId).ToString() ?? "";
            string targetRole = _uow.UserRepository.GetUserRoleAsync(dto.UserId).ToString() ?? "";

            await _uow.ProjectMemberRepository.AddMemberAsync(projectId, dto, currentUserId, adderRole, targetRole , ProjectRoleId);
            await _uow.SaveAsync();
        }

        public async Task<List<ProjectMemberResponseDto>> GetAllMembersAsync(int projectId)
        {
            return await _uow.ProjectMemberRepository.GetAllMembersAsync(projectId);
        }

        public async Task RemoveMemberAsync(int projectId, string targetUserId, string currentUserId)
        {
            string CurrentUserRole = _uow.UserRepository.GetUserRoleAsync(currentUserId).ToString() ?? "";
            string targetUserRole = _uow.UserRepository.GetUserRoleAsync(targetUserId).ToString() ?? "";
            await _uow.ProjectMemberRepository.RemoveMemberAsync(projectId, targetUserId, currentUserId , CurrentUserRole , targetUserRole);
            await _uow.SaveAsync();

        }
    }
}
