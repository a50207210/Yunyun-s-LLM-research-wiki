'use strict';
// 零套件的唯讀Markdown Wiki網站。新增頁面只須更新wiki/catalog.json及Markdown。
const TYPES = {synthesis:'跨文獻綜整',concept:'核心概念',method:'研究方法',source:'來源摘要'};
const TYPE_ORDER = ['synthesis','concept','method','source'];
let catalog = [];
let current = null;
const $ = (selector) => document.querySelector(selector);
const safe = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function inlineMarkdown(s, page) {
  let html = safe(s);
  const placeholders = [];
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, caption, href) => {
    let value = safe(caption);
    // href尚未反解，只有http(s)、相對Markdown頁面或頁內錨點可轉連結。
    const decodedHref = href.replace(/&amp;/g, '&');
    if (/^https?:\/\//i.test(decodedHref)) {
      value = `<a href="${safe(decodedHref)}" target="_blank" rel="noopener noreferrer">${value} ↗</a>`;
    } else if (decodedHref.startsWith('#')) {
      value = `<span>${value}</span>`;
    } else {
      try {
        const destination = new URL(decodedHref, new URL(page.path, document.baseURI));
        const matching = catalog.find((p) => new URL(p.path, document.baseURI).pathname === destination.pathname);
        if (matching) value = `<a href="?page=${encodeURIComponent(matching.id)}" data-page="${safe(matching.id)}">${value}</a>`;
        else if (destination.origin === location.origin) value = `<a href="${safe(destination.href)}" target="_blank" rel="noopener noreferrer">${value} ↗</a>`;
      } catch (_) { /* invalid href: display plain caption */ }
    }
    placeholders.push(value);
    return `@@LINK${placeholders.length - 1}@@`;
  });
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html.replace(/@@LINK(\d+)@@/g, (_m, i) => placeholders[Number(i)]);
}
function renderMarkdown(content, page) {
  const body = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const lines = body.split(/\r?\n/);
  const out = [];
  let list = null, inCode = false, code = [];
  function closeList() { if (list) { out.push(`</${list}>`); list = null; } }
  for (const line of lines) {
    if (/^```/.test(line)) {
      closeList();
      if (!inCode) { inCode = true; code = []; }
      else { out.push(`<pre><code>${safe(code.join('\n'))}</code></pre>`); inCode = false; }
      continue;
    }
    if (inCode) { code.push(line); continue; }
    if (!line.trim()) { closeList(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)/);
    if (heading) { closeList(); const level = heading[1].length; out.push(`<h${level}>${inlineMarkdown(heading[2], page)}</h${level}>`); continue; }
    const match = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)/);
    if (match) {
      const newList = /^\d/.test(match[2]) ? 'ol' : 'ul';
      if (list !== newList) { closeList(); list = newList; out.push(`<${list}>`); }
      out.push(`<li>${inlineMarkdown(match[3], page)}</li>`);
      continue;
    }
    closeList();
    if (/^>\s?/.test(line)) { out.push(`<blockquote><p>${inlineMarkdown(line.replace(/^>\s?/,''), page)}</p></blockquote>`); continue; }
    if (/^---+$/.test(line.trim())) { out.push('<hr>'); continue; }
    out.push(`<p>${inlineMarkdown(line, page)}</p>`);
  }
  if (inCode) out.push(`<pre><code>${safe(code.join('\n'))}</code></pre>`);
  closeList();
  return out.join('\n');
}
function drawNav(query='') {
  const container = $('#nav');
  container.replaceChildren();
  const filtered = catalog.filter(p => `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  if (filtered.length===0) { container.innerHTML='<p class="empty-nav">沒有符合的頁面，請更換搜尋字詞。</p>'; return; }
  for (const type of TYPE_ORDER) {
    const group = filtered.filter(p => p.type===type);
    if (!group.length) continue;
    const title = document.createElement('div'); title.className='nav-title'; title.textContent=TYPES[type] || type; container.append(title);
    for (const page of group) {
      const btn=document.createElement('button'); btn.type='button'; btn.className='nav-item'+(current?.id===page.id?' active':'');
      btn.textContent=page.title; btn.addEventListener('click',()=>openPage(page.id,true)); container.append(btn);
    }
  }
}
async function openPage(id, pushHistory=false) {
  const page = catalog.find(p=>p.id===id) || catalog[0];
  if (!page) return;
  current = page;
  if (pushHistory) window.history.pushState({page:page.id},'',`?page=${encodeURIComponent(page.id)}`);
  $('#breadcrumbs').textContent=`Wiki / ${TYPES[page.type]||page.type} / ${page.title}`;
  $('#updated').textContent=`更新：${page.updated}`;
  $('#article').innerHTML='<p>正在載入內容…</p>';
  drawNav($('#search').value);
  try {
    const response = await fetch(page.path, {cache:'no-cache'});
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (current.id===page.id) $('#article').innerHTML=renderMarkdown(text,page);
  } catch (error) {
    $('#article').innerHTML=`<h1>無法載入頁面</h1><p>請確認檔案已上傳，且已透過GitHub Pages或本機HTTP伺服器開啟網站。</p><p><code>${safe(error.message)}</code></p>`;
  }
}
async function init(){
  try{
    const response=await fetch('wiki/catalog.json',{cache:'no-cache'});
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    const data=await response.json();
    catalog=data.pages || [];
    $('#page-count').textContent=String(catalog.length).padStart(2,'0');
    $('#source-count').textContent=String(catalog.filter(p=>p.type==='source').length).padStart(2,'0');
    $('#search').addEventListener('input',(event)=>drawNav(event.target.value));
    $('#article').addEventListener('click',(event)=>{
      const anchor=event.target.closest('a[data-page]');
      if(anchor){event.preventDefault();openPage(anchor.dataset.page,true);$('.reader').scrollIntoView({behavior:'smooth',block:'start'});}
    });
    window.addEventListener('popstate',()=>openPage(new URLSearchParams(location.search).get('page') || catalog[0]?.id));
    const target=new URLSearchParams(location.search).get('page') || 'research-map';
    await openPage(target);
  }catch(error){
    $('#article').innerHTML=`<h1>尚未成功載入Wiki</h1><p>請確認<code>wiki/catalog.json</code>在儲存庫中，並透過GitHub Pages開啟網站。直接雙擊HTML可能受到瀏覽器安全限制。</p><p>${safe(error.message)}</p>`;
  }
}
init();
