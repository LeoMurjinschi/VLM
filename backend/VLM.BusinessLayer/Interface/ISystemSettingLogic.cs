using VLM.Domain.Models.Service;
using VLM.Domain.Models.SystemSetting;

namespace VLM.BusinessLayer.Interface;

public interface ISystemSettingLogic
{
    ServiceResponse GetAllSettings();
    ServiceResponse GetSettingById(int id);
    ServiceResponse GetSettingByKey(string key);
    ServiceResponse CreateSetting(SystemSettingCreateDto dto);
    ServiceResponse UpdateSetting(int id, SystemSettingCreateDto dto);
    ServiceResponse DeleteSetting(int id);
}