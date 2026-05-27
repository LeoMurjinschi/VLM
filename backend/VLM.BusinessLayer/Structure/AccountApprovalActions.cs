using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.AccountApproval;
using VLM.Domain.Models.AccountApproval;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class AccountApprovalActions
{
    private readonly VlmDbContext _dbContext;

    public AccountApprovalActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllAccountApprovalsAction()
    {
        try
        {
            var approvals = _dbContext.AccountApprovals
                .OrderByDescending(a => a.DecidedAt)
                .Select(entity => new AccountApprovalInfoDto
                {
                    Id = entity.Id,
                    UserId = entity.UserId,
                    AdminId = entity.AdminId,
                    Decision = entity.Decision,
                    Reason = entity.Reason,
                    DecidedAt = entity.DecidedAt
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = approvals
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving account approvals: {e.Message}"
            };
        }
    }

    public ServiceResponse GetAccountApprovalsByUserAction(int userId)
    {
        try
        {
            var approvals = _dbContext.AccountApprovals
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.DecidedAt)
                .Select(entity => new AccountApprovalInfoDto
                {
                    Id = entity.Id,
                    UserId = entity.UserId,
                    AdminId = entity.AdminId,
                    Decision = entity.Decision,
                    Reason = entity.Reason,
                    DecidedAt = entity.DecidedAt
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = approvals
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving account approvals: {e.Message}"
            };
        }
    }

    public ServiceResponse GetAccountApprovalByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.AccountApprovals.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Account approval not found"
                };

            var dto = new AccountApprovalInfoDto
            {
                Id = entity.Id,
                UserId = entity.UserId,
                AdminId = entity.AdminId,
                Decision = entity.Decision,
                Reason = entity.Reason,
                DecidedAt = entity.DecidedAt
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
                Message = $"Error retrieving account approval: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateAccountApprovalAction(AccountApprovalCreateDto dto)
    {
        try
        {
            var entity = new AccountApprovalEntity
            {
                UserId = dto.UserId,
                AdminId = dto.AdminId,
                Decision = dto.Decision,
                Reason = dto.Reason,
                DecidedAt = DateTime.UtcNow
            };

            _dbContext.AccountApprovals.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Account approval logged successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating account approval: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteAccountApprovalAction(int id)
    {
        try
        {
            var entity = _dbContext.AccountApprovals.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Account approval not found"
                };

            _dbContext.AccountApprovals.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Account approval deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting account approval: {e.Message}"
            };
        }
    }
}
