using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace VLM.BusinessLayer.Structure
{

    public class TokenService
    {
        public TokenService(){}

        public string GenerateToken(int userId, string userName, string role)
        {
            //configuram cheia de criptare folosind cheia secreta din  jwtsettings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
			//definim structura de claims
			var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, role) 
            };
			//cream tokenul
			var token = new JwtSecurityToken(
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(JwtSettings.ExpireMinutes),
                signingCredentials: creds);
			
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}