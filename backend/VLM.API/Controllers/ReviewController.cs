using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Review;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewController : ControllerBase
{
    private readonly IReviewLogic _reviewLogic;

    public ReviewController()
    {
        var businessLogic = new BusinessLogic();
        _reviewLogic = businessLogic.GetReviewLogic();
    }

    [HttpGet("by-donor/{donorId}")]
    public IActionResult GetReviewsByDonor([FromRoute] int donorId)
    {
        var result = _reviewLogic.GetReviewsByDonor(donorId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetReviewById([FromRoute] int id)
    {
        var result = _reviewLogic.GetReviewById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateReview([FromBody] ReviewCreateDto reviewCreateDto)
    {
        var result = _reviewLogic.CreateReview(reviewCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateReview([FromRoute] int id, [FromBody] ReviewCreateDto reviewCreateDto)
    {
        var result = _reviewLogic.UpdateReview(id, reviewCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteReview([FromRoute] int id)
    {
        var result = _reviewLogic.DeleteReview(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}
