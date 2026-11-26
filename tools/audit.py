#!/usr/bin/env python3
"""Static integrity and unit verification for Bao Long Grade 1 Learning Web App."""
import collections
import glob
import hashlib
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def split_vn_py(word: str):
    """Python mirror of app.js splitVietnameseWordToPuzzle() for verification."""
    lower = re.sub(r"\s+", " ", (word or "").strip().lower())
    if not lower:
        return []
    if " " in lower:
        return lower.split(" ")
    for dg in ["ngh", "ng", "gh", "gi", "ch", "kh", "nh", "ph", "qu", "th", "tr"]:
        if lower.startswith(dg) and len(lower) > len(dg):
            return [dg, lower[len(dg):]]
    if lower[0] in set("bcdđghklmnpqrstvx") and len(lower) > 1:
        return [lower[0], lower[1:]]
    for coda in ["ng", "nh", "ch", "m", "n", "p", "t", "c"]:
        if lower.endswith(coda) and len(lower) > len(coda):
            return [lower[:-len(coda)], coda]
    if len(lower) >= 2:
        return [lower[:-1], lower[-1:]]
    return [lower]


def main() -> int:
    errors = []
    js_files = sorted(glob.glob("*.js"))
    all_js = {f: open(f, encoding="utf-8").read() for f in js_files}
    html = open("index.html", encoding="utf-8").read()

    # 1. DOM IDs
    html_ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', html))
    combined_js = "\n".join(all_js.values())
    dyn_ids = set(re.findall(r'\bid=["\']([^"\'$]+)["\']', combined_js))
    get_ids = set(re.findall(r'getElementById\(["\']([^"\']+)["\']\)', combined_js))
    missing_ids = sorted(i for i in get_ids if i not in html_ids and i not in dyn_ids)
    if missing_ids:
        errors.append(f"Missing DOM IDs: {missing_ids}")
    print(f"DOM IDs: html={len(html_ids)}, dyn_js={len(dyn_ids)}, getElementById={len(get_ids)}, missing={len(missing_ids)}")

    # 2. Local Images
    img_refs = set()
    for txt in list(all_js.values()) + [html]:
        img_refs.update(re.findall(r"images/[a-zA-Z0-9_./-]+", txt))
    missing_imgs = sorted(r for r in img_refs if not os.path.exists(r))
    if missing_imgs:
        errors.append(f"Missing images: {missing_imgs}")
    print(f"Local Images: {len(img_refs)} referenced, missing={len(missing_imgs)}")

    # 3. Audio inventory & F/M symmetry
    f_files = sorted(glob.glob("audio/female/*.mp3"))
    m_files = sorted(glob.glob("audio/male/*.mp3"))
    f_set = {os.path.basename(x)[:-4] for x in f_files}
    m_set = {os.path.basename(x)[:-4] for x in m_files}
    only_f = sorted(f_set - m_set)
    only_m = sorted(m_set - f_set)
    if only_f or only_m:
        errors.append(f"Asymmetric audio files: only_f={only_f[:10]}, only_m={only_m[:10]}")
    small_files = [
        p for p in (f_files + m_files) if os.path.getsize(p) < 500
    ]
    if small_files:
        errors.append(f"Corrupt/small MP3 files (<500B): {small_files[:10]}")

    same_fm = []
    gtts_84 = 0
    for k in sorted(f_set & m_set):
        with open(f"audio/female/{k}.mp3", "rb") as f1, open(f"audio/male/{k}.mp3", "rb") as f2:
            b1, b2 = f1.read(), f2.read()
            if b1[:4].hex() == "fff384c4":
                gtts_84 += 1
            if b2[:4].hex() == "fff384c4":
                gtts_84 += 1
            if hashlib.sha256(b1).hexdigest() == hashlib.sha256(b2).hexdigest():
                same_fm.append(k)
    audio_mb = sum(os.path.getsize(p) for p in (f_files + m_files)) / (1024 * 1024)
    print(f"Audio MP3s: female={len(f_set)}, male={len(m_set)}, size_mb={audio_mb:.2f}, small={len(small_files)}, identical_FM={len(same_fm)}, gtts_fff384c4={gtts_84}")

    # 4. Referenced audio keys check
    used = set()
    for s in re.findall(r'["\']([a-zA-Z0-9_\u00C0-\u1EF9\u3040-\u30FF\u4E00-\u9FFF ]+)["\']', combined_js):
        if s in f_set or s in m_set:
            used.add(s)
    data_js, ja_js, en_js = all_js["data.js"], all_js["japanese.js"], all_js["english.js"]
    for ch in re.findall(r"lower:\s*'([^']+)'", data_js[:data_js.index("TONES_DATA")]):
        used.add("alpha_aa" if ch == "â" else f"alpha_{ch}")
    for tk in re.findall(r"key:\s*'([^']+)'", data_js[data_js.index("TONES_DATA"):data_js.index("VOCAB_LESSONS")]):
        used.add(f"tone_{tk}")
    for w in re.findall(r"\bword:\s*'([^']+)'", data_js[:data_js.index("DINO_PHOTOS")]):
        wl = w.strip().lower()
        used.add("word_aa" if wl == "â" else ("word_sach" if wl == "sách" else f"word_{wl}"))
    for w in re.findall(r"\bword:\s*'([^']+)'", data_js[data_js.index("VOCAB_LESSONS"):data_js.index("DINO_PHOTOS")]):
        wl = w.strip().lower()
        used.add(f"spell_{wl}")
    for w in re.findall(r"(?:target|word):\s*'([^']+)'", data_js[data_js.index("SPELL_BUILDER_DATA"):data_js.index("LISTEN_CATCH_POOLS")]):
        wl = w.strip().lower()
        used.add("word_sach" if wl == "sách" else f"word_{wl}")

    alpha_set = {"a","ă","â","b","c","d","đ","e","ê","g","h","i","k","l","m","n","o","ô","ơ","p","q","r","s","t","u","ư","v","x","y","ch","gh","gi","kh","ng","ngh","nh","ph","qu","th","tr"}
    tones_set = {"ngang","sắc","huyền","hỏi","ngã","nặng"}
    for jf in (data_js, all_js["dragons.js"]):
        for m in re.finditer(r"breakdown:\s*'([^']+)'", jf):
            for p in re.split(r"[-+,]", m.group(1)):
                t = p.strip().lower()
                if t and t not in alpha_set and t not in tones_set:
                    used.add(f"syl_{t}")
    for m in re.finditer(r"(?:puzzle|options|headOptions|tailOptions):\s*\[([^\]]+)\]", data_js[data_js.index("SPELL_BUILDER_DATA"):data_js.index("LISTEN_CATCH_POOLS")]):
        for t in re.findall(r"'([^']+)'", m.group(1)):
            tl = t.strip().lower()
            if tl and tl not in alpha_set and tl not in tones_set:
                used.add(f"syl_{tl}")

    for n in range(101):
        used.add(f"math_v_{n}")
    for n in list(range(21)) + [30,40,50,60,70,80,90,100]:
        used.add(f"math_num_{n}")
    for t in range(5, 11):
        for a in range(0, t + 1):
            used.add(f"math_bond_{t}_{a}")
    for h in range(1, 13):
        used.add(f"math_clock_{h}")
        used.add(f"math_clock_half_{h}")
    for cm in [3, 5, 7, 9, 11]:
        used.add(f"math_cm_{cm}")
    for cm in range(1, 13):
        used.add(f"math_cm_opt_{cm}")
    for d in range(2, 9):
        used.add(f"math_day_{d}")
    for h in re.findall(r"hira:\s*'([^']+)'", ja_js):
        used.add(f"ja_hira_{h}")
    for h in re.findall(r"hira:\s*'([^']+)'", ja_js[:ja_js.index("JA_DAKUON_DATA")]):
        used.add(f"vi_h_{h}")
    for k in re.findall(r"kata:\s*'([^']+)'", ja_js):
        used.add(f"ja_kata_{k}")
        used.add(f"vi_k_{k}")
    for kid in re.findall(r"id:\s*'(ja_kanji_\d+)'", ja_js):
        used.add(kid)
        used.add(f"vi_{kid}")
    for vid in re.findall(r"id:\s*'(ja_[vn]\d+)'", ja_js):
        used.add(f"vi_{vid}")
    for vid in re.findall(r"id:\s*'(en_v\d+)'", en_js):
        used.add(f"vi_{vid}")
    for ch in "abcdefghijklmnopqrstuvwxyz":
        used.add(f"en_alpha_{ch}")
        used.add(f"en_letter_{ch}")
    for i in range(1, 11):
        used.add(f"cheer_praise_{i}")
    for i in range(1, 4):
        used.add(f"cheer_streak_{i}")
    for i in range(1, 5):
        used.add(f"cheer_try_{i}")
    used.add("cheer_win")
    for i in range(1, 13):
        used.add(f"oq_q_oq{i}")
        used.add(f"vquiz_veh{i}")
        used.add(f"ethics_lesson_{i}")
        used.add(f"ethics_sit_{i}")
        used.add(f"ethics_sit{i}_good")
        used.add(f"ethics_sit{i}_bad")
    for opt in ["k","c","gh","g","ngh","ng","s","x","tr","ch","l","n"]:
        used.add(f"oq_letter_{opt}")
    for i in range(1, 11):
        used.add(f"dquiz{i}")
        used.add(f"ethics_eco{i}")
    for i in range(1, 9):
        used.add(f"drquiz_{i}")
    for i in range(1, 17):
        used.add(f"ethics_tf_{i}")
    for b in ["organic", "recycle", "hazard"]:
        used.add(f"ethics_bin_{b}")
    if "DECODABLE_PHONICS_SENTENCES" in data_js:
        dec_sec = data_js[data_js.index("DECODABLE_PHONICS_SENTENCES"):]
        for k in re.findall(r'"key":\s*"([^"]+)"', dec_sec):
            used.add(k)
        for k in re.findall(r'"audioKey":\s*"([^"]+)"', dec_sec):
            used.add(k)

    # 5. Unit check for splitVietnameseWordToPuzzle on all 200 lesson words + hard cases
    vp = data_js[data_js.index("VOCAB_LESSONS"):data_js.index("DINO_PHOTOS")]
    lesson_words = re.findall(r"\bword:\s*'([^']+)'", vp)
    puzzle_missing_audio = []
    for w in lesson_words:
        pieces = split_vn_py(w)
        rebuilt = (" " if " " in w else "").join(pieces)
        if rebuilt != w.strip().lower():
            errors.append(f"Puzzle roundtrip mismatch: {w} -> {pieces} -> {rebuilt}")
        for p in pieces:
            k = ("alpha_aa" if p == "â" else f"alpha_{p}") if p in alpha_set else f"syl_{p}"
            used.add(k)
            if k not in f_set or k not in m_set:
                puzzle_missing_audio.append((w, p, k))
    if puzzle_missing_audio:
        errors.append(f"Missing audio for puzzle splits: {puzzle_missing_audio[:10]}")

    hard_cases = {
        "": [],
        "quýt": ["qu", "ýt"],
        "gió": ["gi", "ó"],
        "nghé": ["ngh", "é"],
        "trường": ["tr", "ường"],
        "biển": ["b", "iển"],
        "ếch": ["ế", "ch"],
        "yến": ["yế", "n"],
        "ăn": ["ă", "n"],
        "uống": ["uố", "ng"],
        "ong": ["o", "ng"],
        "áo dài": ["áo", "dài"],
    }
    for inp, expected in hard_cases.items():
        got = split_vn_py(inp)
        if got != expected:
            errors.append(f"Puzzle hard case failed for {inp!r}: expected {expected}, got {got}")

    missing_keys = sorted(k for k in used if k not in f_set or k not in m_set)
    if missing_keys:
        errors.append(f"Missing referenced audio keys: {missing_keys[:20]}")
    orphan_keys = sorted(f_set - used)
    print(f"Puzzle checks: {len(lesson_words)} lesson words + {len(hard_cases)} hard cases verified")
    print(f"Audio Keys: checked={len(used)}, missing={len(missing_keys)}, orphans={len(orphan_keys)}")

    # 6. Optional JS syntax check via node
    if shutil.which("node"):
        for jf in js_files:
            res = subprocess.run(["node", "--check", jf], capture_output=True, text=True)
            if res.returncode != 0:
                errors.append(f"JS syntax error in {jf}: {res.stderr.strip()}")
        print(f"Node syntax check: {len(js_files)} JS files checked")
    else:
        print("Node syntax check: skipped (node not installed)")

    if errors:
        print("\nAUDIT FAILED:")
        for e in errors:
            print(" -", e)
        return 1
    print("\nALL STATIC AUDIT CHECKS PASSED!")
    return 0


if __name__ == "__main__":
    sys.exit(main())
