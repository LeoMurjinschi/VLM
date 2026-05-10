using VLM.Domain.Entities.Comment;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Entities.Review;

namespace VLM.Domain.Entities.User;

public class UserEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public ICollection<DonationEntity> Donations { get; set; } = new List<DonationEntity>();
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<ReservationEntity> Reservations { get; set; } = new List<ReservationEntity>();
    public ICollection<ReviewEntity> DonorReviews { get; set; } = new List<ReviewEntity>();
    public ICollection<ReviewEntity> ReceiverReviews { get; set; } = new List<ReviewEntity>();
}
