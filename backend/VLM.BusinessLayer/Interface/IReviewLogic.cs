using VLM.Domain.Models.Review;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Interface;

public interface IReviewLogic
{
    ServiceResponse GetReviewsByDonor(int donorId);
    ServiceResponse GetReviewById(int id);
    ServiceResponse CreateReview(ReviewCreateDto reviewCreateDto);
    ServiceResponse UpdateReview(int id, ReviewCreateDto reviewCreateDto);
    ServiceResponse DeleteReview(int id);
}
>>>>>>>>> Temporary merge branch 2
