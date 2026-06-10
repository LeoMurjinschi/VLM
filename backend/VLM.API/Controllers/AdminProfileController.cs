using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/admin-profile")]
[Authorize]
public class AdminProfileController : ControllerBase
{
    private readonly IAdminProfileLogic _logic;

    public AdminProfileController()
    {
        var businessLogic = new BusinessLogic();
        _logic = businessLogic.GetAdminProfileLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult Get([FromRoute] int userId)
    {
        var result = _logic.GetAdminProfile(userId);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("save")]
    public IActionResult Save([FromBody] AdminProfileDto dto)
    {
        var result = _logic.UpsertAdminProfile(dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }
}
