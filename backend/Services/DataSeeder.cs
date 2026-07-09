using BetterResume.Api.Data;
using BetterResume.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BetterResume.Api.Services;

public class DataSeeder(AppDbContext db, ILogger<DataSeeder> logger)
{
    public async Task SeedAsync()
    {
        await db.Database.MigrateAsync();

        if (!await db.AdminUsers.AnyAsync())
        {
            db.AdminUsers.Add(new AdminUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123")
            });
            logger.LogInformation("Seeded default admin user.");
        }

        if (!await db.PersonalInfos.AnyAsync())
        {
            db.PersonalInfos.Add(new PersonalInfo
            {
                FullName = "علی رضایی",
                JobTitle = "توسعه‌دهنده فول‌استک",
                AvatarUrl = null,
                AboutMeText = "من یک توسعه‌دهنده نرم‌افزار با بیش از ۵ سال تجربه در ساخت اپلیکیشن‌های وب مدرن هستم. به طراحی رابط کاربری تمیز، معماری مقیاس‌پذیر و کدنویسی تمیز علاقه‌مندم.",
                Email = "ali.rezaei@example.com",
                Phone = "۰۹۱۲۳۴۵۶۷۸۹",
                Location = "تهران، ایران"
            });
            logger.LogInformation("Seeded personal info.");
        }

        if (!await db.Experiences.AnyAsync())
        {
            db.Experiences.AddRange(
                new Experience
                {
                    JobTitle = "توسعه‌دهنده ارشد فول‌استک",
                    CompanyName = "شرکت فناوری نوین",
                    StartDate = new DateTime(2021, 3, 1),
                    EndDate = null,
                    IsCurrent = true,
                    Description = "طراحی و توسعه میکروسرویس‌ها با .NET و React. رهبری تیم ۴ نفره توسعه.",
                    OrderIndex = 0
                },
                new Experience
                {
                    JobTitle = "توسعه‌دهنده وب",
                    CompanyName = "استارتاپ دیجیتال",
                    StartDate = new DateTime(2018, 6, 1),
                    EndDate = new DateTime(2021, 2, 28),
                    IsCurrent = false,
                    Description = "توسعه اپلیکیشن‌های SPA با React و Node.js. پیاده‌سازی REST API.",
                    OrderIndex = 1
                });
            logger.LogInformation("Seeded experiences.");
        }

        if (!await db.Educations.AnyAsync())
        {
            db.Educations.Add(new Education
            {
                Degree = "کارشناسی مهندسی نرم‌افزار",
                Institution = "دانشگاه تهران",
                StartDate = new DateTime(2014, 9, 1),
                EndDate = new DateTime(2018, 6, 1),
                Description = "معدل: ۱۷.۵ — پروژه پایانی: سیستم مدیریت کتابخانه",
                OrderIndex = 0
            });
            logger.LogInformation("Seeded educations.");
        }

        if (!await db.Skills.AnyAsync())
        {
            db.Skills.AddRange(
                new Skill { Name = "C# / .NET", ProficiencyPercentage = 90, OrderIndex = 0 },
                new Skill { Name = "React / TypeScript", ProficiencyPercentage = 85, OrderIndex = 1 },
                new Skill { Name = "SQL Server", ProficiencyPercentage = 80, OrderIndex = 2 },
                new Skill { Name = "Docker / CI/CD", ProficiencyPercentage = 75, OrderIndex = 3 },
                new Skill { Name = "طراحی UI/UX", ProficiencyPercentage = 70, OrderIndex = 4 });
            logger.LogInformation("Seeded skills.");
        }

        if (!await db.SocialLinks.AnyAsync())
        {
            db.SocialLinks.AddRange(
                new SocialLink { PlatformName = "گیت‌هاب", Url = "https://github.com", IconName = "github" },
                new SocialLink { PlatformName = "لینکدین", Url = "https://linkedin.com", IconName = "linkedin" },
                new SocialLink { PlatformName = "تلگرام", Url = "https://t.me", IconName = "telegram" });
            logger.LogInformation("Seeded social links.");
        }

        if (!await db.ProfileTitles.AnyAsync())
        {
            db.ProfileTitles.AddRange(
                new ProfileTitle { Title = "من توسعه‌دهنده هستم", OrderIndex = 0 },
                new ProfileTitle { Title = "من طراح هستم", OrderIndex = 1 },
                new ProfileTitle { Title = "من برنامه‌نویس هستم", OrderIndex = 2 });
            logger.LogInformation("Seeded profile titles.");
        }

        if (!await db.Articles.AnyAsync())
        {
            db.Articles.AddRange(
                new Article
                {
                    Title = "سفر من به دنیای برنامه‌نویسی",
                    Slug = "my-journey-into-programming",
                    Summary = "داستانی از علاقه، یادگیری و رشد در دنیای توسعه نرم‌افزار.",
                    Content = "## آغاز راه\n\nهمه چیز از یک سوال ساده شروع شد: **چطور یک وب‌سایت بسازم؟**\n\nاین اولین قدم من به دنیای برنامه‌نویسی بود. از HTML و CSS شروع کردم و کم‌کم به سمت بک‌اند و معماری نرم‌افزار حرکت کردم.\n\n### درس‌هایی که گرفتم\n\n- صبر و پشتکار مهم‌تر از استعداد اولیه است\n- پروژه عملی بهترین معلم است\n- جامعه توسعه‌دهندگان می‌تواند مسیر را کوتاه‌تر کند",
                    CreatedAt = DateTime.UtcNow.AddDays(-14),
                    IsPublished = true
                },
                new Article
                {
                    Title = "معماری تمیز در پروژه‌های کوچک",
                    Slug = "clean-architecture-in-small-projects",
                    Summary = "آیا معماری تمیز فقط برای پروژه‌های بزرگ است؟ نگاهی عملی به ساختاردهی کد.",
                    Content = "## چرا معماری مهم است؟\n\nحتی در پروژه‌های کوچک، جداسازی مسئولیت‌ها باعث می‌شود کد قابل نگهداری بماند.\n\n```csharp\npublic interface IArticleRepository\n{\n    Task<Article?> GetBySlugAsync(string slug);\n}\n```\n\nاین الگوها در ابتدا ممکن است اضافی به نظر برسند، اما در بلندمدت زمان توسعه را کاهش می‌دهند.",
                    CreatedAt = DateTime.UtcNow.AddDays(-7),
                    IsPublished = true
                });
            logger.LogInformation("Seeded articles.");
        }

        await db.SaveChangesAsync();
    }
}
