using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Reservation;

public class ReservationEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int QuantityReserved { get; set; } = 1;
    public string Status { get; set; } = "pending";
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DonorConfirmedAt { get; set; }
    public DateTime? ReceiverConfirmedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    // public DateTime? CancelledAt { get; set; } // Comentat
    // public string? CancelledBy { get; set; } // Comentat
    // public int? QuantityPickedUpByReceiver { get; set; } // Comentat
    // public int? QuantityConfirmed { get; set; } // Comentat

    // Navigation properties
    public UserEntity Receiver { get; set; } = null!;
    public DonationEntity Donation { get; set; } = null!;
}