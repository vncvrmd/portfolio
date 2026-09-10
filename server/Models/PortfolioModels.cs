namespace Portfolio.Api.Models;

public record Project(
    int Id,
    string Title,
    string Description,
    string Url,
    string ImageUrl = "",
    IReadOnlyList<string>? TechStack = null);

public record About(string Headline, IReadOnlyList<string> Details);

public record ContactRequest(string? Name, string? Email, string? Message);
