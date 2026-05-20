using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Comment;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/comments")]
public class CommentController : ControllerBase
{
    private readonly ICommentLogic _commentLogic;

    public CommentController()
    {
        var businessLogic = new BusinessLogic();
        _commentLogic = businessLogic.GetCommentLogic();
    }

    [HttpGet("by-donation/{donationId}")]
    public IActionResult GetCommentsByDonation([FromRoute] int donationId)
    {
        var result = _commentLogic.GetCommentsByDonation(donationId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetCommentById([FromRoute] int id)
    {
        var result = _commentLogic.GetCommentById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateComment([FromBody] CommentCreateDto commentCreateDto)
    {
        var result = _commentLogic.CreateComment(commentCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateComment([FromRoute] int id, [FromBody] CommentCreateDto commentCreateDto)
    {
        var result = _commentLogic.UpdateComment(id, commentCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteComment([FromRoute] int id)
    {
        var result = _commentLogic.DeleteComment(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
