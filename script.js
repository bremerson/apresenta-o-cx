/**
 * DATA LAYER: Informações extraídas do PPT
 */
const PLATFORM_DATA = {
    ac: {
        id: 'ac',
        title: "Agent Connect",
        short: "Capital Humano + IA",
        prompt: "Futuristic digital interface showing human and AI synchronization, red and silver color palette, hyper-realistic, high tech.",
        bigStat: "Peak 129",
        statLabel: "NPS Alcaçado (iFood)",
        bullets: [
            "Match Point: Algoritmo de conexão cliente-operador.",
            "Potencialização: IA amplificando a humanidade da operação.",
            "Evolução: De talentos táticos para geradores de valor."
        ],
        provocation: "Sua operação hoje conecta o cliente ao atendente disponível ou ao atendente capaz?"
    },
    monitoria: {
        id: 'monitoria',
        title: "MonitorIA Hub",
        short: "Ciclo Ágil de 1.82s",
        prompt: "Digital surveillance eye, data streams, flowing binary, cybernetic red glow, analytical interface.",
        bigStat: "350%",
        statLabel: "Aumento de Auditoria Automatizada",
        bullets: [
            "Escalabilidade: Monitoria de 100% da operação.",
            "G.FOCUS: Alertas automatizados com escalonamento até VP.",
            "Pirâmide Invertida: Ciclo fechado de feedback via Robbyson."
        ],
        provocation: "Quanto custa o risco de monitorar apenas 1% do seu volume total?"
    },
    hub: {
        id: 'hub',
        title: "Hub de Correlações",
        short: "Matemática da Empatia",
        prompt: "Abstract data nodes connecting in a 3D space, neural network vibes, glowing connections.",
        bigStat: "2000+",
        statLabel: "Bases Mineradas por Dia",
        bullets: [
            "SEC vs IEC: Correlação entre Empatia e Experiência.",
            "Clusterização: Identificação de dispersão TMA x NPS.",
            "Diagnósticos: Planos semanais preditivos baseados em dados."
        ],
        provocation: "Você consegue provar matematicamente a causa raiz do seu churn hoje?"
    },
    nep: {
        id: 'nep',
        title: "NEP + LabX",
        short: "Xeque-mate no ROI",
        prompt: "High-end laboratory, data visualization screens, minimalist futuristic architecture.",
        bigStat: "+13.3MM",
        statLabel: "Recuperação Potencial Anual",
        bullets: [
            "Ambiente LabX: Validar, Errar Rápido, Escalar.",
            "Calculadora de Projeção: Gestão financeira da experiência.",
            "Termômetro: Acompanhamento de movimentação por grupo."
        ],
        provocation: "O LabX prova: dados sem intervenção são apenas estatísticas de perda."
    }
};

/**
 * UI CONTROLLER
 */
const ui = {
    init() {
        this.renderGrid();
        this.initCanvas();
        this.initCursor();
        this.initAnimations();
    },

    renderGrid() {
        const container = document.getElementById('grid-hub');
        Object.values(PLATFORM_DATA).forEach(item => {
            const card = document.createElement('div');
            card.className = 'bento-card';
            card.onclick = () => this.openPanel(item.id);
            card.innerHTML = `
                <div class="card-bg-img" style="background-image: url('https://source.unsplash.com/featured/?technology,future,${item.id}')"></div>
                <div class="card-info">
                    <span class="card-num">${item.id.toUpperCase()}</span>
                    <h3>${item.title}</h3>
                    <p>${item.short}</p>
                    <span class="plus">+</span>
                </div>
            `;
            container.appendChild(card);
        });
    },

    openPanel(id) {
        const data = PLATFORM_DATA[id];
        const panel = document.getElementById('detail-panel');
        const body = document.getElementById('panel-body');

        body.innerHTML = `
            <div class="panel-section">
                <h4>Visão Executiva</h4>
                <h2>${data.title}</h2>
                <div class="big-stat">${data.bigStat}</div>
                <p class="stat-sub">${data.statLabel}</p>
            </div>
            
            <div class="panel-section">
                <h4>Funcionamento & High-Level</h4>
                <ul class="bullet-list">
                    ${data.bullets.map(b => `<li>${b} <span>→</span></li>`).join('')}
                </ul>
            </div>

            <div class="provocation">
                "${data.provocation}"
            </div>
        `;

        panel.classList.add('active');
    },

    closePanel() {
        document.getElementById('detail-panel').classList.remove('active');
    },

    initCursor() {
        const cursor = document.getElementById('custom-cursor');
        document.addEventListener('mousemove', e => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });
    },

    initCanvas() {
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
            }
            draw() {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        const init = () => {
            particles = [];
            for(let i=0; i<80; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    },

    initAnimations() {
        gsap.from(".split-text", {
            opacity: 0, y: 100, duration: 1.5, ease: "power4.out", stagger: 0.1
        });
        gsap.from(".bento-card", {
            opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: "#grid-hub"
        });
    }
};

window.onload = () => ui.init();