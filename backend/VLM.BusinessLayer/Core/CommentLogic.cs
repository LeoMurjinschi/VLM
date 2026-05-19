using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Comment;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class CommentLogic : CommentActions, ICommentLogic
{
    public ServiceResponse GetCommentsByDonation(int donationId)
    {
        return GetCommentsByDonationAction(donationId);
    }

    public ServiceResponse GetCommentById(int id)
    {
        return GetCommentByIdAction(id);
    }

    public ServiceResponse CreateComment(CommentCreateDto commentCreateDto)
    {
        return CreateCommentAction(commentCreateDto);
    }

    public ServiceResponse UpdateComment(int id, CommentCreateDto commentCreateDto)
    {
        return UpdateCommentAction(id, commentCreateDto);
    }

    public ServiceResponse DeleteComment(int id)
    {
        return DeleteCommentAction(id);
    }
}