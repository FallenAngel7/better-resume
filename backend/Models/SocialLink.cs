namespace BetterResume.Api.Models;

public class SocialLink
{
    public int Id { get; set; }
    public string PlatformName { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string IconName { get; set; } = string.Empty;
}
