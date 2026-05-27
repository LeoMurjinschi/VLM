using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class DashboardLogic : DashboardActions, IDashboardLogic
{
    public ServiceResponse GetDonorStats(int donorId) => GetDonorStatsAction(donorId);
    public ServiceResponse GetDonorBarChart(int donorId) => GetDonorBarChartAction(donorId);
    public ServiceResponse GetDonorPieChart(int donorId) => GetDonorPieChartAction(donorId);
    public ServiceResponse GetDonorRecentActivity(int donorId, int limit = 10) => GetDonorRecentActivityAction(donorId, limit);
}
