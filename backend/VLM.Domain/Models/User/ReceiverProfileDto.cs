namespace VLM.Domain.Models.User;

public class ReceiverProfileDto
{
    public int UserId { get; set; }
    public string OrgName { get; set; } = string.Empty;
    public string MissionStatement { get; set; } = string.Empty;
    public int OperatingRadius { get; set; } = 25;
    public string AcceptedCategories { get; set; } = string.Empty;
    public string TransportType { get; set; } = string.Empty;
    public bool HasIndustrialStorage { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
