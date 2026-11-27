#!/usr/bin/env python3
"""Automated offline static & structural audit for Bao Long's learning app."""
import glob
import hashlib
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def check_ids():
    html = read("index.html")
    html_ids = set(re.findall(r'\bid=["\']([a-zA-Z0-9_-]+)["\']', html))
    js_all = "\n".join(read(p) for p in sorted(glob.glob("*.js")))
    dyn_ids = set(re.findall(r'id=["\']([a-zA-Z0-9_-]+)["\']', js_all))
    dyn_ids.update(re.findall(r'\.id\s*=\s*[\'"]([a-zA-Z0-9_-]+)[\'"]', js_all))
    dyn_ids.update(re.findall(r'\bmk\(\s*[\'"]([a-zA-Z0-9_-]+)[\'"]', js_all))
    get_ids = set(re.findall(r'getElementById\(["\']([a-zA-Z0-9_-]+)["\']\)', js_all))
    known = html_ids | dyn_ids
    missing = sorted(x for x in get_ids if x not in known)
    print(f"DOM IDs: html={len(html_ids)}, dyn_js={len(dyn_ids)}, getElementById={len(get_ids)}, missing={len(missing)}")
    return [f"Missing DOM id: {m}" for m in missing]


def check_local_images():
    refs = set()
    for p in ["index.html"] + sorted(glob.glob("*.js")):
        txt = read(p)
        refs.update(re.findall(r'images/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|svg)', txt))
    missing = sorted(r for r in refs if not os.path.isfile(r))
    print(f"Local Images: {len(refs)} referenced, missing={len(missing)}")
    return [f"Missing local image: {m}" for m in missing]


def check_css_classes():
    css = read("style.css")
    defined = set(re.findall(r"\.([a-zA-Z_-][a-zA-Z0-9_-]*)", css))
    used = set()
    dynamic_tokens = {"a", "b", "expr", "learn", "quiz", "simple", "max100", "tricky", "words", "blitz", "game", "hammer", "brush"}
    for fn in ["index.html"] + sorted(glob.glob("*.js")):
        t = read(fn)
        for m in re.findall(r'class(?:Name)?\s*=\s*["\']([^"\']+)["\']', t):
            for tok in re.split(r"\s+", re.sub(r"\$\{[^}]*\}", " ", m)):
                if tok and re.match(r"^[a-zA-Z_-][a-zA-Z0-9_-]*$", tok):
                    used.add(tok)
        for m in re.findall(r"class\s*=\s*`([^`]+)`", t):
            for tok in re.split(r"\s+", re.sub(r"\$\{[^}]*\}", " ", m)):
                if tok and re.match(r"^[a-zA-Z_-][a-zA-Z0-9_-]*$", tok):
                    used.add(tok)
        for m in re.findall(r"classList\.(?:add|remove|toggle|contains)\(([^)]+)\)", t):
            for tok in re.findall(r'["\']([a-zA-Z0-9_-]+)["\']', m):
                used.add(tok)
    missing = sorted(c for c in used if c not in defined and c not in dynamic_tokens)
    print(f"CSS Classes: used={len(used)}, defined={len(defined)}, missing={len(missing)}")
    return [f"Missing CSS class: .{m}" for m in missing]


def check_a11y_and_buttons():
    errs = []
    html = read("index.html")
    rb_html = re.findall(r'role=["\']button["\']', html)
    if rb_html:
        errs.append(f"index.html contains {len(rb_html)} <div role='button'> element(s)")
    bad_html_btns = re.findall(r"<button\b(?![^>]*type=)[^>]*>", html)
    if bad_html_btns:
        errs.append(f"index.html has {len(bad_html_btns)} <button> missing explicit type=")
    for fn in sorted(glob.glob("*.js")):
        t = read(fn)
        if re.search(r"role\s*[,=]\s*['\"]button['\"]", t):
            errs.append(f"{fn} sets role='button' instead of native <button>")
        for m in re.finditer(r"document\.createElement\(['\"]button['\"]\)", t):
            snippet = t[m.start():m.start() + 200]
            if ".type =" not in snippet and ".type=" not in snippet:
                line_no = t[:m.start()].count("\n") + 1
                errs.append(f"{fn}:{line_no} createElement('button') without .type = 'button'")
        for m in re.finditer(r"<button\b(?![^>]*type=)[^>]*>", t):
            line_no = t[:m.start()].count("\n") + 1
            errs.append(f"{fn}:{line_no} HTML <button> without type=")
    print(f"A11y & Button types: checked {len(glob.glob('*.js')) + 1} files, issues={len(errs)}")
    return errs


