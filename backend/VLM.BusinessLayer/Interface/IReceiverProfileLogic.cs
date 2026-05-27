using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IReceiverProfileLogic
{
    ServiceResponse GetReceiverProfile(int userId);
    ServiceResponse UpsertReceiverProfile(ReceiverProfileDto dto);
}
