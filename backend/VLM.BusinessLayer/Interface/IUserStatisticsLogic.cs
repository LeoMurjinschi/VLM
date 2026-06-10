using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IUserStatisticsLogic
{
    ServiceResponse GetUserStatistics(int userId);
}
