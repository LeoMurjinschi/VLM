using Microsoft.AspNetCore.Mvc;
using VLM.DataAccessLayer.Context;
using VLM.Domain.Models.Auth;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly VlmDbContext _dbContext;

    public AuthController()
    {
        _dbContext = new VlmDbContext();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var user = _dbContext.Users.FirstOrDefault(u =>
            u.Email == loginDto.Email && u.PasswordHash == loginDto.Password);

        if (user == null)
            return Unauthorized("Invalid email or password.");

        if (!user.IsActive)
            return Unauthorized("Account is inactive.");

        var response = new LoginResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Avatar = user.Avatar
        };

        return Ok(response);
    }
}