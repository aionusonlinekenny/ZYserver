# -*- coding: utf-8 -*-
"""Áp glossary vào BẤT KỲ field "key":"value" nào trong file JSON dữ liệu
client (dùng khi phần còn lại của config.json rải rác trên hàng chục field
nhỏ khác nhau, áp riêng từng field không còn hiệu quả). Khớp trên text thô
của file (glossary key phải dùng escape thô, vd \\n 2 ký tự), dùng
json.dumps để escape lại giá trị output cho đúng chuẩn JSON.

Dùng:
    python3 translation/apply_json_glossary_anyfield.py <file.json> <glossary1.json> [...]
"""
import re, sys, json


def apply_glossary(path, glossary):
    pat = re.compile(r'"([A-Za-z_][A-Za-z0-9_]*)":"((?:[^"\\]|\\.)*)"')
    content = open(path, encoding="utf-8").read()
    total = 0

    def repl(m):
        nonlocal total
        field, val = m.group(1), m.group(2)
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
    if len(sys.argv) < 3:
        print("Usage: python3 apply_json_glossary_anyfield.py <file.json> <glossary1.json> [...]")
        sys.exit(1)
    js_path = sys.argv[1]
    combined = {}
    for gp in sys.argv[2:]:
        combined.update(json.load(open(gp, encoding="utf-8")))
    n = apply_glossary(js_path, combined)
    print(f"TOTAL replacements: {n}")
