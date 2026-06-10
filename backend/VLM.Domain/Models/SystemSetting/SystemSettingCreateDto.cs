using System.ComponentModel.DataAnnotations;

namespace VLM.Domain.Models.SystemSetting;

public class SystemSettingCreateDto
{
    [Required]
    [StringLength(100, MinimumLength = 1)]
    [RegularExpression(@"^[a-zA-Z0-9_\-\.]+$", ErrorMessage = "Key may only contain letters, numbers, underscores, hyphens, and dots")]
    public string Key { get; set; } = string.Empty;

    [Required]
    [StringLength(10000)]
    public string Value { get; set; } = string.Empty;

    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    public int? UpdatedById { get; set; }
}
