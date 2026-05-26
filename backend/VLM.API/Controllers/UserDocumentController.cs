using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Document;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/documents")]
[Authorize]
public class UserDocumentController : ControllerBase
{
    private readonly IUserDocumentLogic _logic;

    public UserDocumentController()
    {
        var businessLogic = new BusinessLogic();
        _logic = businessLogic.GetUserDocumentLogic();
    }

    [HttpGet("by-user/{userId}")]
    public IActionResult GetByUser([FromRoute] int userId)
    {
        var result = _logic.GetDocumentsByUser(userId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("upload")]
    public IActionResult Upload([FromBody] UserDocumentCreateDto dto)
    {
        var result = _logic.UploadDocument(dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpDelete("{id}/user/{userId}")]
    public IActionResult Delete([FromRoute] int id, [FromRoute] int userId)
    {
        var result = _logic.DeleteDocument(id, userId);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Message);
    }
}
