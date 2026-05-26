using VLM.Domain.Models.AccountApproval;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IAccountApprovalLogic
{
    ServiceResponse GetAllAccountApprovals();
    ServiceResponse GetAccountApprovalsByUser(int userId);
    ServiceResponse GetAccountApprovalById(int id);
    ServiceResponse CreateAccountApproval(AccountApprovalCreateDto dto);
    ServiceResponse DeleteAccountApproval(int id);
}