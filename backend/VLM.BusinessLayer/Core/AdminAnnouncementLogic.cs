using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.AdminAnnouncement;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class AdminAnnouncementLogic : AdminAnnouncementActions, IAdminAnnouncementLogic
{
    public ServiceResponse GetAllAnnouncements()
    {
        return GetAllAnnouncementsAction();
    }

    public ServiceResponse GetActiveAnnouncements()
    {
        return GetActiveAnnouncementsAction();
    }

    public ServiceResponse GetAnnouncementById(int id)
    {
        return GetAnnouncementByIdAction(id);
    }

    public ServiceResponse CreateAnnouncement(AdminAnnouncementCreateDto dto)
    {
        return CreateAnnouncementAction(dto);
    }

    public ServiceResponse UpdateAnnouncement(int id, AdminAnnouncementCreateDto dto)
    {
        return UpdateAnnouncementAction(id, dto);
    }

    public ServiceResponse DeleteAnnouncement(int id)
    {
        return DeleteAnnouncementAction(id);
    }
}