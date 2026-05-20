using Microsoft.AspNetCore.Mvc;
using VLM.BusinessLayer;
using VLM.BusinessLayer.Interface;
using VLM.Domain.Models.Category;

namespace VLM.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryLogic _categoryLogic;

    public CategoryController()
    {
        var businessLogic = new BusinessLogic();
        _categoryLogic = businessLogic.GetCategoryLogic();
    }

    [HttpGet]
    public IActionResult GetAllCategories()
    {
        var result = _categoryLogic.GetAllCategories();
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetCategoryById([FromRoute] int id)
    {
        var result = _categoryLogic.GetCategoryById(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateCategory([FromBody] CategoryCreateDto categoryCreateDto)
    {
        var result = _categoryLogic.CreateCategory(categoryCreateDto);
        if (!result.IsSuccess)
            return BadRequest(result.Message);
        return Ok(result.Message);
    }

    [HttpPut("update/{id}")]
    public IActionResult UpdateCategory([FromRoute] int id, [FromBody] CategoryCreateDto categoryCreateDto)
    {
        var result = _categoryLogic.UpdateCategory(id, categoryCreateDto);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteCategory([FromRoute] int id)
    {
        var result = _categoryLogic.DeleteCategory(id);
        if (!result.IsSuccess)
            return NotFound(result.Message);
        return Ok(result.Message);
    }
}