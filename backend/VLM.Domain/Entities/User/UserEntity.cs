using VLM.Domain.Entities.Comment;
using VLM.Domain.Entities.Document;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.Favorite;
using VLM.Domain.Entities.Message;
using VLM.Domain.Entities.Milestone;
using VLM.Domain.Entities.Notification;
using VLM.Domain.Entities.Report;
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
    public string? Avatar { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public ICollection<DonationEntity> Donations { get; set; } = new List<DonationEntity>();
    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<ReservationEntity> Reservations { get; set; } = new List<ReservationEntity>();
    public ICollection<ReviewEntity> DonorReviews { get; set; } = new List<ReviewEntity>();
    public ICollection<ReviewEntity> ReceiverReviews { get; set; } = new List<ReviewEntity>();
    public ICollection<NotificationEntity> Notifications { get; set; } = new List<NotificationEntity>();
    public ICollection<MessageEntity> SentMessages { get; set; } = new List<MessageEntity>();
    public ICollection<MessageEntity> ReceivedMessages { get; set; } = new List<MessageEntity>();
    public UserProfileEntity? Profile { get; set; }
    public UserSettingsEntity? Settings { get; set; }
    public DonorProfileEntity? DonorProfile { get; set; }
    public ReceiverProfileEntity? ReceiverProfile { get; set; }
    public ICollection<UserDocumentEntity> Documents { get; set; } = new List<UserDocumentEntity>();
    public ICollection<FavoriteEntity> Favorites { get; set; } = new List<FavoriteEntity>();
    public ICollection<ReportEntity> Reports { get; set; } = new List<ReportEntity>();
    public ICollection<MilestoneEntity> Milestones { get; set; } = new List<MilestoneEntity>();
}
