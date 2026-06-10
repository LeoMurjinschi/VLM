using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.Review
{
    public class ReviewCreateDto
    {
        [Range(1, int.MaxValue)]
        public int DonorId { get; set; }

        [Range(1, int.MaxValue)]
        public int ReceiverId { get; set; }

        [Range(1, int.MaxValue)]
        public int DonationId { get; set; }

        public int? ReservationId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
        public int Rating { get; set; }

        [StringLength(2000)]
        public string Text { get; set; } = string.Empty;
    }

    public class PendingReviewDto
    {
        public int ReviewId { get; set; }
        public int ReservationId { get; set; }
        public int DonationId { get; set; }
        public int DonorId { get; set; }
        public string DonorName { get; set; } = string.Empty;
        public string DonationTitle { get; set; } = string.Empty;
        public string? DonationImage { get; set; }
        public DateTime PickupDate { get; set; }
    }
}
