using VLM.Domain.Models.Favorite;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IFavoriteLogic
{
    ServiceResponse GetFavoritesByUser(int userId);
    ServiceResponse GetFavoriteById(int id);
    ServiceResponse CreateFavorite(FavoriteCreateDto favoriteCreateDto);
    ServiceResponse DeleteFavorite(int id);
}