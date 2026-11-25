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
  { id: 'ja_kanji_11', unit: 1, char: '百', kun: 'もも', on: 'ヒャク', vi: 'Một trăm (100)', word: '百 (ひゃく)', emoji: '💯' },
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
  { id: 'ja_kanji_53', unit: 3, char: '気', kun: 'いき', on: 'キ・ケ', vi: 'Khí trời / Tinh thần', word: '元気 (げんき)', emoji: '⚡' },
  { id: 'ja_kanji_54', unit: 3, char: '夕', kun: 'ゆう', on: 'セキ', vi: 'Buổi chiều tà', word: '夕方 (ゆうがた)', emoji: '🌆' },
  { id: 'ja_kanji_55', unit: 3, char: '音', kun: 'おと・ね', on: 'オン', vi: 'Âm thanh', word: '音 (おと)', emoji: '🎵' },
  { id: 'ja_kanji_56', unit: 3, char: '早', kun: 'はや(い)', on: 'ソウ', vi: 'Sớm / Nhanh', word: '早い (はやい)', emoji: '⏰' },
  { id: 'ja_kanji_57', unit: 3, char: '村', kun: 'むら', on: 'ソン', vi: 'Ngôi làng', word: '村 (むら)', emoji: '🏡' },
  { id: 'ja_kanji_58', unit: 3, char: '町', kun: 'まち', on: 'チョウ', vi: 'Khu phố / Thị trấn', word: '町 (まち)', emoji: '🏘️' },
  { id: 'ja_kanji_59', unit: 3, char: '車', kun: 'くるま', on: 'シャ', vi: 'Xe ô tô', word: '車 (くるま)', emoji: '🚗' },
  { id: 'ja_kanji_60', unit: 3, char: '玉', kun: 'たま', on: 'ギョク', vi: 'Viên ngọc / Bóng tròn', word: 'シャボン玉', emoji: '🔮' },
  // Bài 4 (20 chữ): Trường học, Màu sắc & Hành động
  { id: 'ja_kanji_61', unit: 4, char: '学', kun: 'まな(ぶ)', on: 'ガク', vi: 'Học tập', word: '学校 (がっこう)', emoji: '🎒' },
  { id: 'ja_kanji_62', unit: 4, char: '校', kun: 'こう', on: 'コウ', vi: 'Trường học', word: '小学校 (しょうがっこう)', emoji: '🏫' },
  { id: 'ja_kanji_63', unit: 4, char: '先', kun: 'さき', on: 'セン', vi: 'Trước / Thầy cô', word: '先生 (せんせい)', emoji: '👩‍🏫' },
  { id: 'ja_kanji_64', unit: 4, char: '生', kun: 'い(きる)・う(まれる)', on: 'セイ・ショウ', vi: 'Cuộc sống / Học sinh', word: '一年生 (いちねんせい)', emoji: '🌱' },
  { id: 'ja_kanji_65', unit: 4, char: '字', kun: 'あざ', on: 'ジ', vi: 'Chữ viết', word: '漢字 (かんじ)', emoji: '🔤' },
  { id: 'ja_kanji_66', unit: 4, char: '文', kun: 'ふみ', on: 'ブン・モン', vi: 'Câu văn', word: '作文 (さくぶん)', emoji: '📝' },
  { id: 'ja_kanji_67', unit: 4, char: '本', kun: 'もと', on: 'ホン', vi: 'Quyển sách / Gốc', word: '本 (ほん)', emoji: '📖' },
  { id: 'ja_kanji_68', unit: 4, char: '名', kun: 'な', on: 'メイ', vi: 'Tên gọi', word: '名前 (なまえ)', emoji: '🪪' },
  { id: 'ja_kanji_69', unit: 4, char: '年', kun: 'とし', on: 'ネン', vi: 'Năm (Thời gian)', word: '今年 (ことし)', emoji: '📅' },
  { id: 'ja_kanji_70', unit: 4, char: '休', kun: 'やす(む)', on: 'キュウ', vi: 'Nghỉ ngơi', word: '休み (やすみ)', emoji: '🛌' },
  { id: 'ja_kanji_71', unit: 4, char: '入', kun: 'はい(る)・い(れる)', on: 'ニュウ', vi: 'Đi vào', word: '入り口 (いりぐち)', emoji: '🚪' },
  { id: 'ja_kanji_72', unit: 4, char: '出', kun: 'で(る)・だ(す)', on: 'シュツ', vi: 'Đi ra', word: '出口 (でぐち)', emoji: '🚶' },
  { id: 'ja_kanji_73', unit: 4, char: '立', kun: 'た(つ)', on: 'リツ', vi: 'Đứng lên', word: '立つ (たつ)', emoji: '🧍' },
  { id: 'ja_kanji_74', unit: 4, char: '見', kun: 'み(る)', on: 'ケン', vi: 'Nhìn / Ngắm xem', word: '見る (みる)', emoji: '👀' },
  { id: 'ja_kanji_75', unit: 4, char: '正', kun: 'ただ(しい)', on: 'セイ・ショウ', vi: 'Đúng đắn', word: '正しい (ただしい)', emoji: '✅' },
  { id: 'ja_kanji_76', unit: 4, char: '赤', kun: 'あか', on: 'セキ', vi: 'Màu đỏ', word: '赤 (あか)', emoji: '🔴' },
  { id: 'ja_kanji_77', unit: 4, char: '青', kun: 'あお', on: 'セイ', vi: 'Màu xanh dương', word: '青 (あお)', emoji: '🔵' },
  { id: 'ja_kanji_78', unit: 4, char: '白', kun: 'しろ', on: 'ハク', vi: 'Màu trắng', word: '白 (しろ)', emoji: '⚪' },
  { id: 'ja_kanji_79', unit: 4, char: '王', kun: 'おう', on: 'オウ', vi: 'Vị vua / Chúa tể', word: '王さま (おうさま)', emoji: '👑' },
  { id: 'ja_kanji_80', unit: 4, char: '糸', kun: 'いと', on: 'シ', vi: 'Sợi chỉ / Sợi tơ', word: '糸 (いと)', emoji: '🧵' }
];

