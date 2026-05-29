using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.AdminAnnouncement;

public class AdminAnnouncementEntity
{
    public int Id { get; set; }
    public int AdminId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Type { get; set; } = "info";
    public string Priority { get; set; } = "medium";
    public DateTime StartsAt { get; set; }
    public DateTime? EndsAt { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
    
    public UserEntity Admin { get; set; } = null!;
}