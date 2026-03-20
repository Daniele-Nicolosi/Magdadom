// 1. MOBILE MENU TOGGLE

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function() {
    mobileNav.classList.toggle('open');
});


//2. HEADER SHADOW ON SCROLL 

const header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(26, 133, 200, 0.12)';
    } else {
        header.style.boxShadow = 'none';
    }
});


//3. HERO SLIDESHOW AUTOMATICO

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;  // indice della slide attuale
let timer;        // variabile per il timer dello slideshow

function goToSlide(index) {

    // Salva riferimento alla slide uscente
    const exitSlide = slides[current];
    
    // imovi active e aggiungi exit - rimane congelata a scale(1.18)
    exitSlide.classList.remove('active');
    exitSlide.classList.add('exit');
    dots[current].classList.remove('active');

    // Dopo 1.8s (tempo di uscita), rimuovi anche exit
    setTimeout(function() {
        exitSlide.classList.remove('exit');
    }, 1800);

    // Aggiorna indice corrente 
    current = index;

    // Resetta e avvia animazione per la nuova slide
    slides[current].style.animation = 'none';
    slides[current].offsetHeight;
    slides[current].style.animation = '';

    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function nextSlide() {
    // Se siamo all'ultima slide, torna alla prima, altrimenti vai alla slide successiva
    let next = (current + 1) % slides.length;
    goToSlide(next);
}

function startTimer() {
    // Cambia slide ogni 6 secondi
    timer = setInterval(nextSlide, 5000);
}

// Cliccando su un dot, vai alla slide corrispondente e resetta il timer
dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
        let index = parseInt(dot.dataset.index);
        clearInterval(timer); // Ferma il timer
        goToSlide(index);    // Vai alla slide cliccata
        startTimer();        // Riavvia il timer
    });
});

// Avvia il timer quando la pagina è pronta
startTimer();


