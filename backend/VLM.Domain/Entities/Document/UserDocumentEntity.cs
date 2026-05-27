using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Document;

public class UserDocumentEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string DocumentType { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string FileData { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public UserEntity User { get; set; } = null!;
}
