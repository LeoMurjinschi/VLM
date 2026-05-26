using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.AdminAction;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class AdminActionLogic : AdminActionActions, IAdminActionLogic
{
    public ServiceResponse GetAllAdminActions()
    {
        return GetAllAdminActionsAction();
    }

    public ServiceResponse GetAdminActionsByAdmin(int adminId)
    {
        return GetAdminActionsByAdminAction(adminId);
    }

    public ServiceResponse GetAdminActionById(int id)
    {
        return GetAdminActionByIdAction(id);
    }

    public ServiceResponse CreateAdminAction(AdminActionCreateDto dto)
    {
        return CreateAdminActionAction(dto);
    }

    public ServiceResponse DeleteAdminAction(int id)
    {
        return DeleteAdminActionAction(id);
    }
}