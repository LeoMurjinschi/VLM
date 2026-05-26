using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.SystemSetting;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/system-settings")]
public class SystemSettingController : ControllerBase
{
    private readonly ISystemSettingLogic _settingLogic;

    public SystemSettingController()
    {
        var businessLogic = new BusinessLogic();
        _settingLogic = businessLogic.GetSystemSettingLogic();
    }

    [HttpGet]
    public IActionResult GetAllSettings()
    {
        var result = _settingLogic.GetAllSettings();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetSettingById([FromRoute] int id)
    {
        var result = _settingLogic.GetSettingById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-key/{key}")]
    public IActionResult GetSettingByKey([FromRoute] string key)
    {
        var result = _settingLogic.GetSettingByKey(key);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateSetting([FromBody] SystemSettingCreateDto dto)
    {
        var result = _settingLogic.CreateSetting(dto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateSetting([FromRoute] int id, [FromBody] SystemSettingCreateDto dto)
    {
        var result = _settingLogic.UpdateSetting(id, dto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteSetting([FromRoute] int id)
    {
        var result = _settingLogic.DeleteSetting(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
