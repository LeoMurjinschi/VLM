namespace VLM.Domain.Models.Review;

public class ReviewInfoDto
{
    public int Id { get; set; }
    public int DonorId { get; set; }
    public int ReceiverId { get; set; }
    public int Rating { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
}
