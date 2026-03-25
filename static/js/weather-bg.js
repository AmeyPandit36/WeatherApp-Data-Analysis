/* ============================================
   Weather-Adaptive Animated Background
   Canvas-based particles, rain, clouds, sun, snow
   ============================================ */
(function () {
    const canvas = document.getElementById('weather-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    /* ---- Detect weather condition from body data attribute ---- */
    const raw = (document.body.dataset.weather || 'default').toLowerCase();
    let mode = 'default';
    if (raw.includes('sun') || raw.includes('clear')) mode = 'sunny';
    else if (raw.includes('rain') || raw.includes('drizzle') || raw.includes('thunder')) mode = 'rainy';
    else if (raw.includes('snow') || raw.includes('sleet') || raw.includes('blizzard') || raw.includes('ice')) mode = 'snowy';
    else if (raw.includes('cloud') || raw.includes('overcast') || raw.includes('mist') || raw.includes('fog')) mode = 'cloudy';

    /* =========== Particle Systems =========== */

    // --- Generic floating particles (default / sunny accent) ---
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.r = Math.random() * 2.5 + 0.5;
            this.speed = Math.random() * 0.4 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.drift = (Math.random() - 0.5) * 0.3;
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            if (this.y < -10) { this.reset(); this.y = H + 10; }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
            ctx.fill();
        }
    }

    // --- Rain drops ---
    class RainDrop {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : -10;
            this.len = Math.random() * 18 + 10;
            this.speed = Math.random() * 8 + 6;
            this.opacity = Math.random() * 0.4 + 0.2;
        }
        update() {
            this.y += this.speed;
            this.x -= 1.5;
            if (this.y > H) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + 1.5, this.y - this.len);
            ctx.strokeStyle = `rgba(174,210,255,${this.opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
    }

    // --- Snow flakes ---
    class Snowflake {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = Math.random() * W;
            this.y = init ? Math.random() * H : -10;
            this.r = Math.random() * 3 + 1;
            this.speed = Math.random() * 1.5 + 0.5;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.03 + 0.01;
            this.opacity = Math.random() * 0.6 + 0.3;
        }
        update() {
            this.y += this.speed;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.8;
            if (this.y > H + 10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
            ctx.fill();
        }
    }

    // --- Cloud blobs ---
    class Cloud {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = init ? Math.random() * W : -300;
            this.y = Math.random() * (H * 0.5);
            this.w = Math.random() * 200 + 150;
            this.h = this.w * 0.4;
            this.speed = Math.random() * 0.4 + 0.15;
            this.opacity = Math.random() * 0.12 + 0.06;
        }
        update() {
            this.x += this.speed;
            if (this.x > W + 350) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ffffff';
            // Draw cloud with overlapping circles
            const cx = this.x, cy = this.y, r = this.h * 0.6;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.arc(cx + r * 1.1, cy - r * 0.3, r * 0.9, 0, Math.PI * 2);
            ctx.arc(cx + r * 2, cy, r * 0.75, 0, Math.PI * 2);
            ctx.arc(cx - r * 0.8, cy + r * 0.2, r * 0.65, 0, Math.PI * 2);
            ctx.arc(cx + r * 0.5, cy + r * 0.15, r * 0.85, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // --- Sun rays ---
    let sunAngle = 0;
    function drawSun() {
        const sx = W * 0.82, sy = H * 0.12, sr = 55;
        // Glow
        const grd = ctx.createRadialGradient(sx, sy, sr * 0.3, sx, sy, sr * 3);
        grd.addColorStop(0, 'rgba(255,220,80,0.25)');
        grd.addColorStop(1, 'rgba(255,220,80,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(sx - sr * 3, sy - sr * 3, sr * 6, sr * 6);

        // Rays
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(sunAngle);
        for (let i = 0; i < 12; i++) {
            ctx.rotate(Math.PI / 6);
            ctx.beginPath();
            ctx.moveTo(0, sr + 10);
            ctx.lineTo(-4, sr + 40);
            ctx.lineTo(4, sr + 40);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255,220,80,0.16)';
            ctx.fill();
        }
        ctx.restore();
        sunAngle += 0.003;

        // Core circle
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,220,80,0.22)';
        ctx.fill();
    }

    /* =========== Populate =========== */
    const items = [];

    if (mode === 'sunny') {
        for (let i = 0; i < 60; i++) items.push(new Particle());
    } else if (mode === 'rainy') {
        for (let i = 0; i < 120; i++) items.push(new RainDrop());
        for (let i = 0; i < 4; i++) items.push(new Cloud());
    } else if (mode === 'snowy') {
        for (let i = 0; i < 100; i++) items.push(new Snowflake());
    } else if (mode === 'cloudy') {
        for (let i = 0; i < 7; i++) items.push(new Cloud());
        for (let i = 0; i < 30; i++) items.push(new Particle());
    } else {
        // Default gentle particles
        for (let i = 0; i < 50; i++) items.push(new Particle());
    }

    /* =========== Render Loop =========== */
    function loop() {
        ctx.clearRect(0, 0, W, H);

        if (mode === 'sunny') drawSun();

        for (const p of items) {
            p.update();
            p.draw();
        }

        requestAnimationFrame(loop);
    }
    loop();
})();
