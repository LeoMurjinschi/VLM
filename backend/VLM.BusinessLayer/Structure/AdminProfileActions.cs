using System.Text.Json;
using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class AdminProfileActions
{
    private readonly VlmDbContext _dbContext;

    public AdminProfileActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAdminProfileAction(int userId)
    {
        try
        {
            var entity = _dbContext.AdminProfiles.FirstOrDefault(p => p.UserId == userId);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Admin profile not found" };

            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving admin profile: {e.Message}" };
        }
    }

    public ServiceResponse UpsertAdminProfileAction(AdminProfileDto dto)
    {
        try
        {
            var entity = _dbContext.AdminProfiles.FirstOrDefault(p => p.UserId == dto.UserId);
            if (entity == null)
            {
                entity = new AdminProfileEntity { UserId = dto.UserId, CreatedDate = DateTime.UtcNow };
                _dbContext.AdminProfiles.Add(entity);
            }

            entity.AdminLevel = dto.AdminLevel;
            entity.DepartmentName = dto.DepartmentName;
            entity.PermissionsJson = JsonSerializer.Serialize(dto.Permissions);
            entity.IsActive = dto.IsActive;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error saving admin profile: {e.Message}" };
        }
    }

    private static AdminProfileDto MapToDto(AdminProfileEntity e) => new()
    {
        UserId = e.UserId,
        AdminLevel = e.AdminLevel,
        DepartmentName = e.DepartmentName,
        Permissions = string.IsNullOrWhiteSpace(e.PermissionsJson)
            ? new Dictionary<string, bool>()
            : JsonSerializer.Deserialize<Dictionary<string, bool>>(e.PermissionsJson) ?? new Dictionary<string, bool>(),
        IsActive = e.IsActive,
    };
}
