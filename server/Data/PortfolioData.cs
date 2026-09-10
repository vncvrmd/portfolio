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
        new Project(1, "Project BASAdent", "Quality Assurance Officer (Present) — overseeing end-to-end QA strategies for a full-stack application (React, Node.js, PostgreSQL). Established unit and component testing (Jest, Vitest, React Testing Library), E2E and HTTP testing (Cypress, Supertest), and managed data/file storage integration using Supabase/NeonDB and Cloudinary/Cloudflare R2.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=Project+BASAdent", TechStack: new[] { "React", "Node.js", "PostgreSQL", "Jest", "Cypress" }),
        new Project(2, "LMD Dental Clinic", "Business Analyst — designed the website with an appointment booking system.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=LMD+Dental+Clinic"),
        new Project(3, "OBRA", "Full Stack Developer — developed a complete mobile application using Swift.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=OBRA", TechStack: new[] { "Swift" }),
        new Project(4, "UST RE-CYCLE", "Front-End Developer — built a mock web application for campus recycling.", "https://ust-re-cycle.vercel.app", ImageUrl: "/images/ust-re-cycle.jpg"),
        new Project(5, "Panorama", "UI/UX Designer — created a web application with a focus on a strong user experience.", "", ImageUrl: "/images/panorama.jpg"),
        new Project(6, "Falcon Eye", "Campus safety and lost & found web application for a school community, with account registration and sign-in.", "https://falcon-eye.vercel.app", ImageUrl: "/images/falcon-eye.jpg", TechStack: new[] { "React" }),
        new Project(7, "POS & Inventory Management System", "Full Stack Developer — built a Laravel POS and inventory management system with admin/employee roles, product and customer management, sales and transaction tracking, and a customer portal with checkout and receipts.", "https://github.com/vncvrmd/FinalProject/", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=POS+%26+Inventory", TechStack: new[] { "Laravel", "MySQL", "Tailwind CSS" })
    };
}
