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
public class EducationsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<EducationDto>>> GetAll()
    {
        var items = await db.Educations
            .OrderBy(e => e.OrderIndex)
            .Select(e => e.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<EducationDto>> Create([FromBody] CreateEducationRequest request)
    {
        var entity = new Education
        {
            Degree = request.Degree,
            Institution = request.Institution,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Description = request.Description,
            OrderIndex = request.OrderIndex
        };

        db.Educations.Add(entity);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = entity.Id }, entity.ToDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<ActionResult<EducationDto>> Update(int id, [FromBody] UpdateEducationRequest request)
    {
        var entity = await db.Educations.FindAsync(id);
        if (entity is null) return NotFound();

        entity.Degree = request.Degree;
        entity.Institution = request.Institution;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.Description = request.Description;
        entity.OrderIndex = request.OrderIndex;

        await db.SaveChangesAsync();
        return Ok(entity.ToDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await db.Educations.FindAsync(id);
        if (entity is null) return NotFound();

        db.Educations.Remove(entity);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
