namespace VLM.Domain.Models.Reservation;

public class ReservationStatusUpdateDto
{
    public string Status { get; set; } = string.Empty;
    public int? QuantityPickedUpByReceiver { get; set; }
    public int? QuantityConfirmed { get; set; }
    public string? CancelledBy { get; set; }
}
