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
public class ProfileTitlesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<ProfileTitleDto>>> GetAll()
    {
        var items = await db.ProfileTitles
            .OrderBy(t => t.OrderIndex)
            .Select(t => t.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProfileTitleDto>> Create([FromBody] CreateProfileTitleRequest request)
    {
        var entity = new ProfileTitle
        {
            Title = request.Title,
            OrderIndex = request.OrderIndex
        };

        db.ProfileTitles.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ProfileTitleDto>> Update(int id, [FromBody] UpdateProfileTitleRequest request)
    {
        var entity = await db.ProfileTitles.FindAsync(id);
        if (entity is null) return NotFound();

        entity.Title = request.Title;
        entity.OrderIndex = request.OrderIndex;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.ProfileTitles.FindAsync(id);
        if (entity is null) return NotFound();

        db.ProfileTitles.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
