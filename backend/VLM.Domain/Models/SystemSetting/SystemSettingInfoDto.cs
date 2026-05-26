namespace VLM.Domain.Models.SystemSetting;

public class SystemSettingInfoDto
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? UpdatedById { get; set; }
    public DateTime UpdatedDate { get; set; }
}