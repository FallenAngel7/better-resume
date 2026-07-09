using BetterResume.Api.Data;
using BetterResume.Api.DTOs;
using BetterResume.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BetterResume.Api.Services;

public static class MappingExtensions
{
    public static PersonalInfoDto ToDto(this PersonalInfo p) => new(
        p.Id, p.FullName, p.JobTitle, p.AvatarUrl, p.AboutMeText, p.Email, p.Phone, p.Location);

    public static ExperienceDto ToDto(this Experience e) => new(
        e.Id, e.JobTitle, e.CompanyName, e.StartDate, e.EndDate, e.IsCurrent, e.Description, e.OrderIndex);

    public static EducationDto ToDto(this Education e) => new(
        e.Id, e.Degree, e.Institution, e.StartDate, e.EndDate, e.Description, e.OrderIndex);

    public static SkillDto ToDto(this Skill s) => new(
        s.Id, s.Name, s.ProficiencyPercentage, s.OrderIndex);

    public static SocialLinkDto ToDto(this SocialLink s) => new(
        s.Id, s.PlatformName, s.Url, s.IconName);

    public static ProfileTitleDto ToDto(this ProfileTitle t) => new(
        t.Id, t.Title, t.OrderIndex);

    public static ArticleListItemDto ToListItemDto(this Article a) => new(
        a.Id, a.Title, a.Slug, a.Summary, a.CreatedAt);

    public static ArticleDto ToDto(this Article a) => new(
        a.Id, a.Title, a.Slug, a.Summary, a.Content, a.CreatedAt, a.IsPublished);
}
