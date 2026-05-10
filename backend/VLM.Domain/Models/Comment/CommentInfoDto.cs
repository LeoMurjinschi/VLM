namespace VLM.Domain.Models.Comment;

public class CommentInfoDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int UserId { get; set; }
    public int DonationId { get; set; }
    public int? ParentCommentId { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}
