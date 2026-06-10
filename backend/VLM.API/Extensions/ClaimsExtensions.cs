using System.Security.Claims;

namespace VLM.API.Extensions;

public static class ClaimsExtensions
{
    public static int? GetUserId(this ClaimsPrincipal user)
    {
        var value = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.TryParse(value, out var id) ? id : null;
    }

    public static bool IsAdmin(this ClaimsPrincipal user)
        => user.IsInRole("admin");
}
