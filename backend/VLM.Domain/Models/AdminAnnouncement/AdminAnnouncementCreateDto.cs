namespace VLM.Domain.Models.AdminAnnouncement;

public class AdminAnnouncementCreateDto
{
    public int AdminId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Type { get; set; } = "info";
    public string Priority { get; set; } = "medium";
    public DateTime StartsAt { get; set; }
    public DateTime? EndsAt { get; set; }
    public bool IsActive { get; set; } = true;
}