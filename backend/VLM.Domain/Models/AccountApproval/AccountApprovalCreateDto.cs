using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.AccountApproval;

public class AccountApprovalCreateDto
{
    [Range(1, int.MaxValue)]
    public int UserId { get; set; }

    [Range(1, int.MaxValue)]
    public int AdminId { get; set; }

    [Required]
    [AllowedValues("approved", "rejected", ErrorMessage = "Decision must be approved or rejected")]
    public string Decision { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Reason { get; set; } = string.Empty;
}
