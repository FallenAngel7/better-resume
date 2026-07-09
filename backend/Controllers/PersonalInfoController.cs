using BetterResume.Api.Data;
using BetterResume.Api.DTOs;
using BetterResume.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BetterResume.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonalInfoController(AppDbContext db, IWebHostEnvironment env) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<PersonalInfoDto>> Get()
    {
        var info = await db.PersonalInfos.FirstOrDefaultAsync();
        if (info is null) return NotFound();
        return Ok(info.ToDto());
    }

    [HttpPut]
    [Authorize]
    public async Task<ActionResult<PersonalInfoDto>> Update([FromBody] UpdatePersonalInfoRequest request)
    {
        var info = await db.PersonalInfos.FirstOrDefaultAsync();
        if (info is null) return NotFound();

        info.FullName = request.FullName;
        info.JobTitle = request.JobTitle;
        info.AboutMeText = request.AboutMeText;
        info.Email = request.Email;
        info.Phone = request.Phone;
        info.Location = request.Location;

        await db.SaveChangesAsync();
        return Ok(info.ToDto());
    }

    [HttpPost("avatar")]
    [Authorize]
    public async Task<ActionResult<AvatarUploadResponse>> UploadAvatar(IFormFile file)
    {
        if (file.Length == 0)
            return BadRequest(new { message = "فایل خالی است." });

        var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowed.Contains(ext))
            return BadRequest(new { message = "فرمت فایل مجاز نیست." });

        var uploadsDir = Path.Combine(env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot"), "uploads");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"avatar_{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        var info = await db.PersonalInfos.FirstOrDefaultAsync();
        if (info is null) return NotFound();

        info.AvatarUrl = $"/uploads/{fileName}";
        await db.SaveChangesAsync();

        return Ok(new AvatarUploadResponse(info.AvatarUrl));
    }
}
