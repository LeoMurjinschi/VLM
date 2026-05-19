using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Favorite;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/favorites")]
public class FavoriteController : ControllerBase
{
    private readonly IFavoriteLogic _favoriteLogic;

    public FavoriteController()
    {
        var businessLogic = new BusinessLogic();
        _favoriteLogic = businessLogic.GetFavoriteLogic();
    }

    [HttpGet("by-user/{userId}")]
    public IActionResult GetFavoritesByUser([FromRoute] int userId)
    {
        var result = _favoriteLogic.GetFavoritesByUser(userId);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetFavoriteById([FromRoute] int id)
    {
        var result = _favoriteLogic.GetFavoriteById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateFavorite([FromBody] FavoriteCreateDto favoriteCreateDto)
    {
        var result = _favoriteLogic.CreateFavorite(favoriteCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteFavorite([FromRoute] int id)
    {
        var result = _favoriteLogic.DeleteFavorite(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}