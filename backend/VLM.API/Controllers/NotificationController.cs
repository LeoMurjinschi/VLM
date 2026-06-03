using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Notification;
using System.Security.Claims; // Adăugat pentru ClaimTypes

namespace VLM.API.Controllers;

[ApiController]
[Route("api/notifications")]
[Authorize] // Toate acțiunile de aici necesită autentificare
public class NotificationController : ControllerBase
{
    private readonly INotificationLogic _notificationLogic;

    public NotificationController()
    {
        var businessLogic = new BusinessLogic();
        _notificationLogic = businessLogic.GetNotificationLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult GetNotifications([FromRoute] int userId)
    {
        // Extragem ID-ul corect folosind ClaimTypes.NameIdentifier
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (int.TryParse(userIdClaim, out int currentUserId))
        {
            if (userId != currentUserId)
            {
                return Forbid();
            }
        }
        else
        {
            return Unauthorized(); // Token invalid sau lipsă
        }

        var result = _notificationLogic.GetNotificationsByUser(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        
        return Ok(result.Data);
    }

    [HttpGet("unread-count/{userId}")]
    public IActionResult GetUnreadCount([FromRoute] int userId)
    {
        // Extragem ID-ul corect folosind ClaimTypes.NameIdentifier
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (int.TryParse(userIdClaim, out int currentUserId))
        {
            if (userId != currentUserId)
            {
                return Forbid();
            }
        }
        else
        {
            return Unauthorized(); // Token invalid sau lipsă
        }

        var result = _notificationLogic.GetUnreadCount(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);

        if (result.Data == null)
        {
            return Ok(new { count = 0 });
        }

        return Ok(new { count = (int)result.Data });
    }

    [HttpPost("{id}/mark-as-read")]
    public IActionResult MarkAsRead([FromRoute] int id)
    {
        // Aici ai putea adăuga o verificare suplimentară pentru a te asigura că 
        // utilizatorul care face cererea este chiar deținătorul notificării.
        var result = _notificationLogic.MarkAsRead(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        
        return Ok(new { message = result.Message });
    }
}