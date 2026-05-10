using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Comment;

public class CommentEntity
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int? ParentCommentId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    // Navigation properties
    public UserEntity User { get; set; } = null!;
    public DonationEntity Donation { get; set; } = null!;
    public CommentEntity? ParentComment { get; set; }
    public ICollection<CommentEntity> Replies { get; set; } = new List<CommentEntity>();
}
