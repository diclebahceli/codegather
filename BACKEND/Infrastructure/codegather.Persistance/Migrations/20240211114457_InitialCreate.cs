using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace codegather.Persistance.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Competitions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    StartTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Metrics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompileTime = table.Column<float>(type: "REAL", nullable: false),
                    MemoryUsage = table.Column<float>(type: "REAL", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metrics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompetitionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    TestCases = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Submissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    QuestionId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    SubmissionTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Code = table.Column<string>(type: "TEXT", nullable: false),
                    MetricsId = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IsDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Submissions_Metrics_MetricsId",
                        column: x => x.MetricsId,
                        principalTable: "Metrics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Submissions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Submissions_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Competitions",
                columns: new[] { "Id", "CreatedTime", "Description", "EndTime", "IsDeleted", "StartTime", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 11, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(4408), "Eos velit reiciendis. Incidunt facilis assumenda velit. Reiciendis beatae necessitatibus illum qui qui perspiciatis nisi et debitis. Est qui dignissimos ipsam qui perspiciatis. Corrupti ex qui qui doloremque impedit voluptatum omnis iste. Ipsa eos est et numquam quaerat fugit quasi.", new DateTime(2024, 2, 18, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(4834), false, new DateTime(2024, 2, 11, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(4830), "Nulla nihil." },
                    { 2, new DateTime(2024, 2, 11, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(4842), "Neque quisquam enim fugiat labore omnis. Autem doloribus magni aut nihil. Aut vitae quasi consequatur laudantium vel sint alias laborum. Praesentium qui itaque et earum et perferendis iusto. Officiis commodi rem. Omnis aspernatur dolorum sit.", new DateTime(2024, 2, 18, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(5011), false, new DateTime(2024, 2, 11, 14, 44, 57, 392, DateTimeKind.Local).AddTicks(5010), "Deleniti illo." }
                });

            migrationBuilder.InsertData(
                table: "Metrics",
                columns: new[] { "Id", "CompileTime", "CreatedTime", "IsDeleted", "MemoryUsage" },
                values: new object[,]
                {
                    { 1, 0.5f, new DateTime(2024, 2, 11, 14, 44, 57, 395, DateTimeKind.Local).AddTicks(160), false, 0.5f },
                    { 2, 0.5f, new DateTime(2024, 2, 11, 14, 44, 57, 395, DateTimeKind.Local).AddTicks(189), false, 0.5f },
                    { 3, 0.5f, new DateTime(2024, 2, 11, 14, 44, 57, 395, DateTimeKind.Local).AddTicks(192), false, 0.5f },
                    { 4, 0.5f, new DateTime(2024, 2, 11, 14, 44, 57, 395, DateTimeKind.Local).AddTicks(194), false, 0.5f }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedTime", "IsDeleted" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 11, 14, 44, 57, 401, DateTimeKind.Local).AddTicks(3189), false },
                    { 2, new DateTime(2024, 2, 11, 14, 44, 57, 401, DateTimeKind.Local).AddTicks(3207), false }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CompetitionId", "CreatedTime", "Description", "IsDeleted", "TestCases" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 2, 11, 14, 44, 57, 397, DateTimeKind.Local).AddTicks(5743), "Ut esse aut perferendis deserunt nulla commodi. Maiores omnis adipisci placeat quia dolorem et excepturi vel. Sapiente error hic cumque quod vero voluptatem nesciunt. Odit culpa itaque fugit rerum dolor.", false, "Test case 1, Test case 2, Test case 3" },
                    { 2, 1, new DateTime(2024, 2, 11, 14, 44, 57, 397, DateTimeKind.Local).AddTicks(6028), "Culpa ipsum eum. Culpa aut iusto. Dolore itaque et explicabo.", false, "Test case 1, Test case 2, Test case 3" },
                    { 3, 2, new DateTime(2024, 2, 11, 14, 44, 57, 397, DateTimeKind.Local).AddTicks(6127), "Quisquam consectetur at aut consectetur est aspernatur deleniti id dicta. Officia nesciunt unde mollitia qui perferendis. Excepturi quam sit et.", false, "Test case 1, Test case 2, Test case 3" },
                    { 4, 2, new DateTime(2024, 2, 11, 14, 44, 57, 397, DateTimeKind.Local).AddTicks(6215), "Magnam architecto quae dolore reprehenderit. Repellat quam possimus. Ab vitae autem et ea molestias accusamus consequatur velit ducimus.", false, "Test case 1, Test case 2, Test case 3" }
                });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "Code", "CreatedTime", "IsDeleted", "MetricsId", "QuestionId", "SubmissionTime", "UserId" },
                values: new object[,]
                {
                    { 1, "Quis facilis quia esse nihil distinctio maiores voluptates. Voluptates voluptas non. Sunt a odio eligendi aut omnis quia distinctio omnis ut. Asperiores atque eum quis repudiandae doloribus commodi omnis dolorem velit. Voluptas molestias est. Sint ullam maxime sed id et facilis quasi esse.", new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8163), false, 1, 1, new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8435), 1 },
                    { 2, "Quia soluta quam iste voluptatem quos. Adipisci qui doloribus sed possimus nulla perferendis quidem. Neque distinctio mollitia nihil omnis et voluptatem.", new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8439), false, 2, 1, new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8608), 2 },
                    { 3, "Ea nam ullam qui rerum. Rerum reiciendis ut esse similique necessitatibus quo officia cumque quia. Est qui ipsa quae. Quia placeat voluptatem veniam saepe et sint officia nemo. Totam laborum ratione optio. Architecto temporibus tenetur dolores corrupti magni.", new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8611), false, 3, 2, new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8878), 1 },
                    { 4, "Quidem et animi vitae quia aliquam. Sapiente illum ratione et nihil eius cumque ad sint quia. Consequatur exercitationem laborum adipisci consequatur laboriosam neque rerum optio id. Numquam cum eos ut quia quae consequatur repudiandae. Quae voluptate accusamus qui est minima voluptatum.", new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(8881), false, 4, 2, new DateTime(2024, 2, 11, 14, 44, 57, 400, DateTimeKind.Local).AddTicks(9035), 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CompetitionId",
                table: "Questions",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_MetricsId",
                table: "Submissions",
                column: "MetricsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_QuestionId",
                table: "Submissions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_UserId",
                table: "Submissions",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Submissions");

            migrationBuilder.DropTable(
                name: "Metrics");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Competitions");
        }
    }
}
