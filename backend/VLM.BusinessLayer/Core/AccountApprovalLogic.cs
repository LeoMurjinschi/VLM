using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.AccountApproval;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class AccountApprovalLogic : AccountApprovalActions, IAccountApprovalLogic
{
    public ServiceResponse GetAllAccountApprovals()
    {
        return GetAllAccountApprovalsAction();
    }

    public ServiceResponse GetAccountApprovalsByUser(int userId)
    {
        return GetAccountApprovalsByUserAction(userId);
    }

    public ServiceResponse GetAccountApprovalById(int id)
    {
        return GetAccountApprovalByIdAction(id);
    }

    public ServiceResponse CreateAccountApproval(AccountApprovalCreateDto dto)
    {
        return CreateAccountApprovalAction(dto);
    }

    public ServiceResponse DeleteAccountApproval(int id)
    {
        return DeleteAccountApprovalAction(id);
    }
}