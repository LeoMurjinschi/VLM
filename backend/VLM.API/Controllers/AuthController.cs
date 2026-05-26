using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer.Structure; 
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserActions _userActions;

    public AuthController()
    {
        
        _userActions = new UserActions();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto loginDto)
    {
        
        var result = _userActions.LoginAction(loginDto);

        
        if (!result.IsSuccess)
            return Unauthorized(result.Message);

        return Ok(result.Data);
    }
}