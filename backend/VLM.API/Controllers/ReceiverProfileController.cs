using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/receiver-profile")]
[Authorize]
public class ReceiverProfileController : ControllerBase
{
    private readonly IReceiverProfileLogic _logic;

    public ReceiverProfileController()
    {
        var businessLogic = new BusinessLogic();
        _logic = businessLogic.GetReceiverProfileLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult Get([FromRoute] int userId)
    {
        var result = _logic.GetReceiverProfile(userId);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("save")]
    public IActionResult Save([FromBody] ReceiverProfileDto dto)
    {
        var result = _logic.UpsertReceiverProfile(dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }
}
