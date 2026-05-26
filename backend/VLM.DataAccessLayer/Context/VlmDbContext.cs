using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using VLM.Domain.Entities.Category;
using VLM.Domain.Entities.Comment;
using VLM.Domain.Entities.Document;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.Favorite;
using VLM.Domain.Entities.Message;
using VLM.Domain.Entities.Notification;
using VLM.Domain.Entities.Report;
using VLM.Domain.Entities.Reservation;
using VLM.Domain.Entities.Review;
using VLM.Domain.Entities.User;


namespace VLM.DataAccessLayer.Context;

public sealed class VlmDbContext : DbContext
{
    public DbSet<DonationEntity> Donations { get; set; }
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }
    public DbSet<ReservationEntity> Reservations { get; set; }
    public DbSet<ReviewEntity> Reviews { get; set; }
    public DbSet<NotificationEntity> Notifications { get; set; }
    public DbSet<MessageEntity> Messages { get; set; }
    public DbSet<UserProfileEntity> UserProfiles { get; set; }
    public DbSet<UserSettingsEntity> UserSettings { get; set; }
    public DbSet<DonorProfileEntity> DonorProfiles { get; set; }
    public DbSet<ReceiverProfileEntity> ReceiverProfiles { get; set; }
    public DbSet<UserDocumentEntity> UserDocuments { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }
    public DbSet<FavoriteEntity> Favorites { get; set; }
    public DbSet<ReportEntity> Reports { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if (!optionsBuilder.IsConfigured)
    {
         var envPath = @"C:\Users\user\Documents\Universitate\tweb\VLM\.env";
        Env.Load(envPath);
        
       
        
        var host = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
        var port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "5432";
        var user = Environment.GetEnvironmentVariable("DATABASE_USER") ?? "postgres";
        var password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "postgres";
        var database = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "onlinevlm";

        var connectionString = $"Host={host};Port={port};Database={database};Username={user};Password={password};";
        
        optionsBuilder.UseNpgsql(connectionString);
    }
}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

       
        modelBuilder.Entity<DonationEntity>()
            .HasOne(d => d.Donor)
            .WithMany(u => u.Donations)
            .HasForeignKey(d => d.DonorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CommentEntity>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CommentEntity>()
            .HasOne(c => c.Donation)
            .WithMany(d => d.Comments)
            .HasForeignKey(c => c.DonationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CommentEntity>()
            .HasOne(c => c.ParentComment)
            .WithMany(c => c.Replies)
            .HasForeignKey(c => c.ParentCommentId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<ReservationEntity>()
            .HasOne(r => r.Receiver)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReservationEntity>()
            .HasOne(r => r.Donation)
            .WithMany(d => d.Reservations)
            .HasForeignKey(r => r.DonationId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.Donor)
            .WithMany(u => u.DonorReviews)
            .HasForeignKey(r => r.DonorId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.Receiver)
            .WithMany(u => u.ReceiverReviews)
            .HasForeignKey(r => r.ReceiverId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<NotificationEntity>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MessageEntity>()
            .HasOne(m => m.Sender)
            .WithMany(u => u.SentMessages)
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<MessageEntity>()
            .HasOne(m => m.Receiver)
            .WithMany(u => u.ReceivedMessages)
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<UserProfileEntity>()
            .HasOne(p => p.User)
            .WithOne(u => u.Profile)
            .HasForeignKey<UserProfileEntity>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserSettingsEntity>()
            .HasOne(s => s.User)
            .WithOne(u => u.Settings)
            .HasForeignKey<UserSettingsEntity>(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DonorProfileEntity>()
            .HasOne(d => d.User)
            .WithOne(u => u.DonorProfile)
            .HasForeignKey<DonorProfileEntity>(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReceiverProfileEntity>()
            .HasOne(r => r.User)
            .WithOne(u => u.ReceiverProfile)
            .HasForeignKey<ReceiverProfileEntity>(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserDocumentEntity>()
            .HasOne(d => d.User)
            .WithMany(u => u.Documents)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavoriteEntity>()
            .HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavoriteEntity>()
            .HasOne(f => f.Donation)
            .WithMany(d => d.Favorites)
            .HasForeignKey(f => f.DonationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReportEntity>()
            .HasOne(r => r.Reporter)
            .WithMany(u => u.Reports)
            .HasForeignKey(r => r.ReporterId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReportEntity>()
            .HasOne(r => r.Donation)
            .WithMany(d => d.Reports)
            .HasForeignKey(r => r.DonationId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<UserEntity>().HasData(
            new UserEntity
            {
                Id = 1,
                Name = "Alex Donor",
                Email = "alex@vlm.com",
                PasswordHash = "3820be471b75236bf93e1790ea484432",
                Role = "donor",
                Bio = "I love helping my community by donating food.",
                Avatar = null,
                IsActive = true,
                CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new UserEntity
            {
                Id = 2,
                Name = "Maria Receiver",
                Email = "maria@vlm.com",
                PasswordHash = "d003257014b8a10582419f1f84478281",
                Role = "receiver",
                Bio = "Grateful for every donation I receive.",
                Avatar = null,
                IsActive = true,
                CreatedDate = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc)
            },
            new UserEntity
            {
                Id = 3,
                Name = "John Donor",
                Email = "john@vlm.com",
                PasswordHash = "f9a28b5d9ee09b2a5281a579d4f4090a",
                Role = "donor",
                Bio = "Regular donor since 2025.",
                Avatar = null,
                IsActive = true,
                CreatedDate = new DateTime(2026, 1, 3, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<DonationEntity>().HasData(
            new DonationEntity
            {
                Id = 1,
                Title = "Fresh Apples",
                Description = "Freshly picked apples from my garden. Available for pickup.",
                Quantity = 10,
                Unit = "kg",
                DonorId = 1,
                Category = "Fruits",
                PickupLocation = "Str. Principala 12, Cluj-Napoca",
                ExpirationDate = new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc),
                Image = null,
                Status = "Available",
                CreatedDate = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc)
            },
            new DonationEntity
            {
                Id = 2,
                Title = "Homemade Bread",
                Description = "Freshly baked sourdough bread, 3 loaves available.",
                Quantity = 3,
                Unit = "pcs",
                DonorId = 1,
                Category = "Bakery",
                PickupLocation = "Str. Principala 12, Cluj-Napoca",
                ExpirationDate = new DateTime(2026, 1, 14, 0, 0, 0, DateTimeKind.Utc),
                Image = null,
                Status = "Available",
                CreatedDate = new DateTime(2026, 1, 11, 0, 0, 0, DateTimeKind.Utc)
            },
            new DonationEntity
            {
                Id = 3,
                Title = "Milk",
                Description = "Fresh whole milk from local farm. Expires in 3 days.",
                Quantity = 5,
                Unit = "L",
                DonorId = 3,
                Category = "Dairy",
                PickupLocation = "Bd. Eroilor 5, Cluj-Napoca",
                ExpirationDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc),
                Image = null,
                Status = "Reserved",
                CreatedDate = new DateTime(2026, 1, 12, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<CommentEntity>().HasData(
            new CommentEntity
            {
                Id = 1,
                Text = "This looks amazing! I would love to pick this up.",
                UserId = 2,
                DonationId = 1,
                ParentCommentId = null,
                CreatedDate = new DateTime(2026, 1, 10, 12, 0, 0, DateTimeKind.Utc)
            },
            new CommentEntity
            {
                Id = 2,
                Text = "Thank you for your kind words! You can pick it up anytime.",
                UserId = 1,
                DonationId = 1,
                ParentCommentId = 1,
                CreatedDate = new DateTime(2026, 1, 10, 13, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<ReservationEntity>().HasData(
            new ReservationEntity
            {
                Id = 1,
                UserId = 2,
                DonationId = 3,
                QuantityReserved = 5,
                Status = "donor_confirmed",
                Notes = "I will pick up on Friday morning.",
                CreatedDate = new DateTime(2026, 1, 12, 9, 0, 0, DateTimeKind.Utc),
                DonorConfirmedAt = new DateTime(2026, 1, 12, 10, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<ReviewEntity>().HasData(
            new ReviewEntity
            {
                Id = 1,
                DonorId = 1,
                ReceiverId = 2,
                Rating = 5,
                Text = "Alex was very generous and the food was excellent quality!",
                Status = "approved",
                CreatedDate = new DateTime(2026, 1, 15, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<CategoryEntity>().HasData(
            new CategoryEntity { Id = 1, Name = "Fruits", Description = "Fresh fruits and berries", Icon = "🍎", IsActive = true, CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CategoryEntity { Id = 2, Name = "Vegetables", Description = "Fresh vegetables and greens", Icon = "🥦", IsActive = true, CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CategoryEntity { Id = 3, Name = "Bakery", Description = "Bread, pastries and baked goods", Icon = "🍞", IsActive = true, CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CategoryEntity { Id = 4, Name = "Dairy", Description = "Milk, cheese, yogurt and eggs", Icon = "🥛", IsActive = true, CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new CategoryEntity { Id = 5, Name = "Cooked Food", Description = "Prepared and cooked meals", Icon = "🍲", IsActive = true, CreatedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        modelBuilder.Entity<UserProfileEntity>().HasData(
            new UserProfileEntity
            {
                Id = 1,
                UserId = 1,
                Phone = "+40712345678",
                Address = "Str. Principala 12, Cluj-Napoca",
                OrgName = "Alex's Farm",
                Description = "Local farmer donating surplus produce.",
                MissionStatement = "Reduce food waste in our community.",
                OperatingHours = "Mon-Fri 8:00-18:00",
                OperatingRadius = 15,
                AcceptedCategories = "Fruits,Vegetables,Dairy",
                TransportType = "Van",
                HasIndustrialStorage = false,
                Location = "Cluj-Napoca",
                Verified = true
            },
            new UserProfileEntity
            {
                Id = 2,
                UserId = 2,
                Phone = "+40723456789",
                Address = "Bd. Eroilor 10, Cluj-Napoca",
                OrgName = "Maria's Kitchen",
                Description = "Community kitchen serving daily meals.",
                MissionStatement = "No one goes hungry in our neighborhood.",
                OperatingHours = "Daily 7:00-20:00",
                OperatingRadius = 10,
                AcceptedCategories = "Fruits,Vegetables,Bakery,Cooked Food,Dairy",
                TransportType = "Car",
                HasIndustrialStorage = false,
                Location = "Cluj-Napoca",
                Verified = true
            },
            new UserProfileEntity
            {
                Id = 3,
                UserId = 3,
                Phone = "+40734567890",
                Address = "Bd. Eroilor 5, Cluj-Napoca",
                OrgName = "John's Dairy",
                Description = "Small local dairy farm.",
                MissionStatement = "Fresh dairy products for everyone.",
                OperatingHours = "Mon-Sat 6:00-16:00",
                OperatingRadius = 20,
                AcceptedCategories = "Dairy",
                TransportType = "Truck",
                HasIndustrialStorage = true,
                Location = "Cluj-Napoca",
                Verified = false
            }
        );

        modelBuilder.Entity<UserSettingsEntity>().HasData(
            new UserSettingsEntity { Id = 1, UserId = 1, Theme = "light", NotifyPush = true, NotifySms = false, NotifyEmail = true, EmailUpdates = true },
            new UserSettingsEntity { Id = 2, UserId = 2, Theme = "light", NotifyPush = true, NotifySms = true, NotifyEmail = true, EmailUpdates = false },
            new UserSettingsEntity { Id = 3, UserId = 3, Theme = "dark", NotifyPush = false, NotifySms = false, NotifyEmail = true, EmailUpdates = true }
        );

        modelBuilder.Entity<NotificationEntity>().HasData(
            new NotificationEntity
            {
                Id = 1,
                UserId = 1,
                Title = "New Reservation",
                Description = "Maria Receiver reserved 5L of Milk from your donation.",
                Type = "reservation",
                Link = "/reservations/1",
                IsRead = true,
                CreatedDate = new DateTime(2026, 1, 12, 9, 0, 0, DateTimeKind.Utc)
            },
            new NotificationEntity
            {
                Id = 2,
                UserId = 2,
                Title = "Reservation Confirmed",
                Description = "Your reservation for Milk has been confirmed by the donor.",
                Type = "reservation",
                Link = "/reservations/1",
                IsRead = false,
                CreatedDate = new DateTime(2026, 1, 12, 10, 0, 0, DateTimeKind.Utc)
            },
            new NotificationEntity
            {
                Id = 3,
                UserId = 2,
                Title = "New Donation Available",
                Description = "Fresh Apples are available for pickup near you.",
                Type = "donation",
                Link = "/donations/1",
                IsRead = false,
                CreatedDate = new DateTime(2026, 1, 10, 8, 0, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<MessageEntity>().HasData(
            new MessageEntity
            {
                Id = 1,
                SenderId = 2,
                ReceiverId = 1,
                Text = "Hi Alex! Is the milk still available for pickup tomorrow?",
                CreatedDate = new DateTime(2026, 1, 12, 8, 0, 0, DateTimeKind.Utc)
            },
            new MessageEntity
            {
                Id = 2,
                SenderId = 1,
                ReceiverId = 2,
                Text = "Yes, it is! You can come anytime between 8 and 12.",
                CreatedDate = new DateTime(2026, 1, 12, 8, 30, 0, DateTimeKind.Utc)
            },
            new MessageEntity
            {
                Id = 3,
                SenderId = 2,
                ReceiverId = 1,
                Text = "Perfect, I'll be there at 9. Thank you!",
                CreatedDate = new DateTime(2026, 1, 12, 8, 45, 0, DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<FavoriteEntity>().HasData(
            new FavoriteEntity { Id = 1, UserId = 2, DonationId = 1, CreatedDate = new DateTime(2026, 1, 10, 14, 0, 0, DateTimeKind.Utc) },
            new FavoriteEntity { Id = 2, UserId = 2, DonationId = 2, CreatedDate = new DateTime(2026, 1, 11, 10, 0, 0, DateTimeKind.Utc) }
        );

        modelBuilder.Entity<ReportEntity>().HasData(
            new ReportEntity
            {
                Id = 1,
                ReporterId = 2,
                DonationId = 2,
                Reason = "Incorrect information",
                Description = "The quantity listed does not match what was available on pickup.",
                Status = "pending",
                CreatedDate = new DateTime(2026, 1, 13, 10, 0, 0, DateTimeKind.Utc),
                ResolvedDate = null
            }
        );
    }
}
