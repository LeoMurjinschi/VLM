using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Reservation;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/reservations")]
[Authorize]
public class ReservationController : ControllerBase
{
    private readonly IReservationLogic _reservationLogic;

    public ReservationController()
    {
        var businessLogic = new BusinessLogic();
        _reservationLogic = businessLogic.GetReservationLogic();
    }

    [HttpGet("list")]
    [Authorize(Roles = "admin")]
    public IActionResult GetReservationList()
    {
        var result = _reservationLogic.GetReservationList();
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetReservationById([FromRoute] int id)
    {
        var result = _reservationLogic.GetReservationById(id);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-receiver/{userId}")]
    public IActionResult GetByReceiver([FromRoute] int userId)
    {
        var result = _reservationLogic.GetReservationsByReceiver(userId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-donor/{donorId}")]
    public IActionResult GetByDonor([FromRoute] int donorId)
    {
        var result = _reservationLogic.GetReservationsByDonor(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    [Authorize(Roles = "receiver")]
    public IActionResult CreateReservation([FromBody] ReservationCreateDto reservationCreateDto)
    {
        var result = _reservationLogic.CreateReservation(reservationCreateDto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPut("status/{id}")]
    public IActionResult UpdateStatus([FromRoute] int id, [FromBody] ReservationStatusUpdateDto dto)
    {
        var result = _reservationLogic.UpdateReservationStatus(id, dto);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteReservation([FromRoute] int id)
    {
        var result = _reservationLogic.DeleteReservation(id);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Message);
    }
}
