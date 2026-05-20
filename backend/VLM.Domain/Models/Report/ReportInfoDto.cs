namespace VLM.Domain.Models.Report;

public class ReportInfoDto
{
    public int Id { get; set; }
    public int ReporterId { get; set; }
    public int? DonationId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? ResolvedDate { get; set; }
}