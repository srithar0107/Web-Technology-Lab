
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const firm = {
    name: "Elite Architectural Firm",
    tagline: "Designing Modern Buildings with Creativity and Innovation",
    address: "Karur, Tamil Nadu, India",
    phone: "+91 7094383092",
    email: "contact@elitearchitectural.com"
};

const projects = [
    ["Luxury Villa", "Karur", "Residential", "Completed"],
    ["Office Complex", "Chennai", "Commercial", "Completed"],
    ["Shopping Mall", "Coimbatore", "Commercial", "Ongoing"],
    ["Apartment Building", "Madurai", "Residential", "Completed"]
];

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c =>
        ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c])
    );
}

const menu = [
    ["/", "Home"],
    ["/about", "About"],
    ["/services", "Services"],
    ["/projects", "Projects"],
    ["/contact", "Contact"]
];

function layout(title, active, content) {
    const links = menu.map(([url, label]) =>
        `<a href="${url}" class="${url === active ? "active" : ""}">${label}</a>`
    ).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(title)} | ${firm.name}</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>

<header class="navbar">
    <a class="logo" href="/">ELITE <span>ARCHITECTURAL</span></a>
    <nav>${links}</nav>
</header>

<main>${content}</main>

<footer>
    <h3>${firm.name}</h3>
    <p>${firm.tagline}</p>
    <p>${firm.address} | ${firm.phone}</p>
    <p>© ${new Date().getFullYear()} ${firm.name}. All Rights Reserved.</p>
</footer>

</body>
</html>`;
}

// HOME PAGE
function home(req) {
    return layout("Home", "/", `
<section class="hero">
    <p class="eyebrow">ARCHITECTURE • DESIGN • INNOVATION</p>
    <h1>Creating Spaces<br><span>That Inspire.</span></h1>
    <p class="lead">${firm.tagline}</p>

    <div class="actions">
        <a class="button" href="/projects">Explore Projects</a>
        <a class="button outline" href="/contact">Contact Our Team</a>
    </div>
</section>

<section class="card">
    <h2>Welcome to ${firm.name}</h2>
    <p>We design modern residential, commercial and interior spaces with creativity and practical solutions.</p>

    <div class="request-info">
        <p><b>Request URL:</b> <code>${escapeHTML(req.url)}</code></p>
        <p><b>Request Method:</b> <code>${escapeHTML(req.method)}</code></p>
        <p><b>HTTP Status:</b> <code>200 OK</code></p>
    </div>
</section>

<section class="section">
    <p class="eyebrow">WHAT WE DO</p>
    <h2 class="section-title">Our Expertise</h2>

    <div class="grid">
        <article class="card">
            <h3>Building Design</h3>
            <p>Modern residential and commercial building designs.</p>
        </article>

        <article class="card">
            <h3>Interior Design</h3>
            <p>Creative interiors for homes and offices.</p>
        </article>

        <article class="card">
            <h3>Planning Services</h3>
            <p>Floor plans, 3D visualization and project planning.</p>
        </article>
    </div>
</section>`);
}

// ABOUT PAGE
function about() {
    return layout("About", "/about", `
<section class="page-heading">
    <p class="eyebrow">OUR STORY</p>
    <h1>About Our Firm</h1>
    <p>Designing practical, attractive and sustainable spaces.</p>
</section>

<section class="card">
    <h2>Who We Are</h2>
    <p>${firm.name} specializes in modern residential, commercial and interior architectural designs.</p>
    <p>We combine creativity and planning to develop spaces that reflect client requirements.</p>
</section>

<div class="grid">
    <article class="card">
        <h3>Our Vision</h3>
        <p>To create inspiring spaces for modern living.</p>
    </article>

    <article class="card">
        <h3>Our Mission</h3>
        <p>To deliver creative and practical architectural solutions.</p>
    </article>
</div>`);
}

// SERVICES PAGE
function services() {
    return layout("Services", "/services", `
<section class="page-heading">
    <p class="eyebrow">OUR EXPERTISE</p>
    <h1>Our Services</h1>
    <p>Design support for homes, businesses and interiors.</p>
</section>

<div class="grid">
    <article class="card">
        <h2>Residential Design</h2>
        <p>Homes, villas and apartment planning.</p>
    </article>

    <article class="card">
        <h2>Commercial Design</h2>
        <p>Functional offices and commercial spaces.</p>
    </article>

    <article class="card">
        <h2>Interior Design</h2>
        <p>Creative interiors for homes and workplaces.</p>
    </article>

    <article class="card">
        <h2>Planning Services</h2>
        <p>Floor plans, 3D visualization and construction planning.</p>
    </article>
