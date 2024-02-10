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
                    { 1, new DateTime(2024, 2, 10, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1019), "Totam rem nobis eum enim ab. Velit ab architecto qui sequi sed consequatur quidem. Et quo qui saepe nobis facere ea ut. Dicta blanditiis voluptas veniam temporibus est. Saepe molestias et officia consequatur nostrum repudiandae. Eos excepturi assumenda ipsum repellendus.", new DateTime(2024, 2, 17, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1372), false, new DateTime(2024, 2, 10, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1369), "Et quis." },
                    { 2, new DateTime(2024, 2, 10, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1379), "Natus ratione ipsa error voluptates et ea quidem nisi. Et eum necessitatibus. Dolores expedita dolorum occaecati sunt est soluta vel voluptates. Deserunt quia ea ipsam rerum voluptates possimus quibusdam. Voluptas sit dicta animi nemo laudantium debitis non ea dolores.", new DateTime(2024, 2, 17, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1594), false, new DateTime(2024, 2, 10, 21, 34, 1, 889, DateTimeKind.Local).AddTicks(1592), "Impedit nobis." }
                });

            migrationBuilder.InsertData(
                table: "Metrics",
                columns: new[] { "Id", "CompileTime", "CreatedTime", "IsDeleted", "MemoryUsage" },
                values: new object[,]
                {
                    { 1, 0.5f, new DateTime(2024, 2, 10, 21, 34, 1, 891, DateTimeKind.Local).AddTicks(4486), false, 0.5f },
                    { 2, 0.5f, new DateTime(2024, 2, 10, 21, 34, 1, 891, DateTimeKind.Local).AddTicks(4508), false, 0.5f },
                    { 3, 0.5f, new DateTime(2024, 2, 10, 21, 34, 1, 891, DateTimeKind.Local).AddTicks(4511), false, 0.5f },
                    { 4, 0.5f, new DateTime(2024, 2, 10, 21, 34, 1, 891, DateTimeKind.Local).AddTicks(4513), false, 0.5f }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedTime", "IsDeleted" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 10, 21, 34, 1, 897, DateTimeKind.Local).AddTicks(1056), false },
                    { 2, new DateTime(2024, 2, 10, 21, 34, 1, 897, DateTimeKind.Local).AddTicks(1112), false }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CompetitionId", "CreatedTime", "Description", "IsDeleted", "TestCases" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 2, 10, 21, 34, 1, 893, DateTimeKind.Local).AddTicks(6891), "Suscipit sit quia non quidem. Et consequatur repellat explicabo reiciendis. Adipisci quisquam consequatur voluptas incidunt officia autem natus dolore voluptatem.", false, "Test case 1, Test case 2, Test case 3" },
                    { 2, 1, new DateTime(2024, 2, 10, 21, 34, 1, 893, DateTimeKind.Local).AddTicks(7086), "Suscipit dicta dolorem alias sint non. Qui exercitationem voluptas tempore doloremque veniam quisquam quasi. Dolor dolores maxime rerum. Tempore harum minima aut vel ab sapiente veritatis.", false, "Test case 1, Test case 2, Test case 3" },
                    { 3, 2, new DateTime(2024, 2, 10, 21, 34, 1, 893, DateTimeKind.Local).AddTicks(7240), "Illo et impedit nisi est. Id veritatis et voluptatum debitis qui vel aperiam sapiente maxime. Pariatur omnis repellendus eos possimus fuga a reiciendis rem sint. Cum voluptas iusto sed. Provident delectus velit occaecati in deserunt cupiditate.", false, "Test case 1, Test case 2, Test case 3" },
                    { 4, 2, new DateTime(2024, 2, 10, 21, 34, 1, 893, DateTimeKind.Local).AddTicks(7391), "Et illo nihil corrupti hic deserunt. Architecto fuga ipsa quia excepturi fugit ut at praesentium in. Officia rerum nisi suscipit sint. Vel est eos rem praesentium impedit exercitationem. Voluptate eaque provident nam animi aut.", false, "Test case 1, Test case 2, Test case 3" }
                });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "Code", "CreatedTime", "IsDeleted", "MetricsId", "QuestionId", "SubmissionTime", "UserId" },
                values: new object[,]
                {
                    { 1, "Occaecati aliquam quasi neque vel. Expedita aliquid vitae optio et natus. Dolor qui voluptas alias velit veniam aspernatur sit ut. Quis eaque laborum.", new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8084), false, 1, 1, new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8321), 1 },
                    { 2, "Incidunt dolor impedit aut voluptates qui fuga. Suscipit facilis voluptatem architecto aut reiciendis. Optio consequatur impedit mollitia consequatur consequatur modi cumque sunt. Perferendis eligendi non sit impedit neque eius suscipit. Eius aperiam et dolores ab sapiente porro odit unde.", new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8325), false, 2, 1, new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8474), 2 },
                    { 3, "Omnis doloremque dicta amet fuga minima sit alias reprehenderit. Maxime accusamus id maxime qui. Officiis quia voluptatem aut et harum eveniet. Necessitatibus sequi doloribus ut facilis minus.", new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8477), false, 3, 2, new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8622), 1 },
                    { 4, "Iure consequatur accusamus et delectus aspernatur delectus et corrupti. Tenetur dicta sed ipsum sed sed. Debitis cumque unde.", new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8625), false, 4, 2, new DateTime(2024, 2, 10, 21, 34, 1, 896, DateTimeKind.Local).AddTicks(8753), 2 }
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
