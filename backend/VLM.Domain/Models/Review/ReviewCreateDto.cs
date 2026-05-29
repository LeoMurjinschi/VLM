namespace VLM.Domain.Models.Review
{
    public class ReviewCreateDto
    {
        public int DonorId { get; set; }
        public int ReceiverId { get; set; }
        public int DonationId { get; set; }
        public int? ReservationId { get; set; }
        public int Rating { get; set; }
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