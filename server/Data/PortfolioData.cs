using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public static class PortfolioData
{
    public static readonly About About = new(
        Headline: "Software developer building web apps with Angular, React, TypeScript, and Python.",
        Details: new[]
        {
            "Contractor at Kidlat CivicLabs, working on a government agency's website and ALICE, an AI tutor for Alternative Learning System (ALS) learners.",
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
        // Kidlat CivicLabs
        new Project(8, "Government Agency Website", "Front-End Developer (Kidlat CivicLabs) — built a government agency's public website as the only front-end developer. Made the main menu, mobile menu, and site search work with a keyboard, added dark mode, and set the site up to run on the agency's own servers without outside services. The screenshot is blurred to keep the client confidential.", "", ImageUrl: "/images/gov-website.jpg", TechStack: new[] { "Angular", "TypeScript", "SCSS", "Vitest" }),
        new Project(9, "ALICE", "Developer and Consultant (Kidlat CivicLabs) — an AI tutor for Alternative Learning System (ALS) learners, who chat with it on Facebook Messenger and get answers based on their ALS modules. Built the admin cost dashboard that shows how much the chatbot costs to run and how many replies it sends, fixed a bug that made the total cost come out wrong, and review teammates' code across the platform.", "", ImageUrl: "/images/alice.jpg", TechStack: new[] { "Python", "FastAPI", "React", "TypeScript", "PostgreSQL" }),

        // Freelance
        new Project(1, "Project BASAdent", "QA Officer and Developer (Freelance) — a management system for a multi-branch dental clinic, covering appointments, patient records, dental charts, billing, and inventory. I plan and run testing, filed 120 bug reports and improvement tickets rated by severity, did a security review before launch, and fixed over 10 bugs.", "", ImageUrl: "/images/basadent.jpg", TechStack: new[] { "React", "Node.js", "PostgreSQL", "Supabase", "Jest", "Vitest", "Cypress", "Supertest" }),

        // Academic
        new Project(6, "Falcon's Eye", "Capstone Project, QA Tester (2025) — a lost and found and campus incident reporting system for a school, with live chat, an AI chatbot, and reports for admins. Wrote and ran 500+ manual test cases.", "https://falcon-eye.vercel.app", ImageUrl: "/images/falcon-eye.jpg", TechStack: new[] { "React", "JavaScript" }),
        new Project(7, "JV TechHub POS & Inventory System", "Full Stack Developer (2025) — a Laravel point-of-sale and inventory system with admin and employee roles, product and customer management, sales and transaction tracking, a dashboard with charts, and a customer shop with checkout and receipts.", "", ImageUrl: "/images/pos-inventory.jpg", TechStack: new[] { "PHP", "Laravel", "MySQL", "Tailwind CSS", "Docker" }),
        new Project(12, "NEST", "Documentation (2026) — a Flutter microblogging app in the style of X and Reddit, with posts, image previews, and followers. Wrote the project overview and the documentation used to present it.", "", ImageUrl: "/images/nest.jpg", TechStack: new[] { "Flutter", "Dart", "Firebase" }),
        new Project(3, "OBRA", "Android Developer (2024) — an art-sharing app with artist profiles, artwork uploads, comments, likes, and search. Later reorganized the code and fixed security bugs, including one that let users skip the login screen.", "", ImageUrl: "/images/obra.jpg", TechStack: new[] { "Kotlin", "Firebase" }),
        new Project(4, "UST RE-CYCLE", "Front-End Developer (2025) — a campus e-waste donation app where students get a digital certificate for donating their old devices.", "https://ust-re-cycle.vercel.app", ImageUrl: "/images/ust-re-cycle.jpg", TechStack: new[] { "React", "Node.js", "Supabase" }),
        new Project(2, "LMD Dental Clinic Patient Hub", "Business Analyst (2025) — a patient website for a dental clinic with appointment booking and patient dental records.", "", ImageUrl: "/images/lmd-dental-clinic.jpg", TechStack: new[] { "ASP.NET MVC", "C#" }),
        new Project(10, "VoteWise", "Developer (2024) — an online voting app for CICS Student Council elections, with voter registration, voting, results, and an FAQ. Set up the database models.", "", ImageUrl: "/images/votewise.jpg", TechStack: new[] { "ASP.NET MVC", "C#", "SQL Server" }),
        new Project(11, "CICS Application Hub", "Developer (2024) — a website where CICS students browse student organizations and apply to join them, with an admin dashboard for reviewing applicants.", "", ImageUrl: "/images/cics-application-hub.jpg", TechStack: new[] { "PHP", "MySQL", "JavaScript", "CSS" }),
        new Project(5, "Panorama", "UI/UX Designer — a news website focused on easy, clear user flows.", "", ImageUrl: "/images/panorama.jpg")
    };
}
