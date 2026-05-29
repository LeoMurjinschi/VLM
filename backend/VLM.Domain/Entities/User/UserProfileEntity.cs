namespace VLM.Domain.Entities.User;

public class UserProfileEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string OrgName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string MissionStatement { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public int OperatingRadius { get; set; } = 10;
    public string AcceptedCategories { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public bool HasIndustrialStorage { get; set; } = false;
    public string Location { get; set; } = string.Empty;
    public bool Verified { get; set; } = false;
    public string? VerificationDocument { get; set; }

    // Navigation properties
    public UserEntity User { get; set; } = null!;
}
