using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Milestone;
using VLM.Domain.Models.Milestone;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class MilestoneActions
{
    private readonly VlmDbContext _dbContext;

    public MilestoneActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetMilestonesByDonorIdAction(int donorId)
    {
        try
        {
            var milestones = _dbContext.Milestones
                .Where(m => m.DonorId == donorId)
                .OrderByDescending(m => m.CreatedDate)
                .Select(m => new MilestoneInfoDto
                {
                    Id = m.Id,
                    DonorId = m.DonorId,
                    Title = m.Title,
                    Reward = m.Reward,
                    CurrentAmount = m.CurrentAmount,
                    TargetAmount = m.TargetAmount,
                    CreatedDate = m.CreatedDate
                })
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = milestones };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse GetMilestoneByIdAction(int id)
    {
        try
        {
            var milestone = _dbContext.Milestones
                .Where(m => m.Id == id)
                .Select(m => new MilestoneInfoDto
                {
                    Id = m.Id,
                    DonorId = m.DonorId,
                    Title = m.Title,
                    Reward = m.Reward,
                    CurrentAmount = m.CurrentAmount,
                    TargetAmount = m.TargetAmount,
                    CreatedDate = m.CreatedDate
                })
                .FirstOrDefault();

            if (milestone == null)
                return new ServiceResponse { IsSuccess = false, Message = "Milestone not found." };

            return new ServiceResponse { IsSuccess = true, Data = milestone };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse CreateMilestoneAction(MilestoneCreateDto dto)
    {
        try
        {
            var entity = new MilestoneEntity
            {
                DonorId = dto.DonorId,
                Title = dto.Title,
                Reward = dto.Reward,
                CurrentAmount = dto.CurrentAmount,
                TargetAmount = dto.TargetAmount,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Milestones.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Milestone created.", Data = entity.Id };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse UpdateMilestoneAction(int id, MilestoneUpdateDto dto)
    {
        try
        {
            var entity = _dbContext.Milestones.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Milestone not found." };

            entity.Title = dto.Title;
            entity.Reward = dto.Reward;
            entity.CurrentAmount = dto.CurrentAmount;
            entity.TargetAmount = dto.TargetAmount;

            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Milestone updated." };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse DeleteMilestoneAction(int id)
    {
        try
        {
            var entity = _dbContext.Milestones.Find(id);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Milestone not found." };

            _dbContext.Milestones.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Milestone deleted." };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }
}
