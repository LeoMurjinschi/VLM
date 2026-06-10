using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class UserStatisticsLogic : UserStatisticsActions, IUserStatisticsLogic
{
    public ServiceResponse GetUserStatistics(int userId) => GetUserStatisticsAction(userId);
}
