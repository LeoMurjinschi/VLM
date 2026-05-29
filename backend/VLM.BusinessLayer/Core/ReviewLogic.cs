using VLM.BusinessLayer.Interface;
using VLM.BusinessLayer.Structure;
using VLM.Domain.Models.Review;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Core;

public class ReviewLogic : ReviewActions, IReviewLogic
{
    public ServiceResponse GetPendingReviews(int receiverId)
    {
        return GetPendingReviewsAction(receiverId);
    }

    public ServiceResponse GetReviewsByDonor(int donorId)
    {
        return GetReviewsByDonorAction(donorId);
    }

    public ServiceResponse GetReviewsByReceiver(int receiverId)
    {
        return GetReviewsByReceiverAction(receiverId);
    }

    public ServiceResponse GetReviewById(int id)
    {
        return GetReviewByIdAction(id);
    }

    public ServiceResponse CreateReview(ReviewCreateDto reviewCreateDto)
    {
        return CreateReviewAction(reviewCreateDto);
    }

    public ServiceResponse UpdateReview(int id, ReviewCreateDto reviewCreateDto)
    {
        return UpdateReviewAction(id, reviewCreateDto);
    }

    public ServiceResponse DeleteReview(int id)
    {
        return DeleteReviewAction(id);
    }
}