using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Reservation;

public class ReservationCreateDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Range(1, int.MaxValue)]
    public int DonationId { get; set; }

    [Range(1, 10000, ErrorMessage = "Quantity must be between 1 and 10000")]
    public int QuantityReserved { get; set; } = 1;

    [StringLength(1000)]
    public string Notes { get; set; } = string.Empty;
}
