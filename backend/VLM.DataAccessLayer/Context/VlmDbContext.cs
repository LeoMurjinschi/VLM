using Microsoft.EntityFrameworkCore;
using VLM.Domain.Entities.Comment;
using VLM.Domain.Entities.Donation;
using VLM.Domain.Entities.Message;
using VLM.Domain.Entities.Notification;
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=onlinevlm;Username=postgres;Password=maranda123;");
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

        modelBuilder.Entity<UserEntity>().HasData(
            new UserEntity
            {
                Id = 1,
                Name = "Alex Donor",
                Email = "alex@vlm.com",
                PasswordHash = "hashed_password_1",
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
                PasswordHash = "hashed_password_2",
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
                PasswordHash = "hashed_password_3",
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
    }
}
