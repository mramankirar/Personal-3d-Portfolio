/* MYRA AI v2 — Aman Dhakar portfolio assistant (offline NLU, Hinglish+English, voice, message-to-Aman flow) */
(function () {
  'use strict';
  const AMAN = {
    name: 'Aman Dhakar', email: 'mramankirar@gmail.com', phone: '+91 9644152306',
    github: 'https://github.com/mramankirar', linkedin: 'https://www.linkedin.com/in/amandhakar1480/',
    resume: 'pdf/new_resume.pdf', resumeName: 'Aman_Dhakad_CV.pdf'
  };
  const SKILLS = {
    'Languages': 'C, C++, Python, Java, JavaScript, SQL',
    'Full-Stack (MERN)': 'React.js, Node.js, Express.js, HTML5, CSS3, REST APIs, Tailwind CSS',
    'Databases': 'MongoDB, MySQL, SQLite, Firebase',
    'Data Analytics': 'Power BI, Pandas, NumPy, Matplotlib, Seaborn, Excel, SQL Analysis',
    'Tools': 'Git, GitHub, VS Code, Postman, Jupyter Notebook'
  };
  const $ = id => document.getElementById(id);
  const store = {
    get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const st = { open: false, voice: false, listening: false, pending: 0, lang: 'hi', last: null, fails: 0, flow: null, rec: null, voices: [], history: store.get('myra_h') || [] };

  /* ---------- language + text helpers ---------- */
  const HI = new Set('kya hai hain kaise kaun kaha kahan kab kitna kitne mujhe batao bataiye bataye aap aapka unka uska karo kijiye dikhao dikha chahiye nahi haan aur namaste shukriya dhanyavad bhai yaar woh hum mera meri bolo sunao padhai naukri kaam sampark bhejna bhejo'.split(' '));
  const detectLang = q => (/[\u0900-\u097f]/.test(q) || q.toLowerCase().split(/\W+/).some(w => HI.has(w))) ? 'hi' : (/^[\x00-\x7f]*$/.test(q) && q.split(/\s+/).length > 2 ? 'en' : st.lang);
  const T = (en, hi) => (st.lang === 'hi' ? hi : en);
  const tok = q => q.toLowerCase().split(/[^a-z0-9+#\u0900-\u097f]+/).filter(Boolean);
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 1) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function score(q, toks, kws) {
    let s = 0;
    for (const k of kws) {
      if (k.includes(' ')) { if (q.includes(k)) s += 3; }
      else if (k.endsWith('*')) { const st_ = k.slice(0, -1); if (toks.some(t => t.startsWith(st_))) s += 2; else if (st_.length >= 4 && toks.some(t => t.length >= st_.length - 1 && lev(t.slice(0, st_.length), st_) <= 1)) s += 1.5; }
      else if (toks.includes(k)) s += 2;
      else if (k.length >= 5 && toks.some(t => t.length >= 4 && lev(t, k) <= 1)) s += 1.5;
    }
    return s;
  }
  const esc = s => (s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  const safeUrl = u => /^(https?:|mailto:|tel:|#|pdf\/)/i.test(u) ? u : '#';
  function fmt(text, rich) {
    let h = esc(text);
    if (rich) h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, a, u) => `<a href="${esc(safeUrl(u.replace(/&amp;/g, '&')))}" target="_blank" rel="noopener noreferrer">${a}</a>`);
    return h.replace(/\n/g, '<br>');
  }

  /* ---------- page actions ---------- */
  function goTo(id) { const el = $(id); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return true; } return false; }
  function setTheme(want) {
    const cur = document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'day';
    if (cur !== want) { const b = $('themeToggle'); if (b) b.click(); }
    return cur === want;
  }
  function downloadCV() { const a = document.createElement('a'); a.href = AMAN.resume; a.download = AMAN.resumeName; document.body.appendChild(a); a.click(); a.remove(); }
  const siteProjects = () => (typeof projects !== 'undefined' && Array.isArray(projects)) ? projects : [];
  const siteCreds = () => (typeof credentials !== 'undefined' && Array.isArray(credentials)) ? credentials : [];

  /* ---------- intents (specific first; ties go to earlier) ---------- */
  const INTENTS = [
    { id: 'message', kw: ['send message', 'leave message', 'message aman', 'message bhejo', 'message bhejna', 'msg aman', 'leave a note', 'write to aman', 'संदेश'], run: () => { st.flow = { step: 'msg' }; $('myraInput').maxLength = 600; return { text: T('Sure! Type the message you want to send to Aman (type **cancel** to stop).', 'Zaroor! Aman ko jo message bhejna hai wo type kijiye (rokne ke liye **cancel** likhein).') }; } },
    { id: 'resume', kw: ['resume', 'cv', 'biodata', 'रिज्यूमे', 'download*'], run: q => {
        const dl = /download|save|dedo|de do|bhejo/.test(q); if (dl) downloadCV();
        return { text: dl ? T('Done — the resume download has started.', 'Resume download shuru kar diya hai.') : T('Here is Aman\'s resume.', 'Ye raha Aman ka resume.'), links: [{ label: 'Download CV', href: AMAN.resume, download: AMAN.resumeName }] }; } },
    { id: 'theme_dark', kw: ['dark mode', 'night mode', 'dark theme', 'night theme', 'dark kar', 'raat'], run: () => ({ text: setTheme('night') ? T('Already in night mode 🌙', 'Night mode pehle se on hai 🌙') : T('Switched to night mode 🌙', 'Night mode on kar diya 🌙') }) },
    { id: 'theme_light', kw: ['light mode', 'day mode', 'light theme', 'day theme', 'white mode', 'light kar'], run: () => ({ text: setTheme('day') ? T('Already in day mode ☀️', 'Day mode pehle se on hai ☀️') : T('Switched to day mode ☀️', 'Day mode on kar diya ☀️') }) },
    { id: 'goto', kw: ['go to', 'scroll', 'open section', 'le chalo', 'navigate'], run: q => {
        const map = { about: 'about', skill: 'skills', project: 'projects', experience: 'experience', credential: 'credentials', certificate: 'credentials', journey: 'journey', feedback: 'feedback', contact: 'contact', home: 'home' };
        const k = Object.keys(map).find(x => q.includes(x)); if (k && goTo(map[k])) return { text: T(`Taking you to **${map[k]}**.`, `**${map[k]}** section par le ja raha hoon.`) };
        return { text: T('Which section? About, Skills, Projects, Experience, Credentials, Journey, Feedback or Contact.', 'Kaunsa section? About, Skills, Projects, Experience, Credentials, Journey, Feedback ya Contact.') }; } },
    { id: 'skills', kw: ['skill*', 'stack', 'tech*', 'language*', 'tools', 'react', 'node', 'express', 'python', 'sql', 'mongodb', 'java', 'javascript', 'c++', 'excel', 'power bi', 'powerbi', 'tailwind', 'pandas', 'mern', 'know', 'aata', 'janta', 'hunar', 'कौशल'], run: q => {
        goTo('skills'); const all = Object.values(SKILLS).join(', ').split(', ');
        const hit = all.find(s => q.includes(s.toLowerCase().replace(/\.js$/, '').replace(' css', '')) && s.length > 1) || (q.includes('powerbi') && 'Power BI');
        if (hit && /(know|aata|janta|use|experience|hai|does|can|is)/.test(q)) return { text: T(`Yes — **${hit}** is part of Aman's toolkit. He uses it in his internships and projects.`, `Haan — **${hit}** Aman ke toolkit me hai aur wo ise internships/projects me use karte hain.`) };
        return { text: '**Aman\'s skills**\n' + Object.entries(SKILLS).map(([k, v]) => `• **${k}:** ${v}`).join('\n') }; } },
    { id: 'projects', kw: ['project*', 'built', 'build', 'shipped', 'demo', 'banaya', 'portfolio work', 'प्रोजेक्ट'], run: () => {
        goTo('projects'); const p = siteProjects();
        if (!p.length) return { text: T('Projects are listed in the Projects section — I\'ve scrolled there for you.', 'Projects, Projects section me hain — wahan scroll kar diya.') };
        return { text: '**Projects**\n' + p.map((x, i) => `${i + 1}. **${x.title}** — ${x.desc}`).join('\n'), links: p.flatMap(x => [x.demo && { label: 'Live demo', href: x.demo }, x.code && { label: 'Code', href: x.code }].filter(Boolean)) }; } },
    { id: 'experience', kw: ['experience', 'intern*', 'job*', 'company', 'worked', 'working', 'naukri', 'kaam', 'role', 'work experience'], run: () => { goTo('experience'); return { text: '**Experience**\n• **Data Analyst Intern** — Internship Studio (Oct 2026 – Present): Python, SQL, Power BI dashboards.\n• **MERN Full-Stack Intern** — EduSkills Academy · AICTE (Sep – Dec 2026): React, Node/Express REST APIs, MongoDB.\n• **Aspire Leaders Program** — Harvard Aspire Institute (2026): leadership & communication.' }; } },
    { id: 'education', kw: ['education', 'college', 'degree', 'cgpa', 'study', 'studies', 'btech', 'university', 'padhai', 'marks', 'percentage', 'school'], run: () => { goTo('journey'); return { text: '**Education**\n• B.Tech Computer Science — ITM Gwalior (2023–2027), CGPA 6.7/10\n• Class 12 — Brijpal Central Academy, Kailaras: 60%\n• Class 10 (MP Board) — Brijpal Central Academy: 92%' }; } },
    { id: 'certs', kw: ['certificate*', 'certification*', 'credential*', 'course*', 'award*'], run: () => { goTo('credentials'); const c = siteCreds(); return { text: c.length ? '**Credentials**\n' + c.map(x => `• **${x.title}** — ${x.issuer} (${x.date})`).join('\n') : T('See the Credentials section.', 'Credentials section dekhiye.') }; } },
    { id: 'hire', kw: ['hire', 'hiring', 'available', 'availability', 'open to work', 'freelance', 'opportunit*', 'recruit*', 'job offer', 'remote'], run: () => { goTo('contact'); return { text: T('Aman is **open to internships and entry-level roles** (Full-Stack & Data Analytics), remote or on-site. Use the form, or I can pass your message on.', 'Aman **internships aur entry-level roles** (Full-Stack & Data Analytics) ke liye open hain — remote ya on-site. Form bharein, ya main aapka message pahucha dun.'), links: [{ label: 'Email Aman', href: 'mailto:' + AMAN.email }], chips: ['Send a message to Aman'] }; } },
    { id: 'contact', kw: ['contact', 'email', 'mail', 'phone', 'number', 'whatsapp', 'call', 'reach', 'sampark', 'संपर्क'], run: () => { goTo('contact'); return { text: `**Contact**\n• Email: [${AMAN.email}](mailto:${AMAN.email})\n• Phone / WhatsApp: [${AMAN.phone}](tel:${AMAN.phone.replace(/\s/g, '')})\n• [LinkedIn](${AMAN.linkedin}) · [GitHub](${AMAN.github})`, chips: ['Send a message to Aman'] }; } },
    { id: 'social', kw: ['github', 'linkedin', 'social', 'profile'], run: q => ({ text: T('Here are Aman\'s profiles:', 'Aman ki profiles:'), links: [{ label: 'GitHub', href: AMAN.github }, { label: 'LinkedIn', href: AMAN.linkedin }].filter(l => !/github|linkedin/.test(q) || q.includes(l.label.toLowerCase())) }) },
    { id: 'location', kw: ['location', 'where', 'city', 'kahan', 'kaha', 'address', 'based'], run: () => ({ text: T('Aman is based in **Gwalior & Kailaras, Madhya Pradesh, India**.', 'Aman **Gwalior aur Kailaras, Madhya Pradesh, India** se hain.') }) },
    { id: 'who', kw: ['who is', 'kaun', 'introduce*', 'intro', 'parichay', 'about aman', 'about him', 'tell me about aman'], run: () => { goTo('about'); return { text: T('**Aman Dhakar** is a final-year B.Tech CS student at ITM Gwalior focused on **Full-Stack (MERN)** and **Data Analytics** (Python, SQL, Power BI). He has completed internships and built projects — ask me about any of them.', '**Aman Dhakar** ITM Gwalior me final-year B.Tech CS student hain, jinka focus **Full-Stack (MERN)** aur **Data Analytics** (Python, SQL, Power BI) par hai. Internships complete ki hain aur projects banaye hain — kuch bhi puchhiye.') }; } },
    { id: 'me', kw: ['myra', 'your name', 'who are you', 'tum kaun', 'aap kaun', 'are you ai', 'bot'], run: () => ({ text: T('I\'m **Myra**, Aman\'s portfolio assistant. I answer from the details on this site, can navigate it, switch themes, share the resume and send your message to Aman.', 'Main **Myra** hoon, Aman ki portfolio assistant. Main is site ki details se jawab deti hoon, navigate kar sakti hoon, theme badal sakti hoon, resume de sakti hoon aur aapka message Aman tak bhej sakti hoon.') }) },
    { id: 'help', kw: ['help', 'what can you do', 'options', 'madad', 'kya kar sakti'], run: () => ({ text: T('Try: **skills**, **projects**, **experience**, **education**, **certificates**, **contact**, **resume**, **dark mode**, or **send a message to Aman**.', 'Ye puchhiye: **skills**, **projects**, **experience**, **education**, **certificates**, **contact**, **resume**, **dark mode**, ya **Aman ko message bhejo**.') }) },
    { id: 'thanks', kw: ['thanks', 'thank', 'thx', 'shukriya', 'dhanyavad', 'धन्यवाद', 'शुक्रिया'], run: () => ({ text: T('You\'re welcome! 😊 Anything else?', 'Koi baat nahi! 😊 Aur kuch?') }) },
    { id: 'bye', kw: ['bye', 'goodbye', 'see you', 'alvida', 'tata'], run: () => ({ text: T('Bye! Thanks for visiting 👋', 'Alvida! Visit ke liye shukriya 👋') }) },
    { id: 'more', kw: ['more', 'details', 'detail', 'aur batao', 'aur', 'next', 'phir', 'elaborate'], run: () => {
        const l = st.last; if (l === 'projects') { const p = siteProjects()[0]; if (p) return { text: `**${p.title}**\nTech: ${p.tags.join(', ')}`, links: [p.demo && { label: 'Live demo', href: p.demo }, p.code && { label: 'Code', href: p.code }].filter(Boolean) }; }
        if (l === 'skills') return { text: T('He uses MERN for products and Python/SQL/Power BI for analysis. Ask about a specific tool, e.g. "does he know React?"', 'MERN products ke liye aur Python/SQL/Power BI analysis ke liye. Kisi tool ke baare me puchhiye, jaise "React aata hai?"') };
        return { text: T('What would you like more on — skills, projects, or experience?', 'Kis par aur jaanna hai — skills, projects ya experience?') }; } },
    { id: 'greet', kw: ['hi', 'hii', 'hello', 'hey', 'namaste', 'namaskar', 'hola', 'good morning', 'good afternoon', 'good evening', 'kaise ho', 'नमस्ते'], run: () => ({ text: T('Hello! 👋 I\'m **Myra**, Aman\'s assistant. Ask about his **projects**, **skills**, **experience**, or get his **resume**.', 'Namaste! 👋 Main **Myra** hoon, Aman ki assistant. Unke **projects**, **skills**, **experience** puchhiye ya **resume** lijiye.') }) }
  ];
  const CHIPS = { en: ['Skills', 'Projects', 'Experience', 'Contact'], hi: ['Skills', 'Projects', 'Experience', 'Contact'] };

  /* ---------- message-to-Aman flow ---------- */
  async function flowStep(q) {
    const f = st.flow;
    if (/^(cancel|stop|exit|nahi|no|रद्द)$/i.test(q)) { endFlow(); return { text: T('Cancelled. Nothing was sent.', 'Cancel kar diya. Kuch bhi nahi bheja gaya.') }; }
    if (f.step === 'msg') { if (q.length < 5) return { text: T('Please write a slightly longer message.', 'Thoda lamba message likhiye.') }; f.msg = q; f.step = 'email'; return { text: T('Got it. What\'s your **email** so Aman can reply?', 'Theek hai. Aapka **email** kya hai taaki Aman reply kar sake?') }; }
    if (f.step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q)) return { text: T('That doesn\'t look like a valid email. Try again or type **cancel**.', 'Ye valid email nahi lag raha. Dobara likhiye ya **cancel** likhiye.') };
      const email = q, msg = f.msg; endFlow();
      const M = window.MAIL || {}; let ok = false;
      if (M.key && typeof M.send === 'function') ok = await M.send({ subject: 'Message via Myra AI', from_name: 'Portfolio visitor', name: 'Portfolio visitor', email, message: msg });
      if (ok) return { text: T('✅ Sent! Aman will reply to ' + email + ' soon.', '✅ Bhej diya! Aman jaldi ' + email + ' par reply karenge.') };
      const href = `mailto:${AMAN.email}?subject=${encodeURIComponent('Portfolio message')}&body=${encodeURIComponent(msg + '\n\nReply to: ' + email)}`;
      return { text: T('I couldn\'t send it automatically (network/config issue). Nothing was lost — use this button to send it from your email app.', 'Main automatically nahi bhej payi (network/config issue). Message safe hai — is button se apne email app se bhej dijiye.'), links: [{ label: 'Open email app', href }] };
    }
  }
  function endFlow() { st.flow = null; const i = $('myraInput'); if (i) i.maxLength = 250; }

  /* ---------- reply engine ---------- */
  async function reply(raw) {
    const q = raw.toLowerCase().trim();
    if (st.flow) return flowStep(raw.trim());
    const toks = tok(q); let best = null, top = 0;
    for (const it of INTENTS) { const s = score(q, toks, it.kw); if (s > top) { top = s; best = it; } }
    if (best && top >= 1.5) { st.fails = 0; const r = await best.run(q); st.last = best.id; return r; }
    st.fails++;
    const r = { text: T('I\'m not sure I got that. I can tell you about Aman\'s **skills, projects, experience, education, certificates** or **contact details**.', 'Mujhe ye theek se samajh nahi aaya. Main Aman ke **skills, projects, experience, education, certificates** ya **contact** ke baare me bata sakti hoon.') };
    if (st.fails >= 2) { r.text += '\n' + T('Or I can send your question to Aman directly.', 'Ya main aapka sawal seedha Aman ko bhej sakti hoon.'); r.chips = ['Send a message to Aman']; }
    return r;
  }

  /* ---------- rendering ---------- */
  function render(m) {
    const box = $('myraMessages'); if (!box) return;
    const b = document.createElement('div'); b.className = 'myra-bubble ' + (m.user ? 'user' : 'bot');
    b.innerHTML = fmt(m.text, !m.user);
    if (m.links && m.links.length) {
      const w = document.createElement('div'); w.className = 'myra-links';
      m.links.forEach(l => { const a = document.createElement('a'); a.href = safeUrl(l.href); a.textContent = l.label; if (l.download) a.setAttribute('download', l.download); else if (/^https?:/.test(l.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } w.appendChild(a); });
      b.appendChild(w);
    }
    if (m.chips && m.chips.length) {
      const w = document.createElement('div'); w.className = 'myra-links';
      m.chips.forEach(c => { const x = document.createElement('button'); x.type = 'button'; x.textContent = c; x.addEventListener('click', () => send(c)); w.appendChild(x); });
      b.appendChild(w);
    }
    box.appendChild(b); box.scrollTop = box.scrollHeight;
  }
  function say(m, speak = true) {
    render(m); st.history.push(m); st.history = st.history.slice(-40); store.set('myra_h', st.history);
    if (!m.user && speak && st.voice) speak_(m.text);
  }
  async function send(text) {
    const inp = $('myraInput'); const q = (text || (inp && inp.value) || '').trim();
    if (!q) return; if (inp) inp.value = '';
    if (!st.flow) st.lang = detectLang(q);
    say({ text: q, user: true });
    const typing = $('myraTyping'); st.pending++; if (typing) typing.hidden = false;
    let r;
    try { r = await reply(q); } catch (e) { console.error('Myra error', e); r = { text: T('Something went wrong on my side — please try again.', 'Mere taraf se kuch gadbad hui — dobara try kijiye.') }; }
    await new Promise(res => setTimeout(res, Math.min(250 + (r.text || '').length * 3, 900)));
    st.pending = Math.max(0, st.pending - 1); if (typing && !st.pending) typing.hidden = true;
    say(r);
  }

  /* ---------- voice out ---------- */
  const loadVoices = () => { if (window.speechSynthesis) st.voices = speechSynthesis.getVoices() || []; };
  function pickVoice(hi) {
    const v = st.voices; if (!v.length) return null;
    const pref = hi ? ['hi-in', 'en-in'] : ['en-in', 'en-gb', 'en-us'];
    const fem = /(female|zira|aria|jenny|samantha|veena|swara|neerja|heera|kalpana|priya|karen|victoria|google)/i;
    for (const l of pref) { const m = v.filter(x => x.lang.toLowerCase().replace('_', '-').startsWith(l)); const f = m.find(x => fem.test(x.name)) || m[0]; if (f) return f; }
    return v.find(x => /^en/i.test(x.lang)) || v[0];
  }
  function speak_(text) {
    if (!window.speechSynthesis) return;
    try {
      speechSynthesis.cancel();
      const clean = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*#_`•✅]/g, '').replace(/https?:\/\/\S+/g, '').replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, '').replace(/\n+/g, '. ');
      const parts = clean.match(/[^.!?]+[.!?]*/g) || [clean];
      const voice = pickVoice(st.lang === 'hi');
      parts.map(s => s.trim()).filter(Boolean).forEach(s => { const u = new SpeechSynthesisUtterance(s); if (voice) { u.voice = voice; u.lang = voice.lang; } u.pitch = 1.1; u.rate = 1; speechSynthesis.speak(u); });
    } catch (e) { console.warn('Speech error', e); }
  }

  /* ---------- voice in ---------- */
  function setupMic() {
    const C = window.SpeechRecognition || window.webkitSpeechRecognition; if (!C) return;
    const r = st.rec = new C(); r.continuous = false; r.interimResults = false; r.lang = 'en-IN'; r.maxAlternatives = 1;
    r.onstart = () => { st.listening = true; $('myraMic').classList.add('listening'); };
    r.onresult = e => { const t = e.results[0][0].transcript; if (t) send(t); };
    r.onerror = e => {
      const msg = { 'not-allowed': T('Microphone permission is blocked. Allow it in the browser address bar and try again.', 'Microphone permission blocked hai. Browser me allow karke dobara try kijiye.'), 'service-not-allowed': T('Voice input isn\'t allowed here.', 'Yahan voice input allowed nahi hai.'), 'no-speech': T('I didn\'t hear anything — try again.', 'Kuch sunai nahi diya — dobara bolein.'), 'network': T('Voice input needs an internet connection.', 'Voice input ke liye internet chahiye.'), 'audio-capture': T('No microphone found.', 'Microphone nahi mila.') }[e.error];
      if (msg) say({ text: msg }, false); stopMic();
    };
    r.onend = stopMic;
  }
  function toggleMic() {
    if (!st.rec) { say({ text: T('Voice input isn\'t supported in this browser (try Chrome/Edge). You can type instead.', 'Is browser me voice input support nahi hai (Chrome/Edge try kijiye). Aap type kar sakte hain.') }, false); return; }
    if (st.listening) { try { st.rec.stop(); } catch (e) {} return; }
    try { if (window.speechSynthesis) speechSynthesis.cancel(); st.rec.start(); } catch (e) { stopMic(); }
  }
  function stopMic() { st.listening = false; const m = $('myraMic'); if (m) m.classList.remove('listening'); }

  /* ---------- panel ---------- */
  function openPanel() {
    const p = $('myraPanel'), f = $('myraFab'); if (!p) return; st.open = true; p.classList.add('open'); if (f) f.setAttribute('aria-expanded', 'true');
    const h = $('myraHint'); if (h) h.classList.remove('show');
    setTimeout(() => { const i = $('myraInput'); if (i) i.focus(); }, 150);
    if (!$('myraMessages').children.length) say({ text: T('Hi! 👋 I\'m **MYRA**, Aman\'s portfolio assistant. Ask about his projects, skills or experience — I understand English and Hinglish.', 'Hi! 👋 Main **MYRA** hoon, Aman ki portfolio assistant. Unke projects, skills ya experience puchhiye — main English aur Hinglish dono samajhti hoon.') }, false);
  }
  function closePanel() {
    st.open = false; const p = $('myraPanel'), f = $('myraFab'); if (p) p.classList.remove('open'); if (f) { f.setAttribute('aria-expanded', 'false'); f.focus(); }
    if (window.speechSynthesis) speechSynthesis.cancel(); try { st.rec && st.listening && st.rec.stop(); } catch (e) {}
  }

  function init() {
    const fab = $('myraFab'), panel = $('myraPanel'); if (!fab || !panel) { console.warn('Myra: markup missing'); return; }
    const box = $('myraMessages'); box.setAttribute('role', 'log'); box.setAttribute('aria-live', 'polite'); fab.setAttribute('aria-expanded', 'false');
    st.history.forEach(render);
    loadVoices(); if (window.speechSynthesis) speechSynthesis.addEventListener('voiceschanged', loadVoices);
    setupMic();
    fab.addEventListener('click', () => (st.open ? closePanel() : openPanel()));
    $('myraCloseBtn').addEventListener('click', closePanel);
    $('myraForm').addEventListener('submit', e => { e.preventDefault(); send(); });
    $('myraMic').addEventListener('click', toggleMic);
    $('myraChips').addEventListener('click', e => { const b = e.target.closest('button[data-q]'); if (b) send(b.dataset.q); });
    $('myraVoiceTog').addEventListener('click', () => {
      st.voice = !st.voice; $('myraVoiceTog').classList.toggle('active', st.voice); $('myraVoiceTog').setAttribute('aria-pressed', String(st.voice));
      if (st.voice) { say({ text: T('Voice replies **ON**.', 'Voice replies **ON** hain.') }, false); speak_(T('Voice replies are on.', 'Voice replies on hain.')); } else { if (window.speechSynthesis) speechSynthesis.cancel(); say({ text: T('Voice replies **OFF**.', 'Voice replies **OFF** hain.') }, false); }
    });
    $('myraClearChat').addEventListener('click', () => { box.innerHTML = ''; st.history = []; st.flow = null; st.last = null; st.fails = 0; store.set('myra_h', []); if (window.speechSynthesis) speechSynthesis.cancel(); say({ text: T('Chat cleared. How can I help?', 'Chat clear ho gayi. Main kya madad karun?') }, false); });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && st.open) closePanel();
      if (e.ctrlKey && e.code === 'Space') { e.preventDefault(); st.open ? closePanel() : openPanel(); }
    });
    if (!store.get('myra_hint')) setTimeout(() => { const h = $('myraHint'); if (!st.open && h) { h.classList.add('show'); store.set('myra_hint', 1); setTimeout(() => h.classList.remove('show'), 5000); } }, 2500);
  }
  window.MYRA = { reply: q => { st.lang = detectLang(q); return reply(q); }, _st: st };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
