# -*- coding: utf-8 -*-
"""Apply a glossary of exact JS string-literal translations to a minified JS file.

Unlike apply_js_safe_calls.py (which only matches specific known-safe call
patterns like .showTips(), .setBtnLabel()), this script replaces EVERY exact
JS string-literal match anywhere in the file. It is safe to use ONLY when the
glossary was built from a prior per-string classification pass that confirmed
each key never appears in a risky context anywhere in the target file (enum
member patterns like t[t["X"]=N]="X", comparisons like "X"==foo.label,
case "X":, or bracket-key property access). See translation/glossary_js_main_safe.json
and translation/glossary_js_thm_safe.json for glossaries built this way, and
claude.md for the classification methodology.

IMPORTANT (found 2026-07-03): on the 3.8MB+ single-line minified main.min
file, the regex-based scan below can silently desync partway through the
file (almost certainly a JS regex-literal elsewhere containing an unescaped
quote character that the naive string-boundary pattern misreads as opening
a string) and then fail to match real, exactly-quoted occurrences later in
the file, even though a plain substring search finds them fine. This was
confirmed directly: `pat.finditer(full_content)` found 0 matches for a
string that `content.count('"..."')` found 5 of. The regex pass is kept as
the first attempt (it is fine for smaller/simpler files and catches most
cases), but ALWAYS follow it with the exact-boundary fallback pass below,
which uses plain str.replace on `"key"`/`'key'` and is immune to the
desync. Re-run the fallback and diff Chinese-char counts after every
glossary application to main.min to catch any remaining gap.
"""
import re, sys, json

def js_string_pattern():
    return re.compile(r'"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'')

def apply_glossary(path, glossary_path):
    with open(glossary_path, encoding="utf-8") as f:
        glossary = json.load(f)
    content = open(path, encoding="utf-8").read()
    pat = js_string_pattern()
    total = 0
    matched_keys = set()

    def repl(m):
        nonlocal total
        s = m.group(1) if m.group(1) is not None else m.group(2)
        if s in glossary:
            total += 1
            matched_keys.add(s)
            quote = '"' if m.group(1) is not None else "'"
            return quote + glossary[s] + quote
        return m.group(0)

    new_content = pat.sub(repl, content)

    # Fallback pass: exact-boundary str.replace for anything the regex scan
    # missed due to desync (see module docstring). Safe because it only
    # matches the literal sequence quote+key+quote, not a bare substring.
    fallback_total = 0
    for k in set(glossary.keys()) - matched_keys:
        v = glossary[k]
        dq, sq = f'"{k}"', f"'{k}'"
        dq_n, sq_n = new_content.count(dq), new_content.count(sq)
        if dq_n:
            new_content = new_content.replace(dq, f'"{v}"')
            matched_keys.add(k)
            fallback_total += dq_n
        if sq_n:
            new_content = new_content.replace(sq, f"'{v}'")
            matched_keys.add(k)
            fallback_total += sq_n

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    unmatched = set(glossary.keys()) - matched_keys
    print(f"{path}: {total} regex replacements + {fallback_total} fallback replacements, {len(matched_keys)}/{len(glossary)} glossary keys matched")
    if unmatched:
        print(f"  {len(unmatched)} glossary keys never matched:")
        for k in list(unmatched)[:20]:
            print("   ", repr(k))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 apply_js_literal_glossary.py <file.js> <glossary.json>")
        sys.exit(1)
    apply_glossary(sys.argv[1], sys.argv[2])
