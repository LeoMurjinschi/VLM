namespace VLM.Domain.Models.Favorite;

public class FavoriteInfoDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public DateTime CreatedDate { get; set; }
}