using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Notification;
using VLM.Domain.Models.Notification;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class NotificationActions
{
    private readonly VlmDbContext _dbContext;

    // AICI ESTE SCHIMBAREA: Injectăm VlmDbContext
    public NotificationActions(VlmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Constructor fără parametri păstrat pentru compatibilitate inversă
    public NotificationActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetNotificationsByUserAction(int userId)
    {
        try
        {
            var notifications = _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedDate)
                .Select(entity => new NotificationInfoDto
                {
                    Id = entity.Id,
                    UserId = entity.UserId,
                    Title = entity.Title,
                    Description = entity.Description,
                    Type = entity.Type,
                    Link = entity.Link,
                    IsRead = entity.IsRead,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = notifications };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving notifications: {e.Message}" };
        }
    }

    public ServiceResponse GetUnreadCountAction(int userId)
    {
        try
        {
            var count = _dbContext.Notifications.Count(n => n.UserId == userId && !n.IsRead);
            return new ServiceResponse { IsSuccess = true, Data = count };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error getting unread count: {e.Message}" };
        }
    }

    public ServiceResponse CreateNotificationAction(NotificationCreateDto dto)
    {
        try
        {
            var entity = new NotificationEntity
            {
                UserId = dto.UserId,
                Title = dto.Title,
                Description = dto.Description,
                Type = dto.Type,
                Link = dto.Link,
                IsRead = false,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Notifications.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Notification created successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error creating notification: {e.Message}" };
        }
    }

    public ServiceResponse MarkAsReadAction(int id)
    {
        try
        {
            var entity = _dbContext.Notifications.Find(id);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Notification not found" };

            entity.IsRead = true;
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Notification marked as read" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating notification: {e.Message}" };
        }
    }

    public ServiceResponse DeleteNotificationAction(int id)
    {
        try
        {
            var entity = _dbContext.Notifications.Find(id);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Notification not found" };

            _dbContext.Notifications.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Notification deleted successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error deleting notification: {e.Message}" };
        }
    }
}