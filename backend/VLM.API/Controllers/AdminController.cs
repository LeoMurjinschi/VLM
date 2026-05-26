using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Admin;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IUserLogic _userLogic;

    public AdminController()
    {
        var businessLogic = new BusinessLogic();
        _userLogic = businessLogic.GetUserLogic();
    }

    [HttpGet("pending-users")]
    public IActionResult GetPendingUsers()
    {
        var result = _userLogic.GetPendingUsers();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("approve-user/{userId}")]
    public IActionResult ApproveUser([FromRoute] int userId, [FromBody] AccountApprovalDecisionDto decisionDto)
    {
        var result = _userLogic.ApproveUser(userId, decisionDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("reject-user/{userId}")]
    public IActionResult RejectUser([FromRoute] int userId, [FromBody] AccountApprovalDecisionDto decisionDto)
    {
        var result = _userLogic.RejectUser(userId, decisionDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }
}