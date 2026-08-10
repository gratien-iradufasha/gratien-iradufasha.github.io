/* ==========================================================
   PORTFOLIO SCRIPT
   Handles: contact form (mailto), skill card flip on touch,
   and active nav-link highlighting while scrolling.
========================================================== */


/* ----------------------------------------------------------
   1. CONTACT FORM — opens the user's email app pre-filled
---------------------------------------------------------- */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // Stop the form from doing a normal page-reload submit
        e.preventDefault();

        // Grab what the user typed
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Build the email subject and body
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        // encodeURIComponent() makes spaces/line breaks/symbols safe inside a URL
        const mailtoLink =
            `mailto:gratien@tuta.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Redirecting the browser to a mailto: link opens the user's default mail app
        window.location.href = mailtoLink;
    });
}


/* ----------------------------------------------------------
   2. SKILL CARDS — flip on tap (for touch devices)
---------------------------------------------------------- */

// Your CSS currently flips the card using ":hover", which works with
// a mouse but NOT on phones/tablets (no cursor = no hover).
// This adds a "flipped" class on tap so touch users can flip cards too.

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(function (card) {
    card.addEventListener('click', function () {
        card.classList.toggle('flipped');
    });
});


/* ----------------------------------------------------------
   3. NAVIGATION — highlight the current section link
---------------------------------------------------------- */

// As the user scrolls, this checks which section is currently
// in view and adds an "active" class to the matching nav link.

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');

function highlightActiveSection() {
    let currentSectionId = '';

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120; // offset for sticky header height
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);