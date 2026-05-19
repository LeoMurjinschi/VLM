namespace VLM.Domain.Models.Report;

public class ReportCreateDto
{
    public int ReporterId { get; set; }
    public int? DonationId { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}