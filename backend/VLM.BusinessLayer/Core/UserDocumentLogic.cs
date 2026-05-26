using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Document;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class UserDocumentLogic : UserDocumentActions, IUserDocumentLogic
{
    public ServiceResponse GetDocumentsByUser(int userId) => GetDocumentsByUserAction(userId);
    public ServiceResponse UploadDocument(UserDocumentCreateDto dto) => UploadDocumentAction(dto);
    public ServiceResponse DeleteDocument(int id, int userId) => DeleteDocumentAction(id, userId);
}
