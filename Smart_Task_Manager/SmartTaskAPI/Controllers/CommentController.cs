using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.DTO.Comment;
using SmartTaskAPI.Services.Implementation;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]
    public class CommentController : Controller
    {

        private readonly CommentService commentService;

        public CommentController(CommentService commentService)
        {
            this.commentService = commentService;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        [HttpPost]
        public async Task<IActionResult> AddComment(CreateCommentDto dto)
        {
            var userId = GetUserId();
            await commentService.AddCommentAsync(dto, userId);
            return Ok("comment added");

        }
        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetComments(int taskId)
        {
            var result = await commentService.GetCommentsAsync(taskId);
            return Ok(result);
        }
    }
}
