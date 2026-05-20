namespace VLM.Domain.Models.Message;

public class MessageCreateDto
{
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
    public string Text { get; set; } = string.Empty;
}