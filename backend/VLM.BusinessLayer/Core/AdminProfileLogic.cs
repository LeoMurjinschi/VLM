using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class AdminProfileLogic : AdminProfileActions, IAdminProfileLogic
{
    public ServiceResponse GetAdminProfile(int userId) => GetAdminProfileAction(userId);
    public ServiceResponse UpsertAdminProfile(AdminProfileDto dto) => UpsertAdminProfileAction(dto);
}
