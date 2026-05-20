using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/settings")]
public class UserSettingsController : ControllerBase
{
    private readonly IUserSettingsLogic _settingsLogic;

    public UserSettingsController()
    {
        var businessLogic = new BusinessLogic();
        _settingsLogic = businessLogic.GetUserSettingsLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult GetSettings([FromRoute] int userId)
    {
        var result = _settingsLogic.GetSettingsByUser(userId);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("save")]
    public IActionResult UpsertSettings([FromBody] UserSettingsDto dto)
    {
        var result = _settingsLogic.UpsertSettings(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
}
