// --- ANIMATION D'APPARITION (REVEAL) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// --- COMPTEURS DYNAMIQUES ---
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // L'animation dure 2 secondes
        const step = target / (duration / 10);
        
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(update, 10);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};

// On lance les compteurs quand on arrive sur la section
const statsSection = document.querySelector('.stats-bar');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

statsObserver.observe(statsSection);
// --- LOGIQUE DE LA BARRE DE PROGRESSION ---
window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});