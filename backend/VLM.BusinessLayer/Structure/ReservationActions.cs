using Microsoft.EntityFrameworkCore;
using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.Notification; // Adăugat pentru NotificationCreateDto

namespace VLM.BusinessLayer.Structure;

public class ReservationActions
{
    private readonly VlmDbContext _dbContext;
    private readonly NotificationActions _notificationActions;

    // Folosim injecția de dependențe
    public ReservationActions(VlmDbContext dbContext)
    {
        _dbContext = dbContext;
        _notificationActions = new NotificationActions(_dbContext); // Inițializăm NotificationActions
    }

    // Constructor păstrat pentru compatibilitate inversă
    public ReservationActions()
    {
        _dbContext = new VlmDbContext();
        _notificationActions = new NotificationActions(_dbContext);
    }

    private static ReservationInfoDto MapToDto(ReservationEntity entity) => new()
    {
        Id = entity.Id,
        UserId = entity.UserId,
        DonationId = entity.DonationId,
        QuantityReserved = entity.QuantityReserved,
        Status = entity.Status,
        Notes = entity.Notes,
        CreatedDate = entity.CreatedDate,
        UpdatedDate = entity.UpdatedDate,
        DonorConfirmedAt = entity.DonorConfirmedAt,
        ReceiverConfirmedAt = entity.ReceiverConfirmedAt,
        CompletedAt = entity.CompletedAt,
        DonationTitle = entity.Donation?.Title ?? string.Empty,
        DonationImage = entity.Donation?.Image,
        DonationCategory = entity.Donation?.Category ?? string.Empty,
        DonationUnit = entity.Donation?.Unit ?? string.Empty,
        PickupLocation = entity.Donation?.PickupLocation ?? string.Empty,
        ExpirationDate = entity.Donation?.ExpirationDate,
        DonorId = entity.Donation?.DonorId ?? 0,
        DonorName = entity.Donation?.Donor?.Name ?? string.Empty,
        DonorAvatar = entity.Donation?.Donor?.Avatar,
        ReceiverName = entity.Receiver?.Name ?? string.Empty,
        ReceiverAvatar = entity.Receiver?.Avatar,
        PickupLatitude = entity.Donation?.PickupLatitude,
        PickupLongitude = entity.Donation?.PickupLongitude,
    };

    private IQueryable<ReservationEntity> WithIncludes() =>
        _dbContext.Reservations
            .Include(r => r.Receiver)
            .Include(r => r.Donation)
                .ThenInclude(d => d.Donor);

    private void UpdateDonationStatusIfNeeded(int donationId)
    {
        var donation = _dbContext.Donations.Find(donationId);
        if (donation == null) return;

        // Calculate total reserved quantity
        var reservedQuantity = _dbContext.Reservations
            .Where(r => r.DonationId == donationId && (r.Status == "pending" || r.Status == "donor_confirmed"))
            .Sum(r => r.QuantityReserved);

        var availableQuantity = donation.Quantity - reservedQuantity;

        // If no quantity is available, mark as Reserved
        if (availableQuantity <= 0 && donation.Status != "Reserved")
        {
            donation.Status = "Reserved";
            _dbContext.SaveChanges();
        }
    }

