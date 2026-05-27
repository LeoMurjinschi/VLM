namespace VLM.Domain.Models.Milestone;

public class MilestoneCreateDto
{
    public int DonorId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Reward { get; set; } = string.Empty;
    public decimal CurrentAmount { get; set; }
    public decimal TargetAmount { get; set; }
}
