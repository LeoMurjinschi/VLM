namespace VLM.Domain.Entities.User;

public class AdminProfileEntity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AdminLevel { get; set; } = 1; // 1 = moderator, 2 = admin, 3 = super-admin
    public string DepartmentName { get; set; } = string.Empty;
    public string PermissionsJson { get; set; } = "{}";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    public UserEntity User { get; set; } = null!;
}
