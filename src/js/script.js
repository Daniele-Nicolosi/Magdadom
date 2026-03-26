/* ============================================================
   script.js — Magdadom Vacation Homes

   CONTENTS:
   1. Mobile menu toggle
   2. Header shadow on scroll
   3. Properties carousel
   ============================================================ */


/* ============================================================
   1. MOBILE MENU TOGGLE
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
});


/* ============================================================
   2. HEADER SHADOW ON SCROLL
   ============================================================ */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(18, 96, 160, 0.12)';
    } else {
        header.style.boxShadow = 'none';
    }
});


/* ============================================================
   3. PROPERTIES CAROUSEL
   Cards slide horizontally. Each card is 76% wide so
   ~12% of adjacent cards are visible on each side.
   ============================================================ */
const track        = document.getElementById('carousel-track');
const prevBtn      = document.getElementById('carousel-prev');
const nextBtn      = document.getElementById('carousel-next');
const carouselDots = document.querySelectorAll('.carousel-dot');

let currentCard = 0;

function getCards() {
    return track.querySelectorAll('.property-card');
}

function updateCarousel() {
    const cards     = getCards();
    const gap       = parseFloat(getComputedStyle(track).gap);
    const cardWidth = cards[0].offsetWidth + gap;

    track.style.transform  = `translateX(-${currentCard * cardWidth}px)`;
    track.style.transition = 'transform 0.5s ease';

    prevBtn.disabled = currentCard === 0;
    nextBtn.disabled = currentCard === cards.length - 1;

    carouselDots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentCard);
    });
}

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

carouselDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
        currentCard = i;
        updateCarousel();
    });
});

updateCarousel();