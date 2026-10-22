// 다시보기 화면이 쓰는 것: 단계 목록, 기분 설문 내용, 집계 그리기. (연수 앱 public/js/common.js 에서 Firebase 부분만 뺐다)

// 연수 진행 단계(깃허브 다시보기판: 모두 열려 있음).
export const STEPS = [
  { id: 'mood', no: 1, short: '기분', title: '나의 기분을 말해요', tag: '사회정서학습(SEL)' },
  { id: 'calc', no: 2, short: '계산왕', title: '계산왕 뽑기 대회', tag: '기존 대회를 새로운 방식으로',
    desc: '종이로 하던 계산 대회를 실시간 누적 점수 앱으로 바꾼 사례예요. 연수 때는 인천수학축전에서 쓰는 실제 앱에 직접 참가해 보았어요. 실제 대회 앱이라 이 다시보기 사이트에는 링크를 넣지 않았어요.',
    links: [] },
  { id: 'quiz', no: 3, short: '읽걷쓰AI 퀴즈', title: '읽걷쓰AI 함께 생각하기', tag: '4P · H-A-H 영상과 퀴즈' },
  { id: 'pyth', no: 4, short: '피타고라스', title: '피타고라스 음률', tag: '읽걷쓰AI 수업 사례',
    desc: '음악 속 수의 비를 AI와 함께 만든 도구로 탐구해요. 소리가 나니 이어폰을 준비해 주세요.',
    links: [
      { label: '피타고라스 음률 계산기', url: 'pythagoras/calculator.html', emoji: '1f3b9' },
      { label: '완전5도·완전8도 이해하기', url: 'pythagoras/fifth-octave.html', emoji: '1f3b5' },
      { label: '완전5도·완전8도 이해하기 (3옥타브)', url: 'pythagoras/fifth-octave-3.html', emoji: '1f3bc' },
      { label: '피타고라스 콤마 확인하기', url: 'pythagoras/comma.html', emoji: '1f50d' },
    ] },
  { id: 'seat', no: 5, short: '자리배치', title: '자리배치·체크리스트 체험', tag: '수업 운영 도구',
    desc: '1학년 5개 반(가상 학생)으로 자리배치·랜덤 배치·체크리스트 기록·발표자 뽑기를 직접 해 보세요. 기록은 이 브라우저에만 저장돼요.',
    links: [{ label: '자리배치 프로그램 열기', url: 'seat/', emoji: '1fa91' }] },
  { id: 'story', no: 6, short: '수업이야기', title: '나의 2026학년도 수업이야기', tag: '2부 · 수학 수업 일기' },
  { id: 'eval', no: 7, short: '평가이야기', title: '나의 AI 활용 평가 이야기', tag: '3부 · AI 활용 평가' },
];

// ---------- 오늘 기분 (사회정서학습) — 원래 구글 설문 그대로 ----------
export const MOODS = [
  { label: '아주 좋아요!', emoji: '1f604', color: '#3db271',
    emotions: ['가치 있는', '감사함', '단호한', '기운 넘침', '낙관적', '동기 부여됨', '경외심', '성공적', '성취감', '야심찬', '탁월함', '자랑스러움', '자신감 있는', '집중함', '창의적', '평화로움', '소속감', '행복함', '호기심 많은', '흥분함'] },
  { label: '좋아요!', emoji: '1f642', color: '#84cc16',
    emotions: ['가치 있는', '감사함', '기쁨', '기운 넘침', '낙관적', '동기 부여됨', '경외심', '만족함', '성공적', '탁월함', '자랑스러움', '자신감 있는', '집중함', '창의적', '침착함', '쾌활함', '편안함', '평화로움', '소속감', '행복함', '호기심 많은', '흥분함'] },
  { label: '괜찮아요!', emoji: '1f610', color: '#eab308',
    emotions: ['짜증이 난', '기쁨', '혼란스러운', '만족함', '불안함', '수심에 잠긴', '예민한', '내성적인', '지루함', '집중함', '충격 받음', '침착함', '편안한', '피곤함', '호기심 많은', '회의감'] },
  { label: '어려움을 겪고 있어요!', emoji: '1f61f', color: '#f97316',
    emotions: ['짜증이 난', '다침', '혼란스러운', '무관심', '부끄러운', '불안함', '스트레스', '슬픈', '실망', '압도 당한', '염려함', '예민함', '외로움', '좌절함', '막힌', '지루함', '질투하는', '충격 받음', '피곤함', '회의적'] },
  { label: '기분이 좋지 않아요!', emoji: '1f622', color: '#e7464c',
    emotions: ['가망 없음', '깜짝 놀람', '다침', '부끄러운', '불안함', '비참함', '스트레스', '슬픈', '쓸모 없는', '압도 당한', '염려함', '외로움', '우울함', '좌절함', '막힌', '지침', '화남'] },
];
export const HEALTH = [
  { label: '아주 좋아요!', emoji: '1f4aa', color: '#3db271' },
  { label: '좋아요!', emoji: '1f642', color: '#84cc16' },
  { label: '괜찮아요!', emoji: '1f610', color: '#eab308' },
  { label: '조금 불편해요!', emoji: '1f912', color: '#f97316' },
  { label: '몸이 좋지 않아요!', emoji: '1f915', color: '#e7464c' },
];
export const emojiSrc = (code) => `emoji/${code}.svg`;

