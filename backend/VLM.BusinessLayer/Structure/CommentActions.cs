using VLM.DataAccessLayer.Context;
using VLM.Domain.Entities.Comment;
using VLM.Domain.Models.Comment;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class CommentActions
{
    private readonly VlmDbContext _dbContext;

    public CommentActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetCommentsByDonationAction(int donationId)
    {
        try
        {
            var comments = _dbContext.Comments
                .Where(c => c.DonationId == donationId)
                .Join(_dbContext.Users,
                    c => c.UserId,
                    u => u.Id,
                    (c, u) => new CommentInfoDto
                    {
                        Id = c.Id,
                        Text = c.Text,
                        UserId = c.UserId,
                        UserName = u.Name,
                        UserAvatar = u.Avatar,
                        DonationId = c.DonationId,
                        ParentCommentId = c.ParentCommentId,
                        CreatedDate = c.CreatedDate,
                        UpdatedDate = c.UpdatedDate
                    })
                .ToList();

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = comments
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving comments: {e.Message}"
            };
        }
    }

    public ServiceResponse GetCommentByIdAction(int id)
    {
        try
        {
            var entity = _dbContext.Comments.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Comment not found"
                };

            var dto = new CommentInfoDto
            {
                Id = entity.Id,
                Text = entity.Text,
                UserId = entity.UserId,
                DonationId = entity.DonationId,
                ParentCommentId = entity.ParentCommentId,
                CreatedDate = entity.CreatedDate,
                UpdatedDate = entity.UpdatedDate
            };

            return new ServiceResponse
            {
                IsSuccess = true,
                Data = dto
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error retrieving comment: {e.Message}"
            };
        }
    }

    public ServiceResponse CreateCommentAction(CommentCreateDto commentCreateDto)
    {
        try
        {
            var entity = new CommentEntity
            {
                Text = commentCreateDto.Text,
                UserId = commentCreateDto.UserId,
                DonationId = commentCreateDto.DonationId,
                ParentCommentId = commentCreateDto.ParentCommentId,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Comments.Add(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Comment created successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error creating comment: {e.Message}"
            };
        }
    }

    public ServiceResponse UpdateCommentAction(int id, CommentCreateDto commentCreateDto)
    {
        try
        {
            var entity = _dbContext.Comments.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Comment not found"
                };

            entity.Text = commentCreateDto.Text;
            entity.UpdatedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Comment updated successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error updating comment: {e.Message}"
            };
        }
    }

    public ServiceResponse DeleteCommentAction(int id)
    {
        try
        {
            var entity = _dbContext.Comments.Find(id);

            if (entity == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Comment not found"
                };

            _dbContext.Comments.Remove(entity);
            _dbContext.SaveChanges();

            return new ServiceResponse
            {
                IsSuccess = true,
                Message = "Comment deleted successfully"
            };
        }
        catch (Exception e)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = $"Error deleting comment: {e.Message}"
            };
        }
    }
}
