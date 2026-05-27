using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.User;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/donor-profile")]
[Authorize]
public class DonorProfileController : ControllerBase
{
    private readonly IDonorProfileLogic _logic;

    public DonorProfileController()
    {
        var businessLogic = new BusinessLogic();
        _logic = businessLogic.GetDonorProfileLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult Get([FromRoute] int userId)
    {
        var result = _logic.GetDonorProfile(userId);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("save")]
    public IActionResult Save([FromBody] DonorProfileDto dto)
    {
        var result = _logic.UpsertDonorProfile(dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("{userId}/pickup-locations")]
    public IActionResult SavePickupLocations([FromRoute] int userId, [FromBody] string locationsJson)
    {
        var result = _logic.SavePickupLocations(userId, locationsJson);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }
}
