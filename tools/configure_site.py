#!/usr/bin/env python3
"""Refresh static SEO/security metadata after a domain or ownership change.
No packages or runtime server are required. Run from any directory.
"""
import argparse,base64,hashlib,html,json,re
from pathlib import Path
from urllib.parse import urlparse
from xml.sax.saxutils import escape
ROOT=Path(__file__).resolve().parents[1]
config=json.loads((ROOT/'site.json').read_text())
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base-url',help='HTTPS public site URL, including a repository path if needed.')
args=parser.parse_args()
if args.base_url:
 base=args.base_url
elif (ROOT/'CNAME').is_file():
 base='https://'+(ROOT/'CNAME').read_text().strip()+'/'
else:
 base=config['base_url']
base=base.rstrip('/')+'/'
u=urlparse(base)
if u.scheme!='https' or not u.netloc or u.query or u.fragment or u.username or u.password:
 parser.error('Use a public HTTPS URL with no credentials, query or fragment.')
config['base_url']=base
(ROOT/'site.json').write_text(json.dumps(config,indent=2)+'\n')
name=config['name']
description='Global Software Solution helps founders and teams with software development, web and mobile apps, product discovery, and thoughtful UI/UX design.'
pages={
 'index.html':(name+' | Software Development & UI/UX',description,True),
 'terms.html':('Website Terms | '+name,'Read the website terms for Global Software Solution, including project inquiries, acceptable use, intellectual property and your rights.',True),
 'privacy.html':('Privacy Notice | '+name,'How Global Software Solution handles project inquiries, contact information, email delivery, privacy requests and third-party providers.',True),
 'credits.html':('Credits | '+name,'Photography, font licenses and project wordmark attribution for the Global Software Solution website.',True),
 'thank-you.html':('Inquiry Submitted | '+name,'Your project inquiry has been accepted by the email service. Return to Global Software Solution or contact Mark and Jay directly.',False),
 '404.html':('Page Not Found | '+name,'The requested page could not be found. Return to the Global Software Solution website.',False)
}
for filename,(title,desc,indexable) in pages.items():
 p=ROOT/filename;s=p.read_text();canonical=base+('' if filename=='index.html' else filename)
 for pattern in [r'<title>.*?</title>',r'<meta\b[^>]*\b(?:name|property|http-equiv)=[\'"](?:description|robots|referrer|author|twitter:[^\'\"]+|og:[^\'\"]+|Content-Security-Policy)[\'"][^>]*>',r'<link\b[^>]*rel=[\'"]canonical[\'"][^>]*>',r'<script\b[^>]*type=[\'"]application/ld\+json[\'"][^>]*>.*?</script>']:
  s=re.sub(pattern,'',s,flags=re.S|re.I)
 structured=''
 if filename=='index.html':
  graph={'@context':'https://schema.org','@graph':[
   {'@type':'Organization','@id':base+'#organization','name':name,'url':base,'description':description,'email':config['public_email'],'logo':{'@type':'ImageObject','url':base+config['logo'],'width':256,'height':256},'address':{'@type':'PostalAddress',**config['address']},'contactPoint':[{'@type':'ContactPoint','contactType':'project inquiries','email':config['public_email']}]},
   {'@type':'WebSite','@id':base+'#website','url':base,'name':name,'publisher':{'@id':base+'#organization'},'inLanguage':'en'},
   {'@type':'WebPage','@id':base+'#webpage','url':base,'name':title,'description':desc,'isPartOf':{'@id':base+'#website'},'about':{'@id':base+'#organization'},'inLanguage':'en'}]}
  structured=json.dumps(graph,ensure_ascii=False,separators=(',',':'))
 script_policy="script-src 'self'"
 if structured:
  digest=base64.b64encode(hashlib.sha256(structured.encode()).digest()).decode()
  script_policy+=" 'sha256-"+digest+"'"
 csp="; ".join(["default-src 'none'","base-uri 'none'","object-src 'none'",script_policy,"script-src-attr 'none'","style-src 'self'","img-src 'self' data:","font-src 'self'","connect-src https://formsubmit.co","form-action https://formsubmit.co","frame-src 'none'","manifest-src 'self'","upgrade-insecure-requests"])
 # Put the CSP directly after charset, before resources are loaded.
 s=re.sub(r'(<meta\s+charset=[^>]+>)',lambda m:m[1]+'\n<meta http-equiv="Content-Security-Policy" content="'+html.escape(csp,quote=True)+'">',s,count=1,flags=re.I)
 metadata=f'''\n<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc,quote=True)}">
<meta name="robots" content="{'index,follow,max-image-preview:large' if indexable else 'noindex,follow'}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="author" content="{name}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{name}">
<meta property="og:title" content="{html.escape(title,quote=True)}">
<meta property="og:description" content="{html.escape(desc,quote=True)}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{base}assets/social-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Global Software Solution — software development, web, mobile and UI/UX design">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{html.escape(title,quote=True)}">
<meta name="twitter:description" content="{html.escape(desc,quote=True)}">
<meta name="twitter:image" content="{base}assets/social-card.png">
<meta name="twitter:image:alt" content="Global Software Solution — software development and UI/UX design">
'''
 # Logo and postal address use the company details supplied by the owner.
 if structured:metadata+='<script type="application/ld+json">'+structured+'</script>\n'
 s=s.replace('</head>',metadata+'</head>')
 if filename=='index.html':
  s=re.sub(r'(<input[^>]*name="_next"[^>]*value=")[^"]+',lambda m:m[1]+base+'thank-you.html',s)
  s=re.sub(r'(<input[^>]*name="_url"[^>]*value=")[^"]+',lambda m:m[1]+base,s)
 if filename=='404.html':s=re.sub(r'(<a href=")[^"]+',lambda m:m[1]+base,s,count=1)
 s='\n'.join(line.rstrip() for line in s.splitlines())+'\n'
 s=re.sub(r'\n{3,}', '\n\n', s)
 p.write_text(s)
urls=[base+('' if f=='index.html' else f) for f,(_,_,indexable) in pages.items() if indexable]
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('  <url><loc>'+escape(x)+'</loc></url>\n' for x in urls)+'</urlset>\n')
# Project Pages cannot control /robots.txt at the github.io host root; keep this for custom-domain deployment.
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+base+'sitemap.xml\n')
print('Configured canonical, social, schema, sitemap, CSP and return URLs for '+base)
