using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IUserSettingsLogic
{
    ServiceResponse GetSettingsByUser(int userId);
    ServiceResponse UpsertSettings(UserSettingsDto dto);
}
