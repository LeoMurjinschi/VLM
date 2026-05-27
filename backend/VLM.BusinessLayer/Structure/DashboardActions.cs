using Microsoft.EntityFrameworkCore;
using VLM.DataAccessLayer.Context;
using VLM.Domain.Models.Dashboard;
using VLM.Domain.Models.Service;

namespace VLM.BusinessLayer.Structure;

public class DashboardActions
{
    private readonly VlmDbContext _dbContext;

    private static readonly HashSet<string> MealCategories =
        new(StringComparer.OrdinalIgnoreCase) { "Cooked Food", "Bakery" };

    private static readonly HashSet<string> MealUnits =
        new(StringComparer.OrdinalIgnoreCase) { "portions", "plates" };

    public DashboardActions()
    {
        _dbContext = new VlmDbContext();
    }

    public ServiceResponse GetDonorStatsAction(int donorId)
    {
        try
        {
            var donations = _dbContext.Donations
                .Where(d => d.DonorId == donorId)
                .Select(d => new { d.Quantity, d.Unit, d.Category })
                .ToList();

            var totalFoodRescued = donations.Sum(d => d.Quantity);
            var meals = donations
                .Where(d => MealCategories.Contains(d.Category) || MealUnits.Contains(d.Unit))
                .Sum(d => d.Quantity);
            var kgQty = donations
                .Where(d => d.Unit.Equals("kg", StringComparison.OrdinalIgnoreCase))
                .Sum(d => d.Quantity);
            var co2Saved = Math.Round(kgQty * 2.5m, 0);
            var valueDonated = Math.Round(totalFoodRescued * 3.5m, 0);

            var stats = new DonorDashboardStatsDto
            {
                TotalFoodRescued = totalFoodRescued,
                MealsProvided = meals,
                Co2Saved = co2Saved,
                ValueDonated = valueDonated
            };

            return new ServiceResponse { IsSuccess = true, Data = stats };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse GetDonorBarChartAction(int donorId)
    {
        try
        {
            var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);

            var points = _dbContext.Donations
                .Where(d => d.DonorId == donorId && d.CreatedDate >= sixMonthsAgo)
                .GroupBy(d => new { d.CreatedDate.Year, d.CreatedDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Total = g.Sum(d => d.Quantity)
                })
                .OrderBy(x => x.Year).ThenBy(x => x.Month)
                .AsEnumerable()
                .Select(x => new ChartPointDto
                {
                    Name = new DateTime(x.Year, x.Month, 1).ToString("MMM"),
                    Value = x.Total
                })
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = points };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse GetDonorPieChartAction(int donorId)
    {
        try
        {
            var points = _dbContext.Donations
                .Where(d => d.DonorId == donorId)
                .GroupBy(d => d.Category)
                .Select(g => new ChartPointDto
                {
                    Name = g.Key,
                    Value = g.Sum(d => d.Quantity)
                })
                .OrderByDescending(x => x.Value)
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = points };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    public ServiceResponse GetDonorRecentActivityAction(int donorId, int limit = 10)
    {
        try
        {
            var now = DateTime.UtcNow;

            var donationActivity = _dbContext.Donations
                .Where(d => d.DonorId == donorId)
                .OrderByDescending(d => d.CreatedDate)
                .Take(limit)
                .Select(d => new
                {
                    Id = d.Id,
                    Action = "New Stock Added",
                    Detail = $"{d.Quantity} {d.Unit} of \"{d.Title}\" added to inventory.",
                    Type = "info",
                    Date = d.CreatedDate
                })
                .ToList();

            var reservationActivity = _dbContext.Reservations
                .Include(r => r.Receiver)
                .Include(r => r.Donation)
                .Where(r => r.Donation.DonorId == donorId)
                .OrderByDescending(r => r.CreatedDate)
                .Take(limit)
                .Select(r => new
                {
                    Id = r.Id + 100000,
                    Action = r.Status == "completed" ? "Donation Picked Up" : "Donation Reserved",
                    Detail = r.Status == "completed"
                        ? $"{r.Receiver.Name} picked up {r.QuantityReserved} {r.Donation.Unit} of \"{r.Donation.Title}\"."
                        : $"{r.Receiver.Name} reserved {r.QuantityReserved} {r.Donation.Unit} of \"{r.Donation.Title}\".",
                    Type = r.Status == "completed" ? "success" : "success",
                    Date = r.CreatedDate
                })
                .ToList();

            var combined = donationActivity
                .Concat(reservationActivity)
                .OrderByDescending(x => x.Date)
                .Take(limit)
                .Select((x, idx) => new ActivityItemDto
                {
                    Id = x.Id,
                    Action = x.Action,
                    Detail = x.Detail,
                    Type = x.Type,
                    Time = FormatTimeAgo(x.Date, now)
                })
                .ToList();

            return new ServiceResponse { IsSuccess = true, Data = combined };
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = ex.Message };
        }
    }

    private static string FormatTimeAgo(DateTime date, DateTime now)
    {
        var diff = now - date;
        if (diff.TotalMinutes < 1) return "just now";
        if (diff.TotalMinutes < 60) return $"{(int)diff.TotalMinutes} min ago";
        if (diff.TotalHours < 24) return $"{(int)diff.TotalHours} hour{((int)diff.TotalHours == 1 ? "" : "s")} ago";
        if (diff.TotalDays < 7) return $"{(int)diff.TotalDays} day{((int)diff.TotalDays == 1 ? "" : "s")} ago";
        if (diff.TotalDays < 30) return $"{(int)(diff.TotalDays / 7)} week{((int)(diff.TotalDays / 7) == 1 ? "" : "s")} ago";
        return date.ToString("MMM d, yyyy");
    }
}