    public ServiceResponse GetReservationListAction()
    {
        try
        {
            var reservations = WithIncludes().ToList().Select(MapToDto).ToList();
            return new ServiceResponse { IsSuccess = true, Data = reservations };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse GetReservationByIdAction(int id)
    {
        try
        {
            var entity = WithIncludes().FirstOrDefault(r => r.Id == id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Reservation not found" };

            return new ServiceResponse { IsSuccess = true, Data = MapToDto(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservation: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse GetReservationsByReceiverAction(int userId)
    {
        try
        {
            var reservations = WithIncludes()
                .Where(r => r.UserId == userId)
                .ToList()
                .Select(MapToDto)
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = reservations };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse GetReservationsByDonorAction(int donorId)
    {
        try
        {
            var reservations = WithIncludes()
                .Where(r => r.Donation.DonorId == donorId)
                .ToList()
                .Select(MapToDto)
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = reservations };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse CreateReservationAction(ReservationCreateDto dto)
    {
        try
        {
            var receiver = _dbContext.Users.Find(dto.UserId);
            if (receiver == null)
            {
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };
            }

            // Verificăm angajamentul de siguranță pe backend
            if (receiver.HasAcceptedSafetyCommitment != true)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Safety commitment not accepted" };
            }

            var donation = _dbContext.Donations.Find(dto.DonationId);
            if (donation == null)
                return new ServiceResponse { IsSuccess = false, Message = "Donation not found" };

            // Calculate available quantity by subtracting pending and confirmed reservations
            var reservedQuantity = _dbContext.Reservations
                .Where(r => r.DonationId == dto.DonationId && (r.Status == "pending" || r.Status == "donor_confirmed"))
                .Sum(r => r.QuantityReserved);

            var availableQuantity = Math.Max(0, donation.Quantity - reservedQuantity);

            if (availableQuantity < dto.QuantityReserved)
                return new ServiceResponse { IsSuccess = false, Message = $"Only {availableQuantity} {donation.Unit} available" };

            var entity = new ReservationEntity
            {
                UserId = dto.UserId,
                DonationId = dto.DonationId,
                QuantityReserved = dto.QuantityReserved,
                Notes = dto.Notes,
                Status = "pending",
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Reservations.Add(entity);
            _dbContext.SaveChanges();

            // Check if donation should be marked as Reserved after this reservation
            var newReservedQuantity = reservedQuantity + dto.QuantityReserved;
            var newAvailableQuantity = Math.Max(0, donation.Quantity - newReservedQuantity);

            if (newAvailableQuantity <= 0)
            {
                // Refetch donation from database to ensure it's properly tracked
                var donationToUpdate = _dbContext.Donations.Find(dto.DonationId);
                if (donationToUpdate != null && donationToUpdate.Status != "Reserved")
                {
                    donationToUpdate.Status = "Reserved";
                    _dbContext.SaveChanges();
                }
            }

            var responseDto = new ReservationInfoDto
            {
                Id = entity.Id,
                UserId = entity.UserId,
                DonationId = entity.DonationId,
                QuantityReserved = entity.QuantityReserved,
                Status = entity.Status,
                Notes = entity.Notes,
                CreatedDate = entity.CreatedDate,
                DonationTitle = donation.Title,
                DonationImage = donation.Image,
                DonationCategory = donation.Category,
                DonationUnit = donation.Unit,
                PickupLocation = donation.PickupLocation,
                ExpirationDate = donation.ExpirationDate,
                DonorId = donation.DonorId,
                DonorName = _dbContext.Users.Find(donation.DonorId)?.Name ?? "Unknown Donor",
                DonorAvatar = _dbContext.Users.Find(donation.DonorId)?.Avatar,
                ReceiverName = receiver.Name,
                ReceiverAvatar = receiver.Avatar,
            };

            return new ServiceResponse { IsSuccess = true, Data = responseDto, Message = "Reservation created successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error creating reservation: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse UpdateReservationStatusAction(int id, ReservationStatusUpdateDto dto)
    {
        try
        {
            var entity = _dbContext.Reservations
                .Include(r => r.Donation) 
                .FirstOrDefault(r => r.Id == id);
                
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Reservation not found" };

            if (dto.Status == "donor_confirmed" && entity.Status != "donor_confirmed")
            {
                _notificationActions.CreateNotificationAction(new NotificationCreateDto
                {
                    UserId = entity.UserId,
                    Title = "Reservation Ready!",
                    Description = $"The donor has confirmed your reservation for '{entity.Donation?.Title}'. It is now ready for pickup.",
                    Type = "reservation",
                    Link = "/receiver/history"
                });
            }

            if (dto.Status == "completed" && entity.Status != "completed")
            {
                if (entity.Donation != null)
                {
                    var actualQty = dto.QuantityConfirmed ?? entity.QuantityReserved;
                    entity.Donation.Quantity = Math.Max(0, entity.Donation.Quantity - actualQty);
                    _dbContext.Update(entity.Donation);
                }
            }

            entity.Status = dto.Status;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            var updated = WithIncludes().FirstOrDefault(r => r.Id == id);
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(updated!), Message = "Status updated successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating status: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse UpdateReservationAction(int id, ReservationCreateDto dto)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Reservation not found" };

            entity.Notes = dto.Notes;
            entity.UpdatedDate = DateTime.UtcNow;
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Reservation updated successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating reservation: {e.InnerException?.Message ?? e.Message}" };
        }
    }

    public ServiceResponse DeleteReservationAction(int id)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Reservation not found" };

            _dbContext.Reservations.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Reservation deleted successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error deleting reservation: {e.InnerException?.Message ?? e.Message}" };
        }
    }
}