namespace VLM.Domain.Models.AdminAction;

public class AdminActionCreateDto
{
    public int AdminId { get; set; }
    public string ActionType { get; set; } = string.Empty;
    public string TargetType { get; set; } = string.Empty;
    public int? TargetId { get; set; }
    public string Details { get; set; } = string.Empty;
}