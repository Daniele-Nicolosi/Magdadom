/* ============================================================
   script.js — Magdadom Vacation Homes

   CONTENTS:
   1. Mobile menu toggle
   2. Header shadow on scroll
   3. Properties carousel
   ============================================================ */


/* ============================================================
   1. MOBILE MENU TOGGLE
   Toggles the .open class on the mobile nav when the
   hamburger button is clicked.
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
});


/* ============================================================
   2. HEADER SHADOW ON SCROLL
   Adds a subtle blue shadow to the header when the user
   scrolls past 20px.
   ============================================================ */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(26, 133, 200, 0.12)';
    } else {
        header.style.boxShadow = 'none';
    }
});


/* ============================================================
   3. PROPERTIES CAROUSEL
   Handles the sliding property cards with arrow buttons
   and dot indicators. Shows a peek of adjacent cards.
   ============================================================ */
const track       = document.getElementById('carousel-track');
const prevBtn     = document.getElementById('carousel-prev');
const nextBtn     = document.getElementById('carousel-next');
const carouselDots = document.querySelectorAll('.carousel-dot');

let currentCard = 0;

// Returns all property card elements inside the track
function getCards() {
    return track.querySelectorAll('.property-card');
}

// Moves the carousel to the correct position and updates
// the arrow buttons and dot indicators
function updateCarousel() {
    const cards     = getCards();
    const gap       = parseFloat(getComputedStyle(track).gap);
    const cardWidth = cards[0].offsetWidth + gap;

    // Spostamento diretto — nessun offset artificiale
    const translateX = currentCard * cardWidth;

    track.style.transform  = `translateX(-${translateX}px)`;
    track.style.transition = 'transform 0.5s ease';

    // Disable arrows at the beginning and end
    prevBtn.disabled = currentCard === 0;
    nextBtn.disabled = currentCard === cards.length - 1;

    // Sync dot indicators
    carouselDots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentCard);
    });
}

// Arrow click handlers
prevBtn.addEventListener('click', function () {
    if (currentCard > 0) {
        currentCard--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', function () {
    const cards = getCards();
    if (currentCard < cards.length - 1) {
        currentCard++;
        updateCarousel();
    }
});

// Dot click handlers
carouselDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
        currentCard = i;
        updateCarousel();
    });
});

// Initialize on page load
updateCarousel();
