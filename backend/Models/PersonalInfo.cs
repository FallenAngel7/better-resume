namespace BetterResume.Api.Models;

public class PersonalInfo
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string AboutMeText { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
