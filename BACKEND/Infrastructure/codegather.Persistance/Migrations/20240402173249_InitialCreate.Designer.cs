﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using codegather.Persistance;

#nullable disable

namespace codegather.Persistance.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240402173249_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.5");

            modelBuilder.Entity("CompetitionUser", b =>
                {
                    b.Property<int>("CompetitionsId")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("JoinedUsersId")
                        .HasColumnType("TEXT");

                    b.HasKey("CompetitionsId", "JoinedUsersId");

                    b.HasIndex("JoinedUsersId");

                    b.ToTable("CompetitionUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("codegather.Domain.Competition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Competitions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(7509),
                            Description = "Laboriosam ipsa et aliquid possimus possimus. Beatae et nam. Aut doloribus omnis impedit eveniet. Ipsam minima vero quia.",
                            EndTime = new DateTime(2024, 4, 9, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(7816),
                            IsDeleted = false,
                            StartTime = new DateTime(2024, 4, 2, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(7813),
                            Title = "Sapiente omnis."
                        },
                        new
                        {
                            Id = 2,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(7824),
                            Description = "Et reprehenderit voluptas cumque voluptate voluptatum. Molestiae ea velit est minima iste explicabo sunt unde. Ut optio dolorum. Aut laboriosam consequuntur et et a odio ducimus quaerat. Vel et nesciunt.",
                            EndTime = new DateTime(2024, 4, 9, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(8003),
                            IsDeleted = false,
                            StartTime = new DateTime(2024, 4, 2, 20, 32, 49, 299, DateTimeKind.Local).AddTicks(8001),
                            Title = "Qui eius."
                        });
                });

            modelBuilder.Entity("codegather.Domain.Metrics", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("CompileTime")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<float>("MemoryUsage")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Metrics");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompileTime = 0.5f,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 302, DateTimeKind.Local).AddTicks(1040),
                            IsDeleted = false,
                            MemoryUsage = 0.5f
                        },
                        new
                        {
                            Id = 2,
                            CompileTime = 0.5f,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 302, DateTimeKind.Local).AddTicks(1067),
                            IsDeleted = false,
                            MemoryUsage = 0.5f
                        },
                        new
                        {
                            Id = 3,
                            CompileTime = 0.5f,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 302, DateTimeKind.Local).AddTicks(1070),
                            IsDeleted = false,
                            MemoryUsage = 0.5f
                        },
                        new
                        {
                            Id = 4,
                            CompileTime = 0.5f,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 302, DateTimeKind.Local).AddTicks(1072),
                            IsDeleted = false,
                            MemoryUsage = 0.5f
                        });
                });

            modelBuilder.Entity("codegather.Domain.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CompetitionId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TestCases")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CompetitionId");

                    b.ToTable("Questions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompetitionId = 1,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 304, DateTimeKind.Local).AddTicks(5530),
                            Description = "Quos aperiam consequatur. Sit quaerat possimus dignissimos ullam. Ipsum debitis qui fuga repellendus totam eveniet fugiat. Provident est autem distinctio assumenda et velit corrupti et quae. Explicabo qui non voluptatem eum non vel dolorem voluptatibus. Molestiae rerum dolores harum.",
                            IsDeleted = false,
                            TestCases = "Test case 1, Test case 2, Test case 3"
                        },
                        new
                        {
                            Id = 2,
                            CompetitionId = 1,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 304, DateTimeKind.Local).AddTicks(5901),
                            Description = "Sint dolor dolorem aliquid. Possimus explicabo qui optio aut ea. Sint repellendus sit sit consequatur iste consequatur officiis. Non dolorem voluptas aliquid animi minima et maxime placeat veritatis.",
                            IsDeleted = false,
                            TestCases = "Test case 1, Test case 2, Test case 3"
                        },
                        new
                        {
                            Id = 3,
                            CompetitionId = 2,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 304, DateTimeKind.Local).AddTicks(6019),
                            Description = "Quasi quas ea omnis velit ullam qui. Sed quasi autem officiis corrupti laboriosam. Ipsa iure ipsa debitis et aut consequatur nihil iste voluptas. Quibusdam placeat dolor corporis.",
                            IsDeleted = false,
                            TestCases = "Test case 1, Test case 2, Test case 3"
                        },
                        new
                        {
                            Id = 4,
                            CompetitionId = 2,
                            CreatedTime = new DateTime(2024, 4, 2, 20, 32, 49, 304, DateTimeKind.Local).AddTicks(6189),
                            Description = "Eos doloremque dolore dolor sit laudantium. Veniam harum sequi suscipit inventore aut illum. Et voluptas aut totam. Molestias consequatur laborum numquam accusamus non voluptas.",
                            IsDeleted = false,
                            TestCases = "Test case 1, Test case 2, Test case 3"
                        });
                });

            modelBuilder.Entity("codegather.Domain.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("codegather.Domain.Submission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MetricsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("QuestionId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("SubmissionTime")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MetricsId")
                        .IsUnique();

                    b.HasIndex("QuestionId");

                    b.HasIndex("UserId");

                    b.ToTable("Submissions");
                });

            modelBuilder.Entity("codegather.Domain.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("RefreshTokenExpiryTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("CompetitionUser", b =>
                {
                    b.HasOne("codegather.Domain.Competition", null)
                        .WithMany()
                        .HasForeignKey("CompetitionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("codegather.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("JoinedUsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("codegather.Domain.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("codegather.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("codegather.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("codegather.Domain.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("codegather.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("codegather.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("codegather.Domain.Question", b =>
                {
                    b.HasOne("codegather.Domain.Competition", "Competition")
                        .WithMany("Questions")
                        .HasForeignKey("CompetitionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Competition");
                });

            modelBuilder.Entity("codegather.Domain.Submission", b =>
                {
                    b.HasOne("codegather.Domain.Metrics", "Metrics")
                        .WithOne()
                        .HasForeignKey("codegather.Domain.Submission", "MetricsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("codegather.Domain.Question", "Question")
                        .WithMany("Submissions")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("codegather.Domain.User", "User")
                        .WithMany("Submissions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Metrics");

                    b.Navigation("Question");

                    b.Navigation("User");
                });

            modelBuilder.Entity("codegather.Domain.Competition", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("codegather.Domain.Question", b =>
                {
                    b.Navigation("Submissions");
                });

            modelBuilder.Entity("codegather.Domain.User", b =>
                {
                    b.Navigation("Submissions");
                });
#pragma warning restore 612, 618
        }
    }
}
