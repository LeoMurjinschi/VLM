using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class UserSettingsActions
{
    private readonly VlmDbContext _dbContext;

    public UserSettingsActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetSettingsByUserAction(int userId)
    {
        try
        {
            var entity = _dbContext.UserSettings.FirstOrDefault(s => s.UserId == userId);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Settings not found" };

            var dto = new UserSettingsDto
            {
                UserId = entity.UserId,
                Theme = entity.Theme,
                NotifyPush = entity.NotifyPush,
                NotifySms = entity.NotifySms,
                NotifyEmail = entity.NotifyEmail,
                EmailUpdates = entity.EmailUpdates
            };

            return new ServiceResponse { IsSuccess = true, Data = dto };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving settings: {e.Message}" };
        }
    }

    public ServiceResponse UpsertSettingsAction(UserSettingsDto dto)
    {
        try
        {
            var entity = _dbContext.UserSettings.FirstOrDefault(s => s.UserId == dto.UserId);

            if (entity == null)
            {
                entity = new UserSettingsEntity
                {
                    UserId = dto.UserId,
                    Theme = dto.Theme,
                    NotifyPush = dto.NotifyPush,
                    NotifySms = dto.NotifySms,
                    NotifyEmail = dto.NotifyEmail,
                    EmailUpdates = dto.EmailUpdates
                };
                _dbContext.UserSettings.Add(entity);
            }
            else
            {
                entity.Theme = dto.Theme;
                entity.NotifyPush = dto.NotifyPush;
                entity.NotifySms = dto.NotifySms;
                entity.NotifyEmail = dto.NotifyEmail;
                entity.EmailUpdates = dto.EmailUpdates;
            }

            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Settings saved successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error saving settings: {e.Message}" };
        }
    }
}
