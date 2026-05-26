using VLM.Domain.Models.Document;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IUserDocumentLogic
{
    ServiceResponse GetDocumentsByUser(int userId);
    ServiceResponse UploadDocument(UserDocumentCreateDto dto);
    ServiceResponse DeleteDocument(int id, int userId);
}