// 4 Truyện Đọc Kinh Điển Sách Quốc Ngữ Lớp 1 Nhật Bản (小1 国語)
const JA_STORIES_DATA = [
  {
    id: 'ja_story_1',
    title: '🥕 おおきな かぶ (Củ Cải Khổng Lồ)',
    audioKey: 'ja_story_1',
    jaLines: [
      'おじいさんが かぶの たねを まきました。',
      '「あまい あまい かぶに なれ。おおきな おおきな かぶに なれ。」',
      '「うんとこしょ、どっこいしょ。」',
      'おじいさん、おばあさん、まご、いぬ、ねこ、ねずみで、とうとう かぶが ぬけました！'
    ],
    viMeaning: 'Ông lão gieo hạt củ cải ngọt và to. Ông gọi bà, cháu gái, chú chó, cô mèo và bé chuột nhắt cùng hò dô "Ưn-tô-cô-shô!" hợp sức nhổ bật được củ cải khổng lồ!',
    question: 'Trong truyện Củ cải khổng lồ, ai là bạn nhỏ cuối cùng tới kéo giúp và nhổ bật được củ cải?',
    qKey: 'ja_story_1_q',
    options: [
      { key: 'ja_st1_o1', emoji: '🐭', text: 'Chú chuột nhắt (ねずみ)', isGood: true },
      { key: 'ja_st1_o2', emoji: '🦖', text: 'Khủng long T-Rex', isGood: false },
      { key: 'ja_st1_o3', emoji: '🐘', text: 'Chú voi con', isGood: false },
      { key: 'ja_st1_o4', emoji: '🦁', text: 'Sư tử dũng mãnh', isGood: false }
    ]
  },
  {
    id: 'ja_story_2',
    title: '🐋 くじらぐも (Đám Mây Cá Voi)',
    audioKey: 'ja_story_2',
    jaLines: [
      'いちねん にくみの 子どもたちが たいそうを しています。',
      'そらに おおきな しろい くじらぐもが あらわれました。',
      '「おーい。」天まで とどけ、一、二、三！',
      'みんなで くじらぐもの せなかに のって、青い 空の たびへ しゅっぱつ！'
    ],
    viMeaning: 'Các bạn lớp 1-2 đang tập thể dục dưới sân trường thì thấy một Đám Mây Cá Voi trắng muốt trên bầu trời xanh. Cả lớp cùng nắm tay nhảy cao lên lưng mây Cá Voi bay lượn khắp bầu trời!',
    question: 'Đám mây khổng lồ trên bầu trời trong bài đọc lớp 1 có hình con gì?',
    qKey: 'ja_story_2_q',
    options: [
      { key: 'ja_st2_o1', emoji: '🐋', text: 'Con cá voi (くじら)', isGood: true },
      { key: 'ja_st2_o2', emoji: '🚗', text: 'Xe ô tô con', isGood: false },
      { key: 'ja_st2_o3', emoji: '🍎', text: 'Quả táo đỏ', isGood: false },
      { key: 'ja_st2_o4', emoji: '🐢', text: 'Con rùa vàng', isGood: false }
    ]
  },
  {
    id: 'ja_story_3',
    title: '🦝 たぬきの 糸車 (Guồng Quay Tơ Của Chú Lửng)',
    audioKey: 'ja_story_3',
    jaLines: [
      'きこりの おかみさんが まいばん いとぐるまを まわしました。',
      '「キーカラカラ、キークルクル。」',
      'いたずら たぬきも まねをして、あとで お礼に 白い いとを おりました。'
    ],
    viMeaning: 'Chú lửng nhỏ tinh nghịch ban đầu nhìn qua khe cửa bắt chước cô thợ dệt quay guồng tơ kêu "Ki-ka-ra-ka-ra". Sau khi được cô cứu thoát khỏi bẫy, chú lửng biết ơn đã chăm chỉ quay hết đống tơ trắng trả ơn cô!',
    question: 'Truyện Chú lửng và guồng quay tơ dạy Bảo Long đức tính tốt đẹp nào?',
    qKey: 'ja_story_3_q',
    options: [
      { key: 'ja_st3_o1', emoji: '💝', text: 'Biết ơn và chăm chỉ trả ơn', isGood: true },
      { key: 'ja_st3_o2', emoji: '😴', text: 'Lười biếng ngủ cả ngày', isGood: false },
      { key: 'ja_st3_o3', emoji: '🗯️', text: 'Hay cáu gắt bạn bè', isGood: false },
      { key: 'ja_st3_o4', emoji: '🙊', text: 'Nói dối người lớn', isGood: false }
    ]
  },
  {
    id: 'ja_story_4',
    title: '🐶 ずうっと ずっと 大すきだよ (Mãi Yêu Chú Chó Elf)',
    audioKey: 'ja_story_4',
    jaLines: [
      'ぼくが 小さい とき、エルフは 元気に いっしょに あそびました。',
      'まいばん ねる まえに、ぼくは エルフに いいました。',
      '「エルフ、ぼくは ずうっと ずっと 大すきだよ。」'
    ],
    viMeaning: 'Cậu bé nuôi chú chó Elf từ nhỏ. Mỗi tối trước khi đi ngủ, cậu luôn thì thầm nói với Elf: "Elf ơi, tớ mãi mãi yêu quý bạn rất nhiều!". Lời yêu thương chân thành khiến cả hai luôn ấm áp bên nhau.',
    question: 'Mỗi tối trước khi đi ngủ, cậu bé nói điều ngọt ngào gì với chú chó Elf?',
    qKey: 'ja_story_4_q',
    options: [
      { key: 'ja_st4_o1', emoji: '💖', text: 'Tớ mãi mãi yêu quý bạn!', isGood: true },
      { key: 'ja_st4_o2', emoji: '🚲', text: 'Đi mua xe đạp mới nhé!', isGood: false },
      { key: 'ja_st4_o3', emoji: '🌧️', text: 'Ngoài trời đang mưa to!', isGood: false },
      { key: 'ja_st4_o4', emoji: '🔔', text: 'Chuông đồng hồ kêu đấy!', isGood: false }
    ]
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

      function nextHira() {
        if (!jaAutoRunning) return;
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
          if (!jaAutoRunning) return;
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
      function nextKata() {
        if (!jaAutoRunning) return;
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
          if (!jaAutoRunning) return;
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
      function nextKanji() {
        if (!jaAutoRunning) return;
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
          if (!jaAutoRunning) return;
          idx++;
          jaAutoTimer = setTimeout(nextKanji, 450);
        }, cur.word);
      }
      nextKanji();
    };
  }
}

