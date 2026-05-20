using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Donation;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/donations")]
public class DonationController : ControllerBase
{
    private readonly IDonationLogic _donationLogic;

    public DonationController()
    {
        var businessLogic = new BusinessLogic();
        _donationLogic = businessLogic.GetDonationLogic();
    }

    [HttpGet("list")]
    public IActionResult GetDonationList()
    {
        var result = _donationLogic.GetDonationList();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetDonationById([FromRoute] int id)
    {
        var result = _donationLogic.GetDonationById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateDonation([FromBody] DonationCreateDto donationCreateDto)
    {
        var result = _donationLogic.CreateDonation(donationCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateDonation([FromRoute] int id, [FromBody] DonationCreateDto donationCreateDto)
    {
        var result = _donationLogic.UpdateDonation(id, donationCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteDonation([FromRoute] int id)
    {
        var result = _donationLogic.DeleteDonation(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
