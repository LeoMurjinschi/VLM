namespace VLM.Domain.Models.Reservation;

public class ReservationInfoDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int QuantityReserved { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public DateTime? DonorConfirmedAt { get; set; }
    public DateTime? ReceiverConfirmedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime? CancelledAt { get; set; }
    public string? CancelledBy { get; set; }
}
