/**
 * Hero visual: a field of fine lines that drifts in turbulence and pulls into
 * parallel order as the visitor scrolls, or wherever the pointer rests.
 * Chaos to clarity, drawn live.
 *
 * Budget rules: starts only after load and an idle slot, so it never competes
 * with first paint; pauses offscreen and in background tabs; caps pixel density;
 * draws one static frame for reduced motion or data saver.
 */
type Conn = { saveData?: boolean };

export function mountFlowField(canvas: HTMLCanvasElement, scrollHost: HTMLElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: Conn }).connection?.saveData === true;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let count = 0;
  let particles = new Float32Array(0);
  let t = 0;
  let order = 0.15;
  let stroke = '';
  let running = false;
  let visible = true;
  let raf = 0;
  let pointerX = -1e6;
  let pointerY = -1e6;

  const readColor = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    stroke = dark ? 'rgba(245, 245, 220, 0.34)' : 'rgba(47, 64, 89, 0.42)';
  };

  const spawn = (i: number, anywhere: boolean) => {
    const o = i * 4;
    particles[o] = anywhere ? Math.random() * w : Math.random() * w * (1 - order * 0.85);
    particles[o + 1] = Math.random() * h;
    particles[o + 2] = 0;
    particles[o + 3] = 90 + Math.random() * 160;
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    w = Math.max(1, Math.floor(rect.width * dpr));
    h = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    count = Math.round(Math.min(950, Math.max(260, (rect.width * rect.height) / 1050)));
    particles = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) spawn(i, true);
    ctx.clearRect(0, 0, w, h);
  };

  const angle = (x: number, y: number, localOrder: number) => {
    const s = 0.0021 / dpr;
    const chaos =
      (Math.sin(x * s + t * 0.6) + Math.cos(y * s * 1.3 - t * 0.45) + Math.sin((x + y) * s * 0.6 + t * 0.25)) * 1.3;
    const calm = Math.sin(y * s * 3 + t * 0.3) * 0.07;
    return chaos + (calm - chaos) * localOrder;
  };

  const scrollProgress = () => {
    const rect = scrollHost.getBoundingClientRect();
    return Math.min(1, Math.max(0, -rect.top / (rect.height * 0.75)));
  };

  const step = () => {
    const breathing = 0.12 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.18));
    const target = Math.max(breathing, 0.1 + 0.9 * scrollProgress());
    order += (target - order) * 0.05;
    t += 0.0045;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.15 * dpr;
    ctx.beginPath();
    const speed = (1.05 + order * 0.95) * dpr;
    const radius = 170 * dpr;
    const r2 = radius * radius;
    for (let i = 0; i < count; i++) {
      const o = i * 4;
      const x = particles[o];
      const y = particles[o + 1];
      const dx = x - pointerX;
      const dy = y - pointerY;
      const d2 = dx * dx + dy * dy;
      const local = d2 < r2 ? order + (1 - order) * (1 - Math.sqrt(d2) / radius) : order;
      const a = angle(x, y, local);
      const nx = x + Math.cos(a) * speed;
      const ny = y + Math.sin(a) * speed;
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      particles[o] = nx;
      particles[o + 1] = ny;
      particles[o + 2] += 1;
      if (nx < 0 || nx > w || ny < 0 || ny > h || particles[o + 2] > particles[o + 3]) spawn(i, false);
    }
    ctx.stroke();
  };

  const loop = () => {
    if (!running) return;
    step();
    raf = requestAnimationFrame(loop);
  };

  const play = () => {
    if (running || !visible || document.hidden) return;
    running = true;
    raf = requestAnimationFrame(loop);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const drawStatic = () => {
    order = 0.92;
    for (let n = 0; n < 160; n++) step();
  };

  const start = () => {
    readColor();
    resize();
    canvas.classList.add('is-live');
    if (reduce || saveData) {
      drawStatic();
      return;
    }

    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      },
      { threshold: 0 },
    ).observe(canvas);

    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));

    if (window.matchMedia('(pointer: fine)').matches) {
      scrollHost.addEventListener('pointermove', (event) => {
        const rect = canvas.getBoundingClientRect();
        pointerX = (event.clientX - rect.left) * dpr;
        pointerY = (event.clientY - rect.top) * dpr;
      });
      scrollHost.addEventListener('pointerleave', () => {
        pointerX = -1e6;
        pointerY = -1e6;
      });
    }
    play();
  };

  let resizeTimer = 0;
  new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!canvas.classList.contains('is-live')) return;
      resize();
      if (reduce || saveData) drawStatic();
    }, 160);
  }).observe(canvas);

  new MutationObserver(() => {
    readColor();
    ctx.clearRect(0, 0, w, h);
    if (reduce || saveData) drawStatic();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  const idle = (cb: () => void) =>
    'requestIdleCallback' in window
      ? (window as Window & { requestIdleCallback: (cb: () => void, o?: object) => number }).requestIdleCallback(cb, {
          timeout: 2000,
        })
      : window.setTimeout(cb, 600);

  if (document.readyState === 'complete') idle(start);
  else window.addEventListener('load', () => idle(start), { once: true });
}
