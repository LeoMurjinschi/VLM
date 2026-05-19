using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Donation;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class DonationLogic : DonationActions, IDonationLogic
{
    public ServiceResponse GetDonationList()
    {
        return GetDonationListAction();
    }

    public ServiceResponse GetDonationById(int id)
    {
        return GetDonationByIdAction(id);
    }

    public ServiceResponse CreateDonation(DonationCreateDto donationCreateDto)
    {
        return CreateDonationAction(donationCreateDto);
    }

    public ServiceResponse UpdateDonation(int id, DonationCreateDto donationCreateDto)
    {
        return UpdateDonationAction(id, donationCreateDto);
    }

    public ServiceResponse DeleteDonation(int id)
    {
        return DeleteDonationAction(id);
    }
}
