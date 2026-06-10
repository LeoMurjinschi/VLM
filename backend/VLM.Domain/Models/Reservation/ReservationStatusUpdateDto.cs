using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Reservation;

public class ReservationStatusUpdateDto
{
    [Required]
    [AllowedValues("donor_confirmed", "receiver_confirmed", "completed", "cancelled",
        ErrorMessage = "Invalid status. Allowed: donor_confirmed, receiver_confirmed, completed, cancelled")]
    public string Status { get; set; } = string.Empty;

    [Range(0, 10000)]
    public int? QuantityPickedUpByReceiver { get; set; }

    [Range(0, 10000)]
    public int? QuantityConfirmed { get; set; }

    [AllowedValues("donor", "receiver", null)]
    public string? CancelledBy { get; set; }
}
