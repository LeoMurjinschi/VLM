namespace VLM.Domain.Models.AccountApproval;

public class AccountApprovalCreateDto
{
    public int UserId { get; set; }
    public int AdminId { get; set; }
    public string Decision { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
}