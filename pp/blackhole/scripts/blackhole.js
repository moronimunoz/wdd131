(() => {
    // ---------- AJUSTES ----------
    const PULSE_EVERY = 10;    // cada cuántos segundos se encoge un poquito, hace el destello y sigue girando (0 = sin pulsos)
    const SHRINK = 0.08;      // cuánto se encoge antes del destello (0.12 = 12% más chico)
    const FPS = 30;
    const OFFSET_X = 0;       // desplaza el agujero: -0.25 = izquierda, 0.25 = derecha (fracción del ancho)
    const STATIC_T = 9.5;     // frame fijo si el usuario pide menos movimiento

    // ---------- CONSTANTES (de black_hole.py) ----------
    const TAU = Math.PI * 2;
    const R0 = 0.11, TILT = 17 * Math.PI / 180, INC = 0.12;
    const R_IN = 1.55 * R0, R_OUT = 5.4 * R0, FLASH = 7.800222;
    const POOLS = ["1il!;:", "rtfjcvxz=+", "aeoun0{}[]<>", "08B$#&%Q"];
    const TAG = [[190, 38, 12], [242, 78, 20], [255, 124, 34], [255, 172, 78], [255, 222, 168], [220, 228, 255], [130, 72, 48]];
    const DEEP = 0, RED = 1, ORANGE = 2, AMBER = 3, HOT = 4, STAR = 5, DUST = 6;
    const COS_T = Math.cos(TILT), SIN_T = Math.sin(TILT);

    const smooth = x => { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); };
    const clamp = (x, a, b) => x < a ? a : x > b ? b : x;
    const mod = (a, n) => ((a % n) + n) % n;

    // ---------- matemática ----------
    const spin = t => {
        const s = Math.max(t - FLASH, 0);
        return 0.060222 * t + 0.28 * (s - 0.8 * (1 - Math.exp(-s / 0.8)));
    };
    const ripple = (a, b, t) =>
        Math.sin(a + 0.900222 * Math.sin(b + 1.3 * t)) * 0.5 +
        Math.sin(2.3 * a - b + 0.7 * t) * 0.3 +
        Math.sin(4.1 * a + 1.7 * b - 1.1 * t) * 0.2;

    const PULSES = [[1.8, 0.0, 0.95], [2.4, 2.1, 0.8], [3.2, 4.2, 0.65]];
    let gPhase = 0, gLr = 0, gPulse = 0;           // salidas extra de gas()

    // anillos finos de gas en órbitas circulares; los internos giran más rápido
    function gas(phi, rho, t, w) {
        rho = Math.max(rho, 1e-6);
        const phase = phi - Math.pow(rho / R_IN, -1.5) * w;
        const lr = Math.log(rho / R0);
        const a = 46 * lr + 0.9 * Math.sin(phase + 3 * lr);
        let streak = 0.55 + 0.3 * Math.sin(a) + 0.15 * Math.sin(2.3 * a + 2 * phase)
            + 0.12 * Math.sin(3 * phase - 7 * lr + 0.3 * t);
        if (gPulse > 0) {                 // cometas de luz que viajan por las órbitas
            let pulses = 0;
            for (const [ringR, start, speed] of PULSES) {
                const d = mod(phi - start - speed * t + Math.PI, TAU) - Math.PI;
                const comet = d > 0 ? Math.exp(-((d / 0.18) ** 2)) : Math.exp(d / 0.9);
                pulses += comet * Math.exp(-(((lr - Math.log(ringR)) / 0.07) ** 2));
            }
            streak += 0.9 * gPulse * pulses;
        }
        gPhase = phase; gLr = lr;
        return streak;
    }

    // la cara trasera del disco, doblada sobre la sombra
    function lensedHalo(r, ang, t, w) {
        const top = 0.5 - 0.5 * Math.sin(ang - TILT);
        const side = Math.abs(Math.cos(ang - TILT)) ** 10;
        const o = r - 1.1 * R0;
        const band = Math.exp(-((Math.max(o, 0) / (0.2 * R0 + 0.24 * R0 * top + 0.45 * R0 * side)) ** 2))
            * Math.exp(-((Math.min(o, 0) / (0.2 * R0)) ** 2));
        const rho = (1 - side) * (R_IN + Math.max(r - R0, 0) * 2.6) + side * Math.max(r, R_IN);
        const flow = gas(ang - TILT, rho, t, w);
        return 1.2 * band * flow * (0.5 + 0.8 * top) * (1 - 0.25 * Math.cos(ang - TILT));
    }

    function tangentLetter(dx, dy) {
        const s = mod(Math.atan2(-dy, dx) * 180 / Math.PI, 180);
        if (s < 22.5 || s >= 157.5) return "-";
        if (s < 67.5) return "/";
        if (s < 112.5) return "|";
        return "\\";
    }

    // ---------- canvas ----------
    const cv = document.getElementById("bh-main"), ctx = cv.getContext("2d");
    const gl = document.getElementById("bh-glow"), gctx = gl.getContext("2d");
    let W, H, dpr, CW, CH, cols, rows, rnd, hsh;

    function seeded(seed) {            // aleatorio fijo, para que las estrellas no cambien al redimensionar
        return () => {
            seed |= 0; seed = seed + 0x6D2B79F5 | 0;
            let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = innerWidth; H = innerHeight;
        CW = W < 700 ? 10 : 7; CH = Math.round(CW * 11 / 7);   // celdas más grandes en celular
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        gl.width = Math.round(W / 4); gl.height = Math.round(H / 4);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
        cols = Math.ceil(W / CW); rows = Math.ceil(H / CH);
        const R = seeded(7);
        rnd = new Float32Array(cols * rows); hsh = new Uint8Array(cols * rows);
        for (let i = 0; i < rnd.length; i++) { rnd[i] = R(); hsh[i] = (R() * 12) | 0; }
        ctx.font = `${Math.round(CW * 12 / 7)}px Consolas, Menlo, "DejaVu Sans Mono", monospace`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
    }

    function draw(t, trail) {
        const ts = t, open = 1;           // la intro corre una sola vez y nunca se reinicia
        // estela: el frame anterior conserva ~40%; el nuevo se pega con "lighten" (equivale a MAX)
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = trail ? "rgba(0,0,0,0.6)" : "#000";
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "lighten";

        const aspect = W / H;
        const w = spin(t);
        const cam = smooth(smooth((ts - FLASH + 0.3) / 2.6)) * open;
        // pulso periódico: poco antes del destello se encoge un poquito, destella y vuelve a su tamaño
        const u = t - FLASH;
        let shrink = 0, extra = 0, since = u;
        if (PULSE_EVERY && u > PULSE_EVERY - 0.9) {
            const q = u % PULSE_EVERY, n = Math.floor(u / PULSE_EVERY);
            const pre = smooth((q - (PULSE_EVERY - 0.9)) / 0.9);   // se encoge en los 0.9 s previos
            const post = n >= 1 ? 1 - smooth(q / 1.2) : 0;          // y se recupera en 1.2 s
            shrink = Math.max(pre, post);
            since = q;
            if (n >= 1 || q > PULSE_EVERY / 2) {
                const sd = q > PULSE_EVERY / 2 ? q - PULSE_EVERY : q;
                extra = Math.exp(-((sd / 0.22) ** 2));
            }
        }
        const zoom = (1 + 0.28 * cam) * (1 - SHRINK * shrink), inc = INC + 0.09 * cam;
        const flash = Math.max(Math.exp(-(((ts - FLASH) / 0.22) ** 2)), extra);
        const ringK = smooth((ts - 0.3) / 2.2);
        const diskOn = smooth((ts - 5.0) / 2.8) * open;
        const auraK = smooth((ts - 2.2) / 1.8) * (1 - 0.65 * diskOn);
        const span = R0 + diskOn * (R_OUT * 1.1 - R0);
        const diskGate = smooth((ts - 5.0) / 0.8) * (0.55 + 0.45 * smooth((ts - FLASH + 0.3) / 0.4)) * open;
        const haloGate = smooth((ts - 5.0) / 2.2) * open;
        const ringGate = 0.9 + 0.3 * smooth((ts - 5) / 2);
        const front = R0 + since * 0.55;
        const shockFade = since > 0 ? Math.exp(-since / 0.5) * 0.9 : 0;
        gPulse = ts > FLASH ? smooth((ts - FLASH) / 1.0) * open : 0;

        for (let row = 0; row < rows; row++) {
            for (let c = 0; c < cols; c++) {
                const i = row * cols + c;
                const X0 = ((c + 0.5) / cols - 0.5 - OFFSET_X) * aspect;
                const Y0 = (row + 0.5) / rows - 0.5;
                const X = X0 / zoom, Y = (Y0 + 0.02 * cam) / zoom;
                const r = Math.hypot(X, Y), ang = Math.atan2(Y, X);

                // 1. anillo que se dibuja solo
                const around = mod(ang + Math.PI / 2, TAU) / TAU;
                const ring = Math.exp(-(((r - 1.02 * R0) / (0.045 * R0)) ** 2)) * smooth((ringK * 1.08 - around) / 0.08);

                // 2. aura que respira y se funde con los anillos del disco
                const rings = gas(ang - TILT, R_IN + Math.max(r - R0, 0) * 2.6, t, w);
                let puff = 0.5 + 0.5 * ripple(2 * ang, 5 * r - 0.45 * t, 0.35 * t);
                puff = puff * (1 - diskOn) + rings * diskOn;
                const reach = 0.32 * R0 * (0.7 + 0.6 * puff);
                const aura = auraK * Math.exp(-((Math.max(r - R0, 0) / reach) ** 1.6)) * (0.6 + 0.4 * puff);

                // 3. disco inclinado: se rota, se aplasta por INC y se pasa a radio/ángulo
                const u = X * COS_T + Y * SIN_T, v = -X * SIN_T + Y * COS_T;
                const rho = Math.hypot(u, v / inc), phi = Math.atan2(v / inc, u);
                const streak = gas(phi, rho, t, w);
                const phase = gPhase, lr = gLr;
                const edge = smooth((rho - R_IN) / (0.25 * R0)) * smooth((R_OUT - rho) / (2.2 * R0));
                let disk = 1.5 * edge * streak * (R_IN / rho);
                disk *= 1 - 0.25 * u / Math.max(rho, 1e-6);            // Doppler: el lado que se acerca brilla más
                disk *= diskGate * smooth((span - Math.abs(u)) / (0.6 * R0));

                const halo = lensedHalo(r, ang, t, w) * haloGate;
                const shock = ts > FLASH ? Math.exp(-(((r - front) / 0.02) ** 2)) * shockFade : 0;

                // mezcla "screen" en vez de max, para que todo se funda
                let soft = 1 - (1 - clamp(aura * 0.55, 0, 1)) * (1 - clamp(halo, 0, 1)) * (1 - clamp(disk, 0, 1));
                soft = Math.max(soft, disk, halo);
                let heat = Math.max(ring * ringGate, soft, shock) * (1 + 1.4 * flash);

                const inside = r < R0 * 0.97;
                if (inside) heat = v > 0 ? (disk > 0.2 ? disk : 0) : 0;   // la sombra tapa lo de atrás

                let ch = null, tag = DEEP, lum = 0;
                if (heat > 0.07) {
                    const level = clamp(Math.floor(heat * 3.6), 0, 3);
                    const pool = POOLS[level];
                    const k = mod(hsh[i] + Math.floor(phase * 2 + lr * 6), 12) % pool.length;
                    ch = pool[k];
                    if (ring > aura * 0.8 && ring > disk && ring > halo && ring > 0.25) ch = tangentLetter(-Math.sin(ang), Math.cos(ang));
                    tag = heat < 0.1 ? DEEP : heat < 0.2 ? RED : heat < 0.45 ? ORANGE : heat < 0.75 ? AMBER : HOT;
                    lum = clamp(0.42 + 0.85 * heat, 0, 1.3) * (0.35 + 0.65 * smooth((heat - 0.07) / 0.15));
                } else if (!inside) {
                    const n = rnd[i];
                    if (n < 0.0025) {                                        // estrellas
                        ch = n < 0.0005 ? "+" : n < 0.0012 ? "*" : ".";
                        tag = STAR; lum = 0.75 + 0.2 * Math.sin(0.8 * t + n * 9000);
                    } else if (ts > 4.0) {                                    // polvo en el plano del disco
                        const lane = Math.exp(-((((-X * SIN_T + Y * COS_T) - 0.02) / 0.09) ** 2));
                        if (n > 1 - 0.035 * lane) {
                            ch = n > 1 - 0.01 * lane ? ":" : ",";
                            tag = DUST; lum = 0.3 * smooth((ts - 4.0) / 3.0);
                        }
                    }
                }
                if (ch === null) continue;
                const col = TAG[tag];
                ctx.fillStyle = `rgb(${Math.min(255, col[0] * lum) | 0},${Math.min(255, col[1] * lum) | 0},${Math.min(255, col[2] * lum) | 0})`;
                ctx.fillText(ch, c * CW + CW / 2, row * CH + CH / 2);
            }
        }
        ctx.globalCompositeOperation = "source-over";

        // glow: copia reducida del canvas; el CSS la desenfoca y la suma encima
        gctx.drawImage(cv, 0, 0, gl.width, gl.height);
    }

    // ---------- bucle ----------
    resize();
    addEventListener("resize", resize);

    const still = matchMedia("(prefers-reduced-motion: reduce)");
    let last = 0, t = 0;


    function loop(ms) {
        requestAnimationFrame(loop);
        if (still.matches || ms - last < 1000 / FPS) return;
        // el tiempo se acumula; si la pestaña estuvo oculta no se saltea la intro
        const dt = last ? Math.min((ms - last) / 1000, 0.1) : 0;
        last = ms;
        t += dt;
        draw(t, true);
    }

    if (still.matches) draw(STATIC_T, false);
    addEventListener("resize", () => { if (still.matches) draw(STATIC_T, false); });
    requestAnimationFrame(loop);
})();