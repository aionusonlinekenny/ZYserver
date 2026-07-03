# -*- coding: utf-8 -*-
"""Áp glossary vào các chuỗi tiếng Trung nằm trong lời gọi hàm HIỂN THỊ RÕ RÀNG
AN TOÀN trong file JS logic đã minify (main.min_*.js) — khác với file skin
thuần UI (default.thm_*.js), file logic có thể chứa chuỗi Trung dùng để SO
SÁNH (vd `"神兽"==x`), dịch bừa sẽ phá code. Script này CHỈ thay khi chuỗi
nằm trong 1 trong các dạng gọi hàm hiển thị dưới đây, và CHỈ khi chuỗi đã
có sẵn trong glossary đã kiểm chứng (không tự dịch chuỗi mới).

Dùng:
    python3 translation/apply_js_safe_calls.py <file.js> <glossary1.json> [...]
"""
import re, sys, json

STR = r'"((?:[^"\\]|\\.)*)"'
# Chỉ khớp trong lời gọi hàm hiển thị rõ ràng, hoặc ternary NGAY SAU
# .label=/.text= (2 nhánh) — không khớp ternary bất kỳ chỗ nào khác trong code.
SIMPLE_PATTERNS = [
    re.compile(r'(\.showTips\(\s*)' + STR),
    re.compile(r'(\.setBtnLabel\(\s*)' + STR),
    re.compile(r'(\.setBtnLabel\([^,)]*,\s*)' + STR),
    re.compile(r'(WarnView\.show\(\s*)' + STR),
]
TERNARY_PATTERN = re.compile(
    r'(\.(?:label|text)\s*=\s*[^;,")]*?\?\s*)"((?:[^"\\]|\\.)*)"(\s*:\s*)"((?:[^"\\]|\\.)*)"'
)


def apply_glossary(path, glossary):
    content = open(path, encoding="utf-8").read()
    total = 0

    for pat in SIMPLE_PATTERNS:
        def repl(m):
            nonlocal total
            prefix, val = m.group(1), m.group(2)
            if val in glossary:
                total += 1
                return f'{prefix}"{glossary[val]}"'
            return m.group(0)

        content = pat.sub(repl, content)

    def repl_ternary(m):
        nonlocal total
        prefix, a, mid, b = m.group(1), m.group(2), m.group(3), m.group(4)
        changed = False
        if a in glossary:
            a = glossary[a]
            changed = True
        if b in glossary:
            b = glossary[b]
            changed = True
        if changed:
            total += 1
            return f'{prefix}"{a}"{mid}"{b}"'
        return m.group(0)

    content = TERNARY_PATTERN.sub(repl_ternary, content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return total


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 apply_js_safe_calls.py <file.js> <glossary1.json> [...]")
        sys.exit(1)
    js_path = sys.argv[1]
    combined = {}
    for gp in sys.argv[2:]:
        combined.update(json.load(open(gp, encoding="utf-8")))
    bad = {k: v for k, v in combined.items() if re.search(r'(?<!\\)"', v)}
    if bad:
        print(f"LỖI: {len(bad)} giá trị chứa dấu \" thẳng chưa escape, dừng lại")
        sys.exit(1)
    n = apply_glossary(js_path, combined)
    print(f"TOTAL safe-call replacements: {n}")