// ========================================================
// TAB 5: 4 TRUYỆN QUỐC NGỮ NHẬT LỚP 1 (小1 国語)
// ========================================================
function renderJaStoriesTab() {
  const tabs = document.getElementById('jaStoriesTabs');
  const box = document.getElementById('jaStoryReaderBox');
  if (!tabs || !box || typeof JA_STORIES_DATA === 'undefined') return;

  const st = JA_STORIES_DATA.find(s => s.id === currentJaStoryId) || JA_STORIES_DATA[0];
  tabs.innerHTML = '';
  JA_STORIES_DATA.forEach(item => {
    const b = document.createElement('button');
    b.className = `lesson-tab ${item.id === st.id ? 'active' : ''}`;
    b.innerText = item.title;
    b.onclick = () => {
      currentJaStoryId = item.id;
      window.soundMgr.playClick();
      renderJaStoriesTab();
    };
    tabs.appendChild(b);
  });

  const myNav = window.appNavEpoch || 0;
  const myJa = jaEpoch;
  box.innerHTML = `
    <div class="story-header-row">
      <h3 style="margin:0; font-size:20px; font-weight:900; color:#9f1239;">${st.title}</h3>
      <button class="challenge-btn" id="btnHearJaStory" style="padding:8px 18px; font-size:14px; background:linear-gradient(135deg,#e11d48,#be123c); border-color:#9f1239;">
        <span>🔊</span> Nghe người Nhật kể truyện
      </button>
    </div>
    <div class="story-ja-lines">
      ${st.jaLines.map(line => `<p class="story-ja-line">${line}</p>`).join('')}
    </div>
    <div class="story-vi-meaning">
      <strong>🇻🇳 Ý nghĩa tiếng Việt:</strong> ${st.viMeaning}
    </div>
    <div class="story-comp-box">
      <div class="quiz-question-box" style="margin-bottom:12px;">
        <div class="quiz-question-title" style="font-size:17px;">🎯 ${st.question}</div>
        <button class="btn-hear-hint" id="btnHearJaStoryQ" style="margin:8px auto 0 auto;"><span>🔊</span> Nghe câu hỏi &amp; 4 đáp án</button>
      </div>
      <div class="quiz-options-grid" id="jaStoryOptionsGrid"></div>
    </div>
  `;

  document.getElementById('btnHearJaStory').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(st.audioKey, null, st.jaLines.join(' '));
    addJaScore(3);
  };

  const optsGrid = document.getElementById('jaStoryOptionsGrid');
  const qBoxEl = box.querySelector('.quiz-question-box');
  const stTour = [{ key: st.qKey, fallbackText: st.question, el: qBoxEl, pauseAfterMs: 180 }];
  let locked = false;
  [...st.options].sort(() => Math.random() - 0.5).forEach(opt => {
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe lựa chọn">🔊</button>
      <div class="quiz-opt-icon">${opt.emoji}</div>
      <div class="quiz-opt-name">${opt.text}</div>
    `;
    const spk = card.querySelector('.quiz-opt-speak-btn');
    if (spk) spk.onclick = (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(opt.key, null, opt.text);
    };
    stTour.push({ key: opt.key, fallbackText: opt.text, el: card, pauseAfterMs: 110 });
    card.onclick = () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (opt.isGood) {
        locked = true;
        card.classList.add('correct');
        window.soundMgr.playCorrect();
        fireConfetti();
        addJaScore(10);
        if (typeof awardStars === 'function') awardStars(5, 'Hiểu truyện Quốc ngữ Nhật Lớp 1!');
        window.soundMgr.speakPraise(true);
      } else {
        card.classList.add('wrong');
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
      }
    };
    optsGrid.appendChild(card);
  });

  document.getElementById('btnHearJaStoryQ').onclick = () => {
    window.soundMgr.playClick();
    if ((window.appNavEpoch || 0) === myNav && jaEpoch === myJa) {
      window.soundMgr.playChoiceTour(stTour);
    }
  };
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

function initJaCanvasEvents() {
  jaCanvas = document.getElementById('jaWritingCanvas');
  if (!jaCanvas) return;
  jaCtx = jaCanvas.getContext('2d');
  jaCanvas.width = 260;
  jaCanvas.height = 260;

  function coords(e) {
    const r = jaCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (jaCanvas.width / r.width),
      y: (e.clientY - r.top) * (jaCanvas.height / r.height)
    };
  }

  jaCanvas.addEventListener('mousedown', (e) => {
    jaDrawing = true;
    const c = coords(e);
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
  jaCanvas.addEventListener('mouseup', () => { jaDrawing = false; jaCtx.closePath(); });
  jaCanvas.addEventListener('mouseleave', () => { jaDrawing = false; jaCtx.closePath(); });

  jaCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousedown', { clientX: t.clientX, clientY: t.clientY }));
  }, { passive: false });
  jaCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    jaCanvas.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX, clientY: t.clientY }));
  }, { passive: false });
  jaCanvas.addEventListener('touchend', () => {
    jaCanvas.dispatchEvent(new MouseEvent('mouseup', {}));
  });

  document.getElementById('btnJaClear')?.addEventListener('click', () => {
    window.soundMgr.playClick();
    drawJaMasumeGuide();
  });

  document.getElementById('btnJaFinish')?.addEventListener('click', () => {
    window.soundMgr.playCorrect();
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playAudioFile('cheer_ja_good', null, 'Yoku dekimashita!');
    if (typeof awardStars === 'function') awardStars(2, `Viết đẹp chữ Nhật "${jaWriteChar}"!`);
    addJaScore(2);
  });

  document.querySelectorAll('.ja-color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.ja-color-dot').forEach(d => d.classList.remove('active-dot'));
      dot.classList.add('active-dot');
      jaBrushColor = dot.dataset.color;
      window.soundMgr.playClick();
    });
  });
}

function drawJaMasumeGuide() {
  if (!jaCtx || !jaCanvas) return;
  const w = jaCanvas.width;
  const h = jaCanvas.height;
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

  // Chữ mẫu mờ to rõ giữa ô vuông
  jaCtx.setLineDash([]);
  jaCtx.font = 'bold 170px "Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif';
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
    romaji: kj.kun,
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
