using VLM.Domain.Models.AdminAction;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IAdminActionLogic
{
    ServiceResponse GetAllAdminActions();
    ServiceResponse GetAdminActionsByAdmin(int adminId);
    ServiceResponse GetAdminActionById(int id);
    ServiceResponse CreateAdminAction(AdminActionCreateDto dto);
    ServiceResponse DeleteAdminAction(int id);
}