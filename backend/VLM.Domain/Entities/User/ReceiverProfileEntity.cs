namespace VLM.Domain.Entities.User;

public class ReceiverProfileEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string OrgName { get; set; } = string.Empty;
    public string MissionStatement { get; set; } = string.Empty;
    public int OperatingRadius { get; set; } = 25;
    public string AcceptedCategories { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public bool HasIndustrialStorage { get; set; } = false;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;

    // Visibility — controls what other users see on the public profile
    public bool IsPublic { get; set; } = true;
    public bool ShowPhone { get; set; } = false;
    public bool ShowAddress { get; set; } = false;
    public DateTime? UpdatedDate { get; set; }

    public UserEntity User { get; set; } = null!;
}
