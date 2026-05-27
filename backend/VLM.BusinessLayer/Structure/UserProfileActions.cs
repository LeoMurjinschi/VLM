using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class UserProfileActions
{
    private readonly VlmDbContext _dbContext;

    public UserProfileActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetProfileByUserAction(int userId)
    {
        try
        {
            var entity = _dbContext.UserProfiles.FirstOrDefault(p => p.UserId == userId);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Profile not found" };

            var dto = new UserProfileDto
            {
                UserId = entity.UserId,
                Phone = entity.Phone,
                Address = entity.Address,
                OrgName = entity.OrgName,
                Description = entity.Description,
                MissionStatement = entity.MissionStatement,
                OperatingHours = entity.OperatingHours,
                OperatingRadius = entity.OperatingRadius,
                AcceptedCategories = entity.AcceptedCategories,
                TransportType = entity.TransportType,
                HasIndustrialStorage = entity.HasIndustrialStorage,
                Location = entity.Location,
                Verified = entity.Verified,
                VerificationDocument = entity.VerificationDocument
            };

            return new ServiceResponse { IsSuccess = true, Data = dto };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving profile: {e.Message}" };
        }
    }

    public ServiceResponse UpsertProfileAction(UserProfileDto dto)
    {
        try
        {
            var entity = _dbContext.UserProfiles.FirstOrDefault(p => p.UserId == dto.UserId);

            if (entity == null)
            {
                entity = new UserProfileEntity
                {
                    UserId = dto.UserId,
                    Phone = dto.Phone,
                    Address = dto.Address,
                    OrgName = dto.OrgName,
                    Description = dto.Description,
                    MissionStatement = dto.MissionStatement,
                    OperatingHours = dto.OperatingHours,
                    OperatingRadius = dto.OperatingRadius,
                    AcceptedCategories = dto.AcceptedCategories,
                    TransportType = dto.TransportType,
                    HasIndustrialStorage = dto.HasIndustrialStorage,
                    Location = dto.Location
                };
                _dbContext.UserProfiles.Add(entity);
            }
            else
            {
                entity.Phone = dto.Phone;
                entity.Address = dto.Address;
                entity.OrgName = dto.OrgName;
                entity.Description = dto.Description;
                entity.MissionStatement = dto.MissionStatement;
                entity.OperatingHours = dto.OperatingHours;
                entity.OperatingRadius = dto.OperatingRadius;
                entity.AcceptedCategories = dto.AcceptedCategories;
                entity.TransportType = dto.TransportType;
                entity.HasIndustrialStorage = dto.HasIndustrialStorage;
                entity.Location = dto.Location;
            }

            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Profile saved successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error saving profile: {e.Message}" };
        }
    }
}
