using VLM.Domain.Entities.User;
using System.ComponentModel.DataAnnotations.Schema;
namespace VLM.Domain.Entities.AccountApproval;

public class AccountApprovalEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AdminId { get; set; }
    public string Decision { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public DateTime DecidedAt { get; set; }
    [ForeignKey(nameof(UserId))]
    public UserEntity User { get; set; } = null!;
    [ForeignKey(nameof(AdminId))]
    public UserEntity Admin { get; set; } = null!;
}