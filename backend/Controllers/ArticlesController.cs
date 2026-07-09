using BetterResume.Api.Data;
using BetterResume.Api.DTOs;
using BetterResume.Api.Models;
using BetterResume.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BetterResume.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<PagedArticlesResponse>> GetPublished(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var query = db.Articles
            .Where(a => a.IsPublished)
            .OrderByDescending(a => a.CreatedAt);

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => a.ToListItemDto())
            .ToListAsync();

        return Ok(new PagedArticlesResponse(items, totalCount, page, pageSize));
    }

    [HttpGet("admin")]
    [Authorize]
    public async Task<ActionResult<List<ArticleDto>>> GetAllForAdmin()
    {
        var items = await db.Articles
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => a.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<ArticleDto>> GetBySlug(string slug)
    {
        var article = await db.Articles
            .FirstOrDefaultAsync(a => a.Slug == slug && a.IsPublished);

        if (article is null) return NotFound();
        return Ok(article.ToDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ArticleDto>> Create([FromBody] CreateArticleRequest request)
    {
        if (await db.Articles.AnyAsync(a => a.Slug == request.Slug))
            return Conflict(new { message = "این اسلاگ قبلاً استفاده شده است." });

        var entity = new Article
        {
            Title = request.Title,
            Slug = request.Slug,
            Summary = request.Summary,
            Content = request.Content,
            IsPublished = request.IsPublished,
            CreatedAt = DateTime.UtcNow
        };

        db.Articles.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBySlug), new { slug = entity.Slug }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ArticleDto>> Update(int id, [FromBody] UpdateArticleRequest request)
    {
        var entity = await db.Articles.FindAsync(id);
        if (entity is null) return NotFound();

        if (await db.Articles.AnyAsync(a => a.Slug == request.Slug && a.Id != id))
            return Conflict(new { message = "این اسلاگ قبلاً استفاده شده است." });

        entity.Title = request.Title;
        entity.Slug = request.Slug;
        entity.Summary = request.Summary;
        entity.Content = request.Content;
        entity.IsPublished = request.IsPublished;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.Articles.FindAsync(id);
        if (entity is null) return NotFound();

        db.Articles.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
