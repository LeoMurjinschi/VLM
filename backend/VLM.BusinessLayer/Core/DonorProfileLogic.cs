using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class DonorProfileLogic : DonorProfileActions, IDonorProfileLogic
{
    public ServiceResponse GetDonorProfile(int userId) => GetDonorProfileAction(userId);
    public ServiceResponse UpsertDonorProfile(DonorProfileDto dto) => UpsertDonorProfileAction(dto);
}