</div>`);
}

// PROJECTS PAGE
function projectPage() {
    const rows = projects.map(project =>
        `<tr>${project.map(item => `<td>${escapeHTML(item)}</td>`).join("")}</tr>`
    ).join("");

    return layout("Projects", "/projects", `
<section class="page-heading">
    <p class="eyebrow">SELECTED WORK</p>
    <h1>Our Projects</h1>
    <p>A selection of residential and commercial projects.</p>
</section>

<section class="card">
    <h2>Project Portfolio</h2>
    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    </div>
</section>`);
}

// CONTACT PAGE
function contact(result) {
    const values = result ? result.values :
        { name: "", email: "", phone: "", message: "" };

    const errors = result ? result.errors : {};

    const error = key =>
        errors[key] ? `<small class="error">${errors[key]}</small>` : "";

    const notice = result
        ? (result.ok
            ? `<p class="success">Thank you! Your enquiry has been received.</p>`
            : `<p class="error-summary">Please correct the details below.</p>`)
        : "";

    return layout("Contact", "/contact", `
<section class="page-heading">
    <p class="eyebrow">LET'S DISCUSS YOUR PROJECT</p>
    <h1>Contact Us</h1>
    <p>Share your requirements with our architectural team.</p>
</section>

<div class="contact-grid">

    <section class="card">
        <h2>Get in Touch</h2>
        <p><b>Address:</b> ${firm.address}</p>
        <p><b>Phone:</b> ${firm.phone}</p>
        <p><b>Email:</b> ${firm.email}</p>
    </section>

    <form class="card" method="POST" action="/contact">
        ${notice}

        <label>Name</label>
        <input name="name" value="${escapeHTML(values.name)}" required>
        ${error("name")}

        <label>Email</label>
        <input name="email" type="email" value="${escapeHTML(values.email)}" required>
        ${error("email")}

        <label>Phone Number</label>
        <input name="phone" value="${escapeHTML(values.phone)}" required>
        ${error("phone")}

        <label>Project Details</label>
        <textarea name="message" rows="4" required>${escapeHTML(values.message)}</textarea>
        ${error("message")}

        <button type="submit">Send Enquiry</button>
    </form>

</div>`);
}

// SERVER-SIDE VALIDATION
function validate(values) {
    const errors = {};

    if (!/^[A-Za-z ]{2,40}$/.test(values.name.trim()))
        errors.name = "Enter a valid name.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
        errors.email = "Enter a valid email address.";

    if (!/^[6-9]\d{9}$/.test(values.phone.trim()))
        errors.phone = "Enter a valid 10-digit mobile number.";

    if (!values.message.trim())
        errors.message = "Please enter your project details.";

    return {
        ok: Object.keys(errors).length === 0,
        errors,
        values
    };
}

// SEND HTTP RESPONSE
function send(res, status, type, body) {
    res.writeHead(status, { "Content-Type": type });
    res.end(body);
}

// CREATE HTTP SERVER
const server = http.createServer((req, res) => {

    const route = new URL(req.url, "http://localhost").pathname;
    const html = "text/html; charset=utf-8";

    console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);

    if (req.method === "GET" || req.method === "HEAD") {

        switch (route) {
            case "/":
            case "/home":
                return send(res, 200, html, home(req));

            case "/about":
                return send(res, 200, html, about());

            case "/services":
                return send(res, 200, html, services());

            case "/projects":
                return send(res, 200, html, projectPage());

            case "/contact":
                return send(res, 200, html, contact());

            case "/style.css":
                return send(
                    res,
                    200,
                    "text/css; charset=utf-8",
                    fs.readFileSync(path.join(__dirname, "style.css"))
                );
        }

    } else if (req.method === "POST" && route === "/contact") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
            if (body.length > 100000) req.destroy();
        });

        req.on("end", () => {
            const form = new URLSearchParams(body);

            const values = {
                name: form.get("name") || "",
                email: form.get("email") || "",
                phone: form.get("phone") || "",
                message: form.get("message") || ""
            };

            const result = validate(values);

            send(res, result.ok ? 200 : 400, html, contact(result));
        });

        return;
    }

    send(res, 404, html, layout(
        "Not Found",
        "",
        `<section class="card">
            <h1>404 – Page Not Found</h1>
            <p>The requested page could not be found.</p>
            <a class="button" href="/">Return Home</a>
        </section>`
    ));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
