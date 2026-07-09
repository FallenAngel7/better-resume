using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BetterResume.Api.Data;
using BetterResume.Api.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BetterResume.Api.Services;

public class JwtService(IConfiguration configuration)
{
    public string GenerateToken(string username)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class AuthService(AppDbContext db, JwtService jwtService)
{
    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await db.AdminUsers
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return null;

        var token = jwtService.GenerateToken(user.Username);
        return new LoginResponse(token, user.Username);
    }
}
