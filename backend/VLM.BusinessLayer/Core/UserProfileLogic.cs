using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class UserProfileLogic : UserProfileActions, IUserProfileLogic
{
    public ServiceResponse GetProfileByUser(int userId)
    {
        return GetProfileByUserAction(userId);
    }

    public ServiceResponse UpsertProfile(UserProfileDto dto)
    {
        return UpsertProfileAction(dto);
    }
}
