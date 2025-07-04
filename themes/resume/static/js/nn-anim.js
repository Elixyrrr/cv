// static/js/nn-anim.js
// static/js/nn-anim.js
(() => {
  const canvas = document.getElementById('nn-canvas');
  const ctx    = canvas.getContext('2d');

  // ← Remplace ta fonction resize() par celle-ci :
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    // taille CSS : toujours full-screen
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    // taille réelle en pixels pour plus de résolution
    canvas.width  = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // on scale tout le contexte pour compenser
    ctx.scale(dpr, dpr);

    // et on met à jour W/H en coordonnées CSS
    W = window.innerWidth;
    H = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();


  // ————————————
  // Suivi du curseur (global)
  // ————————————
  const mouse = {
    x: W/2,
    y: H/2,
    active: false,
    speed: 0
  };

  window.addEventListener('mousemove', e => {
    mouse.active = true;
    const newX = e.clientX, newY = e.clientY;
    const dx = newX - mouse.x, dy = newY - mouse.y;
    mouse.speed = Math.hypot(dx, dy);
    mouse.x = newX;
    mouse.y = newY;
  });

  window.addEventListener('mouseout', () => {
    mouse.active = false;
  });

  // ————————————
  // Fond & étoiles
  // ————————————
  const bgGrad = ctx.createRadialGradient(
    W/2, H/2, Math.min(W,H)*0.05,
    W/2, H/2, Math.max(W,H)*0.8
  );
  bgGrad.addColorStop(0, '#0a0f19');
  bgGrad.addColorStop(1, '#03050a');

  const stars = Array.from({ length: 400 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5,
    a: Math.random() * 0.6 + 0.2,
    pulse: Math.random() * Math.PI * 2
  }));

  // ————————————
  // Nœuds & arêtes
  // ————————————
  const nodeCount = 60, k = 4;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    baseRadius: 2 + Math.random() * 3,
    vx: 0, vy: 0,
    attracted: false,
    originalRadius: 2 + Math.random() * 3
  }));

  const edges = [];
  nodes.forEach((n, i) => {
    nodes
      .map((o, j) => ({ j, d: Math.hypot(n.x - o.x, n.y - o.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(1, k + 1)
      .forEach(({ j }) => edges.push([i, j]));
  });

  // ————————————
  // Collections d’animations
  // ————————————
  const pulses     = [];
  const rings      = [];
  const tris       = [];

  // Pulses automatiques le long des arêtes
  function spawnAutoPulse() {
    const [i, j] = edges[Math.random() * edges.length | 0];
    pulses.push({
      i, j, t: 0,
      speed: 0.004 + Math.random() * 0.006
    });
  }
  setInterval(spawnAutoPulse, 150);

  // Anneaux autour de nœuds
  function spawnRing() {
    const node = nodes[Math.random() * nodes.length | 0];
    rings.push({
      x: node.x, y: node.y,
      r: 0, alpha: 0.8,
      speed: 1.5
    });
  }
  setInterval(spawnRing, 400);

  // Triangles tournants
  function spawnTri() {
    const node = nodes[Math.random() * nodes.length | 0];
    tris.push({
      x: node.x, y: node.y,
      size: 8 + Math.random() * 6,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      alpha: 0.7,
      life: 0.005 + Math.random() * 0.005
    });
  }
  setInterval(spawnTri, 300);

  // ————————————
  // Boucle d’animation
  // ————————————
  function draw() {
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const time = performance.now() * 0.002;

    // Étoiles scintillantes
    stars.forEach(s => {
      const a = s.a * (0.6 + 0.4 * Math.sin(time + s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });

    // Arêtes réactives à la proximité de la souris
    edges.forEach(([i, j]) => {
      const A = nodes[i], B = nodes[j];
      const midX = (A.x + B.x) / 2, midY = (A.y + B.y) / 2;
      let alpha = 0.15, lw = 1;
      if (mouse.active) {
        const d = Math.hypot(midX - mouse.x, midY - mouse.y);
        if (d < 100) {
          alpha = 0.15 + (1 - d / 100) * 0.5;
          lw = 1 + (1 - d / 100) * 2;
        }
      }
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    });

    // Pulses le long des arêtes
    pulses.forEach((p, idx) => {
      p.t += p.speed;
      if (p.t >= 1) return pulses.splice(idx, 1);
      const A = nodes[p.i], B = nodes[p.j];
      const x = A.x + (B.x - A.x) * p.t;
      const y = A.y + (B.y - A.y) * p.t;
      const alpha = 1 - p.t;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0,200,255,${alpha})`;
      ctx.fill();
    });

    // Anneaux autour des nœuds
    rings.forEach((r, i) => {
      r.r     += r.speed;
      r.alpha -= 0.015;
      if (r.alpha <= 0) return rings.splice(i, 1);
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(0,200,255,${r.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Triangles éphémères
    tris.forEach((t, i) => {
      t.angle += t.rotSpeed;
      t.alpha -= t.life;
      if (t.alpha <= 0) return tris.splice(i, 1);
      ctx.save();
      ctx.translate(t.x, t.y);
      ctx.rotate(t.angle);
      ctx.beginPath();
      for (let k = 0; k < 3; k++) {
        const ang = (2 * Math.PI / 3) * k;
        const px  = Math.cos(ang) * t.size;
        const py  = Math.sin(ang) * t.size;
        k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,200,255,${t.alpha})`;
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.restore();
    });

    // Nœuds pulsants + interaction magnétique
    nodes.forEach(n => {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (mouse.active && d < 200) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const f = (200 - d) / 200;
        n.vx += dx * 0.0003 * f;
        n.vy += dy * 0.0003 * f;
        n.baseRadius = n.originalRadius * (1 + f * 0.5);
        n.attracted = true;
      } else {
        n.attracted = false;
        n.baseRadius = n.originalRadius;
      }
      n.vx *= 0.95; n.vy *= 0.95;
      n.x += n.vx;  n.y += n.vy;

      const pf = 0.7 + 0.3 * Math.sin(time + (n.x + n.y) * 0.006);
      const rad = n.baseRadius * (n.attracted ? pf * 1.5 : pf);
      let alpha = 0.5 + 0.5 * Math.sin(time * 1.4 + (n.x - n.y) * 0.006);
      if (n.attracted) alpha = Math.min(1, alpha + 0.3);

      ctx.beginPath();
      ctx.arc(n.x, n.y, rad, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0,200,255,${alpha})`;
      ctx.fill();

      if (n.attracted && d < 100) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 2, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255,100,255,${0.3 * (1 - d / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
