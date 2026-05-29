using VLM.Domain.Models.AdminAnnouncement;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IAdminAnnouncementLogic
{
    ServiceResponse GetAllAnnouncements();
    ServiceResponse GetActiveAnnouncements();
    ServiceResponse GetAnnouncementById(int id);
    ServiceResponse CreateAnnouncement(AdminAnnouncementCreateDto dto);
    ServiceResponse UpdateAnnouncement(int id, AdminAnnouncementCreateDto dto);
    ServiceResponse DeleteAnnouncement(int id);
}