/* ==========================================================
   PORTFOLIO SCRIPT
   Handles: contact form (mailto), skill card flip on touch,
   and active nav-link highlighting while scrolling.
========================================================== */


/* ----------------------------------------------------------
   1. CONTACT FORM — opens the user's email app pre-filled
---------------------------------------------------------- */

console.log('script.js is running');
console.log('Found view-cert links:', document.querySelectorAll('.view-cert').length);

document.querySelectorAll('.view-cert').forEach(link => {
    link.addEventListener('click', function (e) {
        console.log('Certificate link clicked!', this.dataset.img);
        e.preventDefault();
        const modal = document.getElementById('imgModal');
        document.getElementById('modalImg').src = this.dataset.img;
        modal.classList.add('open');
    });
});
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                submitBtn.textContent = 'Message Sent!';
                contactForm.reset();
            } else {
                submitBtn.textContent = 'Something went wrong';
                console.error(result);
            }
        } catch (error) {
            submitBtn.textContent = 'Failed to send';
            console.error(error);
        }

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
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

document.querySelectorAll('.view-cert').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const modal = document.getElementById('imgModal');
    document.getElementById('modalImg').src = this.dataset.img;
    modal.classList.add('open');
  });
});

function closeModal(e) {
  if (e.target.id === 'imgModal' || e.target.className === 'modal-close') {
    document.getElementById('imgModal').classList.remove('open');
  }
}

// optional: close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('imgModal').classList.remove('open');
  }
});
/* ----------------------------------------------------------
   4. CERTIFICATE MODAL — open on click, close on X / outside / Escape
---------------------------------------------------------- */

const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalCloseBtn = document.querySelector('.modal-close');

// Open modal when a certificate link is clicked
document.querySelectorAll('.view-cert').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        modalImg.src = this.dataset.img;
        imgModal.classList.add('open');
    });
});

// Close modal when the "X" is clicked
modalCloseBtn.addEventListener('click', function () {
    imgModal.classList.remove('open');
});

// Close modal when clicking the dark background (but not the image itself)
imgModal.addEventListener('click', function (e) {
    if (e.target === imgModal) {
        imgModal.classList.remove('open');
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        imgModal.classList.remove('open');
    }
});
