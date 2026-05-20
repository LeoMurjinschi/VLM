using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Report;
using VLM.Domain.Models.Report;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class ReportActions
{
    private readonly VlmDbContext _dbContext;

    public ReportActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetAllReportsAction()
    {
        try
        {
            var reports = _dbContext.Reports
                .Select(entity => new ReportInfoDto
                {
                    Id = entity.Id,
                    ReporterId = entity.ReporterId,
                    DonationId = entity.DonationId,
                    Reason = entity.Reason,
                    Description = entity.Description,
                    Status = entity.Status,
                    CreatedDate = entity.CreatedDate,
                    ResolvedDate = entity.ResolvedDate
                })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = reports
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving reports: {e.Message}"
            };
        }
    }

    public ServiceResponse GetReportByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Reports.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Report not found"
                };

            var dto = new ReportInfoDto
            {
                Id = entity.Id,
                ReporterId = entity.ReporterId,
                DonationId = entity.DonationId,
                Reason = entity.Reason,
                Description = entity.Description,
                Status = entity.Status,
                CreatedDate = entity.CreatedDate,
                ResolvedDate = entity.ResolvedDate
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
                Message = $"Error retrieving report: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateReportAction(ReportCreateDto reportCreateDto)
    {
        try
        {
            var entity = new ReportEntity
            {
                ReporterId = reportCreateDto.ReporterId,
                DonationId = reportCreateDto.DonationId,
                Reason = reportCreateDto.Reason,
                Description = reportCreateDto.Description,
                Status = "pending",
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Reports.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Report created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating report: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateReportAction(int id, ReportCreateDto reportCreateDto)
    {
        try
        {
            var entity = _dbContext.Reports.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Report not found"
                };

            entity.Reason = reportCreateDto.Reason;
            entity.Description = reportCreateDto.Description;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Report updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating report: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteReportAction(int id)
    {
        try
        {
            var entity = _dbContext.Reports.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Report not found"
                };

            _dbContext.Reports.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Report deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting report: {e.Message}"
            };
        }
    }
}
