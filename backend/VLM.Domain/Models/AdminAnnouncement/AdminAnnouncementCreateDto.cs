using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.AdminAnnouncement;

public class AdminAnnouncementCreateDto
{
    [Range(1, int.MaxValue)]
    public int AdminId { get; set; }

    [Required]
    [StringLength(300, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(10000, MinimumLength = 1)]
    public string Body { get; set; } = string.Empty;

    [AllowedValues("info", "warning", "urgent", "success")]
    public string Type { get; set; } = "info";

    [AllowedValues("low", "medium", "high", "critical")]
    public string Priority { get; set; } = "medium";

    public DateTime StartsAt { get; set; }
    public DateTime? EndsAt { get; set; }
    public bool IsActive { get; set; } = true;
}
