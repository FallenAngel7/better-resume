namespace BetterResume.Api.Models;

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int ProficiencyPercentage { get; set; }
    public int OrderIndex { get; set; }
}
