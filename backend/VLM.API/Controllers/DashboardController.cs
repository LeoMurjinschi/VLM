using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardLogic _dashboardLogic;

    public DashboardController()
    {
        var businessLogic = new BusinessLogic();
        _dashboardLogic = businessLogic.GetDashboardLogic();
    }

    [HttpGet("{donorId}/stats")]
    public IActionResult GetStats([FromRoute] int donorId)
    {
        var result = _dashboardLogic.GetDonorStats(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{donorId}/bar-chart")]
    public IActionResult GetBarChart([FromRoute] int donorId)
    {
        var result = _dashboardLogic.GetDonorBarChart(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{donorId}/pie-chart")]
    public IActionResult GetPieChart([FromRoute] int donorId)
    {
        var result = _dashboardLogic.GetDonorPieChart(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{donorId}/activity")]
    public IActionResult GetRecentActivity([FromRoute] int donorId, [FromQuery] int limit = 10)
    {
        var result = _dashboardLogic.GetDonorRecentActivity(donorId, limit);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }
}
