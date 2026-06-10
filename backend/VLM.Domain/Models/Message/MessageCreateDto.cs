using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Message;

public class MessageCreateDto
{
    [Range(1, int.MaxValue)]
    public int SenderId { get; set; }

    [Range(1, int.MaxValue)]
    public int ReceiverId { get; set; }

    [Required]
    [StringLength(5000, MinimumLength = 1)]
    public string Text { get; set; } = string.Empty;
}
