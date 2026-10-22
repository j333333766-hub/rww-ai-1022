// 3단계 「읽걷쓰AI 함께 생각하기」 퀴즈: 빈칸(낱말 끌어 놓기)·OX·객관식·연결하기(선 잇기) 10문항, 한 문제씩 채점.
// 근거: 조병영(2024) 학교를 삶으로(4P), 인천시교육청 읽걷쓰AI 활용 가이드라인(H-A-H·5대 원칙·연령별 방향), 강사 원고.
import { el } from './common.js';

export const QUIZ = [
  { type: 'blank', label: '읽걷쓰의 정의',
    q: '읽걷쓰는 “앎과 (   )이 연결되고, 일상이 곧 배움이 되는 교육”이에요.',
    answers: ['삶'], show: '삶', bank: ['지식', '삶', '기술', '놀이'],
    explain: '읽걷쓰는 앎과 삶이 연결되고 일상이 곧 배움이 되는 교육이에요. (조병영, 2024)' },
  { type: 'match', label: '4P와 역량',
    q: '4P 학습 맥락과 그 속에서 기르는 역량을 선으로 이으세요.',
    left: ['현상', '문제', '과업', '실천'], right: ['관찰', '질문', '탐구', '행동'], answer: [0, 1, 2, 3],
    explain: '현상-관찰, 문제-질문, 과업-탐구, 실천-행동. 현상을 관찰하고 문제를 질문으로 만들고, 과업을 탐구하고, 삶에서 실천해요.' },
  { type: 'ox', label: '읽걷쓰의 순서',
    q: '읽걷쓰 수업은 반드시 ‘읽기 → 걷기 → 쓰기’ 순서로 짜야 한다.',
    answer: false,
    explain: '아니에요. 읽기·걷기·쓰기의 순서와 형식에 얽매이지 않고 학습 상황과 목적에 맞게 유연하게 조직해요.' },
  { type: 'match', label: '읽기·걷기·쓰기',
    q: '읽기·걷기·쓰기와 그 뜻을 선으로 이으세요.',
    left: ['읽기', '걷기', '쓰기'],
    right: ['글·데이터·매체·현상을 관찰하고 이해한다', '일상과 현장에서 직접 경험한다', '배운 것을 표현·공유하며 성찰한다'], answer: [0, 1, 2],
    explain: '읽기는 관찰하고 이해하기, 걷기는 직접 경험하기, 쓰기는 표현·공유하며 성찰하기예요.' },
  { type: 'blank', label: 'H-A-H의 H',
    q: 'H-A-H에서 H는 영어 낱말 (   )의 첫 글자예요.',
    answers: ['human', '휴먼', '사람', '인간'], show: 'Human(사람)', bank: ['Hint', 'Human', 'Habit', 'Hybrid'],
    explain: 'H-A-H는 Human → AI → Human, 사람에서 AI로 다시 사람으로 이어지는 순환이에요. (읽걷쓰AI 활용 가이드라인)' },
  { type: 'choice', label: 'A(AI)의 역할',
    q: 'H-A-H에서 가운데 A(AI)가 맡는 일로 가장 알맞은 것은?',
    options: ['질문과 목적을 세운다', '탐색과 확장을 돕는다', '결과를 검증하고 판단한다', '학생의 최종 점수를 정한다'], answer: 1,
    explain: '사람이 질문과 목적을 세우고(H), AI는 탐색과 확장을 돕고(A), 다시 사람이 결과를 검증하고 판단해요(H).' },
  { type: 'ox', label: '읽걷쓰AI의 핵심',
    q: '읽걷쓰AI의 핵심은 AI 도구의 기능과 사용법을 익히는 것이다.',
    answer: false,
    explain: '아니에요. AI를 배우는 교육이 아니라, AI와 함께 읽고 걷고 쓰되 주도권은 사람이 갖는 교육이에요.' },
  { type: 'choice', label: 'AI 활용 5대 원칙',
    q: '“AI가 도와준 부분은 ‘AI 도움받음’이라고 표시해요.”는 AI 활용 5대 원칙 중 무엇일까요?',
    options: ['학생 주도성', '비판적 사고', '보안(개인정보)', '투명성'], answer: 3,
    explain: '투명성 원칙이에요. 과제나 보고서에 AI 활용 여부를 구체적으로 남기고, 저작권과 학습윤리를 지켜요. (읽걷쓰AI 활용 가이드라인)' },
  { type: 'choice', label: '초5~중3 활용 방향',
    q: '읽걷쓰AI 활용 가이드라인에서 초5~중3(12~16세)의 AI 활용 방향은?',
    options: ['감각 놀이 중심의 기초 형성', 'AI 원리 이해와 ‘긴 글쓰기’ 등 독립적 사고력 완성', '통제된 환경에서 AI 활용 및 결과물 비판적 검토 강화', 'AI 주도적 활용(협업 결과물 도출)'], answer: 2,
    explain: '초5~중3은 통제된 환경에서 AI를 활용하고 결과물을 비판적으로 검토하는 힘을 기르는 시기예요. (영유아 감각 놀이 → 초3~4 독립적 사고력 → 초5~중3 비판적 검토 → 고등 주도적 활용)' },
  { type: 'blank', label: '설계 질문의 전환',
    q: '“AI를 쓸까, 말까?”가 아니라 “AI 앞뒤에 학생의 (   )를 어떻게 배치할까?”가 수업 설계의 질문이에요.',
    answers: ['사고', '생각'], show: '사고', bank: ['점수', '도구', '사고', '속도'],
    explain: 'AI를 켜기 전에 학생이 먼저 생각하고(H), AI 뒤에 다시 학생이 검증·판단(H)하도록 수업을 설계해요.' },
];
export const N = QUIZ.length;
const KIND = { blank: '빈칸 채우기', ox: 'OX', choice: '객관식', match: '연결하기' };
const KIND_ICON = { blank: '✍️', ox: '⭕', choice: '☑️', match: '🔗' };
// 문제마다 돌아가며 한마디 하는 읽·걷·쓰 캐릭터(1·4·7·10번 읽음, 2·5·8번 걷구, 3·6·9번 쓰득)
export const CHARS = [
  { id: 'read', name: '읽음', ga: '읽음이', img: 'img/ch-read.png' },
  { id: 'walk', name: '걷구', ga: '걷구가', img: 'img/ch-walk.png' },
  { id: 'write', name: '쓰득', ga: '쓰득이', img: 'img/ch-write.png' },
];
// AI가 답하지 못할 때(연결 끊김·한도·느림) 대신 보여 줄 캐릭터 말
const FALLBACK = {
  read: { ok: '선생님, 핵심 문장에 밑줄을 정확히 그으셨어요. 이 개념을 내일 수업의 첫 질문으로 꺼내 보면 어떨까요?',
    ng: '선생님, 충분히 그렇게 읽힐 수 있는 문제였어요. 해설의 핵심 한 줄에 밑줄을 그어 보면 금방 잡혀요.' },
  walk: { ok: '선생님, 한 걸음에 정답까지 성큼 오셨네요! 이 생각을 교실 밖 경험과 이어 보면 더 멀리 갈 수 있어요.',
    ng: '선생님, 길을 잠깐 돌아왔을 뿐이에요. 정답 쪽으로 한 발짝 옮겨 다시 걸어 보면 길이 또렷해져요.' },
  write: { ok: '선생님, 생각이 또렷하게 정리되어 있네요. 지금 떠오른 수업 아이디어를 한 줄 메모해 두세요.',
    ng: '선생님, 헷갈린 지점이 바로 배움이 쌓이는 자리예요. 정답의 핵심을 내 말로 한 줄 써 보면 오래 남아요.' },
};
const AI_WAIT_MS = 9000;
const LINE_COLORS = ['#1e8fd6', '#be0081', '#ed7833', '#3db271'];

