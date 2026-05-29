using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IDashboardLogic
{
    ServiceResponse GetDonorStats(int donorId);
    ServiceResponse GetDonorBarChart(int donorId);
    ServiceResponse GetDonorPieChart(int donorId);
    ServiceResponse GetDonorRecentActivity(int donorId, int limit = 10);
}
