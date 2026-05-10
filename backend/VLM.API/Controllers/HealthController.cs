using Microsoft.AspNetCore.Mvc;

namespace VLM.API.Controllers;

    
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        [HttpGet("check")]
        public IActionResult Check() { 
        return Ok("server is up to running");
        }
    }


