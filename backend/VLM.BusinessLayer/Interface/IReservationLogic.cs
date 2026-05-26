using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IReservationLogic
{
    ServiceResponse GetReservationList();
    ServiceResponse GetReservationById(int id);
    ServiceResponse GetReservationsByReceiver(int userId);
    ServiceResponse GetReservationsByDonor(int donorId);
    ServiceResponse CreateReservation(ReservationCreateDto reservationCreateDto);
    ServiceResponse UpdateReservation(int id, ReservationCreateDto reservationCreateDto);
    ServiceResponse UpdateReservationStatus(int id, ReservationStatusUpdateDto dto);
    ServiceResponse DeleteReservation(int id);
}
