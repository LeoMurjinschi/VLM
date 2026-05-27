using VLM.Domain.Models.Milestone;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IMilestoneLogic
{
    ServiceResponse GetMilestonesByDonorId(int donorId);
    ServiceResponse GetMilestoneById(int id);
    ServiceResponse CreateMilestone(MilestoneCreateDto dto);
    ServiceResponse UpdateMilestone(int id, MilestoneUpdateDto dto);
    ServiceResponse DeleteMilestone(int id);
}
