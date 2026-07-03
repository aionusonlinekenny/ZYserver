# -*- coding: utf-8 -*-
"""Áp glossary vào file language dạng positional array, mỗi dòng
'"text",  --comment' — khớp THEO TỪNG DÒNG (neo ở đầu dòng) thay vì quét
toàn file bằng regex. Dùng cho file có comment/ví dụ ở đầu chứa dấu " thẳng
lẻ (số lẻ) làm lệch cặp ngoặc kép nếu quét nguyên file (vd system.txt) —
xem claude.md mục "Bài học" liên quan.

Dùng:
    python3 translation/apply_lang_glossary_lineanchored.py <file.txt> <glossary.json>
"""
import re, sys, json

LINE_PAT = re.compile(r'^(\s*)"((?:[^"\\]|\\.)*)"(\s*,.*)$')


def apply_glossary(path, glossary_path):
    with open(glossary_path, encoding="utf-8") as f:
        glossary = json.load(f)

    bad = {k: v for k, v in glossary.items() if re.search(r'(?<!\\)"', v)}
    if bad:
        print(f"LỖI: {len(bad)} giá trị dịch chứa dấu \" thẳng chưa escape:")
        for k, v in list(bad.items())[:5]:
            print(f"  {k!r} -> {v!r}")
        sys.exit(1)

    lines = open(path, encoding="utf-8").readlines()
    total = 0
    out = []
    for line in lines:
        m = LINE_PAT.match(line.rstrip("\n"))
        newline = "\n" if line.endswith("\n") else ""
        if m and m.group(2) in glossary:
            total += 1
            out.append(f'{m.group(1)}"{glossary[m.group(2)]}"{m.group(3)}{newline}')
        else:
            out.append(line)
    with open(path, "w", encoding="utf-8") as f:
        f.write("".join(out))
    print(f"{path}: {total} replacements")
    return total


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 apply_lang_glossary_lineanchored.py <file.txt> <glossary.json>")
        sys.exit(1)
    apply_glossary(sys.argv[1], sys.argv[2])
