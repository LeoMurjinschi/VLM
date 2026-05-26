using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Notification;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize]
public class NotificationController : ControllerBase
{
    private readonly INotificationLogic _notificationLogic;

    public NotificationController()
    {
        var businessLogic = new BusinessLogic();
        _notificationLogic = businessLogic.GetNotificationLogic();
    }

    [HttpGet("by-user/{userId}")]
    public IActionResult GetNotificationsByUser([FromRoute] int userId)
    {
        var result = _notificationLogic.GetNotificationsByUser(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateNotification([FromBody] NotificationCreateDto dto)
    {
        var result = _notificationLogic.CreateNotification(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("read/{id}")]
    public IActionResult MarkAsRead([FromRoute] int id)
    {
        var result = _notificationLogic.MarkAsRead(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteNotification([FromRoute] int id)
    {
        var result = _notificationLogic.DeleteNotification(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}