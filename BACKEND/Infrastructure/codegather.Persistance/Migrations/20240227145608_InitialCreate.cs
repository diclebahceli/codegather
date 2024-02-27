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
                    IsCorrect = table.Column<bool>(type: "INTEGER", nullable: false),
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
                    { 1, new DateTime(2024, 2, 27, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8385), "Consequatur aliquid sunt temporibus tenetur omnis voluptatem quasi natus. Dolorum eius inventore rerum soluta rerum provident beatae commodi. Accusantium est ut eos rerum doloremque libero modi aut. Et dolore possimus excepturi et quia. Hic illo voluptatem id exercitationem.", new DateTime(2024, 3, 5, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8796), false, new DateTime(2024, 2, 27, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8792), "Vero repellendus." },
                    { 2, new DateTime(2024, 2, 27, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8804), "Eligendi qui illo optio nulla quis. Aliquam soluta odit aspernatur autem et. Aut aut possimus est labore quidem quas porro id cupiditate. Facilis quidem error laboriosam error eius voluptate. Necessitatibus veniam asperiores ut.", new DateTime(2024, 3, 5, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8999), false, new DateTime(2024, 2, 27, 17, 56, 8, 77, DateTimeKind.Local).AddTicks(8997), "Alias fuga." }
                });

            migrationBuilder.InsertData(
                table: "Metrics",
                columns: new[] { "Id", "CompileTime", "CreatedTime", "IsDeleted", "MemoryUsage" },
                values: new object[,]
                {
                    { 1, 0.5f, new DateTime(2024, 2, 27, 17, 56, 8, 80, DateTimeKind.Local).AddTicks(5478), false, 0.5f },
                    { 2, 0.5f, new DateTime(2024, 2, 27, 17, 56, 8, 80, DateTimeKind.Local).AddTicks(5519), false, 0.5f },
                    { 3, 0.5f, new DateTime(2024, 2, 27, 17, 56, 8, 80, DateTimeKind.Local).AddTicks(5522), false, 0.5f },
                    { 4, 0.5f, new DateTime(2024, 2, 27, 17, 56, 8, 80, DateTimeKind.Local).AddTicks(5524), false, 0.5f }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedTime", "IsDeleted" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(8333), false },
                    { 2, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(8352), false }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CompetitionId", "CreatedTime", "Description", "IsDeleted", "TestCases" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2024, 2, 27, 17, 56, 8, 84, DateTimeKind.Local).AddTicks(1428), "Earum harum molestias voluptates est ad non. Harum qui totam laudantium sit quas eum molestiae rerum. Porro delectus vitae. Quia vitae esse qui rerum. Quia enim id numquam quo dicta reiciendis. Dolorem consequatur illum accusantium et aliquid perspiciatis.", false, "Test case 1, Test case 2, Test case 3" },
                    { 2, 1, new DateTime(2024, 2, 27, 17, 56, 8, 84, DateTimeKind.Local).AddTicks(1837), "Rerum qui modi cum atque aut. Numquam quod magnam enim neque saepe. Consequuntur voluptatem commodi maiores animi reiciendis. Fugiat aut ipsum architecto qui fugiat et.", false, "Test case 1, Test case 2, Test case 3" },
                    { 3, 2, new DateTime(2024, 2, 27, 17, 56, 8, 84, DateTimeKind.Local).AddTicks(1950), "Cupiditate temporibus assumenda minima officia eveniet eum quis. Itaque iure unde rerum est doloremque. Repellendus omnis consectetur magnam eum ratione molestiae est. Corrupti ut voluptas.", false, "Test case 1, Test case 2, Test case 3" },
                    { 4, 2, new DateTime(2024, 2, 27, 17, 56, 8, 84, DateTimeKind.Local).AddTicks(2100), "Suscipit consequatur necessitatibus. Illum enim inventore at voluptatem distinctio. Sit sint odit.", false, "Test case 1, Test case 2, Test case 3" }
                });

            migrationBuilder.InsertData(
                table: "Submissions",
                columns: new[] { "Id", "Code", "CreatedTime", "IsCorrect", "IsDeleted", "MetricsId", "QuestionId", "SubmissionTime", "UserId" },
                values: new object[,]
                {
                    { 1, "Consequatur tenetur eum est veniam corporis labore pariatur voluptatum ut. Quod quo assumenda cumque. Qui laboriosam vero eligendi in. Soluta unde aut recusandae.", new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(1490), true, false, 1, 1, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(1759), 1 },
                    { 2, "Molestiae ut deleniti quibusdam. Unde labore ut culpa quisquam eveniet quibusdam quia delectus. Cum ad voluptas voluptates sit perferendis. Quam possimus repellendus. Accusamus est in ipsum. Aperiam quis quia distinctio in facilis dolores quis error ea.", new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(1763), true, false, 2, 1, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(1913), 2 },
                    { 3, "Voluptatem voluptatum quae delectus veniam illo optio. Eligendi accusantium ab magnam quisquam mollitia sequi quas. Aut perspiciatis eum nihil doloremque. Blanditiis vero rerum. Voluptate perspiciatis veritatis est aut.", new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(1916), true, false, 3, 2, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(2141), 1 },
                    { 4, "Non nihil ex voluptas quam odio porro fugit. Corporis rerum sed rerum fugit est laudantium aperiam impedit exercitationem. Ut non quo minus architecto rerum aspernatur nulla facilis. Consectetur perspiciatis eos. Ab sit et voluptatibus itaque vitae cumque possimus iste.", new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(2145), false, false, 4, 2, new DateTime(2024, 2, 27, 17, 56, 8, 87, DateTimeKind.Local).AddTicks(2335), 2 }
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
