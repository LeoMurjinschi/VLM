namespace VLM.Domain.Models.User;

public class UserCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public string OrgName { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string FiscalCode { get; set; } = string.Empty;
    public string? VerificationDocument { get; set; }
}
