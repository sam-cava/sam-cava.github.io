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

// naviga alla sezione tramite i puntini della nav
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        document.getElementById(dot.dataset.target)
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// Istallazione del canvas per l'effetto Matrix
const matrixCanvas = document.getElementById('matrix-background');
const ctx = matrixCanvas.getContext('2d');
const homeSection = document.getElementById('home-section');
let width = matrixCanvas.width = homeSection.offsetWidth;
let height = matrixCanvas.height = homeSection.offsetHeight;

window.addEventListener('resize', function () {
    width = matrixCanvas.width = homeSection.offsetWidth;
    height = matrixCanvas.height = homeSection.offsetHeight;
});

const fontSize = 14;
const columnNumber = Math.floor(width / fontSize);
const drops = Array(columnNumber).fill(0).map(() => ({
    startHeight : Math.floor(Math.random() * height / fontSize),
    speed : Math.floor(Math.random() * 8) + 2
    })
);
let totFrames = 0;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(0, 255, 0, 0.8)';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((obj, index) => {
        if (totFrames % obj.speed === 0) {
            //const text = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
            const alphaStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const text = alphaStr.charAt(Math.floor(Math.random() * alphaStr.length));
            ctx.fillText(text, index * fontSize, obj.startHeight * fontSize);

            if (obj.startHeight * fontSize > height && Math.random() > 0.975) {
                obj.startHeight = 0;
            } else {
                obj.startHeight++;
            }
        }
    });

    totFrames++;
    requestAnimationFrame(drawMatrix);
}

drawMatrix();