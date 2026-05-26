using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Reservation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class ReservationLogic : ReservationActions, IReservationLogic
{
    public ServiceResponse GetReservationList() => GetReservationListAction();
    public ServiceResponse GetReservationById(int id) => GetReservationByIdAction(id);
    public ServiceResponse GetReservationsByReceiver(int userId) => GetReservationsByReceiverAction(userId);
    public ServiceResponse GetReservationsByDonor(int donorId) => GetReservationsByDonorAction(donorId);
    public ServiceResponse CreateReservation(ReservationCreateDto dto) => CreateReservationAction(dto);
    public ServiceResponse UpdateReservation(int id, ReservationCreateDto dto) => UpdateReservationAction(id, dto);
    public ServiceResponse UpdateReservationStatus(int id, ReservationStatusUpdateDto dto) => UpdateReservationStatusAction(id, dto);
    public ServiceResponse DeleteReservation(int id) => DeleteReservationAction(id);
}
