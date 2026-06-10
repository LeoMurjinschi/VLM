using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class ChangePasswordDto
{
    [Required(ErrorMessage = "Current password is required")]
    public string OldPassword { get; set; } = string.Empty;

    [Required(ErrorMessage = "New password is required")]
    [MinLength(6, ErrorMessage = "New password must be at least 6 characters")]
    [StringLength(100)]
    public string NewPassword { get; set; } = string.Empty;
}
