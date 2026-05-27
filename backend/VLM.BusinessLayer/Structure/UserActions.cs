using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.AccountApproval;
using VLM.Domain.Entities.AdminAction;
using VLM.Domain.Entities.User;
using VLM.Domain.Models.Admin;
using VLM.Domain.Models.Auth;
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

    public ServiceResponse LoginAction(UserLoginDto loginDto)
    {
        try
        {
            var hash = PasswordHasher.Hash(loginDto.Password);
            var entity = _dbContext.Users.FirstOrDefault(u => u.Email == loginDto.Email && u.PasswordHash == hash);

            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Invalid email or password" };

            if (!entity.IsActive)
                return new ServiceResponse { IsSuccess = false, Message = "Account is inactive" };

            var token = new TokenService().GenerateToken(entity.Id, entity.Name, entity.Role);

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = new LoginResponseDto
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    Email = entity.Email,
                    Role = entity.Role,
                    Avatar = entity.Avatar,
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

            _dbContext.AdminActions.Add(new AdminActionEntity
            {
                AdminId = decisionDto.AdminId,
                ActionType = "approve_user",
                TargetType = "user",
                TargetId = userId,
                Details = $"User '{entity.Email}' approved.",
                CreatedDate = now
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

            _dbContext.AdminActions.Add(new AdminActionEntity
            {
                AdminId = decisionDto.AdminId,
                ActionType = "reject_user",
                TargetType = "user",
                TargetId = userId,
                Details = $"User '{entity.Email}' rejected. Reason: {decisionDto.Reason}",
                CreatedDate = now
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
}
