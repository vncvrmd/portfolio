using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public static class PortfolioData
{
    public static readonly About About = new(
        Headline: "IT professional building modern, scalable web applications.",
        Details: new[]
        {
            "Recent graduate with hands-on experience designing full-stack solutions.",
            "Strong foundation in frontend design, backend services, and developer tooling.",
            "I enjoy turning complex problems into clean, user-focused web experiences."
        });

    public static readonly IReadOnlyList<string> Skills = new[]
    {
        "React",
        "TypeScript",
        "ASP.NET Core",
        "C#",
        "Tailwind CSS",
        "REST APIs",
        "Git",
        "Responsive design",
        "Vite",
        "Deployment"
    };

    public static readonly IReadOnlyList<Project> Projects = new[]
    {
        new Project(1, "Personal Portfolio", "A responsive portfolio site built with React, Tailwind CSS, and ASP.NET Core.", "https://your-portfolio.example.com"),
        new Project(2, "Task Manager App", "A task management application with project boards, status updates, and responsive UI.", "https://your-taskapp.example.com"),
        new Project(3, "API Dashboard", "A backend-driven dashboard that displays analytics data, API health, and performance metrics.", "https://your-dashboard.example.com")
    };
}
