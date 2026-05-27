using VLM.Domain.Models.Notification;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface INotificationLogic
{
    ServiceResponse GetNotificationsByUser(int userId);
    ServiceResponse GetUnreadCount(int userId); // Adăugat
    ServiceResponse CreateNotification(NotificationCreateDto dto);
    ServiceResponse MarkAsRead(int id);
    ServiceResponse DeleteNotification(int id);
}