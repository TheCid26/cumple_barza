// --- MENSAJE CON EFECTO MÁQUINA DE ESCRIBIR ---
const mensaje = `💙❤️ Hoy es un día especial, un día de alegría y pasión.<br>
    Que la fuerza del Barça te acompañe en este nuevo año de vida. ⚽<br>
    Sigue soñando, sigue ganando... ¡como el más grande del mundo! 🌟<br><br>
    <b>Visca el Barça, y visca tú 🎂🔥</b>💙❤️`;

const contenedor = document.getElementById('mensaje');
let i = 0;
const velocidad = 40; // milisegundos por letra

function escribir() {
    if (i < mensaje.length) {
        contenedor.innerHTML = mensaje.substring(0, i++) + '<span class="cursor">|</span>';
        setTimeout(escribir, velocidad);
    } else {
        contenedor.innerHTML = mensaje; // elimina cursor al final
    }
}

window.onload = escribir;

// Confeti simple en canvas
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettis = [];
const colores = ['#a50044', '#004d98', '#edbb00', '#ffffff']; // Colores del Barça

for (let i = 0; i < 200; i++) {
    confettis.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 2,
        d: Math.random() * 0.8 + 0.3,
        color: colores[Math.floor(Math.random() * colores.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.05 + 0.02,
        tiltAngle: 0
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(conf => {
        ctx.beginPath();
        ctx.lineWidth = conf.r;
        ctx.strokeStyle = conf.color;
        ctx.moveTo(conf.x + conf.tilt + conf.r / 2, conf.y);
        ctx.lineTo(conf.x + conf.tilt, conf.y + conf.tilt + conf.r / 2);
        ctx.stroke();
    });

    updateConfetti();
}

function updateConfetti() {
    confettis.forEach(conf => {
        conf.tiltAngle += conf.tiltAngleIncrement;
        conf.y += (Math.cos(conf.d) + 1 + conf.r / 2) / 2;
        conf.x += Math.sin(conf.d);
        conf.tilt = Math.sin(conf.tiltAngle - conf.d / 2) * 15;

        if (conf.y > canvas.height) {
            conf.y = -10;
            conf.x = Math.random() * canvas.width;
        }
    });
}

function loop() {
    requestAnimationFrame(loop);
    drawConfetti();
}

loop();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('DOMContentLoaded', function () {
    const musica = document.getElementById('musica');

    // Intenta reproducir automáticamente
    const playPromise = musica.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Si el navegador bloquea, muestra un botón o activa tras clic
            const boton = document.createElement('button');
            boton.textContent = '🎵 Reproducir música';
            boton.style.position = 'fixed';
            boton.style.bottom = '20px';
            boton.style.left = '50%';
            boton.style.transform = 'translateX(-50%)';
            boton.style.padding = '12px 20px';
            boton.style.background = '#edbb00';
            boton.style.border = 'none';
            boton.style.borderRadius = '10px';
            boton.style.fontSize = '1.1em';
            boton.style.cursor = 'pointer';
            boton.style.zIndex = '1000';
            document.body.appendChild(boton);

            boton.addEventListener('click', () => {
                musica.play();
                boton.remove();
            });
        });
    }
});
