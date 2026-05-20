namespace VLM.Domain.Models.Notification;

public class NotificationCreateDto
{
    public int UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
}