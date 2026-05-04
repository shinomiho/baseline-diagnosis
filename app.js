// ===== Apps Script URL =====
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVJ8hefECLaNvEkYVr32CQD37lnCVJnu2iUqz_QV3AEmGL2DefBoW-01gSjWeGDgcU/exec';

// ===== 設問データ =====
const QUESTIONS = [
  {
    id: 'Q01',
    text: '今の生活・仕事で一番「変えたい」と感じていることは？',
    options: [
      { label: 'A', text: '体の疲れ・体型・食習慣を整えたい',           scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: 'もっと自分らしく話せるようになりたい',        scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '働き方・収入・キャリアをもっと合理的に変えたい', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '全体的にバランスよく整えたい',                scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q02',
    text: '自分の「得意」や「好き」に一番近いのは？',
    options: [
      { label: 'A', text: '体・食事・健康・美容に関する知識や実体験', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '話す・聴く・人の感情に寄り添う',          scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '分析・整理・仕組みをつくる・効率化する',   scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: 'まだわからない',                         scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q03',
    text: '6ヶ月後の理想の自分は？',
    options: [
      { label: 'A', text: '健康的でエネルギーにあふれ、毎日が軽くなっている', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '自分の言葉と声で、人の心を動かせている',          scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '収入・働き方が整い、合理的に成果を出せている',    scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: 'まだイメージできていない',                        scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q04',
    text: 'ビジネスや仕事で今一番困っていることは？',
    options: [
      { label: 'A', text: '体のコンディションが整わず、集中・継続できない', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '発信・表現・コミュニケーションに自信がない',    scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '収益の仕組みや戦略が定まらない',              scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '全部少しずつ困っている',                      scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q05',
    text: '誰かから「ありがとう」と言われた経験で多いのは？',
    options: [
      { label: 'A', text: '体・健康・食事のアドバイスで誰かの生活が変わった', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '言葉や声で誰かの気持ちが楽になった',             scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '仕組みや考え方を整理して誰かの成果を上げた',     scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '特にない・まだわからない',                       scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q06',
    text: '自分のビジネスで「軸」にしたいのは？',
    options: [
      { label: 'A', text: '健康・体・ライフスタイルの改善', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '声・発信・コミュニケーション',  scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '合理性・仕組み化・収益構造',    scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: 'まだ決まっていない',           scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q07',
    text: '今後、どんな人の力になりたい？',
    options: [
      { label: 'A', text: '健康や体・食事に悩んでいる人',             scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '発信・自己表現・コミュニケーションに課題がある人', scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: 'ビジネスの仕組み化・収益化で行き詰まっている人',  scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: 'まだわからない',                           scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q08',
    text: '行動するとき、自分に近いのは？',
    options: [
      { label: 'A', text: '感覚・直感で動く、まずやってみるタイプ',       scores: { S: 2, M: 1, SH: 0 } },
      { label: 'B', text: 'データや根拠・計画があると安心して動けるタイプ', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'C', text: '誰かと話しながら一緒に進めたいタイプ',         scores: { S: 0, M: 2, SH: 0 } },
      { label: 'D', text: '状況によってバランスをとるタイプ',             scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q09',
    text: '情報発信について、今の正直な気持ちは？',
    options: [
      { label: 'A', text: '発信より先に体と生活を整えることが必要',     scores: { S: 2, M: 0, SH: 0 } },
      { label: 'B', text: '声・顔出し・発信力をもっと伸ばしたい',       scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '発信より仕組みやバックエンドを先に整えたい', scores: { S: 0, M: 0, SH: 2 } },
      { label: 'D', text: '全部やりたいが何から始めればいいかわからない', scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q10',
    text: 'ビジネスで一番大切にしたいのは？',
    options: [
      { label: 'A', text: '健康を土台に、無理なく長く続けること',   scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '人との深いつながりと、感謝される喜び',   scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '効率・論理・合理性で確実に結果を出すこと', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '全部をバランスよく実現すること',         scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
];

// ===== エキスパートデータ =====
const EXPERTS = {
  S: {
    name: 'ソブリン',
    title: '毒抜きダイエット専門家',
    desc: '医療業界15年。食事制限・激しい運動なしで体を変える「毒抜きダイエット」の専門家。20〜70代の幅広い年代に対応。家庭料理からできる実践的なアプローチで支持されています。',
    genre: '健康・ダイエット・ライフスタイル改善ビジネス',
    color: '#10B981',
    lineUrl: 'https://lin.ee/xFj7ump',
    consultUrl: 'https://lin.ee/xFj7ump',
  },
  M: {
    name: 'みほ',
    title: '音声心理の専門家',
    desc: 'ナレーター業・声スクール校長。20年以上の実践経験をもとに「声と心理」の両面からコミュニケーションを変える。SNS発信に悩む人を「直さずに整える」アプローチで支援。',
    genre: '声・発信・コミュニケーション改善ビジネス',
    color: '#8B5CF6',
    lineUrl: 'https://s.lmes.jp/landing-qr/2002706907-7qPklxpo?uLand=eAfCaz',
    consultUrl: 'https://s.lmes.jp/landing-qr/2002706907-7qPklxpo?uLand=eAfCaz',
  },
  SH: {
    name: 'しのみほ',
    title: '外資系×超合理主義の働き方専門家',
    desc: 'グローバルと日本のGAPを乗り越え、合理的に活躍できる人材育成の専門家。外資系企業での働き方に悩む人が、自分らしいスタイルで成果を出せるようサポート。',
    genre: 'キャリア・働き方・グローバルビジネス',
    color: '#F59E0B',
    lineUrl: 'https://line.me/ti/g2/v3sAjhTjJmxfj4J947URRRyFYzIPW4rMO9Y4yQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default',
    consultUrl: 'https://app.spirinc.com/t/BaVcJLzp1EBNlPmMopnQj/as/nEkvuC6zy3wU2bD10nCV0/confirm',
  },
};

// ===== ユーザータイプ =====
const USER_TYPES = {
  S: {
    type: '健康・エネルギー改革タイプ',
    desc: '体と生活習慣を整えることが、あなたのビジネスの土台です。\n健康・食事・ライフスタイルの知識や経験が強みとなり、\n同じ悩みを抱えた人を変える力があります。',
  },
  M: {
    type: '発信・コミュニケーション覚醒タイプ',
    desc: '言葉・声・表現力が、あなたのビジネスの武器です。\n人の気持ちに寄り添いながら自分らしく発信することで、\n深いつながりと影響力を広げていける素質があります。',
  },
  SH: {
    type: '合理・仕組み化ビジネスタイプ',
    desc: '論理的に物事を組み立て、効率よく成果を出す力があります。\nビジネスの構造を設計し、再現性のある仕組みで\n収益を最大化できるタイプです。',
  },
};

// ===== 初期化 =====
window.onload = () => {
  renderQuestions();
  setupProgress();
  document.getElementById('diagnosis-form').addEventListener('submit', handleSubmit);
};

// ===== 設問レンダリング =====
function renderQuestions() {
  const container = document.getElementById('questions-container');
  QUESTIONS.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.id = `card-${q.id}`;

    const options = q.options.map(opt => `
      <label class="option-label">
        <input type="radio" name="${q.id}" value="${opt.label}" onchange="onAnswer('${q.id}')">
        <div class="option-btn">
          <span class="option-letter">${opt.label}</span>
          <span>${opt.text}</span>
        </div>
      </label>
    `).join('');

    card.innerHTML = `
      <div class="question-num">Q${String(i+1).padStart(2,'0')}</div>
      <div class="question-text">${q.text}</div>
      <div class="options">${options}</div>
    `;
    container.appendChild(card);
  });
}

function onAnswer(qId) {
  document.getElementById(`card-${qId}`).classList.add('answered');
  updateProgress();
}

// ===== プログレス =====
function setupProgress() {
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  bar.id = 'progress-bar';
  bar.style.width = '0%';
  document.body.appendChild(bar);
}

function updateProgress() {
  const answered = QUESTIONS.filter(q => document.querySelector(`input[name="${q.id}"]:checked`)).length;
  document.getElementById('progress-bar').style.width = (answered / QUESTIONS.length * 100) + '%';
}

// ===== スコア計算 =====
function calcScores(answers) {
  const totals = { S: 0, M: 0, SH: 0 };
  QUESTIONS.forEach(q => {
    const selected = answers[q.id];
    if (!selected) return;
    const opt = q.options.find(o => o.label === selected);
    if (!opt) return;
    totals.S  += opt.scores.S;
    totals.M  += opt.scores.M;
    totals.SH += opt.scores.SH;
  });
  return totals;
}

function getWinner(scores) {
  return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
}

// ===== フォーム送信 =====
async function handleSubmit(e) {
  e.preventDefault();

  const name  = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();

  if (!name || !email) { alert('お名前とメールアドレスを入力してください'); return; }
  if (!document.getElementById('consent-check').checked) {
    alert('同意チェックボックスにチェックしてください');
    return;
  }

  const answers = {};
  const answerTexts = [];
  let missing = [];

  QUESTIONS.forEach(q => {
    const checked = document.querySelector(`input[name="${q.id}"]:checked`);
    if (checked) {
      answers[q.id] = checked.value;
      const opt = q.options.find(o => o.label === checked.value);
      answerTexts.push(`${q.text} → ${opt.text}`);
    } else {
      missing.push(q.id);
    }
  });

  if (missing.length > 0) {
    alert(`まだ回答していない質問があります（${missing.length}問）`);
    document.getElementById(`card-${missing[0]}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const scores = calcScores(answers);
  const winner = getWinner(scores);

  showLoading();

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'submit_diagnosis', profile: { name, email }, answerTexts, scores, winner }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'エラーが発生しました');
    showResult(name, scores, winner, data.report);
  } catch (err) {
    hideLoading();
    alert('送信に失敗しました。\n\n' + err.message);
  }
}

// ===== 結果表示 =====
function showResult(name, scores, winner, report) {
  hideLoading();
  document.getElementById('form-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('result-title').textContent = `${name} さんの診断結果`;

  renderUserType(winner);
  document.getElementById('ai-report-content').innerHTML = renderReport(report);
  renderExpertCard(winner);
  renderCTA(winner);
  renderMatchBars(scores, winner);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderUserType(winner) {
  const ut = USER_TYPES[winner];
  const expert = EXPERTS[winner];
  document.getElementById('user-type-section').innerHTML = `
    <div class="user-type-card" style="border-color:${expert.color};">
      <div class="user-type-label">YOUR TYPE</div>
      <div class="user-type-name" style="color:${expert.color};">${ut.type}</div>
      <div class="user-type-desc">${ut.desc}</div>
    </div>
  `;
}

function renderMatchBars(scores, winner) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const items = [
    { key: 'S',  label: 'ソブリン（健康・ライフスタイル）', color: '#10B981' },
    { key: 'M',  label: 'みほ（声・コミュニケーション）',   color: '#8B5CF6' },
    { key: 'SH', label: 'しのみほ（キャリア・ビジネス）',   color: '#F59E0B' },
  ];
  const container = document.getElementById('match-bars');
  container.innerHTML = items.map(item => {
    const pct = Math.round(scores[item.key] / total * 100);
    const isWinner = item.key === winner;
    return `
      <div class="match-bar-item">
        <div class="match-bar-header">
          <span class="match-bar-name">${isWinner ? '✨ ' : ''}${item.label}</span>
          <span class="match-bar-pct" style="color:${item.color};">${pct}%</span>
        </div>
        <div class="match-bar-track">
          <div class="match-bar-fill" style="width:${pct}%;background:${item.color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderExpertCard(winner) {
  const expert = EXPERTS[winner];
  document.getElementById('expert-card').innerHTML = `
    <div class="expert-recommend-label">あなたの状況にぴったりの専門家</div>
    <div class="expert-card" style="border-color:${expert.color};">
      <div class="expert-badge" style="background:${expert.color};">BEST MATCH</div>
      <div class="expert-name">${expert.name}</div>
      <div class="expert-title">${expert.title}</div>
      <div class="expert-desc">${expert.desc}</div>
      <span class="expert-genre">📌 ${expert.genre}</span>
    </div>
  `;
}

function renderCTA(winner) {
  const primary = EXPERTS[winner];
  const secondaryKeys = Object.keys(EXPERTS).filter(k => k !== winner);
  const secondaryCards = secondaryKeys.map(key => {
    const e = EXPERTS[key];
    return `
      <div class="expert-secondary-card" style="border-color:${e.color};">
        <div class="expert-secondary-dot" style="background:${e.color};"></div>
        <div class="expert-secondary-name">${e.name}</div>
        <div class="expert-secondary-title">${e.title}</div>
        <div class="expert-secondary-genre">${e.genre}</div>
        <div class="expert-secondary-btns">
          <a href="${e.lineUrl}" class="expert-secondary-btn" style="background:${e.color};" target="_blank">LINE</a>
          <a href="${e.consultUrl}" class="expert-secondary-btn expert-secondary-btn-outline" style="border-color:${e.color};color:${e.color};" target="_blank">相談</a>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cta-section').innerHTML = `
    <div class="cta-card">
      <h3>${primary.name} との次のステップ</h3>
      <p>あなたの強みと課題に合わせて、${primary.name}が一緒に考えます。</p>
      <div class="cta-buttons">
        <a href="${primary.lineUrl}" class="cta-btn cta-btn-line" target="_blank">
          📲 LINEで${primary.name}とつながる
        </a>
        <a href="${primary.consultUrl}" class="cta-btn cta-btn-consult" target="_blank">
          📅 無料相談を予約する
        </a>
      </div>
    </div>
    <div class="secondary-section">
      <div class="secondary-section-label">他の専門家も見てみる</div>
      <div class="expert-secondary-grid">
        ${secondaryCards}
      </div>
    </div>
  `;
}

// ===== レポートレンダラー =====
function renderReport(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  lines.forEach(line => {
    if (/^━+$/.test(line.trim())) { html += '<hr class="report-divider">'; return; }
    if (/^▼/.test(line.trim())) { html += `<div class="report-section-header">${escHtml(line.trim())}</div>`; return; }
    if (/^\d+\.\s/.test(line.trim())) { html += `<div class="report-list-item">${renderInline(line.trim())}</div>`; return; }
    if (/^●/.test(line.trim())) { html += `<div class="report-bullet">${renderInline(line.trim())}</div>`; return; }
    if (line.trim() === '') { html += '<div class="report-spacer"></div>'; return; }
    html += `<div class="report-line">${renderInline(line)}</div>`;
  });
  return html;
}

function renderInline(text) { return escHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function showLoading() {
  document.getElementById('form-screen').classList.add('hidden');
  document.getElementById('loading-screen').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading-screen').classList.add('hidden');
}

function restart() {
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('form-screen').classList.remove('hidden');
  document.getElementById('diagnosis-form').reset();
  document.querySelectorAll('.question-card').forEach(c => c.classList.remove('answered'));
  document.getElementById('progress-bar').style.width = '0%';
  window.scrollTo({ top: 0 });
}
