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
public class SkillsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<SkillDto>>> GetAll()
    {
        var items = await db.Skills
            .OrderBy(s => s.OrderIndex)
            .Select(s => s.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<SkillDto>> Create([FromBody] CreateSkillRequest request)
    {
        var entity = new Skill
        {
            Name = request.Name,
            ProficiencyPercentage = request.ProficiencyPercentage,
            OrderIndex = request.OrderIndex
        };

        db.Skills.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<SkillDto>> Update(int id, [FromBody] UpdateSkillRequest request)
    {
        var entity = await db.Skills.FindAsync(id);
        if (entity is null) return NotFound();

        entity.Name = request.Name;
        entity.ProficiencyPercentage = request.ProficiencyPercentage;
        entity.OrderIndex = request.OrderIndex;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.Skills.FindAsync(id);
        if (entity is null) return NotFound();

        db.Skills.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
