using Microsoft.EntityFrameworkCore;
using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class ReservationActions
{
    private readonly VlmDbContext _dbContext;

    public ReservationActions()
    {
        _dbContext = new VlmDbContext();
    }

    private static ReservationInfoDto MapToDto(ReservationEntity entity) => new()
    {
        Id = entity.Id,
        UserId = entity.UserId,
        DonationId = entity.DonationId,
        QuantityReserved = entity.QuantityReserved,
        QuantityPickedUpByReceiver = entity.QuantityPickedUpByReceiver,
        QuantityConfirmed = entity.QuantityConfirmed,
        Status = entity.Status,
        Notes = entity.Notes,
        CreatedDate = entity.CreatedDate,
        UpdatedDate = entity.UpdatedDate,
        DonorConfirmedAt = entity.DonorConfirmedAt,
        ReceiverConfirmedAt = entity.ReceiverConfirmedAt,
        CompletedAt = entity.CompletedAt,
        CancelledAt = entity.CancelledAt,
        CancelledBy = entity.CancelledBy,
        DonationTitle = entity.Donation?.Title ?? string.Empty,
        DonationImage = entity.Donation?.Image,
        DonationCategory = entity.Donation?.Category ?? string.Empty,
        DonationUnit = entity.Donation?.Unit ?? string.Empty,
        PickupLocation = entity.Donation?.PickupLocation ?? string.Empty,
        ExpirationDate = entity.Donation?.ExpirationDate,
        DonorId = entity.Donation?.DonorId ?? 0,
        DonorName = entity.Donation?.Donor?.Name ?? string.Empty,
        ReceiverName = entity.Receiver?.Name ?? string.Empty,
    };

    private IQueryable<ReservationEntity> WithIncludes() =>
        _dbContext.Reservations
            .Include(r => r.Receiver)
            .Include(r => r.Donation)
                .ThenInclude(d => d.Donor);

    public ServiceResponse GetReservationListAction()
    {
        try
        {
            var reservations = WithIncludes().ToList().Select(MapToDto).ToList();
            return new ServiceResponse { IsSuccess = true, Data = reservations };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.Message}" };
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
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservation: {e.Message}" };
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
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.Message}" };
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
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving reservations: {e.Message}" };
        }
    }

    public ServiceResponse CreateReservationAction(ReservationCreateDto dto)
    {
        try
        {
            var donation = _dbContext.Donations.Find(dto.DonationId);
            if (donation == null)
                return new ServiceResponse { IsSuccess = false, Message = "Donation not found" };

            if (donation.Quantity < dto.QuantityReserved)
                return new ServiceResponse { IsSuccess = false, Message = $"Only {donation.Quantity} {donation.Unit} available" };

            var entity = new ReservationEntity
            {
                UserId = dto.UserId,
                DonationId = dto.DonationId,
                QuantityReserved = dto.QuantityReserved,
                Notes = dto.Notes,
                Status = "pending",
                CreatedDate = DateTime.UtcNow
            };

            donation.Quantity -= dto.QuantityReserved;

            _dbContext.Reservations.Add(entity);
            _dbContext.SaveChanges();

            var created = WithIncludes().FirstOrDefault(r => r.Id == entity.Id);
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(created!), Message = "Reservation created successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error creating reservation: {e.Message}" };
        }
    }

    public ServiceResponse UpdateReservationStatusAction(int id, ReservationStatusUpdateDto dto)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Reservation not found" };

            entity.Status = dto.Status;
            entity.UpdatedDate = DateTime.UtcNow;

            switch (dto.Status)
            {
                case "donor_confirmed":
                    entity.DonorConfirmedAt = DateTime.UtcNow;
                    break;
                case "receiver_confirmed":
                    entity.ReceiverConfirmedAt = DateTime.UtcNow;
                    entity.QuantityPickedUpByReceiver = dto.QuantityPickedUpByReceiver;
                    break;
                case "completed":
                    entity.CompletedAt = DateTime.UtcNow;
                    entity.QuantityConfirmed = dto.QuantityConfirmed;
                    if (dto.QuantityConfirmed.HasValue)
                    {
                        var diff = entity.QuantityReserved - dto.QuantityConfirmed.Value;
                        if (diff > 0)
                        {
                            var donation = _dbContext.Donations.Find(entity.DonationId);
                            if (donation != null && (donation.ExpirationDate == null || donation.ExpirationDate > DateTime.UtcNow))
                                donation.Quantity += diff;
                        }
                    }
                    break;
                case "cancelled":
                    entity.CancelledAt = DateTime.UtcNow;
                    entity.CancelledBy = dto.CancelledBy;
                    var cancelledDonation = _dbContext.Donations.Find(entity.DonationId);
                    if (cancelledDonation != null && (cancelledDonation.ExpirationDate == null || cancelledDonation.ExpirationDate > DateTime.UtcNow))
                        cancelledDonation.Quantity += entity.QuantityReserved;
                    break;
            }

            _dbContext.SaveChanges();

            var updated = WithIncludes().FirstOrDefault(r => r.Id == id);
            return new ServiceResponse { IsSuccess = true, Data = MapToDto(updated!), Message = "Status updated successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating status: {e.Message}" };
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
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating reservation: {e.Message}" };
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
            return new ServiceResponse { IsSuccess = false, Message = $"Error deleting reservation: {e.Message}" };
        }
    }
}
