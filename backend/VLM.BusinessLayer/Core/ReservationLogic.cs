using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class ReservationLogic : ReservationActions, IReservationLogic
{
    public ServiceResponse GetReservationList()
    {
        return GetReservationListAction();
    }

    public ServiceResponse GetReservationById(int id)
    {
        return GetReservationByIdAction(id);
    }

    public ServiceResponse CreateReservation(ReservationCreateDto reservationCreateDto)
    {
        return CreateReservationAction(reservationCreateDto);
    }

    public ServiceResponse UpdateReservation(int id, ReservationCreateDto reservationCreateDto)
    {
        return UpdateReservationAction(id, reservationCreateDto);
    }

    public ServiceResponse DeleteReservation(int id)
    {
        return DeleteReservationAction(id);
    }
}
