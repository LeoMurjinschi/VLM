using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Milestone;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class MilestoneLogic : MilestoneActions, IMilestoneLogic
{
    public ServiceResponse GetMilestonesByDonorId(int donorId) => GetMilestonesByDonorIdAction(donorId);
    public ServiceResponse GetMilestoneById(int id) => GetMilestoneByIdAction(id);
    public ServiceResponse CreateMilestone(MilestoneCreateDto dto) => CreateMilestoneAction(dto);
    public ServiceResponse UpdateMilestone(int id, MilestoneUpdateDto dto) => UpdateMilestoneAction(id, dto);
    public ServiceResponse DeleteMilestone(int id) => DeleteMilestoneAction(id);
}
