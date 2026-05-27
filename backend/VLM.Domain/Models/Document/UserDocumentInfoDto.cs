namespace VLM.Domain.Models.Document;

public class UserDocumentInfoDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string DocumentType { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string FileData { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime UploadedAt { get; set; }
}
