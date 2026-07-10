// ─── Neural Canvas Background ───────────────────────────────
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
let W, H, nodes = [], animFrame;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function initNodes(n = 60) {
  nodes = Array.from({length: n}, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 2 + 1,
  }));
}
initNodes();

function drawNeural() {
  ctx.clearRect(0, 0, W, H);
  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99,102,241,0.25)';
    ctx.fill();
  }
  requestAnimationFrame(drawNeural);
}
drawNeural();

// ─── Language Data ───────────────────────────────────────────
const LANGUAGES = [
  {code:'af',name:'Afrikaans',flag:'🇿🇦'},{code:'sq',name:'Albanian',flag:'🇦🇱'},
  {code:'am',name:'Amharic',flag:'🇪🇹'},{code:'ar',name:'Arabic',flag:'🇸🇦'},
  {code:'hy',name:'Armenian',flag:'🇦🇲'},{code:'az',name:'Azerbaijani',flag:'🇦🇿'},
  {code:'eu',name:'Basque',flag:'🏳️'},{code:'be',name:'Belarusian',flag:'🇧🇾'},
  {code:'bn',name:'Bengali',flag:'🇧🇩'},{code:'bs',name:'Bosnian',flag:'🇧🇦'},
  {code:'bg',name:'Bulgarian',flag:'🇧🇬'},{code:'ca',name:'Catalan',flag:'🏳️'},
  {code:'ceb',name:'Cebuano',flag:'🇵🇭'},{code:'ny',name:'Chichewa',flag:'🇲🇼'},
  {code:'zh',name:'Chinese (Simplified)',flag:'🇨🇳'},{code:'zh-TW',name:'Chinese (Traditional)',flag:'🇹🇼'},
  {code:'co',name:'Corsican',flag:'🏳️'},{code:'hr',name:'Croatian',flag:'🇭🇷'},
  {code:'cs',name:'Czech',flag:'🇨🇿'},{code:'da',name:'Danish',flag:'🇩🇰'},
  {code:'nl',name:'Dutch',flag:'🇳🇱'},{code:'en',name:'English',flag:'🇺🇸'},
  {code:'eo',name:'Esperanto',flag:'🏳️'},{code:'et',name:'Estonian',flag:'🇪🇪'},
  {code:'tl',name:'Filipino',flag:'🇵🇭'},{code:'fi',name:'Finnish',flag:'🇫🇮'},
  {code:'fr',name:'French',flag:'🇫🇷'},{code:'fy',name:'Frisian',flag:'🏳️'},
  {code:'gl',name:'Galician',flag:'🏳️'},{code:'ka',name:'Georgian',flag:'🇬🇪'},
  {code:'de',name:'German',flag:'🇩🇪'},{code:'el',name:'Greek',flag:'🇬🇷'},
  {code:'gu',name:'Gujarati',flag:'🇮🇳'},{code:'ht',name:'Haitian Creole',flag:'🇭🇹'},
  {code:'ha',name:'Hausa',flag:'🏳️'},{code:'haw',name:'Hawaiian',flag:'🏝️'},
  {code:'iw',name:'Hebrew',flag:'🇮🇱'},{code:'hi',name:'Hindi',flag:'🇮🇳'},
  {code:'hmn',name:'Hmong',flag:'🏳️'},{code:'hu',name:'Hungarian',flag:'🇭🇺'},
  {code:'is',name:'Icelandic',flag:'🇮🇸'},{code:'ig',name:'Igbo',flag:'🏳️'},
  {code:'id',name:'Indonesian',flag:'🇮🇩'},{code:'ga',name:'Irish',flag:'🇮🇪'},
  {code:'it',name:'Italian',flag:'🇮🇹'},{code:'ja',name:'Japanese',flag:'🇯🇵'},
  {code:'jw',name:'Javanese',flag:'🇮🇩'},{code:'kn',name:'Kannada',flag:'🇮🇳'},
  {code:'kk',name:'Kazakh',flag:'🇰🇿'},{code:'km',name:'Khmer',flag:'🇰🇭'},
  {code:'ko',name:'Korean',flag:'🇰🇷'},{code:'ku',name:'Kurdish (Kurmanji)',flag:'🏳️'},
  {code:'ky',name:'Kyrgyz',flag:'🇰🇬'},{code:'lo',name:'Lao',flag:'🇱🇦'},
  {code:'la',name:'Latin',flag:'🏛️'},{code:'lv',name:'Latvian',flag:'🇱🇻'},
  {code:'lt',name:'Lithuanian',flag:'🇱🇹'},{code:'lb',name:'Luxembourgish',flag:'🇱🇺'},
  {code:'mk',name:'Macedonian',flag:'🇲🇰'},{code:'mg',name:'Malagasy',flag:'🇲🇬'},
  {code:'ms',name:'Malay',flag:'🇲🇾'},{code:'ml',name:'Malayalam',flag:'🇮🇳'},
  {code:'mt',name:'Maltese',flag:'🇲🇹'},{code:'mi',name:'Maori',flag:'🇳🇿'},
  {code:'mr',name:'Marathi',flag:'🇮🇳'},{code:'mn',name:'Mongolian',flag:'🇲🇳'},
  {code:'my',name:'Myanmar (Burmese)',flag:'🇲🇲'},{code:'ne',name:'Nepali',flag:'🇳🇵'},
  {code:'no',name:'Norwegian',flag:'🇳🇴'},{code:'ps',name:'Pashto',flag:'🇦🇫'},
  {code:'fa',name:'Persian',flag:'🇮🇷'},{code:'pl',name:'Polish',flag:'🇵🇱'},
  {code:'pt',name:'Portuguese',flag:'🇵🇹'},{code:'pa',name:'Punjabi',flag:'🇮🇳'},
  {code:'ro',name:'Romanian',flag:'🇷🇴'},{code:'ru',name:'Russian',flag:'🇷🇺'},
  {code:'sm',name:'Samoan',flag:'🇼🇸'},{code:'gd',name:'Scottish Gaelic',flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿'},
  {code:'sr',name:'Serbian',flag:'🇷🇸'},{code:'st',name:'Sesotho',flag:'🇱🇸'},
  {code:'sn',name:'Shona',flag:'🇿🇼'},{code:'sd',name:'Sindhi',flag:'🏳️'},
  {code:'si',name:'Sinhala',flag:'🇱🇰'},{code:'sk',name:'Slovak',flag:'🇸🇰'},
  {code:'sl',name:'Slovenian',flag:'🇸🇮'},{code:'so',name:'Somali',flag:'🇸🇴'},
  {code:'es',name:'Spanish',flag:'🇪🇸'},{code:'su',name:'Sundanese',flag:'🇮🇩'},
  {code:'sw',name:'Swahili',flag:'🏳️'},{code:'sv',name:'Swedish',flag:'🇸🇪'},
  {code:'tg',name:'Tajik',flag:'🇹🇯'},{code:'ta',name:'Tamil',flag:'🇮🇳'},
  {code:'te',name:'Telugu',flag:'🇮🇳'},{code:'th',name:'Thai',flag:'🇹🇭'},
  {code:'tr',name:'Turkish',flag:'🇹🇷'},{code:'uk',name:'Ukrainian',flag:'🇺🇦'},
  {code:'ur',name:'Urdu',flag:'🇵🇰'},{code:'uz',name:'Uzbek',flag:'🇺🇿'},
  {code:'vi',name:'Vietnamese',flag:'🇻🇳'},{code:'cy',name:'Welsh',flag:'🏴󠁧󠁢󠁷󠁬󠁳󠁿'},
  {code:'xh',name:'Xhosa',flag:'🇿🇦'},{code:'yi',name:'Yiddish',flag:'🏳️'},
  {code:'yo',name:'Yoruba',flag:'🏳️'},{code:'zu',name:'Zulu',flag:'🇿🇦'}
];

const FLAG_MAP = {};
LANGUAGES.forEach(l => FLAG_MAP[l.code] = l.flag);
const NAME_MAP = {};
LANGUAGES.forEach(l => NAME_MAP[l.code] = l.name);

function populateSelects() {
  const src = document.getElementById('src-lang');
  const tgt = document.getElementById('tgt-lang');
  LANGUAGES.forEach(l => {
    src.add(new Option(`${l.flag}  ${l.name}`, l.code));
    const o2 = new Option(`${l.flag}  ${l.name}`, l.code);
    tgt.add(o2);
  });
  tgt.value = 'es'; // default target: Spanish
  updateFlags();
}
populateSelects();

function updateFlags() {
  const srcVal = document.getElementById('src-lang').value;
  const tgtVal = document.getElementById('tgt-lang').value;
  const srcWrap = document.getElementById('src-flag-wrap');
  const tgtWrap = document.getElementById('tgt-flag-wrap');
  srcWrap.setAttribute('data-flag', srcVal === 'auto' ? '🔍' : (FLAG_MAP[srcVal] || '🌐'));
  tgtWrap.setAttribute('data-flag', FLAG_MAP[tgtVal] || '🌐');
}

document.getElementById('src-lang').addEventListener('change', updateFlags);
document.getElementById('tgt-lang').addEventListener('change', updateFlags);

// ─── Char Counter ────────────────────────────────────────────
const srcText = document.getElementById('src-text');
const charCount = document.getElementById('char-count');
const detectBadge = document.getElementById('detect-badge');
let detectTimer = null;

srcText.addEventListener('input', () => {
  const len = srcText.value.length;
  charCount.textContent = `${len} / 5000`;
  charCount.className = 'char-count' + (len > 4500 ? ' danger' : len > 4000 ? ' warn' : '');

  // auto-translate on pause
  clearTimeout(detectTimer);
  detectTimer = setTimeout(() => {
    if (srcText.value.trim().length > 3) tryAutoTranslate();
  }, 1400);
});

// ─── Swap ────────────────────────────────────────────────────
document.getElementById('swap-btn').addEventListener('click', () => {
  const src = document.getElementById('src-lang');
  const tgt = document.getElementById('tgt-lang');
  const outText = document.getElementById('output-area').dataset.translation || '';
  if (!outText) return;
  [src.value, tgt.value] = [tgt.value === src.value ? 'auto' : tgt.value, src.value === 'auto' ? 'en' : src.value];
  srcText.value = outText;
  srcText.dispatchEvent(new Event('input'));
  clearOutput();
  updateFlags();
});

// ─── Clear ───────────────────────────────────────────────────
function clearOutput() {
  const area = document.getElementById('output-area');
  area.innerHTML = '<span class="output-placeholder" id="output-placeholder">Translation will appear here…</span>';
  area.dataset.translation = '';
  document.getElementById('confidence-wrap').style.display = 'none';
  detectBadge.style.display = 'none';
}

document.getElementById('clear-btn').addEventListener('click', () => {
  srcText.value = '';
  srcText.dispatchEvent(new Event('input'));
  clearOutput();
});

// ─── Copy ────────────────────────────────────────────────────
document.getElementById('copy-btn').addEventListener('click', () => {
  const t = document.getElementById('output-area').dataset.translation;
  if (!t) return;
  navigator.clipboard.writeText(t).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✅';
    btn.classList.add('success');
    showToast('Copied to clipboard!');
    setTimeout(() => { btn.textContent = '📋'; btn.classList.remove('success'); }, 1800);
  });
});

