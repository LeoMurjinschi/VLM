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

    public ServiceResponse GetContactsAction(int userId)
    {
        try
        {
            var contactIds = _dbContext.Messages
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .Select(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
                .Distinct()
                .ToList();

            var contacts = _dbContext.Users
                .Where(u => contactIds.Contains(u.Id))
                .Select(u => new
                {
                    Id = u.Id,
                    Name = u.Name,
                    Role = u.Role,
                    Avatar = u.Avatar,
                })
                .ToList();

            var contactsWithLastMessage = contacts.Select(c =>
            {
                var lastMessage = _dbContext.Messages
                    .Where(m => (m.SenderId == userId && m.ReceiverId == c.Id) ||
                                (m.SenderId == c.Id && m.ReceiverId == userId))
                    .OrderByDescending(m => m.CreatedDate)
                    .FirstOrDefault();

                return new
                {
                    Id = c.Id,
                    Name = c.Name,
                    Role = c.Role,
                    Avatar = c.Avatar,
                    Initials = c.Name.Substring(0, Math.Min(2, c.Name.Length)).ToUpper(),
                    LastMessage = lastMessage?.Text ?? "",
                    Time = lastMessage?.CreatedDate.ToString("t") ?? "",
                    Unread = 0
                };
            }).ToList();

            return new ServiceResponse { IsSuccess = true, Data = contactsWithLastMessage };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving contacts: {e.Message}" };
        }
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