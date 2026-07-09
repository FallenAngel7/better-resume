using BetterResume.Api.DTOs;
using BetterResume.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace BetterResume.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
    {
        var result = await authService.LoginAsync(request);
        if (result is null)
            return Unauthorized(new { message = "نام کاربری یا رمز عبور اشتباه است." });

        return Ok(result);
    }
}