def check_audio_mp3s():
    errs = []
    f_files = sorted(glob.glob("audio/female/*.mp3"))
    m_files = sorted(glob.glob("audio/male/*.mp3"))
    f_names = {os.path.basename(p): p for p in f_files}
    m_names = {os.path.basename(p): p for p in m_files}

    small = []
    identical_fm = []
    gtts_left = []
    total_bytes = 0
    for name in sorted(set(f_names) | set(m_names)):
        if name not in f_names:
            errs.append(f"Missing female MP3: audio/female/{name}")
            continue
        if name not in m_names:
            errs.append(f"Missing male MP3: audio/male/{name}")
            continue
        fp, mp = f_names[name], m_names[name]
        fsz, msz = os.path.getsize(fp), os.path.getsize(mp)
        total_bytes += fsz + msz
        if fsz < 500:
            small.append(fp)
        if msz < 500:
            small.append(mp)
        with open(fp, "rb") as a, open(mp, "rb") as b:
            da, db = a.read(), b.read()
        if hashlib.md5(da).digest() == hashlib.md5(db).digest():
            identical_fm.append(name)
        if da[:4].hex() == "fff384c4" or db[:4].hex() == "fff384c4":
            gtts_left.append(name)

    print(
        f"Audio MP3s: female={len(f_names)}, male={len(m_names)}, "
        f"size_mb={total_bytes / 1024 / 1024:.2f}, small={len(small)}, "
        f"identical_FM={len(identical_fm)}, gtts_fff384c4={len(gtts_left)}"
    )
    if small:
        errs.append(f"Corrupt/small MP3 files (<500B): {small}")
    if gtts_left:
        errs.append(f"gTTS fff384c4 legacy MP3s remaining: {len(gtts_left)} (e.g. {gtts_left[:5]})")
    return errs, {os.path.splitext(n)[0] for n in f_names}, {os.path.splitext(n)[0] for n in m_names}


def clean_word_key(w):
    return re.sub(r"\s+", " ", (w or "").lower().strip()
                  .replace("'", "").replace('"', "")
                  .replace(".", "").replace(",", "").replace("!", "").replace("?", ""))


def clean_piece(p):
    return clean_word_key(p).replace("-", "").replace(" ", "")


def split_vn_py(word):
    w = re.sub(r"\s+", " ", word.strip().lower())
    if not w:
        return []
    if " " in w:
        return w.split(" ")
    if len(w) <= 1:
        return [w]
    w_no_tone = (w
                 .replace("á", "a").replace("à", "a").replace("ả", "a").replace("ã", "a").replace("ạ", "a")
                 .replace("ắ", "ă").replace("ằ", "ă").replace("ẳ", "ă").replace("ẵ", "ă").replace("ặ", "ă")
                 .replace("ấ", "â").replace("ầ", "â").replace("ẩ", "â").replace("ẫ", "â").replace("ậ", "â")
                 .replace("é", "e").replace("è", "e").replace("ẻ", "e").replace("ẽ", "e").replace("ẹ", "e")
                 .replace("ế", "ê").replace("ề", "ê").replace("ể", "ê").replace("ễ", "ê").replace("ệ", "ê")
                 .replace("í", "i").replace("ì", "i").replace("ỉ", "i").replace("ĩ", "i").replace("ị", "i")
                 .replace("ó", "o").replace("ò", "o").replace("ỏ", "o").replace("õ", "o").replace("ọ", "o")
                 .replace("ố", "ô").replace("ồ", "ô").replace("ổ", "ô").replace("ỗ", "ô").replace("ộ", "ô")
                 .replace("ớ", "ơ").replace("ờ", "ơ").replace("ở", "ơ").replace("ỡ", "ơ").replace("ợ", "ơ")
                 .replace("ú", "u").replace("ù", "u").replace("ủ", "u").replace("ũ", "u").replace("ụ", "u")
                 .replace("ứ", "ư").replace("ừ", "ư").replace("ử", "ư").replace("ữ", "ư").replace("ự", "ư")
                 .replace("ý", "y").replace("ỳ", "y").replace("ỷ", "y").replace("ỹ", "y").replace("ỵ", "y"))
    if w_no_tone.startswith("gi"):
        return ["gi", w[2:]] if len(w) > 2 else [w]
    if w_no_tone.startswith("qu"):
        return ["qu", w[2:]] if len(w) > 2 else [w]
    if any(w_no_tone.startswith(t) for t in ("ngh",)):
        return ["ngh", w[3:]] if len(w) > 3 else [w]
    for d in ("ch", "gh", "kh", "ng", "nh", "ph", "th", "tr"):
        if w_no_tone.startswith(d):
            return [d, w[2:]] if len(w) > 2 else [w]
    vowels = set("aăâeêioôơuưy")
    if w_no_tone[0] not in vowels and w_no_tone[0].isalpha():
        return [w[0], w[1:]]
    return list(w)


