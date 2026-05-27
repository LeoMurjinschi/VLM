using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.AccountApproval;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/account-approvals")]
public class AccountApprovalController : ControllerBase
{
    private readonly IAccountApprovalLogic _accountApprovalLogic;

    public AccountApprovalController()
    {
        var businessLogic = new BusinessLogic();
        _accountApprovalLogic = businessLogic.GetAccountApprovalLogic();
    }

    [HttpGet]
    public IActionResult GetAllAccountApprovals()
    {
        var result = _accountApprovalLogic.GetAllAccountApprovals();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-user/{userId}")]
    public IActionResult GetAccountApprovalsByUser([FromRoute] int userId)
    {
        var result = _accountApprovalLogic.GetAccountApprovalsByUser(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetAccountApprovalById([FromRoute] int id)
    {
        var result = _accountApprovalLogic.GetAccountApprovalById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateAccountApproval([FromBody] AccountApprovalCreateDto dto)
    {
        var result = _accountApprovalLogic.CreateAccountApproval(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteAccountApproval([FromRoute] int id)
    {
        var result = _accountApprovalLogic.DeleteAccountApproval(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}