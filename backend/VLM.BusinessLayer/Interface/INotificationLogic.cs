using VLM.Domain.Models.Notification;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface INotificationLogic
{
    ServiceResponse GetNotificationsByUser(int userId);
    ServiceResponse GetUnreadCount(int userId);
    ServiceResponse CreateNotification(NotificationCreateDto dto);
    ServiceResponse MarkAsRead(int id);
    ServiceResponse MarkAllAsRead(int userId);
    ServiceResponse DeleteNotification(int id);
}