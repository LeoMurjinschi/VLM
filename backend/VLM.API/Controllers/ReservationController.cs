using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer.Structure; // Modificat pentru a folosi clasa concretă
using VLM.Domain.Models.Reservation;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/reservations")]
[Authorize]
public class ReservationController : ControllerBase
{
    private readonly ReservationActions _reservationActions; // Folosim clasa concretă

    // Folosim injecția de dependențe
    public ReservationController(ReservationActions reservationActions)
    {
        _reservationActions = reservationActions;
    }

    [HttpGet("list")]
    public IActionResult GetReservationList()
    {
        var result = _reservationActions.GetReservationListAction();
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetReservationById([FromRoute] int id)
    {
        var result = _reservationActions.GetReservationByIdAction(id);
        if (!result.IsSuccess) return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-receiver/{userId}")]
    public IActionResult GetByReceiver([FromRoute] int userId)
    {
        var result = _reservationActions.GetReservationsByReceiverAction(userId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("by-donor/{donorId}")]
    public IActionResult GetByDonor([FromRoute] int donorId)
    {
        var result = _reservationActions.GetReservationsByDonorAction(donorId);
        if (!result.IsSuccess) return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    [Authorize(Roles = "receiver")]
    public IActionResult CreateReservation([FromBody] ReservationCreateDto reservationCreateDto)
    {
        var result = _reservationActions.CreateReservationAction(reservationCreateDto);
        if (!result.IsSuccess) return BadRequest(new { message = result.Message });
        return Ok(result.Data);
    }

    [HttpPut("status/{id}")]
    public IActionResult UpdateStatus([FromRoute] int id, [FromBody] ReservationStatusUpdateDto dto)
    {
        var result = _reservationActions.UpdateReservationStatusAction(id, dto);
        if (!result.IsSuccess) return BadRequest(new { message = result.Message });
        return Ok(result.Data);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteReservation([FromRoute] int id)
    {
        var result = _reservationActions.DeleteReservationAction(id);
        if (!result.IsSuccess) return NotFound(new { message = result.Message });
        return Ok(new { message = result.Message });
    }
}