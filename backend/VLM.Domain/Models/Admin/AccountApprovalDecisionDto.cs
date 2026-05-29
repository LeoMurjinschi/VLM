namespace VLM.Domain.Models.Admin;

public class AccountApprovalDecisionDto
{
    public int AdminId { get; set; }
    public string? Reason { get; set; }
}