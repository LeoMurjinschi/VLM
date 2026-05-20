namespace VLM.Domain.Models.User;

public class UserSettingsDto
{
    public int UserId { get; set; }
    public string Theme { get; set; } = "light";
    public bool NotifyPush { get; set; }
    public bool NotifySms { get; set; }
    public bool NotifyEmail { get; set; }
    public bool EmailUpdates { get; set; }
}
