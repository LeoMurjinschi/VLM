using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Models.Review;
using VLM.Domain.Models.Service;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace VLM.BusinessLayer.Structure;

public class ReviewActions
{
    private readonly VlmDbContext _dbContext;

    public ReviewActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetPendingReviewsAction(int receiverId)
    {
        try
        {
            var pendingReservations = _dbContext.Reservations
                .Include(r => r.Donation)
                .ThenInclude(d => d.Donor)
                .Where(r =>
                    r.UserId == receiverId &&
                    (r.Status == "donor_confirmed" || r.Status == "receiver_confirmed" || r.Status == "completed") &&
                    (r.Rating == null || r.Rating == 0))
                .OrderByDescending(r => r.ReceiverConfirmedAt ?? r.CompletedAt ?? r.UpdatedDate ?? r.CreatedDate)
                .ToList();

            var pendingReviews = pendingReservations.Select(reservation => new PendingReviewDto
            {
                ReviewId = reservation.Id, // We use ReservationId as ReviewId for frontend compatibility
                ReservationId = reservation.Id,
                DonationId = reservation.DonationId,
                DonorId = reservation.Donation.DonorId,
                DonorName = reservation.Donation.Donor.Name,
                DonationTitle = reservation.Donation.Title,
                DonationImage = reservation.Donation.Image,
                PickupDate = reservation.ReceiverConfirmedAt
                        ?? reservation.CompletedAt
                        ?? reservation.UpdatedDate
                        ?? reservation.CreatedDate,
            }).ToList();

            return new ServiceResponse { IsSuccess = true, Data = pendingReviews };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving pending reviews: {e.Message}" };
        }
    }

    public ServiceResponse GetReviewsByDonorAction(int donorId)
    {
        try
        {
            var reviews = _dbContext.Reservations
                .Include(r => r.Donation)
                .Where(r => r.Donation.DonorId == donorId && r.Rating >= 0)
                .Select(entity => new ReviewInfoDto
                {
                    Id = entity.Id, // ReservationId
                    DonorId = entity.Donation.DonorId,
                    ReceiverId = entity.UserId,
                    DonationId = entity.DonationId,
                    Rating = entity.Rating ?? 0,
                    Text = entity.ReviewText ?? string.Empty,
                    Status = "approved",
                    CreatedDate = entity.UpdatedDate ?? entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = reviews
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving reviews: {e.Message}"
            };
        }
    }

    public ServiceResponse GetReviewsByReceiverAction(int receiverId)
    {
        try
        {
            var reviews = _dbContext.Reservations
                .Include(r => r.Donation)
                .Where(r => r.UserId == receiverId && r.Rating >= 0)
                .Select(entity => new ReviewInfoDto
                {
                    Id = entity.Id, // ReservationId
                    DonorId = entity.Donation.DonorId,
                    ReceiverId = entity.UserId,
                    DonationId = entity.DonationId,
                    Rating = entity.Rating ?? 0,
                    Text = entity.ReviewText ?? string.Empty,
                    Status = "approved",
                    CreatedDate = entity.UpdatedDate ?? entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = reviews
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving reviews: {e.Message}"
            };
        }
    }

    public ServiceResponse GetReviewByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Reservations
                .Include(r => r.Donation)
                .FirstOrDefault(r => r.Id == id);

            if (entity == null || (entity.Rating == null || entity.Rating == 0))
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Review not found"
                };

            var dto = new ReviewInfoDto
            {
                Id = entity.Id,
                DonorId = entity.Donation.DonorId,
                ReceiverId = entity.UserId,
                DonationId = entity.DonationId,
                Rating = entity.Rating ?? 0,
                Text = entity.ReviewText ?? string.Empty,
                Status = "approved",
                CreatedDate = entity.UpdatedDate ?? entity.CreatedDate
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = dto
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving review: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateReviewAction(ReviewCreateDto reviewCreateDto)
    {
        // For Reservation-based reviews, 'create' is essentially 'update'
        return UpdateReviewAction(reviewCreateDto.ReservationId ?? reviewCreateDto.DonationId, reviewCreateDto);
    }

    public ServiceResponse UpdateReviewAction(int id, ReviewCreateDto reviewCreateDto)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Reservation not found"
                };

            entity.Rating = reviewCreateDto.Rating;
            entity.ReviewText = reviewCreateDto.Text ?? string.Empty;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Review submitted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating review: {e.Message} Inner: {e.InnerException?.Message}"
            };
        }
    }

    public ServiceResponse DeleteReviewAction(int id)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Review not found"
                };

            entity.Rating = null;
            entity.ReviewText = null;
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Review deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting review: {e.Message}"
            };
        }
    }
}