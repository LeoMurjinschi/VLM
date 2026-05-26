using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.AdminAnnouncement;
using VLM.Domain.Models.AdminAnnouncement;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class AdminAnnouncementActions
{
    private readonly VlmDbContext _dbContext;

    public AdminAnnouncementActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllAnnouncementsAction()
    {
        try
        {
            var announcements = _dbContext.AdminAnnouncements
                .OrderByDescending(a => a.CreatedDate)
                .Select(entity => new AdminAnnouncementInfoDto
                {
                    Id = entity.Id,
                    AdminId = entity.AdminId,
                    Title = entity.Title,
                    Body = entity.Body,
                    Type = entity.Type,
                    Priority = entity.Priority,
                    StartsAt = entity.StartsAt,
                    EndsAt = entity.EndsAt,
                    IsActive = entity.IsActive,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = announcements
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving announcements: {e.Message}"
            };
        }
    }

    public ServiceResponse GetActiveAnnouncementsAction()
    {
        try
        {
            var now = DateTime.UtcNow;
            var announcements = _dbContext.AdminAnnouncements
                .Where(a => a.IsActive && a.StartsAt <= now && (a.EndsAt == null || a.EndsAt >= now))
                .OrderByDescending(a => a.Priority)
                .ThenByDescending(a => a.CreatedDate)
                .Select(entity => new AdminAnnouncementInfoDto
                {
                    Id = entity.Id,
                    AdminId = entity.AdminId,
                    Title = entity.Title,
                    Body = entity.Body,
                    Type = entity.Type,
                    Priority = entity.Priority,
                    StartsAt = entity.StartsAt,
                    EndsAt = entity.EndsAt,
                    IsActive = entity.IsActive,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = announcements
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving active announcements: {e.Message}"
            };
        }
    }

    public ServiceResponse GetAnnouncementByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.AdminAnnouncements.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Announcement not found"
                };

            var dto = new AdminAnnouncementInfoDto
            {
                Id = entity.Id,
                AdminId = entity.AdminId,
                Title = entity.Title,
                Body = entity.Body,
                Type = entity.Type,
                Priority = entity.Priority,
                StartsAt = entity.StartsAt,
                EndsAt = entity.EndsAt,
                IsActive = entity.IsActive,
                CreatedDate = entity.CreatedDate
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = dto
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving announcement: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateAnnouncementAction(AdminAnnouncementCreateDto dto)
    {
        try
        {
            var entity = new AdminAnnouncementEntity
            {
                AdminId = dto.AdminId,
                Title = dto.Title,
                Body = dto.Body,
                Type = dto.Type,
                Priority = dto.Priority,
                StartsAt = dto.StartsAt == default ? DateTime.UtcNow : dto.StartsAt,
                EndsAt = dto.EndsAt,
                IsActive = dto.IsActive,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.AdminAnnouncements.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Announcement created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating announcement: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateAnnouncementAction(int id, AdminAnnouncementCreateDto dto)
    {
        try
        {
            var entity = _dbContext.AdminAnnouncements.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Announcement not found"
                };

            entity.Title = dto.Title;
            entity.Body = dto.Body;
            entity.Type = dto.Type;
            entity.Priority = dto.Priority;
            entity.StartsAt = dto.StartsAt == default ? entity.StartsAt : dto.StartsAt;
            entity.EndsAt = dto.EndsAt;
            entity.IsActive = dto.IsActive;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Announcement updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating announcement: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteAnnouncementAction(int id)
    {
        try
        {
            var entity = _dbContext.AdminAnnouncements.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Announcement not found"
                };

            _dbContext.AdminAnnouncements.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Announcement deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting announcement: {e.Message}"
            };
        }
    }
}
