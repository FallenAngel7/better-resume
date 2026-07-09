using BetterResume.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BetterResume.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<PersonalInfo> PersonalInfos => Set<PersonalInfo>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<Education> Educations => Set<Education>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    public DbSet<ProfileTitle> ProfileTitles => Set<ProfileTitle>();
    public DbSet<Article> Articles => Set<Article>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Experience>()
            .HasIndex(e => e.OrderIndex);

        modelBuilder.Entity<Education>()
            .HasIndex(e => e.OrderIndex);

        modelBuilder.Entity<Skill>()
            .HasIndex(s => s.OrderIndex);

        modelBuilder.Entity<ProfileTitle>()
            .HasIndex(t => t.OrderIndex);

        modelBuilder.Entity<Article>()
            .HasIndex(a => a.Slug)
            .IsUnique();
    }
}
