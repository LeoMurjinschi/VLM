using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Review;
using VLM.Domain.Models.Review;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class ReviewActions
{
    private readonly VlmDbContext _dbContext;

    public ReviewActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetReviewsByDonorAction(int donorId)
    {
        try
        {
            var reviews = _dbContext.Reviews
                .Where(r => r.DonorId == donorId)
                .Select(entity => new ReviewInfoDto
                {
                    Id = entity.Id,
                    DonorId = entity.DonorId,
                    ReceiverId = entity.ReceiverId,
                    Rating = entity.Rating,
                    Text = entity.Text,
                    CreatedDate = entity.CreatedDate
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
            var entity = _dbContext.Reviews.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Review not found"
                };

            var dto = new ReviewInfoDto
            {
                Id = entity.Id,
                DonorId = entity.DonorId,
                ReceiverId = entity.ReceiverId,
                Rating = entity.Rating,
                Text = entity.Text,
                CreatedDate = entity.CreatedDate
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
        try
        {
            var entity = new ReviewEntity
            {
                DonorId = reviewCreateDto.DonorId,
                ReceiverId = reviewCreateDto.ReceiverId,
                Rating = reviewCreateDto.Rating,
                Text = reviewCreateDto.Text,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Reviews.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Review created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating review: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateReviewAction(int id, ReviewCreateDto reviewCreateDto)
    {
        try
        {
            var entity = _dbContext.Reviews.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Review not found"
                };

            entity.Rating = reviewCreateDto.Rating;
            entity.Text = reviewCreateDto.Text;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Review updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating review: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteReviewAction(int id)
    {
        try
        {
            var entity = _dbContext.Reviews.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Review not found"
                };

            _dbContext.Reviews.Remove(entity);
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