def check_puzzle_splits():
    txt = read("data.js")
    words = re.findall(r"\{\s*id:\s*'[^']+',\s*word:\s*'([^']+)'", txt)
    errs = []
    for w in words:
        pieces = split_vn_py(w)
        if not pieces or any(not p for p in pieces):
            errs.append(f"Empty puzzle piece for {w!r}: {pieces}")
    for hard in ("già", "quà", "quýt", "nghỉ", "ghế", "xe", "nồi", "ngã", "bàn", "mèo", "cỏ", "chuồn chuồn"):
        p = split_vn_py(hard)
        if any(not x for x in p) or (hard == "già" and p != ["gi", "à"]) or (hard == "quà" and p != ["qu", "à"]):
            errs.append(f"Puzzle split regression on {hard!r}: {p}")
    print(f"Puzzle checks: {len(words)} lesson words + 12 hard cases verified")
    return errs


def slice_const_array(src, name):
    m = re.search(rf"const {name}\s*=\s*\[(.*?)\];", src, re.S)
    return m.group(1) if m else ""


def extract_explicit_audio_keys():
    """Extract all genuinely referenced audio keys across JS modules without tautologies."""
    used = set()
    data = read("data.js")
    math_js = read("math.js")
    ja_js = read("japanese.js")
    en_js = read("english.js")
    dr_js = read("dragons.js")
    speech_js = read("speech.js")
    app_js = read("app.js")
    sc_js = read("science_life.js")
    eth_js = read("ethics.js")
    arts_js = read("arts_pe.js")
    arc_js = read("arcade.js")
    lp_js = read("learning_plus.js")

    all_js = "\n".join([data, math_js, ja_js, en_js, dr_js, speech_js, app_js, sc_js, eth_js, arts_js, arc_js, lp_js])

    AUDIO_PFX = (
        "alpha_", "word_", "spell_", "syl_", "tone_", "oq_", "ort_", "dquiz", "vquiz_",
        "drquiz_", "dino", "veh", "dragon", "story_", "decod_", "mp_", "math_", "sc_",
        "ethics_", "art_", "arcade_", "cheer_", "ja_", "vi_", "en_"
    )
    for lit in re.findall(r"""["']?(?:audioKey|spellKey|qAudio|optAudio|promptKey)["']?\s*:\s*["']([^"']+)["']""", all_js):
        used.add(lit)

    dec_sec = slice_const_array(data, "DECODABLE_PHONICS_SENTENCES")
    for k in re.findall(r'"key"\s*:\s*"([^"]+)"', dec_sec):
        used.add(k)
    for k in re.findall(r'"id"\s*:\s*"(decod_[^"]+)"', dec_sec):
        used.add(k)

    for m in re.findall(r"playAudio(?:File|Sequence)\(([^)]+)\)", all_js):
        for s in re.findall(r"""["']([^"']+)["']""", m):
            if any(s.startswith(p) for p in AUDIO_PFX) and len(s) < 60 and " " not in s:
                used.add(s)

    CLOSED_PFX = (
        "oq_", "ort_", "sc_", "ethics_", "art_", "arcade_", "cheer_",
        "story_vn_", "decod_", "mp_tone_", "dquiz", "vquiz_", "drquiz_", "tone_",
        "ja_st", "ja_story_"
    )
    no_sw = re.sub(r"\.startsWith\([^)]+\)", "", all_js)
    for s in re.findall(r"""["']([a-zA-Z0-9_À-ỹ-]+)["']""", no_sw):
        if any(s.startswith(p) for p in CLOSED_PFX) and not s.endswith("_"):
            used.add(s)

    for i in range(1, 11):
        used.add(f"cheer_praise_{i}")
    for i in range(1, 5):
        used.add(f"cheer_try_{i}")
    for i in range(1, 4):
        used.add(f"cheer_streak_{i}")

    # ALPHABET_DATA & DIGRAPH_DATA
    for sec_name in ("ALPHABET_DATA", "DIGRAPH_DATA"):
        sec = slice_const_array(data, sec_name)
        for l in re.findall(r"lower:\s*'([^']+)'", sec):
            used.add("alpha_" + clean_piece(l))
        for w in re.findall(r"\bword:\s*'([^']+)'", sec):
            used.add("word_" + clean_word_key(w))

    # TONES_DATA
    tones_sec = slice_const_array(data, "TONES_DATA")
    for tid in re.findall(r"\bkey:\s*'([^']+)'", tones_sec):
        used.add("tone_" + tid)

    # ORTHOGRAPHY_QUIZ_DATA
    oq_sec = slice_const_array(data, "ORTHOGRAPHY_QUIZ_DATA")
    for qid in re.findall(r"\bid:\s*'([^']+)'", oq_sec):
        used.add("oq_q_" + qid)
    for opts in re.findall(r"options:\s*\[([^\]]+)\]", oq_sec):
        for o in re.findall(r"'([^']+)'", opts):
            used.add("oq_letter_" + o)

    # VOCAB_LESSONS & PHONICS_LESSONS (all card IDs: w*, p*, sx*, ng*, qt*, uy*, etc.)
    onsets = {"b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x", "ch", "gh", "gi", "kh", "ng", "ngh", "nh", "ph", "qu", "th", "tr"}
    vowels_single = {"a", "ă", "â", "e", "ê", "i", "o", "ô", "ơ", "u", "ư", "y"}

    vocab_txt = slice_const_array(data, "VOCAB_LESSONS")
    phonics_txt = slice_const_array(data, "PHONICS_LESSONS")
    for sec_txt in (vocab_txt, phonics_txt):
        for w in re.findall(r"\{\s*id:\s*'[^']+'[^}]*?\bword:\s*'([^']+)'", sec_txt):
            cw = clean_word_key(w)
            used.add("word_" + cw)
            used.add("spell_" + cw)
            for pc in split_vn_py(w):
                cp = clean_piece(pc)
                if not cp:
                    continue
                if cp in onsets or cp in vowels_single:
                    used.add("alpha_" + cp)
                else:
                    used.add("syl_" + cp)
        for bd in re.findall(r"breakdown:\s*'([^']+)'", sec_txt):
            for p in [clean_piece(x) for x in re.split(r"[\s,+]+", bd) if clean_piece(x) and x != "="]:
                if p in ("huyền", "sắc", "hỏi", "ngã", "nặng", "dấu"):
                    continue
                if p in onsets or p in vowels_single:
                    used.add("alpha_" + p)
                else:
                    used.add("syl_" + p)

    # DINO_LESSONS, VEHICLE_LESSONS, DRAGON_LESSONS breakdown tokens (card words use explicit audioKey/spellKey)
    for src_sec in (slice_const_array(data, "DINO_LESSONS"), slice_const_array(data, "VEHICLE_LESSONS"), slice_const_array(dr_js, "DRAGON_LESSONS")):
        for bd in re.findall(r"breakdown:\s*'([^']+)'", src_sec):
            for p in [clean_piece(x) for x in re.split(r"[\s,+]+", bd) if clean_piece(x) and x != "="]:
                if p in ("huyền", "sắc", "hỏi", "ngã", "nặng", "dấu"):
                    continue
                if p in onsets or p in vowels_single:
                    used.add("alpha_" + p)
                else:
                    used.add("syl_" + p)

    for vid in re.findall(r"id:\s*'(veh\d+)'", data):
        used.add("vquiz_" + vid)

    # LISTEN_CATCH_POOLS & SHINKANSEN_WORDS_DATA (Shinkansen pieces + whole word)
    lc_m = re.search(r"const LISTEN_CATCH_POOLS\s*=\s*\{(.*?)\n\};", data, re.S)
    lc_sec = lc_m.group(1) if lc_m else ""
    for tgt in re.findall(r"target:\s*'([^']+)'", lc_sec):
        ct = clean_word_key(tgt)
        if ct in onsets or ct in vowels_single:
            used.add("alpha_" + ct)
        else:
            used.add("word_" + ct)
    shink_sec = slice_const_array(data, "SHINKANSEN_WORDS_DATA")
    for tw in re.findall(r"word:\s*'([^']+)'", shink_sec):
        cw = clean_word_key(tw)
        used.add("word_" + cw)

    # Math dynamic keys
    for i in range(0, 101):
        used.add(f"math_v_{i}")
    for n in list(range(0, 21)) + [30, 40, 50, 60, 70, 80, 90, 100]:
        used.add(f"math_num_{n}")
    for h in range(1, 13):
        used.add(f"math_clock_{h}")
        used.add(f"math_clock_half_{h}")
    for d in range(2, 9):
        used.add(f"math_day_{d}")
    for t in (5, 6, 7, 8, 9, 10):
        for p in range(0, t + 1):
            used.add(f"math_bond_{t}_{p}")
    ruler_sec = slice_const_array(math_js, "MATH_RULER_ITEMS")
    for cm in re.findall(r"\bcm:\s*(\d+)", ruler_sec):
        used.add(f"math_cm_{cm}")
    for cm in range(1, 13):
        used.add(f"math_cm_opt_{cm}")
    for lit in re.findall(r"'(math_(?:op|q|cmp|shape|solid|eq|blank|and)[^']*)'", math_js):
        used.add(lit)

    # Ethics dynamic keys
    for qid in re.findall(r"\bid:\s*'(sit\d+)'", eth_js):
        used.add(f"ethics_{qid}_good")
        used.add(f"ethics_{qid}_bad")
    for bin_name in ("organic", "recycle", "hazard"):
        used.add(f"ethics_bin_{bin_name}")
    for item_id in re.findall(r"\bid:\s*'((?:les|eco)\d+)'", eth_js):
        used.add(f"ethics_{item_id}")

    # Japanese dynamic keys
    for h in re.findall(r"\bhira:\s*'([^']+)'", ja_js):
        used.add(f"ja_hira_{h}")
    for k in re.findall(r"\bkata:\s*'([^']+)'", ja_js):
        used.add(f"ja_kata_{k}")
    for yk in re.findall(r"key:\s*'(ja_hira_[^']+)'", ja_js):
        used.add(yk)
    for ch in re.findall(r"id:\s*'((?:ja_kanji_|ja_v|ja_n)[a-zA-Z0-9_]+)'", ja_js):
        used.add(f"vi_{ch}")
        if ch.startswith("ja_kanji_"):
            used.add(ch)
    for stid in range(1, 11):
        used.add(f"ja_story_{stid}")

    # English dynamic keys
    for l in re.findall(r"lower:\s*'([a-z])'", en_js):
        used.add(f"en_alpha_{l}")
        used.add(f"en_letter_{l}")
    for eid in re.findall(r"id:\s*'(en_v\d+)'", en_js):
        used.add(f"vi_{eid}")

    # Dragons quiz
    for i in range(1, 9):
        used.add(f"drquiz_{i}")

    return used