export function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  for (const c of kids.flat()) if (c != null) e.append(c);
  return e;
}

// ---------- 집계 ----------
// rows: [{ mood, emotion, meal, health }]
export function summarize(rows) {
  const mood = [0, 0, 0, 0, 0], health = [0, 0, 0, 0, 0];
  let mealYes = 0, mealNo = 0;
  const words = new Map(); // 감정 → { n, moods: [5칸] }
  for (const r of rows) {
    mood[r.mood]++; health[r.health]++;
    r.meal ? mealYes++ : mealNo++;
    if (r.emotion) {
      const w = words.get(r.emotion) || { n: 0, moods: [0, 0, 0, 0, 0] };
      w.n++; w.moods[r.mood]++;
      words.set(r.emotion, w);
    }
  }
  return { n: rows.length, mood, health, mealYes, mealNo, words };
}

// 막대 그래프(그림 + 이름 + 막대 + 명수). 이전 막대를 다시 쓰므로 바뀔 때 부드럽게 늘어난다.
export function renderBars(box, items, counts, total) {
  if (box.children.length !== items.length) {
    box.innerHTML = '';
    items.forEach((it) => {
      box.append(el('div', { class: 'bar-row' },
        el('img', { class: 'bar-emoji', src: emojiSrc(it.emoji), alt: '' }),
        el('div', { class: 'bar-label' }, it.label),
        el('div', { class: 'bar-track' }, el('div', { class: 'bar-fill', style: `background:${it.color}` })),
        el('div', { class: 'bar-num' }, '0')));
    });
  }
  const max = Math.max(1, ...counts);
  [...box.children].forEach((row, i) => {
    row.querySelector('.bar-fill').style.width = (counts[i] / max) * 100 + '%';
    const pct = total ? Math.round((counts[i] / total) * 100) : 0;
    row.querySelector('.bar-num').textContent = counts[i] ? `${counts[i]}명 · ${pct}%` : '0';
  });
}

// 감정 낱말 구름: 많이 고른 낱말일수록 크게, 색은 그 낱말을 고른 기분 쪽으로.
export function renderCloud(box, words, mine = null) {
  box.innerHTML = '';
  const list = [...words.entries()].sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0], 'ko'));
  if (!list.length) { box.append(el('div', { class: 'muted' }, '아직 고른 감정이 없어요')); return; }
  const max = list[0][1].n;
  for (const [w, v] of list) {
    const top = v.moods.indexOf(Math.max(...v.moods));
    const size = 15 + (max > 1 ? ((v.n - 1) / (max - 1)) * 27 : 6);
    box.append(el('span', {
      class: 'cloud-word' + (w === mine ? ' mine' : ''),
      style: `font-size:${size.toFixed(1)}px;color:${MOODS[top].color};border-color:${MOODS[top].color}`,
      title: `${v.n}명`,
    }, w, v.n > 1 ? el('sup', {}, String(v.n)) : null));
  }
}

export function renderMeal(box, s) {
  const t = s.mealYes + s.mealNo;
  const y = t ? Math.round((s.mealYes / t) * 100) : 0;
  box.innerHTML = '';
  box.append(
    el('div', { class: 'meal-bar' },
      el('div', { class: 'meal-yes', style: `width:${t ? y : 50}%` }, t ? `먹었어요 ${s.mealYes}` : ''),
      el('div', { class: 'meal-no', style: `width:${t ? 100 - y : 50}%` }, t ? `아직 ${s.mealNo}` : '')));
}

// 이름 가리기: 조창현 → 조○○
export const maskName = (n) => (n ? n[0] + '○'.repeat(Math.max(1, n.length - 1)) : '');
