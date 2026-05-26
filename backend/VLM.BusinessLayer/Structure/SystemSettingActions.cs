using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.SystemSetting;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.SystemSetting;

namespace VLM.BusinessLayer.Structure;

public class SystemSettingActions
{
    private readonly VlmDbContext _dbContext;

    public SystemSettingActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllSettingsAction()
    {
        try
        {
            var settings = _dbContext.SystemSettings
                .OrderBy(s => s.Key)
                .Select(entity => new SystemSettingInfoDto
                {
                    Id = entity.Id,
                    Key = entity.Key,
                    Value = entity.Value,
                    Description = entity.Description,
                    UpdatedById = entity.UpdatedById,
                    UpdatedDate = entity.UpdatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = settings
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving settings: {e.Message}"
            };
        }
    }

    public ServiceResponse GetSettingByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.SystemSettings.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Setting not found"
                };

            var dto = new SystemSettingInfoDto
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Description = entity.Description,
                UpdatedById = entity.UpdatedById,
                UpdatedDate = entity.UpdatedDate
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
                Message = $"Error retrieving setting: {e.Message}"
            };
        }
    }

    public ServiceResponse GetSettingByKeyAction(string key)
    {
        try
        {
            var entity = _dbContext.SystemSettings.FirstOrDefault(s => s.Key == key);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Setting not found"
                };

            var dto = new SystemSettingInfoDto
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Description = entity.Description,
                UpdatedById = entity.UpdatedById,
                UpdatedDate = entity.UpdatedDate
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
                Message = $"Error retrieving setting: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateSettingAction(SystemSettingCreateDto dto)
    {
        try
        {
            if (_dbContext.SystemSettings.Any(s => s.Key == dto.Key))
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Setting with this key already exists"
                };

            var entity = new SystemSettingEntity
            {
                Key = dto.Key,
                Value = dto.Value,
                Description = dto.Description,
                UpdatedById = dto.UpdatedById,
                UpdatedDate = DateTime.UtcNow
            };

            _dbContext.SystemSettings.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Setting created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating setting: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateSettingAction(int id, SystemSettingCreateDto dto)
    {
        try
        {
            var entity = _dbContext.SystemSettings.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Setting not found"
                };

            entity.Value = dto.Value;
            entity.Description = dto.Description;
            entity.UpdatedById = dto.UpdatedById;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Setting updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating setting: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteSettingAction(int id)
    {
        try
        {
            var entity = _dbContext.SystemSettings.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Setting not found"
                };

            _dbContext.SystemSettings.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Setting deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting setting: {e.Message}"
            };
        }
    }
}
