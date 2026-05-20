using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Interface;

public interface IUserLogic
{
    ServiceResponse GetUserList();
    ServiceResponse GetUserById(int id);
    ServiceResponse CreateUser(UserCreateDto userCreateDto);
    ServiceResponse UpdateUser(int id, UserCreateDto userCreateDto);
    ServiceResponse DeleteUser(int id);
}

