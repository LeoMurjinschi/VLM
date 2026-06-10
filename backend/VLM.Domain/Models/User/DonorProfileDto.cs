using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User;

public class DonorProfileDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [StringLength(200)]
    public string CompanyName { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;

    [StringLength(200)]
    public string OperatingHours { get; set; } = string.Empty;

    [StringLength(100)]
    public string TransportType { get; set; } = string.Empty;

    [StringLength(30)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(500)]
    public string Address { get; set; } = string.Empty;

    [StringLength(500)]
    public string Location { get; set; } = string.Empty;

    [StringLength(50000)]
    public string PickupLocationsJson { get; set; } = "[]";

    public bool IsPublic { get; set; } = true;
    public bool ShowPhone { get; set; }
    public bool ShowAddress { get; set; }
}
