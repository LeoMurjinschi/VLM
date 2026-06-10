using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/user-statistics")]
[Authorize]
public class UserStatisticsController : ControllerBase
{
    private readonly IUserStatisticsLogic _logic;

    public UserStatisticsController()
    {
        var businessLogic = new BusinessLogic();
        _logic = businessLogic.GetUserStatisticsLogic();
    }

    [HttpGet("{userId}")]
    public IActionResult Get([FromRoute] int userId)
    {
        var result = _logic.GetUserStatistics(userId);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }
}
