using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Comment;

public class CommentCreateDto
{
    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Text { get; set; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Range(1, int.MaxValue)]
    public int DonationId { get; set; }

    public int? ParentCommentId { get; set; }
}
