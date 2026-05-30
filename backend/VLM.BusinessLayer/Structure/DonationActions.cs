using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Models.Donation;
using VLM.Domain.Models.Notification; // Adăugat pentru a putea folosi DTO-ul de notificare
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class DonationActions
{
    private readonly VlmDbContext _dbContext;
    private readonly NotificationActions _notificationActions; // Adăugat pentru a putea crea notificări

    public DonationActions()
    {
        _dbContext = new VlmDbContext();
        _notificationActions = new NotificationActions(); // Inițializat
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
                Category = donationCreateDto.Category,
                PickupLocation = donationCreateDto.PickupLocation,
                ExpirationDate = donationCreateDto.ExpirationDate,
                Image = donationCreateDto.Image,
                Status = "Available",
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Donations.Add(donationEntity);
            _dbContext.SaveChanges();

            // --- AICI ADAUG NOTIFICAREA PENTRU DONAȚII URGENTE ---
            // Verificăm dacă donația este urgentă (expiră în mai puțin de 24 de ore)
            if (donationCreateDto.ExpirationDate.HasValue && (donationCreateDto.ExpirationDate.Value - DateTime.UtcNow).TotalHours < 24)
            {
                // Găsim toți utilizatorii cu rolul de "receiver"
                var receivers = _dbContext.Users.Where(u => u.Role == "receiver").ToList();

                foreach (var receiver in receivers)
                {
                    _notificationActions.CreateNotificationAction(new NotificationCreateDto
                    {
                        UserId = receiver.Id,
                        Title = "Urgent Donation Available!",
                        Description = $"A new urgent donation '{donationCreateDto.Title}' has been listed.",
                        Type = "urgent_donation",
                        Link = $"/receiver/stock/{donationEntity.Id}" // Link direct către donație
                    });
                }
            }
            // ----------------------------------------------------

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

    private const decimal LowStockThreshold = 5;

    public ServiceResponse GetDonationsByDonorIdAction(
        int donorId,
        string? sortBy = null,
        string? categories = null,
        string? status = null)
    {
        try
        {
            var now = DateTime.UtcNow;
            var categoryList = categories?
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .ToHashSet(StringComparer.OrdinalIgnoreCase);

            var baseQuery = _dbContext.Donations.Where(d => d.DonorId == donorId);

            // Category filter
            if (categoryList is { Count: > 0 })
                baseQuery = baseQuery.Where(d => categoryList.Contains(d.Category));

            // Status filter (derived from DB fields)
            baseQuery = status switch
            {
                "In Stock"  => baseQuery.Where(d => d.Status == "Available" && d.ExpirationDate > now && d.Quantity >= LowStockThreshold),
                "Low Stock" => baseQuery.Where(d => d.Status == "Available" && d.ExpirationDate > now && d.Quantity > 0 && d.Quantity < LowStockThreshold),
                "Expired"   => baseQuery.Where(d => d.ExpirationDate <= now || d.Quantity <= 0),
                _           => baseQuery
            };

            var query = baseQuery.Select(entity => new DonationInfoDto
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description,
                Quantity = entity.Quantity,
                Unit = entity.Unit,
                DonorId = entity.DonorId,
                Category = entity.Category,
                PickupLocation = entity.PickupLocation,
                ExpirationDate = entity.ExpirationDate,
                Image = entity.Image,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
                UpdatedDate = entity.UpdatedDate,
                DonorName = entity.Donor.Name,
                DonorAvatar = entity.Donor.Avatar
            });

            var donations = sortBy switch
            {
                "oldest"        => query.OrderBy(d => d.CreatedDate).ToList(),
                "expiring_soon" => query.OrderBy(d => d.ExpirationDate).ToList(),
                "name_asc"      => query.OrderBy(d => d.Title).ToList(),
                "quantity_high" => query.OrderByDescending(d => d.Quantity).ToList(),
                "quantity_low"  => query.OrderBy(d => d.Quantity).ToList(),
                _               => query.OrderByDescending(d => d.CreatedDate).ToList(),
            };

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

    public ServiceResponse GetDonationByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Donations
                .Where(d => d.Id == id)
                .Select(d => new DonationInfoDto
                {
                    Id = d.Id,
                    Title = d.Title,
                    Description = d.Description,
                    Quantity = d.Quantity,
                    Unit = d.Unit,
                    DonorId = d.DonorId,
                    Category = d.Category,
                    PickupLocation = d.PickupLocation,
                    ExpirationDate = d.ExpirationDate,
                    Image = d.Image,
                    Status = d.Status,
                    CreatedDate = d.CreatedDate,
                    UpdatedDate = d.UpdatedDate,
                    DonorName = d.Donor.Name,
                    DonorAvatar = d.Donor.Avatar
                })
                .FirstOrDefault();

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Donation not found"
                };

            var dto = entity;

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
            var now = DateTime.UtcNow;
            var donations = _dbContext.Donations
                .Where(d => d.ExpirationDate > now)
                .Select(entity => new DonationInfoDto
                {
                    Id = entity.Id,
                    Title = entity.Title,
                    Description = entity.Description,
                    Quantity = entity.Quantity,
                    Unit = entity.Unit,
                    DonorId = entity.DonorId,
                    Category = entity.Category,
                    PickupLocation = entity.PickupLocation,
                    ExpirationDate = entity.ExpirationDate,
                    Image = entity.Image,
                    Status = entity.Status,
                    CreatedDate = entity.CreatedDate,
                    UpdatedDate = entity.UpdatedDate,
                    DonorName = entity.Donor.Name,
                    DonorAvatar = entity.Donor.Avatar
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
            entity.Category = donationCreateDto.Category;
            entity.PickupLocation = donationCreateDto.PickupLocation;
            entity.ExpirationDate = donationCreateDto.ExpirationDate;
            entity.Image = donationCreateDto.Image;
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