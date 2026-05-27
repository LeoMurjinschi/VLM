using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Milestone;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/milestones")]
[Authorize]
public class MilestoneController : ControllerBase
{
    private readonly IMilestoneLogic _milestoneLogic;

    public MilestoneController()
    {
        var businessLogic = new BusinessLogic();
        _milestoneLogic = businessLogic.GetMilestoneLogic();
    }

    [HttpGet("donor/{donorId}")]
    public IActionResult GetByDonor([FromRoute] int donorId)
    {
        var result = _milestoneLogic.GetMilestonesByDonorId(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        var result = _milestoneLogic.GetMilestoneById(id);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    [Authorize(Roles = "donor,admin")]
    public IActionResult Create([FromBody] MilestoneCreateDto dto)
    {
        var result = _milestoneLogic.CreateMilestone(dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("update/{id}")]
    [Authorize(Roles = "donor,admin")]
    public IActionResult Update([FromRoute] int id, [FromBody] MilestoneUpdateDto dto)
    {
        var result = _milestoneLogic.UpdateMilestone(id, dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Roles = "donor,admin")]
    public IActionResult Delete([FromRoute] int id)
    {
        var result = _milestoneLogic.DeleteMilestone(id);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Message);
    }
}
