#!/usr/bin/env python3
"""LLM Research Wiki靜態檢核器：只使用Python標準函式庫。"""
from pathlib import Path
import json, re, sys
from urllib.parse import urlparse, unquote

ROOT=Path(__file__).resolve().parents[1]
WIKI=ROOT/'wiki'
issues=[]
def issue(text): issues.append(text)

catalog=json.loads((WIKI/'catalog.json').read_text(encoding='utf-8'))
pages=catalog.get('pages',[])
ids=set(); paths={p.get("path") for p in pages}
raw_source_ids=set()
for raw_file in (ROOT/"raw/sources").glob("*.md"):
    match=re.search(r"^- 來源ID：(\S+)$",raw_file.read_text(encoding="utf-8"),re.MULTILINE)
    if match: raw_source_ids.add(match.group(1))
required={'id','title','type','path','summary','tags','updated','status'}
for p in pages:
    if not required.issubset(p): issue(f"catalog欄位不足：{p}"); continue
    if p['id'] in ids: issue('重複id：'+p['id'])
    if [x["path"] for x in pages].count(p["path"]) > 1: issue('重複path：'+p['path'])
    ids.add(p['id'])
    filepath=(ROOT/p['path']).resolve()
    if not filepath.is_relative_to(WIKI.resolve()) or not filepath.is_file():
        issue('檔案不存在或路徑不合法：'+p['path']);continue
    content=filepath.read_text(encoding='utf-8')
    front=re.match(r'^---\s*\n([\s\S]*?)\n---\s*\n',content)
    if not front: issue('缺少YAML frontmatter：'+p['path']);continue
    values={}
    for line in front.group(1).splitlines():
        if ':' in line:
            k,v=line.split(':',1); values[k.strip()]=v.strip()
    for k in ('id','title','type','updated','status','tags','source_ids'):
        if k not in values: issue(f'frontmatter缺少{k}：{p["path"]}')
    for k in ('id','title','type','updated','status'):
        if values.get(k)!=p.get(k): issue(f'{k}與catalog不一致：{p["path"]}')
    if values.get('tags') != '['+', '.join(p['tags'])+']': issue('tags不一致：'+p['path'])
    if p['type'] not in ('concept','method','source','synthesis'): issue('未知類型：'+p['path'])
    if p['status'] not in ('draft','reviewed','needs-verification'): issue('未知狀態：'+p['path'])
    if '## 相關頁面' not in content: issue('缺少相關頁面：'+p['path'])
    if '## 參考來源' not in content: issue('缺少參考來源：'+p['path'])
    for link in re.findall(r'\[[^\]]*\]\(([^)]+)\)',content):
        if urlparse(link).scheme or link.startswith('#'): continue
        target=unquote(link.split('#',1)[0])
        resolved=(filepath.parent/target).resolve()
        if not resolved.is_relative_to(ROOT.resolve()) or not resolved.exists():
            issue(f'失效內部連結：{p["path"]} → {link}')
        elif resolved.suffix.lower()=='.md' and resolved.is_relative_to(WIKI.resolve()) and resolved.relative_to(ROOT).as_posix() not in paths:
            issue(f'未登錄的頁面連結：{p["path"]} → {link}')
    sources=values.get('source_ids','[]').strip('[] ').split(',')
    for src in (s.strip() for s in sources if s.strip()):
        if src not in raw_source_ids:
            issue(f'來源ID未建檔：{p["path"]} → {src}')

# 禁止存在未登錄的知識頁面，讓GitHub Pages顯示和Wiki實際內容一致。
for f in WIKI.rglob('*.md'):
    rel=f.relative_to(ROOT).as_posix()
    if rel in ('wiki/index.md','wiki/log.md'):continue
    if rel not in paths: issue('Markdown頁面未登錄catalog：'+rel)

index=(WIKI/'index.md').read_text(encoding='utf-8')
for p in pages:
    if ('./'+p['path'].removeprefix('wiki/')) not in index:
        issue('index.md未登錄連結：'+p['path'])

if issues:
    print('檢核未通過，共',len(issues),'項：')
    for i in issues: print(' -',i)
    sys.exit(1)
print(f'檢核通過：{len(pages)}篇頁面、ID唯一、檔案存在、交叉連結可解析、frontmatter和索引一致。')
