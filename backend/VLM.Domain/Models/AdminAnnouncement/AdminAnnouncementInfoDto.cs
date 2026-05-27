namespace VLM.Domain.Models.AdminAnnouncement;

public class AdminAnnouncementInfoDto
{
    public int Id { get; set; }
    public int AdminId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public DateTime StartsAt { get; set; }
    public DateTime? EndsAt { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}