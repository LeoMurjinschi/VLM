namespace VLM.Domain.Entities.Category;

public class CategoryEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
}