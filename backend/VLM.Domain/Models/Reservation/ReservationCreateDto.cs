namespace VLM.Domain.Models.Reservation;

public class ReservationCreateDto
{
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int QuantityReserved { get; set; } = 1;
    public string Notes { get; set; } = string.Empty;
}
