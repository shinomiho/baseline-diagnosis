// ===== Apps Script URL =====
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVJ8hefECLaNvEkYVr32CQD37lnCVJnu2iUqz_QV3AEmGL2DefBoW-01gSjWeGDgcU/exec';

// ===== 設問データ =====
const QUESTIONS = [
  {
    id: 'Q01',
    text: '今の月収・収入源は？',
    options: [
      { label: 'A', text: '会社員・パート（月収20万以下）', scores: { S: 1, M: 1, SH: 0 } },
      { label: 'B', text: '会社員・パート（月収20万以上）', scores: { S: 0, M: 0, SH: 2 } },
      { label: 'C', text: 'すでに副業・フリーランスあり', scores: { S: 0, M: 1, SH: 2 } },
      { label: 'D', text: '専業主婦・無職・求職中', scores: { S: 2, M: 1, SH: 0 } },
    ]
  },
  {
    id: 'Q02',
    text: '1ヶ月後、手元に増やしたい金額は？',
    options: [
      { label: 'A', text: '＋3万〜5万（まず小さく）', scores: { S: 2, M: 1, SH: 0 } },
      { label: 'B', text: '＋10万〜30万（本業並みに）', scores: { S: 1, M: 1, SH: 1 } },
      { label: 'C', text: '＋50万以上（完全独立したい）', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '金額より自由な時間がほしい', scores: { S: 1, M: 2, SH: 0 } },
    ]
  },
  {
    id: 'Q03',
    text: '今、一番しんどいのは？',
    options: [
      { label: 'A', text: 'お金・収入が不安', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'B', text: '体・健康・体型が気になる', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'C', text: '人間関係・コミュニケーションが疲れる', scores: { S: 0, M: 3, SH: 0 } },
      { label: 'D', text: '仕事・キャリアの方向性がわからない', scores: { S: 0, M: 1, SH: 2 } },
    ]
  },
  {
    id: 'Q04',
    text: 'ビジネスに使える時間は？',
    options: [
      { label: 'A', text: '週5時間以内（すき間だけ）', scores: { S: 2, M: 1, SH: 0 } },
      { label: 'B', text: '週10〜20時間（副業レベル）', scores: { S: 1, M: 1, SH: 1 } },
      { label: 'C', text: '週30時間以上（本気モード）', scores: { S: 0, M: 1, SH: 2 } },
    ]
  },
  {
    id: 'Q05',
    text: '自分の強みに近いのは？',
    options: [
      { label: 'A', text: '体・食事・健康・美容の知識や経験', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '話す・聴く・人の気持ちに寄り添う', scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '分析・整理・効率化・仕組みづくり', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: 'まだわからない', scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q06',
    text: '人との関わり方は？',
    options: [
      { label: 'A', text: '1対1で深く関わりたい', scores: { S: 1, M: 2, SH: 0 } },
      { label: 'B', text: 'グループ・コミュニティで関わりたい', scores: { S: 0, M: 1, SH: 2 } },
      { label: 'C', text: '発信メインで直接関わりは少なめ', scores: { S: 0, M: 2, SH: 1 } },
      { label: 'D', text: 'まだわからない', scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q07',
    text: '情報発信への正直な気持ちは？',
    options: [
      { label: 'A', text: '顔出し・声出しOK、ガンガンやりたい', scores: { S: 0, M: 3, SH: 1 } },
      { label: 'B', text: '声やテキストならできる', scores: { S: 0, M: 2, SH: 1 } },
      { label: 'C', text: '苦手だけど挑戦したい', scores: { S: 1, M: 1, SH: 0 } },
      { label: 'D', text: 'できれば発信なしがいい', scores: { S: 2, M: 0, SH: 1 } },
    ]
  },
  {
    id: 'Q08',
    text: '行動スタイルは？',
    options: [
      { label: 'A', text: '直感で動く、まずやってみる', scores: { S: 2, M: 1, SH: 0 } },
      { label: 'B', text: 'データや根拠があると動ける', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'C', text: '誰かと一緒に進めたい', scores: { S: 1, M: 2, SH: 0 } },
      { label: 'D', text: '計画を立ててから動く', scores: { S: 0, M: 0, SH: 3 } },
    ]
  },
  {
    id: 'Q09',
    text: 'これまでで一番「役に立てた」と感じた経験は？',
    options: [
      { label: 'A', text: '誰かの体・健康・生活習慣を改善できた', scores: { S: 3, M: 0, SH: 0 } },
      { label: 'B', text: '言葉・声・感情で誰かの気持ちが楽になった', scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '仕組みや戦略で誰かの成果を上げた', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '特にない・まだわからない', scores: { S: 1, M: 1, SH: 1 } },
    ]
  },
  {
    id: 'Q10',
    text: 'ビジネスに一番求めることは？',
    options: [
      { label: 'A', text: '無理なく、自分らしく長く続けること', scores: { S: 2, M: 1, SH: 0 } },
      { label: 'B', text: '人に感謝され、つながりを感じること', scores: { S: 0, M: 3, SH: 0 } },
      { label: 'C', text: '効率よく、論理的に結果を出すこと', scores: { S: 0, M: 0, SH: 3 } },
      { label: 'D', text: '影響力を持ち、ブランドになること', scores: { S: 1, M: 1, SH: 2 } },
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
    lineUrl: '#LINE_SOVEREIGN',
    consultUrl: '#CONSULT_SOVEREIGN',
  },
  M: {
    name: 'みほ',
    title: '音声心理の専門家',
    desc: 'ナレーター業・声スクール校長。20年以上の実践経験をもとに「声と心理」の両面からコミュニケーションを変える。SNS発信に悩む人を「直さずに整える」アプローチで支援。',
    genre: '声・発信・コミュニケーション改善ビジネス',
    color: '#8B5CF6',
    lineUrl: '#LINE_MIHO',
    consultUrl: '#CONSULT_MIHO',
  },
  SH: {
    name: 'しのみほ',
    title: '外資系×超合理主義の働き方専門家',
    desc: 'グローバルと日本のGAPを乗り越え、合理的に活躍できる人材育成の専門家。外資系企業での働き方に悩む人が、自分らしいスタイルで成果を出せるようサポート。',
    genre: 'キャリア・働き方・グローバルビジネス',
    color: '#F59E0B',
    lineUrl: '#LINE_SHINOMIHO',
    consultUrl: '#CONSULT_SHINOMIHO',
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

  renderMatchBars(scores, winner);
  renderExpertCard(winner);
  document.getElementById('ai-report-content').innerHTML = renderReport(report);
  renderCTA(winner);

  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div class="expert-card">
      <div class="expert-badge">YOUR MATCH</div>
      <div class="expert-name">${expert.name}</div>
      <div class="expert-title">${expert.title}</div>
      <div class="expert-desc">${expert.desc}</div>
      <span class="expert-genre">📌 ${expert.genre}</span>
    </div>
  `;
}

function renderCTA(winner) {
  const expert = EXPERTS[winner];
  document.getElementById('cta-section').innerHTML = `
    <div class="cta-card">
      <h3>${expert.name} との次のステップ</h3>
      <p>${expert.name}のバックエンドに進んで、あなたに合ったビジネスをスタートしましょう。</p>
      <div class="cta-buttons">
        <a href="${expert.lineUrl}" class="cta-btn cta-btn-line" target="_blank">
          📲 LINEで${expert.name}とつながる
        </a>
        <a href="${expert.consultUrl}" class="cta-btn cta-btn-consult" target="_blank">
          📅 無料相談を予約する
        </a>
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
