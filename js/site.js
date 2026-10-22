// 연수 다시보기(깃허브 정적판): 7단계를 모두 펼쳐 두고, 고른 것은 이 브라우저에만 남긴다.
// 「모두의 결과」는 2026-10-22 연수 당일 결과(results.js, 이름 없음)로 보여 준다.
import { MOODS, HEALTH, STEPS, emojiSrc, el, summarize, renderBars, renderCloud, renderMeal } from './common.js';
import { QUIZ, N as QN, QuizPlayer, renderMyResult, quizStats, renderRateBars, CHARS, typeIn } from './quiz.js';
import { PARTS } from './parts.js';
import { RESULTS } from './results.js';

const $ = (id) => document.getElementById(id);
const show = (id, on) => $(id).classList.toggle('hidden', !on);
function toast(msg, ms = 2200) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), ms);
}
const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const store = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch { /* 이번 화면만 */ } };

// ---------- 차례 ----------
$('toc').append(...STEPS.map((s) => el('a', { class: 'toc-item', href: `#step-${s.id}` }, el('b', {}, String(s.no)), s.title)));

// ---------- 1단계: 기분 ----------
const MOOD_KEY = 'rww1022.site.mood';
const pick = { mood: null, emotion: null, meal: null, health: null };
let myMood = load(MOOD_KEY);

