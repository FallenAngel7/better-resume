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
public class ExperiencesController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<ExperienceDto>>> GetAll()
    {
        var items = await db.Experiences
            .OrderBy(e => e.OrderIndex)
            .Select(e => e.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ExperienceDto>> Create([FromBody] CreateExperienceRequest request)
    {
        var entity = new Experience
        {
            JobTitle = request.JobTitle,
            CompanyName = request.CompanyName,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsCurrent = request.IsCurrent,
            Description = request.Description,
            OrderIndex = request.OrderIndex
        };

        db.Experiences.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<ExperienceDto>> Update(int id, [FromBody] UpdateExperienceRequest request)
    {
        var entity = await db.Experiences.FindAsync(id);
        if (entity is null) return NotFound();

        entity.JobTitle = request.JobTitle;
        entity.CompanyName = request.CompanyName;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.IsCurrent = request.IsCurrent;
        entity.Description = request.Description;
        entity.OrderIndex = request.OrderIndex;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.Experiences.FindAsync(id);
        if (entity is null) return NotFound();

        db.Experiences.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
