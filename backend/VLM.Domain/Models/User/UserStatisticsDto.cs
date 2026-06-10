namespace VLM.Domain.Models.User;

public class UserStatisticsDto
{
    public int UserId { get; set; }
    public string UserRole { get; set; } = string.Empty;

    // Donor metrics
    public decimal TotalDonated { get; set; }
    public int TotalDonations { get; set; }
    public int ActiveDonations { get; set; }

    // Receiver metrics
    public decimal TotalReserved { get; set; }
    public int TotalReservations { get; set; }
    public int ActiveReservations { get; set; }

    // Admin / platform metrics
    public int TotalUsers { get; set; }
    public int TotalPlatformDonations { get; set; }

    public DateTime? LastActivityDate { get; set; }
}
