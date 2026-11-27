// ========================================================
// BỘ MÔN TIẾNG NHẬT SONG NGỮ CHO BẢO LONG (NIHONGO 6 TUỔI)
// Gồm 4 phần:
// 1. 46 Chữ cái Hiragana cơ bản (あ -> ん)
// 2. 4 Chủ đề Giao tiếp & Từ vựng Nhật - Việt (34 từ/câu)
// 3. Bảng Tập Viết Hiragana Trên Ô Vuông Nhật Bản (Masume)
// 4. Trò Chơi Đố Vui Tiếng Nhật (10 câu)
// Đồng bộ giọng đọc Nhật bản xứ Nữ (Nanami) / Nam (Keita)
// ========================================================

const JA_HIRAGANA_DATA = [
  { hira: 'あ', romaji: 'a', word: 'あめ (Kẹo)', emoji: '🍬' },
  { hira: 'い', romaji: 'i', word: 'いぬ (Con chó)', emoji: '🐶' },
  { hira: 'う', romaji: 'u', word: 'うし (Con bò)', emoji: '🐮' },
  { hira: 'え', romaji: 'e', word: 'えんぴつ (Bút chì)', emoji: '✏️' },
  { hira: 'お', romaji: 'o', word: 'おにぎり (Cơm nắm)', emoji: '🍙' },

  { hira: 'か', romaji: 'ka', word: 'かめ (Con rùa)', emoji: '🐢' },
  { hira: 'き', romaji: 'ki', word: 'き (Cái cây)', emoji: '🌳' },
  { hira: 'く', romaji: 'ku', word: 'くるま (Ô tô)', emoji: '🚗' },
  { hira: 'け', romaji: 'ke', word: 'けしごむ (Tẩy)', emoji: '🧽' },
  { hira: 'こ', romaji: 'ko', word: 'こども (Em bé)', emoji: '👶' },

  { hira: 'さ', romaji: 'sa', word: 'さかな (Con cá)', emoji: '🐟' },
  { hira: 'し', romaji: 'shi', word: 'しんかんせん (Shinkansen)', emoji: '🚅' },
  { hira: 'す', romaji: 'su', word: 'すいか (Dưa hấu)', emoji: '🍉' },
  { hira: 'せ', romaji: 'se', word: 'せかい (Thế giới)', emoji: '🌍' },
  { hira: 'そ', romaji: 'so', word: 'そら (Bầu trời)', emoji: '🌤️' },

  { hira: 'た', romaji: 'ta', word: 'たまご (Quả trứng)', emoji: '🥚' },
  { hira: 'ち', romaji: 'chi', word: 'ちきゅう (Trái đất)', emoji: '🌏' },
  { hira: 'つ', romaji: 'tsu', word: 'つき (Mặt trăng)', emoji: '🌙' },
  { hira: 'て', romaji: 'te', word: 'て (Bàn tay)', emoji: '🖐️' },
  { hira: 'と', romaji: 'to', word: 'とり (Con chim)', emoji: '🐦' },

  { hira: 'な', romaji: 'na', word: 'なつ (Mùa hè)', emoji: '☀️' },
  { hira: 'に', romaji: 'ni', word: 'にわとり (Con gà)', emoji: '🐔' },
  { hira: 'ぬ', romaji: 'nu', word: 'ぬいぐるみ (Thú bông)', emoji: '🧸' },
  { hira: 'ね', romaji: 'ne', word: 'ねこ (Con mèo)', emoji: '🐱' },
  { hira: 'の', romaji: 'no', word: 'ノート (Quyển vở)', emoji: '📓' },

  { hira: 'は', romaji: 'ha', word: 'はな (Bông hoa)', emoji: '🌸' },
  { hira: 'ひ', romaji: 'hi', word: 'ひこうき (Máy bay)', emoji: '✈️' },
  { hira: 'ふ', romaji: 'fu', word: 'ふね (Tàu thủy)', emoji: '🚢' },
  { hira: 'へ', romaji: 'he', word: 'ヘリコプター (Trực thăng)', emoji: '🚁' },
  { hira: 'ほ', romaji: 'ho', word: 'ほし (Ngôi sao)', emoji: '⭐' },

  { hira: 'ま', romaji: 'ma', word: 'まと (Mục tiêu)', emoji: '🎯' },
  { hira: 'み', romaji: 'mi', word: 'みず (Nước uống)', emoji: '💧' },
  { hira: 'む', romaji: 'mu', word: 'むし (Côn trùng)', emoji: '🐞' },
  { hira: 'め', romaji: 'me', word: 'め (Đôi mắt)', emoji: '👀' },
  { hira: 'も', romaji: 'mo', word: 'もも (Quả đào)', emoji: '🍑' },

  { hira: 'や', romaji: 'ya', word: 'やま (Ngọn núi)', emoji: '⛰️' },
  { hira: 'ゆ', romaji: 'yu', word: 'ゆき (Tuyết rơi)', emoji: '❄️' },
  { hira: 'よ', romaji: 'yo', word: 'よる (Ban đêm)', emoji: '🌃' },

  { hira: 'ら', romaji: 'ra', word: 'ライオン (Sư tử)', emoji: '🦁' },
  { hira: 'り', romaji: 'ri', word: 'りんご (Quả táo)', emoji: '🍎' },
  { hira: 'る', romaji: 'ru', word: 'るす (Vắng nhà)', emoji: '🏠' },
  { hira: 'れ', romaji: 're', word: 'レモン (Quả chanh)', emoji: '🍋' },
  { hira: 'ろ', romaji: 'ro', word: 'ロボット (Người máy)', emoji: '🤖' },

  { hira: 'わ', romaji: 'wa', word: 'わに (Cá sấu)', emoji: '🐊' },
  { hira: 'を', romaji: 'wo', word: 'を (Trợ từ Wo)', emoji: '📝' },
  { hira: 'ん', romaji: 'n', word: 'ほん (Quyển sách)', emoji: '📚' }
];

// 25 Âm đục & Âm tròn Hiragana (濁音・半濁音)
const JA_DAKUON_DATA = [
  { hira: 'が', romaji: 'ga' }, { hira: 'ぎ', romaji: 'gi' }, { hira: 'ぐ', romaji: 'gu' }, { hira: 'げ', romaji: 'ge' }, { hira: 'ご', romaji: 'go' },
  { hira: 'ざ', romaji: 'za' }, { hira: 'じ', romaji: 'ji' }, { hira: 'ず', romaji: 'zu' }, { hira: 'ぜ', romaji: 'ze' }, { hira: 'ぞ', romaji: 'zo' },
  { hira: 'だ', romaji: 'da' }, { hira: 'ぢ', romaji: 'ji' }, { hira: 'づ', romaji: 'zu' }, { hira: 'で', romaji: 'de' }, { hira: 'ど', romaji: 'do' },
  { hira: 'ば', romaji: 'ba' }, { hira: 'び', romaji: 'bi' }, { hira: 'ぶ', romaji: 'bu' }, { hira: 'べ', romaji: 'be' }, { hira: 'ぼ', romaji: 'bo' },
  { hira: 'ぱ', romaji: 'pa' }, { hira: 'ぴ', romaji: 'pi' }, { hira: 'ぷ', romaji: 'pu' }, { hira: 'ぺ', romaji: 'pe' }, { hira: 'ぽ', romaji: 'po' }
];

// 46 Chữ cứng Katakana (ア -> ン)
const JA_KATAKANA_DATA = [
  { kata: 'ア', romaji: 'a', word: 'アイス (Kem)', emoji: '🍨' },
  { kata: 'イ', romaji: 'i', word: 'イルカ (Cá heo)', emoji: '🐬' },
  { kata: 'ウ', romaji: 'u', word: 'ウサギ (Thỏ)', emoji: '🐰' },
  { kata: 'エ', romaji: 'e', word: 'エレベーター', emoji: '🛗' },
  { kata: 'オ', romaji: 'o', word: 'オレンジ (Cam)', emoji: '🍊' },
  { kata: 'カ', romaji: 'ka', word: 'カメラ (Máy ảnh)', emoji: '📷' },
  { kata: 'キ', romaji: 'ki', word: 'キリン (Hươu)', emoji: '🦒' },
  { kata: 'ク', romaji: 'ku', word: 'クレヨン (Bút sáp)', emoji: '🖍️' },
  { kata: 'ケ', romaji: 'ke', word: 'ケーキ (Bánh kem)', emoji: '🎂' },
  { kata: 'コ', romaji: 'ko', word: 'コアラ (Koala)', emoji: '🐨' },
  { kata: 'サ', romaji: 'sa', word: 'サッカー (Bóng đá)', emoji: '⚽' },
  { kata: 'シ', romaji: 'shi', word: 'シンカンセン', emoji: '🚅' },
  { kata: 'ス', romaji: 'su', word: 'ステゴサウルス', emoji: '🦕' },
  { kata: 'セ', romaji: 'se', word: 'セーター (Áo len)', emoji: '🧶' },
  { kata: 'ソ', romaji: 'so', word: 'ソフトクリーム', emoji: '🍦' },
  { kata: 'タ', romaji: 'ta', word: 'タクシー (Taxi)', emoji: '🚕' },
  { kata: 'チ', romaji: 'chi', word: 'チーズ (Phô mai)', emoji: '🧀' },
  { kata: 'ツ', romaji: 'tsu', word: 'ツアー (Du lịch)', emoji: '🧳' },
  { kata: 'テ', romaji: 'te', word: 'ティラノサウルス', emoji: '🦖' },
  { kata: 'ト', romaji: 'to', word: 'トラック (Xe tải)', emoji: '🚚' },
  { kata: 'ナ', romaji: 'na', word: 'ナイフ (Dao bơ)', emoji: '🔪' },
  { kata: 'ニ', romaji: 'ni', word: 'ニュース (Tin tức)', emoji: '📺' },
  { kata: 'ヌ', romaji: 'nu', word: 'ヌードル (Mì)', emoji: '🍜' },
  { kata: 'ネ', romaji: 'ne', word: 'ネクタイ (Cà vạt)', emoji: '👔' },
  { kata: 'ノ', romaji: 'no', word: 'ノート (Quyển vở)', emoji: '📓' },
  { kata: 'ハ', romaji: 'ha', word: 'ハンバーガー', emoji: '🍔' },
  { kata: 'ヒ', romaji: 'hi', word: 'ヒーロー (Siêu nhân)', emoji: '🦸' },
  { kata: 'フ', romaji: 'fu', word: 'ファイヤードラゴン', emoji: '🐉' },
  { kata: 'ヘ', romaji: 'he', word: 'ヘリコプター', emoji: '🚁' },
  { kata: 'ホ', romaji: 'ho', word: 'ホテル (Khách sạn)', emoji: '🏨' },
  { kata: 'マ', romaji: 'ma', word: 'マスク (Khẩu trang)', emoji: '😷' },
  { kata: 'ミ', romaji: 'mi', word: 'ミルク (Sữa tươi)', emoji: '🥛' },
  { kata: 'ム', romaji: 'mu', word: 'ムース (Bánh mousse)', emoji: '🍮' },
  { kata: 'メ', romaji: 'me', word: 'メロン (Dưa lưới)', emoji: '🍈' },
  { kata: 'モ', romaji: 'mo', word: 'モンスター (Quái vật)', emoji: '👾' },
  { kata: 'ヤ', romaji: 'ya', word: 'ヤシ (Cây dừa)', emoji: '🌴' },
  { kata: 'ユ', romaji: 'yu', word: 'ユニコーン', emoji: '🦄' },
  { kata: 'ヨ', romaji: 'yo', word: 'ヨット (Thuyền buồm)', emoji: '⛵' },
  { kata: 'ラ', romaji: 'ra', word: 'ライオン (Sư tử)', emoji: '🦁' },
  { kata: 'リ', romaji: 'ri', word: 'リボン (Nơ xinh)', emoji: '🎀' },
  { kata: 'ル', romaji: 'ru', word: 'ルール (Quy tắc)', emoji: '📏' },
  { kata: 'レ', romaji: 're', word: 'レモン (Quả chanh)', emoji: '🍋' },
  { kata: 'ロ', romaji: 'ro', word: 'ロボット (Robot)', emoji: '🤖' },
  { kata: 'ワ', romaji: 'wa', word: 'ワニ (Cá sấu)', emoji: '🐊' },
  { kata: 'ヲ', romaji: 'wo', word: 'ヲ (Trợ từ)', emoji: '✨' },
  { kata: 'ン', romaji: 'n', word: 'パンダ (Gấu trúc)', emoji: '🐼' }
];

const JA_KANJI_STROKES = {
  '一': 1, '二': 2, '三': 3, '四': 5, '五': 4, '六': 4, '七': 2, '八': 2, '九': 2, '十': 2,
  '百': 6, '千': 3, '円': 4, '日': 4, '月': 4, '火': 4, '水': 4, '木': 4, '金': 8, '土': 3,
  '上': 3, '下': 3, '左': 5, '右': 5, '中': 4, '大': 3, '小': 3, '口': 3, '目': 5, '耳': 6,
  '手': 4, '足': 7, '人': 2, '男': 7, '女': 3, '子': 3, '犬': 4, '虫': 6, '貝': 7, '力': 2,
  '山': 3, '川': 3, '田': 5, '森': 12, '林': 8, '草': 9, '花': 7, '竹': 6, '石': 5, '雨': 8,
  '空': 8, '天': 4, '気': 6, '夕': 3, '音': 9, '早': 6, '村': 7, '町': 7, '車': 7, '玉': 5,
  '学': 8, '校': 10, '先': 6, '生': 5, '字': 6, '文': 4, '本': 5, '名': 6, '年': 6, '休': 6,
  '入': 2, '出': 5, '立': 5, '見': 7, '正': 5, '赤': 7, '青': 8, '白': 5, '王': 4, '糸': 6
};
const JA_YOON_SOKUON_DATA = [
  { key: 'ja_hira_きゃ', label: 'きゃ', romaji: 'kya', ex: 'きゃく (khách)' },
  { key: 'ja_hira_きゅ', label: 'きゅ', romaji: 'kyu', ex: 'きゅう (số 9)' },
  { key: 'ja_hira_きょ', label: 'きょ', romaji: 'kyo', ex: 'きょう (hôm nay)' },
  { key: 'ja_hira_しゃ', label: 'しゃ', romaji: 'sha', ex: 'でんしゃ (tàu điện)' },
  { key: 'ja_hira_しゅ', label: 'しゅ', romaji: 'shu', ex: 'しゅくだい (bài tập)' },
  { key: 'ja_hira_しょ', label: 'しょ', romaji: 'sho', ex: 'しょうぼうしゃ (cứu hỏa)' },
  { key: 'ja_hira_ちゃ', label: 'ちゃ', romaji: 'cha', ex: 'おちゃ (nước trà)' },
  { key: 'ja_hira_ちゅ', label: 'ちゅ', romaji: 'chu', ex: 'うちゅう (vũ trụ)' },
  { key: 'ja_hira_ちょ', label: 'ちょ', romaji: 'cho', ex: 'ちょうちょ (con bướm)' },
  { key: 'ja_hira_sokuon', label: 'っ (Âm ngắt)', romaji: 'nhân đôi', ex: 'きって (con tem)' }
];

