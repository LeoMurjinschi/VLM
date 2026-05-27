using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.AdminAction;

public class AdminActionEntity
{
    public int Id { get; set; }
    public int AdminId { get; set; }
    public string ActionType { get; set; } = string.Empty;
    public string TargetType { get; set; } = string.Empty;
    public int? TargetId { get; set; }
    public string Details { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    
    public UserEntity Admin { get; set; } = null!;
}