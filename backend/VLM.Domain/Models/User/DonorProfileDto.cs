namespace VLM.Domain.Models.User;

public class DonorProfileDto
{
    public int UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string OperatingHours { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
