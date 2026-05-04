// ================================================================
// BASELINE 強み・適性診断 - Google Apps Script バックエンド
// ================================================================
// 【セットアップ手順】
// 1. スクリプトプロパティに以下を設定:
//    SPREADSHEET_ID : GoogleスプレッドシートのID
//    CLAUDE_API_KEY : AnthropicのAPIキー
// 2. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」
//    実行ユーザー: 自分, アクセス: 全員
// ================================================================

function getConfig() {
  const p = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: p.getProperty('SPREADSHEET_ID'),
    claudeApiKey:  p.getProperty('CLAUDE_API_KEY'),
    claudeModel:   'claude-sonnet-4-6',
    adminEmail:    'miho.shinohe@gmail.com',
  };
}

// ===== エキスパートデータ =====
const EXPERT_DATA = {
  S: {
    name: 'ソブリン',
    field: '健康・ダイエット・ライフスタイル改善ビジネス',
    lineUrl: 'https://lin.ee/xFj7ump',
    consultUrl: 'https://lin.ee/xFj7ump',
  },
  M: {
    name: 'みほ',
    field: '声・発信・コミュニケーション改善ビジネス',
    lineUrl: 'https://s.lmes.jp/landing-qr/2002706907-7qPklxpo?uLand=eAfCaz',
    consultUrl: 'https://s.lmes.jp/landing-qr/2002706907-7qPklxpo?uLand=eAfCaz',
  },
  SH: {
    name: 'しのみほ',
    field: 'キャリア・働き方・グローバルビジネス',
    lineUrl: 'https://line.me/ti/g2/v3sAjhTjJmxfj4J947URRRyFYzIPW4rMO9Y4yQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default',
    consultUrl: 'https://app.spirinc.com/t/BaVcJLzp1EBNlPmMopnQj/as/nEkvuC6zy3wU2bD10nCV0/confirm',
  },
};

// ===== ルーター =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const config = getConfig();
    if (data.action === 'submit_diagnosis') return handleDiagnosis(data, config);
    return err('不明なアクション');
  } catch(e) { return err(e.message); }
}

function doGet(e) {
  return err('GETは使用できません');
}

// ===== 診断処理（メイン） =====
function handleDiagnosis(data, config) {
  const report = callClaudeForDiagnosis(data.profile, data.answerTexts, data.scores, data.winner, config);
  saveResponse(data, report, config);
  sendUserEmail(data.profile, data.winner, report, config);
  sendAdminEmail(data.profile, data.winner, data.scores, report, config);
  return ok({ report });
}

// ===== Claude API =====
function callClaude(system, user, config) {
  const res = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-api-key': config.claudeApiKey, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify({ model: config.claudeModel, max_tokens: 2048, system, messages: [{ role: 'user', content: user }] }),
    muteHttpExceptions: true,
  });
  const json = JSON.parse(res.getContentText());
  if (json.error) throw new Error(json.error.message);
  return json.content[0].text;
}

function callClaudeForDiagnosis(profile, answerTexts, scores, winner, config) {
  const expert = EXPERT_DATA[winner];
  const total = (scores.S || 0) + (scores.M || 0) + (scores.SH || 0) || 1;
  const pctS  = Math.round(scores.S  / total * 100);
  const pctM  = Math.round(scores.M  / total * 100);
  const pctSH = Math.round(scores.SH / total * 100);

  const system = `あなたは強み・適性分析の専門コンサルタントです。
ビジネスコミュニティBASELINEのメンバーの診断結果を分析し、
その人の強み・適性・最適なビジネスジャンルを伝えてください。

# 絶対ルール
・「${profile.name}さん」に直接語りかける文体
・温かく、前向きに、でも具体的に
・一文を短く、改行を多く（スマホ最優先）
・専門用語を避ける
・「あなたならできる」という確信を持たせる`;

  const user = `# 回答者
名前：${profile.name}

# 診断回答
${answerTexts.join('\n')}

# マッチングスコア
・健康・ライフスタイル系（ソブリン）：${pctS}%
・声・コミュニケーション系（みほ）：${pctM}%
・キャリア・ビジネス系（しのみほ）：${pctSH}%

# 推奨エキスパート：${expert.name}（${expert.field}）

# 出力形式

━━━━━━━━━━━━━━━━━━━━
▼ あなたの強みプロファイル
━━━━━━━━━━━━━━━━━━━━
[${profile.name}さんの強みと特性を3〜4文で。温かく前向きに]

━━━━━━━━━━━━━━━━━━━━
▼ あなたに向いているビジネスジャンル
━━━━━━━━━━━━━━━━━━━━
[具体的なビジネスジャンルを2〜3個、各1〜2文の理由とともに]

━━━━━━━━━━━━━━━━━━━━
▼ ${expert.name}があなたに最適な理由
━━━━━━━━━━━━━━━━━━━━
[なぜこのエキスパートとの相性が良いかを2〜3文で具体的に]

━━━━━━━━━━━━━━━━━━━━
▼ 今すぐできる最初の一歩
━━━━━━━━━━━━━━━━━━━━
[具体的で小さなアクションを1つ。背中を押す一言と共に]`;

  return callClaude(system, user, config);
}

