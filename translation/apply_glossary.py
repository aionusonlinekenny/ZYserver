# -*- coding: utf-8 -*-
"""Áp dụng bảng thuật ngữ (glossary JSON: {chinese: vietnamese}) vào các file .exml,
thay thế chính xác (exact match) trong thuộc tính text="..."/text.xxx="..." VÀ
label=".../label.xxx="..." (nhãn nút <e:Button label="...">, khác với text=).

Dùng lại cho mọi giai đoạn dịch tiếp theo:
    python3 translation/apply_glossary.py translation/glossary_ui_phase1.json
"""
import re, glob, sys, json, os

ATTR_PAT = re.compile(r'((?:text|label)(?:\.\w+)?)="([^"]*)"')
EXML_DIR = os.path.join(os.path.dirname(__file__), "..", "phpStudy", "PHPTutorial", "WWW", "resource", "exml")


def apply_glossary(glossary_path):
    with open(glossary_path, encoding="utf-8") as f:
        glossary = json.load(f)

    files = sorted(glob.glob(os.path.join(EXML_DIR, "*.exml")))
    total_replacements = 0
    files_changed = 0

    for fp in files:
        content = open(fp, encoding="utf-8").read()

        def repl(m):
            nonlocal total_replacements
            attr, val = m.group(1), m.group(2)
            if val in glossary:
                total_replacements += 1
                return f'{attr}="{glossary[val]}"'
            return m.group(0)

        new_content = ATTR_PAT.sub(repl, content)
        if new_content != content:
            files_changed += 1
            with open(fp, "w", encoding="utf-8") as f:
                f.write(new_content)

    print(f"Glossary: {glossary_path}")
    print(f"Files changed: {files_changed} / {len(files)}")
    print(f"Total attribute replacements: {total_replacements}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 apply_glossary.py <glossary.json>")
        sys.exit(1)
    apply_glossary(sys.argv[1])
