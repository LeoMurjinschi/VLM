using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.AdminAction;

public class AdminActionCreateDto
{
    [Range(1, int.MaxValue)]
    public int AdminId { get; set; }

    [Required]
    [StringLength(100)]
    public string ActionType { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string TargetType { get; set; } = string.Empty;

    public int? TargetId { get; set; }

    [StringLength(2000)]
    public string Details { get; set; } = string.Empty;
}
