namespace VLM.Domain.Models.Reservation;

public class ReservationInfoDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int QuantityReserved { get; set; }
    public int? QuantityPickedUpByReceiver { get; set; }
    public int? QuantityConfirmed { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DonorConfirmedAt { get; set; }
    public DateTime? ReceiverConfirmedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancelledBy { get; set; }

    // Joined from Donation
    public string DonationTitle { get; set; } = string.Empty;
    public string? DonationImage { get; set; }
    public string DonationCategory { get; set; } = string.Empty;
    public string DonationUnit { get; set; } = string.Empty;
    public string PickupLocation { get; set; } = string.Empty;
    public DateTime? ExpirationDate { get; set; }

    // Joined from Users
    public int DonorId { get; set; }
    public string DonorName { get; set; } = string.Empty;
    public string ReceiverName { get; set; } = string.Empty;
}
