using VLM.BusinessLayer.Core;
using VLM.BusinessLayer.Interface;

namespace VLM.BusinessLayer;

public class BusinessLogic
{
    public BusinessLogic() { }

    public IDonationLogic GetDonationLogic() => new DonationLogic();

    public IUserLogic GetUserLogic() => new UserLogic();

    public ICommentLogic GetCommentLogic() => new CommentLogic();

    public IReservationLogic GetReservationLogic() => new ReservationLogic();

    public IReviewLogic GetReviewLogic() => new ReviewLogic();

    public INotificationLogic GetNotificationLogic() => new NotificationLogic();

    public IMessageLogic GetMessageLogic() => new MessageLogic();

    public IUserProfileLogic GetUserProfileLogic() => new UserProfileLogic();

    public IUserSettingsLogic GetUserSettingsLogic() => new UserSettingsLogic();

    public ICategoryLogic GetCategoryLogic() => new CategoryLogic();

    public IFavoriteLogic GetFavoriteLogic() => new FavoriteLogic();

    public IReportLogic GetReportLogic() => new ReportLogic();
    public IAdminActionLogic GetAdminActionLogic() => new AdminActionLogic();

    public IAccountApprovalLogic GetAccountApprovalLogic() => new AccountApprovalLogic();

    public IAdminAnnouncementLogic GetAdminAnnouncementLogic() => new AdminAnnouncementLogic();

    public ISystemSettingLogic GetSystemSettingLogic() => new SystemSettingLogic();
}
