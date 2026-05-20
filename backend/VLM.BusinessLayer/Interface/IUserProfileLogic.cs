using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IUserProfileLogic
{
    ServiceResponse GetProfileByUser(int userId);
    ServiceResponse UpsertProfile(UserProfileDto dto);
}
