namespace VLM.Domain.Models.User;

public class AdminProfileDto
{
    public int UserId { get; set; }
    public int AdminLevel { get; set; } = 1;
    public string DepartmentName { get; set; } = string.Empty;
    public Dictionary<string, bool> Permissions { get; set; } = new();
    public bool IsActive { get; set; } = true;
}
