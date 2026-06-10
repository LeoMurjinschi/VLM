using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class UserSettingsDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [AllowedValues("light", "dark", ErrorMessage = "Theme must be light or dark")]
    public string Theme { get; set; } = "light";

    public bool NotifyPush { get; set; }
    public bool NotifySms { get; set; }
    public bool NotifyEmail { get; set; }
    public bool EmailUpdates { get; set; }
}
