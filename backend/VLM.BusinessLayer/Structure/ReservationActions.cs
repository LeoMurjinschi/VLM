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

    public ServiceResponse GetReservationListAction()
    {
        try
        {
            var reservations = _dbContext.Reservations
                .Select(entity => new ReservationInfoDto
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
                    CancelledAt = entity.CancelledAt,
                    CancelledBy = entity.CancelledBy
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = reservations
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving reservations: {e.Message}"
            };
        }
    }

    public ServiceResponse GetReservationByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Reservation not found"
                };

            var dto = new ReservationInfoDto
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
                CancelledAt = entity.CancelledAt,
                CancelledBy = entity.CancelledBy
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
                Message = $"Error retrieving reservation: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateReservationAction(ReservationCreateDto reservationCreateDto)
    {
        try
        {
            var entity = new ReservationEntity
            {
                UserId = reservationCreateDto.UserId,
                DonationId = reservationCreateDto.DonationId,
                QuantityReserved = reservationCreateDto.QuantityReserved,
                Notes = reservationCreateDto.Notes,
                Status = "Pending",
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Reservations.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Reservation created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating reservation: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateReservationAction(int id, ReservationCreateDto reservationCreateDto)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Reservation not found"
                };

            entity.Notes = reservationCreateDto.Notes;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Reservation updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating reservation: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteReservationAction(int id)
    {
        try
        {
            var entity = _dbContext.Reservations.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Reservation not found"
                };

            _dbContext.Reservations.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Reservation deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting reservation: {e.Message}"
            };
        }
    }
}
