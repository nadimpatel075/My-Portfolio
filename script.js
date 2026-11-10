
// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// CLOSE MOBILE MENU AFTER CLICKING LINK

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});


// =====================================
// TYPING ANIMATION
// =====================================

const typingText = document.getElementById("typingText");

const roles = [
    "Web Developer",
    "Frontend Developer",
    "Java Developer",
    "Creative Thinker"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let speed = deleting ? 55 : 100;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        speed = 1300;
    }

    else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);

}

typeEffect();


// =====================================
// SCROLL REVEAL ANIMATION
// =====================================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .stat-card, .skill-card, .project-card, .contact-info, .contact-form"
);

revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(function(element) {
    observer.observe(element);
});


// =====================================
// ACTIVE NAVIGATION ON SCROLL
// =====================================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// =====================================
// CONTACT FORM
// =====================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const recipient = "yourmail@gmail.com";

    const body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message: " + message;

    const mailtoLink =
        "mailto:" + recipient +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    document.getElementById("formMessage").textContent =
        "Opening your email application...";

    window.location.href = mailtoLink;

});
