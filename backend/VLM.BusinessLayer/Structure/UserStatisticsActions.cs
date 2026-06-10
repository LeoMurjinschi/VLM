using VLM.DataAccessLayer.Context;
using VLM.Domain.Models.Service;
using VLM.Domain.Models.User;

namespace VLM.BusinessLayer.Structure;

public class UserStatisticsActions
{
    private readonly VlmDbContext _dbContext;

    public UserStatisticsActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetUserStatisticsAction(int userId)
    {
        try
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
                return new ServiceResponse { IsSuccess = false, Message = "User not found" };

            var now = DateTime.UtcNow;
            var stats = new UserStatisticsDto { UserId = userId, UserRole = user.Role };

            if (user.Role == "donor")
            {
                var donations = _dbContext.Donations.Where(d => d.DonorId == userId).ToList();
                stats.TotalDonated = donations.Sum(d => d.Quantity);
                stats.TotalDonations = donations.Count;
                stats.ActiveDonations = donations.Count(d => d.Status == "Available" && d.ExpirationDate > now);
                stats.LastActivityDate = donations.Count > 0 ? donations.Max(d => d.CreatedDate) : null;
            }
            else if (user.Role == "receiver")
            {
                var reservations = _dbContext.Reservations.Where(r => r.UserId == userId).ToList();
                stats.TotalReserved = reservations.Sum(r => r.QuantityReserved);
                stats.TotalReservations = reservations.Count;
                stats.ActiveReservations = reservations.Count(r => r.Status == "pending" || r.Status == "donor_confirmed");
                stats.LastActivityDate = reservations.Count > 0 ? reservations.Max(r => r.CreatedDate) : null;
            }
            else if (user.Role == "admin")
            {
                stats.TotalUsers = _dbContext.Users.Count();
                stats.TotalPlatformDonations = _dbContext.Donations.Count();
                stats.LastActivityDate = now;
            }

            return new ServiceResponse { IsSuccess = true, Data = stats };
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Error retrieving statistics: {e.Message}" };
        }
    }
}
