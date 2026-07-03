import re, json, collections

def load(path):
    return open(path, encoding='utf-8').read()

han = re.compile(r'[一-鿿]')

def extract_with_context(content, string_pat):
    """Return dict: string -> list of (context_before20, context_after20, risky_flag)"""
    results = collections.defaultdict(list)
    for m in string_pat.finditer(content):
        s = m.group(1) if m.group(1) is not None else m.group(2)
        if not han.search(s):
            continue
        start, end = m.start(), m.end()
        before = content[max(0,start-25):start]
        after = content[end:end+25]
        results[s].append((before, after))
    return results

pat = re.compile(r'"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'')

def classify(s, occurrences):
    """Classify a string as SAFE, RISKY, or UNKNOWN based on context patterns."""
    risky_signs = 0
    safe_signs = 0
    for before, after in occurrences:
        b = before.strip()
        a = after.strip()
        # Enum member pattern: t[t["X"]=N]="X"  or  ]="X"
        if re.search(r'\[t\[["\']?$', before) or a.startswith(']='):
            risky_signs += 1
        # comparison pattern: ===  =="X"  or "X"==
        if b.endswith('==') or b.endswith('===') or a.startswith('==') or a.startswith('==='):
            risky_signs += 1
        # object key pattern:  X:  before the string acting like {X: ...} -- actually key would be before colon typically as bare word not string; skip
        # bracket property access: ["X"]  immediately followed by . or ( or =  (not just assignment target of .name=)
        if b.endswith('[') and (a.startswith(']') ):
            # could be array index by string key -> risky unless it's like .name=["X"] no
            risky_signs += 1
        # switch/case pattern: case "X":
        if b.endswith('case') or b.endswith('case '):
            risky_signs += 1
        # safe: preceded by things like `name=`, `text=`, `label=`, `showTips(`, `.innerHTML=`, string concatenation with Chinese (adjacent + )
        if re.search(r'(name|text|label|title|tips|msg|message|content|desc|Name)\s*[:=]\s*$', before):
            safe_signs += 1
        if b.endswith('showTips(') or b.endswith('Tips(') or b.endswith('alert(') or b.endswith('console.log('):
            safe_signs += 1
        if b.endswith('+') or a.startswith('+'):
            safe_signs += 1  # string concatenation typical of UI message building
    if risky_signs > 0 and safe_signs == 0:
        return 'RISKY'
    if risky_signs > 0:
        return 'MIXED'
    if safe_signs > 0:
        return 'SAFE'
    return 'UNKNOWN'

for fname in ['main.min_d7aad928.js', 'default.thm_70915153.js']:
    content = load(fname)
    results = extract_with_context(content, pat)
    counts = collections.Counter()
    for s, occ in results.items():
        cls = classify(s, occ)
        counts[cls] += 1
    print(fname, dict(counts))

    out = {}
    for s, occ in results.items():
        cls = classify(s, occ)
        out[s] = {'class': cls, 'count': len(occ), 'sample_before': occ[0][0][-25:], 'sample_after': occ[0][1][:25]}
    json.dump(out, open(f'/tmp/claude-0/-home-user-ZYserver/9c3576db-a61e-509e-8a57-fd18e5522862/scratchpad/{fname}.classified.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
