using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Donation;

public class DonationCreateDto
{
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, 100000, ErrorMessage = "Quantity must be between 0.01 and 100000")]
    public decimal Quantity { get; set; }

    [Required]
    [StringLength(50)]
    public string Unit { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int DonorId { get; set; }

    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string PickupLocation { get; set; } = string.Empty;

    public DateTime? ExpirationDate { get; set; }

    [StringLength(500)]
    public string? Image { get; set; }

    [Range(-90.0, 90.0)]
    public decimal? PickupLatitude { get; set; }

    [Range(-180.0, 180.0)]
    public decimal? PickupLongitude { get; set; }
}
