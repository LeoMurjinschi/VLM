using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Notification;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class NotificationLogic : NotificationActions, INotificationLogic
{
    public ServiceResponse GetNotificationsByUser(int userId)
    {
        return GetNotificationsByUserAction(userId);
    }

    public ServiceResponse GetUnreadCount(int userId)
    {
        return GetUnreadCountAction(userId); // Adăugat
    }

    public ServiceResponse CreateNotification(NotificationCreateDto dto)
    {
        return CreateNotificationAction(dto);
    }

    public ServiceResponse MarkAsRead(int id)
    {
        return MarkAsReadAction(id);
    }

    public ServiceResponse DeleteNotification(int id)
    {
        return DeleteNotificationAction(id);
    }
}