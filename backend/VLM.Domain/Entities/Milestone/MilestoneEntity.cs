using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Milestone;

public class MilestoneEntity
{
    public int Id { get; set; }
    public int DonorId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Reward { get; set; } = string.Empty;
    public decimal CurrentAmount { get; set; }
    public decimal TargetAmount { get; set; }
    public DateTime CreatedDate { get; set; }

    public UserEntity Donor { get; set; } = null!;
}
