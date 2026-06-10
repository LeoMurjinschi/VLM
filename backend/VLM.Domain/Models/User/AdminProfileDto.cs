using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class AdminProfileDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Range(1, 10)]
    public int AdminLevel { get; set; } = 1;

    [StringLength(200)]
    public string DepartmentName { get; set; } = string.Empty;

    public Dictionary<string, bool> Permissions { get; set; } = new();

    public bool IsActive { get; set; } = true;
}
