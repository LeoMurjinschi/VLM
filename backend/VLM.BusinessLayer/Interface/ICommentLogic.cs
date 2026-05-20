using VLM.Domain.Models.Comment;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface ICommentLogic
{
    ServiceResponse GetCommentsByDonation(int donationId);
    ServiceResponse GetCommentById(int id);
    ServiceResponse CreateComment(CommentCreateDto commentCreateDto);
    ServiceResponse UpdateComment(int id, CommentCreateDto commentCreateDto);
    ServiceResponse DeleteComment(int id);
}
>>>>>>>>> Temporary merge branch 2