// ĐÚNG 80 CHỮ KANJI LỚP 1 CHUẨN MEXT (一年生の漢字 80字)
const JA_KANJI_80_DATA = [
  // Bài 1 (20 chữ): Số đếm & Ngũ hành / Thiên nhiên
  { id: 'ja_kanji_01', unit: 1, char: '一', kun: 'ひと(つ)', on: 'イチ', vi: 'Số 1 (Một)', word: '一 (いち)', emoji: '1️⃣' },
  { id: 'ja_kanji_02', unit: 1, char: '二', kun: 'ふた(つ)', on: 'ニ', vi: 'Số 2 (Hai)', word: '二 (に)', emoji: '2️⃣' },
  { id: 'ja_kanji_03', unit: 1, char: '三', kun: 'みっ(つ)', on: 'サン', vi: 'Số 3 (Ba)', word: '三 (さん)', emoji: '3️⃣' },
  { id: 'ja_kanji_04', unit: 1, char: '四', kun: 'よん・よっ(つ)', on: 'シ', vi: 'Số 4 (Bốn)', word: '四 (よん)', emoji: '4️⃣' },
  { id: 'ja_kanji_05', unit: 1, char: '五', kun: 'いつ(つ)', on: 'ゴ', vi: 'Số 5 (Năm)', word: '五 (ご)', emoji: '5️⃣' },
  { id: 'ja_kanji_06', unit: 1, char: '六', kun: 'むっ(つ)', on: 'ロク', vi: 'Số 6 (Sáu)', word: '六 (ろく)', emoji: '6️⃣' },
  { id: 'ja_kanji_07', unit: 1, char: '七', kun: 'なな(つ)', on: 'シチ', vi: 'Số 7 (Bảy)', word: '七 (なな)', emoji: '7️⃣' },
  { id: 'ja_kanji_08', unit: 1, char: '八', kun: 'やっ(つ)', on: 'ハチ', vi: 'Số 8 (Tám)', word: '八 (はち)', emoji: '8️⃣' },
  { id: 'ja_kanji_09', unit: 1, char: '九', kun: 'ここの(つ)', on: 'キュウ', vi: 'Số 9 (Chín)', word: '九 (きゅう)', emoji: '9️⃣' },
  { id: 'ja_kanji_10', unit: 1, char: '十', kun: 'とお', on: 'ジュウ', vi: 'Số 10 (Mười)', word: '十 (じゅう)', emoji: '🔟' },
  { id: 'ja_kanji_11', unit: 1, char: '百', kun: '— (chỉ On)', on: 'ヒャク', vi: 'Một trăm (100)', word: '百 (ひゃく)', emoji: '💯' },
  { id: 'ja_kanji_12', unit: 1, char: '千', kun: 'ち', on: 'セン', vi: 'Một nghìn (1000)', word: '千 (せん)', emoji: '🔢' },
  { id: 'ja_kanji_13', unit: 1, char: '円', kun: 'まる(い)', on: 'エン', vi: 'Đồng Yên / Tròn', word: '百円 (ひゃくえん)', emoji: '🪙' },
  { id: 'ja_kanji_14', unit: 1, char: '日', kun: 'ひ・か', on: 'ニチ', vi: 'Mặt Trời / Ngày', word: '日曜日 (にちようび)', emoji: '☀️' },
  { id: 'ja_kanji_15', unit: 1, char: '月', kun: 'つき', on: 'ゲツ', vi: 'Mặt Trăng / Tháng', word: 'お月さま (おつきさま)', emoji: '🌙' },
  { id: 'ja_kanji_16', unit: 1, char: '火', kun: 'ひ', on: 'カ', vi: 'Ngọn lửa', word: '火 (ひ)', emoji: '🔥' },
  { id: 'ja_kanji_17', unit: 1, char: '水', kun: 'みず', on: 'スイ', vi: 'Nước mát', word: '水 (みず)', emoji: '💧' },
  { id: 'ja_kanji_18', unit: 1, char: '木', kun: 'き', on: 'モク', vi: 'Cây gỗ', word: '木 (き)', emoji: '🌳' },
  { id: 'ja_kanji_19', unit: 1, char: '金', kun: 'かね', on: 'キン', vi: 'Vàng / Kim loại', word: '金色 (きんいろ)', emoji: '🥇' },
  { id: 'ja_kanji_20', unit: 1, char: '土', kun: 'つち', on: 'ド', vi: 'Đất đai', word: '土 (つち)', emoji: '🟤' },
  // Bài 2 (20 chữ): Phương hướng, Cơ thể & Con vật
  { id: 'ja_kanji_21', unit: 2, char: '上', kun: 'うえ・あ(がる)', on: 'ジョウ', vi: 'Bên trên', word: '上 (うえ)', emoji: '⬆️' },
  { id: 'ja_kanji_22', unit: 2, char: '下', kun: 'した・さ(がる)', on: 'カ・ゲ', vi: 'Bên dưới', word: '下 (した)', emoji: '⬇️' },
  { id: 'ja_kanji_23', unit: 2, char: '左', kun: 'ひだり', on: 'サ', vi: 'Bên trái', word: '左 (ひだり)', emoji: '⬅️' },
  { id: 'ja_kanji_24', unit: 2, char: '右', kun: 'みぎ', on: 'ウ・ユウ', vi: 'Bên phải', word: '右 (みぎ)', emoji: '➡️' },
  { id: 'ja_kanji_25', unit: 2, char: '中', kun: 'なか', on: 'チュウ', vi: 'Ở giữa / Bên trong', word: '中 (なか)', emoji: '🎯' },
  { id: 'ja_kanji_26', unit: 2, char: '大', kun: 'おお(きい)', on: 'ダイ・タイ', vi: 'To lớn', word: '大きい (おおきい)', emoji: '🐘' },
  { id: 'ja_kanji_27', unit: 2, char: '小', kun: 'ちい(さい)', on: 'ショウ', vi: 'Nhỏ bé', word: '小さい (ちいさい)', emoji: '🐣' },
  { id: 'ja_kanji_28', unit: 2, char: '口', kun: 'くち', on: 'コウ・ク', vi: 'Cái miệng / Cửa', word: '口 (くち)', emoji: '👄' },
  { id: 'ja_kanji_29', unit: 2, char: '目', kun: 'め', on: 'モク', vi: 'Đôi mắt', word: '目 (め)', emoji: '👁️' },
  { id: 'ja_kanji_30', unit: 2, char: '耳', kun: 'みみ', on: 'ジ', vi: 'Đôi tai', word: '耳 (みみ)', emoji: '👂' },
  { id: 'ja_kanji_31', unit: 2, char: '手', kun: 'て', on: 'シュ', vi: 'Bàn tay', word: '手 (て)', emoji: '🖐️' },
  { id: 'ja_kanji_32', unit: 2, char: '足', kun: 'あし・た(りる)', on: 'ソク', vi: 'Bàn chân', word: '足 (あし)', emoji: '🦶' },
  { id: 'ja_kanji_33', unit: 2, char: '人', kun: 'ひと', on: 'ジン・ニン', vi: 'Con người', word: '人 (ひと)', emoji: '🧑' },
  { id: 'ja_kanji_34', unit: 2, char: '男', kun: 'おとこ', on: 'ダン', vi: 'Con trai / Đàn ông', word: '男の子 (おとこのこ)', emoji: '👦' },
  { id: 'ja_kanji_35', unit: 2, char: '女', kun: 'おんな', on: 'ジョ', vi: 'Con gái / Phụ nữ', word: '女の子 (おんなのこ)', emoji: '👧' },
  { id: 'ja_kanji_36', unit: 2, char: '子', kun: 'こ', on: 'シ・ス', vi: 'Em bé / Trẻ con', word: '子ども (こども)', emoji: '🧒' },
  { id: 'ja_kanji_37', unit: 2, char: '犬', kun: 'いぬ', on: 'ケン', vi: 'Chú chó', word: '犬 (いぬ)', emoji: '🐶' },
  { id: 'ja_kanji_38', unit: 2, char: '虫', kun: 'むし', on: 'チュウ', vi: 'Côn trùng / Bọ', word: '虫 (むし)', emoji: '🐞' },
  { id: 'ja_kanji_39', unit: 2, char: '貝', kun: 'かい', on: 'バイ', vi: 'Vỏ sò / Ngao', word: '貝 (かい)', emoji: '🐚' },
  { id: 'ja_kanji_40', unit: 2, char: '力', kun: 'ちから', on: 'リョク', vi: 'Sức mạnh', word: '力 (ちから)', emoji: '💪' },
  // Bài 3 (20 chữ): Thiên nhiên, Thời tiết & Thị trấn
  { id: 'ja_kanji_41', unit: 3, char: '山', kun: 'やま', on: 'サン', vi: 'Ngọn núi', word: '山 (やま)', emoji: '⛰️' },
  { id: 'ja_kanji_42', unit: 3, char: '川', kun: 'かわ', on: 'セン', vi: 'Con sông', word: '川 (かわ)', emoji: '🏞️' },
  { id: 'ja_kanji_43', unit: 3, char: '田', kun: 'た', on: 'デン', vi: 'Ruộng lúa', word: '田んぼ (たんぼ)', emoji: '🌾' },
  { id: 'ja_kanji_44', unit: 3, char: '森', kun: 'もり', on: 'シン', vi: 'Khu rừng rậm', word: '森 (もり)', emoji: '🌲' },
  { id: 'ja_kanji_45', unit: 3, char: '林', kun: 'はやし', on: 'リン', vi: 'Rừng cây nhỏ', word: '林 (はやし)', emoji: '🌴' },
  { id: 'ja_kanji_46', unit: 3, char: '草', kun: 'くさ', on: 'ソウ', vi: 'Bãi cỏ xanh', word: '草 (くさ)', emoji: '🌿' },
  { id: 'ja_kanji_47', unit: 3, char: '花', kun: 'はな', on: 'カ', vi: 'Bông hoa', word: '花 (はな)', emoji: '🌸' },
  { id: 'ja_kanji_48', unit: 3, char: '竹', kun: 'たけ', on: 'チク', vi: 'Cây tre', word: '竹 (たけ)', emoji: '🎋' },
  { id: 'ja_kanji_49', unit: 3, char: '石', kun: 'いし', on: 'セキ', vi: 'Hòn đá', word: '石 (いし)', emoji: '🪨' },
  { id: 'ja_kanji_50', unit: 3, char: '雨', kun: 'あめ', on: 'ウ', vi: 'Cơn mưa', word: '雨 (あめ)', emoji: '☔' },
  { id: 'ja_kanji_51', unit: 3, char: '空', kun: 'そら・あ(く)', on: 'クウ', vi: 'Bầu trời', word: '青空 (あおぞら)', emoji: '🌤️' },
  { id: 'ja_kanji_52', unit: 3, char: '天', kun: 'あめ・あま', on: 'テン', vi: 'Bầu trời cao', word: '天気 (てんき)', emoji: '🌈' },
  { id: 'ja_kanji_53', unit: 3, char: '気', kun: '— (âm Hán: Khí)', on: 'キ・ケ', vi: 'Khí trời / Tinh thần', word: '元気 (げんき)', emoji: '⚡' },
  { id: 'ja_kanji_54', unit: 3, char: '夕', kun: 'ゆう', on: 'セキ', vi: 'Buổi chiều tà', word: '夕方 (ゆうがた)', emoji: '🌆' },
  { id: 'ja_kanji_55', unit: 3, char: '音', kun: 'おと・ね', on: 'オン', vi: 'Âm thanh', word: '音 (おと)', emoji: '🎵' },
  { id: 'ja_kanji_56', unit: 3, char: '早', kun: 'はや(い)', on: 'ソウ', vi: 'Sớm / Nhanh', word: '早い (はやい)', emoji: '⏰' },
  { id: 'ja_kanji_57', unit: 3, char: '村', kun: 'むら', on: 'ソン', vi: 'Ngôi làng', word: '村 (むら)', emoji: '🏡' },
  { id: 'ja_kanji_58', unit: 3, char: '町', kun: 'まち', on: 'チョウ', vi: 'Khu phố / Thị trấn', word: '町 (まち)', emoji: '🏘️' },
  { id: 'ja_kanji_59', unit: 3, char: '車', kun: 'くるま', on: 'シャ', vi: 'Xe ô tô', word: '車 (くるま)', emoji: '🚗' },
  { id: 'ja_kanji_60', unit: 3, char: '玉', kun: 'たま', on: 'ギョク', vi: 'Viên ngọc / Bóng tròn', word: 'シャボン玉 (しゃぼんだま)', emoji: '🔮' },
  // Bài 4 (20 chữ): Trường học, Màu sắc & Hành động
  { id: 'ja_kanji_61', unit: 4, char: '学', kun: 'まな(ぶ)', on: 'ガク', vi: 'Học tập', word: '学校 (がっこう)', emoji: '🎒' },
  { id: 'ja_kanji_62', unit: 4, char: '校', kun: '— (âm Hán: Hiệu)', on: 'コウ', vi: 'Trường học', word: '小学校 (しょうがっこう)', emoji: '🏫' },
  { id: 'ja_kanji_63', unit: 4, char: '先', kun: 'さき', on: 'セン', vi: 'Trước / Thầy cô', word: '先生 (せんせい)', emoji: '👩‍🏫' },
  { id: 'ja_kanji_64', unit: 4, char: '生', kun: 'い(きる)・う(まれる)', on: 'セイ・ショウ', vi: 'Cuộc sống / Học sinh', word: '一年生 (いちねんせい)', emoji: '🌱' },
  { id: 'ja_kanji_65', unit: 4, char: '字', kun: 'あざ', on: 'ジ', vi: 'Chữ viết', word: '漢字 (かんじ)', emoji: '🔤' },
  { id: 'ja_kanji_66', unit: 4, char: '文', kun: 'ふみ', on: 'ブン・モン', vi: 'Câu văn', word: '作文 (さくぶん)', emoji: '📝' },
  { id: 'ja_kanji_67', unit: 4, char: '本', kun: 'もと', on: 'ホン', vi: 'Quyển sách / Gốc', word: '本 (ほん)', emoji: '📖' },
  { id: 'ja_kanji_68', unit: 4, char: '名', kun: 'な', on: 'メイ', vi: 'Tên gọi', word: '名前 (なまえ)', emoji: '🪪' },
  { id: 'ja_kanji_69', unit: 4, char: '年', kun: 'とし', on: 'ネン', vi: 'Năm (Thời gian)', word: '今年 (ことし)', emoji: '📅' },
  { id: 'ja_kanji_70', unit: 4, char: '休', kun: 'やす(む)', on: 'キュウ', vi: 'Nghỉ ngơi', word: '休み (やすみ)', emoji: '🛌' },
  { id: 'ja_kanji_71', unit: 4, char: '入', kun: 'い(る)・はい(る)・い(れる)', on: 'ニュウ', vi: 'Đi vào', word: '入り口 (いりぐち)', emoji: '🚪' },
  { id: 'ja_kanji_72', unit: 4, char: '出', kun: 'で(る)・だ(す)', on: 'シュツ', vi: 'Đi ra', word: '出口 (でぐち)', emoji: '🚶' },
  { id: 'ja_kanji_73', unit: 4, char: '立', kun: 'た(つ)', on: 'リツ', vi: 'Đứng lên', word: '立つ (たつ)', emoji: '🧍' },
  { id: 'ja_kanji_74', unit: 4, char: '見', kun: 'み(る)', on: 'ケン', vi: 'Nhìn / Ngắm xem', word: '見る (みる)', emoji: '👀' },
  { id: 'ja_kanji_75', unit: 4, char: '正', kun: 'ただ(しい)', on: 'セイ・ショウ', vi: 'Đúng đắn', word: '正しい (ただしい)', emoji: '✅' },
  { id: 'ja_kanji_76', unit: 4, char: '赤', kun: 'あか', on: 'セキ', vi: 'Màu đỏ', word: '赤 (あか)', emoji: '🔴' },
  { id: 'ja_kanji_77', unit: 4, char: '青', kun: 'あお', on: 'セイ', vi: 'Màu xanh dương', word: '青 (あお)', emoji: '🔵' },
  { id: 'ja_kanji_78', unit: 4, char: '白', kun: 'しろ', on: 'ハク', vi: 'Màu trắng', word: '白 (しろ)', emoji: '⚪' },
  { id: 'ja_kanji_79', unit: 4, char: '王', kun: '— (âm Hán: Vương)', on: 'オウ', vi: 'Vị vua / Chúa tể', word: '王さま (おうさま)', emoji: '👑' },
  { id: 'ja_kanji_80', unit: 4, char: '糸', kun: 'いと', on: 'シ', vi: 'Sợi chỉ / Sợi tơ', word: '糸 (いと)', emoji: '🧵' }
];

