namespace VLM.Domain.Entities.User;

public class DonorProfileEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string PickupLocationsJson { get; set; } = "[]";

    // Visibility — controls what other users see on the public profile
    public bool IsPublic { get; set; } = true;
    public bool ShowPhone { get; set; } = false;
    public bool ShowAddress { get; set; } = false;
    public DateTime? UpdatedDate { get; set; }

    public UserEntity User { get; set; } = null!;
}
