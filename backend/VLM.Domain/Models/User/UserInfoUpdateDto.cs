using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class UserInfoUpdateDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Avatar { get; set; }
}
