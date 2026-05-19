namespace VLM.Domain.Models.Category;

public class CategoryInfoDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}