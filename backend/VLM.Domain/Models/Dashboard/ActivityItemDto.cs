namespace VLM.Domain.Models.Dashboard;

public class ActivityItemDto
{
    public int Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Type { get; set; } = "info";
}