// ─── TTS ─────────────────────────────────────────────────────
let currentUtterance = null;

function speak(text, lang) {
  if (!text) return;
  window.speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = lang || 'en';
  const vis = document.getElementById('tts-vis');
  vis.classList.add('active');
  currentUtterance.onend = () => vis.classList.remove('active');
  currentUtterance.onerror = () => vis.classList.remove('active');
  window.speechSynthesis.speak(currentUtterance);
}

document.getElementById('tts-src-btn').addEventListener('click', () => {
  speak(srcText.value, document.getElementById('src-lang').value);
});

document.getElementById('tts-tgt-btn').addEventListener('click', () => {
  const t = document.getElementById('output-area').dataset.translation;
  speak(t, document.getElementById('tgt-lang').value);
});

// ─── Toast ───────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = type === 'error' ? 'error' : '';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Translation Counter ─────────────────────────────────────
let transCount = parseInt(localStorage.getItem('pingua_count') || '0');
document.getElementById('stat-count').textContent = transCount;
function incCount() {
  transCount++;
  localStorage.setItem('pingua_count', transCount);
  animateNumber(document.getElementById('stat-count'), transCount);
}

function animateNumber(el, to) {
  const from = parseInt(el.textContent) || 0;
  const dur = 400, start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(from + (to - from) * p);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── History ─────────────────────────────────────────────────
let history = JSON.parse(localStorage.getItem('pingua_history') || '[]');

function renderHistory() {
  const section = document.getElementById('history-section');
  const grid = document.getElementById('history-grid');
  if (!history.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  grid.innerHTML = history.slice(0, 6).map((item, i) => `
    <div class="history-card" data-i="${i}">
      <div class="history-langs">${item.srcLang} → ${item.tgtLang}</div>
      <div class="history-source">${item.src}</div>
      <div class="history-target">${item.tgt}</div>
    </div>
  `).join('');
  grid.querySelectorAll('.history-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = history[card.dataset.i];
      srcText.value = item.src;
      srcText.dispatchEvent(new Event('input'));
      document.getElementById('output-area').textContent = item.tgt;
      document.getElementById('output-area').dataset.translation = item.tgt;
      document.getElementById('output-placeholder') && (document.getElementById('output-placeholder').style.display = 'none');
    });
  });
}

