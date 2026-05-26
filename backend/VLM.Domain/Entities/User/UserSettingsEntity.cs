namespace VLM.Domain.Entities.User;

public class UserSettingsEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Theme { get; set; } = "light";
    public bool NotifyPush { get; set; } = true;
    public bool NotifySms { get; set; } = false;
    public bool NotifyEmail { get; set; } = true;
    public bool EmailUpdates { get; set; } = true;

    // Navigation properties
    public UserEntity User { get; set; } = null!;
}
