using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Favorite;
using VLM.Domain.Models.Favorite;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class FavoriteActions
{
    private readonly VlmDbContext _dbContext;

    public FavoriteActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetFavoritesByUserAction(int userId)
    {
        try
        {
            var favorites = _dbContext.Favorites
                .Where(f => f.UserId == userId)
                .Select(entity => new FavoriteInfoDto
                {
                    Id = entity.Id,
                    UserId = entity.UserId,
                    DonationId = entity.DonationId,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = favorites
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving favorites: {e.Message}"
            };
        }
    }

    public ServiceResponse GetFavoriteByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Favorites.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Favorite not found"
                };

            var dto = new FavoriteInfoDto
            {
                Id = entity.Id,
                UserId = entity.UserId,
                DonationId = entity.DonationId,
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
                Message = $"Error retrieving favorite: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateFavoriteAction(FavoriteCreateDto favoriteCreateDto)
    {
        try
        {
            var entity = new FavoriteEntity
            {
                UserId = favoriteCreateDto.UserId,
                DonationId = favoriteCreateDto.DonationId,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Favorites.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Favorite created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating favorite: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteFavoriteAction(int id)
    {
        try
        {
            var entity = _dbContext.Favorites.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Favorite not found"
                };

            _dbContext.Favorites.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Favorite deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting favorite: {e.Message}"
            };
        }
    }
}
