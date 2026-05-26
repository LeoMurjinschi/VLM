namespace VLM.Domain.Models.Document;

public class UserDocumentCreateDto
{
    public int UserId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string DocumentType { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string FileData { get; set; } = string.Empty;
}
