using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public static class PortfolioData
{
    public static readonly About About = new(
        Headline: "Software developer building web apps with Angular, React, TypeScript, and Python.",
        Details: new[]
        {
            "Contractor at Kidlat CivicLabs, working on a government agency's website and ALICE, an AI learning assistant for students.",
            "QA officer and developer on a freelance management system for a multi-branch dental clinic.",
            "Former Salesforce developer intern at Accenture, and a Cum Laude IT graduate from the University of Santo Tomas."
        });

    public static readonly IReadOnlyList<string> Skills = new[]
    {
        "TypeScript",
        "Angular",
        "React",
        "Python",
        "FastAPI",
        "Node.js",
        "PostgreSQL",
        "Laravel",
        "Kotlin",
        "Salesforce Apex",
        "Cypress",
        "Claude Code"
    };

    public static readonly IReadOnlyList<Project> Projects = new[]
    {
        new Project(8, "Government Agency Website", "Front-End Developer (Kidlat CivicLabs) — built a government agency's public website as the only front-end developer. Made the main menu, mobile menu, and site search work with a keyboard, added dark mode, and set the site up to run on the agency's own servers without outside services.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=Government+Website", TechStack: new[] { "Angular", "TypeScript", "SCSS", "Vitest" }),
        new Project(9, "ALICE", "Developer and Consultant (Kidlat CivicLabs) — an AI learning assistant that students chat with on Facebook Messenger. Built the admin cost dashboard that shows how much the chatbot costs to run and how many replies it sends, fixed a bug that made the total cost come out wrong, and review teammates' code across the platform.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=ALICE", TechStack: new[] { "Python", "FastAPI", "React", "TypeScript", "PostgreSQL" }),
        new Project(1, "Project BASAdent", "QA Officer and Developer (Freelance) — a management system for a multi-branch dental clinic, covering appointments, patient records, dental charts, billing, and inventory. I plan and run testing, filed 120 bug reports and improvement tickets rated by severity, did a security review before launch, and fixed over 10 bugs.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=Project+BASAdent", TechStack: new[] { "React", "Node.js", "PostgreSQL", "Supabase", "Jest", "Vitest", "Cypress", "Supertest" }),
        new Project(7, "POS & Inventory Management System", "Full Stack Developer — built a Laravel POS and inventory system with admin and employee roles, product and customer management, sales and transaction tracking, and a customer portal with checkout and receipts.", "https://github.com/vncvrmd/FinalProject/", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=POS+%26+Inventory", TechStack: new[] { "PHP", "Laravel", "MySQL", "Tailwind CSS", "Docker" }),
        new Project(3, "OBRA", "Android Developer — an art-sharing app with comments, likes, and search. Reorganized the code, added search, and fixed security bugs, including one that let users skip the login screen.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=OBRA", TechStack: new[] { "Kotlin", "Firebase" }),
        new Project(6, "Falcon Eye", "QA Tester — a school safety and incident reporting app with lost and found. Wrote and ran 500+ manual test cases.", "https://falcon-eye.vercel.app", ImageUrl: "/images/falcon-eye.jpg", TechStack: new[] { "React" }),
        new Project(4, "UST RE-CYCLE", "Front-End Developer — a campus e-waste donation app where students get a digital certificate for donating their old devices.", "https://ust-re-cycle.vercel.app", ImageUrl: "/images/ust-re-cycle.jpg", TechStack: new[] { "React", "Node.js", "Supabase" }),
        new Project(2, "LMD Dental Clinic", "Business Analyst — a patient website with appointment booking.", "", ImageUrl: "https://placehold.co/800x450/161b27/a3e635?text=LMD+Dental+Clinic"),
        new Project(5, "Panorama", "UI/UX Designer — a web app focused on easy, clear user flows.", "", ImageUrl: "/images/panorama.jpg")
    };
}
