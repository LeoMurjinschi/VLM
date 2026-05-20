using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Favorite;

public class FavoriteEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public DateTime CreatedDate { get; set; }
    
    public UserEntity User { get; set; } = null!;
    public DonationEntity Donation { get; set; } = null!;
}