(() => {
  const field = document.querySelector('.icon-field');
  if (!field) return;

  const icons = Array.from(document.querySelectorAll('.float-icon'));
  if (!icons.length) return;

  // Config
  const SPEED_MIN = 70;   // px/sec
  const SPEED_MAX = 130;  // px/sec
  const BOUNCE_PAD = 8;   // padding from edges
  const FPS_SMOOTHING = 0.015; // for delta time smoothing

  // State
  let W = 0, H = 0;
  const balls = []; // {el,x,y,vx,vy,w,h}

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pickSign() { return Math.random() < 0.5 ? -1 : 1; }

  function measure() {
    const rect = field.getBoundingClientRect();
    W = rect.width; H = rect.height;
    icons.forEach((el, i) => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!balls[i]) {
        const speed = rand(SPEED_MIN, SPEED_MAX);
        const angle = rand(0, Math.PI * 2);
        balls[i] = {
          el,
          x: rand(BOUNCE_PAD, Math.max(BOUNCE_PAD, W - w - BOUNCE_PAD)),
          y: rand(BOUNCE_PAD, Math.max(BOUNCE_PAD, H - h - BOUNCE_PAD)),
          vx: Math.cos(angle) * speed * pickSign(),
          vy: Math.sin(angle) * speed * pickSign(),
          w, h
        };
      } else {
        balls[i].w = w; balls[i].h = h;
        // keep inside on resize
        balls[i].x = Math.min(Math.max(BOUNCE_PAD, balls[i].x), W - w - BOUNCE_PAD);
        balls[i].y = Math.min(Math.max(BOUNCE_PAD, balls[i].y), H - h - BOUNCE_PAD);
      }
    });
  }

  // initial positioning so icons don’t overlap the center card too much (optional)
  function nudgeAwayFromCenter() {
    const cx = W / 2, cy = H / 2, radius = Math.min(W, H) * 0.22;
    balls.forEach(b => {
      const dx = b.x + b.w / 2 - cx;
      const dy = b.y + b.h / 2 - cy;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < radius) {
        const ux = dx / dist, uy = dy / dist;
        b.x = cx + ux * radius - b.w / 2;
        b.y = cy + uy * radius - b.h / 2;
      }
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    });
  }

  let last = performance.now();
  let dtAvg = 0.016;

  function tick(now) {
    const dt = Math.max(0.001, Math.min(0.05, (now - last) / 1000));
    dtAvg = dtAvg + (dt - dtAvg) * FPS_SMOOTHING;
    last = now;

    for (const b of balls) {
      // move
      b.x += b.vx * dtAvg;
      b.y += b.vy * dtAvg;

      // wall collisions
      if (b.x <= BOUNCE_PAD) { b.x = BOUNCE_PAD; b.vx *= -1; }
      if (b.y <= BOUNCE_PAD) { b.y = BOUNCE_PAD; b.vy *= -1; }
      if (b.x + b.w >= W - BOUNCE_PAD) { b.x = W - BOUNCE_PAD - b.w; b.vx *= -1; }
      if (b.y + b.h >= H - BOUNCE_PAD) { b.y = H - BOUNCE_PAD - b.h; b.vy *= -1; }

      // apply transform
      b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    }

    requestAnimationFrame(tick);
  }

  // Pause motion when tab not visible (battery/perf friendly)
  document.addEventListener('visibilitychange', () => {
    last = performance.now();
  });

  // Re-measure on resize & orientation changes
  const ro = new ResizeObserver(() => { measure(); nudgeAwayFromCenter(); });
  ro.observe(field);
  window.addEventListener('orientationchange', () => {
    setTimeout(() => { measure(); nudgeAwayFromCenter(); }, 250);
  });

  // Init
  measure();
  nudgeAwayFromCenter();
  requestAnimationFrame(tick);
})();