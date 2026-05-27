using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class ReceiverProfileActions
{
    private readonly VlmDbContext _dbContext;

    public ReceiverProfileActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetReceiverProfileAction(int userId)
    {
        try
        {
            var entity = _dbContext.ReceiverProfiles.FirstOrDefault(p => p.UserId == userId);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Receiver profile not found" };

            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving receiver profile: {e.Message}" };
        }
    }

    public ServiceResponse UpsertReceiverProfileAction(ReceiverProfileDto dto)
    {
        try
        {
            var entity = _dbContext.ReceiverProfiles.FirstOrDefault(p => p.UserId == dto.UserId);
            if (entity == null)
            {
                entity = new ReceiverProfileEntity { UserId = dto.UserId };
                _dbContext.ReceiverProfiles.Add(entity);
            }

            entity.OrgName = dto.OrgName;
            entity.MissionStatement = dto.MissionStatement;
            entity.OperatingRadius = dto.OperatingRadius;
            entity.AcceptedCategories = dto.AcceptedCategories;
            entity.TransportType = dto.TransportType;
            entity.HasIndustrialStorage = dto.HasIndustrialStorage;
            entity.Phone = dto.Phone;
            entity.Address = dto.Address;
            entity.Location = dto.Location;

            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error saving receiver profile: {e.Message}" };
        }
    }

    private static ReceiverProfileDto MapToDto(ReceiverProfileEntity e) => new()
    {
        UserId = e.UserId,
        OrgName = e.OrgName,
        MissionStatement = e.MissionStatement,
        OperatingRadius = e.OperatingRadius,
        AcceptedCategories = e.AcceptedCategories,
        TransportType = e.TransportType,
        HasIndustrialStorage = e.HasIndustrialStorage,
        Phone = e.Phone,
        Address = e.Address,
        Location = e.Location,
    };
}
