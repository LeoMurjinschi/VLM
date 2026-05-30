using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer.Structure; 
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserActions _userActions;

    // AICI ESTE SCHIMBAREA: Injectăm UserActions
    public AuthController(UserActions userActions)
    {
        _userActions = userActions;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto loginDto)
    {
        var userAgent = Request.Headers["User-Agent"].ToString();
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;

        var result = _userActions.LoginAction(loginDto, userAgent, ipAddress);

        if (!result.IsSuccess)
            return Unauthorized(new { message = result.Message }); // Returnăm un obiect pentru consistență

        return Ok(result.Data);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserCreateDto userCreateDto)
    {
        var result = _userActions.CreateUserAction(userCreateDto);

        if (!result.IsSuccess)
        {
            return BadRequest(new { message = result.Message });
        }

        return StatusCode(201, new { message = result.Message });
    }
}