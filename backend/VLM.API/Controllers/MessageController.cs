using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Message;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/messages")]
public class MessageController : ControllerBase
{
    private readonly IMessageLogic _messageLogic;

    public MessageController()
    {
        var businessLogic = new BusinessLogic();
        _messageLogic = businessLogic.GetMessageLogic();
    }

    [HttpGet("contacts/{userId}")]
    public IActionResult GetContacts([FromRoute] int userId)
    {
        var result = _messageLogic.GetContacts(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("conversation/{userId1}/{userId2}")]
    public IActionResult GetConversation([FromRoute] int userId1, [FromRoute] int userId2)
    {
        var result = _messageLogic.GetConversation(userId1, userId2);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("send")]
    public IActionResult SendMessage([FromBody] MessageCreateDto dto)
    {
        var result = _messageLogic.SendMessage(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteMessage([FromRoute] int id)
    {
        var result = _messageLogic.DeleteMessage(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}