const norm = (s) => String(s || '').toLowerCase().replace(/[\s.()·'"‘’“”]/g, '');

// 답 하나를 채점: 맞으면 true
export function isRight(q, a) {
  if (a == null || a === '') return false;
  if (q.type === 'blank') return q.answers.some((x) => norm(a) === norm(x));
  if (q.type === 'ox') return a === (q.answer ? 'O' : 'X');
  if (q.type === 'choice') return Number(a) === q.answer;
  if (q.type === 'match') return a === q.answer.join('');
  return false;
}
export const answered = (q, a) => (q.type === 'match' ? typeof a === 'string' && a.length === q.left.length && !a.includes('-') : a != null && String(a).trim() !== '');

export function answerText(q, a) {
  if (q.type === 'blank' || q.type === 'ox') return a || '';
  if (q.type === 'choice') return a == null || a === '' ? '' : `${Number(a) + 1}. ${q.options[Number(a)]}`;
  if (q.type === 'match') return (a || '').split('').map((r, i) => `${q.left[i]}-${r === '-' ? '?' : (q.right[Number(r)].length > 8 ? '①②③④'[Number(r)] : q.right[Number(r)])}`).join(', ');
  return '';
}
export function rightText(q) {
  if (q.type === 'blank') return q.show;
  if (q.type === 'ox') return q.answer ? 'O' : 'X';
  if (q.type === 'choice') return `${q.answer + 1}. ${q.options[q.answer]}`;
  if (q.type === 'match') return q.left.map((l, i) => `${l}-${q.right[q.answer[i]]}`).join(', ');
  return '';
}

// 연결하기 오른쪽 보기 순서(정답이 나란히 놓이지 않게, 모두에게 같은 순서)
const SHUFFLE = { 1: [2, 0, 3, 1], 3: [1, 2, 0] };
export const rightOrder = (qi) => SHUFFLE[qi] || QUIZ[qi].right.map((_, i) => i);

// ---------- 축하 효과(색종이) ----------
const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function confetti(host, x, y) {
  if (reduceMotion()) return;
  const cv = el('canvas', { class: 'qz-confetti' });
  host.append(cv);
  const r = host.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  cv.width = r.width * dpr; cv.height = r.height * dpr;
  const g = cv.getContext('2d'); g.scale(dpr, dpr);
  const colors = ['#ed7833', '#3db271', '#1e8fd6', '#f9c04c', '#e7464c', '#7dbe3e', '#be0081'];
  const ps = Array.from({ length: 130 }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1, sp = 6 + Math.random() * 9;
    return { x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: 5 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      c: colors[(Math.random() * colors.length) | 0], shape: Math.random() < 0.3 ? 'c' : 'r' };
  });
  const t0 = performance.now();
  (function frame(t) {
    const dt = Math.min(2, (t - (frame.last || t)) / 16.7); frame.last = t;
    g.clearRect(0, 0, r.width, r.height);
    for (const p of ps) {
      p.vy += 0.32 * dt; p.vx *= 0.99; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.fillStyle = p.c;
      g.globalAlpha = Math.max(0, 1 - (t - t0) / 1900);
      if (p.shape === 'c') { g.beginPath(); g.arc(0, 0, p.s / 2, 0, Math.PI * 2); g.fill(); } else g.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
      g.restore();
    }
    if (t - t0 < 1900) requestAnimationFrame(frame); else cv.remove();
  })(t0);
}

// ---------- 한 문제씩 푸는 퀴즈 ----------
// saved = { ans: [...], res: [true|false|null ×10], i } (중간에 새로고침해도 이어진다)
// opts.onSave(saved), opts.onGraded(ans, res) — 한 문제 채점할 때마다(강사 화면 실시간),
// opts.onFinish(ans, res) — 마지막 문제를 확인하고 [결과 보기]를 누르면
// 글자가 한 자씩 써지듯 나타난다(움직임 줄이기 설정이면 한 번에)
export function typeIn(node, text) {
  node.textContent = '';
  node.classList.add('typing');
  if (reduceMotion()) { node.textContent = text; node.classList.remove('typing'); return; }
  let k = 0;
  const step = () => {
    k = Math.min(text.length, k + 2);
    node.textContent = text.slice(0, k);
    if (k < text.length) setTimeout(step, 28); else node.classList.remove('typing');
  };
  step();
}

export class QuizPlayer {
  constructor(box, saved, opts) {
    this.box = box; this.opts = opts;
    this.ans = (saved && saved.ans) || [];
    this.res = (saved && saved.res) || new Array(N).fill(null);
    this.i = Math.min((saved && saved.i) || 0, N - 1);
    this.ai = (saved && saved.ai) || {};   // 문제별 캐릭터 한마디 { t: 글, s: 'ai' | 'fb' } — 새로고침해도 다시 부르지 않게
    this.asking = {};
    this.box.innerHTML = '';
    this.stage = el('div', { class: 'qz-stage' });
    this.box.append(this.stage);
    this.ro = new ResizeObserver(() => this.drawLines && this.drawLines());
    this.render();
  }
  save() { this.opts.onSave({ ans: this.ans, res: this.res, i: this.i, ai: this.ai }); }
  get score() { return this.res.filter((x) => x === true).length; }

  render() {
    const q = QUIZ[this.i], qi = this.i, done = this.res[qi] !== null;
    this.drawLines = null;
    this.ro.disconnect();
    const dots = el('div', { class: 'qz-dots' }, QUIZ.map((_, k) => el('span', {
      class: 'qz-dot' + (k === qi ? ' now' : '') + (this.res[k] === true ? ' ok' : this.res[k] === false ? ' ng' : ''), title: `${k + 1}번` })));
    const head = el('div', { class: 'qz-top' },
      el('div', { class: 'qz-count' }, el('b', {}, String(qi + 1)), ` / ${N}`),
      dots,
      el('div', { class: 'qz-scorechip' }, '★ ', el('b', { class: 'qz-score' }, String(this.score))));
    const card = el('div', { class: 'qz-card' + (done ? (this.res[qi] ? ' is-ok' : ' is-ng') : '') },
      el('div', { class: 'qz-kindtag t-' + q.type }, `${KIND_ICON[q.type]} ${KIND[q.type]}`),
      el('div', { class: 'qz-title' }, q.q.replace('(   )', '(　　)')));
    const play = el('div', { class: 'qz-play' });
    card.append(play);
    this.play = play; this.card = card;
    ({ blank: () => this.blank(q, qi, done), ox: () => this.ox(q, qi, done), choice: () => this.choice(q, qi, done), match: () => this.match(q, qi, done) })[q.type]();
    const check = el('button', { class: 'qz-check', type: 'button' }, '확인하기');
    check.disabled = done || !answered(q, this.ans[qi]);
    check.onclick = () => this.grade();
    this.checkBtn = check;
    const foot = el('div', { class: 'qz-foot' });
    card.append(foot);
    if (done) foot.append(this.feedback(q, qi)); else foot.append(check);
    this.stage.innerHTML = '';
    this.stage.append(head, card);
    if (this.drawLines) {
      // 바로 한 번 그리고, 카드가 들어오는(흔들리는) 움직임이 끝나면 점 위치를 다시 재서 그린다
      this.drawLines();
      this.ro.observe(play);
      card.addEventListener('animationend', () => this.drawLines && this.drawLines());
      requestAnimationFrame(() => this.drawLines && this.drawLines());
    }
  }
  changed() { this.checkBtn.disabled = !answered(QUIZ[this.i], this.ans[this.i]); this.save(); }

  // ----- 빈칸: 낱말을 끌어 빈칸에 놓기(눌러도 들어감) -----
  blank(q, qi, done) {
    const [before, after] = q.q.split('(   )');
    const slot = el('span', { class: 'qz-slot' + (this.ans[qi] ? ' filled' : ''), 'data-drop': '1' }, this.ans[qi] || '여기에 놓기');
    if (done) slot.classList.add(this.res[qi] ? 'right' : 'wrong');
    this.card.querySelector('.qz-title').replaceChildren(before, slot, after);
    if (!done) slot.onclick = () => { if (this.ans[qi]) { this.ans[qi] = ''; this.render(); this.save(); } };
    const bank = el('div', { class: 'qz-bank' });
    for (const w of q.bank) {
      const chip = el('span', { class: 'qz-word' + (this.ans[qi] === w ? ' used' : ''), role: 'button', tabindex: '0' }, w);
      if (!done) {
        chip.addEventListener('pointerdown', (e) => this.dragWord(e, chip, w, slot, qi));
        chip.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { this.ans[qi] = w; this.render(); this.save(); } });
      }
      bank.append(chip);
    }
    this.play.append(el('div', { class: 'qz-hint' }, done ? '' : '낱말을 끌어 빈칸에 놓거나, 눌러서 넣어요'), bank);
  }
  dragWord(e, chip, w, slot, qi) {
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY, rect = chip.getBoundingClientRect();
    let ghost = null, over = false;
    const move = (ev) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
        ghost = chip.cloneNode(true); ghost.classList.add('qz-ghost');
        Object.assign(ghost.style, { width: rect.width + 'px', left: rect.left + 'px', top: rect.top + 'px' });
        document.body.append(ghost); chip.classList.add('lifting');
      }
      if (!ghost) return;
      ghost.style.left = rect.left + ev.clientX - sx + 'px'; ghost.style.top = rect.top + ev.clientY - sy + 'px';
      const s = slot.getBoundingClientRect();
      over = ev.clientX > s.left - 20 && ev.clientX < s.right + 20 && ev.clientY > s.top - 24 && ev.clientY < s.bottom + 24;
      slot.classList.toggle('hover', over);
    };
    const up = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      slot.classList.remove('hover'); chip.classList.remove('lifting');
      if (ghost) {
        if (over) {
          const s = slot.getBoundingClientRect();
          ghost.classList.add('landing');
          Object.assign(ghost.style, { left: s.left + 'px', top: s.top + 'px' });
          setTimeout(() => { ghost.remove(); this.ans[qi] = w; this.render(); this.save(); this.card.querySelector('.qz-slot').classList.add('pop'); }, 160);
        } else { ghost.classList.add('back'); Object.assign(ghost.style, { left: rect.left + 'px', top: rect.top + 'px' }); setTimeout(() => ghost.remove(), 220); }
      } else { this.ans[qi] = w; this.render(); this.save(); this.card.querySelector('.qz-slot').classList.add('pop'); }
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  }

  // ----- OX -----
  ox(q, qi, done) {
    const row = el('div', { class: 'qz-ox2' });
    for (const v of ['O', 'X']) {
      const right = (q.answer ? 'O' : 'X') === v;
      const b = el('button', { type: 'button', class: `qz-oxbig ${v === 'O' ? 'o' : 'x'}` + (this.ans[qi] === v ? ' on' : '') + (done && right ? ' right' : '') + (done && this.ans[qi] === v && !right ? ' wrong' : '') }, v === 'O' ? '○' : '✕');
      b.disabled = done;
      b.onclick = () => { this.ans[qi] = v; [...row.children].forEach((x) => x.classList.toggle('on', x === b)); this.changed(); };
      row.append(b);
    }
    this.play.append(row);
  }

  // ----- 객관식 -----
  choice(q, qi, done) {
    const grid = el('div', { class: 'qz-opts2' });
    q.options.forEach((o, oi) => {
      const mine = String(this.ans[qi]) === String(oi), right = oi === q.answer;
      const b = el('button', { type: 'button', class: 'qz-opt2' + (mine ? ' on' : '') + (done && right ? ' right' : '') + (done && mine && !right ? ' wrong' : '') },
        el('span', { class: 'qz-n' }, String(oi + 1)), el('span', {}, o));
      b.disabled = done;
      b.onclick = () => { this.ans[qi] = String(oi); [...grid.children].forEach((x) => x.classList.toggle('on', x === b)); this.changed(); };
      grid.append(b);
    });
    this.play.append(grid);
  }

  // ----- 연결하기: 점을 끌어 선 잇기(왼쪽 → 오른쪽, 오른쪽 → 왼쪽 모두 / 눌러서 잇기도 됨) -----
  match(q, qi, done) {
    if (typeof this.ans[qi] !== 'string' || this.ans[qi].length !== q.left.length) this.ans[qi] = '-'.repeat(q.left.length);
    const order = rightOrder(qi);
    const wrap = el('div', { class: 'qz-matchbox' + (done ? ' done' : '') });
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.classList.add('qz-lines');
    const L = el('div', { class: 'qz-col left' }), R = el('div', { class: 'qz-col right' });
    const lEls = q.left.map((t, li) => el('div', { class: 'qz-node', 'data-side': 'L', 'data-i': String(li) }, el('span', { class: 'qz-ntext' }, t), el('span', { class: 'qz-pin' })));
    const rEls = order.map((ri) => el('div', { class: 'qz-node', 'data-side': 'R', 'data-i': String(ri) }, el('span', { class: 'qz-pin' }), el('span', { class: 'qz-ntext' }, q.right[ri])));
    L.append(...lEls); R.append(...rEls);
    wrap.append(L, el('div', { class: 'qz-gap' }), R, svg);
    this.play.append(el('div', { class: 'qz-hint' }, done ? '' : '왼쪽과 오른쪽의 점을 끌어 선으로 이어요 (차례로 눌러도 돼요) · 선을 누르면 지워져요'), wrap);
    const rElOf = (ri) => rEls.find((x) => x.dataset.i === String(ri));
    let sel = null, temp = null;

    const pinPos = (node) => {
      const p = node.querySelector('.qz-pin').getBoundingClientRect(), w = wrap.getBoundingClientRect();
      return { x: p.left + p.width / 2 - w.left, y: p.top + p.height / 2 - w.top };
    };
    const curve = (a, b) => `M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`;
    const path = (d, color, cls) => { const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); p.setAttribute('stroke', color); p.setAttribute('class', cls); svg.append(p); return p; };
    const connect = (li, ri) => {
      const arr = this.ans[qi].split('');
      arr.forEach((v, k) => { if (v === String(ri)) arr[k] = '-'; });
      arr[li] = String(ri);
      this.ans[qi] = arr.join('');
      this.changed(); draw();
    };
    const draw = () => {
      const w = wrap.getBoundingClientRect();
      svg.setAttribute('width', w.width); svg.setAttribute('height', w.height);
      svg.innerHTML = '';
      const a = this.ans[qi];
      lEls.forEach((le, li) => {
        const r = a[li];
        le.classList.toggle('linked', r !== '-');
        le.style.setProperty('--c', LINE_COLORS[li % 4]);
        if (r === '-') return;
        const re = rElOf(r); re.style.setProperty('--c', LINE_COLORS[li % 4]);
        let cls = 'qz-line', color = LINE_COLORS[li % 4];
        if (done) { const ok = Number(r) === q.answer[li]; cls += ok ? ' right' : ' wrong'; color = ok ? '#2e9a5c' : '#e7464c'; }
        const p = path(curve(pinPos(le), pinPos(re)), color, cls);
        if (!done) { p.style.pointerEvents = 'stroke'; p.addEventListener('click', () => { const arr = this.ans[qi].split(''); arr[li] = '-'; this.ans[qi] = arr.join(''); this.changed(); draw(); }); }
      });
      rEls.forEach((re) => re.classList.toggle('linked', a.includes(re.dataset.i)));
      if (done) q.answer.forEach((ri, li) => { if (a[li] !== String(ri)) path(curve(pinPos(lEls[li]), pinPos(rElOf(ri))), '#2e9a5c', 'qz-line hint'); });
      if (temp) svg.append(temp);
    };
    this.drawLines = draw;
    if (done) return;

    const nodeAt = (x, y) => { const n = document.elementFromPoint(x, y); return n && n.closest ? n.closest('.qz-node') : null; };
    const finish = (from, to) => {
      if (!from || !to || from.dataset.side === to.dataset.side) return false;
      const li = Number((from.dataset.side === 'L' ? from : to).dataset.i), ri = Number((from.dataset.side === 'R' ? from : to).dataset.i);
      connect(li, ri);
      const pl = lEls[li], pr = rElOf(ri); pl.classList.add('snap'); pr.classList.add('snap');
      setTimeout(() => { pl.classList.remove('snap'); pr.classList.remove('snap'); }, 400);
      return true;
    };
    [...lEls, ...rEls].forEach((node) => node.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const start = pinPos(node), sx = e.clientX, sy = e.clientY;
      let dragging = false;
      const move = (ev) => {
        if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
          dragging = true;
          temp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          temp.setAttribute('class', 'qz-line temp'); temp.setAttribute('stroke', '#94a3b8');
          node.classList.add('picking');
        }
        if (!dragging) return;
        const w = wrap.getBoundingClientRect();
        const target = nodeAt(ev.clientX, ev.clientY);
        [...lEls, ...rEls].forEach((x) => x.classList.toggle('aim', x === target && target.dataset.side !== node.dataset.side));
        const end = target && target.dataset.side !== node.dataset.side ? pinPos(target) : { x: ev.clientX - w.left, y: ev.clientY - w.top };
        temp.setAttribute('d', curve(start, end)); draw();
      };
      const up = (ev) => {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
        node.classList.remove('picking'); [...lEls, ...rEls].forEach((x) => x.classList.remove('aim'));
        if (dragging) { temp = null; if (!finish(node, nodeAt(ev.clientX, ev.clientY))) draw(); return; }
        // 눌러서 잇기: 한쪽을 고르고 반대쪽을 누른다
        if (sel && sel !== node && sel.dataset.side !== node.dataset.side) { finish(sel, node); sel.classList.remove('sel'); sel = null; return; }
        if (sel) sel.classList.remove('sel');
        sel = sel === node ? null : node;
        if (sel) sel.classList.add('sel');
      };
      window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    }));
  }

  // ----- 채점 -----
  grade() {
    const qi = this.i, q = QUIZ[qi];
    const ok = isRight(q, this.ans[qi]);
    this.res[qi] = ok;
    this.save();
    if (this.opts.onGraded) this.opts.onGraded(this.ans, this.res);
    this.render();
    if (ok) {
      const b = this.card.getBoundingClientRect(), s = this.stage.getBoundingClientRect();
      confetti(this.stage, b.left - s.left + b.width / 2, b.top - s.top + b.height * 0.55);
      const sc = this.stage.querySelector('.qz-score'); sc.classList.add('bump');
    } else {
      this.card.classList.add('shake');
    }
  }
  feedback(q, qi) {
    const ok = this.res[qi];
    const who = CHARS[qi % 3];
    const ch = who.img;
    const last = qi === N - 1;
    const next = el('button', { class: 'qz-next', type: 'button' }, last ? '결과 보기 🎉' : '다음 문제 →');
    next.onclick = () => {
      if (last) { this.opts.onFinish(this.ans, this.res); return; }
      this.i++; this.save(); this.render();
      this.stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return el('div', { class: 'qz-fb ' + (ok ? 'ok' : 'ng') },
      el('img', { class: 'qz-fbch', src: ch, alt: '' }),
      el('div', { class: 'qz-fbbody' },
        el('div', { class: 'qz-stamp' }, ok ? ['정답! ', el('span', {}, ['멋져요', '완벽해요', '훌륭해요', '좋아요'][qi % 4])] : '아쉬워요'),
        !ok ? el('div', { class: 'qz-right' }, '정답: ', el('b', {}, rightText(q))) : null,
        el('div', { class: 'qz-exp' }, q.explain)),
      this.aiBubble(qi, who),
      next);
  }

  // ----- 캐릭터 AI 한마디 -----
  aiBubble(qi, who) {
    const have = this.ai[qi];
    const text = el('div', { class: 'qz-ai-text' });
    if (have) text.textContent = have.t;
    else text.append(el('span', { class: 'qz-ai-dots', 'aria-label': '생각하는 중' }, el('i'), el('i'), el('i')), el('span', { class: 'qz-ai-wait' }, `${who.ga} 생각하는 중…`));
    const box = el('div', { class: `qz-ai t-${who.id}${have && have.s === 'fb' ? ' fb' : ''}`, 'data-qi': String(qi), 'aria-live': 'polite' },
      el('div', { class: 'qz-ai-name' }, el('b', {}, who.name), '의 한마디', el('span', { class: 'qz-ai-tag' }, have && have.s === 'fb' ? '캐릭터' : 'AI')),
      text);
    if (!have) this.askAI(qi, who);
    return box;
  }
  askAI(qi, who) {
    if (this.asking[qi]) return;
    this.asking[qi] = true;
    const ok = this.res[qi];
    const call = this.opts.askAI ? this.opts.askAI(qi, this.ans[qi]) : Promise.reject(new Error('AI 없음'));
    const late = new Promise((_, no) => setTimeout(() => no(new Error('느림')), AI_WAIT_MS));
    Promise.race([call, late])
      .then((t) => ({ t: String(t || '').trim() || FALLBACK[who.id][ok ? 'ok' : 'ng'], s: t ? 'ai' : 'fb' }))
      .catch(() => ({ t: FALLBACK[who.id][ok ? 'ok' : 'ng'], s: 'fb' }))
      .then((r) => {
        this.ai[qi] = r;
        this.asking[qi] = false;
        this.save();
        const box = this.stage.querySelector(`.qz-ai[data-qi="${qi}"]`);
        if (!box) return;
        box.classList.toggle('fb', r.s === 'fb');
        box.querySelector('.qz-ai-tag').textContent = r.s === 'fb' ? '캐릭터' : 'AI';
        typeIn(box.querySelector('.qz-ai-text'), r.t);
      });
  }
}

