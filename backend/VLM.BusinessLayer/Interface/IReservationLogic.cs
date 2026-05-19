using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IReservationLogic
{
    ServiceResponse GetReservationList();
    ServiceResponse GetReservationById(int id);
    ServiceResponse CreateReservation(ReservationCreateDto reservationCreateDto);
    ServiceResponse UpdateReservation(int id, ReservationCreateDto reservationCreateDto);
    ServiceResponse DeleteReservation(int id);
}
