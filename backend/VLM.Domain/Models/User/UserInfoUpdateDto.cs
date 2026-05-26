namespace VLM.Domain.Models.User;

public class UserInfoUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Avatar { get; set; }
}