function addHistory(src, tgt, srcLang, tgtLang) {
  const srcName = LANGUAGES.find(l => l.code === srcLang)?.name || srcLang;
  const tgtName = LANGUAGES.find(l => l.code === tgtLang)?.name || tgtLang;
  history.unshift({ src: src.slice(0, 80), tgt: tgt.slice(0, 80), srcLang: srcName, tgtLang: tgtName });
  history = history.slice(0, 12);
  localStorage.setItem('pingua_history', JSON.stringify(history));
  renderHistory();
}

document.getElementById('clear-history-btn').addEventListener('click', () => {
  history = [];
  localStorage.removeItem('pingua_history');
  renderHistory();
});

renderHistory();

// ─── Typewriter Output ───────────────────────────────────────
function typewriter(el, text, speed = 12) {
  return new Promise(resolve => {
    el.innerHTML = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.appendChild(cursor);
    function next() {
      if (i < text.length) {
        cursor.before(document.createTextNode(text[i++]));
        setTimeout(next, speed);
      } else {
        cursor.remove();
        resolve();
      }
    }
    next();
  });
}

// ─── Translation via free API ────────────────────────────────
let isTranslating = false;

async function translate() {
  const text = srcText.value.trim();
  if (!text) { showToast('Please enter text to translate', 'error'); return; }
  if (isTranslating) return;

  isTranslating = true;
  const btn = document.getElementById('translate-btn');
  btn.innerHTML = '<span class="btn-text"><span class="spinner"></span>Translating…</span>';
  btn.classList.add('loading');

  const srcLang = document.getElementById('src-lang').value;
  const tgtLang = document.getElementById('tgt-lang').value;

  const outputArea = document.getElementById('output-area');
  outputArea.innerHTML = '';
  document.getElementById('confidence-wrap').style.display = 'none';

  try {
    const langPair = `${srcLang === 'auto' ? 'auto' : srcLang}|${tgtLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langPair)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    if (!data.responseData || typeof data.responseData.translatedText !== 'string') {
      throw new Error('Unexpected response from translation service');
    }

    const translation = decodeHtmlEntities(data.responseData.translatedText);
    if (!translation) throw new Error('Empty response');

    outputArea.dataset.translation = translation;
    await typewriter(outputArea, translation, 15);

    // detected language badge
    detectBadge.style.display = 'inline-block';
    if (srcLang === 'auto') {
      const detected = guessDetectedLang(data);
      detectBadge.textContent = detected ? `Detected: ${NAME_MAP[detected] || detected}` : 'Detected: —';
    } else {
      detectBadge.textContent = `Detected: ${NAME_MAP[srcLang] || srcLang}`;
    }

    // Confidence from API match quality
    const matchQuality = Math.round((data.responseData.match || 0.85) * 100);
    const conf = Math.max(40, Math.min(99, matchQuality));
    document.getElementById('confidence-wrap').style.display = 'flex';
    setTimeout(() => {
      document.getElementById('confidence-fill').style.width = conf + '%';
      document.getElementById('confidence-label').textContent = conf + '%';
    }, 100);

    incCount();
    addHistory(text, translation, srcLang === 'auto' ? 'en' : srcLang, tgtLang);

  } catch (err) {
    outputArea.innerHTML = `<span style="color:var(--danger)">⚠ ${err.message || 'Translation failed. Please try again.'}</span>`;
    showToast('Translation failed', 'error');
  } finally {
    isTranslating = false;
    btn.innerHTML = '<span class="btn-text">✨ Translate</span>';
    btn.classList.remove('loading');
  }
}

function decodeHtmlEntities(str) {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

function guessDetectedLang(data) {
  if (data.matches && data.matches.length) {
    const first = data.matches.find(m => m.source && m.source !== 'auto');
    if (first && first.source) return first.source.split('-')[0];
  }
  return null;
}

function tryAutoTranslate() {
  if (!isTranslating && srcText.value.trim().length > 3) translate();
}

document.getElementById('translate-btn').addEventListener('click', translate);

// Ctrl+Enter shortcut
srcText.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') translate();
});
