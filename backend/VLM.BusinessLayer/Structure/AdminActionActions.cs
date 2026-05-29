using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.AdminAction;
using VLM.Domain.Models.AdminAction;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class AdminActionActions
{
    private readonly VlmDbContext _dbContext;

    public AdminActionActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllAdminActionsAction()
    {
        try
        {
            var actions = _dbContext.AdminActions
                .OrderByDescending(a => a.CreatedDate)
                .Select(entity => new AdminActionInfoDto
                {
                    Id = entity.Id,
                    AdminId = entity.AdminId,
                    ActionType = entity.ActionType,
                    TargetType = entity.TargetType,
                    TargetId = entity.TargetId,
                    Details = entity.Details,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = actions
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving admin actions: {e.Message}"
            };
        }
    }

    public ServiceResponse GetAdminActionsByAdminAction(int adminId)
    {
        try
        {
            var actions = _dbContext.AdminActions
                .Where(a => a.AdminId == adminId)
                .OrderByDescending(a => a.CreatedDate)
                .Select(entity => new AdminActionInfoDto
                {
                    Id = entity.Id,
                    AdminId = entity.AdminId,
                    ActionType = entity.ActionType,
                    TargetType = entity.TargetType,
                    TargetId = entity.TargetId,
                    Details = entity.Details,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = actions
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving admin actions: {e.Message}"
            };
        }
    }

    public ServiceResponse GetAdminActionByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.AdminActions.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Admin action not found"
                };

            var dto = new AdminActionInfoDto
            {
                Id = entity.Id,
                AdminId = entity.AdminId,
                ActionType = entity.ActionType,
                TargetType = entity.TargetType,
                TargetId = entity.TargetId,
                Details = entity.Details,
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
                Message = $"Error retrieving admin action: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateAdminActionAction(AdminActionCreateDto dto)
    {
        try
        {
            var entity = new AdminActionEntity
            {
                AdminId = dto.AdminId,
                ActionType = dto.ActionType,
                TargetType = dto.TargetType,
                TargetId = dto.TargetId,
                Details = dto.Details,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.AdminActions.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Admin action logged successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating admin action: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteAdminActionAction(int id)
    {
        try
        {
            var entity = _dbContext.AdminActions.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Admin action not found"
                };

            _dbContext.AdminActions.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Admin action deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting admin action: {e.Message}"
            };
        }
    }
}
