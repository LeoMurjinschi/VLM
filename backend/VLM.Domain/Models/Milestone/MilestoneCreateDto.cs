using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Milestone;

public class MilestoneCreateDto
{
    [Range(1, int.MaxValue)]
    public int DonorId { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string Reward { get; set; } = string.Empty;

    [Range(0, 1000000)]
    public decimal CurrentAmount { get; set; }

    [Range(1, 1000000, ErrorMessage = "Target amount must be at least 1")]
    public decimal TargetAmount { get; set; }
}
