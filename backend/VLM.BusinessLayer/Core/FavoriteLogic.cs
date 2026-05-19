using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Favorite;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class FavoriteLogic : FavoriteActions, IFavoriteLogic
{
    public ServiceResponse GetFavoritesByUser(int userId)
    {
        return GetFavoritesByUserAction(userId);
    }

    public ServiceResponse GetFavoriteById(int id)
    {
        return GetFavoriteByIdAction(id);
    }

    public ServiceResponse CreateFavorite(FavoriteCreateDto favoriteCreateDto)
    {
        return CreateFavoriteAction(favoriteCreateDto);
    }

    public ServiceResponse DeleteFavorite(int id)
    {
        return DeleteFavoriteAction(id);
    }
}