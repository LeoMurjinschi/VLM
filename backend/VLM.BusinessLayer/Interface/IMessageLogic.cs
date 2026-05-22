using VLM.Domain.Models.Message;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IMessageLogic
{
    ServiceResponse GetContacts(int userId);
    ServiceResponse GetConversation(int userId1, int userId2);
    ServiceResponse SendMessage(MessageCreateDto dto);
    ServiceResponse DeleteMessage(int id);
}