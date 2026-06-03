using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserLogic _userLogic;

    public UserController()
    {
        var businessLogic = new BusinessLogic();
        _userLogic = businessLogic.GetUserLogic();
    }

    [HttpGet("list")]
    [Authorize(Roles = "admin")]
    public IActionResult GetUserList()
    {
        var result = _userLogic.GetUserList();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById([FromRoute] int id)
    {
        var result = _userLogic.GetUserById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    [AllowAnonymous]
    public IActionResult CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        var result = _userLogic.CreateUser(userCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserCreateDto userCreateDto)
    {
        var result = _userLogic.UpdateUser(id, userCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("info/{id}")]
    public IActionResult UpdateUserInfo([FromRoute] int id, [FromBody] UserInfoUpdateDto dto)
    {
        var result = _userLogic.UpdateUserInfo(id, dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("change-password/{id}")]
    public IActionResult ChangePassword([FromRoute] int id, [FromBody] ChangePasswordDto dto)
    {
        var result = _userLogic.ChangePassword(id, dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("toggle-active/{id}")]
    [Authorize(Roles = "admin")]
    public IActionResult ToggleUserActive([FromRoute] int id)
    {
        var result = _userLogic.ToggleUserActive(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Roles = "admin")]
    public IActionResult DeleteUser([FromRoute] int id)
    {
        var result = _userLogic.DeleteUser(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("has-accepted-safety-commitment/{id}")]
    public IActionResult AcceptSafetyCommitment([FromRoute] int id)
    {
        var result = _userLogic.AcceptSafetyCommitment(id);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
}