function buildMoodForm() {
  MOODS.forEach((m, i) => {
    const b = el('button', { class: 'mood-btn', type: 'button', style: `--c:${m.color}` }, el('img', { src: emojiSrc(m.emoji), alt: '' }), el('span', {}, m.label));
    b.onclick = () => { if (pick.mood !== i) pick.emotion = null; pick.mood = i; drawForm(); };
    $('mood-grid').append(b);
  });
  HEALTH.forEach((h, i) => {
    const b = el('button', { class: 'mood-btn', type: 'button', style: `--c:${h.color}` }, el('img', { src: emojiSrc(h.emoji), alt: '' }), el('span', {}, h.label));
    b.onclick = () => { pick.health = i; drawForm(); };
    $('health-grid').append(b);
  });
  [['네!', true], ['아니오!', false]].forEach(([t, v]) => {
    const b = el('button', { class: 'chip', type: 'button' }, t);
    b.onclick = () => { pick.meal = v; drawForm(); };
    b.dataset.v = String(v);
    $('meal').append(b);
  });
  $('mood-submit').onclick = () => {
    myMood = { ...pick };
    store(MOOD_KEY, myMood);
    drawMood();
    $('mood-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  $('again').onclick = () => {
    Object.assign(pick, myMood);
    myMood = null;
    store(MOOD_KEY, null);
    drawMood();
    $('mood-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}
function drawForm() {
  [...$('mood-grid').children].forEach((b, i) => b.classList.toggle('on', pick.mood === i));
  [...$('health-grid').children].forEach((b, i) => b.classList.toggle('on', pick.health === i));
  [...$('meal').children].forEach((b) => b.classList.toggle('on', b.dataset.v === String(pick.meal)));
  show('emo-step', pick.mood != null);
  if (pick.mood != null) {
    const m = MOODS[pick.mood], box = $('emo-chips');
    if (box.dataset.mood !== String(pick.mood)) {
      box.innerHTML = '';
      box.dataset.mood = String(pick.mood);
      for (const w of m.emotions) {
        const c = el('button', { class: 'chip', type: 'button', style: `--c:${m.color}` }, w);
        c.onclick = () => { pick.emotion = w; drawForm(); };
        box.append(c);
      }
    }
    [...box.children].forEach((c) => c.classList.toggle('on', c.textContent === pick.emotion));
  }
  show('health-step', pick.emotion != null);
  $('mood-submit').disabled = !(pick.mood != null && pick.emotion && pick.meal != null && pick.health != null);
}
// 연수 때는 AI(제미나이)가 한마디 했지만, 다시보기판은 미리 써 둔 캐릭터 말로 대신한다.
const MOOD_SAY = [
  '선생님, 좋은 기운이 화면 너머까지 전해져요. 그 마음 그대로 오늘 하루도 즐겁게 보내세요!',
  '선생님, 기분 좋은 하루라니 반가워요. 연수에서 마음에 든 아이디어 하나를 꼭 수업에 가져가 보세요.',
  '선생님, 괜찮다고 말해 주셔서 고마워요. 오늘은 편안한 마음으로 천천히 둘러보세요.',
  '선생님, 오늘 하루 많이 애쓰셨지요. 무리하지 마시고 편하게 보셔도 괜찮아요.',
  '선생님, 힘든 마음을 솔직하게 나눠 주셔서 고마워요. 오늘은 쉬어 가듯 가볍게 둘러보셔도 충분해요.',
];
function drawMood() {
  show('mood-form', !myMood);
  show('mood-result', true);
  show('again-row', !!myMood);
  const rows = RESULTS.mood.concat(myMood ? [myMood] : []);
  const s = summarize(rows);
  $('r-count').textContent = `연수생 ${RESULTS.mood.length}명${myMood ? ' + 나' : ''}`;
  renderBars($('r-mood'), MOODS, s.mood, s.n);
  renderCloud($('r-cloud'), s.words, myMood && myMood.emotion);
  renderMeal($('r-meal'), s);
  renderBars($('r-health'), HEALTH, s.health, s.n);
  show('mine', !!myMood);
  show('mood-ai', !!myMood);
  if (!myMood) { drawForm(); return; }
  const m = MOODS[myMood.mood];
  $('mine').replaceChildren(el('img', { src: emojiSrc(m.emoji), alt: '' }), el('div', {}, el('b', {}, '내 응답: '), `${m.label} · ${myMood.emotion}`));
  const who = CHARS[myMood.mood % 3];
  const text = el('div', { class: 'qz-ai-text' });
  $('mood-ai').className = `mood-ai t-${who.id}`;
  $('mood-ai').replaceChildren(el('img', { class: 'ma-ch', src: who.img, alt: '' }),
    el('div', { class: `qz-ai t-${who.id} fb` }, el('div', { class: 'qz-ai-name' }, el('b', {}, who.name), '의 한마디', el('span', { class: 'qz-ai-tag' }, '캐릭터')), text));
  typeIn(text, MOOD_SAY[myMood.mood]);
}

// ---------- 2·4·5단계: 링크 카드 ----------
for (const s of STEPS.filter((x) => x.links)) {
  $('slot-' + s.id).append(el('section', { class: 'card step-card', id: `step-${s.id}` },
    el('span', { class: 'step-tag' }, `${s.no}단계 · ${s.tag}`),
    el('h2', {}, s.title),
    s.desc ? el('p', { class: 'lead' }, s.desc) : null,
    s.links.length ? el('div', { class: 'link-grid' }, s.links.map((l) => el('a', { class: 'link-btn', href: l.url, target: '_blank', rel: 'noopener' },
      el('img', { src: emojiSrc(l.emoji), alt: '' }), el('span', {}, l.label), el('span', { class: 'go' }, '열기 ↗')))) : null,
    s.id === 'calc' ? calcDraw() : null));
}

// ---------- 2단계: 계산왕 문제 뽑기 ----------
// 축전 앱(imf12-calcking) 운영자 화면의 [문제 뽑기]와 같은 방식: 기초 숫자 5개(1~6) + 목표 수(검정 주사위 10~60 + 1~6).
// 문제 시작·정답 제출·점수는 없다.
function calcDraw() {
  const dice = Array.from({ length: 5 }, () => el('div', { class: 'cw-die' }, '?'));
  const target = el('div', { class: 'cw-target' }, '?');
  const b1 = el('span', { class: 'cw-black' }, '-'), b2 = el('span', { class: 'cw-black' }, '-');
  const btn = el('button', { class: 'btn primary big', type: 'button' }, '🎲 문제 뽑기');
  const roll = (n) => Math.floor(Math.random() * n) + 1;
  btn.onclick = () => {
    btn.disabled = true;
    const els = [target, ...dice];
    els.forEach((x) => x.classList.add('cw-rolling'));
    let t = 0;
    const iv = setInterval(() => {
      t += 100;
      dice.forEach((d) => { d.textContent = roll(6); });
      target.textContent = roll(60) + 6;
      if (t < 1500) return;
      clearInterval(iv);
      els.forEach((x) => x.classList.remove('cw-rolling'));
      const ones = roll(6), tens = roll(6) * 10;
      dice.forEach((d) => { d.textContent = roll(6); });
      target.textContent = tens + ones;
      b1.textContent = ones; b2.textContent = tens;
      btn.disabled = false;
      btn.textContent = '🎲 다시 뽑기';
    }, 100);
  };
  return el('div', { class: 'cw' },
    el('div', { class: 'cw-board' },
      el('div', { class: 'cw-panel' }, el('div', { class: 'cw-label' }, '기초 숫자 ', el('span', {}, '각각 한 번씩')), el('div', { class: 'cw-dice' }, dice)),
      el('div', { class: 'cw-panel' }, el('div', { class: 'cw-label' }, '목표 수'), target,
        el('div', { class: 'cw-blacks', 'aria-label': '검정 주사위 두 개' }, b1, el('span', {}, '+'), b2))),
    el('div', { class: 'cw-go' }, btn),
    el('ul', { class: 'cw-rule' },
      el('li', {}, '기초 숫자 5개를 ', el('b', {}, '모두, 각각 한 번씩'), ' 써서 목표 수가 나오는 식을 만들어요.'),
      el('li', {}, '쓸 수 있는 것: ', el('b', {}, '+ − × ÷, 괄호, 거듭제곱'), ' · 숫자를 붙여 두 자리 수(1과 2로 12)를 만들면 안 돼요.'),
      el('li', {}, '예) 기초 숫자 2, 3, 4, 5, 6 · 목표 수 40 → (6 + 4) × (5 − 3 + 2) = 40')));
}

// ---------- 3단계: 퀴즈 ----------
const DRAFT_KEY = 'rww1022.site.quizPlay', DONE_KEY = 'rww1022.site.quizDone';
const dayStats = quizStats(RESULTS.quiz);
function buildQuiz(fresh) {
  if (fresh) store(DRAFT_KEY, null);
  show('quiz-result', false);
  new QuizPlayer($('quiz-form'), fresh ? null : load(DRAFT_KEY), {
    onSave: (d) => store(DRAFT_KEY, d),
    onFinish: (ans, res) => {
      const c = QUIZ.map((q, i) => (res[i] === true ? 1 : res[i] === false ? 0 : -1));
      const a = QUIZ.map((q, i) => String(ans[i] ?? ''));
      store(DONE_KEY, { c, a, score: c.filter((v) => v === 1).length });
      store(DRAFT_KEY, null);
      drawQuizResult();
      $('quiz-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    // askAI 를 주지 않으면 quiz.js 가 미리 써 둔 캐릭터 말을 보여 준다
  });
}
function drawQuizResult() {
  const mine = load(DONE_KEY);
  show('quiz-result', !!mine);
  if (!mine) return;
  const s = mine.score, pct = Math.round((s / QN) * 100);
  $('qr-score').textContent = `내 점수 ${s} / ${QN}`;
  $('qr-avg').textContent = `10.22 연수생 ${dayStats.fin}명 평균 ${dayStats.avg.toFixed(1)}점`;
  const msg = s === QN ? '완벽해요! 읽걷쓰AI 박사님' : s >= 8 ? '훌륭해요! 거의 다 맞혔어요' : s >= 5 ? '좋아요! 해설로 한 번 더 확인해요' : '괜찮아요! 해설을 보며 함께 정리해요';
  const stars = Math.max(1, Math.round(s / 2));
  $('qr-hero').replaceChildren(
    el('div', { class: 'qr-ring', style: `--p:${pct}` }, el('div', {}, el('b', {}, String(s)), el('span', {}, `/ ${QN}`))),
    el('div', { class: 'qr-msg' }, el('div', { class: 'qr-stars' }, '★'.repeat(stars) + '☆'.repeat(5 - stars)), el('b', {}, msg)),
    el('img', { class: 'qr-ch', src: s >= 8 ? 'img/ch-write.png' : 'img/ch-read.png', alt: '' }));
  renderRateBars($('qr-rates'), dayStats);
  renderMyResult($('qr-mine'), mine, dayStats.rates);
}
$('quiz-again').onclick = () => { store(DONE_KEY, null); buildQuiz(true); $('quiz-card').scrollIntoView({ behavior: 'smooth', block: 'start' }); };

// ---------- 6·7단계: 정류장 이야기 ----------
function drawPart(id) {
  const P = PARTS[id];
  const rows = RESULTS[id];
  const likes = Object.fromEntries(P.stops.map((s) => [s.id, 0]));
  const votes = Object.fromEntries(P.stops.map((s) => [s.id, 0]));
  for (const r of rows) {
    r.likes.forEach((k) => { if (k in likes) likes[k]++; });
    if (r.vote in votes) votes[r.vote]++;
  }
  const max = Math.max(1, ...P.stops.map((s) => votes[s.id] + likes[s.id]));
  return el('div', { id: `step-${id}` },
    el('section', { class: 'card', id: `${id}-card` },
      el('span', { class: 'step-tag' }, `${P.step}단계 · ${P.tag}`),
      el('h2', {}, P.title),
      el('p', { class: 'lead' }, P.lead),
      el('div', { class: 'evo' }, P.evo.flatMap((t, i) => (i ? [el('b', {}, '→'), el('span', {}, t)] : [el('span', {}, t)]))),
      el('div', { class: 'stops' }, P.stops.map((s, i) => el('article', { class: 'stop', 'data-stop': s.id },
        el('div', { class: 'stop-no' }, String(i + 1)),
        el('div', { class: 'stop-body' },
          el('div', { class: 'stop-meta' }, el('span', { class: 'stop-term' }, s.term), s.unit),
          el('h3', { class: 'stop-title' }, s.title),
          el('div', { class: 'stop-tech' }, s.tech.map((t) => el('span', {}, t))),
          el('p', { class: 'stop-text' }, s.text),
          s.imgs.length ? el('div', { class: 'stop-imgs' }, s.imgs.map((src) => el('a', { href: src, target: '_blank', rel: 'noopener' }, el('img', { src, alt: s.title + ' 화면', loading: 'lazy' })))) : null,
          (s.try.length || s.demo) ? el('div', { class: 'stop-try' },
            s.try.map((t) => el('a', { class: 'btn primary', href: t.url, target: '_blank', rel: 'noopener' }, '체험하기 · ' + t.label + ' ↗')),
            s.demo ? el('span', { class: 'stop-demo' }, s.demo) : null) : null))))),
    el('section', { class: 'card', id: `${id}-wrap` },
      el('span', { class: 'step-tag' }, `${P.step}단계 · 마무리`),
      el('div', { class: 'result-head' }, el('h2', { style: 'margin:0' }, '10.22 연수생의 선택'), el('span', { class: 'count-pill' }, `${rows.length}명 참여`)),
      el('p', { class: 'lead', style: 'margin-top:6px' }, `${P.voteQ.replace('?', '')} — 투표 수와 ‘해 보고 싶어요’(♥) 수예요.`),
      el('div', {}, P.stops.map((s, i) => el('div', { class: 'vote-row' },
        el('div', { class: 'vote-label' }, el('b', {}, `${i + 1} `), s.unit),
        el('div', { class: 'bar-track' }, el('div', { class: 'bar-fill', style: `width:${((votes[s.id] + likes[s.id]) / max) * 100}%;background:#be0081` })),
        el('div', { class: 'bar-num' }, `${votes[s.id]}표 · ♥${likes[s.id]}`))))));
}
$('parts').append(drawPart('story'), drawPart('eval'));

// ---------- 3D 웹뷰어 QR ----------
if (window.qrcode) {
  const q = window.qrcode(0, 'M'); q.addData('https://j333333766-hub.github.io/startup-park-ar/'); q.make();
  $('ar-qr').innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
}

// ---------- 시작 ----------
buildMoodForm();
if (myMood) Object.assign(pick, myMood);
drawMood();
buildQuiz(false);
drawQuizResult();
