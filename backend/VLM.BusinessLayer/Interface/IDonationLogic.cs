using VLM.Domain.Models.Donation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IDonationLogic
{
    ServiceResponse GetDonationsByDonorId(int donorId);
    ServiceResponse GetDonationList();
    ServiceResponse GetDonationById(int id);
    ServiceResponse CreateDonation(DonationCreateDto donationCreateDto);
    ServiceResponse UpdateDonation(int id, DonationCreateDto donationCreateDto);
    ServiceResponse DeleteDonation(int id);
}