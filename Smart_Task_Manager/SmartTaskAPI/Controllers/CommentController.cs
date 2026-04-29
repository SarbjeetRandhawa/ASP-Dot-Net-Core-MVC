using Microsoft.AspNetCore.Mvc;
using SmartTaskAPI.Models.DTO.Comment;
using SmartTaskAPI.Services.Implementation;
using SmartTaskAPI.Services.Interfaces;
using System.Security.Claims;

namespace SmartTaskAPI.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]

    public class CommentController : Controller
    {


        private readonly ICommentService commentService;
        private readonly ICommentLikeService commentLikeService;

        public CommentController(ICommentService commentService, ICommentLikeService commentLikesService)
        {
        
            this.commentService = commentService;
            this.commentLikeService = commentLikeService;

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

            var userId = GetUserId();
            var result = await commentService.GetCommentsAsync(taskId, userId);
            return Ok(result);

        }

        [HttpPost("like/{commentId}")]
        public async Task<IActionResult> ToggleLike(int commentId)
        {
            var userId = GetUserId();
            await commentLikeService.ToogleLike(commentId, userId);
            return Ok();
        }
    }
}
