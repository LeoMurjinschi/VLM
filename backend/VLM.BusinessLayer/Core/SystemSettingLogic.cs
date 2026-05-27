using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.SystemSetting;

namespace VLM.BusinessLayer.Core;

public class SystemSettingLogic : SystemSettingActions, ISystemSettingLogic
{
    public ServiceResponse GetAllSettings()
    {
        return GetAllSettingsAction();
    }

    public ServiceResponse GetSettingById(int id)
    {
        return GetSettingByIdAction(id);
    }

    public ServiceResponse GetSettingByKey(string key)
    {
        return GetSettingByKeyAction(key);
    }

    public ServiceResponse CreateSetting(SystemSettingCreateDto dto)
    {
        return CreateSettingAction(dto);
    }

    public ServiceResponse UpdateSetting(int id, SystemSettingCreateDto dto)
    {
        return UpdateSettingAction(id, dto);
    }

    public ServiceResponse DeleteSetting(int id)
    {
        return DeleteSettingAction(id);
    }
}