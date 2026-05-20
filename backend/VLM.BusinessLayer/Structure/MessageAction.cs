using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Message;
using VLM.Domain.Models.Message;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class MessageActions
{
    private readonly VlmDbContext _dbContext;

    public MessageActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetConversationAction(int userId1, int userId2)
    {
        try
        {
            var messages = _dbContext.Messages
                .Where(m => (m.SenderId == userId1 && m.ReceiverId == userId2) ||
                            (m.SenderId == userId2 && m.ReceiverId == userId1))
                .OrderBy(m => m.CreatedDate)
                .Select(entity => new MessageInfoDto
                {
                    Id = entity.Id,
                    SenderId = entity.SenderId,
                    ReceiverId = entity.ReceiverId,
                    Text = entity.Text,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = messages };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving messages: {e.Message}" };
        }
    }

    public ServiceResponse SendMessageAction(MessageCreateDto dto)
    {
        try
        {
            var entity = new MessageEntity
            {
                SenderId = dto.SenderId,
                ReceiverId = dto.ReceiverId,
                Text = dto.Text,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Messages.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Message sent successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error sending message: {e.Message}" };
        }
    }

    public ServiceResponse DeleteMessageAction(int id)
    {
        try
        {
            var entity = _dbContext.Messages.Find(id);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Message not found" };

            _dbContext.Messages.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Message deleted successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error deleting message: {e.Message}" };
        }
    }
}
