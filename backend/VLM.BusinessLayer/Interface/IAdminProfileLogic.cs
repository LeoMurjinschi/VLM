using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IAdminProfileLogic
{
    ServiceResponse GetAdminProfile(int userId);
    ServiceResponse UpsertAdminProfile(AdminProfileDto dto);
}
