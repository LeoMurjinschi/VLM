using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Document;

public class UserDocumentCreateDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 1)]
    public string FileName { get; set; } = string.Empty;

    [Required]
    [AllowedValues("identity", "verification", "registration", "other")]
    public string DocumentType { get; set; } = string.Empty;

    [Required]
    [AllowedValues("application/pdf", "image/jpeg", "image/png", "image/jpg")]
    public string ContentType { get; set; } = string.Empty;

    [Required]
    public string FileData { get; set; } = string.Empty;
}
