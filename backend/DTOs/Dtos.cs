namespace BetterResume.Api.DTOs;

public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username);

public record PersonalInfoDto(
    int Id,
    string FullName,
    string JobTitle,
    string? AvatarUrl,
    string AboutMeText,
    string Email,
    string Phone,
    string Location);

public record UpdatePersonalInfoRequest(
    string FullName,
    string JobTitle,
    string AboutMeText,
    string Email,
    string Phone,
    string Location);

public record ExperienceDto(
    int Id,
    string JobTitle,
    string CompanyName,
    DateTime StartDate,
    DateTime? EndDate,
    bool IsCurrent,
    string Description,
    int OrderIndex);

public record CreateExperienceRequest(
    string JobTitle,
    string CompanyName,
    DateTime StartDate,
    DateTime? EndDate,
    bool IsCurrent,
    string Description,
    int OrderIndex);

public record UpdateExperienceRequest(
    string JobTitle,
    string CompanyName,
    DateTime StartDate,
    DateTime? EndDate,
    bool IsCurrent,
    string Description,
    int OrderIndex);

public record EducationDto(
    int Id,
    string Degree,
    string Institution,
    DateTime StartDate,
    DateTime? EndDate,
    string Description,
    int OrderIndex);

public record CreateEducationRequest(
    string Degree,
    string Institution,
    DateTime StartDate,
    DateTime? EndDate,
    string Description,
    int OrderIndex);

public record UpdateEducationRequest(
    string Degree,
    string Institution,
    DateTime StartDate,
    DateTime? EndDate,
    string Description,
    int OrderIndex);

public record SkillDto(
    int Id,
    string Name,
    int ProficiencyPercentage,
    int OrderIndex);

public record CreateSkillRequest(
    string Name,
    int ProficiencyPercentage,
    int OrderIndex);

public record UpdateSkillRequest(
    string Name,
    int ProficiencyPercentage,
    int OrderIndex);

public record SocialLinkDto(
    int Id,
    string PlatformName,
    string Url,
    string IconName);

public record CreateSocialLinkRequest(
    string PlatformName,
    string Url,
    string IconName);

public record UpdateSocialLinkRequest(
    string PlatformName,
    string Url,
    string IconName);

public record AvatarUploadResponse(string AvatarUrl);

public record ProfileTitleDto(
    int Id,
    string Title,
    int OrderIndex);

public record CreateProfileTitleRequest(
    string Title,
    int OrderIndex);

public record UpdateProfileTitleRequest(
    string Title,
    int OrderIndex);

public record ArticleListItemDto(
    int Id,
    string Title,
    string Slug,
    string Summary,
    DateTime CreatedAt);

public record ArticleDto(
    int Id,
    string Title,
    string Slug,
    string Summary,
    string Content,
    DateTime CreatedAt,
    bool IsPublished);

public record PagedArticlesResponse(
    List<ArticleListItemDto> Items,
    int TotalCount,
    int Page,
    int PageSize);

public record CreateArticleRequest(
    string Title,
    string Slug,
    string Summary,
    string Content,
    bool IsPublished);

public record UpdateArticleRequest(
    string Title,
    string Slug,
    string Summary,
    string Content,
    bool IsPublished);
