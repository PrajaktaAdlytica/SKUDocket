"""Check the built route graph, assets, labels, and metadata without a browser."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json

root=Path(__file__).resolve().parents[1]
dist=root/'dist'
routes=json.loads((root/'route-manifest.json').read_text())

class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[];self.ids=[];self.assets=[];self.h1=0;self.missing_alt=[];self.title=False;self.description=False;self.favicon=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a':self.links.append(a.get('href',''))
  if a.get('id'):self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='title':self.title=True
  if tag=='meta' and a.get('name')=='description':self.description=True
  if tag=='link' and a.get('rel')=='icon':self.favicon=True
  if tag=='img' and 'alt' not in a:self.missing_alt.append(a.get('src'))
  if a.get('src','').startswith('/assets/'):self.assets.append(a['src'])
  if tag=='link' and a.get('href','').startswith('/assets/'):self.assets.append(a['href'])

issues=[];links=0
for r in routes:
 route=r['route'];f=dist/route.strip('/')/'index.html' if route!='/' else dist/'index.html'
 p=Page();p.feed(f.read_text());links+=len(p.links)
 if p.h1!=1:issues.append([route,'heading count',p.h1])
 if len(set(p.ids))!=len(p.ids):issues.append([route,'duplicate IDs'])
 if p.missing_alt:issues.append([route,'missing alt',p.missing_alt])
 if not all([p.title,p.description,p.favicon]):issues.append([route,'missing metadata or favicon'])
 for a in p.assets:
  if not (dist/urlparse(a).path.lstrip('/')).is_file():issues.append([route,'missing asset',a])
 for link in p.links:
  if link=='#' or not link:issues.append([route,'empty destination',link])
  u=urlparse(link)
  if not u.scheme and not u.netloc and u.path.startswith('/'):
   dest=dist/u.path.strip('/')/'index.html' if u.path!='/' else dist/'index.html'
   if u.path.startswith('/assets/'):dest=dist/u.path.lstrip('/')
   if not dest.exists():issues.append([route,'missing destination',link])
  if link.startswith('#') and link[1:] not in p.ids:issues.append([route,'missing anchor',link])

result={'routes':len(routes),'links_checked':links,'issues':issues,'passed':not issues}
print(json.dumps(result,indent=2))
if issues:raise SystemExit(1)
