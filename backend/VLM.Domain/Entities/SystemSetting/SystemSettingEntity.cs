using VLM.Domain.Entities.User;

namespace VLM.Domain.Entities.SystemSetting;

public class SystemSettingEntity
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? UpdatedById { get; set; }
    public DateTime UpdatedDate { get; set; }
    
    public UserEntity? UpdatedBy { get; set; }
}