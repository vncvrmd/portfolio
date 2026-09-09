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
        new Project(1, "Project BASAdent", "Quality Assurance Officer (Present) — overseeing end-to-end QA strategies for a full-stack application (React, Node.js, PostgreSQL). Established unit and component testing (Jest, Vitest, React Testing Library), E2E and HTTP testing (Cypress, Supertest), and managed data/file storage integration using Supabase/NeonDB and Cloudinary/Cloudflare R2.", ""),
        new Project(2, "LMD Dental Clinic", "Business Analyst — designed the website with an appointment booking system.", ""),
        new Project(3, "OBRA", "Full Stack Developer — developed a complete mobile application using Swift.", ""),
        new Project(4, "UST RE-CYCLE", "Front-End Developer — built a mock web application for campus recycling.", "https://ust-re-cycle.vercel.app"),
        new Project(5, "Panorama", "UI/UX Designer — created a web application with a focus on a strong user experience.", ""),
        new Project(6, "Falcon Eye", "Campus safety and lost & found web application for a school community, with account registration and sign-in.", "https://falcon-eye.vercel.app")
    };
}
