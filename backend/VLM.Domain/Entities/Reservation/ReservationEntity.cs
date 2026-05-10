using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Reservation;

public class ReservationEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public string Status { get; set; } = "Pending";
    public string Notes { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    // Navigation properties
    public UserEntity Receiver { get; set; } = null!;
    public DonationEntity Donation { get; set; } = null!;
}
