using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Models.Donation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class DonationActions
{
    private readonly VlmDbContext _dbContext;

    public DonationActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse CreateDonationAction(DonationCreateDto donationCreateDto)
    {
        try
        {
            var donationEntity = new DonationEntity
            {
                Title = donationCreateDto.Title,
                Description = donationCreateDto.Description,
                Quantity = donationCreateDto.Quantity,
                Unit = donationCreateDto.Unit,
                DonorId = donationCreateDto.DonorId,
                Status = "Available",
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Donations.Add(donationEntity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Donation created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating donation: {e.Message}"
            };
        }
    }

    public ServiceResponse GetDonationByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Donations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Donation not found"
                };

            var dto = new DonationInfoDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                Quantity = entity.Quantity,
                Unit = entity.Unit,
                DonorId = entity.DonorId,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
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
                Message = $"Error retrieving donation: {e.Message}"
            };
        }
    }

    public ServiceResponse GetDonationListAction()
    {
        try
        {
            var donations = _dbContext.Donations
                .Select(entity => new DonationInfoDto
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    Description = entity.Description,
                    Quantity = entity.Quantity,
                    Unit = entity.Unit,
                    DonorId = entity.DonorId,
                    Status = entity.Status,
                    CreatedDate = entity.CreatedDate,
                    UpdatedDate = entity.UpdatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = donations
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving donations: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateDonationAction(int id, DonationCreateDto donationCreateDto)
    {
        try
        {
            var entity = _dbContext.Donations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Donation not found"
                };

            entity.Title = donationCreateDto.Title;
            entity.Description = donationCreateDto.Description;
            entity.Quantity = donationCreateDto.Quantity;
            entity.Unit = donationCreateDto.Unit;
            entity.DonorId = donationCreateDto.DonorId;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Donation updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating donation: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteDonationAction(int id)
    {
        try
        {
            var entity = _dbContext.Donations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Donation not found"
                };

            _dbContext.Donations.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Donation deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting donation: {e.Message}"
            };
        }
    }
}
