using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.ProjectDto;
using SmartTaskAPI.Repository.Interface;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{
   
    public class ProjectRoleService : IProjectRoleService
    {
        private readonly IUnitOfWork _uow;
        public ProjectRoleService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<List<ProjectRoleDTO>> GetAllAsync()
        {
           return await _uow.ProjectRoleRepository.GetAllAsync();
            
        }

        public async Task<ProjectRole> GetByIdAsync(int id)
        {
            return await _uow.ProjectRoleRepository.GetByIdAsync(id);
        }
    }
}