def check_all_audio_keys(f_set, m_set):
    used = extract_explicit_audio_keys()
    errs = []
    missing = sorted(u for u in used if u not in f_set or u not in m_set)
    real_missing = []
    for k in missing:
        if k.startswith("syl_") and ("word_" + k[4:] in f_set or "alpha_" + k[4:] in f_set):
            continue
        real_missing.append(k)

    orphans = sorted(k for k in (f_set | m_set) if k not in used)
    print(f"Audio Keys: checked={len(used)}, missing={len(real_missing)}, orphans={len(orphans)}")
    if real_missing:
        errs.append(f"Missing audio MP3s ({len(real_missing)}): {real_missing[:20]}")
    if orphans:
        errs.append(f"Orphan/unreferenced MP3s ({len(orphans)}): {orphans[:15]}")
    return errs


def check_syntax():
    js_files = sorted(glob.glob("*.js"))
    errs = []
    node = shutil.which("node")
    if node:
        for f in js_files:
            r = subprocess.run([node, "--check", f], capture_output=True, text=True)
            if r.returncode != 0:
                errs.append(f"JS syntax error in {f}: {r.stderr.strip()}")
        print(f"Node syntax check: {len(js_files)} files checked")
    else:
        print("Node syntax check: skipped (node not installed)")

    for fn in js_files:
        txt = read(fn)
        stack = []
        i = 0
        n = len(txt)
        in_str = None
        tpl_brace_depth = []
        in_lc = False
        in_bc = False
        in_re = False
        in_re_cls = False
        last_sig = ""
        while i < n:
            ch = txt[i]
            nxt = txt[i + 1] if i + 1 < n else ""
            if in_lc:
                if ch == "\n":
                    in_lc = False
                i += 1
                continue
            if in_bc:
                if ch == "*" and nxt == "/":
                    in_bc = False
                    i += 2
                    continue
                i += 1
                continue
            if in_re:
                if ch == "\\":
                    i += 2
                    continue
                if ch == "[" and not in_re_cls:
                    in_re_cls = True
                elif ch == "]" and in_re_cls:
                    in_re_cls = False
                elif ch == "/" and not in_re_cls:
                    in_re = False
                    last_sig = ")"
                i += 1
                continue
            if in_str:
                if ch == "\\":
                    i += 2
                    continue
                if ch == in_str:
                    in_str = None
                    last_sig = ")"
                elif in_str == "`" and ch == "$" and nxt == "{":
                    tpl_brace_depth.append(len(stack))
                    stack.append("{")
                    in_str = None
                    last_sig = "{"
                    i += 2
                    continue
                i += 1
                continue
            if ch == "/" and nxt == "/":
                in_lc = True
                i += 2
                continue
            if ch == "/" and nxt == "*":
                in_bc = True
                i += 2
                continue
            if ch == "/" and last_sig in ("", "(", "[", "{", ",", "=", ":", "!", "&", "|", "?", ";", "\n", "return"):
                in_re = True
                in_re_cls = False
                i += 1
                continue
            if ch in ("'", '"', "`"):
                in_str = ch
                i += 1
                continue
            if ch in "([{":
                stack.append(ch)
                last_sig = ch
            elif ch in ")]}":
                if not stack:
                    errs.append(f"{fn}: unmatched closing {ch!r} near offset {i}")
                    break
                top = stack.pop()
                if (top == "(" and ch != ")") or (top == "[" and ch != "]") or (top == "{" and ch != "}"):
                    errs.append(f"{fn}: mismatched {top!r} vs {ch!r} near offset {i}")
                    break
                if ch == "}" and tpl_brace_depth and len(stack) == tpl_brace_depth[-1]:
                    tpl_brace_depth.pop()
                    in_str = "`"
                last_sig = ")" if ch != "}" else "}"
            elif not ch.isspace():
                last_sig = ch
            i += 1
        if in_str is not None or in_bc:
            errs.append(f"{fn}: unclosed string or comment at EOF")
        elif stack:
            errs.append(f"{fn}: unclosed delimiter(s) {stack[:4]}")
    print(f"Python JS structure check: {len(js_files)} files checked")
    return errs


def main():
    errs = []
    errs.extend(check_ids())
    errs.extend(check_local_images())
    errs.extend(check_css_classes())
    errs.extend(check_a11y_and_buttons())
    mp3_errs, f_set, m_set = check_audio_mp3s()
    errs.extend(mp3_errs)
    errs.extend(check_puzzle_splits())
    errs.extend(check_all_audio_keys(f_set, m_set))
    errs.extend(check_syntax())

    if errs:
        print("\nAUDIT FAILED:")
        for e in errs:
            print(" -", e)
        sys.exit(1)
    print("\nAUDIT PASSED: All DOM, CSS, A11y, Image, Audio, Puzzle & JS checks clean!")


if __name__ == "__main__":
    main()
