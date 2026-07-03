# -*- coding: utf-8 -*-
"""Áp glossary vào một field JSON bất kỳ (vd "desc":"...") trong file JSON dữ
liệu client (resource/config/config.json, resource/config1/config*.json).
Khớp trực tiếp trên text thô của file (glossary key phải dùng escape thô,
vd \\n 2 ký tự), rồi dùng json.dumps để escape lại giá trị output cho đúng
chuẩn JSON.

Dùng:
    python3 translation/apply_json_glossary_field.py <field> <file.json> <glossary1.json> [...]
"""
import re, sys, json


def apply_glossary(field, path, glossary):
    pat = re.compile(r'"' + re.escape(field) + r'":"((?:[^"\\]|\\.)*)"')
    content = open(path, encoding="utf-8").read()
    total = 0

    def repl(m):
        nonlocal total
        val = m.group(1)
        if val in glossary:
            total += 1
            escaped = json.dumps(glossary[val], ensure_ascii=False)
            return f'"{field}":{escaped}'
        return m.group(0)

    new_content = pat.sub(repl, content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    return total


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 apply_json_glossary_field.py <field> <file.json> <glossary1.json> [...]")
        sys.exit(1)
    field = sys.argv[1]
    js_path = sys.argv[2]
    combined = {}
    for gp in sys.argv[3:]:
        combined.update(json.load(open(gp, encoding="utf-8")))
    n = apply_glossary(field, js_path, combined)
    print(f"TOTAL replacements: {n}")
