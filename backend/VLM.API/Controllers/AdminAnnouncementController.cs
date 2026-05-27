using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.AdminAnnouncement;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/admin-announcements")]
public class AdminAnnouncementController : ControllerBase
{
    private readonly IAdminAnnouncementLogic _announcementLogic;

    public AdminAnnouncementController()
    {
        var businessLogic = new BusinessLogic();
        _announcementLogic = businessLogic.GetAdminAnnouncementLogic();
    }

    [HttpGet]
    public IActionResult GetAllAnnouncements()
    {
        var result = _announcementLogic.GetAllAnnouncements();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("active")]
    public IActionResult GetActiveAnnouncements()
    {
        var result = _announcementLogic.GetActiveAnnouncements();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetAnnouncementById([FromRoute] int id)
    {
        var result = _announcementLogic.GetAnnouncementById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateAnnouncement([FromBody] AdminAnnouncementCreateDto dto)
    {
        var result = _announcementLogic.CreateAnnouncement(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateAnnouncement([FromRoute] int id, [FromBody] AdminAnnouncementCreateDto dto)
    {
        var result = _announcementLogic.UpdateAnnouncement(id, dto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteAnnouncement([FromRoute] int id)
    {
        var result = _announcementLogic.DeleteAnnouncement(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
