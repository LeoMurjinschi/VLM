using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.AdminAction;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/admin-actions")]
public class AdminActionController : ControllerBase
{
    private readonly IAdminActionLogic _adminActionLogic;

    public AdminActionController()
    {
        var businessLogic = new BusinessLogic();
        _adminActionLogic = businessLogic.GetAdminActionLogic();
    }

    [HttpGet]
    public IActionResult GetAllAdminActions()
    {
        var result = _adminActionLogic.GetAllAdminActions();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-admin/{adminId}")]
    public IActionResult GetAdminActionsByAdmin([FromRoute] int adminId)
    {
        var result = _adminActionLogic.GetAdminActionsByAdmin(adminId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetAdminActionById([FromRoute] int id)
    {
        var result = _adminActionLogic.GetAdminActionById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateAdminAction([FromBody] AdminActionCreateDto dto)
    {
        var result = _adminActionLogic.CreateAdminAction(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteAdminAction([FromRoute] int id)
    {
        var result = _adminActionLogic.DeleteAdminAction(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}