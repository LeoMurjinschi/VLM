namespace VLM.Domain.Models.Donation;

public class DonationInfoDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public int DonorId { get; set; }
    public string Category { get; set; } = string.Empty;
    public string PickupLocation { get; set; } = string.Empty;
    public DateTime? ExpirationDate { get; set; }
    public string? Image { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public string DonorName { get; set; } = string.Empty;
    public string? DonorAvatar { get; set; }
}
