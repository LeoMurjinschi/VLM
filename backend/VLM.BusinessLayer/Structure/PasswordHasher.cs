using System.Security.Cryptography;
using System.Text;

namespace VLM.BusinessLayer.Structure;

public static class PasswordHasher
{
    private const string PasswordSuffix = "tw_curs2026";

    public static string Hash(string password)
    {
        var input = password + PasswordSuffix;
        var bytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = MD5.HashData(bytes);

        var sb = new StringBuilder();
        foreach (var b in hashBytes)
            sb.Append(b.ToString("x2"));

        return sb.ToString();
    }
}
