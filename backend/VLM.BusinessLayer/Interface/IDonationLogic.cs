using VLM.Domain.Models.Donation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IDonationLogic
{
    ServiceResponse GetDonationsByDonorId(int donorId, string? sortBy = null, string? categories = null, string? status = null);
    ServiceResponse GetDonationList();
    ServiceResponse GetDonationById(int id);
    ServiceResponse CreateDonation(DonationCreateDto donationCreateDto);
    ServiceResponse UpdateDonation(int id, DonationCreateDto donationCreateDto);
    ServiceResponse DeleteDonation(int id);
}