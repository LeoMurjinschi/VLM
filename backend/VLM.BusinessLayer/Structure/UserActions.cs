using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.AccountApproval;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Admin;
using VLM.Domain.Models.Auth;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;
using VLM.Domain.Models.Notification;
using System.Linq;

namespace VLM.BusinessLayer.Structure;

public class UserActions
{
    private readonly VlmDbContext _dbContext;
    private readonly NotificationActions _notificationActions;

    public UserActions(VlmDbContext dbContext, NotificationActions notificationActions)
    {
        _dbContext = dbContext;
        _notificationActions = notificationActions;
    }

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

            if (user == null)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Email or password not matching." };
            }

            var newHash = PasswordHasher.Hash(loginDto.Password);

            if (user.PasswordHash != newHash)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Email or password not matching." };
            }

            if (!user.IsActive)
            {
                return new ServiceResponse { IsSuccess = false, Message = "Inactive account." };
            }

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

            var tokenService = new TokenService();
            var token = tokenService.GenerateToken(user.Id, user.Name, user.Role.ToString());

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = new LoginResponseDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role,
                    Avatar = user.Avatar,
                    HasAcceptedSafetyCommitment = user.HasAcceptedSafetyCommitment ?? false,
                    Token = token
                }
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Login error: {e.Message}" };
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
                    CreatedDate = entity.CreatedDate,
                    HasAcceptedSafetyCommitment = entity.HasAcceptedSafetyCommitment ?? false,
                    ApprovalStatus = entity.ApprovalStatus,
                    ApprovedById = entity.ApprovedById,
                    ApprovedAt = entity.ApprovedAt,
                    RejectionReason = entity.RejectionReason
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
                CreatedDate = entity.CreatedDate,
                HasAcceptedSafetyCommitment = entity.HasAcceptedSafetyCommitment ?? false,
                ApprovalStatus = entity.ApprovalStatus,
                ApprovedById = entity.ApprovedById,
                ApprovedAt = entity.ApprovedAt,
                RejectionReason = entity.RejectionReason
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
                IsActive = false,
                CreatedDate = DateTime.UtcNow,
                ApprovalStatus = "pending"
            };

            _dbContext.Users.Add(entity);
            _dbContext.SaveChanges();

            _dbContext.UserProfiles.Add(new UserProfileEntity
            {
                UserId = entity.Id,
                OrgName = userCreateDto.OrgName,
                Address = userCreateDto.Address,
                Description = string.IsNullOrWhiteSpace(userCreateDto.FiscalCode)
                    ? string.Empty
                    : $"IDNO: {userCreateDto.FiscalCode}",
                OperatingRadius = 10,
                Verified = false,
                VerificationDocument = userCreateDto.VerificationDocument
            });
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

    public ServiceResponse ChangePasswordAction(int id, ChangePasswordDto dto)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            if (entity.PasswordHash != dto.OldPassword)
                return new ServiceResponse { IsSuccess = false, Message = "Current password is incorrect" };

            entity.PasswordHash = dto.NewPassword;
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Password changed successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error changing password: {e.Message}" };
        }
    }

    public ServiceResponse GetPendingUsersAction()
    {
        try
        {
            var users = _dbContext.Users
                .Where(u => u.ApprovalStatus == "pending")
                .Select(entity => new UserInfoDto
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Email = entity.Email,
                    Role = entity.Role,
                    Bio = entity.Bio,
                    Avatar = entity.Avatar,
                    IsActive = entity.IsActive,
                    CreatedDate = entity.CreatedDate,
                    HasAcceptedSafetyCommitment = entity.HasAcceptedSafetyCommitment ?? false,
                    ApprovalStatus = entity.ApprovalStatus,
                    ApprovedById = entity.ApprovedById,
                    ApprovedAt = entity.ApprovedAt,
                    RejectionReason = entity.RejectionReason
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
                Message = $"Error retrieving pending users: {e.Message}"
            };
        }
    }

    public ServiceResponse ApproveUserAction(int userId, AccountApprovalDecisionDto decisionDto)
    {
        try
        {
            var entity = _dbContext.Users.Find(userId);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            if (entity.ApprovalStatus == "approved")
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User already approved"
                };

            var now = DateTime.UtcNow;
            entity.ApprovalStatus = "approved";
            entity.IsActive = true;
            entity.ApprovedById = decisionDto.AdminId;
            entity.ApprovedAt = now;
            entity.RejectionReason = null;

            _dbContext.AccountApprovals.Add(new AccountApprovalEntity
            {
                UserId = userId,
                AdminId = decisionDto.AdminId,
                Decision = "approved",
                Reason = decisionDto.Reason ?? string.Empty,
                DecidedAt = now
            });

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User approved successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error approving user: {e.Message}"
            };
        }
    }

    public ServiceResponse RejectUserAction(int userId, AccountApprovalDecisionDto decisionDto)
    {
        try
        {
            var entity = _dbContext.Users.Find(userId);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User not found"
                };

            if (entity.ApprovalStatus == "rejected")
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "User already rejected"
                };

            var now = DateTime.UtcNow;
            entity.ApprovalStatus = "rejected";
            entity.IsActive = false;
            entity.ApprovedById = decisionDto.AdminId;
            entity.ApprovedAt = now;
            entity.RejectionReason = decisionDto.Reason ?? "No reason provided";

            _dbContext.AccountApprovals.Add(new AccountApprovalEntity
            {
                UserId = userId,
                AdminId = decisionDto.AdminId,
                Decision = "rejected",
                Reason = decisionDto.Reason ?? string.Empty,
                DecidedAt = now
            });

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "User rejected successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error rejecting user: {e.Message}"
            };
        }
    }

    public ServiceResponse ToggleUserActiveAction(int id)
    {
        try
        {
            var entity = _dbContext.Users.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            entity.IsActive = !entity.IsActive;
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = entity.IsActive ? "User reactivated successfully" : "User deactivated successfully",
                Data = entity.IsActive
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error toggling user active: {e.Message}" };
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

    public ServiceResponse AcceptSafetyCommitmentAction(int userId)
    {
        try
        {
            var entity = _dbContext.Users.Find(userId);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            entity.HasAcceptedSafetyCommitment = true;
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Safety commitment accepted successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error accepting safety commitment: {e.Message}" };
        }
    }
}