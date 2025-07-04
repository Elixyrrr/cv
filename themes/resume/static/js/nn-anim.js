(() => {
  const canvas = document.getElementById('nn-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, lastDpr = window.devicePixelRatio || 1;

  // data
  const stars  = [];
  const nodes  = [];
  const edges  = [];
  const pulses = [];

  // initialisation
  function initStars() {
    stars.length = 0;
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5,
        a: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function initNodesAndEdges() {
    nodes.length = 0;
    edges.length = 0;
    const nodeCount = 60, k = 4;
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2 + Math.random() * 3;
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        baseRadius: radius,
        originalRadius: radius,
        vx: 0, vy: 0, attracted: false
      });
    }
    nodes.forEach((n,i) => {
      nodes
        .map((o,j) => ({ j, d: Math.hypot(n.x - o.x, n.y - o.y) }))
        .sort((a,b) => a.d - b.d)
        .slice(1, k+1)
        .forEach(({ j }) => edges.push([i, j]));
    });
  }

  // ajuste la résolution & redémarre les données
 function adjustSize() {
    const dpr = window.devicePixelRatio || 1;
    // taille réelle en CSS-pixels
    const { width: cw, height: ch } = canvas.getBoundingClientRect();
    if ( dpr !== lastDpr || cw !== W || ch !== H ) {
      lastDpr = dpr;
      W = cw; H = ch;
      // taille du backing-store en device-pixels
      canvas.width  = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
      initNodesAndEdges();
      pulses.length = 0;
    }
  }

  // écouteurs classiques + visualViewport pour iOS
  window.addEventListener('resize', adjustSize);
  if (window.visualViewport) {
    visualViewport.addEventListener('resize', adjustSize);
    visualViewport.addEventListener('scroll', adjustSize);
  }
  adjustSize();

  // gestion souris
  const mouse = { x: W/2, y: H/2, active: false, speed: 0 };
  window.addEventListener('mousemove', e => {
    mouse.active = true;
    const dx = e.clientX - mouse.x;
    const dy = e.clientY - mouse.y;
    mouse.speed = Math.hypot(dx, dy);
    mouse.x = e.clientX; mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => mouse.active = false);

  // pulses automatiques
  function spawnAutoPulse() {
    const [i,j] = edges[Math.random() * edges.length | 0];
    pulses.push({ i, j, t: 0, speed: 0.004 + Math.random()*0.006 });
  }
  setInterval(spawnAutoPulse, 150);

  // boucle de dessin
  function draw() {
    // vérifier on-the-fly si la zone visuelle a bougé
     adjustSize();

    // fond
    const bg = ctx.createRadialGradient(
      W/2, H/2, Math.min(W,H)*0.05,
      W/2, H/2, Math.max(W,H)*0.8
    );
    bg.addColorStop(0, '#0a0f19');
    bg.addColorStop(1, '#03050a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const time = performance.now() * 0.002;

    // étoiles
    stars.forEach(s => {
      const alpha = s.a * (0.6 + 0.4 * Math.sin(time + s.pulse));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });

    // arêtes
    edges.forEach(([i,j]) => {
      const A = nodes[i], B = nodes[j];
      const midX = (A.x + B.x)/2, midY = (A.y + B.y)/2;
      let alpha = 0.15, lw = 1;
      if (mouse.active) {
        const d = Math.hypot(midX - mouse.x, midY - mouse.y);
        if (d < 100) {
          alpha = 0.15 + (1 - d/100)*0.5;
          lw    = 1 + (1 - d/100)*2;
        }
      }
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
      ctx.lineWidth = lw;
      ctx.stroke();
    });

    // pulses
    pulses.forEach((p, idx) => {
      p.t += p.speed;
      if (p.t >= 1) return pulses.splice(idx, 1);
      const A = nodes[p.i], B = nodes[p.j];
      const x = A.x + (B.x - A.x)*p.t;
      const y = A.y + (B.y - A.y)*p.t;
      const a = 1 - p.t;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, 2*Math.PI);
      ctx.fillStyle = `rgba(0,200,255,${a})`;
      ctx.fill();
    });

    // nœuds
    nodes.forEach(n => {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (mouse.active && d < 200) {
        const f = (200 - d)/200;
        n.vx += (n.x - mouse.x)*0.0003*f;
        n.vy += (n.y - mouse.y)*0.0003*f;
        n.baseRadius = n.originalRadius*(1 + f*0.5);
        n.attracted = true;
      } else {
        n.attracted = false;
        n.baseRadius = n.originalRadius;
      }
      n.vx *= 0.95; n.vy *= 0.95;
      n.x += n.vx; n.y += n.vy;

      const pf  = 0.7 + 0.3*Math.sin(time + (n.x + n.y)*0.006);
      const rad = n.baseRadius*(n.attracted ? pf*1.5 : pf);
      let a = 0.5 + 0.5*Math.sin(time*1.4 + (n.x - n.y)*0.006);
      if (n.attracted) a = Math.min(1, a + 0.3);

      ctx.beginPath();
      ctx.arc(n.x, n.y, rad, 0, 2*Math.PI);
      ctx.fillStyle = `rgba(0,200,255,${a})`;
      ctx.fill();

      if (n.attracted && d < 100) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad*2, 0, 2*Math.PI);
        ctx.strokeStyle = `rgba(255,100,255,${0.3*(1 - d/100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
