using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class ReceiverProfileDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [StringLength(200)]
    public string OrgName { get; set; } = string.Empty;

    [StringLength(2000)]
    public string MissionStatement { get; set; } = string.Empty;

    [Range(0, 500)]
    public int OperatingRadius { get; set; } = 25;

    [StringLength(500)]
    public string AcceptedCategories { get; set; } = string.Empty;

    [StringLength(100)]
    public string TransportType { get; set; } = string.Empty;

    public bool HasIndustrialStorage { get; set; }

    [StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(500)]
    public string Address { get; set; } = string.Empty;

    [StringLength(500)]
    public string Location { get; set; } = string.Empty;

    public bool IsPublic { get; set; } = true;
    public bool ShowPhone { get; set; }
    public bool ShowAddress { get; set; }
}
