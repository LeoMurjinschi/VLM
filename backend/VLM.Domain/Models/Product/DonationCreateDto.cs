namespace VLM.Domain.Models.Donation;

public class DonationCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public int DonorId { get; set; }
}
