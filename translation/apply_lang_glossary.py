# -*- coding: utf-8 -*-
"""Áp glossary JSON {chinese: vietnamese} vào 1 file language, thay thế
CHÍNH XÁC nội dung bên trong dấu ngoặc kép "..." (không đụng vào phần
ngoài dấu ngoặc: key, số, dấu phẩy, comment --...).

Dùng:
    python3 translation/apply_lang_glossary.py <file.txt> <glossary.json>
"""
import re, sys, json

STR_PAT = re.compile(r'"((?:[^"\\]|\\.)*)"')


def apply_glossary(path, glossary_path):
    with open(glossary_path, encoding="utf-8") as f:
        glossary = json.load(f)

    # An chỗi: giá trị dịch không được chứa dấu " thẳng chưa escape, vì nó
    # sẽ kết thúc sớm chuỗi Lua và làm hỏng cú pháp file. Dùng “ ” cong thay thế.
    bad = {k: v for k, v in glossary.items() if re.search(r'(?<!\\)"', v)}
    if bad:
        print(f"LỖI: {len(bad)} giá trị dịch trong {glossary_path} chứa dấu \" thẳng chưa escape:")
        for k, v in list(bad.items())[:5]:
            print(f"  {k!r} -> {v!r}")
        sys.exit(1)

    content = open(path, encoding="utf-8").read()
    total = 0

    def repl(m):
        nonlocal total
        val = m.group(1)
        if val in glossary:
            total += 1
            return f'"{glossary[val]}"'
        return m.group(0)

    new_content = STR_PAT.sub(repl, content)
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
    print(f"{path}: {total} replacements")
    return total


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 apply_lang_glossary.py <file.txt> <glossary.json>")
        sys.exit(1)
    apply_glossary(sys.argv[1], sys.argv[2])
