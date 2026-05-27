using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Document;
using VLM.Domain.Models.Document;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class UserDocumentActions
{
    private readonly VlmDbContext _dbContext;

    public UserDocumentActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetDocumentsByUserAction(int userId)
    {
        try
        {
            var docs = _dbContext.UserDocuments
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.UploadedAt)
                .Select(d => MapToInfo(d))
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = docs };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving documents: {e.Message}" };
        }
    }

    public ServiceResponse UploadDocumentAction(UserDocumentCreateDto dto)
    {
        try
        {
            var entity = new UserDocumentEntity
            {
                UserId = dto.UserId,
                FileName = dto.FileName,
                DocumentType = dto.DocumentType,
                ContentType = dto.ContentType,
                FileData = dto.FileData,
                Status = "pending",
                UploadedAt = DateTime.UtcNow,
            };

            _dbContext.UserDocuments.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Data = MapToInfo(entity) };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error uploading document: {e.Message}" };
        }
    }

    public ServiceResponse DeleteDocumentAction(int id, int userId)
    {
        try
        {
            var entity = _dbContext.UserDocuments.FirstOrDefault(d => d.Id == id && d.UserId == userId);
            if (entity == null)
                return new ServiceResponse { IsSuccess = false, Message = "Document not found" };

            _dbContext.UserDocuments.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse { IsSuccess = true, Message = "Document deleted successfully" };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error deleting document: {e.Message}" };
        }
    }

    private static UserDocumentInfoDto MapToInfo(UserDocumentEntity e) => new()
    {
        Id = e.Id,
        UserId = e.UserId,
        FileName = e.FileName,
        DocumentType = e.DocumentType,
        ContentType = e.ContentType,
        FileData = e.FileData,
        Status = e.Status,
        UploadedAt = e.UploadedAt,
    };
}