// ---------- 결과(내 답 + 해설) ----------
export function renderMyResult(box, mine, rates) {
  box.innerHTML = '';
  QUIZ.forEach((q, qi) => {
    const ok = mine.c[qi] === 1;
    const r = rates ? rates[qi] : null;
    box.append(el('div', { class: 'qz-res ' + (ok ? 'ok' : 'ng') },
      el('div', { class: 'qz-res-head' },
        el('span', { class: 'qz-mark' }, ok ? '○' : '✕'),
        el('b', {}, `${qi + 1}. ${q.label}`),
        r != null ? el('span', { class: 'qz-rate' }, `모두의 정답률 ${r}%`) : null),
      el('div', { class: 'qz-q small' }, q.q),
      !ok ? el('div', { class: 'qz-line' }, el('span', { class: 'muted' }, '내 답: '), answerText(q, mine.a[qi]) || '(비움)') : null,
      el('div', { class: 'qz-line' }, el('span', { class: 'muted' }, '정답: '), el('b', {}, rightText(q))),
      el('div', { class: 'qz-explain' }, q.explain)));
  });
}

// ---------- 모두의 결과(정답률 막대) ----------
// c: 문항별 1(맞음)·0(틀림)·-1(아직). 한 문제씩 저장되므로 '푸는 중'인 사람도 들어온다.
export const doneCount = (r) => (r.c || []).filter((v) => v === 0 || v === 1).length;
export const isFinished = (r) => !!r && Array.isArray(r.c) && doneCount(r) === N;
export function quizStats(rows) {
  const n = rows.length;
  const right = new Array(N).fill(0), tried = new Array(N).fill(0);
  const dist = new Array(N + 1).fill(0);
  let sum = 0, fin = 0;
  for (const r of rows) {
    (r.c || []).forEach((v, i) => { if (v === 1) right[i]++; if (v === 0 || v === 1) tried[i]++; });
    if (isFinished(r)) { fin++; dist[r.score] = (dist[r.score] || 0) + 1; sum += r.score; }
  }
  return { n, fin, right, tried, rates: right.map((v, i) => (tried[i] ? Math.round((v / tried[i]) * 100) : 0)), avg: fin ? sum / fin : 0, dist };
}

export function renderRateBars(box, st, big = false) {
  if (box.children.length !== N) {
    box.innerHTML = '';
    QUIZ.forEach((q, qi) => box.append(el('div', { class: 'rate-row' + (big ? ' big' : '') },
      el('div', { class: 'rate-label' }, el('b', {}, `${qi + 1}`), ' ', q.label),
      el('div', { class: 'bar-track' }, el('div', { class: 'bar-fill' })),
      el('div', { class: 'bar-num' }, '0%'))));
  }
  [...box.children].forEach((row, i) => {
    const r = st.rates[i];
    const fill = row.querySelector('.bar-fill');
    fill.style.width = r + '%';
    fill.style.background = r >= 80 ? '#3db271' : r >= 50 ? '#eab308' : '#e7464c';
    row.querySelector('.bar-num').textContent = st.tried[i] ? `${r}% (${st.right[i]}/${st.tried[i]})` : '-';
  });
}
