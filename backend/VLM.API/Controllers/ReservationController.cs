using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Reservation;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/reservations")]
public class ReservationController : ControllerBase
{
    private readonly IReservationLogic _reservationLogic;

    public ReservationController()
    {
        var businessLogic = new BusinessLogic();
        _reservationLogic = businessLogic.GetReservationLogic();
    }

    [HttpGet("list")]
    public IActionResult GetReservationList()
    {
        var result = _reservationLogic.GetReservationList();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetReservationById([FromRoute] int id)
    {
        var result = _reservationLogic.GetReservationById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateReservation([FromBody] ReservationCreateDto reservationCreateDto)
    {
        var result = _reservationLogic.CreateReservation(reservationCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateReservation([FromRoute] int id, [FromBody] ReservationCreateDto reservationCreateDto)
    {
        var result = _reservationLogic.UpdateReservation(id, reservationCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteReservation([FromRoute] int id)
    {
        var result = _reservationLogic.DeleteReservation(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
