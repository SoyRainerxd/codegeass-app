// "Jaque al Imperio" — minijuego táctico inspirado en el ajedrez de Lelouch
// Rainer Cruz — ITLA 2025-0061
(function () {
  const N = 7;
  const boardEl = document.getElementById('board');
  const msgEl = document.getElementById('g-msg');
  const levelEl = document.getElementById('g-level');
  const capsEl = document.getElementById('g-caps');
  const bestEl = document.getElementById('g-best');
  const geassBtn = document.getElementById('g-geass');
  const restartBtn = document.getElementById('g-restart');

  const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
  const KING = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  let S; // estado
  let best = 0;
  try { best = parseInt(localStorage.getItem('geass_best') || '0', 10) || 0; } catch (e) {}

  const key = (r, c) => r * N + c;
  const inb = (r, c) => r >= 0 && r < N && c >= 0 && c < N;
  const rnd = n => Math.floor(Math.random() * n);

  function reachable(start, exit, walls) {
    const seen = new Set([key(...start)]);
    const q = [start];
    while (q.length) {
      const [r, c] = q.shift();
      if (r === exit[0] && c === exit[1]) return true;
      for (const [dr, dc] of KING) {
        const nr = r + dr, nc = c + dc;
        if (inb(nr, nc) && !walls.has(key(nr, nc)) && !seen.has(key(nr, nc))) { seen.add(key(nr, nc)); q.push([nr, nc]); }
      }
    }
    return false;
  }

  function newLevel(level, caps) {
    const player = [N - 1, 0];
    const exit = [0, N - 1];
    let walls, knights;
    do {
      walls = new Set();
      const nWalls = Math.min(3 + level, 11);
      while (walls.size < nWalls) {
        const r = rnd(N), c = rnd(N), k = key(r, c);
        if (k === key(...player) || k === key(...exit)) continue;
        // Mantener libre la vecindad inmediata del jugador
        if (Math.abs(r - player[0]) <= 1 && Math.abs(c - player[1]) <= 1) continue;
        walls.add(k);
      }
    } while (!reachable(player, exit, walls));
    knights = [];
    const nK = Math.min(1 + Math.floor(level / 2), 6);
    let tries = 0;
    while (knights.length < nK && tries++ < 500) {
      const r = rnd(N), c = rnd(N), k = key(r, c);
      const far = Math.max(Math.abs(r - player[0]), Math.abs(c - player[1])) >= 4;
      if (!far || walls.has(k) || k === key(...exit) || knights.some(x => key(x.r, x.c) === k)) continue;
      knights.push({ r, c, frozen: 0 });
    }
    return { level, caps, player, exit, walls, knights, over: false, geassLeft: 1, busy: false };
  }

  function render() {
    boardEl.innerHTML = '';
    const moves = S.over ? [] : validMoves();
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const b = document.createElement('button');
      b.className = 'cell ' + ((r + c) % 2 ? 'd' : 'l');
      let ch = '';
      const k = key(r, c);
      const kn = S.knights.find(x => x.r === r && x.c === c);
      if (S.walls.has(k)) { ch = '♟'; b.classList.add('pawn'); }
      if (r === S.exit[0] && c === S.exit[1]) { ch = '★'; b.classList.add('exit'); }
      if (kn) { ch = '♞'; b.classList.add('knight', 'occupied'); if (kn.frozen > 0) b.classList.add('frozen'); }
      if (r === S.player[0] && c === S.player[1]) { ch = '♚'; b.classList.add('king'); }
      b.textContent = ch;
      if (moves.some(m => m[0] === r && m[1] === c)) {
        b.classList.add('ok');
        b.addEventListener('click', () => move(r, c));
      }
      b.setAttribute('aria-label', `Fila ${r + 1}, columna ${c + 1}`);
      boardEl.appendChild(b);
    }
    levelEl.textContent = S.level;
    capsEl.textContent = S.caps;
    bestEl.textContent = best;
    geassBtn.textContent = `⚡ Orden absoluta (${S.geassLeft})`;
    geassBtn.disabled = S.over || S.geassLeft <= 0 || S.busy;
  }

  function validMoves() {
    return KING.map(([dr, dc]) => [S.player[0] + dr, S.player[1] + dc])
      .filter(([r, c]) => inb(r, c) && !S.walls.has(key(r, c)));
  }

  function say(text, cls) { msgEl.textContent = text; msgEl.className = 'g-msg ' + (cls || ''); }

  function move(r, c) {
    if (S.over || S.busy) return;
    S.player = [r, c];
    // Captura
    const i = S.knights.findIndex(k => k.r === r && k.c === c);
    if (i >= 0) { S.knights.splice(i, 1); S.caps++; say('¡Caballo capturado!'); }
    else say('');
    // ¿Salida?
    if (r === S.exit[0] && c === S.exit[1]) return win();
    // Turno de los caballos
    knightsTurn();
    if (S.over) return;
    render();
  }

  function knightsTurn() {
    for (const kn of S.knights) {
      if (kn.frozen > 0) { kn.frozen--; continue; }
      let bestMove = null, bestD = Infinity;
      for (const [dr, dc] of KNIGHT) {
        const nr = kn.r + dr, nc = kn.c + dc;
        if (!inb(nr, nc) || S.walls.has(key(nr, nc))) continue;
        if (S.knights.some(o => o !== kn && o.r === nr && o.c === nc)) continue;
        const d = (nr - S.player[0]) ** 2 + (nc - S.player[1]) ** 2;
        if (d < bestD) { bestD = d; bestMove = [nr, nc]; }
      }
      if (bestMove) { kn.r = bestMove[0]; kn.c = bestMove[1]; }
      if (kn.r === S.player[0] && kn.c === S.player[1]) return lose();
    }
  }

  function score() { return (S.level - 1) * 5 + S.caps; }

  function saveBest() {
    const s = score();
    if (s > best) { best = s; try { localStorage.setItem('geass_best', String(best)); } catch (e) {} }
  }

  function win() {
    S.over = true; S.busy = true;
    saveBest(); render();
    say(`¡Jaque mate! Nivel ${S.level} superado.`, 'win');
    setTimeout(() => { S = newLevel(S.level + 1, S.caps); say('Más caballos en camino. ¡Adelante!'); render(); }, 1300);
  }

  function lose() {
    S.over = true;
    saveBest(); render();
    say(`Un caballo te alcanzó. Puntos: ${score()}. Toca “Reiniciar”.`, 'lose');
  }

  geassBtn.addEventListener('click', () => {
    if (S.over || S.geassLeft <= 0) return;
    S.geassLeft--;
    S.knights.forEach(k => { k.frozen = 2; });
    say('«Quédense quietos.» Los caballos están congelados 2 turnos.');
    render();
  });
  restartBtn.addEventListener('click', () => { S = newLevel(1, 0); say('Tu rey ♚ se mueve 1 casilla en cualquier dirección. Entra a un ♞ para capturarlo.'); render(); });

  S = newLevel(1, 0);
  render();
})();
