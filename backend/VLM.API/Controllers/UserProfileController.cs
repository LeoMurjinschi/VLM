using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/profile")]
public class UserProfileController : ControllerBase
{
    private readonly IUserProfileLogic _profileLogic;

    public UserProfileController()
    {
        var businessLogic = new BusinessLogic();
        _profileLogic = businessLogic.GetUserProfileLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult GetProfile([FromRoute] int userId)
    {
        var result = _profileLogic.GetProfileByUser(userId);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("save")]
    public IActionResult UpsertProfile([FromBody] UserProfileDto dto)
    {
        var result = _profileLogic.UpsertProfile(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
}
