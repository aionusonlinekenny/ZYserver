# -*- coding: utf-8 -*-
"""Trích toàn bộ chuỗi tiếng Trung nằm trong dấu ngoặc kép "..." của 1 file
language (Lua-style: key = "value", hoặc mảng vị trí "value", --comment).

Dùng:
    python3 translation/extract_lang_strings.py <file.txt>
In ra danh sách "count<TAB>string" sắp theo tần suất giảm dần, giống cách
làm với exml, để tiện dịch theo lô rồi ghép ngược lại bằng apply_lang_glossary.py
"""
import re, sys, collections

STR_PAT = re.compile(r'"((?:[^"\\]|\\.)*)"')
HAN = re.compile(r'[一-鿿]')


def extract(path):
    content = open(path, encoding="utf-8", errors="ignore").read()
    uniq = collections.Counter()
    for val in STR_PAT.findall(content):
        if HAN.search(val):
            uniq[val] += 1
    return uniq


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 extract_lang_strings.py <file.txt>")
        sys.exit(1)
    uniq = extract(sys.argv[1])
    for s, c in uniq.most_common():
        print(f"{c}\t{s}")
