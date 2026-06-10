using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Category;

public class CategoryCreateDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Icon { get; set; }

    public bool IsActive { get; set; } = true;
}
