using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Core;

public class UserLogic : UserActions, IUserLogic
{
    public ServiceResponse GetUserList()
    {
        return GetUserListAction();
    }

    public ServiceResponse GetUserById(int id)
    {
        return GetUserByIdAction(id);
    }

    public ServiceResponse CreateUser(UserCreateDto userCreateDto)
    {
        return CreateUserAction(userCreateDto);
    }

    public ServiceResponse UpdateUser(int id, UserCreateDto userCreateDto)
    {
        return UpdateUserAction(id, userCreateDto);
    }

    public ServiceResponse UpdateUserInfo(int id, UserInfoUpdateDto dto)
    {
        return UpdateUserInfoAction(id, dto);
    }

    public ServiceResponse ChangePassword(int id, ChangePasswordDto dto)
    {
        return ChangePasswordAction(id, dto);
    }

    public ServiceResponse DeleteUser(int id)
    {
        return DeleteUserAction(id);
    }
}

