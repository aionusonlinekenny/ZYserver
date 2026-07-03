# -*- coding: utf-8 -*-
"""Đồng bộ resource/config1/config0-6.json từ resource/config/config.json.

config1/config{0..6}.json là chính xác cùng 1 bộ dữ liệu 336 key top-level
với config/config.json, chỉ chia nhỏ thành 7 file (đã xác nhận bằng cách so
sánh trực tiếp). Sau khi dịch config.json, cần copy lại giá trị top-level
tương ứng sang từng chunk để 2 nơi nhất quán.

Dùng:
    python3 translation/sync_config1_from_config.py
"""
import json

MAIN = "phpStudy/PHPTutorial/WWW/resource/config/config.json"
CHUNKS = [f"phpStudy/PHPTutorial/WWW/resource/config1/config{i}.json" for i in range(7)]


def main():
    master = json.load(open(MAIN, encoding="utf-8"))
    for path in CHUNKS:
        chunk = json.load(open(path, encoding="utf-8"))
        changed = 0
        for k in chunk:
            if k in master and chunk[k] != master[k]:
                chunk[k] = master[k]
                changed += 1
        with open(path, "w", encoding="utf-8") as f:
            json.dump(chunk, f, ensure_ascii=False, separators=(",", ":"))
        print(f"{path}: {changed}/{len(chunk)} top-level keys updated")


if __name__ == "__main__":
    main()
