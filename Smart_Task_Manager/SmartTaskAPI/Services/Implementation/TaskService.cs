using SmartTaskAPI.Models.DB;
using SmartTaskAPI.Models.DTO.Task;
using SmartTaskAPI.Services.Interfaces;
using SmartTaskAPI.UnitOfWork;

namespace SmartTaskAPI.Services.Implementation
{


    public class TaskService : ITaskService
    {
        private readonly IUnitOfWork _uow;

        public TaskService(IUnitOfWork uow) {  _uow = uow; }

        public async Task CreateTaskAsync(CreateTaskDto dto, string userId)
        {
            var Task = new TaskItem
            {
                TaskCode = "TF-" + Guid.NewGuid().ToString().Substring(0, 3),
                ProjectId = dto.ProjectId,
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = 0,
                AssignedToUserId = dto.AssignedToUserId,
                CreatedByUserId=userId,
                DueDate = dto.DueDate,


            };
            await _uow.TaskRepository.AddAsync(Task);
            await _uow.SaveAsync();
            //return Task;

            if (dto.Files != null && dto.Files.Any()) {

                foreach (var file in dto.Files)
                {

                    var folderPath = Path.Combine("wwwroot", "uploads");
                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(folderPath, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var attachment = new TaskAttachment
                    {
                        TaskId = Task.Id,
                        OrignalName = file.FileName,
                        FileName = fileName,
                        FilePath = "/uploads/" + fileName,
                        FileSize = file.Length,
                        MimeType = file.ContentType,
                        UploadedByUserId = userId,
                    };

                    await _uow.TaskAttachmentRepository.AddAsync(attachment);
                    await _uow.SaveAsync();
                }

             }
        }

        public async Task<object> GetAllTasksAsync(string userId , QueryParams query)
        {
            var (tasks, totalCount) = await _uow.TaskRepository.GetAllAsync(userId, query);
            var result = tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                TaskCode = t.TaskCode,
                ProjectId = t.ProjectId,
                ProjectName = t.Project.Name,
                Title = t.Title,
                Priority = t.Priority,
                AssignedToName = t.AssignedToUser?.FirstName + " " + t.AssignedToUser?.LastName,
                AssignedByName = t.CreatedByUser?.FirstName + " " + t.CreatedByUser?.LastName,
                Status = t.Status,
                DueDate = t.DueDate,
                CreatedAt = t.CreatedAt,
                FilesCount = t.Attachments.Count()
                
                
            });

            return new
            {
                data = result,
                totalCount
            };
        }

        public async Task<TaskResponseDetailDto> GetTaskById(int TaskId)
        {
            var  Task = await _uow.TaskRepository.GetByIdAsync(TaskId);


            return new TaskResponseDetailDto
            {
                Id = Task.Id,
                Title = Task.Title,
                Description = Task.Description,
                Status = Task.Status,
                Priority = Task.Priority,
                DueDate = Task.DueDate,
                CreatedAt=Task.CreatedAt,
                UpdatedAt = Task.UpdatedAt,
                ProjectName = Task.Project.Name,
                AssignedToName = Task.AssignedToUser?.FirstName + " " + Task.AssignedToUser?.LastName,
                AssignedByName = Task.CreatedByUser?.FirstName + " " + Task.CreatedByUser?.LastName,
                Files = Task.Attachments.Select(a => new AttachmentDto
                {
                    Id = a.Id,
                    OrignalName = a.OrignalName,
                    FileName = a.FileName,
                    FilePath = a.FilePath,
                    type = a.MimeType,
                    FileSize = a.FileSize,
                    UploadedAt = a.UploadedAt,
                    UploadedByUser = a.UploadedByUser.FirstName + " " + a.UploadedByUser.LastName
                }).ToList(),


            };
        }

        public Task<TaskCountDto> GetTaskCountsAsync(string userId, QueryParams query)
        {
            return _uow.TaskRepository.GetTaskCountsAsync(userId, query);
        }

        public async Task<IEnumerable<TaskDto>> GetTaskItemsByPtojectIdAsync(string userId, int projectId)
        {
            var tasks = await _uow.TaskRepository.GetByProjectIdAsync(userId, projectId);
            return tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                TaskCode = t.TaskCode,
                Priority = t.Priority,
                AssignedToName = t.AssignedToUser?.FirstName + " " + t.AssignedToUser?.LastName,
                AssignedByName = t.CreatedByUser?.FirstName + " " + t.CreatedByUser?.LastName,
                Status = t.Status,
                DueDate = t.DueDate,
            });
        }

        public async Task<bool> UpdateTaskStatus(UpdateTaskStatusDto dto)
        {
            await _uow.TaskRepository.UpdateTaskStatus(dto.TaskId, dto.Status);
            await _uow.SaveAsync();
            return true;    
        }
    }
}
