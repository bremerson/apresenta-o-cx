gsap.registerPlugin(ScrollTrigger);

// Movimento do Cursor
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// Animação de entrada dos Cards (Scroll Reveal)
gsap.from(".bento-card", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%"
    }
});

// Efeito de contagem nos números
const stats = document.querySelectorAll('.stat, .stat-small');
stats.forEach(stat => {
    const text = stat.innerText;
    const value = parseFloat(text.replace(/[^\d.]/g, ''));
    if (!isNaN(value)) {
        gsap.from(stat, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 0.1 },
            scrollTrigger: {
                trigger: stat,
                start: "top 90%"
            }
        });
    }
});