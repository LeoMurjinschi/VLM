using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Report;

public class ReportEntity
{
    public int Id { get; set; }
    public int ReporterId { get; set; }
    public int? DonationId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime CreatedDate { get; set; }
    public DateTime? ResolvedDate { get; set; }
    
    public UserEntity Reporter { get; set; } = null!;
    public DonationEntity? Donation { get; set; }
}