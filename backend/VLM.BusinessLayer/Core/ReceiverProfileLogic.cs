using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class ReceiverProfileLogic : ReceiverProfileActions, IReceiverProfileLogic
{
    public ServiceResponse GetReceiverProfile(int userId) => GetReceiverProfileAction(userId);
    public ServiceResponse UpsertReceiverProfile(ReceiverProfileDto dto) => UpsertReceiverProfileAction(dto);
}
