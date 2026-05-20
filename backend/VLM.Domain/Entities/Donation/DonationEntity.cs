using VLM.Domain.Entities.Comment;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Donation;

public class DonationEntity
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
    public string Status { get; set; } = "Available";
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    // Navigation properties
    public UserEntity Donor { get; set; } = null!;
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<ReservationEntity> Reservations { get; set; } = new List<ReservationEntity>();
}
