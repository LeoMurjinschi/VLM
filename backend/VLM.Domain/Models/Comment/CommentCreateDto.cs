namespace VLM.Domain.Models.Comment;

public class CommentCreateDto
{
    public string Text { get; set; } = string.Empty;
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int? ParentCommentId { get; set; }
}