// 10 Truyện Đọc Kinh Điển Sách Quốc Ngữ Lớp 1 & Cổ Tích Nhật Bản (小1 国語・昔話)
const JA_STORIES_DATA = [
  {
    "id": "ja_story_1",
    "image": "images/stories/ja_story_1.jpg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🥕 おおきな かぶ (Củ Cải Khổng Lồ)",
    "audioKey": "ja_story_1",
    "moral": "💡 Đoàn kết là sức mạnh: dù bé nhỏ như chú chuột nhắt, góp sức cùng nhau cũng làm nên kỳ tích!",
    "jaLines": [
      {
        "key": "ja_story_1_l1",
        "ja": "おじいさんが かぶの たねを まきました。",
        "romaji": "Ojiisan ga kabu no tane o makimashita.",
        "vi": "Ông lão gieo một hạt củ cải xuống mảnh vườn nhỏ."
      },
      {
        "key": "ja_story_1_l2",
        "ja": "「あまい あまい かぶに なれ。おおきな かぶに なれ。」",
        "romaji": "\"Amai amai kabu ni nare. Ookina kabu ni nare.\"",
        "vi": "\"Hãy mọc thành củ cải thật ngọt, thành củ cải thật to nhé!\""
      },
      {
        "key": "ja_story_1_l3",
        "ja": "あまい げんきの よい、とてつもなく おおきな かぶが できました。",
        "romaji": "Amai genki no yoi, totetsumonaku ookina kabu ga dekimashita.",
        "vi": "Một củ cải vừa ngọt, vừa tươi tốt và khổng lồ chưa từng thấy đã lớn lên."
      },
      {
        "key": "ja_story_1_l4",
        "ja": "おじいさんは かぶを ぬこうと しました。「うんとこしょ、どっこいしょ。」それでも かぶは ぬけません。",
        "romaji": "Ojiisan wa kabu o nukou to shimashita. \"Untokosho, dokkoisho.\" Soredemo kabu wa nukemasen.",
        "vi": "Ông lão ra sức nhổ củ cải: \"Hò dô ta, kéo lên nào!\" Nhưng củ cải vẫn không nhúc nhích."
      },
      {
        "key": "ja_story_1_l5",
        "ja": "おじいさんは おばあさんを よんで きました。ふたりで ひっぱっても、まだ ぬけません。",
        "romaji": "Ojiisan wa obaasan o yonde kimashita. Futari de hippatte mo, mada nukemasen.",
        "vi": "Ông lão gọi bà lão ra giúp. Hai ông bà cùng hợp sức kéo mà vẫn chưa nhổ được."
      },
      {
        "key": "ja_story_1_l6",
        "ja": "おばあさんは まごを よびました。まごが おばあさんを ひっぱって、みんなで ひっぱっても ぬけません。",
        "romaji": "Obaasan wa mago o yobimashita. Mago ga obaasan o hippatte, minna de hippatte mo nukemasen.",
        "vi": "Bà lão gọi cô cháu gái ra phụ. Cháu kéo bà, bà kéo ông, kéo mãi mà củ cải vẫn đứng yên."
      },
      {
        "key": "ja_story_1_l7",
        "ja": "まごは いぬを よび、いぬは ねこを よび、ねこは 小さな ねずみを よんで きました。",
        "romaji": "Mago wa inu o yobi, inu wa neko o yobi, neko wa chiisana nezumi o yonde kimashita.",
        "vi": "Cháu gái gọi chú chó, chó gọi mèo con, và mèo con gọi thêm chú chuột nhắt bé xíu tới giúp."
      },
      {
        "key": "ja_story_1_l8",
        "ja": "ねずみが ねこを、ねこが いぬを、いぬが まごを、まごが おばあさんを、おばあさんが おじいさんを ひっぱって、「うんとこしょ、どっこいしょ。」",
        "romaji": "Nezumi ga neko o, neko ga inu o, inu ga mago o, mago ga obaasan o, obaasan ga ojiisan o hippatte, \"untokosho, dokkoisho.\"",
        "vi": "Chuột kéo mèo, mèo kéo chó, chó kéo cháu, cháu kéo bà, bà kéo ông, ông kéo củ cải: \"Hò dô ta, kéo nào!\""
      },
      {
        "key": "ja_story_1_l9",
        "ja": "とうとう、おおきな かぶは ぬけました！ みんなで よろこんで わらいあいました。",
        "romaji": "Toutou, ookina kabu wa nukemashita! Minna de yorokonde waraiaimashita.",
        "vi": "Cuối cùng, củ cải khổng lồ đã bật lên khỏi mặt đất! Cả nhà reo hò cười vang hạnh phúc."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_1_v1",
        "ja": "かぶ",
        "romaji": "kabu",
        "vi": "củ cải trắng"
      },
      {
        "audioKey": "ja_story_1_v2",
        "ja": "ひっぱる",
        "romaji": "hipparu",
        "vi": "kéo thật mạnh"
      },
      {
        "audioKey": "ja_story_1_v3",
        "ja": "ねずみ",
        "romaji": "nezumi",
        "vi": "chú chuột nhắt"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_1_q",
        "question": "Trong truyện Củ cải khổng lồ, ai là bạn nhỏ cuối cùng tới kéo giúp và nhổ bật được củ cải?",
        "options": [
          {
            "key": "ja_st1_o1",
            "emoji": "🐭",
            "text": "Chú chuột nhắt (ねずみ)",
            "isGood": true
          },
          {
            "key": "ja_st1_o2",
            "emoji": "🦖",
            "text": "Khủng long T-Rex",
            "isGood": false
          },
          {
            "key": "ja_st1_o3",
            "emoji": "🐘",
            "text": "Chú voi con",
            "isGood": false
          },
          {
            "key": "ja_st1_o4",
            "emoji": "🦁",
            "text": "Sư tử dũng mãnh",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_1_q2",
        "question": "Mọi người đã hợp sức gọi thêm từng ai ra kéo củ cải theo đúng trình tự nào?",
        "options": [
          {
            "key": "ja_st1_q2_o1",
            "emoji": "🤝",
            "text": "Ông → Bà → Cháu → Chó → Mèo → Chuột",
            "isGood": true
          },
          {
            "key": "ja_st1_q2_o2",
            "emoji": "🐭",
            "text": "Chuột tự nhổ một mình từ đầu",
            "isGood": false
          },
          {
            "key": "ja_st1_q2_o3",
            "emoji": "🐯",
            "text": "Hổ và Gấu từ rừng chạy ra kéo giúp",
            "isGood": false
          },
          {
            "key": "ja_st1_q2_o4",
            "emoji": "🚜",
            "text": "Dùng xe máy kéo nông trại kéo lên",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Ông lão gieo một hạt củ cải xuống mảnh vườn nhỏ. \"Hãy mọc thành củ cải thật ngọt, thành củ cải thật to nhé!\" Một củ cải vừa ngọt, vừa tươi tốt và khổng lồ chưa từng thấy đã lớn lên. Ông lão ra sức nhổ củ cải: \"Hò dô ta, kéo lên nào!\" Nhưng củ cải vẫn không nhúc nhích. Ông lão gọi bà lão ra giúp. Hai ông bà cùng hợp sức kéo mà vẫn chưa nhổ được. Bà lão gọi cô cháu gái ra phụ. Cháu kéo bà, bà kéo ông, kéo mãi mà củ cải vẫn đứng yên. Cháu gái gọi chú chó, chó gọi mèo con, và mèo con gọi thêm chú chuột nhắt bé xíu tới giúp. Chuột kéo mèo, mèo kéo chó, chó kéo cháu, cháu kéo bà, bà kéo ông, ông kéo củ cải: \"Hò dô ta, kéo nào!\" Cuối cùng, củ cải khổng lồ đã bật lên khỏi mặt đất! Cả nhà reo hò cười vang hạnh phúc."
  },
  {
    "id": "ja_story_2",
    "image": "images/stories/ja_story_2.jpg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🐋 くじらぐも (Đám Mây Cá Voi)",
    "audioKey": "ja_story_2",
    "moral": "💡 Trí tưởng tượng bay bổng và niềm vui tập thể giúp mỗi giờ học trở thành chuyến phiêu lưu kỳ diệu!",
    "jaLines": [
      {
        "key": "ja_story_2_l1",
        "ja": "いちねん 二くみの 子どもたちが、校庭で たいそうを して いました。",
        "romaji": "Ichinen nikumi no kodomotachi ga, koutei de taisou o shite imashita.",
        "vi": "Các bạn học sinh lớp 1B đang tập thể dục ngoài sân trường ngập nắng."
      },
      {
        "key": "ja_story_2_l2",
        "ja": "ふと 空を みあげると、まっ白な おおきな くじらぐもが うかんで いました。",
        "romaji": "Futo sora o miageru to, masshiro na ookina kujiragumo ga ukande imashita.",
        "vi": "Bỗng nhiên ngước nhìn bầu trời, cả lớp thấy một đám mây trắng muốt hình chú cá voi khổng lồ."
      },
      {
        "key": "ja_story_2_l3",
        "ja": "「おーい、こっちへ おいでよ。」子どもたちも くじらぐもも、おたがいに よびあいました。",
        "romaji": "\"Ooi, kocchi e oide yo.\" Kodomotachi mo kujiragumo mo, otagai ni yobiaimashita.",
        "vi": "\"Này ơi, bay lại đây đi!\" Cả các bạn nhỏ lẫn đám mây cá voi cùng vui vẻ gọi nhau."
      },
      {
        "key": "ja_story_2_l4",
        "ja": "先生と 子どもたちは てを つないで、「てんまで とどけ、一、二、三！」と ジャンプしました。",
        "romaji": "Sensei to kodomotachi wa te o tsunaide, \"Ten made todoke, ichi, ni, san!\" to janpu shimashita.",
        "vi": "Cô giáo và các bạn nắm chặt tay nhau hô vang: \"Bay chạm tới trời cao nào, một, hai, ba!\" rồi bật nhảy."
      },
      {
        "key": "ja_story_2_l5",
        "ja": "さんどめに、とうとう くもに のる ことが できました！ くじらぐもは ぐんぐん 空へ のぼります。",
        "romaji": "Sandome ni, toutou kumo ni noru koto ga dekimashita! Kujiragumo wa gungun sora e noborimasu.",
        "vi": "Đến lần nhảy thứ ba, cả lớp đã trèo lên được lưng mây! Đám mây cá voi bay vút lên bầu trời xanh."
      },
      {
        "key": "ja_story_2_l6",
        "ja": "空の うえからは、みんなが 住む まちや 青い うみが 小さく 見えました。",
        "romaji": "Sora no ue kara wa, minna ga sumu machi ya aoi umi ga chiisaku miemashita.",
        "vi": "Từ trên trời cao nhìn xuống, phố xá thân thương và biển xanh bao la hiện ra thật nhỏ bé."
      },
      {
        "key": "ja_story_2_l7",
        "ja": "そろそろ おひるに なります。学校から きれいな チャイムの 音が きこえて きました。",
        "romaji": "Sorosoro ohiru ni narimasu. Gakkou kara kirei na chaimu no oto ga kikoete kimashita.",
        "vi": "Đã sắp đến giờ ăn trưa rồi. Từ ngôi trường phía dưới, tiếng chuông báo giờ vang lên trong trẻo."
      },
      {
        "key": "ja_story_2_l8",
        "ja": "子どもたちは くじらぐもに 「さようなら」と 手を ふって、もといた 校庭へ おりて きました。",
        "romaji": "Kodomotachi wa kujiragumo ni \"sayounara\" to te o futte, moto ita koutei e orite kimashita.",
        "vi": "Các bạn nhỏ vẫy tay chào tạm biệt đám mây cá voi rồi nhẹ nhàng đáp xuống sân trường."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_2_v1",
        "ja": "くじら",
        "romaji": "kujira",
        "vi": "con cá voi"
      },
      {
        "audioKey": "ja_story_2_v2",
        "ja": "くも",
        "romaji": "kumo",
        "vi": "đám mây"
      },
      {
        "audioKey": "ja_story_2_v3",
        "ja": "たいそう",
        "romaji": "taisou",
        "vi": "tập thể dục"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_2_q",
        "question": "Đám mây khổng lồ trên bầu trời sân trường biến thành hình con vật gì để đón các bạn nhỏ bay lên chơi?",
        "options": [
          {
            "key": "ja_st2_o1",
            "emoji": "🐋",
            "text": "Con cá voi (くじら)",
            "isGood": true
          },
          {
            "key": "ja_st2_o2",
            "emoji": "🚗",
            "text": "Xe ô tô con",
            "isGood": false
          },
          {
            "key": "ja_st2_o3",
            "emoji": "🍎",
            "text": "Quả táo đỏ",
            "isGood": false
          },
          {
            "key": "ja_st2_o4",
            "emoji": "🐢",
            "text": "Con rùa vàng",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_2_q2",
        "question": "Khi nghe tiếng chuông trường báo giờ trưa vang lên, các bạn nhỏ đã làm gì?",
        "options": [
          {
            "key": "ja_st2_q2_o1",
            "emoji": "👋",
            "text": "Vẫy tay chào tạm biệt đám mây và đáp xuống sân trường",
            "isGood": true
          },
          {
            "key": "ja_st2_q2_o2",
            "emoji": "😴",
            "text": "Ngủ quên luôn trên đám mây cả buổi chiều",
            "isGood": false
          },
          {
            "key": "ja_st2_q2_o3",
            "emoji": "⚽",
            "text": "Chơi đá bóng ngay trên tầng mây cao",
            "isGood": false
          },
          {
            "key": "ja_st2_q2_o4",
            "emoji": "🍦",
            "text": "Ngồi ăn kem cầu vồng cùng bầy chim sẻ",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Các bạn học sinh lớp 1B đang tập thể dục ngoài sân trường ngập nắng. Bỗng nhiên ngước nhìn bầu trời, cả lớp thấy một đám mây trắng muốt hình chú cá voi khổng lồ. \"Này ơi, bay lại đây đi!\" Cả các bạn nhỏ lẫn đám mây cá voi cùng vui vẻ gọi nhau. Cô giáo và các bạn nắm chặt tay nhau hô vang: \"Bay chạm tới trời cao nào, một, hai, ba!\" rồi bật nhảy. Đến lần nhảy thứ ba, cả lớp đã trèo lên được lưng mây! Đám mây cá voi bay vút lên bầu trời xanh. Từ trên trời cao nhìn xuống, phố xá thân thương và biển xanh bao la hiện ra thật nhỏ bé. Đã sắp đến giờ ăn trưa rồi. Từ ngôi trường phía dưới, tiếng chuông báo giờ vang lên trong trẻo. Các bạn nhỏ vẫy tay chào tạm biệt đám mây cá voi rồi nhẹ nhàng đáp xuống sân trường."
  },
  {
    "id": "ja_story_3",
    "image": "images/stories/ja_story_3.svg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🦝 たぬきの いとぐるま (Guồng Quay Tơ Của Chú Lửng)",
    "audioKey": "ja_story_3",
    "moral": "💡 Lòng nhân hậu và biết ơn luôn mang lại phép màu ấm áp giữa con người và thiên nhiên.",
    "jaLines": [
      {
        "key": "ja_story_3_l1",
        "ja": "むかし、山おくの いっけんやに きこりの ふうふが すんで いました。",
        "romaji": "Mukashi, yamaoku no ikkenya ni kikori no fuufu ga sunde imashita.",
        "vi": "Ngày xưa, trong ngôi nhà lẻ loi sâu trong núi, có hai vợ chồng bác tiều phu sinh sống."
      },
      {
        "key": "ja_story_3_l2",
        "ja": "まいばん、いたずらな たぬきが やぶの かげから いえの 中を のぞいて いました。",
        "romaji": "Maiban, itazura na tanuki ga yabu no kage kara ie no naka o nozoite imashita.",
        "vi": "Tối nào cũng vậy, một chú lửng tinh nghịch lại núp sau bụi cây lén nhìn vào trong nhà."
      },
      {
        "key": "ja_story_3_l3",
        "ja": "おかみさんが まわす いとぐるまの 「キーカラカラ、キークルクル」という おとが、たぬきは 大すきでした。",
        "romaji": "Okamisan ga mawasu itoguruma no \"Kii-kara-kara, kii-kuru-kuru\" to iu oto ga, tanuki wa daisuki deshita.",
        "vi": "Chú lửng rất mê âm thanh \"Kii-kara-kara, kii-kuru-kuru\" khi vợ bác tiều phu quay guồng kéo tơ."
      },
      {
        "key": "ja_story_3_l4",
        "ja": "ある日、たぬきは きこりの わなに かかって しまいました。きこりは おこって、たぬきを はりに つるしました。",
        "romaji": "Aru hi, tanuki wa kikori no wana ni kakatte shimaimashita. Kikori wa okotte, tanuki o hari ni tsurushimashita.",
        "vi": "Một hôm, chú lửng chẳng may sập bẫy của bác tiều phu. Bác giận lắm, liền treo chú lên xà nhà."
      },
      {
        "key": "ja_story_3_l5",
        "ja": "おかみさんは たぬきが かわいそうに なって、なわを ほどいて やりました。たぬきは よろこんで 森へ 帰りました。",
        "romaji": "Okamisan wa tanuki ga kawaisou ni natte, nawa o hodoite yarimashita. Tanuki wa yorokonde mori e kaerimashita.",
        "vi": "Thấy chú lửng đáng thương, người vợ lén cởi dây trói cho chú. Chú lửng mừng rỡ chạy về khu rừng."
      },
      {
        "key": "ja_story_3_l6",
        "ja": "さむい 冬が やって きました。おかみさんは びょうきに なり、きこりも 山へ 行けません。",
        "romaji": "Samui fuyu ga yatte kimashita. Okamisan wa byouki ni nari, kikori mo yama e ikemasen.",
        "vi": "Mùa đông giá rét ập tới. Người vợ bị ốm nặng, còn bác tiều phu cũng không thể lên núi đốn củi."
      },
      {
        "key": "ja_story_3_l7",
        "ja": "ある ばん、月の 光の 中で 「キーカラカラ、キークルクル」と いとぐるまが まわって いました。",
        "romaji": "Aru ban, tsuki no hikari no naka de \"Kii-kara-kara, kii-kuru-kuru\" to itoguruma ga mawatte imashita.",
        "vi": "Một đêm nọ, dưới ánh trăng sáng, tiếng guồng quay tơ \"Kii-kara-kara, kii-kuru-kuru\" bỗng vang lên đều đặn."
      },
      {
        "key": "ja_story_3_l8",
        "ja": "たぬきが 糸の たばを 山ほど つむいで、お礼を して くれたのでした。ふうふは なみだを 流して よろこびました。",
        "romaji": "Tanuki ga ito no taba o yama hodo tsumuide, orei o shite kureta no deshita. Fuufu wa namida o nagashite yorokobimashita.",
        "vi": "Hóa ra chú lửng đã quay giúp cả núi cuộn tơ óng mượt để trả ơn cứu mạng! Hai vợ chồng xúc động rơi nước mắt."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_3_v1",
        "ja": "たぬき",
        "romaji": "tanuki",
        "vi": "chú lửng"
      },
      {
        "audioKey": "ja_story_3_v2",
        "ja": "いとぐるま",
        "romaji": "itoguruma",
        "vi": "guồng quay tơ"
      },
      {
        "audioKey": "ja_story_3_v3",
        "ja": "おれい",
        "romaji": "orei",
        "vi": "sự trả ơn"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_3_q",
        "question": "Câu chuyện Guồng quay tơ của chú lửng dạy chúng ta bài học gì?",
        "options": [
          {
            "key": "ja_st3_o1",
            "emoji": "💝",
            "text": "Biết ơn và chăm chỉ trả ơn",
            "isGood": true
          },
          {
            "key": "ja_st3_o2",
            "emoji": "😴",
            "text": "Lười biếng ngủ cả ngày",
            "isGood": false
          },
          {
            "key": "ja_st3_o3",
            "emoji": "🗯️",
            "text": "Hay cáu gắt bạn bè",
            "isGood": false
          },
          {
            "key": "ja_st3_o4",
            "emoji": "🙊",
            "text": "Nói dối người lớn",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_3_q2",
        "question": "Khi chú lửng bị mắc bẫy treo lên xà nhà, ai đã thương tình cởi trói giúp chú?",
        "options": [
          {
            "key": "ja_st3_q2_o1",
            "emoji": "🧶",
            "text": "Vợ của bác tiều phu",
            "isGood": true
          },
          {
            "key": "ja_st3_q2_o2",
            "emoji": "🐺",
            "text": "Con sói xám trong rừng",
            "isGood": false
          },
          {
            "key": "ja_st3_q2_o3",
            "emoji": "🦅",
            "text": "Chú đại bàng trên núi",
            "isGood": false
          },
          {
            "key": "ja_st3_q2_o4",
            "emoji": "👑",
            "text": "Nhà vua đi ngang qua",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Ngày xưa, trong ngôi nhà lẻ loi sâu trong núi, có hai vợ chồng bác tiều phu sinh sống. Tối nào cũng vậy, một chú lửng tinh nghịch lại núp sau bụi cây lén nhìn vào trong nhà. Chú lửng rất mê âm thanh \"Kii-kara-kara, kii-kuru-kuru\" khi vợ bác tiều phu quay guồng kéo tơ. Một hôm, chú lửng chẳng may sập bẫy của bác tiều phu. Bác giận lắm, liền treo chú lên xà nhà. Thấy chú lửng đáng thương, người vợ lén cởi dây trói cho chú. Chú lửng mừng rỡ chạy về khu rừng. Mùa đông giá rét ập tới. Người vợ bị ốm nặng, còn bác tiều phu cũng không thể lên núi đốn củi. Một đêm nọ, dưới ánh trăng sáng, tiếng guồng quay tơ \"Kii-kara-kara, kii-kuru-kuru\" bỗng vang lên đều đặn. Hóa ra chú lửng đã quay giúp cả núi cuộn tơ óng mượt để trả ơn cứu mạng! Hai vợ chồng xúc động rơi nước mắt."
  },
  {
    "id": "ja_story_4",
    "image": "images/stories/ja_story_4.svg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🐶 ずうっと ずっと 大すきだよ (Mãi Yêu Chú Chó Elf)",
    "audioKey": "ja_story_4",
    "moral": "💡 Hãy luôn nói lời yêu thương chân thành với gia đình và những người bạn thân mỗi ngày!",
    "jaLines": [
      {
        "key": "ja_story_4_l1",
        "ja": "ぼくと 犬の エルフは、いつも いっしょに おおきく なりました。",
        "romaji": "Boku to inu no Erufu wa, itsumo issho ni ookiku narimashita.",
        "vi": "Tớ và chú chó Elf đã cùng nhau lớn lên từng ngày bên nhau."
      },
      {
        "key": "ja_story_4_l2",
        "ja": "ぼくが せが のびるに つれて、エルフは だんだん 年を とって いきました。",
        "romaji": "Boku ga se ga nobiru ni tsurete, Erufu wa dandan toshi o totte ikimashita.",
        "vi": "Khi tớ càng cao lớn lên thì chú chó Elf lại càng già đi từng chút một."
      },
      {
        "key": "ja_story_4_l3",
        "ja": "ある ころから、エルフは 階段を のぼるのも つらく なりました。ぼくは エルフを だきかかえて 部屋へ はこびました。",
        "romaji": "Aru koro kara, Erufu wa kaidan o noboru no mo tsuraku narimashita. Boku wa Erufu o dakikakaete heya e hakobimashita.",
        "vi": "Rồi đến một ngày, Elf không còn đủ sức tự leo cầu thang nữa. Tớ nhẹ nhàng ôm bế Elf lên phòng ngủ."
      },
      {
        "key": "ja_story_4_l4",
        "ja": "おふとんの 横に ねむる エルフの おなかを やさしく なでながら、ぼくは まいばん ささやきました。",
        "romaji": "Ofuton no yoko ni nemuru Erufu no onaka o yasashiku nadenagara, boku wa maiban sasayakimashita.",
        "vi": "Ngồi bên chiếc nệm ấm, tớ khẽ vuốt ve Elf rồi thì thầm câu nói quen thuộc mỗi tối trước khi ngủ."
      },
      {
        "key": "ja_story_4_l5",
        "ja": "「エルフ、ぼくは ずうっと ずっと、おまえが 大すきだよ。」エルフは うれしそうに しっぽを ひとふり しました。",
        "romaji": "\"Erufu, boku wa zuutto zutto, omae ga daisuki da yo.\" Erufu wa ureshisou ni shippo o hitofuri shimashita.",
        "vi": "\"Elf ơi, tớ mãi mãi, mãi mãi yêu quý bạn đấy nhé!\" Nghe vậy, Elf mừng rỡ khẽ vẫy đuôi một cái thật hiền."
      },
      {
        "key": "ja_story_4_l6",
        "ja": "ある あさ、目を さますと、エルフは しずかに 眠るように 旅立って いました。家族みんなが 泣きました。",
        "romaji": "Aru asa, me o samasu to, Erufu wa shizuka ni nemuru you ni tabidatte imashita. Kazoku minna ga nakimashita.",
        "vi": "Một buổi sáng kia, khi tớ thức dậy thì Elf đã nhẹ nhàng đi vào giấc ngủ dài. Cả gia đình đều thương nhớ bật khóc."
      },
      {
        "key": "ja_story_4_l7",
        "ja": "となりの 家の 子が 新しい 子犬を くれようと しましたが、ぼくは 「いまは いいよ」と ことわりました。",
        "romaji": "Tonari no ie no ko ga atarashii koinu o kureyou to shimashita ga, boku wa \"ima wa ii yo\" to kotowarimashita.",
        "vi": "Cô bạn hàng xóm ngỏ ý tặng tớ một chú cún con mới, nhưng tớ nhẹ nhàng lắc đầu từ chối."
      },
      {
        "key": "ja_story_4_l8",
        "ja": "だって ぼくは、まいばん エルフに 「ずうっと 大すきだよ」と 伝えつづけて きたから、心は あったかかったのです。",
        "romaji": "Datte boku wa, maiban Erufu ni \"zuutto daisuki da yo\" to tsutaetsuzukete kita kara, kokoro wa attakakatta no desu.",
        "vi": "Bởi vì mỗi tối, tớ đã luôn nói hết lòng mình \"Mãi mãi yêu Elf!\", nên trong tim tớ thật ấm áp và không hề hối tiếc."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_4_v1",
        "ja": "大すき",
        "romaji": "daisuki",
        "vi": "rất yêu quý"
      },
      {
        "audioKey": "ja_story_4_v2",
        "ja": "しっぽ",
        "romaji": "shippo",
        "vi": "cái đuôi"
      },
      {
        "audioKey": "ja_story_4_v3",
        "ja": "かぞく",
        "romaji": "kazoku",
        "vi": "gia đình"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_4_q",
        "question": "Cậu bé luôn thì thầm câu nói ấm áp nào với chú chó Elf mỗi tối trước khi đi ngủ?",
        "options": [
          {
            "key": "ja_st4_o1",
            "emoji": "💖",
            "text": "Tớ mãi mãi yêu quý bạn!",
            "isGood": true
          },
          {
            "key": "ja_st4_o2",
            "emoji": "🚲",
            "text": "Đi mua xe đạp mới nhé!",
            "isGood": false
          },
          {
            "key": "ja_st4_o3",
            "emoji": "🌧️",
            "text": "Ngoài trời đang mưa to!",
            "isGood": false
          },
          {
            "key": "ja_st4_o4",
            "emoji": "🔔",
            "text": "Chuông đồng hồ kêu đấy!",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_4_q2",
        "question": "Khi chú chó Elf già yếu không leo nổi cầu thang, cậu bé đã làm gì?",
        "options": [
          {
            "key": "ja_st4_q2_o1",
            "emoji": "🫂",
            "text": "Ôm bế Elf lên phòng ngủ và vuốt ve mỗi tối",
            "isGood": true
          },
          {
            "key": "ja_st4_q2_o2",
            "emoji": "🌳",
            "text": "Để Elf ngủ một mình ngoài sân vườn",
            "isGood": false
          },
          {
            "key": "ja_st4_q2_o3",
            "emoji": "🏃",
            "text": "Bỏ đi chơi không quan tâm tới Elf nữa",
            "isGood": false
          },
          {
            "key": "ja_st4_q2_o4",
            "emoji": "🐱",
            "text": "Đem Elf đi đổi một chú mèo mới",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Tớ và chú chó Elf đã cùng nhau lớn lên từng ngày bên nhau. Khi tớ càng cao lớn lên thì chú chó Elf lại càng già đi từng chút một. Rồi đến một ngày, Elf không còn đủ sức tự leo cầu thang nữa. Tớ nhẹ nhàng ôm bế Elf lên phòng ngủ. Ngồi bên chiếc nệm ấm, tớ khẽ vuốt ve Elf rồi thì thầm câu nói quen thuộc mỗi tối trước khi ngủ. \"Elf ơi, tớ mãi mãi, mãi mãi yêu quý bạn đấy nhé!\" Nghe vậy, Elf mừng rỡ khẽ vẫy đuôi một cái thật hiền. Một buổi sáng kia, khi tớ thức dậy thì Elf đã nhẹ nhàng đi vào giấc ngủ dài. Cả gia đình đều thương nhớ bật khóc. Cô bạn hàng xóm ngỏ ý tặng tớ một chú cún con mới, nhưng tớ nhẹ nhàng lắc đầu từ chối. Bởi vì mỗi tối, tớ đã luôn nói hết lòng mình \"Mãi mãi yêu Elf!\", nên trong tim tớ thật ấm áp và không hề hối tiếc."
  },
  {
    "id": "ja_story_5",
    "image": "images/stories/ja_story_5.svg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🐸 おてがみ (Bức Thư Của Ếch Và Cóc)",
    "audioKey": "ja_story_5",
    "moral": "💡 Sự quan tâm tinh tế dành cho bạn bè khiến những ngày chờ đợi cũng trở nên hạnh phúc.",
    "jaLines": [
      {
        "key": "ja_story_5_l1",
        "ja": "がまくんは げんかんの 前で、かなしそうに すわって いました。",
        "romaji": "Gamakun wa genkan no mae de, kanashisou ni suwatte imashita.",
        "vi": "Cóc con ngồi buồn thiu ngay trước bậc thềm cửa nhà mình."
      },
      {
        "key": "ja_story_5_l2",
        "ja": "どうしたのかと かえるくんが きくと、「ぼくは いちども おてがみを もらったことが ないんだ」と 言いました。",
        "romaji": "Doushita no ka to Kaerukun ga kiku to, \"boku wa ichido mo otegami o moratta koto ga nain da\" to iimashita.",
        "vi": "Bạn Ếch hỏi thăm, Cóc đáp: \"Tớ chưa bao giờ nhận được một bức thư nào cả.\""
      },
      {
        "key": "ja_story_5_l3",
        "ja": "かえるくんは いそいで 家へ 帰り、がまくんあてに おてがみを 書きました。",
        "romaji": "Kaerukun wa isoide ie e kaeri, Gamakun ate ni otegami o kakimashita.",
        "vi": "Bạn Ếch vội vàng chạy về nhà, nắn nót viết ngay một bức thư gửi cho Cóc."
      },
      {
        "key": "ja_story_5_l4",
        "ja": "そして、かたつむりくんに 「この 手紙を がまくんに とどけてね」と たのみました。",
        "romaji": "Soshite, Katatsumurikun ni \"kono tegami o Gamakun ni todokete ne\" to tanomimashita.",
        "vi": "Sau đó, Ếch nhờ chú Ốc Sên: \"Nhờ cậu mang lá thư này đưa tận tay Cóc nhé!\""
      },
      {
        "key": "ja_story_5_l5",
        "ja": "かえるくんは がまくんの家へ もどり、「きっと きょう 手紙が くるよ」と いっしょに まちました。",
        "romaji": "Kaerukun wa Gamakun no ie e modori, \"kitto kyou tegami ga kuru yo\" to issho ni machimashita.",
        "vi": "Ếch quay lại nhà Cóc ngồi cạnh an ủi: \"Chắc chắn hôm nay sẽ có thư gửi tới cho cậu đấy!\""
      },
      {
        "key": "ja_story_5_l6",
        "ja": "ふたりは よっかも まちましたが、なかなか きません。そこで かえるくんは 内容を そっと 教えて あげました。",
        "romaji": "Futari wa yokka mo machimashita ga, nakanaka kimasen. Soko de Kaerukun wa naiyou o sotto oshiete agemashita.",
        "vi": "Hai bạn đợi bốn ngày liền mà thư vẫn chưa tới. Thế là Ếch nhẹ nhàng kể trước những lời trong thư cho Cóc nghe."
      },
      {
        "key": "ja_story_5_l7",
        "ja": "「しん愛なる がまがえるくん。ぼくは きみが ぼくの しんゆうで あることを うれしく おもっています。」",
        "romaji": "\"Shin'ai naru Gamagaerukun. Boku wa kimi ga boku no shin'yuu de aru koto o ureshiku omotte imasu.\"",
        "vi": "\"Cóc thân mến! Tớ rất hạnh phúc vì có cậu là người bạn thân thiết nhất của tớ.\""
      },
      {
        "key": "ja_story_5_l8",
        "ja": "よっかめの 夜、ようやく かたつむりくんが とどけた 手紙を よんで、ふたりは とても しあわせに なりました。",
        "romaji": "Yokkame no yoru, youyaku Katatsumurikun ga todoketa tegami o yonde, futari wa totemo shiawase ni narimashita.",
        "vi": "Tối ngày thứ tư, Ốc Sên cuối cùng cũng đưa thư tới nơi, khiến hai bạn vỡ òa trong niềm vui ấm áp."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_5_v1",
        "ja": "てがみ",
        "romaji": "tegami",
        "vi": "lá thư"
      },
      {
        "audioKey": "ja_story_5_v2",
        "ja": "かたつむり",
        "romaji": "katatsumuri",
        "vi": "con ốc sên"
      },
      {
        "audioKey": "ja_story_5_v3",
        "ja": "しんゆう",
        "romaji": "shin'yuu",
        "vi": "bạn thân thiết"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_5_q1",
        "question": "Vì sao bạn Ếch lại viết thư rồi nhờ chú Ốc Sên mang đến cho Cóc?",
        "options": [
          {
            "key": "ja_st5_q1_o1",
            "emoji": "💌",
            "text": "Vì Cóc buồn khi chưa từng nhận được thư bao giờ",
            "isGood": true
          },
          {
            "key": "ja_st5_q1_o2",
            "emoji": "🍕",
            "text": "Để mời Cóc đi ăn bánh pizza phô mai",
            "isGood": false
          },
          {
            "key": "ja_st5_q1_o3",
            "emoji": "📚",
            "text": "Để mượn Cóc quyển vở tập viết",
            "isGood": false
          },
          {
            "key": "ja_st5_q1_o4",
            "emoji": "☔",
            "text": "Để dặn Cóc mang theo ô che mưa",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_5_q2",
        "question": "Trong bức thư, bạn Ếch đã viết điều gì gửi Cóc?",
        "options": [
          {
            "key": "ja_st5_q2_o1",
            "emoji": "💛",
            "text": "Tớ rất vui vì cậu là bạn thân của tớ",
            "isGood": true
          },
          {
            "key": "ja_st5_q2_o2",
            "emoji": "🏃",
            "text": "Nhớ dậy sớm chạy bộ tập thể dục nhé",
            "isGood": false
          },
          {
            "key": "ja_st5_q2_o3",
            "emoji": "🎒",
            "text": "Ngày mai nhớ mang bút chì màu đi học",
            "isGood": false
          },
          {
            "key": "ja_st5_q2_o4",
            "emoji": "🎂",
            "text": "Chúc mừng sinh nhật chú mèo hàng xóm",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Cóc con ngồi buồn thiu ngay trước bậc thềm cửa nhà mình. Bạn Ếch hỏi thăm, Cóc đáp: \"Tớ chưa bao giờ nhận được một bức thư nào cả.\" Bạn Ếch vội vàng chạy về nhà, nắn nót viết ngay một bức thư gửi cho Cóc. Sau đó, Ếch nhờ chú Ốc Sên: \"Nhờ cậu mang lá thư này đưa tận tay Cóc nhé!\" Ếch quay lại nhà Cóc ngồi cạnh an ủi: \"Chắc chắn hôm nay sẽ có thư gửi tới cho cậu đấy!\" Hai bạn đợi bốn ngày liền mà thư vẫn chưa tới. Thế là Ếch nhẹ nhàng kể trước những lời trong thư cho Cóc nghe. \"Cóc thân mến! Tớ rất hạnh phúc vì có cậu là người bạn thân thiết nhất của tớ.\" Tối ngày thứ tư, Ốc Sên cuối cùng cũng đưa thư tới nơi, khiến hai bạn vỡ òa trong niềm vui ấm áp."
  },
  {
    "id": "ja_story_6",
    "image": "images/stories/ja_story_6.svg",
    "badge": "🏯 Cổ Tích Nhật Bản",
    "title": "🍑 ももたろう (Cậu Bé Quả Đào Momotaro)",
    "audioKey": "ja_story_6",
    "moral": "💡 Lòng dũng cảm, sự sẻ chia và tình đồng đội giúp vượt qua mọi thử thách.",
    "jaLines": [
      {
        "key": "ja_story_6_l1",
        "ja": "むかし、川で せんたくを していた おばあさんの ところに、大きな ももが どんぶらこと 流れて きました。",
        "romaji": "Mukashi, kawa de sentaku o shite ita obaasan no tokoro ni, ookina momo ga donburako to nagarete kimashita.",
        "vi": "Ngày xưa, khi bà lão đang giặt áo bên bờ suối, bỗng có quả đào khổng lồ trôi lềnh bềnh theo dòng nước."
      },
      {
        "key": "ja_story_6_l2",
        "ja": "ももを わると、中から 元気な 男の子が 生まれ、ふうふは 「ももたろう」と 名づけました。",
        "romaji": "Momo o waru to, naka kara genki na otokonoko ga umare, fuufu wa \"Momotarou\" to nazukemashita.",
        "vi": "Bổ quả đào ra, một bé trai khỏe mạnh bước ra, hai ông bà mừng rỡ đặt tên cậu là Momotaro."
      },
      {
        "key": "ja_story_6_l3",
        "ja": "おおきく そだった ももたろうは、村人を こまらせる 鬼を たいじしに 出かける ことにしました。",
        "romaji": "Ookiku sodatta Momotarou wa, murabito o komaraseru oni o taiji shi ni dekakeru koto ni shimashita.",
        "vi": "Khi lớn lên cường tráng, Momotaro quyết tâm lên đường đánh đuổi bọn quỷ chuyên quấy phá dân làng."
      },
      {
        "key": "ja_story_6_l4",
        "ja": "おばあさんが つくった 日本一の きびだんごを 腰に つけて、ももたろうは 旅に 出ました。",
        "romaji": "Obaasan ga tsukutta nippon'ichi no kibidango o koshi ni tsukete, Momotarou wa tabi ni demashita.",
        "vi": "Mang theo túi bánh kê ngon nhất nước Nhật do bà làm, Momotaro hăng hái lên đường."
      },
      {
        "key": "ja_story_6_l5",
        "ja": "とちゅうで 出会った いぬ、さる、きじは、きびだんごを もらって ももたろうの 仲間に なりました。",
        "romaji": "Tochuu de deatta inu, saru, kiji wa, kibidango o moratte Momotarou no nakama ni narimashita.",
        "vi": "Trên đường đi, chú Chó, Khỉ và Chim Trĩ được chia bánh thơm ngon nên đều tình nguyện đồng hành cùng cậu."
      },
      {
        "key": "ja_story_6_l6",
        "ja": "みんなは 小さな 船に のって、荒い 波を こえて おにがしまへと むかいました。",
        "romaji": "Minna wa chiisana fune ni notte, arai nami o koete Onigashima e to mukaimashita.",
        "vi": "Cả nhóm cùng lên chiếc thuyền nhỏ, dũng cảm vượt qua sóng lớn tiến thẳng tới Đảo Quỷ."
      },
      {
        "key": "ja_story_6_l7",
        "ja": "いぬは かみつき、さるは ひっかき、きじは 空から つっつき、力を 合わせて 鬼たちに 勝ちました。",
        "romaji": "Inu wa kamitsuki, saru wa hikkaki, kiji wa sora kara tsuttsuki, chikara o awasete onitachi ni kachimashita.",
        "vi": "Chó xông vào giữ chân, Khỉ nhanh nhẹn nhảy tới, Chim Trĩ bay từ trên cao xuống, cả đội đồng lòng chiến thắng."
      },
      {
        "key": "ja_story_6_l8",
        "ja": "うばわれた 宝物を とりもどした ももたろうと 仲間たちは、おじいさんと おばあさんの もとへ 帰りました。",
        "romaji": "Ubawareta takaramono o torimodoshita Momotarou to nakamatachi wa, ojiisan to obaasan no moto e kaerimashita.",
        "vi": "Giành lại được toàn bộ kho báu cho dân làng, Momotaro và những người bạn hân hoan trở về bên ông bà."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_6_v1",
        "ja": "もも",
        "romaji": "momo",
        "vi": "quả đào"
      },
      {
        "audioKey": "ja_story_6_v2",
        "ja": "きびだんご",
        "romaji": "kibidango",
        "vi": "bánh kê dango"
      },
      {
        "audioKey": "ja_story_6_v3",
        "ja": "なかま",
        "romaji": "nakama",
        "vi": "bạn đồng hành"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_6_q1",
        "question": "Trên đường đi đến Đảo Quỷ, ba người bạn nào đã đi theo giúp đỡ Momotaro?",
        "options": [
          {
            "key": "ja_st6_q1_o1",
            "emoji": "🐕",
            "text": "Chó, Khỉ và Chim Trĩ",
            "isGood": true
          },
          {
            "key": "ja_st6_q1_o2",
            "emoji": "🐱",
            "text": "Mèo, Chuột và Rùa",
            "isGood": false
          },
          {
            "key": "ja_st6_q1_o3",
            "emoji": "🦁",
            "text": "Sư tử, Voi và Ngựa vằn",
            "isGood": false
          },
          {
            "key": "ja_st6_q1_o4",
            "emoji": "🐟",
            "text": "Cá heo, Cua và Ốc sên",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_6_q2",
        "question": "Món bánh nào bà lão đã chuẩn bị cho Momotaro mang theo trên đường?",
        "options": [
          {
            "key": "ja_st6_q2_o1",
            "emoji": "🍡",
            "text": "Bánh kê Kibi-dango",
            "isGood": true
          },
          {
            "key": "ja_st6_q2_o2",
            "emoji": "🍜",
            "text": "Mì ramen nóng hổi",
            "isGood": false
          },
          {
            "key": "ja_st6_q2_o3",
            "emoji": "🍣",
            "text": "Cơm cuộn cá hồi",
            "isGood": false
          },
          {
            "key": "ja_st6_q2_o4",
            "emoji": "🍰",
            "text": "Bánh kem dâu tây",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Ngày xưa, khi bà lão đang giặt áo bên bờ suối, bỗng có quả đào khổng lồ trôi lềnh bềnh theo dòng nước. Bổ quả đào ra, một bé trai khỏe mạnh bước ra, hai ông bà mừng rỡ đặt tên cậu là Momotaro. Khi lớn lên cường tráng, Momotaro quyết tâm lên đường đánh đuổi bọn quỷ chuyên quấy phá dân làng. Mang theo túi bánh kê ngon nhất nước Nhật do bà làm, Momotaro hăng hái lên đường. Trên đường đi, chú Chó, Khỉ và Chim Trĩ được chia bánh thơm ngon nên đều tình nguyện đồng hành cùng cậu. Cả nhóm cùng lên chiếc thuyền nhỏ, dũng cảm vượt qua sóng lớn tiến thẳng tới Đảo Quỷ. Chó xông vào giữ chân, Khỉ nhanh nhẹn nhảy tới, Chim Trĩ bay từ trên cao xuống, cả đội đồng lòng chiến thắng. Giành lại được toàn bộ kho báu cho dân làng, Momotaro và những người bạn hân hoan trở về bên ông bà."
  },
  {
    "id": "ja_story_7",
    "image": "images/stories/ja_story_7.jpg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🚗 じどうしゃ くらべ (So Sánh Các Loại Xe)",
    "audioKey": "ja_story_7",
    "moral": "💡 Quan sát cấu tạo giúp bé hiểu mỗi chiếc xe đều được thiết kế khéo léo cho công việc riêng!",
    "jaLines": [
      {
        "key": "ja_story_7_l1",
        "ja": "道路には、いろいろな しごとの 自動車が はしって います。どんな しごとを するのでしょう。",
        "romaji": "Douro ni wa, iroiro na shigoto no jidousha ga hashitte imasu. Donna shigoto o suru no deshou.",
        "vi": "Trên đường phố có rất nhiều loại xe ô tô làm những công việc khác nhau. Hãy cùng khám phá nhé!"
      },
      {
        "key": "ja_story_7_l2",
        "ja": "これは バスや 乗用車です。人を のせる ために、まどが おおきく つくられて います。",
        "romaji": "Kore wa basu ya jouyousha desu. Hito o noseru tame ni, mado ga ookiku tsukurarete imasu.",
        "vi": "Đây là xe buýt và xe chở khách. Để chở mọi người đi lại thoải mái, xe có cửa sổ thật lớn và rộng rãi."
      },
      {
        "key": "ja_story_7_l3",
        "ja": "つぎは トラックです。おおきな にものを はこぶ ために、うしろに ひろい にだいが あります。",
        "romaji": "Tsugi wa torakku desu. Ookina nimotsu o hakobu tame ni, ushiro ni hiroi nidai ga arimasu.",
        "vi": "Tiếp theo là xe tải. Để chở được nhiều hàng hóa cồng kềnh, phía sau xe có thùng hàng rất rộng."
      },
      {
        "key": "ja_story_7_l4",
        "ja": "トラックの タイヤは、おもい 荷物を ささえる ために、ふとくて たくさん ついて います。",
        "romaji": "Torakku no taiya wa, omoi nimotsu o sasaeru tame ni, futokute takusan tsuite imasu.",
        "vi": "Bánh xe tải cũng vừa to bản vừa nhiều bánh hơn để nâng đỡ sức nặng của hàng hóa."
      },
      {
        "key": "ja_story_7_l5",
        "ja": "こちらは クレーン車です。おもい ものを つりあげる ために、ながく のびる うでが あります。",
        "romaji": "Kochira wa kureensha desu. Omoi mono o tsuriageru tame ni, nagaku nobiru ude ga arimasu.",
        "vi": "Còn đây là xe cần cẩu! Để nhấc bổng những vật siêu nặng lên cao, xe có cánh tay cần cẩu vươn rất dài."
      },
      {
        "key": "ja_story_7_l6",
        "ja": "クレーン車は たおれないように、あしを しっかりと のばして じめんを おさえます。",
        "romaji": "Kureensha wa taorenai you ni, ashi o shikkari to nobashite jimen o osaemasu.",
        "vi": "Khi làm việc, xe cần cẩu duỗi bốn chân trụ vững chắc bám xuống mặt đất để không bị nghiêng đổ."
      },
      {
        "key": "ja_story_7_l7",
        "ja": "ほかに しょうぼう車や パトカーなど、みんなの くらしを まもる 車も かつやくして います。",
        "romaji": "Hoka ni shoubousha ya patokaa nado, minna no kurashi o mamoru kuruma mo katsuyaku shite imasu.",
        "vi": "Ngoài ra còn có xe cứu hỏa, xe cảnh sát đang ngày đêm bảo vệ cuộc sống bình yên cho mọi người."
      },
      {
        "key": "ja_story_7_l8",
        "ja": "どの 自動車も、それぞれの しごとに 合わせた 大切な つくりに なっているのですね。",
        "romaji": "Dono jidousha mo, sorezore no shigoto ni awaseta taisetsu na tsukuri ni natte iru no desu ne.",
        "vi": "Thì ra mỗi chiếc xe đều được thiết kế đặc biệt sao cho phù hợp nhất với công việc của mình đấy!"
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_7_v1",
        "ja": "じどうしゃ",
        "romaji": "jidousha",
        "vi": "xe ô tô"
      },
      {
        "audioKey": "ja_story_7_v2",
        "ja": "トラック",
        "romaji": "torakku",
        "vi": "xe tải"
      },
      {
        "audioKey": "ja_story_7_v3",
        "ja": "クレーンしゃ",
        "romaji": "kureensha",
        "vi": "xe cần cẩu"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_7_q1",
        "question": "Xe tải (トラック) có bộ phận đặc biệt nào để chở hàng hóa nặng?",
        "options": [
          {
            "key": "ja_st7_q1_o1",
            "emoji": "📦",
            "text": "Thùng hàng rộng và bánh xe to khỏe",
            "isGood": true
          },
          {
            "key": "ja_st7_q1_o2",
            "emoji": "🪽",
            "text": "Đôi cánh trắng để bay trên mây",
            "isGood": false
          },
          {
            "key": "ja_st7_q1_o3",
            "emoji": "🪜",
            "text": "Cầu trượt nước ở phía sau",
            "isGood": false
          },
          {
            "key": "ja_st7_q1_o4",
            "emoji": "⛵",
            "text": "Cánh buồm lớn để ra khơi",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_7_q2",
        "question": "Xe cần cẩu (クレーンしゃ) dùng bộ phận nào để nhấc vật nặng lên cao an toàn?",
        "options": [
          {
            "key": "ja_st7_q2_o1",
            "emoji": "🏗️",
            "text": "Cánh tay cần cẩu vươn dài và chân trụ vững",
            "isGood": true
          },
          {
            "key": "ja_st7_q2_o2",
            "emoji": "🎺",
            "text": "Chiếc còi báo thức phát nhạc",
            "isGood": false
          },
          {
            "key": "ja_st7_q2_o3",
            "emoji": "🎈",
            "text": "Chùm bóng bay khổng lồ",
            "isGood": false
          },
          {
            "key": "ja_st7_q2_o4",
            "emoji": "🥄",
            "text": "Chiếc thìa nhỏ xúc kem",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Trên đường phố có rất nhiều loại xe ô tô làm những công việc khác nhau. Hãy cùng khám phá nhé! Đây là xe buýt và xe chở khách. Để chở mọi người đi lại thoải mái, xe có cửa sổ thật lớn và rộng rãi. Tiếp theo là xe tải. Để chở được nhiều hàng hóa cồng kềnh, phía sau xe có thùng hàng rất rộng. Bánh xe tải cũng vừa to bản vừa nhiều bánh hơn để nâng đỡ sức nặng của hàng hóa. Còn đây là xe cần cẩu! Để nhấc bổng những vật siêu nặng lên cao, xe có cánh tay cần cẩu vươn rất dài. Khi làm việc, xe cần cẩu duỗi bốn chân trụ vững chắc bám xuống mặt đất để không bị nghiêng đổ. Ngoài ra còn có xe cứu hỏa, xe cảnh sát đang ngày đêm bảo vệ cuộc sống bình yên cho mọi người. Thì ra mỗi chiếc xe đều được thiết kế đặc biệt sao cho phù hợp nhất với công việc của mình đấy!"
  },
  {
    "id": "ja_story_8",
    "image": "images/stories/ja_story_8.jpg",
    "badge": "📘 Sách 小1 Quốc Ngữ",
    "title": "🦁 どうぶつの 赤ちゃん (Các Bé Động Vật Sơ Sinh)",
    "audioKey": "ja_story_8",
    "moral": "💡 Thế giới tự nhiên thật kỳ diệu: mỗi loài đều có cách bảo vệ và nuôi lớn con non riêng biệt.",
    "jaLines": [
      {
        "key": "ja_story_8_l1",
        "ja": "どうぶつの 赤ちゃんは、生まれた ばかりの ころ、どんな ようすを しているのでしょうか。",
        "romaji": "Doubutsu no akachan wa, umareta bakari no koro, donna yousu o shite iru no deshou ka.",
        "vi": "Các em bé động vật lúc mới chào đời có dáng vẻ như thế nào nhỉ?"
      },
      {
        "key": "ja_story_8_l2",
        "ja": "ライオンの 赤ちゃんは、とても 小さく 生まれます。まだ 目も 見えず、耳も よく きこえません。",
        "romaji": "Raion no akachan wa, totemo chiisaku umaremasu. Mada me mo miezu, mimi mo yoku kikoemasen.",
        "vi": "Em bé Sư Tử khi mới sinh rất bé xíu. Lúc này mắt bé chưa nhìn rõ và tai cũng chưa nghe rõ."
      },
      {
        "key": "ja_story_8_l3",
        "ja": "お乳を のんで すくすく そだち、いっかげつくらいで ようやく 歩けるように なります。",
        "romaji": "Ochichi o nonde sukusuku sodachi, ikkagetsu kurai de youyaku arukeru you ni narimasu.",
        "vi": "Nhờ bú sữa mẹ mà bé lớn nhanh, khoảng một tháng tuổi mới chập chững biết đi."
      },
      {
        "key": "ja_story_8_l4",
        "ja": "しまうまの 赤ちゃんは、生まれた ばかりでも、とても 大きく 立派な しまもようが あります。",
        "romaji": "Shimauma no akachan wa, umareta bakari de mo, totemo ookiku rippa na shimamoyou ga arimasu.",
        "vi": "Còn em bé Ngựa Vằn ngay từ khi mới sinh đã khá cao lớn và có bộ lông sọc vằn tuyệt đẹp."
      },
      {
        "key": "ja_story_8_l5",
        "ja": "てきに おそわれても すぐ にげられるように、生まれて いちじかんも たたずに 立ちあがって 歩きます。",
        "romaji": "Teki ni osowarete mo sugu nigerareru you ni, umarete ichijikan mo tatazu ni tachiagatte arukimasu.",
        "vi": "Để có thể chạy trốn kẻ thù kịp lúc, chưa đầy một giờ sau khi chào đời, bé Ngựa Vằn đã đứng dậy đi được ngay!"
      },
      {
        "key": "ja_story_8_l6",
        "ja": "カンガルーの 赤ちゃんは、なんと 親指ほどしか ない ほど 小さく 生まれます。",
        "romaji": "Kangaruu no akachan wa, nanto oyayubi hodo shika nai hodo chiisaku umaremasu.",
        "vi": "Điều bất ngờ nhất là em bé Chuột Túi Kangaroo khi mới sinh chỉ nhỏ xíu bằng ngón tay cái thôi!"
      },
      {
        "key": "ja_story_8_l7",
        "ja": "赤ちゃんは じぶんで おかあさんの ふくろの 中へ はいり、その中で お乳を のんで 育ちます。",
        "romaji": "Akachan wa jibun de okaasan no fukuro no naka e hairi, sono naka de ochichi o nonde sodachimasu.",
        "vi": "Bé tự trèo vào trong chiếc túi ấm ở bụng mẹ, nằm gọn bên trong uống sữa và lớn khôn."
      },
      {
        "key": "ja_story_8_l8",
        "ja": "おなじ 赤ちゃんでも、生きる ばしょに 合わせて 生まれたときの すがたが ちがうのですね。",
        "romaji": "Onaji akachan de mo, ikiru basho ni awasete umareta toki no sugata ga chigau no desu ne.",
        "vi": "Tuy cùng là các em bé mới sinh, mỗi loài lại có cách lớn lên kỳ diệu phù hợp với môi trường sống của mình!"
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_8_v1",
        "ja": "あかちゃん",
        "romaji": "akachan",
        "vi": "em bé sơ sinh"
      },
      {
        "audioKey": "ja_story_8_v2",
        "ja": "しまうま",
        "romaji": "shimauma",
        "vi": "con ngựa vằn"
      },
      {
        "audioKey": "ja_story_8_v3",
        "ja": "ふくろ",
        "romaji": "fukuro",
        "vi": "chiếc túi bụng"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_8_q1",
        "question": "Loài nào mới sinh ra đã đứng dậy đi được trong chưa đầy một giờ để tránh kẻ thù?",
        "options": [
          {
            "key": "ja_st8_q1_o1",
            "emoji": "🦓",
            "text": "Em bé Ngựa Vằn (しまうま)",
            "isGood": true
          },
          {
            "key": "ja_st8_q1_o2",
            "emoji": "🦁",
            "text": "Em bé Sư Tử mới sinh",
            "isGood": false
          },
          {
            "key": "ja_st8_q1_o3",
            "emoji": "🦘",
            "text": "Em bé Kangaroo nhỏ xíu",
            "isGood": false
          },
          {
            "key": "ja_st8_q1_o4",
            "emoji": "🐧",
            "text": "Chim cánh cụt bé nhỏ",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_8_q2",
        "question": "Em bé Kangaroo mới sinh nhỏ chừng nào và lớn lên ở đâu?",
        "options": [
          {
            "key": "ja_st8_q2_o1",
            "emoji": "🦘",
            "text": "Nhỏ bằng ngón tay cái và lớn trong túi bụng mẹ",
            "isGood": true
          },
          {
            "key": "ja_st8_q2_o2",
            "emoji": "🍉",
            "text": "To bằng quả dưa hấu và ngủ trên cây cao",
            "isGood": false
          },
          {
            "key": "ja_st8_q2_o3",
            "emoji": "🏊",
            "text": "Bơi ngay xuống biển cùng đàn cá voi",
            "isGood": false
          },
          {
            "key": "ja_st8_q2_o4",
            "emoji": "☁️",
            "text": "Bay ngay lên tận tầng mây xanh",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Các em bé động vật lúc mới chào đời có dáng vẻ như thế nào nhỉ? Em bé Sư Tử khi mới sinh rất bé xíu. Lúc này bé còn chưa mở hẳn mắt và tai cũng chưa nghe rõ. Nhờ bú sữa mẹ mà bé lớn nhanh, khoảng một tháng tuổi mới chập chững biết đi. Còn em bé Ngựa Vằn ngay từ khi mới sinh đã khá cao lớn và có bộ lông sọc vằn tuyệt đẹp. Để có thể chạy trốn kẻ thù kịp lúc, chưa đầy một giờ sau khi chào đời, bé Ngựa Vằn đã đứng dậy đi được ngay! Điều bất ngờ nhất là em bé Chuột Túi Kangaroo khi mới sinh chỉ nhỏ xíu bằng ngón tay cái thôi! Bé tự trèo vào trong chiếc túi ấm ở bụng mẹ, nằm gọn bên trong uống sữa và lớn khôn. Tuy cùng là các em bé mới sinh, mỗi loài lại có cách lớn lên kỳ diệu phù hợp với môi trường sống của mình!"
  },
  {
    "id": "ja_story_9",
    "image": "images/stories/ja_story_9.jpg",
    "badge": "🏯 Cổ Tích Nhật Bản",
    "title": "🍙 おむすび ころりん (Cơm Nắm Lăn Tròn)",
    "audioKey": "ja_story_9",
    "moral": "💡 Sống hiền lành, biết sẻ chia sẽ luôn gặp niềm vui; còn lòng tham lam sẽ khiến mình mất hết.",
    "jaLines": [
      {
        "key": "ja_story_9_l1",
        "ja": "むかし、心の やさしい おじいさんが 山へ しばかりに 出かけました。",
        "romaji": "Mukashi, kokoro no yasashii ojiisan ga yama e shibakari ni dekakemashita.",
        "vi": "Ngày xưa, có một ông lão tốt bụng lên núi đốn củi."
      },
      {
        "key": "ja_story_9_l2",
        "ja": "おひるに なって おむすびを 食べようとしたら、ひとつ コロコロと あなの 中へ おちて しまいました。",
        "romaji": "Ohiru ni natte omusubi o tabeyou to shitara, hitotsu korokoro to ana no naka e ochite shimaimashita.",
        "vi": "Đến bữa trưa, khi ông vừa mở gói cơm nắm ra ăn thì một nắm cơm bỗng lăn tròn rơi tọt xuống cái hang."
      },
      {
        "key": "ja_story_9_l3",
        "ja": "すると あなの 底から 「おむすび ころりん すっとんとん！」と かわいい 歌声が きこえました。",
        "romaji": "Suru to ana no soko kara \"omusubi kororin suttonton!\" to kawaii utagoe ga kikoemashita.",
        "vi": "Ngay lập tức, từ sâu dưới hang vang lên tiếng hát đáng yêu: \"Cơm nắm lăn tròn, lăn tọt xuống đây!\""
      },
      {
        "key": "ja_story_9_l4",
        "ja": "おじいさんが ふしぎに おもって のぞきこむと、うっかり じぶんも あなに おちて しまいました。",
        "romaji": "Ojiisan ga fushigi ni omotte nozokikomu to, ukkari jibun mo ana ni ochite shimaimashita.",
        "vi": "Ông lão lấy làm lạ cúi xuống ngó xem, thế rồi trượt chân rơi luôn vào trong hang."
      },
      {
        "key": "ja_story_9_l5",
        "ja": "あなの 中では ねずみたちが おむすびの お礼に おもちを ついて、ごちそうして くれました。",
        "romaji": "Ana no naka de wa nezumitachi ga omusubi no orei ni omochi o tsuite, gochisou shite kuremashita.",
        "vi": "Ở dưới hang, đàn chuột nhắt mở tiệc giã bánh mochi thơm lừng để cảm ơn ông lão về nắm cơm ngon."
      },
      {
        "key": "ja_story_9_l6",
        "ja": "帰りぎわ、ねずみたちは おじいさんに こばんの つまった おみやげの つづらを わたしました。",
        "romaji": "Kaerigiwa, nezumitachi wa ojiisan ni koban no tsumatta omiyage no tsuzura o watashimashita.",
        "vi": "Lúc tiễn ông về, đàn chuột tặng ông một chiếc rương chứa đầy vàng lấp lánh."
      },
      {
        "key": "ja_story_9_l7",
        "ja": "それを 聞いた よくばりな となりのおじいさんは、わざと おむすびを おとして 穴へ とびこみました。",
        "romaji": "Sore o kiita yokubari na tonari no ojiisan wa, wazato omusubi o otoshite ana e tobikomimashita.",
        "vi": "Nghe chuyện, ông hàng xóm tham lam cũng cố tình thả cơm nắm xuống hang rồi nhảy ùm theo."
      },
      {
        "key": "ja_story_9_l8",
        "ja": "よくばりおじいさんが ねこの なきまねを したため、ねずみたちは あかりを けし、まっくらに なって しまいました。",
        "romaji": "Yokubari ojiisan ga neko no nakimane o shita tame, nezumitachi wa akari o keshi, makkura ni natte shimaimashita.",
        "vi": "Ông ta tham lam bắt chước tiếng mèo kêu dọa nạt để cướp hết vàng, làm đàn chuột tắt phụt đèn bỏ đi hết!"
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_9_v1",
        "ja": "おむすび",
        "romaji": "omusubi",
        "vi": "cơm nắm tam giác"
      },
      {
        "audioKey": "ja_story_9_v2",
        "ja": "あな",
        "romaji": "ana",
        "vi": "cái hang nhỏ"
      },
      {
        "audioKey": "ja_story_9_v3",
        "ja": "よくばり",
        "romaji": "yokubari",
        "vi": "tính tham lam"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_9_q1",
        "question": "Đàn chuột nhắt dưới hang đã hát câu gì khi nhận được nắm cơm của ông lão tốt bụng?",
        "options": [
          {
            "key": "ja_st9_q1_o1",
            "emoji": "🎶",
            "text": "Cơm nắm lăn tròn, lăn tọt xuống đây!",
            "isGood": true
          },
          {
            "key": "ja_st9_q1_o2",
            "emoji": "🚀",
            "text": "Tên lửa chuẩn bị bay lên mặt trăng!",
            "isGood": false
          },
          {
            "key": "ja_st9_q1_o3",
            "emoji": "🌧️",
            "text": "Trời ngoài kia sắp đổ cơn mưa rào!",
            "isGood": false
          },
          {
            "key": "ja_st9_q1_o4",
            "emoji": "🚂",
            "text": "Tàu hỏa chuẩn bị rời khỏi nhà ga!",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_9_q2",
        "question": "Vì sao ông hàng xóm tham lam cuối cùng không nhận được phần quà nào?",
        "options": [
          {
            "key": "ja_st9_q2_o1",
            "emoji": "😿",
            "text": "Vì tham lam giả tiếng mèo kêu dọa đàn chuột",
            "isGood": true
          },
          {
            "key": "ja_st9_q2_o2",
            "emoji": "😴",
            "text": "Vì ông ấy đi lạc đường trong rừng sâu",
            "isGood": false
          },
          {
            "key": "ja_st9_q2_o3",
            "emoji": "🍙",
            "text": "Vì ông ấy quên mang theo cơm nắm",
            "isGood": false
          },
          {
            "key": "ja_st9_q2_o4",
            "emoji": "🌞",
            "text": "Vì trời đã tối muộn mất rồi",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Ngày xưa, có một ông lão tốt bụng lên núi đốn củi. Đến bữa trưa, khi ông vừa mở gói cơm nắm ra ăn thì một nắm cơm bỗng lăn tròn rơi tọt xuống cái hang. Ngay lập tức, từ sâu dưới hang vang lên tiếng hát đáng yêu: \"Cơm nắm lăn tròn, lăn tọt xuống đây!\" Ông lão lấy làm lạ cúi xuống ngó xem, thế rồi trượt chân rơi luôn vào trong hang. Ở dưới hang, đàn chuột nhắt mở tiệc giã bánh mochi thơm lừng để cảm ơn ông lão về nắm cơm ngon. Lúc tiễn ông về, đàn chuột tặng ông một chiếc rương chứa đầy vàng lấp lánh. Nghe chuyện, ông hàng xóm tham lam cũng cố tình thả cơm nắm xuống hang rồi nhảy ùm theo. Ông ta tham lam bắt chước tiếng mèo kêu dọa nạt để cướp hết vàng, làm đàn chuột tắt phụt đèn bỏ đi hết!"
  },
  {
    "id": "ja_story_10",
    "image": "images/stories/ja_story_10.svg",
    "badge": "🏯 Cổ Tích Nhật Bản",
    "title": "🦀 さると かに (Chú Khỉ Và Chú Cua)",
    "audioKey": "ja_story_10",
    "moral": "💡 Không nên ích kỷ bắt nạt bạn bè; biết nhận lỗi và sống hòa thuận mọi người sẽ thương yêu!",
    "jaLines": [
      {
        "key": "ja_story_10_l1",
        "ja": "ある日、かにが ひろった おむすびを、ずるい さるが 「かきの たね」と とりかえました。",
        "romaji": "Aru hi, kani ga hirotta omusubi o, zurui saru ga \"kaki no tane\" to torikaemashita.",
        "vi": "Một hôm, chú Cua nhặt được nắm cơm ngon, nhưng Khỉ láu cá lại dụ đổi nắm cơm lấy mỗi một hạt hồng khô."
      },
      {
        "key": "ja_story_10_l2",
        "ja": "かには たねを うえて、「はやく めを だせ かきの たね」と まいにち 大切に 世話を しました。",
        "romaji": "Kani wa tane o uete, \"hayaku me o dase kaki no tane\" to mainichi taisetsu ni sewa o shimashita.",
        "vi": "Cua mang hạt đi trồng, ngày ngày tưới nước chăm sóc: \"Hạt hồng ơi hãy mau nảy mầm nhé!\""
      },
      {
        "key": "ja_story_10_l3",
        "ja": "やがて りっぱな かきの 木に あまい 実が たくさん なりましたが、かには 木に のぼれません。",
        "romaji": "Yagate rippa na kaki no ki ni amai mi ga takusan narimashita ga, kani wa ki ni noboremasen.",
        "vi": "Chẳng bao lâu cây hồng lớn cao vút, sai trĩu quả chín ngọt, nhưng chú Cua nhỏ không biết trèo cây."
      },
      {
        "key": "ja_story_10_l4",
        "ja": "さるが 木に のぼって、自分だけ あまい 実を 食べ、かたくて 青い 実を かにに ぶつけました。",
        "romaji": "Saru ga ki ni nobotte, jibun dake amai mi o tabe, katakute aoi mi o kani ni butsukemashita.",
        "vi": "Khỉ trèo lên cây chỉ ăn hết quả ngọt một mình rồi ném thẳng quả xanh cứng vào người chú Cua!"
      },
      {
        "key": "ja_story_10_l5",
        "ja": "けがをした かにの ために、うす、くり、はちが 仲間に なって たちあがりました。",
        "romaji": "Kega o shita kani no tame ni, usu, kuri, hachi ga nakama ni natte tachiagarimashita.",
        "vi": "Thương Cua bị đau, các người bạn tốt gồm Cối Đá, Hạt Dẻ và Ong Vàng cùng hợp sức đòi công bằng."
      },
      {
        "key": "ja_story_10_l6",
        "ja": "みんなは さるの 家へ 入り、それぞれの ばしょに かくれて さるが 帰るのを まちました。",
        "romaji": "Minna wa saru no ie e hairi, sorezore no basho ni kakurete saru ga kaeru no o machimashita.",
        "vi": "Cả nhóm vào nhà Khỉ, mỗi bạn nấp sẵn ở một góc phòng chờ Khỉ trở về."
      },
      {
        "key": "ja_story_10_l7",
        "ja": "帰ってきた さるは、くりに おどろき、はちに 追われ、やねから おりた うすに おさえられました。",
        "romaji": "Kaette kita saru wa, kuri ni odoroki, hachi ni oware, yane kara orita usu ni osaeraremashita.",
        "vi": "Khỉ vừa về liền bị Hạt Dẻ nổ tách làm giật mình, Ong Vàng bay ra đuổi, rồi Cối Đá nặng giữ chặt lại."
      },
      {
        "key": "ja_story_10_l8",
        "ja": "さるは 心から ごめんなさいと あやまり、みんなは 仲良く かきの 実を 分け合って 食べました。",
        "romaji": "Saru wa kokoro kara gomennasai to ayamari, minna wa nakayoku kaki no mi o wakeatte tabemashita.",
        "vi": "Chú Khỉ hối hận cúi đầu xin lỗi thật lòng, thế là mọi người tha thứ và cùng chia sẻ những quả hồng chín ngọt."
      }
    ],
    "vocab": [
      {
        "audioKey": "ja_story_10_v1",
        "ja": "かに",
        "romaji": "kani",
        "vi": "chú cua"
      },
      {
        "audioKey": "ja_story_10_v2",
        "ja": "かき",
        "romaji": "kaki",
        "vi": "quả hồng giòn"
      },
      {
        "audioKey": "ja_story_10_v3",
        "ja": "なかよく",
        "romaji": "nakayoku",
        "vi": "hòa thuận với nhau"
      }
    ],
    "questions": [
      {
        "qKey": "ja_story_10_q1",
        "question": "Chú Khỉ đã đổi thứ gì lấy nắm cơm của chú Cua rồi ném quả xanh làm đau bạn?",
        "options": [
          {
            "key": "ja_st10_q1_o1",
            "emoji": "🍊",
            "text": "Hạt hồng khô (かきの たね)",
            "isGood": true
          },
          {
            "key": "ja_st10_q1_o2",
            "emoji": "🌻",
            "text": "Hạt hoa hướng dương",
            "isGood": false
          },
          {
            "key": "ja_st10_q1_o3",
            "emoji": "🍉",
            "text": "Quả dưa hấu tròn to",
            "isGood": false
          },
          {
            "key": "ja_st10_q1_o4",
            "emoji": "🎈",
            "text": "Quả bóng bay màu đỏ",
            "isGood": false
          }
        ]
      },
      {
        "qKey": "ja_story_10_q2",
        "question": "Những người bạn nào đã hợp sức giúp chú Cua dạy cho Khỉ một bài học?",
        "options": [
          {
            "key": "ja_st10_q2_o1",
            "emoji": "🐝",
            "text": "Hạt Dẻ, Ong Vàng và Cối Đá",
            "isGood": true
          },
          {
            "key": "ja_st10_q2_o2",
            "emoji": "🦈",
            "text": "Cá mập và Bạch tuộc đại dương",
            "isGood": false
          },
          {
            "key": "ja_st10_q2_o3",
            "emoji": "🦖",
            "text": "Khủng long và Rồng phun lửa",
            "isGood": false
          },
          {
            "key": "ja_st10_q2_o4",
            "emoji": "🚂",
            "text": "Đoàn tàu hỏa và Xe buýt",
            "isGood": false
          }
        ]
      }
    ],
    "viMeaning": "Một hôm, chú Cua nhặt được nắm cơm ngon, nhưng Khỉ láu cá lại dụ đổi nắm cơm lấy mỗi một hạt hồng khô. Cua mang hạt đi trồng, ngày ngày tưới nước chăm sóc: \"Hạt hồng ơi hãy mau nảy mầm nhé!\" Chẳng bao lâu cây hồng lớn cao vút, sai trĩu quả chín ngọt, nhưng chú Cua nhỏ không biết trèo cây. Khỉ trèo lên cây chỉ ăn hết quả ngọt một mình rồi ném thẳng quả xanh cứng vào người chú Cua! Thương Cua bị đau, các người bạn tốt gồm Cối Đá, Hạt Dẻ và Ong Vàng cùng hợp sức đòi công bằng. Cả nhóm vào nhà Khỉ, mỗi bạn nấp sẵn ở một góc phòng chờ Khỉ trở về. Khỉ vừa về liền bị Hạt Dẻ nổ tách làm giật mình, Ong Vàng bay ra đuổi, rồi Cối Đá nặng giữ chặt lại. Chú Khỉ hối hận cúi đầu xin lỗi thật lòng, thế là mọi người tha thứ và cùng chia sẻ những quả hồng chín ngọt."
  }
];

const JA_VOCAB_TOPICS = [
  {
    id: 'ja_greetings',
    title: '👋 Chào Hỏi & Lễ Phép',
    words: [
      { id: 'ja_v1', ja: 'おはよう', romaji: 'Ohayou', vi: 'Chào buổi sáng', emoji: '☀️', audioKey: 'ja_w_ohayou' },
      { id: 'ja_v2', ja: 'こんにちは', romaji: 'Konnichiwa', vi: 'Xin chào (buổi trưa)', emoji: '👋', audioKey: 'ja_w_konnichiwa' },
      { id: 'ja_v3', ja: 'ありがとう', romaji: 'Arigatou', vi: 'Cảm ơn', emoji: '🙏', audioKey: 'ja_w_arigatou' },
      { id: 'ja_v4', ja: 'ごめんなさい', romaji: 'Gomennasai', vi: 'Xin lỗi', emoji: '🙇', audioKey: 'ja_w_gomennasai' },
      { id: 'ja_v5', ja: 'いただきます', romaji: 'Itadakimasu', vi: 'Con xin phép ăn cơm ạ', emoji: '🥢', audioKey: 'ja_w_itadakimasu' },
      { id: 'ja_v6', ja: 'ごちそうさま', romaji: 'Gochisousama', vi: 'Cảm ơn vì bữa ăn ngon', emoji: '🍱', audioKey: 'ja_w_gochisousama' },
      { id: 'ja_v7', ja: 'いってきます', romaji: 'Ittekimasu', vi: 'Con đi học đây ạ', emoji: '🎒', audioKey: 'ja_w_ittekimasu' },
      { id: 'ja_v8', ja: 'ただいま', romaji: 'Tadaima', vi: 'Con đã về rồi ạ', emoji: '🏠', audioKey: 'ja_w_tadaima' }
    ]
  },
  {
    id: 'dino_veh',
    title: '🦖 Khủng Long & Xe',
    words: [
      { id: 'ja_v9', ja: 'きょうりゅう', romaji: 'Kyouryuu', vi: 'Khủng long', emoji: '🦖', audioKey: 'ja_w_kyouryuu' },
      { id: 'ja_v10', ja: 'ティラノサウルス', romaji: 'Tiranosaurusu', vi: 'Khủng long Bạo chúa', emoji: '🦴', audioKey: 'ja_w_trex' },
      { id: 'ja_v11', ja: 'しんかんせん', romaji: 'Shinkansen', vi: 'Tàu siêu tốc Shinkansen', emoji: '🚅', audioKey: 'ja_w_shinkansen' },
      { id: 'ja_v12', ja: 'パトカー', romaji: 'Patokaa', vi: 'Xe cảnh sát', emoji: '🚓', audioKey: 'ja_w_patokaa' },
      { id: 'ja_v13', ja: 'しょうぼうしゃ', romaji: 'Shoubousha', vi: 'Xe cứu hỏa', emoji: '🚒', audioKey: 'ja_w_shoubousha' },
      { id: 'ja_v14', ja: 'きゅうきゅうしゃ', romaji: 'Kyuukyuusha', vi: 'Xe cứu thương', emoji: '🚑', audioKey: 'ja_w_kyuukyuusha' },
      { id: 'ja_v15', ja: 'ひこうき', romaji: 'Hikouki', vi: 'Máy bay', emoji: '✈️', audioKey: 'ja_w_hikouki' },
      { id: 'ja_v16', ja: 'じてんしゃ', romaji: 'Jitensha', vi: 'Xe đạp', emoji: '🚲', audioKey: 'ja_w_jitensha' }
    ]
  },
  {
    id: 'food_color',
    title: '🍓 Quả & Màu Sắc',
    words: [
      { id: 'ja_v17', ja: 'りんご', romaji: 'Ringo', vi: 'Quả táo', emoji: '🍎', audioKey: 'ja_w_ringo' },
      { id: 'ja_v18', ja: 'すいか', romaji: 'Suika', vi: 'Dưa hấu', emoji: '🍉', audioKey: 'ja_w_suika' },
      { id: 'ja_v19', ja: 'いちご', romaji: 'Ichigo', vi: 'Quả dâu tây', emoji: '🍓', audioKey: 'ja_w_ichigo' },
      { id: 'ja_v20', ja: 'ぎゅうにゅう', romaji: 'Gyuunyuu', vi: 'Sữa tươi', emoji: '🥛', audioKey: 'ja_w_gyuunyuu' },
      { id: 'ja_v21', ja: 'あか', romaji: 'Aka', vi: 'Màu đỏ', emoji: '🔴', audioKey: 'ja_w_aka' },
      { id: 'ja_v22', ja: 'あお', romaji: 'Ao', vi: 'Màu xanh dương', emoji: '🔵', audioKey: 'ja_w_ao' },
      { id: 'ja_v23', ja: 'きいろ', romaji: 'Kiiro', vi: 'Màu vàng', emoji: '🟡', audioKey: 'ja_w_kiiro' },
      { id: 'ja_v24', ja: 'みどり', romaji: 'Midori', vi: 'Màu xanh lá', emoji: '🟢', audioKey: 'ja_w_midori' }
    ]
  },
  {
    id: 'numbers',
    title: '🔢 Số Đếm 1 – 10',
    words: [
      { id: 'ja_n1', ja: 'いち', romaji: 'Ichi', vi: 'Số 1 (Một)', emoji: '1️⃣', audioKey: 'ja_n_1' },
      { id: 'ja_n2', ja: 'に', romaji: 'Ni', vi: 'Số 2 (Hai)', emoji: '2️⃣', audioKey: 'ja_n_2' },
      { id: 'ja_n3', ja: 'さん', romaji: 'San', vi: 'Số 3 (Ba)', emoji: '3️⃣', audioKey: 'ja_n_3' },
      { id: 'ja_n4', ja: 'よん', romaji: 'Yon', vi: 'Số 4 (Bốn)', emoji: '4️⃣', audioKey: 'ja_n_4' },
      { id: 'ja_n5', ja: 'ご', romaji: 'Go', vi: 'Số 5 (Năm)', emoji: '5️⃣', audioKey: 'ja_n_5' },
      { id: 'ja_n6', ja: 'ろく', romaji: 'Roku', vi: 'Số 6 (Sáu)', emoji: '6️⃣', audioKey: 'ja_n_6' },
      { id: 'ja_n7', ja: 'なな', romaji: 'Nana', vi: 'Số 7 (Bảy)', emoji: '7️⃣', audioKey: 'ja_n_7' },
      { id: 'ja_n8', ja: 'はち', romaji: 'Hachi', vi: 'Số 8 (Tám)', emoji: '8️⃣', audioKey: 'ja_n_8' },
      { id: 'ja_n9', ja: 'きゅう', romaji: 'Kyuu', vi: 'Số 9 (Chín)', emoji: '9️⃣', audioKey: 'ja_n_9' },
      { id: 'ja_n10', ja: 'じゅう', romaji: 'Juu', vi: 'Số 10 (Mười)', emoji: '🔟', audioKey: 'ja_n_10' }
    ]
  },
  {
    id: 'family',
    title: '👨‍👩‍👦 Gia Đình Yêu Thương',
    words: [
      { id: 'ja_v25', ja: 'おとうさん', romaji: 'Otousan', vi: 'Ba (Bố)', emoji: '👨', audioKey: 'ja_w_otousan' },
      { id: 'ja_v26', ja: 'おかあさん', romaji: 'Okaasan', vi: 'Mẹ', emoji: '👩', audioKey: 'ja_w_okaasan' },
      { id: 'ja_v27', ja: 'おじいさん', romaji: 'Ojiisan', vi: 'Ông nội / ngoại', emoji: '👴', audioKey: 'ja_w_ojiisan' },
      { id: 'ja_v28', ja: 'おばあさん', romaji: 'Obaasan', vi: 'Bà nội / ngoại', emoji: '👵', audioKey: 'ja_w_obaasan' },
      { id: 'ja_v29', ja: 'ともだち', romaji: 'Tomodachi', vi: 'Bạn bè', emoji: '🧑‍🤝‍🧑', audioKey: 'ja_w_tomodachi' },
      { id: 'ja_v30', ja: 'せんせい', romaji: 'Sensei', vi: 'Thầy / Cô giáo', emoji: '👩‍🏫', audioKey: 'ja_w_sensei' },
      { id: 'ja_v31', ja: 'かぞく', romaji: 'Kazoku', vi: 'Gia đình', emoji: '👨‍👩‍👦', audioKey: 'ja_w_kazoku' },
      { id: 'ja_v32', ja: 'おにいちゃん', romaji: 'Oniichan', vi: 'Anh trai', emoji: '👦', audioKey: 'ja_w_oniichan' }
    ]
  },
  {
    id: 'school_days',
    title: '🎒 Trường Lớp & 7 Thứ',
    words: [
      { id: 'ja_v33', ja: 'がっこう', romaji: 'Gakkou', vi: 'Trường học', emoji: '🏫', audioKey: 'ja_w_gakkou' },
      { id: 'ja_v34', ja: 'ランドセル', romaji: 'Randoseru', vi: 'Cặp sách lớp 1 Nhật', emoji: '🎒', audioKey: 'ja_w_randoseru' },
      { id: 'ja_v35', ja: 'えんぴつ', romaji: 'Enpitsu', vi: 'Bút chì', emoji: '✏️', audioKey: 'ja_w_enpitsu' },
      { id: 'ja_v36', ja: 'きょうかしょ', romaji: 'Kyoukasho', vi: 'Sách giáo khoa', emoji: '📚', audioKey: 'ja_w_kyoukasho' },
      { id: 'ja_v37', ja: 'げつようび', romaji: 'Getsuyoubi', vi: 'Thứ Hai', emoji: '📅', audioKey: 'ja_w_getsuyoubi' },
      { id: 'ja_v38', ja: 'どようび', romaji: 'Doyoubi', vi: 'Thứ Bảy', emoji: '🌤️', audioKey: 'ja_w_doyoubi' },
      { id: 'ja_v39', ja: 'にちようび', romaji: 'Nichiyoubi', vi: 'Chủ Nhật', emoji: '☀️', audioKey: 'ja_w_nichiyoubi' },
      { id: 'ja_v40', ja: 'きゅうしょく', romaji: 'Kyuushoku', vi: 'Bữa trưa ở trường', emoji: '🍛', audioKey: 'ja_w_kyuushoku' }
    ]
  },
  {
    id: 'animals_nature',
    title: '🐾 Động Vật & Thiên Nhiên',
    words: [
      { id: 'ja_v41', ja: 'いぬ', romaji: 'Inu', vi: 'Con chó', emoji: '🐶', audioKey: 'ja_w_inu' },
      { id: 'ja_v42', ja: 'ねこ', romaji: 'Neko', vi: 'Con mèo', emoji: '🐱', audioKey: 'ja_w_neko' },
      { id: 'ja_v43', ja: 'あさがお', romaji: 'Asagao', vi: 'Hoa Bìm Bìm Nhật', emoji: '🌺', audioKey: 'ja_w_asagao' },
      { id: 'ja_v44', ja: 'さくら', romaji: 'Sakura', vi: 'Hoa Anh Đào', emoji: '🌸', audioKey: 'ja_w_sakura' },
      { id: 'ja_v45', ja: 'やま', romaji: 'Yama', vi: 'Ngọn núi', emoji: '⛰️', audioKey: 'ja_w_yama' },
      { id: 'ja_v46', ja: 'うみ', romaji: 'Umi', vi: 'Biển xanh', emoji: '🌊', audioKey: 'ja_w_umi' },
      { id: 'ja_v47', ja: 'おひさま', romaji: 'Ohisama', vi: 'Ông Mặt Trời', emoji: '🌞', audioKey: 'ja_w_ohisama' },
      { id: 'ja_v48', ja: 'おつきさま', romaji: 'Otsukisama', vi: 'Chị Hằng / Mặt Trăng', emoji: '🌙', audioKey: 'ja_w_otsukisama' }
    ]
  },
  {
    id: 'seasons_actions',
    title: '🌸 4 Mùa & Hoạt Động',
    words: [
      { id: 'ja_v49', ja: 'はる', romaji: 'Haru', vi: 'Mùa Xuân', emoji: '🌸', audioKey: 'ja_w_haru' },
      { id: 'ja_v50', ja: 'なつ', romaji: 'Natsu', vi: 'Mùa Hạ (Hè)', emoji: '🌻', audioKey: 'ja_w_natsu' },
      { id: 'ja_v51', ja: 'あき', romaji: 'Aki', vi: 'Mùa Thu', emoji: '🍁', audioKey: 'ja_w_aki' },
      { id: 'ja_v52', ja: 'ふゆ', romaji: 'Fuyu', vi: 'Mùa Đông', emoji: '⛄', audioKey: 'ja_w_fuyu' },
      { id: 'ja_v53', ja: 'げんき', romaji: 'Genki', vi: 'Khỏe mạnh vui tươi', emoji: '💪', audioKey: 'ja_w_genki' },
      { id: 'ja_v54', ja: 'おやすみ', romaji: 'Oyasumi', vi: 'Chúc ngủ ngon', emoji: '🛌', audioKey: 'ja_w_oyasumi' },
      { id: 'ja_v55', ja: 'がんばって', romaji: 'Ganbatte', vi: 'Cố gắng lên nhé!', emoji: '🚩', audioKey: 'ja_w_ganbatte' },
      { id: 'ja_v56', ja: 'すごい', romaji: 'Sugoi', vi: 'Tuyệt vời quá!', emoji: '🏆', audioKey: 'ja_w_sugoi' }
    ]
  }
];

// State Tiếng Nhật
let currentJaTab = 'hiragana'; // 'hiragana' | 'katakana' | 'kanji' | 'vocab' | 'stories' | 'writing' | 'quiz'
let currentJaTopicIdx = 0;
let currentJaKanjiUnit = 1;
let currentJaStoryId = 'ja_story_1';
let jaWriteSet = 'hira'; // 'hira' | 'kata' | 'kanji'
let jaQuizFilterMode = 'all'; // 'all' | 'hira' | 'kata' | 'kanji' | 'vocab'
let jaSessionScore = 0;
let jaAutoTimer = null;
let jaAutoRunning = false;
let jaEpoch = 0;

// Writing State
let jaWriteChar = 'あ';
let jaCanvas, jaCtx;
let jaDrawing = false;
let jaBrushColor = '#e11d48';
let jaWriteInited = false;

// Quiz State
let jaQuizQuestions = [];
let jaQuizIndex = 0;
let jaQuizScore = 0;
let jaQuizStreak = 0;

function addJaScore(pts) {
  jaSessionScore += pts;
  const el = document.getElementById('jaSessionStars');
  if (el) el.innerText = `⭐ Điểm Tiếng Nhật: ${jaSessionScore}`;
}

function stopJaAutoPlay() {
  jaAutoRunning = false;
  if (jaAutoTimer) {
    clearTimeout(jaAutoTimer);
    jaAutoTimer = null;
  }
  document.querySelectorAll('#japaneseContainer .is-speaking-active').forEach(e => e.classList.remove('is-speaking-active'));
  ['btnAutoPlayJaHira', 'btnAutoPlayJaKata', 'btnAutoPlayJaKanji', 'btnAutoPlayJaVocab'].forEach(id => {
    const b = document.getElementById(id);
    if (b) b.classList.remove('playing');
  });
  const b1 = document.getElementById('btnAutoPlayJaHira');
  if (b1) b1.innerHTML = '<span>🎧</span> Nghe あ → ん';
  const bk = document.getElementById('btnAutoPlayJaKata');
  if (bk) bk.innerHTML = '<span>🎧</span> Nghe ア → ン';
  const bj = document.getElementById('btnAutoPlayJaKanji');
  if (bj) bj.innerHTML = '<span>🎧</span> Nghe 20 chữ bài này';
  const b2 = document.getElementById('btnAutoPlayJaVocab');
  if (b2) b2.innerHTML = '<span>🎧</span> Nghe cả chủ đề';
}

function renderJapaneseHub() {
  const el = document.getElementById('jaSessionStars');
  if (el) el.innerText = `⭐ Điểm Tiếng Nhật: ${jaSessionScore}`;
  switchJapaneseSubTab(currentJaTab);
}

function switchJapaneseSubTab(subtab) {
  stopJaAutoPlay();
  window.soundMgr.stopAll();
  jaEpoch++;
  currentJaTab = subtab;

  const tabs = {
    hiragana: ['jaPaneHira', 'jaTabHira'],
    katakana: ['jaPaneKata', 'jaTabKata'],
    kanji: ['jaPaneKanji', 'jaTabKanji'],
    vocab: ['jaPaneVocab', 'jaTabVocab'],
    stories: ['jaPaneStories', 'jaTabStories'],
    writing: ['jaPaneWriting', 'jaTabWriting'],
    quiz: ['jaPaneQuiz', 'jaTabQuiz']
  };

  Object.entries(tabs).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });

  if (subtab === 'hiragana') renderJaHiraganaTab();
  else if (subtab === 'katakana') renderJaKatakanaTab();
  else if (subtab === 'kanji') renderJaKanjiTab();
  else if (subtab === 'vocab') renderJaVocabTab();
  else if (subtab === 'stories') renderJaStoriesTab();
  else if (subtab === 'writing') renderJaWritingTab();
  else if (subtab === 'quiz') initJaQuizGame();
}

// ========================================================
// TAB 1: 46 CHỮ HIRAGANA (あ -> ん)
// ========================================================
function renderJaHiraganaTab() {
  const grid = document.getElementById('jaHiraGrid');
  if (!grid) return;
  grid.innerHTML = '';

  JA_HIRAGANA_DATA.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(`ja_h_${item.hira}`);
    const card = document.createElement('div');
    card.className = `alpha-card ja-hira-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="alpha-letter" style="color: #be123c; font-size: 36px;">${item.hira}</div>
      <div class="alpha-phonetic-pill" style="background:#ffe4e6; color:#9f1239;">${item.romaji}</div>
      <div style="font-size: 20px; margin: 2px 0;">${item.emoji}</div>
      <div class="alpha-ja" style="font-weight:700; color:#334155;">${item.word}</div>
    `;
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`ja_hira_${item.hira}`, null, item.hira);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(`ja_h_${item.hira}`);
        if (isNew) {
          addJaScore(2);
          card.classList.add('is-learned');
        }
      }
      if (typeof showToast === 'function') showToast(`🇯🇵 Chữ "${item.hira}" (${item.romaji}) — ví dụ: ${item.word}`);
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaHira');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const cards = document.querySelectorAll('#jaHiraGrid .ja-hira-card');

      const myEp = ++jaEpoch;
      function nextHira() {
        if (!jaAutoRunning || myEp !== jaEpoch) return;
        if (idx >= JA_HIRAGANA_DATA.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 すごい! Bảo Long đã nghe xong 46 chữ Hiragana!');
          return;
        }
        document.querySelectorAll('#jaHiraGrid .ja-hira-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = JA_HIRAGANA_DATA[idx];
        window.soundMgr.playAudioFile(`ja_hira_${cur.hira}`, () => {
          if (!jaAutoRunning || myEp !== jaEpoch) return;
          idx++;
          jaAutoTimer = setTimeout(nextHira, 400);
        }, cur.hira);
      }
      nextHira();
    };
  }

  // Render 25 Âm đục & Âm tròn (が..ぱ)
  const dakuonGrid = document.getElementById('jaDakuonGrid');
  if (dakuonGrid && typeof JA_DAKUON_DATA !== 'undefined') {
    dakuonGrid.innerHTML = '';
    JA_DAKUON_DATA.forEach(item => {
      const card = document.createElement('div');
      card.className = 'alpha-card ja-hira-card';
      card.innerHTML = `
        <div class="alpha-letter" style="color: #9f1239; font-size: 34px;">${item.hira}</div>
        <div class="alpha-phonetic-pill" style="background:#fce7f3; color:#be185d;">${item.romaji}</div>
      `;
      card.addEventListener('click', () => {
        stopJaAutoPlay();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(`ja_hira_${item.hira}`, null, item.hira);
        if (typeof showToast === 'function') showToast(`🔔 Âm đục "${item.hira}" đọc là ${item.romaji}`);
      });
      dakuonGrid.appendChild(card);
    });

    if (!document.getElementById('jaYoonSection')) {
      const yoonBox = document.createElement('div');
      yoonBox.id = 'jaYoonSection';
      yoonBox.innerHTML = `
        <h3 class="section-blue-title" style="color: #7c3aed; margin: 20px 0 10px 0;">
          <span>✨</span> Âm Ghép (拗音: きゃ・しゅ・ちょ) &amp; Âm Ngắt (促音: っ)
        </h3>
        <div class="ja-hira-grid" id="jaYoonGrid"></div>
      `;
      dakuonGrid.parentElement.appendChild(yoonBox);
    }
    const yoonGrid = document.getElementById('jaYoonGrid');
    if (yoonGrid) {
      yoonGrid.innerHTML = '';
      JA_YOON_SOKUON_DATA.forEach(item => {
        const card = document.createElement('div');
        card.className = 'alpha-card ja-hira-card';
        card.innerHTML = `
          <div class="alpha-letter" style="color: #6d28d9; font-size: ${item.label.length > 3 ? '20px' : '28px'};">${item.label}</div>
          <div class="alpha-phonetic-pill" style="background:#ede9fe; color:#5b21b6;">${item.romaji}</div>
          <div class="alpha-ja" style="font-weight:700; color:#475569; margin-top:4px;">${item.ex}</div>
        `;
        card.addEventListener('click', () => {
          stopJaAutoPlay();
          window.soundMgr.playClick();
          window.soundMgr.playAudioFile(item.key, null, item.label);
          if (typeof showToast === 'function') showToast(`✨ ${item.label} (${item.romaji}) — ví dụ: ${item.ex}`);
        });
        yoonGrid.appendChild(card);
      });
    }
  }
}

function openJaWriteChar(ch, setName) {
  jaWriteChar = ch;
  jaWriteSet = setName;
  switchJapaneseSubTab('writing');
}

// ========================================================
// TAB 2: 46 CHỮ KATAKANA (ア -> ン)
// ========================================================
function renderJaKatakanaTab() {
  const grid = document.getElementById('jaKataGrid');
  if (!grid || typeof JA_KATAKANA_DATA === 'undefined') return;
  grid.innerHTML = '';

  JA_KATAKANA_DATA.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(`ja_k_${item.kata}`);
    const card = document.createElement('div');
    card.className = `alpha-card ja-hira-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="alpha-letter" style="color: #0369a1; font-size: 36px;">${item.kata}</div>
      <div class="alpha-phonetic-pill" style="background:#e0f2fe; color:#0284c7;">${item.romaji}</div>
      <div style="font-size: 20px; margin: 2px 0;">${item.emoji}</div>
      <div class="alpha-ja" style="font-weight:700; color:#334155;">${item.word}</div>
    `;
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(`ja_kata_${item.kata}`, null, item.kata);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(`ja_k_${item.kata}`);
        if (isNew) {
          addJaScore(2);
          card.classList.add('is-learned');
        }
      }
      if (typeof showToast === 'function') showToast(`⚡ Katakana "${item.kata}" (${item.romaji}) — ${item.word}`);
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaKata');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const cards = document.querySelectorAll('#jaKataGrid .ja-hira-card');
      const myEp = ++jaEpoch;
      function nextKata() {
        if (!jaAutoRunning || myEp !== jaEpoch) return;
        if (idx >= JA_KATAKANA_DATA.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('⚡ Tuyệt vời! Bảo Long đã nghe xong 46 chữ Katakana!');
          return;
        }
        document.querySelectorAll('#jaKataGrid .ja-hira-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = JA_KATAKANA_DATA[idx];
        window.soundMgr.playAudioFile(`ja_kata_${cur.kata}`, () => {
          if (!jaAutoRunning || myEp !== jaEpoch) return;
          idx++;
          jaAutoTimer = setTimeout(nextKata, 400);
        }, cur.kata);
      }
      nextKata();
    };
  }
}

// ========================================================
// TAB 3: TRỌN BỘ 80 KANJI LỚP 1 CHUẨN MEXT NHẬT BẢN
// ========================================================
function renderJaKanjiTab() {
  const track = document.getElementById('jaKanjiUnitTrack');
  const grid = document.getElementById('jaKanjiGrid');
  if (!track || !grid || typeof JA_KANJI_80_DATA === 'undefined') return;

  const units = [
    { id: 1, title: '🔢 Bài 1: Số & Ngũ hành (1–20)' },
    { id: 2, title: '👀 Bài 2: Cơ thể & Phương hướng (21–40)' },
    { id: 3, title: '⛰️ Bài 3: Thiên nhiên & Làng phố (41–60)' },
    { id: 4, title: '🏫 Bài 4: Trường học & Sắc màu (61–80)' }
  ];

  track.innerHTML = '';
  units.forEach(u => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `lesson-tab ${u.id === currentJaKanjiUnit ? 'active' : ''}`;
    b.innerText = u.title;
    b.onclick = () => {
      stopJaAutoPlay();
      currentJaKanjiUnit = u.id;
      window.soundMgr.playClick();
      renderJaKanjiTab();
    };
    track.appendChild(b);
  });

  const list = JA_KANJI_80_DATA.filter(k => k.unit === currentJaKanjiUnit);
  grid.innerHTML = '';
  list.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(item.id);
    const card = document.createElement('div');
    card.className = `alpha-card ja-kanji-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="kanji-top-row">
        <span class="kanji-emoji">${item.emoji}</span>
        <span class="kanji-strokes-badge">${JA_KANJI_STROKES[item.char] || 4} nét</span>
        <button type="button" class="kanji-write-mini-btn" title="Tập viết chữ ${item.char}">✍️ Viết</button>
      </div>
      <div class="kanji-big-char">${item.char}</div>
      <div class="kanji-vi-meaning">${item.vi}</div>
      <div class="kanji-readings">Kun: <strong>${item.kun}</strong> • On: ${item.on}</div>
      <div class="alpha-phonetic-pill" style="background:#fff1f2; color:#be123c; margin-top:4px;">${item.word}</div>
    `;
    const wrBtn = card.querySelector('.kanji-write-mini-btn');
    if (wrBtn) {
      wrBtn.onclick = (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        openJaWriteChar(item.char, 'kanji');
      };
    }
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(item.id, null, item.word);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(item.id);
        if (isNew) {
          addJaScore(3);
          card.classList.add('is-learned');
        }
      }
      if (typeof showToast === 'function') showToast(`⛩️ Hán tự "${item.char}" (${item.vi}): ${item.word}`);
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaKanji');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const cards = document.querySelectorAll('#jaKanjiGrid .ja-kanji-card');
      const myEp = ++jaEpoch;
      function nextKanji() {
        if (!jaAutoRunning || myEp !== jaEpoch) return;
        if (idx >= list.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('⛩️ Tuyệt vời! Bé đã nghe xong 20 chữ Kanji của bài!');
          return;
        }
        document.querySelectorAll('#jaKanjiGrid .ja-kanji-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = list[idx];
        window.soundMgr.playAudioFile(cur.id, () => {
          if (!jaAutoRunning || myEp !== jaEpoch) return;
          idx++;
          jaAutoTimer = setTimeout(nextKanji, 450);
        }, cur.word);
      }
      nextKanji();
    };
  }
}

// ========================================================
// TAB 5: 10 TRUYỆN ĐỌC QUỐC NGỮ NHẬT LỚP 1 & CỔ TÍCH (小1 国語)
// ========================================================
let jaStoryShowRomaji = true;
const jaStoryQState = {};

function renderJaStoriesTab() {
  const tabs = document.getElementById('jaStoriesTabs');
  const box = document.getElementById('jaStoryReaderBox');
  if (!tabs || !box || typeof JA_STORIES_DATA === 'undefined') return;

  const stIdx = Math.max(0, JA_STORIES_DATA.findIndex(s => s.id === currentJaStoryId));
  const st = JA_STORIES_DATA[stIdx] || JA_STORIES_DATA[0];
  currentJaStoryId = st.id;

  const isStoryDone = (storyId) =>
    typeof explorerState !== 'undefined' &&
    Array.isArray(explorerState.learnedIds) &&
    explorerState.learnedIds.includes(`ja_story_done_${storyId}`);

  tabs.innerHTML = '';
  JA_STORIES_DATA.forEach((item, idx) => {
    const done = isStoryDone(item.id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lesson-tab ${item.id === st.id ? 'active' : ''} ${done ? 'is-story-done' : ''}`;
    btn.innerText = `${done ? '✅ ' : ''}${idx + 1}. ${item.title}`;
    btn.onclick = () => {
      stopJaAutoPlay();
      window.soundMgr.stopAll();
      jaEpoch++;
      currentJaStoryId = item.id;
      window.soundMgr.playClick();
      renderJaStoriesTab();
    };
    tabs.appendChild(btn);
  });

  if (!jaStoryQState[st.id]) {
    jaStoryQState[st.id] = {
      solved: new Set(),
      shuffledOptions: st.questions.map(q => [...q.options].sort(() => Math.random() - 0.5)),
    };
  }
  const stState = jaStoryQState[st.id];
  const doneNow = isStoryDone(st.id);

  box.className = `story-reader-card ${jaStoryShowRomaji ? '' : 'hide-romaji'}`;
  box.innerHTML = `
    <div class="story-header-row">
      <div class="story-title-meta">
        <div class="story-badges-row">
          <span class="story-source-badge">${st.badge || '📘 Truyện 小1'}</span>
          <span class="story-count-badge">Truyện ${stIdx + 1} / ${JA_STORIES_DATA.length} • ${st.jaLines.length} câu</span>
          <span class="story-status-badge ${doneNow ? 'done' : ''}" id="jaStoryDonePill">${doneNow ? '✅ Đã hoàn thành đọc hiểu' : '🎁 Đọc & trả lời 2 câu: +5 🪙 +5 ⭐'}</span>
        </div>
        <div class="story-title-main">${st.title}</div>
      </div>
      <div class="story-header-actions">
        <button type="button" class="btn-listen" id="btnHearJaStory">
          <span>🎧</span> Nghe từng câu (Tô sáng)
        </button>
        <button type="button" class="btn-outline" id="btnHearJaStoryFull" title="Nghe toàn bộ câu chuyện liền mạch">
          <span>📖</span> Nghe liền mạch
        </button>
        <button type="button" class="btn-outline" id="btnToggleJaStoryRomaji">
          <span>🔤</span> ${jaStoryShowRomaji ? 'Ẩn Romaji' : 'Hiện Romaji'}
        </button>
      </div>
    </div>

    ${st.image ? `<div class="story-cover-frame"><img src="${st.image}" alt="${st.title}" loading="lazy"></div>` : ''}
    <div class="story-ja-lines" id="jaStoryLinesHost">
      ${st.jaLines.map((line, i) => `
        <div class="story-ja-row" data-line-idx="${i}">
          <div class="story-ja-row-top">
            <span class="story-ja-num">${i + 1}</span>
            <button type="button" class="story-ja-line-btn" data-line-key="${line.key}" aria-label="Nghe câu ${i + 1}">🔊</button>
            <div class="story-ja-content">
              <div class="story-ja-text">${line.ja}</div>
              <div class="story-ja-romaji">${line.romaji}</div>
              <div class="story-ja-vi-line">${line.vi}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    ${Array.isArray(st.vocab) && st.vocab.length ? `
      <div class="story-vocab-box">
        <div class="story-vocab-title">✨ Từ vựng hay trong truyện (bấm để nghe):</div>
        <div class="story-vocab-row">
          ${st.vocab.map(v => `
            <button type="button" class="story-vocab-chip" data-vocab-key="${v.audioKey}" data-vocab-label="${v.ja} (${v.romaji}) = ${v.vi}">
              <span>🔊</span> <strong>${v.ja}</strong> <em>(${v.romaji})</em> — ${v.vi}
            </button>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${st.moral ? `<div class="story-moral-banner">${st.moral}</div>` : ''}

    <div class="story-questions-host" id="jaStoryQuestionsHost">
      ${st.questions.map((q, qi) => `
        <div class="story-comp-box ${stState.solved.has(qi) ? 'is-solved' : ''}" data-q-idx="${qi}">
          <div class="story-q-header">
            <div class="story-comp-q">❓ Câu ${qi + 1}/${st.questions.length}: ${q.question}</div>
            <button type="button" class="btn-outline story-q-tour-btn" data-q-idx="${qi}">🔊 Nghe câu hỏi & đáp án</button>
          </div>
          <div class="story-comp-opts"></div>
        </div>
      `).join('')}
    </div>

    <div class="story-footer-nav">
      <button type="button" class="btn-outline" id="btnPrevJaStory">⬅️ Truyện trước</button>
      <span class="story-footer-pos">📖 ${stIdx + 1} / ${JA_STORIES_DATA.length}</span>
      <button type="button" class="btn-outline" id="btnNextJaStory">Truyện tiếp theo ➡️</button>
    </div>
  `;

  // Wire line click playback
  const lineRows = Array.from(box.querySelectorAll('.story-ja-row'));
  lineRows.forEach((row, i) => {
    const line = st.jaLines[i];
    const playLine = (e) => {
      e?.stopPropagation();
      stopJaAutoPlay();
      window.soundMgr.stopAll();
      window.soundMgr.playClick();
      lineRows.forEach(r => r.classList.remove('is-reading-option'));
      row.classList.add('is-reading-option');
      window.soundMgr.playAudioFile(line.key, () => {
        row.classList.remove('is-reading-option');
      }, line.ja);
    };
    row.addEventListener('click', playLine);
    const btn = row.querySelector('.story-ja-line-btn');
    if (btn) btn.addEventListener('click', playLine);
  });

  // Hear line-by-line with live highlight
  const btnHear = document.getElementById('btnHearJaStory');
  if (btnHear) {
    btnHear.onclick = () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      const steps = st.jaLines.map((line, i) => ({
        key: line.key,
        fallbackText: line.ja,
        el: lineRows[i],
        pauseAfterMs: 280,
      }));
      window.soundMgr.playChoiceTour(steps, () => {
        if (typeof showToast === 'function') showToast(`🎧 Đã nghe xong trọn truyện "${st.title}"!`);
      });
    };
  }

  // Hear full continuous narration
  const btnHearFull = document.getElementById('btnHearJaStoryFull');
  if (btnHearFull) {
    btnHearFull.onclick = () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(st.audioKey, null, st.jaLines.map(l => l.ja).join(' '));
      if (typeof showToast === 'function') showToast(`📖 Đang kể trọn câu chuyện ${st.title}...`);
    };
  }

  // Toggle Romaji visibility
  const btnToggleRomaji = document.getElementById('btnToggleJaStoryRomaji');
  if (btnToggleRomaji) {
    btnToggleRomaji.onclick = () => {
      jaStoryShowRomaji = !jaStoryShowRomaji;
      window.soundMgr.playClick();
      box.classList.toggle('hide-romaji', !jaStoryShowRomaji);
      btnToggleRomaji.innerHTML = `<span>🔤</span> ${jaStoryShowRomaji ? 'Ẩn Romaji' : 'Hiện Romaji'}`;
    };
  }

  // Vocab chips
  box.querySelectorAll('.story-vocab-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      window.soundMgr.playClick();
      const vKey = chip.getAttribute('data-vocab-key');
      const vLabel = chip.getAttribute('data-vocab-label') || '';
      window.soundMgr.playAudioFile(vKey, null, vLabel);
      if (typeof showToast === 'function') showToast(`🇯🇵 ${vLabel}`);
    });
  });

  // Render & wire 2 comprehension questions
  const qCards = Array.from(box.querySelectorAll('.story-comp-box'));
  qCards.forEach((qCard, qi) => {
    const q = st.questions[qi];
    const optsHost = qCard.querySelector('.story-comp-opts');
    const opts = stState.shuffledOptions[qi];
    const qTourSteps = [{ key: q.qKey, fallbackText: q.question, el: qCard.querySelector('.story-comp-q'), pauseAfterMs: 220 }];

    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'story-opt-btn';
      if (stState.solved.has(qi) && opt.isGood) btn.classList.add('correct');
      btn.innerHTML = `
        <span class="story-opt-speak" title="Nghe đáp án này">🔊</span>
        <span class="story-opt-main">${opt.emoji} ${opt.text}</span>
      `;
      const spk = btn.querySelector('.story-opt-speak');
      if (spk) {
        spk.addEventListener('click', (e) => {
          e.stopPropagation();
          window.soundMgr.playClick();
          window.soundMgr.playAudioFile(opt.key, null, opt.text);
        });
      }
      qTourSteps.push({ key: opt.key, fallbackText: opt.text, el: btn, pauseAfterMs: 120 });

      btn.addEventListener('click', () => {
        if (stState.solved.has(qi) || btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
        window.soundMgr.stopAll();
        if (opt.isGood) {
          stState.solved.add(qi);
          btn.classList.add('correct');
          qCard.classList.add('is-solved');
          addJaScore(5);
          window.recordAnswer?.(`${st.id}_q${qi + 1}`, true, { label: `${st.title} (Câu ${qi + 1})`, mode: 'japanese', audioKey: q.qKey, noAutoCoin: true });
          window.soundMgr.playCorrect();
          window.soundMgr.speakPraise(stState.solved.size >= st.questions.length);

          if (stState.solved.size >= st.questions.length) {
            const doneId = `ja_story_done_${st.id}`;
            const firstTime = typeof explorerState !== 'undefined' && Array.isArray(explorerState.learnedIds) && !explorerState.learnedIds.includes(doneId);
            if (firstTime) {
              explorerState.learnedIds.push(doneId);
              if (typeof saveProgress === 'function') saveProgress();
              window.awardCoins?.(5);
              window.awardStars?.(5, `Đọc hiểu ${st.title}`, false, 'learn');
              window.markDailyStep?.('learn');
              if (typeof fireConfetti === 'function') fireConfetti();
              const pill = document.getElementById('jaStoryDonePill');
              if (pill) {
                pill.classList.add('done');
                pill.innerText = '✅ Đã hoàn thành đọc hiểu (+5 🪙 +5 ⭐)';
              }
              const activeTab = tabs.querySelector('.lesson-tab.active');
              if (activeTab && !activeTab.classList.contains('is-story-done')) {
                activeTab.classList.add('is-story-done');
                activeTab.innerText = `✅ ${stIdx + 1}. ${st.title}`;
              }
            } else if (typeof showToast === 'function') {
              showToast(`🎉 すごい！Bé trả lời đúng cả ${st.questions.length} câu hỏi truyện "${st.title}"!`);
            }
          } else if (typeof showToast === 'function') {
            showToast(`🌸 Đúng rồi! Trả lời nốt câu còn lại để nhận +5 🪙 +5 ⭐ nhé!`);
          }
        } else {
          btn.classList.add('wrong');
          window.recordAnswer?.(`${st.id}_q${qi + 1}`, false, { label: `${st.title} (Câu ${qi + 1})`, mode: 'japanese', audioKey: q.qKey });
          window.soundMgr.playWrong();
          window.soundMgr.speakTryAgain();
          if (typeof showToast === 'function') showToast('🤔 Chưa đúng rồi, bé đọc lại các câu phía trên rồi chọn lại nhé!');
        }
      });
      optsHost.appendChild(btn);
    });

    const tourBtn = qCard.querySelector('.story-q-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        stopJaAutoPlay();
        window.soundMgr.playClick();
        window.soundMgr.playChoiceTour(qTourSteps);
      });
    }
  });

  // Footer Prev/Next story navigation
  const prevBtn = document.getElementById('btnPrevJaStory');
  const nextBtn = document.getElementById('btnNextJaStory');
  if (prevBtn) {
    prevBtn.onclick = () => {
      stopJaAutoPlay();
      window.soundMgr.stopAll();
      jaEpoch++;
      currentJaStoryId = JA_STORIES_DATA[(stIdx - 1 + JA_STORIES_DATA.length) % JA_STORIES_DATA.length].id;
      window.soundMgr.playClick();
      renderJaStoriesTab();
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      stopJaAutoPlay();
      window.soundMgr.stopAll();
      jaEpoch++;
      currentJaStoryId = JA_STORIES_DATA[(stIdx + 1) % JA_STORIES_DATA.length].id;
      window.soundMgr.playClick();
      renderJaStoriesTab();
      box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }
}

// ========================================================
// TAB 2: TỪ VỰNG & GIAO TIẾP NHẬT - VIỆT
// ========================================================
function renderJaVocabTab() {
  const track = document.getElementById('jaTopicsTrack');
  if (!track) return;
  track.innerHTML = '';

  JA_VOCAB_TOPICS.forEach((topic, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `lesson-tab ${idx === currentJaTopicIdx ? 'active' : ''}`;
    btn.innerText = topic.title;
    btn.onclick = () => {
      stopJaAutoPlay();
      currentJaTopicIdx = idx;
      window.soundMgr.playClick();
      renderJaVocabTab();
    };
    track.appendChild(btn);
  });

  const activeTopic = JA_VOCAB_TOPICS[currentJaTopicIdx];
  document.getElementById('jaTopicTitleText').innerText = activeTopic.title;

  const grid = document.getElementById('jaVocabGrid');
  grid.innerHTML = '';
  activeTopic.words.forEach(w => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(w.id);
    const card = document.createElement('div');
    card.className = `word-card ja-vocab-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="star-corner">${learned ? '⭐' : '☆'}</div>
      <div class="word-icon-img">${w.emoji}</div>
      <div class="word-text" style="color: #be123c; font-size: 20px;">${w.ja}</div>
      <div style="font-size: 12px; font-weight: 800; color: #6366f1;">(${w.romaji})</div>
      <div class="word-action-tag" style="background:#ffe4e6; color:#9f1239;">${w.vi}</div>
    `;
    card.addEventListener('click', () => {
      stopJaAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(w.audioKey, null, w.ja);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(w.id);
        if (isNew) {
          addJaScore(2);
          card.classList.add('is-learned');
          const sc = card.querySelector('.star-corner');
          if (sc) sc.innerText = '⭐';
          if (typeof showToast === 'function') showToast(`⭐ +2 Sao! "${w.ja}" = "${w.vi}"!`);
        } else if (typeof showToast === 'function') {
          showToast(`🇯🇵 ${w.ja} (${w.romaji}) = ${w.vi}`);
        }
      }
    });
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayJaVocab');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (jaAutoRunning || btnAuto.classList.contains('playing')) {
        stopJaAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      stopJaAutoPlay();
      jaAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      let idx = 0;
      const words = activeTopic.words;
      const cards = document.querySelectorAll('#jaVocabGrid .ja-vocab-card');

      function nextJaWord() {
        if (!jaAutoRunning) return;
        if (idx >= words.length) {
          stopJaAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 よくできました! Đã nghe xong chủ đề!');
          return;
        }
        document.querySelectorAll('#jaVocabGrid .ja-vocab-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        window.soundMgr.playAudioFile(words[idx].audioKey, () => {
          if (!jaAutoRunning) return;
          idx++;
          jaAutoTimer = setTimeout(nextJaWord, 550);
        }, words[idx].ja);
      }
      nextJaWord();
    };
  }
}

// ========================================================
// TAB 6: TẬP VIẾT HIRAGANA / KATAKANA / 80 KANJI Ô VUÔNG NHẬT BẢN (MASUME)
// ========================================================
function renderJaWritingTab() {
  document.querySelectorAll('.ja-write-set-btn').forEach(btn => {
    btn.classList.toggle('active-filter', btn.dataset.set === jaWriteSet);
    btn.onclick = () => {
      jaWriteSet = btn.dataset.set;
      if (jaWriteSet === 'hira' && !JA_HIRAGANA_DATA.some(x => x.hira === jaWriteChar)) jaWriteChar = 'あ';
      if (jaWriteSet === 'kata' && !JA_KATAKANA_DATA.some(x => x.kata === jaWriteChar)) jaWriteChar = 'ア';
      if (jaWriteSet === 'kanji' && !JA_KANJI_80_DATA.some(x => x.char === jaWriteChar)) jaWriteChar = '一';
      window.soundMgr.playClick();
      renderJaWritingTab();
    };
  });

  const getActiveMeta = (ch) => {
    if (jaWriteSet === 'kata') {
      const k = JA_KATAKANA_DATA.find(x => x.kata === ch) || JA_KATAKANA_DATA[0];
      return { ch: k.kata, label: `${k.kata} (${k.romaji}) — ${k.word}`, audioKey: `ja_kata_${k.kata}` };
    }
    if (jaWriteSet === 'kanji') {
      const kj = JA_KANJI_80_DATA.find(x => x.char === ch) || JA_KANJI_80_DATA[0];
      return { ch: kj.char, label: `Hán tự ${kj.char} (${kj.vi}) — ${kj.word}`, audioKey: kj.id };
    }
    const h = JA_HIRAGANA_DATA.find(x => x.hira === ch) || JA_HIRAGANA_DATA[0];
    return { ch: h.hira, label: `${h.hira} (${h.romaji}) — ${h.word}`, audioKey: `ja_hira_${h.hira}` };
  };

  const picker = document.getElementById('jaWritePicker');
  if (picker) {
    picker.innerHTML = '';
    const items = jaWriteSet === 'kata'
      ? JA_KATAKANA_DATA.map(x => ({ ch: x.kata, tip: `${x.kata} (${x.romaji})` }))
      : (jaWriteSet === 'kanji'
        ? JA_KANJI_80_DATA.map(x => ({ ch: x.char, tip: `${x.char}: ${x.vi}` }))
        : JA_HIRAGANA_DATA.map(x => ({ ch: x.hira, tip: `${x.hira} (${x.romaji})` })));

    items.forEach(it => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ja-pick-char-btn ${it.ch === jaWriteChar ? 'active' : ''}`;
      btn.innerText = it.ch;
      btn.title = it.tip;
      btn.onclick = () => {
        jaWriteChar = it.ch;
        const m = getActiveMeta(it.ch);
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(m.audioKey, null, m.ch);
        picker.querySelectorAll('.ja-pick-char-btn.active').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('jaWriteCurrentTitle').innerText = `Tập viết chữ: ${m.label}`;
        const hearBtn = document.getElementById('btnHearJaWrite');
        if (hearBtn) {
          hearBtn.onclick = () => {
            window.soundMgr.playClick();
            window.soundMgr.playAudioFile(m.audioKey, null, m.ch);
          };
        }
        requestAnimationFrame(() => drawJaMasumeGuide());
      };
      picker.appendChild(btn);
    });
  }

  const cur = getActiveMeta(jaWriteChar);
  jaWriteChar = cur.ch;
  document.getElementById('jaWriteCurrentTitle').innerText = `Tập viết chữ: ${cur.label}`;
  document.getElementById('btnHearJaWrite').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(cur.audioKey, null, cur.ch);
  };

  if (!jaWriteInited) {
    initJaCanvasEvents();
    jaWriteInited = true;
  }

  requestAnimationFrame(() => {
    drawJaMasumeGuide();
  });
}

let jaHasInkDrawn = false;
const jaAwardedWriteChars = new Set();

function initJaCanvasEvents() {
  jaCanvas = document.getElementById('jaWritingCanvas');
  if (!jaCanvas) return;
  jaCtx = jaCanvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssSize = 260;
  jaCanvas.style.width = `${cssSize}px`;
  jaCanvas.style.height = `${cssSize}px`;
  jaCanvas.width = cssSize * dpr;
  jaCanvas.height = cssSize * dpr;
  jaCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  function coords(e) {
    const r = jaCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (cssSize / (r.width || cssSize)),
      y: (e.clientY - r.top) * (cssSize / (r.height || cssSize))
    };
  }

  jaCanvas.addEventListener('mousedown', (e) => {
    jaDrawing = true;
    jaHasInkDrawn = true;
    const c = coords(e);
    jaCtx.save();
    jaCtx.fillStyle = jaBrushColor;
    jaCtx.beginPath();
    jaCtx.arc(c.x, c.y, 6, 0, Math.PI * 2);
    jaCtx.fill();
    jaCtx.restore();
    jaCtx.beginPath();
    jaCtx.moveTo(c.x, c.y);
  });
  jaCanvas.addEventListener('mousemove', (e) => {
    if (!jaDrawing) return;
    const c = coords(e);
    jaCtx.lineWidth = 12;
    jaCtx.lineCap = 'round';
    jaCtx.lineJoin = 'round';
    jaCtx.strokeStyle = jaBrushColor;
    jaCtx.lineTo(c.x, c.y);
    jaCtx.stroke();
  });
  const stopJaDraw = () => { jaDrawing = false; jaCtx.closePath(); };
  jaCanvas.addEventListener('mouseup', stopJaDraw);
  jaCanvas.addEventListener('mouseleave', stopJaDraw);

  jaCanvas.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches[0]) return;
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousedown', { clientX: t.clientX, clientY: t.clientY }));
  }, { passive: false });
  jaCanvas.addEventListener('touchmove', (e) => {
    if (!e.touches || !e.touches[0]) return;
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY }));
  }, { passive: false });
  jaCanvas.addEventListener('touchend', () => {
    jaCanvas.dispatchEvent(new MouseEvent('mouseup', {}));
  });
  jaCanvas.addEventListener('touchcancel', stopJaDraw);

  document.getElementById('btnJaClear')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    drawJaMasumeGuide();
  });

  document.getElementById('btnJaFinish')?.addEventListener('click', () => {
    if (!jaHasInkDrawn) {
      window.soundMgr.playPop();
      if (typeof showToast === 'function') showToast('✍️ Bảo Long thử tô nét chữ Nhật vào ô vuông trước nhé!');
      return;
    }
    window.soundMgr.playCorrect();
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playAudioFile('cheer_ja_good', null, 'Yoku dekimashita!');
    if (!jaAwardedWriteChars.has(jaWriteChar)) {
      jaAwardedWriteChars.add(jaWriteChar);
      if (typeof awardStars === 'function') awardStars(2, `Viết đẹp chữ Nhật "${jaWriteChar}"!`);
      addJaScore(2);
    } else if (typeof showToast === 'function') {
      showToast(`✍️ Nét chữ "${jaWriteChar}" đẹp lắm Bảo Long ơi!`);
    }
  });

  document.querySelectorAll('.ja-color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.ja-color-dot').forEach(d => d.classList.remove('active-dot'));
      dot.classList.add('active-dot');
      jaBrushColor = dot.dataset.color;
      window.soundMgr.playClick();
    });
  });

  document.querySelectorAll('#jaHintLevelGroup .ja-hint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#jaHintLevelGroup .ja-hint-btn').forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      window.soundMgr.playClick();
      if (typeof setJaWritingHintLevel === 'function') setJaWritingHintLevel(btn.dataset.level);
      drawJaMasumeGuide();
    });
  });

  document.getElementById('btnJaCheck')?.addEventListener('click', () => {
    if (!jaCanvas || typeof evaluateCanvasGuideMatch !== 'function') return;
    window.soundMgr.playClick();
    const res = evaluateCanvasGuideMatch(jaCanvas, (gCtx, w) => {
      const cssSize = 260;
      const dpr = Math.max(1, w / cssSize);
      gCtx.save();
      gCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gCtx.font = 'bold 170px "Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif';
      gCtx.fillStyle = '#000';
      gCtx.textAlign = 'center';
      gCtx.textBaseline = 'middle';
      gCtx.fillText(jaWriteChar, cssSize / 2, cssSize / 2 + 8);
      gCtx.restore();
    });
    if (typeof showToast === 'function') showToast(res.hintText);
    if (res.matchedPct >= 45) window.soundMgr.playPop();
  });
}

function drawJaMasumeGuide() {
  if (!jaCtx || !jaCanvas) return;
  jaHasInkDrawn = false;
  const w = 260;
  const h = 260;
  jaCtx.clearRect(0, 0, w, h);

  // Ô vuông chữ thập nét đứt chuẩn tiểu học Nhật Bản (マス目)
  jaCtx.save();
  jaCtx.strokeStyle = '#fda4af';
  jaCtx.lineWidth = 2;
  jaCtx.setLineDash([6, 6]);
  jaCtx.beginPath();
  jaCtx.moveTo(w / 2, 0);
  jaCtx.lineTo(w / 2, h);
  jaCtx.moveTo(0, h / 2);
  jaCtx.lineTo(w, h / 2);
  jaCtx.stroke();

  // Chữ mẫu theo 3 cấp độ hỗ trợ (Nét mờ -> Chấm bắt đầu -> Ô trống)
  jaCtx.setLineDash([]);
  const jaFont = 'bold 170px "Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif';
  const jLvl = typeof getJaWritingHintLevel === 'function' ? getJaWritingHintLevel() : 'guide';
  if (typeof drawHintByLevel === 'function') {
    jaCtx.restore();
    drawHintByLevel(jaCtx, w, h, jaWriteChar, jLvl, jaFont, 8);
    return;
  }
  jaCtx.font = jaFont;
  jaCtx.fillStyle = '#e2e8f0';
  jaCtx.textAlign = 'center';
  jaCtx.textBaseline = 'middle';
  jaCtx.fillText(jaWriteChar, w / 2, h / 2 + 8);
  jaCtx.restore();
}

// ========================================================
// TAB 7: ĐỐ VUI TIẾNG NHẬT (TỔNG HỢP / HIRA / KATA / 80 KANJI / TỪ VỰNG)
// ========================================================
function buildJaQuizPool(filterMode) {
  const vocabPool = JA_VOCAB_TOPICS.flatMap(t => t.words);
  const hiraPool = JA_HIRAGANA_DATA.map(h => ({
    id: `h_${h.hira}`,
    ja: h.hira,
    romaji: h.romaji,
    vi: `Chữ ${h.romaji.toUpperCase()} (${h.word})`,
    emoji: h.emoji,
    audioKey: `ja_hira_${h.hira}`
  }));
  const kataPool = JA_KATAKANA_DATA.map(k => ({
    id: `k_${k.kata}`,
    ja: k.kata,
    romaji: k.romaji,
    vi: `Chữ cứng ${k.romaji.toUpperCase()} (${k.word})`,
    emoji: k.emoji,
    audioKey: `ja_kata_${k.kata}`
  }));
  const kanjiPool = JA_KANJI_80_DATA.map(kj => ({
    id: kj.id,
    ja: kj.char,
    romaji: kj.word,
    vi: kj.vi,
    emoji: kj.emoji,
    audioKey: kj.id
  }));

  if (filterMode === 'hira') return hiraPool;
  if (filterMode === 'kata') return kataPool;
  if (filterMode === 'kanji') return kanjiPool;
  if (filterMode === 'vocab') return vocabPool;
  return [...vocabPool, ...kanjiPool, ...hiraPool.slice(0, 15), ...kataPool.slice(0, 15)];
}

function initJaQuizGame(mode = jaQuizFilterMode) {
  jaQuizFilterMode = mode;
  document.querySelectorAll('.ja-quiz-filter').forEach(btn => {
    btn.classList.toggle('active-filter', btn.dataset.mode === mode);
    btn.onclick = () => {
      window.soundMgr.playClick();
      initJaQuizGame(btn.dataset.mode);
    };
  });

  const pool = buildJaQuizPool(mode);
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);

  jaQuizQuestions = picked.map(target => {
    const others = pool.filter(w => w.id !== target.id && w.vi !== target.vi).sort(() => Math.random() - 0.5).slice(0, 3);
    return {
      target,
      choices: [target, ...others].sort(() => Math.random() - 0.5)
    };
  });

  jaQuizIndex = 0;
  jaQuizScore = 0;
  jaQuizStreak = 0;
  document.getElementById('jaQuizPlayStage').style.display = 'block';
  document.getElementById('jaQuizVictoryStage').style.display = 'none';
  loadJaQuizQuestion();
}

function loadJaQuizQuestion() {
  jaEpoch++;
  const myNav = window.appNavEpoch || 0;
  const myJa = jaEpoch;
  if (jaQuizIndex >= jaQuizQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_ja_win', null, 'Sugoi! Bao Long');
    window.markDailyStep?.('play');
    if (typeof awardStars === 'function') awardStars(15, 'Siêu sao Tiếng Nhật Song Ngữ 小1!');

    document.getElementById('jaQuizPlayStage').style.display = 'none';
    document.getElementById('jaQuizVictoryStage').style.display = 'block';
    document.getElementById('jaQuizVictoryScore').innerText =
      `Bảo Long đạt ${jaQuizScore} điểm Đố Vui Tiếng Nhật (+15 ⭐ vào Kho Báu)!`;
    return;
  }

  const q = jaQuizQuestions[jaQuizIndex];
  document.getElementById('jaQuizProgressText').innerText = `Câu ${jaQuizIndex + 1} / ${jaQuizQuestions.length}`;
  document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x${jaQuizStreak}`;
  document.getElementById('jaQuizScoreText').innerText = `⭐ ${jaQuizScore} điểm`;
  document.getElementById('jaQuizPromptWord').innerText = `${q.target.ja} (${q.target.romaji})`;

  const grid = document.getElementById('jaQuizOptionsGrid');
  grid.innerHTML = '';
  let jaQuizLocked = false;
  const qBoxEl = document.querySelector('#jaPaneQuiz .quiz-question-box');
  const jaTourSteps = [{ key: q.target.audioKey, fallbackText: q.target.ja, el: qBoxEl, pauseAfterMs: 220 }];

  q.choices.forEach(item => {
    const viKey = `vi_${item.id}`;
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe nghĩa tiếng Việt">🔊</button>
      <div class="quiz-opt-icon">${item.emoji}</div>
      <div class="quiz-opt-name">${item.vi}</div>
    `;
    const spkBtn = card.querySelector('.quiz-opt-speak-btn');
    if (spkBtn) {
      spkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundMgr.playClick();
        window.soundMgr.playAudioFile(viKey, null, item.vi);
      });
    }
    jaTourSteps.push({ key: viKey, fallbackText: item.vi, el: card, pauseAfterMs: 110 });

    card.addEventListener('click', () => {
      if (jaQuizLocked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (item.id === q.target.id) {
        jaQuizLocked = true;
        card.classList.add('correct');
        jaQuizStreak++;
        const pts = jaQuizStreak >= 3 ? 15 : 10;
        jaQuizScore += pts;
        addJaScore(pts);
        window.recordAnswer?.(q.target.id, true, { label: `${q.target.ja} (${q.target.vi})`, mode: 'japanese', audioKey: q.target.audioKey });
        document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x${jaQuizStreak}`;
        document.getElementById('jaQuizScoreText').innerText = `⭐ ${jaQuizScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        if (typeof showToast === 'function') showToast(`🌸 すごい! "${q.target.ja}" = ${q.target.vi}!`);
        window.soundMgr.playPraiseThen(jaQuizStreak >= 3,
          () => (window.appNavEpoch || 0) === myNav && jaEpoch === myJa,
          () => {
            jaQuizIndex++;
            loadJaQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        window.recordAnswer?.(q.target.id, false, { label: `${q.target.ja} (${q.target.vi})`, mode: 'japanese', audioKey: q.target.audioKey });
        jaQuizStreak = 0;
        document.getElementById('jaQuizStreakBadge').innerText = `🔥 Chuỗi x0`;
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
        if (typeof showToast === 'function') showToast(`👂 Bấm "Nghe Tiếng Nhật & 4 Đáp Án" hoặc loa 🔊 trên từng thẻ nhé!`);
      }
    });
    grid.appendChild(card);
  });

  const playJaTour = () => window.soundMgr.playChoiceTour(jaTourSteps);
  document.getElementById('btnHearJaQuiz').onclick = () => {
    window.soundMgr.playClick();
    playJaTour();
  };
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && jaEpoch === myJa) {
      playJaTour();
    }
  }, 60);
}
