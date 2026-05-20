using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class UserSettingsLogic : UserSettingsActions, IUserSettingsLogic
{
    public ServiceResponse GetSettingsByUser(int userId)
    {
        return GetSettingsByUserAction(userId);
    }

    public ServiceResponse UpsertSettings(UserSettingsDto dto)
    {
        return UpsertSettingsAction(dto);
    }
}
