using VLM.BusinessLayer.Core;
using VLM.BusinessLayer.Interface;

namespace VLM.BusinessLayer;

public class BusinessLogic
{
    public BusinessLogic() { }

    public IDonationLogic GetDonationLogic()
    {
        return new DonationLogic();
    }

    public IUserLogic GetUserLogic()
    {
        return new UserLogic();
    }

    public ICommentLogic GetCommentLogic()
    {
        return new CommentLogic();
    }

    public IReservationLogic GetReservationLogic()
    {
        return new ReservationLogic();
    }

    public IReviewLogic GetReviewLogic()
    {
        return new ReviewLogic();
    }
    public INotificationLogic GetNotificationLogic()
    {
        return new NotificationLogic();
    }

    public IMessageLogic GetMessageLogic()
    {
        return new MessageLogic();
    }
}
