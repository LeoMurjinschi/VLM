using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Review;

public class ReviewEntity
{
    public int Id { get; set; }
    public int DonorId { get; set; }
    public int ReceiverId { get; set; }
    public int Rating { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public UserEntity Donor { get; set; } = null!;
    public UserEntity Receiver { get; set; } = null!;
}
