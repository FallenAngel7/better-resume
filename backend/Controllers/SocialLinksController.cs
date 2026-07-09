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
public class SocialLinksController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<SocialLinkDto>>> GetAll()
    {
        var items = await db.SocialLinks
            .Select(s => s.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SocialLinkDto>> Create([FromBody] CreateSocialLinkRequest request)
    {
        var entity = new SocialLink
        {
            PlatformName = request.PlatformName,
            Url = request.Url,
            IconName = request.IconName
        };

        db.SocialLinks.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<SocialLinkDto>> Update(int id, [FromBody] UpdateSocialLinkRequest request)
    {
        var entity = await db.SocialLinks.FindAsync(id);
        if (entity is null) return NotFound();

        entity.PlatformName = request.PlatformName;
        entity.Url = request.Url;
        entity.IconName = request.IconName;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.SocialLinks.FindAsync(id);
        if (entity is null) return NotFound();

        db.SocialLinks.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
