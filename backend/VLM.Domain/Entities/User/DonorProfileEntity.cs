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

    public UserEntity User { get; set; } = null!;
}
