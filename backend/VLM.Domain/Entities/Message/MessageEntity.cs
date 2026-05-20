using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.Message;

public class MessageEntity
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public int ReceiverId { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public UserEntity Sender { get; set; } = null!;
    public UserEntity Receiver { get; set; } = null!;
}