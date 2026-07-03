# -*- coding: utf-8 -*-
"""Áp glossary vào field "name":"..." trong file JSON dữ liệu client
(resource/config/config.json, resource/config1/config*.json). Escape
đúng chuẩn JSON (dùng json.dumps để tự xử lý ký tự đặc biệt).

Dùng:
    python3 translation/apply_json_glossary.py <file.json> <glossary1.json> [...]
"""
import re, sys, json

NAME_PAT = re.compile(r'"name":"((?:[^"\\]|\\.)*)"')


def apply_glossary(path, glossary):
    content = open(path, encoding="utf-8").read()
    total = 0

    def repl(m):
        nonlocal total
        val = m.group(1)
        if val in glossary:
            total += 1
            escaped = json.dumps(glossary[val], ensure_ascii=False)
            return f'"name":{escaped}'
        return m.group(0)

    new_content = NAME_PAT.sub(repl, content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    return total


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 apply_json_glossary.py <file.json> <glossary1.json> [...]")
        sys.exit(1)
    js_path = sys.argv[1]
    combined = {}
    for gp in sys.argv[2:]:
        combined.update(json.load(open(gp, encoding="utf-8")))
    n = apply_glossary(js_path, combined)
    print(f"TOTAL replacements: {n}")
