const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.nav-dots button');

// ====== INTERSECTION OBSERVER ======
// Osserva quale sezione è "attiva" (visibile per almeno il 60%)
// e reagisce: aggiorna i puntini + anima gli elementi .reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;

        if (entry.isIntersecting) {
            // aggiorna i puntini della nav
            dots.forEach(dot => {
                dot.classList.toggle('active', dot.dataset.target === id);
            });

            // anima gli elementi interni alla sezione
            entry.target.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
            });
        } else {
            // ripristina l'animazione per rivederla se torni indietro
            entry.target.querySelectorAll('.reveal').forEach(el => {
                el.classList.remove('visible');
            });
        }
    });
}, {
    threshold: 0.6 // scatta quando il 60% della sezione è visibile
});

sections.forEach(section => observer.observe(section));

// ====== CLICK SUI PUNTINI: naviga alla sezione ======
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        document.getElementById(dot.dataset.target)
            .scrollIntoView({ behavior: 'smooth' });
    });
});