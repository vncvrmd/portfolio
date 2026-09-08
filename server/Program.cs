using Portfolio.Api.Data;
using Portfolio.Api.Models;

var builder = WebApplication.CreateBuilder(args);

const string ClientOrigin = "ClientOrigin";

var allowedOrigins = new List<string> { "http://localhost:5173" };
var configuredOrigins = builder.Configuration["AllowedOrigins"];
if (!string.IsNullOrWhiteSpace(configuredOrigins))
{
    allowedOrigins.AddRange(configuredOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientOrigin, policy =>
    {
        policy.WithOrigins(allowedOrigins.ToArray())
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

var app = builder.Build();

app.UseCors(ClientOrigin);

app.MapGet("/api/about", () => Results.Ok(new { about = PortfolioData.About }));

app.MapGet("/api/skills", () => Results.Ok(new { skills = PortfolioData.Skills }));

app.MapGet("/api/projects", () => Results.Ok(new { projects = PortfolioData.Projects }));

app.MapGet("/api/projects/{id:int}", (int id) =>
{
    var project = PortfolioData.Projects.FirstOrDefault(p => p.Id == id);
    return project is not null ? Results.Ok(new { project }) : Results.NotFound();
});

app.MapPost("/api/contact", (ContactRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Name) ||
        string.IsNullOrWhiteSpace(request.Email) ||
        string.IsNullOrWhiteSpace(request.Message))
    {
        return Results.BadRequest(new { error = "Please complete all fields." });
    }

    app.Logger.LogInformation("Contact request: {Name} <{Email}> - {Message}", request.Name, request.Email, request.Message);

    return Results.Ok(new { message = "Thank you! Your message has been received." });
});

app.Run();
