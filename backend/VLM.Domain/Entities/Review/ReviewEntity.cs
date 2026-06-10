using System.ComponentModel.DataAnnotations.Schema;
using VLM.Domain.Entities.User;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.Reservation;

namespace VLM.Domain.Entities.Review;

public class ReviewEntity
{
    public int Id { get; set; }
    public int DonorId { get; set; }
    public int ReceiverId { get; set; }
    
    public int DonationId { get; set; }
    
    // Add ReservationId to track reviews per reservation
    public int? ReservationId { get; set; }

    public int Rating { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime CreatedDate { get; set; }

    // Navigation properties
    public UserEntity Donor { get; set; } = null!;
    public UserEntity Receiver { get; set; } = null!;
    public DonationEntity Donation { get; set; } = null!;
    public ReservationEntity Reservation { get; set; } = null!;
}