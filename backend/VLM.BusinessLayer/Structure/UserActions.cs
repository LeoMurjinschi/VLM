using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;
using VLM.Domain.Models.Notification; // Adăugat pentru a putea folosi DTO-ul de notificare
using System.Linq; // Pentru FirstOrDefault

namespace VLM.BusinessLayer.Structure;

public class UserActions
{
    private readonly VlmDbContext _dbContext;
    private readonly NotificationActions _notificationActions;

    // AICI ESTE SCHIMBAREA CHEIE: Injectăm VlmDbContext și NotificationActions
    public UserActions(VlmDbContext dbContext, NotificationActions notificationActions)
    {
        _dbContext = dbContext;
        _notificationActions = notificationActions;
    }

    // Constructor fără parametri păstrat pentru compatibilitate inversă în alte părți ale codului (deocamdată)
    // În mod ideal, toate locurile unde se folosește 'new UserActions()' ar trebui refăcute.
    public UserActions()
    {
        _dbContext = new VlmDbContext();
        _notificationActions = new NotificationActions(_dbContext); 
    }

    public ServiceResponse LoginAction(UserLoginDto loginDto, string userAgent, string ipAddress)
    {
        try
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == loginDto.Email);

            if (user == null || user.PasswordHash != PasswordHasher.Hash(loginDto.Password))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Email or password not matching."
                };
            }
            
            if (!user.IsActive)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Inactive account." };
            }

            // --- AICI ADAUG NOTIFICAREA DE LOGIN CU DETALII ---
            string device = "an unknown device";
            if (!string.IsNullOrEmpty(userAgent))
            {
                if (userAgent.Contains("Chrome")) device = "Chrome";
                else if (userAgent.Contains("Firefox")) device = "Firefox";
                else if (userAgent.Contains("Safari")) device = "Safari";
                else if (userAgent.Contains("Edg")) device = "Edge";
                else device = "a browser";
            }

            _notificationActions.CreateNotificationAction(new NotificationCreateDto
            {
                UserId = user.Id,
                Title = "Successful Login",
                Description = $"We detected a new login from {device} at IP: {ipAddress ?? "unknown"}.",
                Type = "security", 
                Link = $"/{user.Role.ToString().ToLower()}/profile"
            });
            // -----------------------------------------

            var tokenService = new TokenService();
            var token = tokenService.GenerateToken(user.Id, user.Name, user.Role.ToString());

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    role = user.Role,
                    avatar = user.Avatar,
                    token = token
                }
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error logging in: {e.Message}"
            };
        }
    }
    
    public ServiceResponse GetUserListAction()
    {
        try
        {
            var users = _dbContext.Users
                .Select(entity => new UserInfoDto
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Email = entity.Email,
                    Role = entity.Role,
                    Bio = entity.Bio,
                    Avatar = entity.Avatar,
                    IsActive = entity.IsActive,
                    CreatedDate = entity.CreatedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = users
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving users: {e.Message}"
            };
        }
    }

    public ServiceResponse GetUserByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            var dto = new UserInfoDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Role = entity.Role,
                Bio = entity.Bio,
                Avatar = entity.Avatar,
                IsActive = entity.IsActive,
                CreatedDate = entity.CreatedDate
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = dto
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving user: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateUserAction(UserCreateDto userCreateDto)
    {
        try
        {
            var entity = new UserEntity
            {
                Name = userCreateDto.Name,
                Email = userCreateDto.Email,
                PasswordHash = PasswordHasher.Hash(userCreateDto.Password),
                Role = userCreateDto.Role,
                Bio = userCreateDto.Bio,
                Avatar = userCreateDto.Avatar,
                IsActive = true,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating user: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateUserAction(int id, UserCreateDto userCreateDto)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            entity.Name = userCreateDto.Name;
            entity.Email = userCreateDto.Email;
            entity.Role = userCreateDto.Role;
            entity.Bio = userCreateDto.Bio;
            entity.Avatar = userCreateDto.Avatar;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating user: {e.Message}"
            };
        }
    }

    public ServiceResponse ChangePasswordAction(int id, ChangePasswordDto dto)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            if (entity.PasswordHash != PasswordHasher.Hash(dto.OldPassword))
                return new ServiceResponse { IsSuccess = false, Message = "Current password is incorrect" };

            entity.PasswordHash = PasswordHasher.Hash(dto.NewPassword);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Password changed successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error changing password: {e.Message}" };
        }
    }

    public ServiceResponse UpdateUserInfoAction(int id, UserInfoUpdateDto dto)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            entity.Name = dto.Name;
            entity.Email = dto.Email;
            entity.Avatar = dto.Avatar;
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "User info updated successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error updating user info: {e.Message}" };
        }
    }

    public ServiceResponse DeleteUserAction(int id)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            _dbContext.Users.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting user: {e.Message}"
            };
        }
    }
}