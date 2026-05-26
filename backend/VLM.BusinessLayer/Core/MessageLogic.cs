using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Message;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class MessageLogic : MessageActions, IMessageLogic
{
    public ServiceResponse GetContacts(int userId)
    {
        return GetContactsAction(userId);
    }

    public ServiceResponse GetConversation(int userId1, int userId2)
    {
        return GetConversationAction(userId1, userId2);
    }

    public ServiceResponse SendMessage(MessageCreateDto dto)
    {
        return SendMessageAction(dto);
    }

    public ServiceResponse DeleteMessage(int id)
    {
        return DeleteMessageAction(id);
    }
}