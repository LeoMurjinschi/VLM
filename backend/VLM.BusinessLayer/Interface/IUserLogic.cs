using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IUserLogic
{
    ServiceResponse GetUserList();
    ServiceResponse GetUserById(int id);
    ServiceResponse CreateUser(UserCreateDto userCreateDto);
    ServiceResponse UpdateUser(int id, UserCreateDto userCreateDto);
    ServiceResponse UpdateUserInfo(int id, UserInfoUpdateDto dto);
    ServiceResponse ChangePassword(int id, ChangePasswordDto dto);
    ServiceResponse DeleteUser(int id);
    ServiceResponse DeleteUser(int id);
    ServiceResponse GetPendingUsers();
    ServiceResponse ApproveUser(int userId, AccountApprovalDecisionDto decisionDto);
    ServiceResponse RejectUser(int userId, AccountApprovalDecisionDto decisionDto);
}

