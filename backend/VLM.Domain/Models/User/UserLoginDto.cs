using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.User
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(200)]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 1)]
        public required string Password { get; set; }
    }
}
