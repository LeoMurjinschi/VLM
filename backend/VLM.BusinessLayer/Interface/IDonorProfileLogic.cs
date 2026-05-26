using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IDonorProfileLogic
{
    ServiceResponse GetDonorProfile(int userId);
    ServiceResponse UpsertDonorProfile(DonorProfileDto dto);
}
