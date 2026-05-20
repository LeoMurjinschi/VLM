using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Notification;

public class NotificationEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public UserEntity User { get; set; } = null!;
}