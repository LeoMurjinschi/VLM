using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class UserCreateDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    [StringLength(100)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [AllowedValues("donor", "receiver", "admin", ErrorMessage = "Role must be donor, receiver, or admin")]
    public string Role { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Bio { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Avatar { get; set; }

    [StringLength(200)]
    public string OrgName { get; set; } = string.Empty;

    [StringLength(500)]
    public string Address { get; set; } = string.Empty;

    [StringLength(50)]
    public string FiscalCode { get; set; } = string.Empty;

    [StringLength(500)]
    public string? VerificationDocument { get; set; }
}