// ===== データ保存 =====
function saveResponse(data, report, config) {
  const ss = SpreadsheetApp.openById(config.spreadsheetId);
  let sheet = ss.getSheetByName('responses');
  if (!sheet) {
    sheet = ss.insertSheet('responses');
    sheet.appendRow(['timestamp','name','email','Q01','Q02','Q03','Q04','Q05','Q06','Q07','Q08','Q09','Q10','score_s','score_m','score_sh','winner','report']);
    sheet.setFrozenRows(1);
  }
  const answers = data.answerTexts || [];
  sheet.appendRow([
    new Date().toISOString(),
    data.profile.name, data.profile.email,
    ...answers.slice(0, 10).map(a => a.split(' → ')[1] || a),
    data.scores.S, data.scores.M, data.scores.SH,
    data.winner, report,
  ]);
}

// ===== メール送信 =====
function sendUserEmail(profile, winner, report, config) {
  const expert = EXPERT_DATA[winner];
  MailApp.sendEmail({
    to: profile.email,
    subject: `【BASELINE】${profile.name}さんの強み・適性診断結果`,
    htmlBody: buildEmailHTML(profile.name, expert, report),
  });
}

function sendAdminEmail(profile, winner, scores, report, config) {
  const expert = EXPERT_DATA[winner];
  const total = (scores.S || 0) + (scores.M || 0) + (scores.SH || 0) || 1;
  const summary = `マッチ：${expert.name} ／ S:${Math.round(scores.S/total*100)}% M:${Math.round(scores.M/total*100)}% SH:${Math.round(scores.SH/total*100)}%`;
  MailApp.sendEmail({
    to: config.adminEmail,
    subject: `【BASELINE新規診断】${profile.name} → ${expert.name}`,
    htmlBody: buildEmailHTML(profile.name, expert, report, summary),
  });
}

// ===== メールHTMLビルダー =====
function buildEmailHTML(name, expert, report, adminNote) {
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Hiragino Sans',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
<tr><td><table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

  <tr><td style="background:linear-gradient(135deg,#1E293B,#0F172A);padding:36px;text-align:center;">
    <p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:4px;color:#F59E0B;">BASELINE</p>
    <h1 style="margin:0;font-size:20px;color:#fff;font-weight:800;">${name} さんの診断結果</h1>
  </td></tr>

  ${adminNote ? `<tr><td style="padding:20px 32px 0;">
    <div style="background:#F1F5F9;border-radius:8px;padding:12px 16px;font-size:13px;color:#475569;">${adminNote}</div>
  </td></tr>` : ''}

  <tr><td style="padding:24px 32px;">
    <div style="background:#FFFBEB;border:2px solid #F59E0B;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;color:#92400E;">YOUR MATCH</p>
      <p style="margin:0 0 4px;font-size:22px;font-weight:800;color:#1E293B;">${expert.name}</p>
      <p style="margin:0 0 16px;font-size:12px;color:#6B7280;">${expert.field}</p>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="padding:0 4px 0 0;">
          <a href="${expert.lineUrl}" style="display:block;background:#06C755;color:#fff;font-size:13px;font-weight:700;padding:12px;border-radius:8px;text-decoration:none;text-align:center;">📲 LINEでつながる</a>
        </td>
        <td style="padding:0 0 0 4px;">
          <a href="${expert.consultUrl}" style="display:block;background:#F59E0B;color:#1E293B;font-size:13px;font-weight:700;padding:12px;border-radius:8px;text-decoration:none;text-align:center;">📅 無料相談を予約</a>
        </td>
      </tr></table>
    </div>
    <div style="font-size:14px;line-height:1.9;color:#374151;white-space:pre-wrap;">${report}</div>
  </td></tr>

  <tr><td style="background:#F8FAFC;padding:24px 32px;text-align:center;border-top:1px solid #E2E8F0;">
    <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:4px;color:#1E293B;">BASELINE</p>
    <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF;">あなたの強みで、あなたらしいビジネスを。</p>
  </td></tr>

</table></td></tr></table>
</body></html>`;
}

// ===== ヘルパー =====
function ok(data)  { return ContentService.createTextOutput(JSON.stringify({ success: true, ...data })).setMimeType(ContentService.MimeType.JSON); }
function err(msg)  { return ContentService.createTextOutput(JSON.stringify({ success: false, error: msg })).setMimeType(ContentService.MimeType.JSON); }
