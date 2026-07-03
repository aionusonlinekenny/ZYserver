# -*- coding: utf-8 -*-
"""Áp bảng thuật ngữ vào file JS đã biên dịch (js/default.thm_*.js) — đây là
file client THẬT SỰ chạy (exml chỉ là mã nguồn build ra file này, KHÔNG được
client đọc trực tiếp). Thay thế trong `.text = "..."` và `.label = "..."`.

Dùng:
    python3 translation/apply_js_glossary.py <file.js> <glossary1.json> [glossary2.json ...]
"""
import re, sys, json

# 2 dạng: `t.text = "..."` / `t.label = "..."`, và `SetProperty(id,"label"/"text","...")`
ASSIGN_PAT = re.compile(r'(\.(?:text|label)) = "((?:[^"\\]|\\.)*)"')
SETPROP_PAT = re.compile(r'(SetProperty\("[^"]*","(?:text|label)",)"((?:[^"\\]|\\.)*)"(\))')


def apply_glossary(path, glossary):
    content = open(path, encoding="utf-8").read()
    total = 0

    def repl_assign(m):
        nonlocal total
        attr, val = m.group(1), m.group(2)
        if val in glossary:
            total += 1
            return f'{attr} = "{glossary[val]}"'
        return m.group(0)

    def repl_setprop(m):
        nonlocal total
        prefix, val, suffix = m.group(1), m.group(2), m.group(3)
        if val in glossary:
            total += 1
            return f'{prefix}"{glossary[val]}"{suffix}'
        return m.group(0)

    new_content = ASSIGN_PAT.sub(repl_assign, content)
    new_content = SETPROP_PAT.sub(repl_setprop, new_content)
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
    return total


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 apply_js_glossary.py <file.js> <glossary1.json> [glossary2.json ...]")
        sys.exit(1)
    js_path = sys.argv[1]
    grand_total = 0
    for gp in sys.argv[2:]:
        with open(gp, encoding="utf-8") as f:
            glossary = json.load(f)
        bad = {k: v for k, v in glossary.items() if re.search(r'(?<!\\)"', v)}
        if bad:
            print(f"LỖI: {gp} có {len(bad)} giá trị chứa dấu \" thẳng chưa escape, bỏ qua file này")
            continue
        n = apply_glossary(js_path, glossary)
        print(f"{gp}: {n} replacements")
        grand_total += n
    print(f"TOTAL: {grand_total} replacements in {js_path}")
