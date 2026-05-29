namespace VLM.Domain.Models.SystemSetting;

public class SystemSettingCreateDto
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? UpdatedById { get; set; }
}