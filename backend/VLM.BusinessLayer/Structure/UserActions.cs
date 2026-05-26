using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class UserActions
{
    private readonly VlmDbContext _dbContext;

    public UserActions()
    {
        _dbContext = new VlmDbContext();
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

    public ServiceResponse LoginAction(UserLoginDto loginDto)
    {
        try
        {
            // Corectat: am adăugat "== loginDto.Email"
            var passwordHash = PasswordHasher.Hash(loginDto.Password);
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == loginDto.Email && x.PasswordHash == passwordHash);
            
            if (!user.IsActive)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Inactive account." };
            }

            var tokenService = new TokenService();

            // Corectat: Am șters punctul din fața parantezei
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
        } // Corectat: Paranteza care închidea blocul 'try' lipsea
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error logging in: {e.Message}"
            };
        }
    }
}
