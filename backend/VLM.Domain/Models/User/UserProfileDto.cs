namespace VLM.Domain.Models.User;

public class UserProfileDto
{
    public int UserId { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string OrgName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string MissionStatement { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public int OperatingRadius { get; set; }
    public string AcceptedCategories { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public bool HasIndustrialStorage { get; set; }
    public string Location { get; set; } = string.Empty;
    public bool Verified { get; set; }
    public string? VerificationDocument { get; set; }
}
