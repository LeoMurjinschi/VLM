namespace VLM.Domain.Models.Review;

public class ReviewCreateDto
{
    public int DonorId { get; set; }
    public int ReceiverId { get; set; }
    public int Rating { get; set; }
    public string Text { get; set; } = string.Empty;
}
