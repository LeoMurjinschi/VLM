using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class DonorProfileActions
{
    private readonly VlmDbContext _dbContext;

    public DonorProfileActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetDonorProfileAction(int userId)
    {
        try
        {
            var entity = _dbContext.DonorProfiles.FirstOrDefault(p => p.UserId == userId);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Donor profile not found" };

            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving donor profile: {e.Message}" };
        }
    }

    public ServiceResponse UpsertDonorProfileAction(DonorProfileDto dto)
    {
        try
        {
            var entity = _dbContext.DonorProfiles.FirstOrDefault(p => p.UserId == dto.UserId);
            if (entity == null)
            {
                entity = new DonorProfileEntity { UserId = dto.UserId };
                _dbContext.DonorProfiles.Add(entity);
            }

            entity.CompanyName = dto.CompanyName;
            entity.Description = dto.Description;
            entity.OperatingHours = dto.OperatingHours;
            entity.TransportType = dto.TransportType;
            entity.Phone = dto.Phone;
            entity.Address = dto.Address;
            entity.Location = dto.Location;

            _dbContext.SaveChanges();
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error saving donor profile: {e.Message}" };
        }
    }

    private static DonorProfileDto MapToDto(DonorProfileEntity e) => new()
    {
        UserId = e.UserId,
        CompanyName = e.CompanyName,
        Description = e.Description,
        OperatingHours = e.OperatingHours,
        TransportType = e.TransportType,
        Phone = e.Phone,
        Address = e.Address,
        Location = e.Location,
    };
}
