// Dữ liệu học tiếng Việt cho Bé Bảo Long (6 tuổi - sống tại Nhật Bản)
// Chuẩn hóa phát âm và đánh vần ngữ âm tiếng Việt chuẩn: BỜ A BA, ĐỜ A ĐA, CỜ A CA, CA E KÉ...
// Kho từ vựng 8 bài + 11 Phụ âm ghép + 5 bài Tập Đánh Vần + Thế giới Khủng Long & Xe Cộ ảnh thật + 7 Minigames

const ALPHABET_DATA = [
  { char: 'A', lower: 'a', phonetic: 'a', word: 'Gà', example: 'con gà', icon: '🐔', ja: 'にわとり (Niwatori)' },
  { char: 'Ă', lower: 'ă', phonetic: 'á', word: 'Mặt trăng', example: 'mặt trăng', icon: '🌙', ja: 'つき (Tsuki)' },
  { char: 'Â', lower: 'â', phonetic: 'ớ (cây)', word: 'Cây', example: 'cái cây', icon: '🌳', ja: 'き (Ki)' },
  { char: 'B', lower: 'b', phonetic: 'bờ', word: 'Bò', example: 'con bò', icon: '🐮', ja: 'うし (Ushi)' },
  { char: 'C', lower: 'c', phonetic: 'cờ', word: 'Cá', example: 'con cá', icon: '🐟', ja: 'さかな (Sakana)' },
  { char: 'D', lower: 'd', phonetic: 'dờ', word: 'Dê', example: 'con dê', icon: '🐐', ja: 'ヤギ (Yagi)' },
  { char: 'Đ', lower: 'đ', phonetic: 'đờ', word: 'Đá', example: 'hòn đá', icon: '🪨', ja: 'いし (Ishi)' },
  { char: 'E', lower: 'e', phonetic: 'e', word: 'Me', example: 'quả me', icon: '🌿', ja: 'タマリンド' },
  { char: 'Ê', lower: 'ê', phonetic: 'ê', word: 'Bếp', example: 'cái bếp', icon: '🍳', ja: 'キッチン (Kitchin)' },
  { char: 'G', lower: 'g', phonetic: 'gờ', word: 'Gỗ', example: 'khúc gỗ', icon: '🪵', ja: 'き (Ki - Gỗ)' },
  { char: 'H', lower: 'h', phonetic: 'hờ', word: 'Hoa', example: 'bông hoa', icon: '🌸', ja: 'はな (Hana)' },
  { char: 'I', lower: 'i', phonetic: 'i', word: 'Bi', example: 'viên bi', icon: '🔮', ja: 'ビー玉 (Biidama)' },
  { char: 'K', lower: 'k', phonetic: 'ca', word: 'Kéo', example: 'cái kéo', icon: '✂️', ja: 'はさみ (Hasami)' },
  { char: 'L', lower: 'l', phonetic: 'lờ', word: 'Lá', example: 'chiếc lá', icon: '🍃', ja: 'はっぱ (Happa)' },
  { char: 'M', lower: 'm', phonetic: 'mờ', word: 'Mèo', example: 'con mèo', icon: '🐱', ja: 'ねこ (Neko)' },
  { char: 'N', lower: 'n', phonetic: 'nờ', word: 'Nơ', example: 'cái nơ', icon: '🎀', ja: 'リボン (Ribon)' },
  { char: 'O', lower: 'o', phonetic: 'o', word: 'Ong', example: 'con ong', icon: '🐝', ja: 'ハチ (Hachi)' },
  { char: 'Ô', lower: 'ô', phonetic: 'ô', word: 'Ô dù', example: 'cái ô dù', icon: '☂️', ja: 'かさ (Kasa)' },
  { char: 'Ơ', lower: 'ơ', phonetic: 'ơ', word: 'Cờ', example: 'lá cờ', icon: '🚩', ja: 'はた (Hata)' },
  { char: 'P', lower: 'p', phonetic: 'pờ', word: 'Pin', example: 'cục pin', icon: '🔋', ja: 'でんち (Denchi)' },
  { char: 'Q', lower: 'q', phonetic: 'cu', word: 'Quạt', example: 'cái quạt', icon: '🪭', ja: 'せんぷうき (Quạt)' },
  { char: 'R', lower: 'r', phonetic: 'rờ', word: 'Rùa', example: 'con rùa', icon: '🐢', ja: 'かめ (Kame)' },
  { char: 'S', lower: 's', phonetic: 'sờ (uốn lưỡi)', word: 'Sách', example: 'quyển sách', icon: '📚', ja: 'ほん (Hon)' },
  { char: 'T', lower: 't', phonetic: 'tờ', word: 'Tàu', example: 'tàu hỏa', icon: '🚅', ja: 'しんかんせん' },
  { char: 'U', lower: 'u', phonetic: 'u', word: 'Cú', example: 'con cú', icon: '🦉', ja: 'ふくろう (Fukurou)' },
  { char: 'Ư', lower: 'ư', phonetic: 'ư', word: 'Sư tử', example: 'sư tử', icon: '🦁', ja: 'ライオン (Raion)' },
  { char: 'V', lower: 'v', phonetic: 'vờ', word: 'Voi', example: 'con voi', icon: '🐘', ja: 'ぞう (Zou)' },
  { char: 'X', lower: 'x', phonetic: 'xờ (nhẹ)', word: 'Xe', example: 'xe ô tô', icon: '🚗', ja: 'くるま (Kuruma)' },
  { char: 'Y', lower: 'y', phonetic: 'i dài', word: 'Y tá', example: 'y tá', icon: '👩‍⚕️', ja: 'かんごし (Kangoshi)' }
];

// 11 PHỤ ÂM GHÉP TIẾNG VIỆT QUAN TRỌNG (MỚI - Dành cho bé Lớp 1)
const DIGRAPH_DATA = [
  { char: 'CH', lower: 'ch', phonetic: 'chờ', word: 'Chó', icon: '🐶', ja: 'いぬ (Inu)', rule: 'Thường gặp: chim, chó, chuối' },
  { char: 'GH', lower: 'gh', phonetic: 'gờ ghép', word: 'Ghế', icon: '🪑', ja: 'いす (Isu)', rule: 'Mẹo nhớ: GH chỉ đi với e, ê, i' },
  { char: 'GI', lower: 'gi', phonetic: 'giờ', word: 'Gió', icon: '💨', ja: 'かぜ (Kaze)', rule: 'Đọc nhẹ nhàng: gió, giỏ, giữ' },
  { char: 'KH', lower: 'kh', phonetic: 'khờ', word: 'Khỉ', icon: '🐒', ja: 'さる (Saru)', rule: 'Bật hơi nhẹ từ cổ họng: khỉ, khế' },
  { char: 'NG', lower: 'ng', phonetic: 'ngờ', word: 'Ngựa', icon: '🐴', ja: 'うま (Uma)', rule: 'Đi với a, ă, â, o, ô, ơ, u, ư' },
  { char: 'NGH', lower: 'ngh', phonetic: 'ngờ ghép', word: 'Nghé', icon: '🐃', ja: '子水牛 (Nghé)', rule: 'Mẹo nhớ: NGH chỉ đi với e, ê, i' },
  { char: 'NH', lower: 'nh', phonetic: 'nhờ', word: 'Nho', icon: '🍇', ja: 'ぶどう (Budou)', rule: 'Chữ ghép rất hay dùng: nhà, nho' },
  { char: 'PH', lower: 'ph', phonetic: 'phờ', word: 'Phở', icon: '🍜', ja: 'フォー (Pho)', rule: 'Phát âm nhẹ môi: phở, phố, pháo' },
  { char: 'QU', lower: 'qu', phonetic: 'quờ', word: 'Quạt', icon: '🪭', ja: 'せんぷうき', rule: 'Chữ Q luôn đi cùng U thành QU' },
  { char: 'TH', lower: 'th', phonetic: 'thờ', word: 'Thỏ', icon: '🐇', ja: 'うさぎ (Usagi)', rule: 'Đầu lưỡi đẩy hơi nhẹ: thỏ, thư' },
  { char: 'TR', lower: 'tr', phonetic: 'trờ (cong lưỡi)', word: 'Trứng', icon: '🥚', ja: 'たまご (Tamago)', rule: 'Uốn cong đầu lưỡi: trăng, trứng' }
];

const TONES_DATA = [
  { key: 'ngang', name: 'Thanh Ngang (Không dấu)', sign: '—', example: 'ba (bố)', audioText: 'Thanh ngang. ba', desc: 'Giọng đọc đều, bằng phẳng' },
  { key: 'sac', name: 'Dấu Sắc', sign: '´', example: 'bá, cá, bé', audioText: 'Dấu sắc. cá, bé', desc: 'Giọng lên cao vút' },
  { key: 'huyen', name: 'Dấu Huyền', sign: '`', example: 'bà, bò, gà', audioText: 'Dấu huyền. bà, bò, gà', desc: 'Giọng hạ thấp êm đềm' },
  { key: 'hoi', name: 'Dấu Hỏi', sign: '?', example: 'bả, hổ, thỏ', audioText: 'Dấu hỏi. hổ, thỏ', desc: 'Giọng lượn sóng xuống rồi lên' },
  { key: 'nga', name: 'Dấu Ngã', sign: '~', example: 'bã, sữa, vẽ', audioText: 'Dấu ngã. sữa, vẽ', desc: 'Giọng ngắt rồi lên cao' },
  { key: 'nang', name: 'Dấu Nặng', sign: '.', example: 'bạ, mẹ, vẹt', audioText: 'Dấu nặng. mẹ, vẹt', desc: 'Giọng đọc gọn, dứt khoát' }
];

const VOCAB_LESSONS = [
  {
    id: 1,
    title: 'Bài 1: Từ 1 tiếng, 2 chữ cái – Rất dễ',
    subtitle: 'Làm quen các từ đầu tiên thân quen nhất với bé',
    words: [
      { id: 'w1', word: 'ba', breakdown: 'b - a', tone: 'Ngang', icon: '👨', ja: 'お父さん (Otousan)', spellText: 'Bờ - a - ba', example: 'Ba yêu Bảo Long' },
      { id: 'w2', word: 'bà', breakdown: 'b - a - huyền', tone: 'Huyền', icon: '👵', ja: 'おばあさん (Obaasan)', spellText: 'Bờ - a - ba - huyền - bà', example: 'Bà hiền từ của Bảo Long' },
      { id: 'w3', word: 'bố', breakdown: 'b - ô - sắc', tone: 'Sắc', icon: '🧔', ja: 'お父さん (Bố / Papa)', spellText: 'Bờ - ô - bô - sắc - bố', example: 'Bố của Bảo Long' },
      { id: 'w4', word: 'mẹ', breakdown: 'm - e - nặng', tone: 'Nặng', icon: '👩', ja: 'お母さん (Okaasan)', spellText: 'Mờ - e - me - nặng - mẹ', example: 'Mẹ yêu Bảo Long nhất' },
      { id: 'w5', word: 'bé', breakdown: 'b - e - sắc', tone: 'Sắc', icon: '👶', ja: 'あかちゃん / 子ども (Bé)', spellText: 'Bờ - e - be - sắc - bé', example: 'Bé Bảo Long chăm ngoan' },
      { id: 'w6', word: 'bò', breakdown: 'b - o - huyền', tone: 'Huyền', icon: '🐮', ja: 'うし (Ushi)', spellText: 'Bờ - o - bo - huyền - bò', example: 'Con bò sữa' },
      { id: 'w7', word: 'gà', breakdown: 'g - a - huyền', tone: 'Huyền', icon: '🐔', ja: 'にわとり (Niwatori)', spellText: 'Gờ - a - ga - huyền - gà', example: 'Con gà gáy ò ó o' },
      { id: 'w8', word: 'cá', breakdown: 'c - a - sắc', tone: 'Sắc', icon: '🐟', ja: 'さかな (Sakana)', spellText: 'cờ - a - ca - sắc - cá', example: 'Con cá bơi lội' },
      { id: 'w9', word: 'lá', breakdown: 'l - a - sắc', tone: 'Sắc', icon: '🍃', ja: 'はっぱ (Happa)', spellText: 'Lờ - a - la - sắc - lá', example: 'Chiếc lá màu xanh' },
      { id: 'w10', word: 'đá', breakdown: 'đ - a - sắc', tone: 'Sắc', icon: '🪨', ja: 'いし (Ishi)', spellText: 'Đờ - a - đa - sắc - đá', example: 'Hòn đá cuội' }
    ]
  },
  {
    id: 2,
    title: 'Bài 2: Gia đình & loài vật bé yêu',
    subtitle: 'Mở rộng vốn từ thân thuộc hàng ngày',
    words: [
      { id: 'w11', word: 'chó', breakdown: 'ch - o - sắc', tone: 'Sắc', icon: '🐶', ja: 'いぬ (Inu)', spellText: 'Chờ - o - cho - sắc - chó', example: 'Chú chó tinh nghịch' },
      { id: 'w12', word: 'mèo', breakdown: 'm - eo - huyền', tone: 'Huyền', icon: '🐱', ja: 'ねこ (Neko)', spellText: 'Mờ - eo - meo - huyền - mèo', example: 'Con mèo bắt chuột' },
      { id: 'w13', word: 'dê', breakdown: 'd - ê', tone: 'Ngang', icon: '🐐', ja: 'ヤギ (Yagi)', spellText: 'Dờ - ê - dê', example: 'Con dê kêu be be' },
      { id: 'w14', word: 'vịt', breakdown: 'v - it - nặng', tone: 'Nặng', icon: '🦆', ja: 'かも / あひる (Ahiru)', spellText: 'Vờ - it - vit - nặng - vịt', example: 'Con vịt bơi dưới ao' },
      { id: 'w15', word: 'chú', breakdown: 'ch - u - sắc', tone: 'Sắc', icon: '👨‍💼', ja: 'おじさん (Ojisan)', spellText: 'Chờ - u - chu - sắc - chú', example: 'Chú của bé' },
      { id: 'w16', word: 'cô', breakdown: 'c - ô', tone: 'Ngang', icon: '👩‍🏫', ja: 'おばさん / 先生 (Cô)', spellText: 'cờ - ô - cô', example: 'Cô giáo dạy Bảo Long học' },
      { id: 'w17', word: 'dì', breakdown: 'd - i - huyền', tone: 'Huyền', icon: '👩‍🦰', ja: 'おばさん (Dì)', spellText: 'Dờ - i - di - huyền - dì', example: 'Dì mua quà cho Bảo Long' },
      { id: 'w18', word: 'hoa', breakdown: 'h - oa', tone: 'Ngang', icon: '🌸', ja: 'はな (Hana)', spellText: 'Hờ - oa - hoa', example: 'Bông hoa nở rộ' },
      { id: 'w19', word: 'xe', breakdown: 'x - e', tone: 'Ngang', icon: '🚗', ja: 'くるま (Kuruma)', spellText: 'Xờ - e - xe', example: 'Xe ô tô chạy bon bon' },
      { id: 'w20', word: 'tàu', breakdown: 't - au - huyền', tone: 'Huyền', icon: '🚅', ja: '新幹線 / でんしゃ (Shinkansen)', spellText: 'Tờ - au - tau - huyền - tàu', example: 'Tàu điện shinkansen' }
    ]
  },
  {
    id: 3,
    title: 'Bài 3: Đồ vật & Thức ăn bé thích',
    subtitle: 'Các từ quen thuộc trong bữa ăn và góc học tập',
    words: [
      { id: 'w21', word: 'cơm', breakdown: 'c - ơm', tone: 'Ngang', icon: '🍚', ja: 'ごはん (Gohan)', spellText: 'Cờ - ơm - cơm', example: 'Bảo Long ăn cơm ngoan' },
      { id: 'w22', word: 'sữa', breakdown: 's - ưa - ngã', tone: 'Ngã', icon: '🥛', ja: 'ぎゅうにゅう (Gyuunyuu)', spellText: 'Sờ - ưa - sưa - ngã - sữa', example: 'Sữa tươi thơm ngon' },
      { id: 'w23', word: 'táo', breakdown: 't - ao - sắc', tone: 'Sắc', icon: '🍎', ja: 'りんご (Ringo)', spellText: 'Tờ - ao - tao - sắc - táo', example: 'Quả táo đỏ' },
      { id: 'w24', word: 'chuối', breakdown: 'ch - uôi - sắc', tone: 'Sắc', icon: '🍌', ja: 'バナナ (Banana)', spellText: 'Chờ - uôi - chuôi - sắc - chuối', example: 'Quả chuối ngọt' },
      { id: 'w25', word: 'kẹo', breakdown: 'k - eo - nặng', tone: 'Nặng', icon: '🍬', ja: 'あめ (Ame / Kyandi)', spellText: 'ca - eo - keo - nặng - kẹo', example: 'Viên kẹo ngọt ngào' },
      { id: 'w26', word: 'bút', breakdown: 'b - ut - sắc', tone: 'Sắc', icon: '✏️', ja: 'えんぴつ (Enpitsu)', spellText: 'Bờ - ut - but - sắc - bút', example: 'Bút chì tập viết' },
      { id: 'w27', word: 'vở', breakdown: 'v - ơ - hỏi', tone: 'Hỏi', icon: '📓', ja: 'ノート (Nooto)', spellText: 'Vờ - ơ - vơ - hỏi - vở', example: 'Quyển vở sạch đẹp' },
      { id: 'w28', word: 'bóng', breakdown: 'b - ong - sắc', tone: 'Sắc', icon: '⚽', ja: 'ボール (Booru)', spellText: 'Bờ - ong - bong - sắc - bóng', example: 'Bảo Long chơi đá bóng' },
      { id: 'w29', word: 'mũ', breakdown: 'm - u - ngã', tone: 'Ngã', icon: '🧢', ja: 'ぼうし (Boushi)', spellText: 'Mờ - u - mu - ngã - mũ', example: 'Chiếc mũ che nắng' },
      { id: 'w30', word: 'nước', breakdown: 'n - ươc - sắc', tone: 'Sắc', icon: '💧', ja: 'みず (Mizu)', spellText: 'Nờ - ươc - nươc - sắc - nước', example: 'Bảo Long uống nước lọc' }
    ]
  },
  {
    id: 4,
    title: 'Bài 4: Màu sắc & Hình khối vui nhộn',
    subtitle: 'Thế giới màu sắc rực rỡ và hình học cơ bản',
    words: [
      { id: 'w31', word: 'đỏ', breakdown: 'đ - o - hỏi', tone: 'Hỏi', icon: '🔴', ja: 'あか (Aka - Đỏ)', spellText: 'Đờ - o - đo - hỏi - đỏ', example: 'Màu đỏ rực rỡ' },
      { id: 'w32', word: 'vàng', breakdown: 'v - ang - huyền', tone: 'Huyền', icon: '🟡', ja: 'きいろ (Kiiro - Vàng)', spellText: 'Vờ - ang - vang - huyền - vàng', example: 'Màu vàng tươi sáng' },
      { id: 'w33', word: 'xanh', breakdown: 'x - anh', tone: 'Ngang', icon: '🟢', ja: 'みどり / あお (Xanh)', spellText: 'Xờ - anh - xanh', example: 'Bầu trời màu xanh' },
      { id: 'w34', word: 'tím', breakdown: 't - im - sắc', tone: 'Sắc', icon: '🟣', ja: 'むらさき (Murasaki - Tím)', spellText: 'Tờ - im - tim - sắc - tím', example: 'Bông hoa màu tím' },
      { id: 'w35', word: 'cam', breakdown: 'c - am', tone: 'Ngang', icon: '🟠', ja: 'オレンジ (Orenji - Cam)', spellText: 'cờ - am - cam', example: 'Quả cam màu cam' },
      { id: 'w36', word: 'hồng', breakdown: 'h - ông - huyền', tone: 'Huyền', icon: '🌸', ja: 'ピンク (Pinku - Hồng)', spellText: 'Hờ - ông - hông - huyền - hồng', example: 'Cánh hoa màu hồng' },
      { id: 'w37', word: 'tròn', breakdown: 'tr - on - huyền', tone: 'Huyền', icon: '⚪', ja: 'まる (Maru - Hình tròn)', spellText: 'Trờ - on - tron - huyền - tròn', example: 'Quả bóng hình tròn' },
      { id: 'w38', word: 'vuông', breakdown: 'v - uông', tone: 'Ngang', icon: '⏹️', ja: 'しかく (Shikaku - Hình vuông)', spellText: 'Vờ - uông - vuông', example: 'Chiếc hộp hình vuông' }
    ]
  },
  {
    id: 5,
    title: 'Bài 5: Cơ thể bé khỏe mạnh',
    subtitle: 'Các bộ phận trên cơ thể bé Bảo Long',
    words: [
      { id: 'w39', word: 'tay', breakdown: 't - ay', tone: 'Ngang', icon: '🖐️', ja: 'て (Te - Bàn tay)', spellText: 'Tờ - ay - tay', example: 'Bàn tay xinh của Bảo Long' },
      { id: 'w40', word: 'chân', breakdown: 'ch - ân', tone: 'Ngang', icon: '🦶', ja: 'あし (Ashi - Bàn chân)', spellText: 'Chờ - ân - chân', example: 'Đôi chân chạy nhanh' },
      { id: 'w41', word: 'mắt', breakdown: 'm - ăt - sắc', tone: 'Sắc', icon: '👀', ja: 'め (Me - Mắt)', spellText: 'Mờ - ăt - măt - sắc - mắt', example: 'Đôi mắt sáng long lanh' },
      { id: 'w42', word: 'mũi', breakdown: 'm - ui - ngã', tone: 'Ngã', icon: '👃', ja: 'はな (Hana - Mũi)', spellText: 'Mờ - ui - mui - ngã - mũi', example: 'Chiếc mũi nhỏ xinh' },
      { id: 'w43', word: 'tai', breakdown: 't - ai', tone: 'Ngang', icon: '👂', ja: 'みみ (Mimi - Tai)', spellText: 'Tờ - ai - tai', example: 'Đôi tai lắng nghe cô giáo' },
      { id: 'w44', word: 'miệng', breakdown: 'm - iêng - nặng', tone: 'Nặng', icon: '👄', ja: 'くち (Kuchi - Miệng)', spellText: 'Mờ - iêng - miêng - nặng - miệng', example: 'Miệng cười tươi' },
      { id: 'w45', word: 'răng', breakdown: 'r - ăng', tone: 'Ngang', icon: '🦷', ja: 'は (Ha - Răng)', spellText: 'Rờ - ăng - răng', example: 'Hàm răng trắng tinh' },
      { id: 'w46', word: 'tóc', breakdown: 't - oc - sắc', tone: 'Sắc', icon: '💇', ja: 'かみ (Kami - Tóc)', spellText: 'Tờ - oc - toc - sắc - tóc', example: 'Mái tóc đen nhánh' }
    ]
  },
  {
    id: 6,
    title: 'Bài 6: Thiên nhiên & Bầu trời',
    subtitle: 'Mặt trời, biển xanh, mây trắng kỳ thú',
    words: [
      { id: 'w47', word: 'mặt trời', breakdown: 'm - ăt - nặng, tr - ơi - huyền', tone: 'Nặng & Huyền', icon: '☀️', ja: 'たいよう (Taiyou)', spellText: 'Mờ - ăt - măt - nặng - mặt, trờ - ơi - trơi - huyền - trời -> mặt trời', example: 'Mặt trời buổi sáng bình minh' },
      { id: 'w48', word: 'mặt trăng', breakdown: 'm - ăt - nặng, tr - ăng', tone: 'Nặng & Ngang', icon: '🌙', ja: 'つき (Tsuki)', spellText: 'Mờ - ăt - măt - nặng - mặt, trờ - ăng - trăng -> mặt trăng', example: 'Mặt trăng tròn vằng vặc' },
      { id: 'w49', word: 'mây', breakdown: 'm - ây', tone: 'Ngang', icon: '☁️', ja: 'くも (Kumo)', spellText: 'Mờ - ây - mây', example: 'Đám mây bồng bềnh' },
      { id: 'w50', word: 'mưa', breakdown: 'm - ưa', tone: 'Ngang', icon: '🌧️', ja: 'あめ (Ame)', spellText: 'Mờ - ưa - mưa', example: 'Cơn mưa tưới mát cây cối' },
      { id: 'w51', word: 'nắng', breakdown: 'n - ăng - sắc', tone: 'Sắc', icon: '🌤️', ja: 'ひざし (Hizashi)', spellText: 'Nờ - ăng - năng - sắc - nắng', example: 'Ánh nắng ấm áp' },
      { id: 'w52', word: 'gió', breakdown: 'gi - o - sắc', tone: 'Sắc', icon: '💨', ja: 'かぜ (Kaze)', spellText: 'Giờ - o - gio - sắc - gió', example: 'Làn gió mát rượi' },
      { id: 'w53', word: 'biển', breakdown: 'b - iên - hỏi', tone: 'Hỏi', icon: '🌊', ja: 'うみ (Umi)', spellText: 'Bờ - iên - biên - hỏi - biển', example: 'Bãi biển sóng vỗ dạt dào' },
      { id: 'w54', word: 'núi', breakdown: 'n - ui - sắc', tone: 'Sắc', icon: '⛰️', ja: 'やま (Yama)', spellText: 'Nờ - ui - nui - sắc - núi', example: 'Núi Phú Sĩ tuyết trắng' },
      { id: 'w55', word: 'sông', breakdown: 's - ông', tone: 'Ngang', icon: '🏞️', ja: 'かわ (Kawa)', spellText: 'Sờ - ông - sông', example: 'Dòng sông nước trong xanh' }
    ]
  },
  {
    id: 7,
    title: 'Bài 7: Trái cây ngọt lành bé yêu',
    subtitle: 'Những loại quả thơm ngon bổ dưỡng',
    words: [
      { id: 'w56', word: 'dưa hấu', breakdown: 'd - ưa, h - âu - sắc', tone: 'Ngang & Sắc', icon: '🍉', ja: 'スイカ (Suika)', spellText: 'Dờ - ưa - dưa, hờ - âu - hâu - sắc - hấu -> dưa hấu', example: 'Miếng dưa hấu đỏ ngọt lịm' },
      { id: 'w57', word: 'xoài', breakdown: 'x - oai - huyền', tone: 'Huyền', icon: '🥭', ja: 'マンゴー (Mangoo)', spellText: 'Xờ - oai - xoai - huyền - xoài', example: 'Quả xoài chín vàng' },
      { id: 'w58', word: 'ổi', breakdown: 'ô - i - hỏi', tone: 'Hỏi', icon: '🍈', ja: 'グアバ (Guaba)', spellText: 'Ô - i - ôi - hỏi - ổi', example: 'Quả ổi giòn ngọt' },
      { id: 'w59', word: 'nho', breakdown: 'nh - o', tone: 'Ngang', icon: '🍇', ja: 'ぶどう (Budou)', spellText: 'Nhờ - o - nho', example: 'Chùm nho tím ngọt ngào' },
      { id: 'w60', word: 'dâu tây', breakdown: 'd - âu, t - ây', tone: 'Ngang', icon: '🍓', ja: 'いちご (Ichigo)', spellText: 'Dờ - âu - dâu, tờ - ây - tây -> dâu tây', example: 'Quả dâu tây đỏ mọng ngon tuyệt' },
      { id: 'w103', word: 'chuối', breakdown: 'ch - uôi - sắc', tone: 'Sắc', icon: '🍌', ja: 'バナナ (Banana)', spellText: 'Chờ - uôi - chuôi - sắc - chuối', example: 'Nải chuối chín vàng thơm ngọt' },
      { id: 'w104', word: 'táo', breakdown: 't - ao - sắc', tone: 'Sắc', icon: '🍎', ja: 'りんご (Ringo)', spellText: 'Tờ - ao - tao - sắc - táo', example: 'Quả táo đỏ giòn ngọt' },
      { id: 'w105', word: 'dừa', breakdown: 'd - ưa - huyền', tone: 'Huyền', icon: '🥥', ja: 'ココナッツ (Kokonattsu)', spellText: 'Dờ - ưa - dưa - huyền - dừa', example: 'Quả dừa tươi nhiều nước mát' }
    ]
  },
  {
    id: 8,
    title: 'Bài 8: Hành động vui nhộn hàng ngày',
    subtitle: 'Các động từ sinh động giúp bé nói tiếng Việt tự nhiên',
    words: [
      { id: 'w61', word: 'chạy', breakdown: 'ch - ay - nặng', tone: 'Nặng', icon: '🏃', ja: 'はしる (Hashiru - Chạy)', spellText: 'Chờ - ay - chay - nặng - chạy', example: 'Bảo Long chạy thi thật nhanh' },
      { id: 'w62', word: 'nhảy', breakdown: 'nh - ay - hỏi', tone: 'Hỏi', icon: '🦘', ja: 'とぶ (Tobu - Nhảy)', spellText: 'Nhờ - ay - nhay - hỏi - nhảy', example: 'Bé nhảy cao như chú chuột túi' },
      { id: 'w63', word: 'cười', breakdown: 'c - ươi - huyền', tone: 'Huyền', icon: '😄', ja: 'わらう (Warau - Cười)', spellText: 'Cờ - ươi - cươi - huyền - cười', example: 'Bảo Long cười tươi rạng rỡ' },
      { id: 'w64', word: 'ngủ', breakdown: 'ng - u - hỏi', tone: 'Hỏi', icon: '😴', ja: 'ねる (Neru - Ngủ)', spellText: 'Ngờ - u - ngu - hỏi - ngủ', example: 'Bé đi ngủ sớm để cao lớn' },
      { id: 'w65', word: 'ăn', breakdown: 'ă - n', tone: 'Ngang', icon: '🍽️', ja: 'たべる (Taberu - Ăn)', spellText: 'Á - nờ - ăn', example: 'Bảo Long ăn cơm giỏi quá' },
      { id: 'w66', word: 'uống', breakdown: 'uông - sắc', tone: 'Sắc', icon: '🥤', ja: 'のむ (Nomu - Uống)', spellText: 'U - ô - ngờ - uông - sắc - uống', example: 'Uống sữa mỗi ngày cho khỏe mạnh' },
      { id: 'w67', word: 'đọc', breakdown: 'đ - oc - nặng', tone: 'Nặng', icon: '📖', ja: 'よむ (Yomu - Đọc)', spellText: 'Đờ - oc - đoc - nặng - đọc', example: 'Bảo Long đọc sách tiếng Việt' },
      { id: 'w68', word: 'viết', breakdown: 'v - iêt - sắc', tone: 'Sắc', icon: '✍️', ja: 'かく (Kaku - Viết)', spellText: 'Vờ - iêt - viêt - sắc - viết', example: 'Bé tập viết chữ đẹp nắn nót' },
      { id: 'w69', word: 'hát', breakdown: 'h - at - sắc', tone: 'Sắc', icon: '🎤', ja: 'うたう (Utau - Hát)', spellText: 'Hờ - at - hat - sắc - hát', example: 'Cả nhà cùng hát vui ca' },
      { id: 'w70', word: 'vẽ', breakdown: 'v - e - ngã', tone: 'Ngã', icon: '🎨', ja: 'かく (E wo kaku - Vẽ)', spellText: 'Vờ - e - ve - ngã - vẽ', example: 'Bảo Long vẽ chú khủng long T-Rex' }
    ]
  },
  {
    id: 9,
    title: 'Bài 9: Mái trường mến yêu & Bạn bè (HK2)',
    subtitle: 'Từ vựng trường tiểu học lớp 1 kết nối tri thức',
    words: [
      { id: 'w71', word: 'cô giáo', breakdown: 'c - ô, gi - ao - sắc', tone: 'Ngang & Sắc', icon: '👩‍🏫', ja: 'せんせい (Sensei)', spellText: 'Cờ - ô - cô, giờ - ao - giao - sắc - giáo -> cô giáo', example: 'Cô giáo giảng bài rất hay' },
      { id: 'w72', word: 'thầy giáo', breakdown: 'th - ây - huyền, gi - ao - sắc', tone: 'Huyền & Sắc', icon: '👨‍🏫', ja: 'せんせい (Thầy giáo)', spellText: 'Thờ - ây - thây - huyền - thầy, giờ - ao - giao - sắc - giáo -> thầy giáo', example: 'Thầy giáo dạy thể dục' },
      { id: 'w73', word: 'lớp học', breakdown: 'l - ơp - sắc, h - oc - nặng', tone: 'Sắc & Nặng', icon: '🏫', ja: 'きょうしつ (Kyoushitsu)', spellText: 'Lờ - ơp - lơp - sắc - lớp, hờ - oc - hoc - nặng - học -> lớp học', example: 'Lớp học một A sạch đẹp' },
      { id: 'w74', word: 'bảng đen', breakdown: 'b - ang - hỏi, đ - en', tone: 'Hỏi & Ngang', icon: '⬛', ja: 'こくばん (Kokuban)', spellText: 'Bờ - ang - bang - hỏi - bảng, đờ - en - đen -> bảng đen', example: 'Cô viết chữ đẹp lên bảng đen' },
      { id: 'w75', word: 'thước kẻ', breakdown: 'th - ươc - sắc, k - e - hỏi', tone: 'Sắc & Hỏi', icon: '📏', ja: 'じょうぎ (Jougi)', spellText: 'Thờ - ươc - thươc - sắc - thước, ca - e - ke - hỏi - kẻ -> thước kẻ', example: 'Dùng thước kẻ đo độ dài' },
      { id: 'w76', word: 'cục tẩy', breakdown: 'c - uc - nặng, t - ây - hỏi', tone: 'Nặng & Hỏi', icon: '🧼', ja: 'けしごむ (Keshigomu)', spellText: 'Cờ - uc - cuc - nặng - cục, tờ - ây - tây - hỏi - tẩy -> cục tẩy', example: 'Cục tẩy xóa nét bút chì' },
      { id: 'w77', word: 'cặp sách', breakdown: 'c - ăp - nặng, s - ach - sắc', tone: 'Nặng & Sắc', icon: '🎒', ja: 'ランドセル (Randoseru)', spellText: 'Cờ - ăp - căp - nặng - cặp, sờ - ach - sach - sắc - sách -> cặp sách', example: 'Bảo Long tự đeo cặp sách đi học' },
      { id: 'w78', word: 'bạn bè', breakdown: 'b - an - nặng, b - e - huyền', tone: 'Nặng & Huyền', icon: '🤝', ja: 'ともだち (Tomodachi)', spellText: 'Bờ - an - ban - nặng - bạn, bờ - e - be - huyền - bè -> bạn bè', example: 'Bạn bè vui chơi đoàn kết' }
    ]
  },
  {
    id: 10,
    title: 'Bài 10: Quê hương Việt Nam & Lễ hội (HK2)',
    subtitle: 'Tự hào cội nguồn Việt Nam tươi đẹp',
    words: [
      { id: 'w79', word: 'việt nam', breakdown: 'v - iêt - nặng, n - am', tone: 'Nặng & Ngang', icon: '🇻🇳', ja: 'ベトナム (Betonamu)', spellText: 'Vờ - iêt - viêt - nặng - việt, nờ - am - nam -> việt nam', example: 'Bảo Long yêu quê hương Việt Nam' },
      { id: 'w80', word: 'hà nội', breakdown: 'h - a - huyền, n - ôi - nặng', tone: 'Huyền & Nặng', icon: '🏛️', ja: 'ハノイ (Hanoi)', spellText: 'Hờ - a - ha - huyền - hà, nờ - ôi - nôi - nặng - nội -> hà nội', example: 'Thủ đô Hà Nội nghìn năm văn hiến' },
      { id: 'w81', word: 'hoa sen', breakdown: 'h - oa, s - en', tone: 'Ngang', icon: '🪷', ja: 'はすのはな (Hoa sen)', spellText: 'Hờ - oa - hoa, sờ - en - sen -> hoa sen', example: 'Hoa sen hồng nở trong đầm' },
      { id: 'w82', word: 'áo dài', breakdown: 'ao - sắc, d - ai - huyền', tone: 'Sắc & Huyền', icon: '👘', ja: 'アオザイ (Ao dai)', spellText: 'A - o - ao - sắc - áo, dờ - ai - dai - huyền - dài -> áo dài', example: 'Mẹ mặc áo dài thật duyên dáng' },
      { id: 'w83', word: 'bánh chưng', breakdown: 'b - anh - sắc, ch - ưng', tone: 'Sắc & Ngang', icon: '🟩', ja: 'バインチュン (Bánh Tết)', spellText: 'Bờ - anh - banh - sắc - bánh, chờ - ưng - chưng -> bánh chưng', example: 'Tết Việt Nam có bánh chưng xanh' },
      { id: 'w84', word: 'hoa đào', breakdown: 'h - oa, đ - ao - huyền', tone: 'Ngang & Huyền', icon: '🌸', ja: 'もものはな (Hoa đào)', spellText: 'Hờ - oa - hoa, đờ - ao - đao - huyền - đào -> hoa đào', example: 'Cành hoa đào hồng thắm mùa xuân' },
      { id: 'w85', word: 'trống đồng', breakdown: 'tr - ông - sắc, đ - ông - huyền', tone: 'Sắc & Huyền', icon: '🥁', ja: 'どうこ (Trống đồng)', spellText: 'Trờ - ông - trông - sắc - trống, đờ - ông - đông - huyền - đồng -> trống đồng', example: 'Trống đồng cổ của tổ tiên Việt Nam' },
      { id: 'w86', word: 'quê hương', breakdown: 'qu - ê, h - ương', tone: 'Ngang', icon: '🌾', ja: 'ふるさと (Furusato)', spellText: 'Quờ - ê - quê, hờ - ương - hương -> quê hương', example: 'Quê hương có cánh đồng lúa chín' }
    ]
  },
  {
    id: 11,
    title: 'Bài 11: Thiên nhiên kì thú & Côn trùng (HK2)',
    subtitle: 'Mở rộng vốn từ cây cỏ và các loài vật quanh ta',
    words: [
      { id: 'w87', word: 'bươm bướm', breakdown: 'b - ươm, b - ươm - sắc', tone: 'Ngang & Sắc', icon: '🦋', ja: 'ちょうちょ (Choucho)', spellText: 'Bờ - ươm - bươm, bờ - ươm - bươm - sắc - bướm -> bươm bướm', example: 'Con bươm bướm bay lượn vườn hoa' },
      { id: 'w88', word: 'chuồn chuồn', breakdown: 'ch - uôn - huyền, ch - uôn - huyền', tone: 'Huyền', icon: '🦟', ja: 'とんぼ (Tonbo)', spellText: 'Chờ - uôn - chuôn - huyền - chuồn -> chuồn chuồn', example: 'Chuồn chuồn bay thấp thì mưa' },
      { id: 'w89', word: 'cầu vồng', breakdown: 'c - âu - huyền, v - ông - huyền', tone: 'Huyền', icon: '🌈', ja: 'にじ (Niji)', spellText: 'Cờ - âu - câu - huyền - cầu, vờ - ông - vông - huyền - vồng -> cầu vồng', example: 'Cầu vồng bảy sắc sau cơn mưa' },
      { id: 'w90', word: 'cánh đồng', breakdown: 'c - anh - sắc, đ - ông - huyền', tone: 'Sắc & Huyền', icon: '🌾', ja: 'たんぼ (Cánh đồng)', spellText: 'Cờ - anh - canh - sắc - cánh, đờ - ông - đông - huyền - đồng -> cánh đồng', example: 'Cánh đồng lúa xanh rì' },
      { id: 'w91', word: 'rừng xanh', breakdown: 'r - ưng - huyền, x - anh', tone: 'Huyền & Ngang', icon: '🌲', ja: 'もり (Mori)', spellText: 'Rờ - ưng - rưng - huyền - rừng, xờ - anh - xanh -> rừng xanh', example: 'Khu rừng xanh mát nhiều cây cao' },
      { id: 'w92', word: 'con ong', breakdown: 'c - on, o - ng', tone: 'Ngang', icon: '🐝', ja: 'みつばち (Hachi)', spellText: 'Cờ - on - con, o - ngờ - ong -> con ong', example: 'Con ong chăm chỉ hút mật hoa' },
      { id: 'w93', word: 'con kiến', breakdown: 'c - on, k - iên - sắc', tone: 'Ngang & Sắc', icon: '🐜', ja: 'あり (Ari)', spellText: 'Cờ - on - con, ca - iên - kiên - sắc - kiến -> con kiến', example: 'Đàn kiến nhỏ tha mồi về tổ' },
      { id: 'w94', word: 'cây tre', breakdown: 'c - ây, tr - e', tone: 'Ngang', icon: '🎋', ja: 'たけ (Take - Tre)', spellText: 'Cờ - ây - cây, trờ - e - tre -> cây tre', example: 'Lũy tre xanh rì rào trong gió' }
    ]
  },
  {
    id: 12,
    title: 'Bài 12: Giao tiếp lễ phép & Đức tính đẹp (HK2)',
    subtitle: 'Những từ ngữ hay giúp Bảo Long ứng xử văn minh',
    words: [
      { id: 'w95', word: 'xin chào', breakdown: 'x - in, ch - ao - huyền', tone: 'Ngang & Huyền', icon: '👋', ja: 'こんにちは', spellText: 'Xờ - in - xin, chờ - ao - chao - huyền - chào -> xin chào', example: 'Bé khoanh tay nói con xin chào ạ' },
      { id: 'w96', word: 'cảm ơn', breakdown: 'c - am - hỏi, ơ - n', tone: 'Hỏi & Ngang', icon: '🙏', ja: 'ありがとう', spellText: 'Cờ - am - cam - hỏi - cảm, ơ - nờ - ơn -> cảm ơn', example: 'Nói con cảm ơn khi nhận quà' },
      { id: 'w97', word: 'xin lỗi', breakdown: 'x - in, l - ôi - ngã', tone: 'Ngang & Ngã', icon: '🙇', ja: 'ごめんなさい', spellText: 'Xờ - in - xin, lờ - ôi - lôi - ngã - lỗi -> xin lỗi', example: 'Mạnh dạn nói xin lỗi khi lỡ sai' },
      { id: 'w98', word: 'lễ phép', breakdown: 'l - ê - ngã, ph - ep - sắc', tone: 'Ngã & Sắc', icon: '🤲', ja: 'れいぎただしい', spellText: 'Lờ - ê - lê - ngã - lễ, phờ - ep - phep - sắc - phép -> lễ phép', example: 'Bảo Long rất lễ phép với ông bà' },
      { id: 'w99', word: 'chăm chỉ', breakdown: 'ch - ăm, ch - i - hỏi', tone: 'Ngang & Hỏi', icon: '📚', ja: 'まじめ (Chăm chỉ)', spellText: 'Chờ - ăm - chăm, chờ - i - chi - hỏi - chỉ -> chăm chỉ', example: 'Chăm chỉ học bài mỗi tối' },
      { id: 'w100', word: 'thật thà', breakdown: 'th - ât - nặng, th - a - huyền', tone: 'Nặng & Huyền', icon: '💖', ja: 'しょうじき (Thật thà)', spellText: 'Thờ - ât - thât - nặng - thật, thờ - a - tha - huyền - thà -> thật thà', example: 'Trẻ ngoan luôn thật thà dũng cảm' },
      { id: 'w101', word: 'gọn gàng', breakdown: 'g - on - nặng, g - ang - huyền', tone: 'Nặng & Huyền', icon: '🧸', ja: 'せいとん (Gọn gàng)', spellText: 'Gờ - on - gon - nặng - gọn, gờ - ang - gang - huyền - gàng -> gọn gàng', example: 'Cất đồ chơi gọn gàng vào hộp' },
      { id: 'w102', word: 'yêu thương', breakdown: 'yêu, th - ương', tone: 'Ngang', icon: '❤️', ja: 'だいすき / あい (Yêu thương)', spellText: 'Yêu, thờ - ương - thương -> yêu thương', example: 'Gia đình luôn yêu thương nhau' }
    ]
  }
];

const PHONICS_LESSONS = [
  {
    id: 1,
    title: 'Bài 1: Âm cuối P – Vần ap, ăp, âp, ep, êp, ip, op, ôp, ơp, up',
    subtitle: 'Khám phá bí quyết ghép vần kết thúc bằng chữ P',
    words: [
      { id: 'p1', word: 'sáp', rhyme: 'Vần -ap', breakdown: 's - ap - sắc', icon: '🖍️', ja: 'クレヨン (Kureyon) / ろうそく', spellText: 'sờ - ap - sap - sắc - sáp', example: 'Bút sáp màu tô vẽ' },
      { id: 'p2', word: 'cặp', rhyme: 'Vần -ăp', breakdown: 'c - ăp - nặng', icon: '🎒', ja: 'ランドセル / カバン (Kaban)', spellText: 'cờ - ăp - căp - nặng - cặp', example: 'Cặp sách đến trường' },
      { id: 'p3', word: 'tập', rhyme: 'Vần -âp', breakdown: 't - âp - nặng', icon: '📖', ja: 'れんしゅう (Tập viết / tập đọc)', spellText: 'tờ - âp - tâp - nặng - tập', example: 'Bảo Long tập viết tiếng Việt' },
      { id: 'p4', word: 'dép', rhyme: 'Vần -ep', breakdown: 'd - ep - sắc', icon: '🩴', ja: 'サンダル / スリッパ (Sandaru)', spellText: 'dờ - ep - dep - sắc - dép', example: 'Đôi dép đi trong nhà' },
      { id: 'p5', word: 'bếp', rhyme: 'Vần -êp', breakdown: 'b - êp - sắc', icon: '🍳', ja: 'だいどころ / コンロ (Daidokoro)', spellText: 'bờ - êp - bêp - sắc - bếp', example: 'Mẹ nấu ăn trong bếp' },
      { id: 'p6', word: 'nhịp', rhyme: 'Vần -ip', breakdown: 'nh - ip - nặng', icon: '🥁', ja: 'リズム (Rizumu - Nhịp điệu)', spellText: 'nhờ - ip - nhip - nặng - nhịp', example: 'Vỗ tay theo nhịp bài hát' },
      { id: 'p7', word: 'họp', rhyme: 'Vần -op', breakdown: 'h - op - nặng', icon: '👥', ja: 'かいぎ (Kaigi - Họp mặt)', spellText: 'hờ - op - hop - nặng - họp', example: 'Cả nhà họp mặt vui vẻ' },
      { id: 'p8', word: 'hộp', rhyme: 'Vần -ôp', breakdown: 'h - ôp - nặng', icon: '📦', ja: 'はこ (Hako - Hộp giấy / quà)', spellText: 'hờ - ôp - hôp - nặng - hộp', example: 'Chiếc hộp quà bất ngờ' },
      { id: 'p9', word: 'chớp', rhyme: 'Vần -ơp', breakdown: 'ch - ơp - sắc', icon: '⚡', ja: 'いなずま (Inazuma - Sấm chớp)', spellText: 'chờ - ơp - chơp - sắc - chớp', example: 'Tia chớp sáng lóe' },
      { id: 'p10', word: 'súp', rhyme: 'Vần -up', breakdown: 's - up - sắc', icon: '🍲', ja: 'スープ (Suupu - Món súp)', spellText: 'sờ - up - sup - sắc - súp', example: 'Bát súp thơm ngon nóng hổi' }
    ]
  },
  {
    id: 2,
    title: 'Bài 2: Âm cuối T – Vần at, ăt, ât, et, êt, it, ot, uôt',
    subtitle: 'Học đánh vần các từ có kết thúc bằng âm T',
    words: [
      { id: 't1', word: 'cát', rhyme: 'Vần -at', breakdown: 'c - at - sắc', icon: '🏖️', ja: 'すな (Suna - Cát biển)', spellText: 'cờ - at - cat - sắc - cát', example: 'Bãi cát vàng bên bờ biển' },
      { id: 't2', word: 'mắt', rhyme: 'Vần -ăt', breakdown: 'm - ăt - sắc', icon: '👀', ja: 'め (Me - Đôi mắt)', spellText: 'mờ - ăt - măt - sắc - mắt', example: 'Đôi mắt Bảo Long sáng long lanh' },
      { id: 't3', word: 'đất', rhyme: 'Vần -ât', breakdown: 'đ - ât - sắc', icon: '🌱', ja: 'つち (Tsuchi - Đất trồng)', spellText: 'đờ - ât - đât - sắc - đất', example: 'Đất phù sa màu mỡ' },
      { id: 't4', word: 'vẹt', rhyme: 'Vần -et', breakdown: 'v - et - nặng', icon: '🦜', ja: 'オウム / インコ (Vẹt)', spellText: 'vờ - et - vet - nặng - vẹt', example: 'Chú vẹt biết nói tiếng Việt' },
      { id: 't5', word: 'tết', rhyme: 'Vần -êt', breakdown: 't - êt - sắc', icon: '🧧', ja: 'ベトナムの正月 (Tet)', spellText: 'tờ - êt - têt - sắc - tết', example: 'Bé vui đón Tết Việt Nam' },
      { id: 't6', word: 'vịt', rhyme: 'Vần -it', breakdown: 'v - it - nặng', icon: '🦆', ja: 'かも (Kamo)', spellText: 'vờ - it - vit - nặng - vịt', example: 'Đàn vịt con theo mẹ' },
      { id: 't7', word: 'hót', rhyme: 'Vần -ot', breakdown: 'h - ot - sắc', icon: '🐦', ja: 'さえずる (Hót)', spellText: 'hờ - ot - hot - sắc - hót', example: 'Chim hót líu lo buổi sáng' },
      { id: 't8', word: 'chuột', rhyme: 'Vần -uôt', breakdown: 'ch - uôt - nặng', icon: '🐭', ja: 'ねずみ (Nezumi)', spellText: 'chờ - uôt - chuôt - nặng - chuột', example: 'Chú chuột nhắt thông minh' }
    ]
  },
  {
    id: 3,
    title: 'Bài 3: Âm cuối C & CH – Vần oc, ưc, uc, ach, êch, ich',
    subtitle: 'Luyện đánh vần các vần âm cuối C và CH rất hay dùng',
    words: [
      { id: 'c1', word: 'tóc', rhyme: 'Vần -oc', breakdown: 't - oc - sắc', icon: '💇', ja: 'かみ (Kami - Tóc)', spellText: 'tờ - oc - toc - sắc - tóc', example: 'Mái tóc đen của Bảo Long' },
      { id: 'c2', word: 'sóc', rhyme: 'Vần -oc', breakdown: 's - oc - sắc', icon: '🐿️', ja: 'リス (Risu - Con sóc)', spellText: 'sờ - oc - soc - sắc - sóc', example: 'Chú sóc chuyền cành nhanh thoăn thoắt' },
      { id: 'c3', word: 'mực', rhyme: 'Vần -ưc', breakdown: 'm - ưc - nặng', icon: '🦑', ja: 'いか (Ika - Con mực)', spellText: 'mờ - ưc - mưc - nặng - mực', example: 'Con mực bơi dưới đại dương' },
      { id: 'c4', word: 'cúc', rhyme: 'Vần -uc', breakdown: 'c - uc - sắc', icon: '🌼', ja: 'きく (Kiku - Hoa cúc)', spellText: 'cờ - uc - cuc - sắc - cúc', example: 'Bông hoa cúc vàng rực rỡ' },
      { id: 'c5', word: 'sách', rhyme: 'Vần -ach', breakdown: 's - ach - sắc', icon: '📚', ja: 'ほん (Hon - Sách)', spellText: 'sờ - ach - sach - sắc - sách', example: 'Quyển sách hay của Bảo Long' },
      { id: 'c6', word: 'gạch', rhyme: 'Vần -ach', breakdown: 'g - ach - nặng', icon: '🧱', ja: 'レンガ (Renga - Viên gạch)', spellText: 'gờ - ach - gach - nặng - gạch', example: 'Xây ngôi nhà bằng viên gạch đỏ' },
      { id: 'c7', word: 'ếch', rhyme: 'Vần -êch', breakdown: 'êch - sắc', icon: '🐸', ja: 'かえる (Kaeru - Con ếch)', spellText: 'ê - chờ - êch - sắc - ếch', example: 'Chú ếch xanh ngồi trên lá sen' },
      { id: 'c8', word: 'lịch', rhyme: 'Vần -ich', breakdown: 'l - ich - nặng', icon: '📅', ja: 'カレンダー (Karendaa - Lịch)', spellText: 'lờ - ich - lich - nặng - lịch', example: 'Xem tờ lịch biết ngày tháng' }
    ]
  },
  {
    id: 4,
    title: 'Bài 4: Âm cuối M & N – Vần am, âm, em, im, an, ân, ên, en',
    subtitle: 'Ghép vần kết thúc bằng chữ M và chữ N vang êm',
    words: [
      { id: 'mn1', word: 'cam', rhyme: 'Vần -am', breakdown: 'c - am', icon: '🍊', ja: 'オレンジ (Quả cam)', spellText: 'cờ - am - cam', example: 'Quả cam ngọt nhiều vitamin C' },
      { id: 'mn2', word: 'nấm', rhyme: 'Vần -âm', breakdown: 'n - âm - sắc', icon: '🍄', ja: 'きのこ (Kinoko - Nấm)', spellText: 'nờ - âm - nâm - sắc - nấm', example: 'Cây nấm mọc sau cơn mưa' },
      { id: 'mn3', word: 'kem', rhyme: 'Vần -em', breakdown: 'k - em', icon: '🍦', ja: 'アイスクリーム (Kem)', spellText: 'ca - em - kem', example: 'Que kem mát lạnh mùa hè' },
      { id: 'mn4', word: 'chim', rhyme: 'Vần -im', breakdown: 'ch - im', icon: '🐦', ja: 'とり (Tori - Chim)', spellText: 'chờ - im - chim', example: 'Đàn chim bay trên bầu trời' },
      { id: 'mn5', word: 'bạn', rhyme: 'Vần -an', breakdown: 'b - an - nặng', icon: '🧑‍🤝‍🧑', ja: 'ともだち (Tomodachi - Bạn)', spellText: 'bờ - an - ban - nặng - bạn', example: 'Bảo Long chơi vui cùng các bạn' },
      { id: 'mn6', word: 'mận', rhyme: 'Vần -ân', breakdown: 'm - ân - nặng', icon: '🫐', ja: 'すもも (Quả mận)', spellText: 'mờ - ân - mân - nặng - mận', example: 'Quả mận chín đỏ giòn' },
      { id: 'mn7', word: 'nến', rhyme: 'Vần -ên', breakdown: 'n - ên - sắc', icon: '🕯️', ja: 'ろうそく (Nến sinh nhật)', spellText: 'nờ - ên - nên - sắc - nến', example: 'Thổi nến mừng sinh nhật 6 tuổi' },
      { id: 'mn8', word: 'đèn', rhyme: 'Vần -en', breakdown: 'đ - en - huyền', icon: '🏮', ja: 'ちょうちん / ランプ (Đèn)', spellText: 'đờ - en - đen - huyền - đèn', example: 'Chiếc đèn lồng lung linh' }
    ]
  },
  {
    id: 5,
    title: 'Bài 5: Vần Đôi Giai Điệu – ai, ay, ao, oi, ôi, ơi, ui',
    subtitle: 'Các vần mở ngân vang cực kỳ thông dụng',
    words: [
      { id: 'vd1', word: 'nai', rhyme: 'Vần -ai', breakdown: 'n - ai', icon: '🦌', ja: 'しか (Shika - Con nai)', spellText: 'nờ - ai - nai', example: 'Chú nai vàng ngơ ngác' },
      { id: 'vd2', word: 'tay', rhyme: 'Vần -ay', breakdown: 't - ay', icon: '🖐️', ja: 'て (Te - Bàn tay)', spellText: 'tờ - ay - tay', example: 'Rửa tay sạch trước khi ăn' },
      { id: 'vd3', word: 'sao', rhyme: 'Vần -ao', breakdown: 's - ao', icon: '⭐', ja: 'ほし (Hoshi - Ngôi sao)', spellText: 'sờ - ao - sao', example: 'Ngôi sao lấp lánh trên bầu trời' },
      { id: 'vd4', word: 'voi', rhyme: 'Vần -oi', breakdown: 'v - oi', icon: '🐘', ja: 'ぞう (Zou - Con voi)', spellText: 'vờ - oi - voi', example: 'Chú voi có chiếc vòi dài' },
      { id: 'vd5', word: 'xôi', rhyme: 'Vần -ôi', breakdown: 'x - ôi', icon: '🍙', ja: 'おこわ (Xôi nếp)', spellText: 'xờ - ôi - xôi', example: 'Đĩa xôi gấc đỏ thơm ngon' },
      { id: 'vd6', word: 'bơi', rhyme: 'Vần -ơi', breakdown: 'b - ơi', icon: '🏊', ja: 'およぐ (Oyogu - Bơi)', spellText: 'bờ - ơi - bơi', example: 'Bảo Long tập bơi dưới hồ' },
      { id: 'vd7', word: 'núi', rhyme: 'Vần -ui', breakdown: 'n - ui - sắc', icon: '⛰️', ja: 'やま (Yama - Núi)', spellText: 'nờ - ui - nui - sắc - núi', example: 'Ngọn núi cao sừng sững' },
      { id: 'vd8', word: 'cười', breakdown: 'c - ươi - huyền', rhyme: 'Vần -ươi', icon: '😄', ja: 'わらう (Warau - Cười)', spellText: 'cờ - ươi - cươi - huyền - cười', example: 'Tiếng cười giòn tan' }
    ]
  },
  {
    id: 6,
    title: 'Bài 6: Âm cuối NG & NH – ang, ăng, âng, ong, ông, ung, ưng, anh, ênh, inh',
    subtitle: 'Các vần vang ngân chuẩn chương trình Tiếng Việt Lớp 1',
    words: [
      { id: 'ng1', word: 'trăng', rhyme: 'Vần -ăng', breakdown: 'tr - ăng', icon: '🌙', ja: 'つき (Mặt trăng)', spellText: 'trờ - ăng - trăng', example: 'Vầng trăng sáng đêm rằm' },
      { id: 'ng2', word: 'vầng', rhyme: 'Vần -âng', breakdown: 'v - âng - huyền', icon: '🌅', ja: 'たいようのわ', spellText: 'vờ - âng - vâng - huyền - vầng', example: 'Vầng dương rực rỡ ban mai' },
      { id: 'ng3', word: 'ong', rhyme: 'Vần -ong', breakdown: 'o - ng', icon: '🐝', ja: 'ハチ (Con ong)', spellText: 'o - ngờ - ong', example: 'Con ong làm mật ngọt' },
      { id: 'ng4', word: 'sông', rhyme: 'Vần -ông', breakdown: 's - ông', icon: '🏞️', ja: 'かわ (Dòng sông)', spellText: 'sờ - ông - sông', example: 'Dòng sông xanh hiền hòa' },
      { id: 'ng5', word: 'khung', rhyme: 'Vần -ung', breakdown: 'kh - ung', icon: '🖼️', ja: 'わく / フレーム', spellText: 'khờ - ung - khung', example: 'Khung tranh gia đình' },
      { id: 'ng6', word: 'sừng', rhyme: 'Vần -ưng', breakdown: 's - ưng - huyền', icon: '🦏', ja: 'つの (Sừng)', spellText: 'sờ - ưng - sưng - huyền - sừng', example: 'Khủng long ba sừng dũng mãnh' },
      { id: 'ng7', word: 'xanh', rhyme: 'Vần -anh', breakdown: 'x - anh', icon: '🌿', ja: 'みどり (Xanh)', spellText: 'xờ - anh - xanh', example: 'Bầu trời xanh ngắt' },
      { id: 'ng8', word: 'bình', rhyme: 'Vần -inh', breakdown: 'b - inh - huyền', icon: '🏺', ja: 'かびん (Cái bình)', spellText: 'bờ - inh - binh - huyền - bình', example: 'Bình hoa đẹp trên bàn' },
      { id: 'ng9', word: 'làng', rhyme: 'Vần -ang', breakdown: 'l - ang - huyền', icon: '🏡', ja: 'むら / ふるさと (Làng quê)', spellText: 'lờ - ang - lang - huyền - làng', example: 'Làng quê yên bình xanh mát' },
      { id: 'ng10', word: 'kênh', rhyme: 'Vần -ênh', breakdown: 'k - ênh', icon: '🚤', ja: 'うんが (Kênh đào)', spellText: 'ca - ênh - kênh', example: 'Dòng kênh xanh hiền hòa' }
    ]
  },
  {
    id: 7,
    title: 'Bài 7: Nguyên âm đôi IÊ / YÊ – iên, iêm, iêng, iêt, iêu, yên',
    subtitle: 'Nhóm vần nâng cao cực hay gặp cuối Học kỳ 1',
    words: [
      { id: 'ie1', word: 'biển', rhyme: 'Vần -iên', breakdown: 'b - iên - hỏi', icon: '🌊', ja: 'うみ (Umi)', spellText: 'bờ - iên - biên - hỏi - biển', example: 'Biển xanh sóng vỗ rì rào' },
      { id: 'ie2', word: 'kiếm', rhyme: 'Vần -iêm', breakdown: 'k - iêm - sắc', icon: '⚔️', ja: 'けん (Ken)', spellText: 'ca - iêm - kiêm - sắc - kiếm', example: 'Hiệp sĩ cầm thanh kiếm sáng' },
      { id: 'ie3', word: 'tiếng', rhyme: 'Vần -iêng', breakdown: 't - iêng - sắc', icon: '🗣️', ja: 'こえ / ことば', spellText: 'tờ - iêng - tiêng - sắc - tiếng', example: 'Bảo Long nói tiếng Việt thật chuẩn' },
      { id: 'ie4', word: 'viết', rhyme: 'Vần -iêt', breakdown: 'v - iêt - sắc', icon: '✍️', ja: 'かく (Viết)', spellText: 'vờ - iêt - viêt - sắc - viết', example: 'Em tập viết nắn nót từng chữ' },
      { id: 'ie5', word: 'diều', rhyme: 'Vần -iêu', breakdown: 'd - iêu - huyền', icon: '🪁', ja: 'たこ (Cánh diều)', spellText: 'dờ - iêu - diêu - huyền - diều', example: 'Thả cánh diều bay cao' },
      { id: 'ie6', word: 'yến', rhyme: 'Vần -yên', breakdown: 'yên - sắc', icon: '🐦', ja: 'つばめ (Chim yến)', spellText: 'i dài - ê - nờ - yên - sắc - yến', example: 'Chim yến bay về báo mùa xuân' },
      { id: 'ie7', word: 'tiệc', rhyme: 'Vần -iêc', breakdown: 't - iêc - nặng', icon: '🎂', ja: 'パーティー', spellText: 'tờ - iêc - tiêc - nặng - tiệc', example: 'Tiệc sinh nhật vui vẻ' },
      { id: 'ie8', word: 'thiệp', rhyme: 'Vần -iêp', breakdown: 'th - iêp - nặng', icon: '💌', ja: 'カード (Thiệp)', spellText: 'thờ - iêp - thiêp - nặng - thiệp', example: 'Tấm thiệp chúc mừng mẹ' }
    ]
  },
  {
    id: 8,
    title: 'Bài 8: Nguyên âm đôi UÔ / ƯƠ – uôn, uông, uôi, ươn, ương, ươm',
    subtitle: 'Chinh phục nhóm vần UÔ và ƯƠ chuẩn Lớp 1',
    words: [
      { id: 'uo1', word: 'cuốn', rhyme: 'Vần -uôn', breakdown: 'c - uôn - sắc', icon: '📘', ja: 'さつ (Cuốn sách)', spellText: 'cờ - uôn - cuôn - sắc - cuốn', example: 'Cuốn truyện tranh hay quá' },
      { id: 'uo2', word: 'chuông', rhyme: 'Vần -uông', breakdown: 'ch - uông', icon: '🔔', ja: 'かね (Chuông)', spellText: 'chờ - uông - chuông', example: 'Tiếng chuông ngân vang' },
      { id: 'uo3', word: 'suối', rhyme: 'Vần -uôi', breakdown: 's - uôi - sắc', icon: '💧', ja: 'おがわ (Dòng suối)', spellText: 'sờ - uôi - suôi - sắc - suối', example: 'Dòng suối mát chảy róc rách' },
      { id: 'uo4', word: 'vườn', rhyme: 'Vần -ươn', breakdown: 'v - ươn - huyền', icon: '🪴', ja: 'にわ (Khu vườn)', spellText: 'vờ - ươn - vươn - huyền - vườn', example: 'Khu vườn đầy hoa thơm' },
      { id: 'uo5', word: 'trường', rhyme: 'Vần -ương', breakdown: 'tr - ương - huyền', icon: '🏫', ja: 'がっこう (Trường)', spellText: 'trờ - ương - trương - huyền - trường', example: 'Ngôi trường tiểu học thân yêu' },
      { id: 'uo6', word: 'bướm', rhyme: 'Vần -ươm', breakdown: 'b - ươm - sắc', icon: '🦋', ja: 'ちょう (Con bướm)', spellText: 'bờ - ươm - bươm - sắc - bướm', example: 'Đàn bướm sặc sỡ bay lượn' },
      { id: 'uo7', word: 'lược', rhyme: 'Vần -ươc', breakdown: 'l - ươc - nặng', icon: '💇', ja: 'くし (Cái lược)', spellText: 'lờ - ươc - lươc - nặng - lược', example: 'Chiếc lược chải tóc gọn gàng' },
      { id: 'uo8', word: 'bưởi', rhyme: 'Vần -ươi', breakdown: 'b - ươi - hỏi', icon: '🍈', ja: 'ざぼん (Quả bưởi)', spellText: 'bờ - ươi - bươi - hỏi - bưởi', example: 'Quả bưởi ngọt ngày thu' }
    ]
  },
  {
    id: 9,
    title: 'Bài 9: Vần có Âm đệm O – oa, oă, oe, oai, oan, oat, oanh',
    subtitle: 'Tròn môi phát âm chuẩn các vần bắt đầu bằng âm O',
    words: [
      { id: 'oa1', word: 'loa', rhyme: 'Vần -oa', breakdown: 'l - oa', icon: '📢', ja: 'スピーカー (Loa)', spellText: 'lờ - oa - loa', example: 'Chiếc loa phát âm to rõ' },
      { id: 'oa2', word: 'xòe', rhyme: 'Vần -oe', breakdown: 'x - oe - huyền', icon: '🦚', ja: 'ひらく (Xòe cánh)', spellText: 'xờ - oe - xoe - huyền - xòe', example: 'Con công xòe đuôi lộng lẫy' },
      { id: 'oa3', word: 'xoăn', rhyme: 'Vần -oăn', breakdown: 'x - oăn', icon: '🌀', ja: 'くりくり (Xoăn)', spellText: 'xờ - oăn - xoăn', example: 'Mái tóc xoăn dễ thương' },
      { id: 'oa4', word: 'khoai', rhyme: 'Vần -oai', breakdown: 'kh - oai', icon: '🍠', ja: 'いも (Khoai)', spellText: 'khờ - oai - khoai', example: 'Củ khoai lang nướng thơm lừng' },
      { id: 'oa5', word: 'ngoan', rhyme: 'Vần -oan', breakdown: 'ng - oan', icon: '🌟', ja: 'おりこう (Ngoan)', spellText: 'ngờ - oan - ngoan', example: 'Bảo Long là cậu bé ngoan ngoãn' },
      { id: 'oa6', word: 'hoạt', rhyme: 'Vần -oat', breakdown: 'h - oat - nặng', icon: '🎬', ja: 'かつどう (Hoạt động)', spellText: 'hờ - oat - hoat - nặng - hoạt', example: 'Phim hoạt hình khủng long' },
      { id: 'oa7', word: 'khoanh', rhyme: 'Vần -oanh', breakdown: 'kh - oanh', icon: '🙏', ja: 'うでをくむ', spellText: 'khờ - oanh - khoanh', example: 'Khoanh tay chào ông bà' },
      { id: 'oa8', word: 'khỏe', rhyme: 'Vần -oe', breakdown: 'kh - oe - hỏi', icon: '💪', ja: 'げんき (Khỏe mạnh)', spellText: 'khờ - oe - khoe - hỏi - khỏe', example: 'Tập thể dục cho người khỏe mạnh' }
    ]
  },
  {
    id: 10,
    title: 'Bài 10: Vần có Âm đệm U – uê, uy, uân, uât, uyên, uyêt',
    subtitle: 'Hoàn thiện bảng vần nâng cao đầu Học kỳ 2 Lớp 1',
    words: [
      { id: 'uy1', word: 'huệ', rhyme: 'Vần -uê', breakdown: 'h - uê - nặng', icon: '🤍', ja: 'ゆり (Hoa huệ)', spellText: 'hờ - uê - huê - nặng - huệ', example: 'Bông hoa huệ trắng tinh khôi' },
      { id: 'uy2', word: 'xuân', rhyme: 'Vần -uân', breakdown: 'x - uân', icon: '🌸', ja: 'はる (Mùa xuân)', spellText: 'xờ - uân - xuân', example: 'Mùa xuân hoa nở khắp nơi' },
      { id: 'uy3', word: 'luật', rhyme: 'Vần -uât', breakdown: 'l - uât - nặng', icon: '⚖️', ja: 'ルール (Quy luật)', spellText: 'lờ - uât - luât - nặng - luật', example: 'Chấp hành đúng luật giao thông' },
      { id: 'uy4', word: 'thủy', rhyme: 'Vần -uy', breakdown: 'th - uy - hỏi', icon: '🚢', ja: 'みず (Thủy)', spellText: 'thờ - uy - thuy - hỏi - thủy', example: 'Tàu thủy lướt sóng biển xanh' },
      { id: 'uy5', word: 'quýt', rhyme: 'Vần -uyt (qu+uyt)', breakdown: 'qu - ýt', icon: '🍊', ja: 'みかん (Quả quýt)', spellText: 'quờ - uýt (viết qu-yt) - sắc - quýt', example: 'Quả quýt mọng nước nhiều vitamin' },
      { id: 'uy6', word: 'thuyền', rhyme: 'Vần -uyên', breakdown: 'th - uyên - huyền', icon: '⛵', ja: 'ふね (Thuyền)', spellText: 'thờ - uyên - thuyên - huyền - thuyền', example: 'Cánh buồm chiếc thuyền ra khơi' },
      { id: 'uy7', word: 'tuyết', rhyme: 'Vần -uyêt', breakdown: 't - uyêt - sắc', icon: '❄️', ja: 'ゆき (Tuyết trắng)', spellText: 'tờ - uyêt - tuyêt - sắc - tuyết', example: 'Mùa đông Nhật Bản có tuyết rơi' },
      { id: 'uy8', word: 'khuya', rhyme: 'Vần -uya', breakdown: 'kh - uya', icon: '🌃', ja: 'よなか (Đêm khuya)', spellText: 'khờ - uya - khuya', example: 'Đêm khuya mọi người ngủ say' }
    ]
  },
  {
    id: 11,
    title: 'Bài 11: Phân biệt Âm Đầu Dễ Nhầm – S / X, CH / TR, L / N',
    subtitle: 'Luyện phát âm chuẩn chữ S cong lưỡi, X nhẹ, TR cong lưỡi',
    words: [
      { id: 'sx1', word: 'sâu', rhyme: 'Âm S (uốn lưỡi)', breakdown: 's - âu', icon: '🐛', ja: 'いもむし (Con sâu)', spellText: 'sờ - âu - sâu', example: 'Chú sâu xanh ăn lá non' },
      { id: 'sx2', word: 'xâu', rhyme: 'Âm X (nhẹ)', breakdown: 'x - âu', icon: '📿', ja: 'とおす (Xâu chuỗi)', spellText: 'xờ - âu - xâu', example: 'Bé xâu hạt vòng tặng mẹ' },
      { id: 'sx3', word: 'sáo', rhyme: 'Âm S (uốn lưỡi)', breakdown: 's - ao - sắc', icon: '🐦', ja: '九官鳥 (Chim sáo)', spellText: 'sờ - ao - sao - sắc - sáo', example: 'Chú chim sáo hót vang' },
      { id: 'sx4', word: 'xào', rhyme: 'Âm X (nhẹ)', breakdown: 'x - ao - huyền', icon: '🍳', ja: 'いためる (Xào rau)', spellText: 'xờ - ao - xao - huyền - xào', example: 'Mẹ xào rau xanh thơm ngon' },
      { id: 'sx5', word: 'tre', rhyme: 'Âm TR (cong lưỡi)', breakdown: 'tr - e', icon: '🎋', ja: 'たけ (Cây tre)', spellText: 'trờ - e - tre', example: 'Cây tre xanh thẳng tắp' },
      { id: 'sx6', word: 'trâu', rhyme: 'Âm TR (cong lưỡi)', breakdown: 'tr - âu', icon: '🐃', ja: 'すいぎゅう (Con trâu)', spellText: 'trờ - âu - trâu', example: 'Con trâu cày ruộng giúp bác nông dân' },
      { id: 'sx7', word: 'lúa', rhyme: 'Âm L (thẳng lưỡi)', breakdown: 'l - ua - sắc', icon: '🌾', ja: 'いね (Cây lúa)', spellText: 'lờ - ua - lua - sắc - lúa', example: 'Cánh đồng lúa chín vàng' },
      { id: 'sx8', word: 'nón', rhyme: 'Âm N (ngậm mũi)', breakdown: 'n - on - sắc', icon: '👒', ja: 'ぼうし (Cái nón)', spellText: 'nờ - on - non - sắc - nón', example: 'Chiếc nón lá che nắng dịu dàng' },
      { id: 'sx9', word: 'che', rhyme: 'Âm CH (nhẹ)', breakdown: 'ch - e', icon: '☂️', ja: 'さす (Che ô)', spellText: 'chờ - e - che', example: 'Bé che ô khi trời mưa' },
      { id: 'sx10', word: 'chổi', rhyme: 'Âm CH (nhẹ)', breakdown: 'ch - ôi - hỏi', icon: '🧹', ja: 'ほうき (Cây chổi)', spellText: 'chờ - ôi - chôi - hỏi - chổi', example: 'Cây chổi giúp bé quét nhà sạch' }
    ]
  },
  {
    id: 12,
    title: 'Bài 12: Quy Tắc Chính Tả Vàng – C / K, G / GH, NG / NGH',
    subtitle: 'Bí quyết viết đúng chính tả 100% suốt năm Lớp 1',
    words: [
      { id: 'qt1', word: 'kiến', rhyme: 'K + i / e / ê', breakdown: 'k - iên - sắc', icon: '🐜', ja: 'あり (Con kiến)', spellText: 'ca - iên - kiên - sắc - kiến', example: 'Chữ K đứng trước i, e, ê như con kiến' },
      { id: 'qt2', word: 'kéo', rhyme: 'K + e', breakdown: 'k - eo - sắc', icon: '✂️', ja: 'はさみ (Cái kéo)', spellText: 'ca - eo - keo - sắc - kéo', example: 'Cái kéo cắt giấy thủ công' },
      { id: 'qt3', word: 'cò', rhyme: 'C + a/ă/â/o/ô/ơ/u/ư', breakdown: 'c - o - huyền', icon: '🦢', ja: 'さぎ (Con cò)', spellText: 'cờ - o - co - huyền - cò', example: 'Con cò trắng bay trên cánh đồng' },
      { id: 'qt4', word: 'ghế', rhyme: 'GH + e / ê / i', breakdown: 'gh - ê - sắc', icon: '🪑', ja: 'いす (Cái ghế)', spellText: 'gờ ghép - ê - ghê - sắc - ghế', example: 'Chữ GH đứng trước e, ê, i như cái ghế' },
      { id: 'qt5', word: 'ghe', rhyme: 'GH + e', breakdown: 'gh - e', icon: '🛶', ja: 'こぶね (Chiếc ghe)', spellText: 'gờ ghép - e - ghe', example: 'Chiếc ghe xuôi dòng sông' },
      { id: 'qt6', word: 'gỗ', rhyme: 'G + a/o/ô/ơ/u/ư', breakdown: 'g - ô - ngã', icon: '🪵', ja: 'き (Gỗ)', spellText: 'gờ - ô - gô - ngã - gỗ', example: 'Khúc gỗ làm bàn ghế' },
      { id: 'qt7', word: 'nghé', rhyme: 'NGH + e / ê / i', breakdown: 'ngh - e - sắc', icon: '🐃', ja: 'こうし (Con nghé)', spellText: 'ngờ ghép - e - nghe - sắc - nghé', example: 'NGH đứng trước e, ê, i như con nghé' },
      { id: 'qt8', word: 'ngựa', rhyme: 'NG + a/ă/â/o/ô/ơ/u/ư', breakdown: 'ng - ưa - nặng', icon: '🐴', ja: 'うま (Con ngựa)', spellText: 'ngờ - ưa - ngưa - nặng - ngựa', example: 'Chú ngựa phi nước đại' }
    ]
  }
];

// ========================================================
// HỆ THỐNG ẢNH THẬT CHẤT LƯỢNG CAO CHO KHỦNG LONG & XE CỘ
// Dành riêng cho bé Bảo Long: ảnh chụp thực tế / mô hình bảo tàng chân thực
// ========================================================
const DINO_PHOTOS = {
  bao_chua: '<img src="images/dinos/dino_bao_chua.jpg" class="real-photo" alt="Khủng long bạo chúa T-Rex">',
  ba_sung: '<img src="images/dinos/dino_ba_sung.jpg" class="real-photo" alt="Khủng long ba sừng Triceratops">',
  co_dai: '<img src="images/dinos/dino_co_dai.jpg" class="real-photo" alt="Khủng long cổ dài Brachiosaurus">',
  khung_long_bay: '<img src="images/dinos/dino_khung_long_bay.jpg" class="real-photo" alt="Thằn lằn bay Pteranodon">',
  duoi_gai: '<img src="images/dinos/dino_duoi_gai.jpg" class="real-photo" alt="Khủng long đuôi gai Stegosaurus">',
  giap_bua: '<img src="images/dinos/dino_giap_bua.jpg" class="real-photo" alt="Khủng long bọc giáp Ankylosaurus">',
  chay_nhanh: '<img src="images/dinos/dino_chay_nhanh.jpg" class="real-photo" alt="Khủng long chạy nhanh Velociraptor">',
  trung: '<img src="images/dinos/dino_trung.jpg" class="real-photo" alt="Trứng khủng long">',
  dau_chan: '<img src="images/dinos/dino_dau_chan.jpg" class="real-photo" alt="Dấu chân khủng long">',
  hoa_thach: '<img src="images/dinos/dino_hoa_thach.jpg" class="real-photo" alt="Hóa thạch khủng long">'
};

const VEHICLE_PHOTOS = {
  xe_canh_sat: '<img src="images/vehicles/veh_xe_canh_sat.jpg" class="real-photo" alt="Xe Cảnh Sát">',
  xe_cuu_hoa: '<img src="images/vehicles/veh_xe_cuu_hoa.jpg" class="real-photo" alt="Xe Cứu Hỏa">',
  xe_cuu_thuong: '<img src="images/vehicles/veh_xe_cuu_thuong.jpg" class="real-photo" alt="Xe Cứu Thương">',
  may_xuc: '<img src="images/vehicles/veh_may_xuc.jpg" class="real-photo" alt="Máy Xúc Đất">',
  xe_buyt: '<img src="images/vehicles/veh_xe_buyt.jpg" class="real-photo" alt="Xe Buýt">',
  xe_tai: '<img src="images/vehicles/veh_xe_tai.jpg" class="real-photo" alt="Xe Tải">',
  tau_hoa: '<img src="images/vehicles/veh_tau_hoa.jpg" class="real-photo" alt="Tàu Hỏa Shinkansen">',
  may_bay: '<img src="images/vehicles/veh_may_bay.jpg" class="real-photo" alt="Máy Bay">',
  truc_thang: '<img src="images/vehicles/veh_truc_thang.jpg" class="real-photo" alt="Máy Bay Trực Thăng">',
  tau_thuy: '<img src="images/vehicles/veh_tau_thuy.jpg" class="real-photo" alt="Tàu Thủy">',
  xe_con: '<img src="images/vehicles/veh_xe_con.jpg" class="real-photo" alt="Xe Ô Tô Con">',
  xe_dap: '<img src="images/vehicles/veh_xe_dap.jpg" class="real-photo" alt="Xe Đạp">'
};

// CHUYÊN MỤC: THẾ GIỚI KHỦNG LONG CHO BẢO LONG (DINOSAUR WORLD)
const DINO_LESSONS = [
  {
    id: 'dino1',
    word: 'bạo chúa',
    dinoName: 'Khủng long bạo chúa (T-Rex)',
    audioKey: 'dino_bao_chua',
    spellKey: 'spell_bao_chua',
    breakdown: 'b - ao - nặng, ch - ua - sắc',
    spellText: 'Bờ - ao - bao - nặng - bạo, chờ - ua - chua - sắc - chúa -> bạo chúa',
    icon: DINO_PHOTOS.bao_chua,
    ja: 'ティラノサウルス (T-Rex)',
    funFact: 'Vua của các loài khủng long, hàm răng sắc nhọn khổng lồ, tiếng gầm vang dội!',
    example: 'T-Rex là khủng long bạo chúa dũng mãnh'
  },
  {
    id: 'dino2',
    word: 'ba sừng',
    dinoName: 'Khủng long ba sừng (Triceratops)',
    audioKey: 'dino_ba_sung',
    spellKey: 'spell_ba_sung',
    breakdown: 'b - a, s - ưng - huyền',
    spellText: 'Bờ - a - ba, sờ - ưng - sưng - huyền - sừng -> ba sừng',
    icon: DINO_PHOTOS.ba_sung,
    ja: 'トリケラトプス (Triceratops)',
    funFact: 'Có 3 chiếc sừng dũng cảm trên đầu và tấm khiên xương cứng cáp bảo vệ cổ!',
    example: 'Triceratops có ba chiếc sừng cứng cáp'
  },
  {
    id: 'dino3',
    word: 'cổ dài',
    dinoName: 'Khủng long cổ dài (Brachiosaurus)',
    audioKey: 'dino_co_dai',
    spellKey: 'spell_co_dai',
    breakdown: 'c - ô - hỏi, d - ai - huyền',
    spellText: 'cờ - ô - cô - hỏi - cổ, dờ - ai - dai - huyền - dài -> cổ dài',
    icon: DINO_PHOTOS.co_dai,
    ja: 'ブラキオサウルス (Brachiosaurus)',
    funFact: 'Cao như toà nhà 4 tầng, chiếc cổ siêu dài vươn tới ngọn cây cao để ăn lá non!',
    example: 'Khủng long cổ dài ăn lá cây trên cao'
  },
  {
    id: 'dino4',
    word: 'khủng long bay',
    dinoName: 'Thằn lằn bay (Pteranodon)',
    audioKey: 'dino_khung_long_bay',
    spellKey: 'spell_khung_long_bay',
    breakdown: 'kh - ung - hỏi, l - ong, b - ay',
    spellText: 'Khờ - ung - khung - hỏi - khủng, lờ - ong - long, bờ - ay - bay -> khủng long bay',
    icon: DINO_PHOTOS.khung_long_bay,
    ja: 'プテラノドン (Pteranodon)',
    funFact: 'Đôi cánh da khổng lồ dang rộng liệng trên bầu trời xanh thời tiền sử!',
    example: 'Pteranodon chao liệng trên bầu trời'
  },
  {
    id: 'dino5',
    word: 'đuôi gai',
    dinoName: 'Khủng long đuôi gai (Stegosaurus)',
    audioKey: 'dino_duoi_gai',
    spellKey: 'spell_duoi_gai',
    breakdown: 'đ - uôi, g - ai',
    spellText: 'Đờ - uôi - đuôi, gờ - ai - gai -> đuôi gai',
    icon: DINO_PHOTOS.duoi_gai,
    ja: 'ステゴサウルス (Stegosaurus)',
    funFact: 'Trên lưng có hai hàng phiến sừng ngũ giác, cuối đuôi có 4 chiếc gai nhọn tự vệ!',
    example: 'Stegosaurus dùng đuôi gai để tự vệ'
  },
  {
    id: 'dino6',
    word: 'giáp búa',
    dinoName: 'Khủng long bọc giáp (Ankylosaurus)',
    audioKey: 'dino_giap_bua',
    spellKey: 'spell_giap_bua',
    breakdown: 'gi - ap - sắc, b - ua - sắc',
    spellText: 'Giờ - ap - giap - sắc - giáp, bờ - ua - bua - sắc - búa -> giáp búa',
    icon: DINO_PHOTOS.giap_bua,
    ja: 'アンキロサウルス (Ankylosaurus)',
    funFact: 'Toàn thân bọc lớp áo giáp gai cứng như mai rùa thép và chiếc đuôi gắn quả chùy sắt siêu mạnh mẽ!',
    example: 'Ankylosaurus có áo giáp cứng như thép'
  },
  {
    id: 'dino7',
    word: 'chạy nhanh',
    dinoName: 'Khủng long chạy nhanh (Velociraptor)',
    audioKey: 'dino_chay_nhanh',
    spellKey: 'spell_chay_nhanh',
    breakdown: 'ch - ay - nặng, nh - anh',
    spellText: 'Chờ - ay - chay - nặng - chạy, nhờ - anh - nhanh -> chạy nhanh',
    icon: DINO_PHOTOS.chay_nhanh,
    ja: 'ヴェロキラプトル (Velociraptor)',
    funFact: 'Loài khủng long thông minh, chạy nhanh thoăn thoắt với móng vuốt hình lưỡi liềm!',
    example: 'Velociraptor chạy nhanh như gió'
  },
  {
    id: 'dino8',
    word: 'trứng',
    dinoName: 'Trứng khủng long (Dino Egg)',
    audioKey: 'dino_trung',
    spellKey: 'spell_trung',
    breakdown: 'tr - ưng - sắc',
    spellText: 'Trờ - ưng - trưng - sắc - trứng',
    icon: DINO_PHOTOS.trung,
    ja: 'きょうりゅうのたまご (Egg)',
    funFact: 'Vỏ trứng dày trong tổ ấp, chuẩn bị nở ra những chú khủng long con đáng yêu!',
    example: 'Trứng khủng long sắp nở con'
  },
  {
    id: 'dino9',
    word: 'dấu chân',
    dinoName: 'Dấu chân khủng long (Footprint)',
    audioKey: 'dino_dau_chan',
    spellKey: 'spell_dau_chan',
    breakdown: 'd - âu - sắc, ch - ân',
    spellText: 'Dờ - âu - dâu - sắc - dấu, chờ - ân - chân -> dấu chân',
    icon: DINO_PHOTOS.dau_chan,
    ja: 'あしあと (Footprint)',
    funFact: 'Dấu chân sâu và to gấp 10 lần bàn chân của bé Bảo Long, in lại trên đá!',
    example: 'Dấu chân khủng long khổng lồ'
  },
  {
    id: 'dino10',
    word: 'hóa thạch',
    dinoName: 'Hóa thạch khủng long (Fossil)',
    audioKey: 'dino_hoa_thach',
    spellKey: 'spell_hoa_thach',
    breakdown: 'h - oa - sắc, th - ach - nặng',
    spellText: 'Hờ - oa - hoa - sắc - hóa, thờ - ach - thach - nặng - thạch -> hóa thạch',
    icon: DINO_PHOTOS.hoa_thach,
    ja: 'かせき (Fossil)',
    funFact: 'Xương khủng long nằm sâu trong lòng đất triệu năm để bé khám phá!',
    example: 'Nhà khảo cổ học tìm thấy hóa thạch'
  }
];

// CHUYÊN MỤC: THẾ GIỚI CÁC LOẠI XE (VEHICLES WORLD - 12 PHƯƠNG TIỆN)
const VEHICLE_LESSONS = [
  {
    id: 'veh1',
    word: 'xe cảnh sát',
    vehName: 'Xe Cảnh Sát (Patrol Car)',
    audioKey: 'veh_xe_canh_sat',
    spellKey: 'spell_xe_canh_sat',
    breakdown: 'x - e, c - anh - hỏi, s - at - sắc',
    spellText: 'Xờ - e - xe, cờ - anh - canh - hỏi - cảnh, sờ - at - sat - sắc - sát -> xe cảnh sát',
    icon: VEHICLE_PHOTOS.xe_canh_sat,
    ja: 'パトカー (Patokaa)',
    funFact: 'Đèn chớp đỏ, còi hú vang dội, các chú cảnh sát Nhật Bản tuần tra bảo vệ bình yên!',
    example: 'Xe cảnh sát tuần tra trên phố'
  },
  {
    id: 'veh2',
    word: 'xe cứu hỏa',
    vehName: 'Xe Cứu Hỏa (Fire Truck)',
    audioKey: 'veh_xe_cuu_hoa',
    spellKey: 'spell_xe_cuu_hoa',
    breakdown: 'x - e, c - ưu - sắc, h - oa - hỏi',
    spellText: 'Xờ - e - xe, cờ - ưu - cưu - sắc - cứu, hờ - oa - hoa - hỏi - hỏa -> xe cứu hỏa',
    icon: VEHICLE_PHOTOS.xe_cuu_hoa,
    ja: 'しょうぼうしゃ (Shoubousha)',
    funFact: 'Màu đỏ rực rỡ, mang thang dài và vòi rồng dập tắt ngọn lửa khổng lồ!',
    example: 'Xe cứu hỏa chạy nhanh tới đám cháy'
  },
  {
    id: 'veh3',
    word: 'xe cứu thương',
    vehName: 'Xe Cứu Thương (Ambulance)',
    audioKey: 'veh_xe_cuu_thuong',
    spellKey: 'spell_xe_cuu_thuong',
    breakdown: 'x - e, c - ưu - sắc, th - ương',
    spellText: 'Xờ - e - xe, cờ - ưu - cưu - sắc - cứu, thờ - ương - thương -> xe cứu thương',
    icon: VEHICLE_PHOTOS.xe_cuu_thuong,
    ja: 'きゅうきゅうしゃ (Kyuukyuusha)',
    funFact: 'Chở bác sĩ và bệnh nhân đến bệnh viện kịp thời, xe cộ nhường đường!',
    example: 'Xe cứu thương chở bệnh nhân cấp cứu'
  },
  {
    id: 'veh4',
    word: 'máy xúc',
    vehName: 'Máy Xúc Đất (Excavator)',
    audioKey: 'veh_may_xuc',
    spellKey: 'spell_may_xuc',
    breakdown: 'm - ay - sắc, x - uc - sắc',
    spellText: 'Mờ - ay - may - sắc - máy, xờ - uc - xuc - sắc - xúc -> máy xúc',
    icon: VEHICLE_PHOTOS.may_xuc,
    ja: 'ショベルカー (Shoberukaa)',
    funFact: 'Chiếc cánh tay sắt khổng lồ múc đất đá khỏe như một dũng sĩ công trường!',
    example: 'Máy xúc đào đất làm đường mới'
  },
  {
    id: 'veh5',
    word: 'xe buýt',
    vehName: 'Xe Buýt (City Bus)',
    audioKey: 'veh_xe_buyt',
    spellKey: 'spell_xe_buyt',
    breakdown: 'x - e, b - uyt - sắc',
    spellText: 'Xờ - e - xe, bờ - uyt - buyt - sắc - buýt -> xe buýt',
    icon: VEHICLE_PHOTOS.xe_buyt,
    ja: 'バス (Basu)',
    funFact: 'Xe dài nhiều chỗ ngồi, đón các bạn nhỏ Bảo Long đến trường mỗi ngày!',
    example: 'Bảo Long lên xe buýt đi học'
  },
  {
    id: 'veh6',
    word: 'xe tải',
    vehName: 'Xe Tải (Cargo Truck)',
    audioKey: 'veh_xe_tai',
    spellKey: 'spell_xe_tai',
    breakdown: 'x - e, t - ai - hỏi',
    spellText: 'Xờ - e - xe, tờ - ai - tai - hỏi - tải -> xe tải',
    icon: VEHICLE_PHOTOS.xe_tai,
    ja: 'トラック (Torakku)',
    funFact: 'Thùng xe to lớn chở đồ chơi, hoa quả và hàng hóa đi khắp mọi miền!',
    example: 'Xe tải chở hàng hóa nặng'
  },
  {
    id: 'veh7',
    word: 'tàu hỏa',
    vehName: 'Tàu Hỏa / Shinkansen',
    audioKey: 'veh_tau_hoa',
    spellKey: 'spell_tau_hoa',
    breakdown: 't - au - huyền, h - oa - hỏi',
    spellText: 'Tờ - au - tau - huyền - tàu, hờ - oa - hoa - hỏi - hỏa -> tàu hỏa',
    icon: VEHICLE_PHOTOS.tau_hoa,
    ja: 'しんかんせん / でんしゃ (Shinkansen)',
    funFact: 'Tàu điện Shinkansen hình viên đạn chạy siêu tốc vút như cơn gió ở Nhật!',
    example: 'Tàu hỏa chạy trên đường ray bon bon'
  },
  {
    id: 'veh8',
    word: 'máy bay',
    vehName: 'Máy Bay (Airplane)',
    audioKey: 'veh_may_bay',
    spellKey: 'spell_may_bay',
    breakdown: 'm - ay - sắc, b - ay',
    spellText: 'Mờ - ay - may - sắc - máy, bờ - ay - bay -> máy bay',
    icon: VEHICLE_PHOTOS.may_bay,
    ja: 'ひこうき (Hikouki)',
    funFact: 'Đôi cánh bạc lướt trên bầu trời đưa bé Bảo Long từ Nhật về thăm Việt Nam!',
    example: 'Máy bay đưa bé bay trên mây'
  },
  {
    id: 'veh9',
    word: 'trực thăng',
    vehName: 'Máy Bay Trực Thăng (Helicopter)',
    audioKey: 'veh_truc_thang',
    spellKey: 'spell_truc_thang',
    breakdown: 'tr - ưc - nặng, th - ăng',
    spellText: 'Trờ - ưc - trưc - nặng - trực, thờ - ăng - thăng -> trực thăng',
    icon: VEHICLE_PHOTOS.truc_thang,
    ja: 'ヘリコプター (Herikoputaa)',
    funFact: 'Cánh quạt quay tít trên đỉnh đầu, cất cánh thẳng đứng lên không trung!',
    example: 'Trực thăng cứu hộ bay trên đỉnh núi'
  },
  {
    id: 'veh10',
    word: 'tàu thủy',
    vehName: 'Tàu Thủy (Ship)',
    audioKey: 'veh_tau_thuy',
    spellKey: 'spell_tau_thuy',
    breakdown: 't - au - huyền, th - uy - hỏi',
    spellText: 'Tờ - au - tau - huyền - tàu, thờ - uy - thuy - hỏi - thủy -> tàu thủy',
    icon: VEHICLE_PHOTOS.tau_thuy,
    ja: 'ふね (Fune)',
    funFact: 'Chiếc tàu khổng lồ rẽ sóng trắng xóa lướt êm trên đại dương bao la!',
    example: 'Tàu thủy chở hàng ra khơi'
  },
  {
    id: 'veh11',
    word: 'xe con',
    vehName: 'Xe Ô Tô Con (Family Car)',
    audioKey: 'veh_xe_con',
    spellKey: 'spell_xe_con',
    breakdown: 'x - e, c - on',
    spellText: 'Xờ - e - xe, cờ - on - con -> xe con',
    icon: VEHICLE_PHOTOS.xe_con,
    ja: 'くるま (Kuruma)',
    funFact: 'Chiếc xe hơi gia đình chở cả nhà Bảo Long đi chơi công viên cuối tuần!',
    example: 'Ba lái xe con đưa cả nhà đi chơi'
  },
  {
    id: 'veh12',
    word: 'xe đạp',
    vehName: 'Xe Đạp (Bicycle)',
    audioKey: 'veh_xe_dap',
    spellKey: 'spell_xe_dap',
    breakdown: 'x - e, đ - ap - nặng',
    spellText: 'Xờ - e - xe, đờ - ap - đap - nặng - đạp -> xe đạp',
    icon: VEHICLE_PHOTOS.xe_dap,
    ja: 'じてんしゃ (Jitensha)',
    funFact: 'Bảo Long đạp hai bàn đạp quay đều, rèn luyện sức khỏe dẻo dai!',
    example: 'Bảo Long tập đi xe đạp'
  }
];

// DỮ LIỆU ĐẦY ĐỦ CHO GAME LẬT THẺ KHỦNG LONG (10 LOÀI -> CHỌN NGẪU NHIÊN 6 CẶP MỖI VÁN)
const DINO_MEMORY_POOL = [
  { id: 'pair1', name: 'T-Rex Bạo Chúa', icon: DINO_PHOTOS.bao_chua, ja: 'ティラノサウルス', audioKey: 'dino_bao_chua' },
  { id: 'pair2', name: 'Ba Sừng Dũng Mãnh', icon: DINO_PHOTOS.ba_sung, ja: 'トリケラトプス', audioKey: 'dino_ba_sung' },
  { id: 'pair3', name: 'Cổ Dài Cao Lớn', icon: DINO_PHOTOS.co_dai, ja: 'ブラキオサウルス', audioKey: 'dino_co_dai' },
  { id: 'pair4', name: 'Khủng Long Bay', icon: DINO_PHOTOS.khung_long_bay, ja: 'プテラノドン', audioKey: 'dino_khung_long_bay' },
  { id: 'pair5', name: 'Đuôi Gai Sắc Nhọn', icon: DINO_PHOTOS.duoi_gai, ja: 'ステゴサウルス', audioKey: 'dino_duoi_gai' },
  { id: 'pair6', name: 'Giáp Búa Ankylosaurus', icon: DINO_PHOTOS.giap_bua, ja: 'アンキロサウルス', audioKey: 'dino_giap_bua' },
  { id: 'pair7', name: 'Chạy Nhanh Velociraptor', icon: DINO_PHOTOS.chay_nhanh, ja: 'ヴェロキラプトル', audioKey: 'dino_chay_nhanh' },
  { id: 'pair8', name: 'Tổ Trứng Khủng Long', icon: DINO_PHOTOS.trung, ja: 'たまご', audioKey: 'dino_trung' },
  { id: 'pair9', name: 'Dấu Chân Tiền Sử', icon: DINO_PHOTOS.dau_chan, ja: 'あしあと', audioKey: 'dino_dau_chan' },
  { id: 'pair10', name: 'Hóa Thạch Xương', icon: DINO_PHOTOS.hoa_thach, ja: 'かせき', audioKey: 'dino_hoa_thach' }
];

// DỮ LIỆU ĐỐ VUI KHỦNG LONG (ĐẦY ĐỦ 10 LOÀI KHỦNG LONG)
const DINO_QUIZ_DATA = [
  {
    id: 'dquiz1',
    question: 'Bảo Long ơi, chú khủng long nào có mai giáp cứng như xe tăng và đuôi có quả chuỳ búa sắt?',
    hint: 'Khủng long bọc giáp (Ankylosaurus) đuôi chùy!',
    audioKey: 'dino_giap_bua',
    correctId: 'dino6',
    options: ['dino6', 'dino2', 'dino1', 'dino3']
  },
  {
    id: 'dquiz2',
    question: 'Chú khủng long nào có 3 chiếc sừng dũng mãnh và tấm khiên xương to lớn bảo vệ cổ?',
    hint: 'Khủng long ba sừng Triceratops dũng cảm!',
    audioKey: 'dino_ba_sung',
    correctId: 'dino2',
    options: ['dino2', 'dino5', 'dino4', 'dino7']
  },
  {
    id: 'dquiz3',
    question: 'Ai là "Vua Khủng Long" bạo chúa với hàm răng sắc nhọn và tiếng gầm vang dội?',
    hint: 'T-Rex Bạo chúa chúa tể muôn loài!',
    audioKey: 'dino_bao_chua',
    correctId: 'dino1',
    options: ['dino1', 'dino3', 'dino8', 'dino5']
  },
  {
    id: 'dquiz4',
    question: 'Chú khủng long nào có chiếc cổ siêu dài vươn cao tới ngọn cây để ăn lá non?',
    hint: 'Khủng long Cổ dài Brachiosaurus hiền lành!',
    audioKey: 'dino_co_dai',
    correctId: 'dino3',
    options: ['dino3', 'dino1', 'dino6', 'dino2']
  },
  {
    id: 'dquiz5',
    question: 'Loài nào có đôi cánh da khổng lồ chao liệng trên bầu trời xanh tiền sử?',
    hint: 'Thằn lằn bay Pteranodon vút bay lượn!',
    audioKey: 'dino_khung_long_bay',
    correctId: 'dino4',
    options: ['dino4', 'dino7', 'dino2', 'dino6']
  },
  {
    id: 'dquiz6',
    question: 'Chú khủng long nào có hai hàng phiến sừng trên lưng và 4 gai nhọn tự vệ ở đuôi?',
    hint: 'Khủng long Đuôi gai Stegosaurus!',
    audioKey: 'dino_duoi_gai',
    correctId: 'dino5',
    options: ['dino5', 'dino6', 'dino3', 'dino1']
  },
  {
    id: 'dquiz7',
    question: 'Chú khủng long nào thông minh, chạy nhanh thoăn thoắt với móng vuốt lưỡi liềm?',
    hint: 'Khủng long Chạy nhanh Velociraptor!',
    audioKey: 'dino_chay_nhanh',
    correctId: 'dino7',
    options: ['dino7', 'dino4', 'dino2', 'dino5']
  },
  {
    id: 'dquiz8',
    question: 'Bảo Long hãy tìm Tổ Trứng sắp nở ra những chú khủng long con đáng yêu nào!',
    hint: 'Trứng khủng long rạn nứt chuẩn bị nở con!',
    audioKey: 'dino_trung',
    correctId: 'dino8',
    options: ['dino8', 'dino9', 'dino10', 'dino1']
  },
  {
    id: 'dquiz9',
    question: 'Đâu là Dấu Chân khủng long khổng lồ in hằn trên nền đá cổ đại?',
    hint: 'Dấu chân 3 ngón siêu to của khủng long!',
    audioKey: 'dino_dau_chan',
    correctId: 'dino9',
    options: ['dino9', 'dino8', 'dino10', 'dino3']
  },
  {
    id: 'dquiz10',
    question: 'Các nhà khảo cổ tìm thấy bộ xương Hóa Thạch khủng long ở đâu nào?',
    hint: 'Hóa thạch xương khủng long trong bảo tàng!',
    audioKey: 'dino_hoa_thach',
    correctId: 'dino10',
    options: ['dino10', 'dino9', 'dino8', 'dino6']
  }
];

// DỮ LIỆU ĐỐ VUI XE CỘ ĐẦY ĐỦ 12 PHƯƠNG TIỆN (ĐÃ SỬA ĐÚNG 100% ID veh1..veh12)
const VEHICLE_QUIZ_DATA = [
  { targetId: 'veh1', question: 'Bảo Long tìm giúp chú Xe Cảnh Sát tuần tra nào!', ja: '🇯🇵 パトカー (Patokaa) はどれ？', distractors: ['veh2', 'veh3', 'veh11'] },
  { targetId: 'veh2', question: 'Bảo Long ơi, đâu là chiếc Xe Cứu Hỏa màu đỏ chữa cháy?', ja: '🇯🇵 しょうぼうしゃ (Shoubousha) はどれ？', distractors: ['veh1', 'veh3', 'veh6'] },
  { targetId: 'veh3', question: 'Xe nào đưa bệnh nhân đến bệnh viện cấp cứu thật nhanh?', ja: '🇯🇵 きゅうきゅうしゃ (Kyuukyuusha) はどれ？', distractors: ['veh1', 'veh5', 'veh2'] },
  { targetId: 'veh4', question: 'Xe nào có gầu xúc đất khỏe mạnh ở công trường?', ja: '🇯🇵 ショベルカー (Shoberukaa) はどれ？', distractors: ['veh6', 'veh5', 'veh12'] },
  { targetId: 'veh5', question: 'Xe nào dài nhiều chỗ ngồi chở các bạn đi học mỗi ngày?', ja: '🇯🇵 バス (Basu) はどれ？', distractors: ['veh6', 'veh11', 'veh7'] },
  { targetId: 'veh6', question: 'Xe nào có thùng lớn chở hàng hóa nặng bon bon trên đường?', ja: '🇯🇵 トラック (Torakku) はどれ？', distractors: ['veh4', 'veh5', 'veh3'] },
  { targetId: 'veh7', question: 'Đâu là Tàu Hỏa / Shinkansen siêu tốc hình viên đạn ở Nhật?', ja: '🇯🇵 しんかんせん (Shinkansen) はどれ？', distractors: ['veh8', 'veh5', 'veh10'] },
  { targetId: 'veh8', question: 'Phương tiện nào có đôi cánh bay vút trên bầu trời xanh?', ja: '🇯🇵 ひこうき (Hikouki) はどれ？', distractors: ['veh9', 'veh7', 'veh10'] },
  { targetId: 'veh9', question: 'Phương tiện nào có cánh quạt quay tít trên đỉnh đầu?', ja: '🇯🇵 ヘリコプター (Herikoputaa) はどれ？', distractors: ['veh8', 'veh4', 'veh12'] },
  { targetId: 'veh10', question: 'Phương tiện nào rẽ sóng trắng xóa lướt trên đại dương?', ja: '🇯🇵 ふね (Fune) はどれ？', distractors: ['veh7', 'veh8', 'veh6'] },
  { targetId: 'veh11', question: 'Đâu là chiếc Xe Ô Tô Con chở gia đình Bảo Long đi chơi?', ja: '🇯🇵 くるま (Kuruma) はどれ？', distractors: ['veh1', 'veh5', 'veh12'] },
  { targetId: 'veh12', question: 'Đâu là chiếc Xe Đạp hai bánh cho Bảo Long tập thể dục?', ja: '🇯🇵 じてんしゃ (Jitensha) はどれ？', distractors: ['veh11', 'veh4', 'veh9'] }
];

// DỮ LIỆU GAME 3: KHAI QUẬT HÓA THẠCH KHỦNG LONG KỲ BÍ (DINO FOSSIL EXCAVATION)
const DINO_DIG_DATA = [
  {
    id: 'dig1',
    name: 'Khủng long bạo chúa (T-Rex)',
    ja: 'ティラノサウルス (T-Rex)',
    audioKey: 'dino_bao_chua',
    hitsRequired: 5,
    fossilSilhouette: `<svg viewBox="0 0 100 100" class="dino-fossil-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 60 Q45 50 65 52 Q75 35 60 25 Q45 28 40 40 Z" fill="#78350f" opacity="0.85"/>
      <circle cx="58" cy="32" r="4" fill="#1e293b"/>
      <path d="M50 42 L52 46 L54 42 L56 46 L58 42" stroke="#ffffff" stroke-width="2"/>
    </svg>`,
    revivedIcon: DINO_PHOTOS.bao_chua,
    celebrationText: 'Bảo Long đã khai quật thành công Vua Khủng Long T-Rex dũng mãnh!'
  },
  {
    id: 'dig2',
    name: 'Khủng long ba sừng (Triceratops)',
    ja: 'トリケラトプス (Triceratops)',
    audioKey: 'dino_ba_sung',
    hitsRequired: 5,
    fossilSilhouette: `<svg viewBox="0 0 100 100" class="dino-fossil-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="55" rx="20" ry="12" fill="#78350f" opacity="0.85"/>
      <path d="M56 36 C56 26 72 26 74 44 Z" fill="#92400e"/>
      <path d="M68 40 L82 32 M78 44 L88 42" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    revivedIcon: DINO_PHOTOS.ba_sung,
    celebrationText: 'Bảo Long đã khai quật thành công Khủng long ba sừng Triceratops!'
  },
  {
    id: 'dig3',
    name: 'Khủng long bọc giáp (Ankylosaurus)',
    ja: 'アンキロサウルス (Ankylosaurus)',
    audioKey: 'dino_giap_bua',
    hitsRequired: 5,
    fossilSilhouette: `<svg viewBox="0 0 100 100" class="dino-fossil-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="52" rx="24" ry="14" fill="#78350f" opacity="0.85"/>
      <path d="M26 56 Q16 60 10 58" stroke="#451a03" stroke-width="6"/>
      <circle cx="8" cy="58" r="6" fill="#451a03"/>
    </svg>`,
    revivedIcon: DINO_PHOTOS.giap_bua,
    celebrationText: 'Bảo Long đã khai quật thành công Khủng long bọc giáp Ankylosaurus đuôi chùy!'
  },
  {
    id: 'dig4',
    name: 'Khủng long cổ dài (Brachiosaurus)',
    ja: 'ブラキオサウルス (Brachiosaurus)',
    audioKey: 'dino_co_dai',
    hitsRequired: 5,
    fossilSilhouette: `<svg viewBox="0 0 100 100" class="dino-fossil-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="68" rx="20" ry="12" fill="#78350f" opacity="0.85"/>
      <path d="M48 68 C52 48 58 28 72 18" stroke="#78350f" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="74" cy="18" r="6" fill="#78350f"/>
    </svg>`,
    revivedIcon: DINO_PHOTOS.co_dai,
    celebrationText: 'Bảo Long đã khai quật thành công Khủng long cổ dài Brachiosaurus!'
  },
  {
    id: 'dig5',
    name: 'Khủng long đuôi gai (Stegosaurus)',
    ja: 'ステゴサウルス (Stegosaurus)',
    audioKey: 'dino_duoi_gai',
    hitsRequired: 5,
    fossilSilhouette: `<svg viewBox="0 0 100 100" class="dino-fossil-svg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="48" cy="60" rx="24" ry="14" fill="#78350f" opacity="0.85"/>
      <polygon points="34,46 38,34 44,45" fill="#f97316"/>
      <polygon points="45,43 50,30 55,43" fill="#ea580c"/>
      <polygon points="56,43 61,31 67,45" fill="#f97316"/>
    </svg>`,
    revivedIcon: DINO_PHOTOS.duoi_gai,
    celebrationText: 'Bảo Long đã khai quật thành công Khủng long đuôi gai Stegosaurus!'
  }
];

const SPELL_BUILDER_DATA = [
  { target: 'ba', meaning: 'Bố / Ba (お父さん)', icon: '👨', puzzle: ['b', 'a'], options: ['b', 'a', 'c', 'm', 'd'] },
  { target: 'bà', meaning: 'Bà ngoại / Bà nội (おばあさん)', icon: '👵', puzzle: ['b', 'à'], options: ['b', 'à', 'á', 'm', 'n'] },
  { target: 'bố', meaning: 'Bố (お父さん)', icon: '🧔', puzzle: ['b', 'ố'], options: ['b', 'ố', 'ô', 'h', 'g'] },
  { target: 'mẹ', meaning: 'Mẹ (お母さん)', icon: '👩', puzzle: ['m', 'ẹ'], options: ['m', 'ẹ', 'e', 'b', 'l'] },
  { target: 'bò', meaning: 'Con bò (うし)', icon: '🐮', puzzle: ['b', 'ò'], options: ['b', 'ò', 'o', 'c', 'đ'] },
  { target: 'cá', meaning: 'Con cá (さかな)', icon: '🐟', puzzle: ['c', 'á'], options: ['c', 'á', 'a', 'g', 't'] },
  { target: 'gà', meaning: 'Con gà (にわとり)', icon: '🐔', puzzle: ['g', 'à'], options: ['g', 'à', 'a', 'b', 'k'] },
  { target: 'cặp', meaning: 'Cặp sách (ランドセル)', icon: '🎒', puzzle: ['c', 'ặp'], options: ['c', 'ặp', 'ắp', 'd', 's'] },
  { target: 'dép', meaning: 'Đôi dép (サンダル)', icon: '🩴', puzzle: ['d', 'ép'], options: ['d', 'ép', 'ep', 'b', 't'] },
  { target: 'bếp', meaning: 'Cái bếp (だいどころ)', icon: '🍳', puzzle: ['b', 'ếp'], options: ['b', 'ếp', 'êp', 'p', 'm'] },
  { target: 'xe', meaning: 'Xe cộ (くるま)', icon: '🚗', puzzle: ['x', 'e'], options: ['x', 'e', 'a', 'c', 't'] },
  { target: 'tàu', meaning: 'Tàu điện (でんしゃ)', icon: '🚅', puzzle: ['t', 'àu'], options: ['t', 'àu', 'au', 'm', 'n'] }
];

// DỮ LIỆU GAME MỚI 1: 🚅 TÀU SHINKANSEN ĐÁNH VẦN (SHINKANSEN PHONICS BUILDER)
const SHINKANSEN_WORDS_DATA = [
  { head: 'b', correctTail: 'a', headOptions: ['b', 'c', 'm'], tailOptions: ['a', 'à', 'á'], word: 'ba', meaning: 'Ba / Bố', icon: '👨', ja: 'お父さん' },
  { head: 'x', correctTail: 'e', headOptions: ['x', 's', 't'], tailOptions: ['e', 'a', 'ê'], word: 'xe', meaning: 'Xe ô tô', icon: '🚗', ja: 'くるま' },
  { head: 'c', correctTail: 'á', headOptions: ['c', 'k', 'g'], tailOptions: ['á', 'à', 'a'], word: 'cá', meaning: 'Con cá', icon: '🐟', ja: 'さかな' },
  { head: 'g', correctTail: 'à', headOptions: ['g', 'c', 'b'], tailOptions: ['à', 'á', 'a'], word: 'gà', meaning: 'Con gà', icon: '🐔', ja: 'にわとり' },
  { head: 'ch', correctTail: 'ó', headOptions: ['ch', 'tr', 'th'], tailOptions: ['ó', 'ò', 'o'], word: 'chó', meaning: 'Con chó', icon: '🐶', ja: 'いぬ' },
  { head: 't', correctTail: 'àu', headOptions: ['t', 'đ', 'l'], tailOptions: ['àu', 'au', 'áo'], word: 'tàu', meaning: 'Tàu Shinkansen', icon: '🚅', ja: 'しんかんせん' },
  { head: 'c', correctTail: 'ơm', headOptions: ['c', 'm', 'n'], tailOptions: ['ơm', 'ơ', 'am'], word: 'cơm', meaning: 'Cơm trắng', icon: '🍚', ja: 'ごはん' },
  { head: 's', correctTail: 'ữa', headOptions: ['s', 'x', 'ch'], tailOptions: ['ữa', 'ưa', 'ứ'], word: 'sữa', meaning: 'Sữa tươi', icon: '🥛', ja: 'ぎゅうにゅう' },
  { head: 'nh', correctTail: 'o', headOptions: ['nh', 'ng', 'ch'], tailOptions: ['o', 'ô', 'ơ'], word: 'nho', meaning: 'Chùm nho', icon: '🍇', ja: 'ぶどう' },
  { head: 'th', correctTail: 'ỏ', headOptions: ['th', 'tr', 't'], tailOptions: ['ỏ', 'ò', 'ó'], word: 'thỏ', meaning: 'Con thỏ', icon: '🐇', ja: 'うさぎ' },
  { head: 'k', correctTail: 'ẹo', headOptions: ['k', 'c', 'b'], tailOptions: ['ẹo', 'eo', 'éo'], word: 'kẹo', meaning: 'Viên kẹo', icon: '🍬', ja: 'あめ' },
  { head: 'gh', correctTail: 'ế', headOptions: ['gh', 'g', 'ng'], tailOptions: ['ế', 'ê', 'ệ'], word: 'ghế', meaning: 'Cái ghế', icon: '🪑', ja: 'いす' },
  { head: 'ph', correctTail: 'ở', headOptions: ['ph', 'th', 'kh'], tailOptions: ['ở', 'ơ', 'ờ'], word: 'phở', meaning: 'Bát phở', icon: '🍜', ja: 'フォー' },
  { head: 'v', correctTail: 'ẹt', headOptions: ['v', 'd', 'b'], tailOptions: ['ẹt', 'et', 'ét'], word: 'vẹt', meaning: 'Con vẹt', icon: '🦜', ja: 'オウム' },
  { head: 's', correctTail: 'ách', headOptions: ['s', 'x', 'c'], tailOptions: ['ách', 'ach', 'ich'], word: 'sách', meaning: 'Quyển sách', icon: '📚', ja: 'ほん' },
  { head: 'tr', correctTail: 'ứng', headOptions: ['tr', 'ch', 't'], tailOptions: ['ứng', 'ưng', 'ừng'], word: 'trứng', meaning: 'Trứng khủng long', icon: '🥚', ja: 'たまご' },
  { head: 'b', correctTail: 'iển', headOptions: ['b', 'đ', 'v'], tailOptions: ['iển', 'iên', 'iêm'], word: 'biển', meaning: 'Biển xanh', icon: '🌊', ja: 'うみ' },
  { head: 'v', correctTail: 'ườn', headOptions: ['v', 'tr', 'b'], tailOptions: ['ườn', 'ươn', 'ương'], word: 'vườn', meaning: 'Khu vườn', icon: '🪴', ja: 'にわ' },
  { head: 'tr', correctTail: 'ường', headOptions: ['tr', 'ch', 'l'], tailOptions: ['ường', 'ương', 'uông'], word: 'trường', meaning: 'Trường học', icon: '🏫', ja: 'がっこう' },
  { head: 'x', correctTail: 'uân', headOptions: ['x', 's', 't'], tailOptions: ['uân', 'ân', 'uyên'], word: 'xuân', meaning: 'Mùa xuân', icon: '🌸', ja: 'はる' },
  { head: 't', correctTail: 'uyết', headOptions: ['t', 'th', 'đ'], tailOptions: ['uyết', 'uyêt', 'iêt'], word: 'tuyết', meaning: 'Tuyết trắng', icon: '❄️', ja: 'ゆき' },
  { head: 'ngh', correctTail: 'é', headOptions: ['ngh', 'ng', 'gh'], tailOptions: ['é', 'á', 'ó'], word: 'nghé', meaning: 'Con nghé', icon: '🐃', ja: '子水牛' },
  { head: 'h', correctTail: 'oa', headOptions: ['h', 'l', 'th'], tailOptions: ['oa', 'oe', 'ai'], word: 'hoa', meaning: 'Bông hoa', icon: '🌸', ja: 'はな' },
  { head: 'ch', correctTail: 'uông', headOptions: ['ch', 'tr', 'c'], tailOptions: ['uông', 'ương', 'ôn'], word: 'chuông', meaning: 'Quả chuông', icon: '🔔', ja: 'かね' }
];

// DỮ LIỆU GAME MỚI 2: 👂 NGHE ÂM BẮT CHỮ (AUDIO-FIRST PHONEME CHALLENGE)
const LISTEN_CATCH_POOLS = {
  tricky: [
    { prompt: 'Chữ S (sờ uốn lưỡi - như quyển sách)', target: 's', choices: ['s', 'x', 'c', 't'], audioKey: 'alpha_s', hint: 'Uốn cong đầu lưỡi nhẹ' },
    { prompt: 'Chữ X (xờ nhẹ - như xe ô tô)', target: 'x', choices: ['x', 's', 'k', 'ch'], audioKey: 'alpha_x', hint: 'Thẳng lưỡi nhẹ nhàng' },
    { prompt: 'Chữ K (phát âm là "ca")', target: 'k', choices: ['k', 'c', 'h', 'q'], audioKey: 'alpha_k', hint: 'Đi với i, e, ê: kéo, kem' },
    { prompt: 'Chữ C (phát âm là "cờ")', target: 'c', choices: ['c', 'k', 'g', 'o'], audioKey: 'alpha_c', hint: 'Con cá, cái cốc' },
    { prompt: 'Chữ Â (phát âm là "ớ" - cái cây)', target: 'â', choices: ['â', 'ă', 'a', 'ơ'], audioKey: 'alpha_â', hint: 'Có chiếc mũ nón nhỏ trên đầu' },
    { prompt: 'Chữ Ă (phát âm là "á" - mặt trăng)', target: 'ă', choices: ['ă', 'â', 'a', 'u'], audioKey: 'alpha_ă', hint: 'Có chiếc trăng khuyết trên đầu' },
    { prompt: 'Chữ Đ (phát âm là "đờ" - hòn đá)', target: 'đ', choices: ['đ', 'd', 'b', 'p'], audioKey: 'alpha_đ', hint: 'Có nét gạch ngang qua thân' },
    { prompt: 'Chữ D (phát âm là "dờ" - con dê)', target: 'd', choices: ['d', 'đ', 'gi', 'b'], audioKey: 'alpha_d', hint: 'Không có gạch ngang' },
    { prompt: 'Chữ Ư (phát âm là "ư" - sư tử)', target: 'ư', choices: ['ư', 'u', 'ơ', 'ô'], audioKey: 'alpha_ư', hint: 'Có chiếc râu nhỏ bên phải' },
    { prompt: 'Chữ Ơ (phát âm là "ơ" - lá cờ)', target: 'ơ', choices: ['ơ', 'ô', 'o', 'ư'], audioKey: 'alpha_ơ', hint: 'Hình tròn có chiếc râu nhỏ' },
    { prompt: 'Chữ GH (gờ ghép - cái ghế)', target: 'gh', choices: ['gh', 'g', 'ng', 'ngh'], audioKey: 'alpha_gh', hint: 'Chỉ đi cùng e, ê, i' },
    { prompt: 'Chữ NGH (ngờ ghép - con nghé)', target: 'ngh', choices: ['ngh', 'ng', 'gh', 'nh'], audioKey: 'alpha_ngh', hint: 'NGH chỉ đi với e, ê, i' },
    { prompt: 'Chữ TR (trờ cong lưỡi - trứng)', target: 'tr', choices: ['tr', 'ch', 'th', 't'], audioKey: 'alpha_tr', hint: 'Uốn đầu lưỡi đọc đậm' },
    { prompt: 'Chữ CH (chờ nhẹ - con chó)', target: 'ch', choices: ['ch', 'tr', 'c', 'kh'], audioKey: 'alpha_ch', hint: 'Đọc nhẹ thẳng lưỡi: chó, chim' },
    { prompt: 'Chữ L (lờ - chiếc lá)', target: 'l', choices: ['l', 'n', 'h', 't'], audioKey: 'alpha_l', hint: 'Uốn đầu lưỡi chạm vòm trên' },
    { prompt: 'Chữ N (nờ - cái nơ)', target: 'n', choices: ['n', 'l', 'm', 'ng'], audioKey: 'alpha_n', hint: 'Âm mũi nhẹ nhàng' }
  ],
  words: [
    { prompt: 'Tìm từ: "cá" (Con cá 🐟)', target: 'cá', choices: ['cá', 'gà', 'ba', 'lá'], audioKey: 'word_cá', hint: '🐟さかな' },
    { prompt: 'Tìm từ: "sữa" (Sữa tươi 🥛)', target: 'sữa', choices: ['sữa', 'xôi', 'mưa', 'cơm'], audioKey: 'word_sữa', hint: '🥛ぎゅうにゅう' },
    { prompt: 'Tìm từ: "xe" (Xe ô tô 🚗)', target: 'xe', choices: ['xe', 'số', 'dê', 'me'], audioKey: 'word_xe', hint: '🚗くるま' },
    { prompt: 'Tìm từ: "sách" (Quyển sách 📚)', target: 'sách', choices: ['sách', 'xanh', 'gạch', 'cách'], audioKey: 'word_sách', hint: '📚ほん' },
    { prompt: 'Tìm từ: "kéo" (Cái kéo ✂️)', target: 'kéo', choices: ['kéo', 'kẹo', 'cáo', 'mèo'], audioKey: 'word_kéo', hint: '✂️はさみ' },
    { prompt: 'Tìm từ: "cơm" (Cơm trắng 🍚)', target: 'cơm', choices: ['cơm', 'cam', 'kem', 'tôm'], audioKey: 'word_cơm', hint: '🍚ごはん' },
    { prompt: 'Tìm từ: "vẹt" (Con vẹt 🦜)', target: 'vẹt', choices: ['vẹt', 'vịt', 'mắt', 'cát'], audioKey: 'word_vẹt', hint: '🦜オウム' },
    { prompt: 'Tìm từ: "chó" (Con chó 🐶)', target: 'chó', choices: ['chó', 'mèo', 'bò', 'gà'], audioKey: 'word_chó', hint: '🐶いぬ' },
    { prompt: 'Tìm từ: "biển" (Biển xanh 🌊)', target: 'biển', choices: ['biển', 'vườn', 'tiếng', 'viết'], audioKey: 'word_biển', hint: '🌊うみ' },
    { prompt: 'Tìm từ: "trường" (Trường học 🏫)', target: 'trường', choices: ['trường', 'chuông', 'vườn', 'lược'], audioKey: 'word_trường', hint: '🏫がっこう' },
    { prompt: 'Tìm từ: "tuyết" (Tuyết trắng ❄️)', target: 'tuyết', choices: ['tuyết', 'thuyền', 'xuân', 'luật'], audioKey: 'word_tuyết', hint: '❄️ゆき' },
    { prompt: 'Tìm từ: "ghế" (Cái ghế 🪑)', target: 'ghế', choices: ['ghế', 'gỗ', 'nghé', 'nhà'], audioKey: 'word_ghế', hint: '🪑いす' },
    { prompt: 'Tìm từ: "trứng" (Trứng khủng long 🥚)', target: 'trứng', choices: ['trứng', 'chân', 'nước', 'sừng'], audioKey: 'dino_trung', hint: '🥚たまご' },
    { prompt: 'Tìm từ: "tàu hỏa" (Tàu Shinkansen 🚅)', target: 'tàu hỏa', choices: ['tàu hỏa', 'máy bay', 'xe tải', 'xe buýt'], audioKey: 'veh_tau_hoa', hint: '🚅しんかんせん' }
  ]
};

// 6 QUY TẮC CHÍNH TẢ VÀNG LỚP 1 & TRÒ CHƠI CHÍNH TẢ (HK1 + HK2)
const ORTHOGRAPHY_RULES_DATA = [
  { id: 'ort_ck', pair: 'C / K', title: 'Chữ K chỉ đi với i, e, ê', rule: 'Đứng trước I, E, Ê dùng chữ K (kiến, kéo, kênh). Các âm còn lại dùng C (cá, cờ, cú)!', example: '🐜 kiến, ✂️ kéo  |  🐟 cá, 🚩 cờ', audioKey: 'ort_ck' },
  { id: 'ort_ggh', pair: 'G / GH', title: 'Chữ GH chỉ đi với i, e, ê', rule: 'G ghép (GH) luôn đứng trước E, Ê, I (ghế, ghe, ghi). Còn lại dùng G đơn (gà, gỗ, gấu)!', example: '🪑 ghế, 🛶 ghe  |  🐔 gà, 🪵 gỗ', audioKey: 'ort_ggh' },
  { id: 'ort_ngngh', pair: 'NG / NGH', title: 'Chữ NGH chỉ đi với i, e, ê', rule: 'NGH gồm 3 chữ cái đi với E, Ê, I (nghe, nghé, nghỉ). NG đi với âm còn lại (ngựa, ngủ)!', example: '👂 nghe, 🐃 nghé  |  🐴 ngựa, 😴 ngủ', audioKey: 'ort_ngngh' },
  { id: 'ort_sx', pair: 'S / X', title: 'Phân biệt S cong lưỡi & X nhẹ', rule: 'S thường gặp ở tên cây cối, con vật, cảnh vật (sâu, sóc, sáo, sen, sông). X thường gặp ở đồ vật, màu sắc, hoạt động (xe, xôi, xanh, xòe)!', example: '📚 sách, 🐛 sâu  |  🚗 xe, 🌿 xanh', audioKey: 'ort_sx' },
  { id: 'ort_chtr', pair: 'CH / TR', title: 'Phân biệt CH & TR cong lưỡi', rule: 'CH hay chỉ đồ dùng, người thân, vật nuôi (chén, chổi, chú, chị, chó). TR hay chỉ thiên nhiên, trường lớp, vị trí (tre, trăng, trời, trường)!', example: '🐶 chó, 🥢 chén  |  🌙 trăng, 🎋 tre', audioKey: 'ort_chtr' },
  { id: 'ort_ln', pair: 'L / N', title: 'Phân biệt L uốn lưỡi & N âm mũi', rule: 'Phát âm chuẩn từng chữ: L chạm nhẹ vòm trên (lá, lúa, lớp, lịch). N nhẹ mũi (nến, nấm, nai, nước)!', example: '🍃 lá, 🌾 lúa  |  💧 nước, 🦌 nai', audioKey: 'ort_ln' }
];

const ORTHOGRAPHY_QUIZ_DATA = [
  { id: 'oq1', blankWord: 'con ...iến', target: 'k', options: ['k', 'c'], fullWord: 'con kiến', ruleNote: 'Trước I, E, Ê ta viết là K!' },
  { id: 'oq2', blankWord: 'cái ...ế', target: 'gh', options: ['gh', 'g'], fullWord: 'cái ghế', ruleNote: 'Trước E, Ê, I ta viết là GH!' },
  { id: 'oq3', blankWord: 'con ...é', target: 'ngh', options: ['ngh', 'ng'], fullWord: 'con nghé', ruleNote: 'Trước E, Ê, I ta viết là NGH!' },
  { id: 'oq4', blankWord: 'con ...á', target: 'c', options: ['c', 'k'], fullWord: 'con cá', ruleNote: 'Trước âm A ta viết chữ C!' },
  { id: 'oq5', blankWord: 'con ...à', target: 'g', options: ['g', 'gh'], fullWord: 'con gà', ruleNote: 'Trước âm A ta viết chữ G đơn!' },
  { id: 'oq6', blankWord: 'con ...ựa', target: 'ng', options: ['ng', 'ngh'], fullWord: 'con ngựa', ruleNote: 'Trước âm ƯA ta viết NG đơn!' },
  { id: 'oq7', blankWord: 'quyển ...ách', target: 's', options: ['s', 'x'], fullWord: 'quyển sách', ruleNote: 'Quyển sách đọc S cong lưỡi!' },
  { id: 'oq8', blankWord: '...e ô tô', target: 'x', options: ['x', 's'], fullWord: 'xe ô tô', ruleNote: 'Xe ô tô viết bằng chữ X nhẹ!' },
  { id: 'oq9', blankWord: 'mặt ...ăng', target: 'tr', options: ['tr', 'ch'], fullWord: 'mặt trăng', ruleNote: 'Thiên nhiên mặt trăng viết TR!' },
  { id: 'oq10', blankWord: 'con ...ó', target: 'ch', options: ['ch', 'tr'], fullWord: 'con chó', ruleNote: 'Con chó viết bằng chữ CH!' },
  { id: 'oq11', blankWord: 'chiếc ...á', target: 'l', options: ['l', 'n'], fullWord: 'chiếc lá', ruleNote: 'Chiếc lá viết chữ L!' },
  { id: 'oq12', blankWord: 'cây ...ến', target: 'n', options: ['n', 'l'], fullWord: 'cây nến', ruleNote: 'Cây nến viết chữ N!' }
];

// 6 BÀI TẬP ĐỌC & ĐỌC HIỂU HỌC KỲ 2 TIẾNG VIỆT LỚP 1
const VIET_STORIES_DATA = [
  {
    id: 'st_vn1',
    title: '🏫 Bài Đọc 1: Buổi Sáng Đi Học',
    icon: '🎒',
    image: 'images/stories/vn_story_1.jpg',
    audioKey: 'story_vn_1',
    lines: [
      'Ông mặt trời thức dậy,',
      'Tỏa nắng ấm sân trường.',
      'Bảo Long đeo cặp sách,',
      'Vui bước tới lớp thương!'
    ],
    question: 'Buổi sáng, Bảo Long đeo gì để đi tới lớp?',
    qAudioKey: 'story_vn_1_q',
    options: [
      { text: 'Đeo cặp sách', isGood: true, audioKey: 'story_vn_1_o1' },
      { text: 'Đội mũ đi ngủ', isGood: false, audioKey: 'story_vn_1_o2' },
      { text: 'Cầm cái chảo rán', isGood: false, audioKey: 'story_vn_1_o3' }
    ]
  },
  {
    id: 'st_vn2',
    title: '👩‍👦 Bài Đọc 2: Bàn Tay Của Mẹ',
    icon: '💖',
    image: 'images/stories/vn_story_2.svg',
    audioKey: 'story_vn_2',
    lines: [
      'Bàn tay mẹ nấu cơm ngon,',
      'Bàn tay mẹ vỗ giấc tròn bé thơ.',
      'Bảo Long ghi nhớ từng giờ,',
      'Chăm ngoan học giỏi chẳng mờ công ơn.'
    ],
    question: 'Trong bài thơ, bàn tay mẹ làm gì giúp Bảo Long?',
    qAudioKey: 'story_vn_2_q',
    options: [
      { text: 'Nấu cơm ngon và vỗ về bé', isGood: true, audioKey: 'story_vn_2_o1' },
      { text: 'Lái tàu bay lên mặt trăng', isGood: false, audioKey: 'story_vn_2_o2' },
      { text: 'Đuổi con cá ngoài biển', isGood: false, audioKey: 'story_vn_2_o3' }
    ]
  },
  {
    id: 'st_vn3',
    title: '🐦 Bài Đọc 3: Chú Chim Sâu Chăm Chỉ',
    icon: '🌳',
    image: 'images/stories/vn_story_3.svg',
    audioKey: 'story_vn_3',
    lines: [
      'Sáng sớm trên cành na xanh,',
      'Chú chim sâu nhỏ nhảy quanh tìm mồi.',
      'Bắt sâu bảo vệ lá chồi,',
      'Cây vui nở quả ngọt bùi tặng ta.'
    ],
    question: 'Chú chim sâu nhỏ làm việc gì có ích cho cây cối?',
    qAudioKey: 'story_vn_3_q',
    options: [
      { text: 'Bắt sâu bảo vệ lá xanh', isGood: true, audioKey: 'story_vn_3_o1' },
      { text: 'Bẻ hết cành hoa rụng xuống', isGood: false, audioKey: 'story_vn_3_o2' },
      { text: 'Ngủ quên suốt cả ngày', isGood: false, audioKey: 'story_vn_3_o3' }
    ]
  },
  {
    id: 'st_vn4',
    title: '🌊 Bài Đọc 4: Chuyện Mưa Và Cầu Vồng',
    icon: '🌈',
    image: 'images/stories/vn_story_4.svg',
    audioKey: 'story_vn_4',
    lines: [
      'Hạt mưa rơi lộp bộp,',
      'Tưới mát cả vườn rau.',
      'Mưa tạnh nắng bừng mau,',
      'Cầu vồng cong bảy sắc!'
    ],
    question: 'Sau khi cơn mưa tạnh và nắng lên, trên trời xuất hiện gì?',
    qAudioKey: 'story_vn_4_q',
    options: [
      { text: 'Cầu vồng cong bảy sắc', isGood: true, audioKey: 'story_vn_4_o1' },
      { text: 'Bông tuyết rơi mùa đông', isGood: false, audioKey: 'story_vn_4_o2' },
      { text: 'Cây nến sinh nhật', isGood: false, audioKey: 'story_vn_4_o3' }
    ]
  },
  {
    id: 'st_vn5',
    title: '🚅 Bài Đọc 5: Tàu Shinkansen Xuyên Núi',
    icon: '🚅',
    image: 'images/stories/vn_story_5.svg',
    audioKey: 'story_vn_5',
    lines: [
      'Đoàn tàu trắng mũi thon dài,',
      'Lướt êm qua núi nối hai miền gần.',
      'Hành khách trật tự chuyên cần,',
      'Chuyến tàu an toàn muôn phần vui tươi.'
    ],
    question: 'Khi đi trên tàu điện Shinkansen, hành khách giữ gìn điều gì?',
    qAudioKey: 'story_vn_5_q',
    options: [
      { text: 'Giữ trật tự và an toàn', isGood: true, audioKey: 'story_vn_5_o1' },
      { text: 'Chạy nhảy la hét ầm ĩ', isGood: false, audioKey: 'story_vn_5_o2' },
      { text: 'Vứt rác ra hành lang', isGood: false, audioKey: 'story_vn_5_o3' }
    ]
  },
  {
    id: 'st_vn6',
    title: '🇻🇳 Bài Đọc 6: Hoa Sen Quê Em',
    icon: '🪷',
    image: 'images/stories/vn_story_6.svg',
    audioKey: 'story_vn_6',
    lines: [
      'Trong đầm gì đẹp bằng sen,',
      'Lá xanh bông trắng lại chen nhị vàng.',
      'Hương thơm dịu mát xóm làng,',
      'Quê hương Việt Nam dịu dàng trong tim.'
    ],
    question: 'Bài thơ khen loài hoa nào đẹp nhất trong đầm nước Việt Nam?',
    qAudioKey: 'story_vn_6_q',
    options: [
      { text: 'Hoa sen thơm dịu mát', isGood: true, audioKey: 'story_vn_6_o1' },
      { text: 'Quả dứa gai nhọn', isGood: false, audioKey: 'story_vn_6_o2' },
      { text: 'Cục pin đồ chơi', isGood: false, audioKey: 'story_vn_6_o3' }
    ]
  }
];

// KHO STICKER & DANH HIỆU CỦA BẢO LONG (CẢ NĂM LỚP 1 VIỆT - NHẬT)
const STICKERS_DATA = [
  { id: 'stk_trex', emoji: '🦖', name: 'Khủng Long Tân Binh', unlockStars: 0, desc: 'Sticker khởi đầu hành trình của Bảo Long' },
  { id: 'stk_shinkansen', emoji: '🚅', name: 'Tài Xế Shinkansen', unlockStars: 15, desc: 'Siêu tốc độ vút bay cùng tiếng Việt!' },
  { id: 'stk_firetruck', emoji: '🚒', name: 'Lính Cứu Hỏa Nhí', unlockStars: 30, desc: 'Dũng cảm, nhanh nhẹn, chăm chỉ!' },
  { id: 'stk_brachio', emoji: '🦕', name: 'Bạn Thân Cổ Dài', unlockStars: 50, desc: 'Vươn cao kiến thức mỗi ngày!' },
  { id: 'stk_police', emoji: '🚓', name: 'Cảnh Sát Tuần Tra', unlockStars: 80, desc: 'Tinh mắt bắt đúng từng chữ cái!' },
  { id: 'stk_dino_dig', emoji: '⛏️', name: 'Nhà Khảo Cổ Vĩ Đại', unlockStars: 120, desc: 'Khai quật hóa thạch siêu đỉnh!' },
  { id: 'stk_rocket', emoji: '🚀', name: 'Phi Hành Gia Nhí', unlockStars: 160, desc: 'Đọc thông viết thạo bay vào vũ trụ!' },
  { id: 'stk_crown', emoji: '👑', name: 'Vua Khủng Long T-Rex', unlockStars: 200, desc: 'Chúa tể đánh vần không đối thủ!' },
  { id: 'stk_dragon', emoji: '🐉', name: 'Rồng Thần Kỷ Jura', unlockStars: 260, desc: 'Siêu trí nhớ & thông minh tuyệt đỉnh!' },
  { id: 'stk_sakura', emoji: '🌸', name: 'Hoa Anh Đào Nhật Bản', unlockStars: 320, desc: 'Tinh hoa tiếng Nhật Lớp 1 小1!' },
  { id: 'stk_piano', emoji: '🎹', name: 'Nhạc Công Nhí Pianica', unlockStars: 380, desc: 'Nghệ sĩ âm nhạc & mỹ thuật tài ba!' },
  { id: 'stk_science', emoji: '🌱', name: 'Nhà Khoa Học Bìm Bìm', unlockStars: 450, desc: 'Khám phá tự nhiên & cuộc sống giỏi quá!' },
  { id: 'stk_kanji', emoji: '🈷️', name: 'Kiếm Sĩ 80 Chữ Kanji', unlockStars: 550, desc: 'Chinh phục chữ Hán Tiểu học Nhật!' },
  { id: 'stk_drum', emoji: '🥁', name: 'Trống Đồng Lạc Hồng', unlockStars: 680, desc: 'Niềm tự hào cội nguồn Việt Nam!' },
  { id: 'stk_trophy', emoji: '🏆', name: 'Thần Đồng Song Ngữ', unlockStars: 800, desc: 'Danh hiệu cao quý nhất Lớp 1 Việt - Nhật!' }
];

const EXPLORER_RANKS = [
  { minStars: 0, title: 'Khám Phá Nhí', badge: '🌱' },
  { minStars: 25, title: 'Thợ Săn Hóa Thạch', badge: '⛏️' },
  { minStars: 60, title: 'Đội Trưởng Shinkansen', badge: '🚅' },
  { minStars: 120, title: 'Bác Học Tiếng Việt', badge: '📚' },
  { minStars: 200, title: 'Vua Khủng Long', badge: '🦖' },
  { minStars: 320, title: 'Sứ Giả Anh Đào 🌸', badge: '🗾' },
  { minStars: 500, title: 'Siêu Sao Đa Tài', badge: '🌟' },
  { minStars: 750, title: 'Thần Đồng Việt – Nhật', badge: '👑' }
];

// CÂU GIẢI MÃ ĐƯỢC CHO 12 BÀI ĐÁNH VẦN (MỖI TIẾNG KHỚP 100% AUDIO TRÊN ĐĨA)
const DECODABLE_PHONICS_SENTENCES = [
  {
    "id": "decod_1_1",
    "lessonId": "phonics_1",
    "text": "Bé tập đọc sách.",
    "tokens": [
      {
        "label": "Bé",
        "key": "word_bé",
        "part": "bé"
      },
      {
        "label": "tập",
        "key": "word_tập",
        "part": "tập"
      },
      {
        "label": "đọc",
        "key": "word_đọc",
        "part": "đọc"
      },
      {
        "label": "sách",
        "key": "word_sach",
        "part": "sách"
      }
    ],
    "sentenceAudioKey": "decod_1_1",
    "meaningJa": "わたしが ほんを よみます"
  },
  {
    "id": "decod_1_2",
    "lessonId": "phonics_1",
    "text": "Dép đỏ, cặp, hộp.",
    "tokens": [
      {
        "label": "Dép",
        "key": "word_dép",
        "part": "dép"
      },
      {
        "label": "đỏ",
        "key": "word_đỏ",
        "part": "đỏ"
      },
      {
        "label": "cặp",
        "key": "word_cặp",
        "part": "cặp"
      },
      {
        "label": "hộp",
        "key": "word_hộp",
        "part": "hộp"
      }
    ],
    "sentenceAudioKey": "decod_1_2",
    "meaningJa": "あかい スリッパ、かばん、はこ"
  },
  {
    "id": "decod_1_3",
    "lessonId": "phonics_1",
    "text": "Bếp hồng, súp, kẹo.",
    "tokens": [
      {
        "label": "Bếp",
        "key": "word_bếp",
        "part": "bếp"
      },
      {
        "label": "hồng",
        "key": "word_hồng",
        "part": "hồng"
      },
      {
        "label": "súp",
        "key": "word_súp",
        "part": "súp"
      },
      {
        "label": "kẹo",
        "key": "word_kẹo",
        "part": "kẹo"
      }
    ],
    "sentenceAudioKey": "decod_1_3",
    "meaningJa": "キッチン、スープ、あめ"
  },
  {
    "id": "decod_2_1",
    "lessonId": "phonics_2",
    "text": "Bé viết tập vở.",
    "tokens": [
      {
        "label": "Bé",
        "key": "word_bé",
        "part": "bé"
      },
      {
        "label": "viết",
        "key": "word_viết",
        "part": "viết"
      },
      {
        "label": "tập",
        "key": "word_tập",
        "part": "tập"
      },
      {
        "label": "vở",
        "key": "word_vở",
        "part": "vở"
      }
    ],
    "sentenceAudioKey": "decod_2_1",
    "meaningJa": "ノートに かきます"
  },
  {
    "id": "decod_2_2",
    "lessonId": "phonics_2",
    "text": "Táo, mận, quýt đỏ.",
    "tokens": [
      {
        "label": "Táo",
        "key": "word_táo",
        "part": "táo"
      },
      {
        "label": "mận",
        "key": "word_mận",
        "part": "mận"
      },
      {
        "label": "quýt",
        "key": "word_quýt",
        "part": "quýt"
      },
      {
        "label": "đỏ",
        "key": "word_đỏ",
        "part": "đỏ"
      }
    ],
    "sentenceAudioKey": "decod_2_2",
    "meaningJa": "りんご、すもも、みかん"
  },
  {
    "id": "decod_2_3",
    "lessonId": "phonics_2",
    "text": "Mặt trời, đất Việt.",
    "tokens": [
      {
        "label": "Mặt",
        "key": "syl_mặt",
        "part": "mặt"
      },
      {
        "label": "trời",
        "key": "syl_trời",
        "part": "trời"
      },
      {
        "label": "đất",
        "key": "word_đất",
        "part": "đất"
      },
      {
        "label": "Việt",
        "key": "syl_việt",
        "part": "việt"
      }
    ],
    "sentenceAudioKey": "decod_2_3",
    "meaningJa": "たいようと ベトナム"
  },
  {
    "id": "decod_3_1",
    "lessonId": "phonics_3",
    "text": "Bé học đọc sách.",
    "tokens": [
      {
        "label": "Bé",
        "key": "word_bé",
        "part": "bé"
      },
      {
        "label": "học",
        "key": "syl_học",
        "part": "học"
      },
      {
        "label": "đọc",
        "key": "word_đọc",
        "part": "đọc"
      },
      {
        "label": "sách",
        "key": "word_sach",
        "part": "sách"
      }
    ],
    "sentenceAudioKey": "decod_3_1",
    "meaningJa": "べんきょうして ほんを よみます"
  },
  {
    "id": "decod_3_2",
    "lessonId": "phonics_3",
    "text": "Sóc đọc sách, ngựa chạy.",
    "tokens": [
      {
        "label": "Sóc",
        "key": "word_sóc",
        "part": "sóc"
      },
      {
        "label": "đọc",
        "key": "word_đọc",
        "part": "đọc"
      },
      {
        "label": "sách",
        "key": "word_sach",
        "part": "sách"
      },
      {
        "label": "ngựa",
        "key": "word_ngựa",
        "part": "ngựa"
      },
      {
        "label": "chạy",
        "key": "word_chạy",
        "part": "chạy"
      }
    ],
    "sentenceAudioKey": "decod_3_2",
    "meaningJa": "りすと うま"
  },
  {
    "id": "decod_3_3",
    "lessonId": "phonics_3",
    "text": "Cúc vàng, gạch đỏ.",
    "tokens": [
      {
        "label": "Cúc",
        "key": "word_cúc",
        "part": "cúc"
      },
      {
        "label": "vàng",
        "key": "word_vàng",
        "part": "vàng"
      },
      {
        "label": "gạch",
        "key": "word_gạch",
        "part": "gạch"
      },
      {
        "label": "đỏ",
        "key": "word_đỏ",
        "part": "đỏ"
      }
    ],
    "sentenceAudioKey": "decod_3_3",
    "meaningJa": "きいろい きく、あかい れんが"
  },
  {
    "id": "decod_4_1",
    "lessonId": "phonics_4",
    "text": "Mẹ ăn cơm, kem.",
    "tokens": [
      {
        "label": "Mẹ",
        "key": "word_mẹ",
        "part": "mẹ"
      },
      {
        "label": "ăn",
        "key": "word_ăn",
        "part": "ăn"
      },
      {
        "label": "cơm",
        "key": "word_cơm",
        "part": "cơm"
      },
      {
        "label": "kem",
        "key": "word_kem",
        "part": "kem"
      }
    ],
    "sentenceAudioKey": "decod_4_1",
    "meaningJa": "おかあさんと ごはん、アイス"
  },
  {
    "id": "decod_4_2",
    "lessonId": "phonics_4",
    "text": "Bạn bè chăm chỉ.",
    "tokens": [
      {
        "label": "Bạn",
        "key": "word_bạn",
        "part": "bạn"
      },
      {
        "label": "bè",
        "key": "syl_bè",
        "part": "bè"
      },
      {
        "label": "chăm",
        "key": "syl_chăm",
        "part": "chăm"
      },
      {
        "label": "chỉ",
        "key": "syl_chỉ",
        "part": "chỉ"
      }
    ],
    "sentenceAudioKey": "decod_4_2",
    "meaningJa": "ともだちは がんばりや"
  },
  {
    "id": "decod_4_3",
    "lessonId": "phonics_4",
    "text": "Chim hót, vườn cam.",
    "tokens": [
      {
        "label": "Chim",
        "key": "word_chim",
        "part": "chim"
      },
      {
        "label": "hót",
        "key": "word_hót",
        "part": "hót"
      },
      {
        "label": "vườn",
        "key": "word_vườn",
        "part": "vườn"
      },
      {
        "label": "cam",
        "key": "word_cam",
        "part": "cam"
      }
    ],
    "sentenceAudioKey": "decod_4_3",
    "meaningJa": "とりが ないて みかんばたけ"
  },
  {
    "id": "decod_5_1",
    "lessonId": "phonics_5",
    "text": "Voi bơi suối núi.",
    "tokens": [
      {
        "label": "Voi",
        "key": "word_voi",
        "part": "voi"
      },
      {
        "label": "bơi",
        "key": "word_bơi",
        "part": "bơi"
      },
      {
        "label": "suối",
        "key": "word_suối",
        "part": "suối"
      },
      {
        "label": "núi",
        "key": "word_núi",
        "part": "núi"
      }
    ],
    "sentenceAudioKey": "decod_5_1",
    "meaningJa": "ぞう、かわ、やま"
  },
  {
    "id": "decod_5_2",
    "lessonId": "phonics_5",
    "text": "Máy bay bay, chim sáo.",
    "tokens": [
      {
        "label": "Máy",
        "key": "syl_máy",
        "part": "máy"
      },
      {
        "label": "bay",
        "key": "syl_bay",
        "part": "bay"
      },
      {
        "label": "bay",
        "key": "syl_bay",
        "part": "bay"
      },
      {
        "label": "chim",
        "key": "word_chim",
        "part": "chim"
      },
      {
        "label": "sáo",
        "key": "word_sáo",
        "part": "sáo"
      }
    ],
    "sentenceAudioKey": "decod_5_2",
    "meaningJa": "ひこうきと とり"
  },
  {
    "id": "decod_5_3",
    "lessonId": "phonics_5",
    "text": "Bưởi, chuối, dâu, xoài.",
    "tokens": [
      {
        "label": "Bưởi",
        "key": "word_bưởi",
        "part": "bưởi"
      },
      {
        "label": "chuối",
        "key": "word_chuối",
        "part": "chuối"
      },
      {
        "label": "dâu",
        "key": "syl_dâu",
        "part": "dâu"
      },
      {
        "label": "xoài",
        "key": "word_xoài",
        "part": "xoài"
      }
    ],
    "sentenceAudioKey": "decod_5_3",
    "meaningJa": "くだもの いっぱい"
  },
  {
    "id": "decod_6_1",
    "lessonId": "phonics_6",
    "text": "Trăng vàng, mây hồng.",
    "tokens": [
      {
        "label": "Trăng",
        "key": "word_trăng",
        "part": "trăng"
      },
      {
        "label": "vàng",
        "key": "word_vàng",
        "part": "vàng"
      },
      {
        "label": "mây",
        "key": "word_mây",
        "part": "mây"
      },
      {
        "label": "hồng",
        "key": "word_hồng",
        "part": "hồng"
      }
    ],
    "sentenceAudioKey": "decod_6_1",
    "meaningJa": "おつきさまと くも"
  },
  {
    "id": "decod_6_2",
    "lessonId": "phonics_6",
    "text": "Trống đồng, sông xanh.",
    "tokens": [
      {
        "label": "Trống",
        "key": "syl_trống",
        "part": "trống"
      },
      {
        "label": "đồng",
        "key": "syl_đồng",
        "part": "đồng"
      },
      {
        "label": "sông",
        "key": "word_sông",
        "part": "sông"
      },
      {
        "label": "xanh",
        "key": "word_xanh",
        "part": "xanh"
      }
    ],
    "sentenceAudioKey": "decod_6_2",
    "meaningJa": "どうたくと あおい かわ"
  },
  {
    "id": "decod_6_3",
    "lessonId": "phonics_6",
    "text": "Chuông, bóng, cánh đồng.",
    "tokens": [
      {
        "label": "Chuông",
        "key": "word_chuông",
        "part": "chuông"
      },
      {
        "label": "bóng",
        "key": "word_bóng",
        "part": "bóng"
      },
      {
        "label": "cánh",
        "key": "syl_cánh",
        "part": "cánh"
      },
      {
        "label": "đồng",
        "key": "syl_đồng",
        "part": "đồng"
      }
    ],
    "sentenceAudioKey": "decod_6_3",
    "meaningJa": "かね、ボール、のはら"
  },
  {
    "id": "decod_7_1",
    "lessonId": "phonics_7",
    "text": "Kiến chăm, yến bay.",
    "tokens": [
      {
        "label": "Kiến",
        "key": "word_kiến",
        "part": "kiến"
      },
      {
        "label": "chăm",
        "key": "syl_chăm",
        "part": "chăm"
      },
      {
        "label": "yến",
        "key": "word_yến",
        "part": "yến"
      },
      {
        "label": "bay",
        "key": "syl_bay",
        "part": "bay"
      }
    ],
    "sentenceAudioKey": "decod_7_1",
    "meaningJa": "ありと つばめ"
  },
  {
    "id": "decod_7_2",
    "lessonId": "phonics_7",
    "text": "Thiệp hồng, tiệc tết.",
    "tokens": [
      {
        "label": "Thiệp",
        "key": "word_thiệp",
        "part": "thiệp"
      },
      {
        "label": "hồng",
        "key": "word_hồng",
        "part": "hồng"
      },
      {
        "label": "tiệc",
        "key": "word_tiệc",
        "part": "tiệc"
      },
      {
        "label": "tết",
        "key": "word_tết",
        "part": "tết"
      }
    ],
    "sentenceAudioKey": "decod_7_2",
    "meaningJa": "ねんがじょうと おしょうがつ"
  },
  {
    "id": "decod_7_3",
    "lessonId": "phonics_7",
    "text": "Biển xanh, thuyền, diều.",
    "tokens": [
      {
        "label": "Biển",
        "key": "word_biển",
        "part": "biển"
      },
      {
        "label": "xanh",
        "key": "word_xanh",
        "part": "xanh"
      },
      {
        "label": "thuyền",
        "key": "word_thuyền",
        "part": "thuyền"
      },
      {
        "label": "diều",
        "key": "word_diều",
        "part": "diều"
      }
    ],
    "sentenceAudioKey": "decod_7_3",
    "meaningJa": "あおい うみ、ふね、たこ"
  },
  {
    "id": "decod_8_1",
    "lessonId": "phonics_8",
    "text": "Bố mẹ yêu thương.",
    "tokens": [
      {
        "label": "Bố",
        "key": "word_bố",
        "part": "bố"
      },
      {
        "label": "mẹ",
        "key": "word_mẹ",
        "part": "mẹ"
      },
      {
        "label": "yêu",
        "key": "syl_yêu",
        "part": "yêu"
      },
      {
        "label": "thương",
        "key": "syl_thương",
        "part": "thương"
      }
    ],
    "sentenceAudioKey": "decod_8_1",
    "meaningJa": "おとうさん おかあさん だいすき"
  },
  {
    "id": "decod_8_2",
    "lessonId": "phonics_8",
    "text": "Chuồn chuồn, bươm bướm.",
    "tokens": [
      {
        "label": "Chuồn",
        "key": "syl_chuồn",
        "part": "chuồn"
      },
      {
        "label": "chuồn",
        "key": "syl_chuồn",
        "part": "chuồn"
      },
      {
        "label": "bươm",
        "key": "syl_bươm",
        "part": "bươm"
      },
      {
        "label": "bướm",
        "key": "word_bướm",
        "part": "bướm"
      }
    ],
    "sentenceAudioKey": "decod_8_2",
    "meaningJa": "とんぼと ちょうちょ"
  },
  {
    "id": "decod_8_3",
    "lessonId": "phonics_8",
    "text": "Miệng cười, uống sữa.",
    "tokens": [
      {
        "label": "Miệng",
        "key": "word_miệng",
        "part": "miệng"
      },
      {
        "label": "cười",
        "key": "word_cười",
        "part": "cười"
      },
      {
        "label": "uống",
        "key": "word_uống",
        "part": "uống"
      },
      {
        "label": "sữa",
        "key": "word_sữa",
        "part": "sữa"
      }
    ],
    "sentenceAudioKey": "decod_8_3",
    "meaningJa": "えがおで ぎゅうにゅうを のみます"
  },
  {
    "id": "decod_9_1",
    "lessonId": "phonics_9",
    "text": "Hoa sen, hoa hồng.",
    "tokens": [
      {
        "label": "Hoa",
        "key": "word_hoa",
        "part": "hoa"
      },
      {
        "label": "sen",
        "key": "syl_sen",
        "part": "sen"
      },
      {
        "label": "hoa",
        "key": "word_hoa",
        "part": "hoa"
      },
      {
        "label": "hồng",
        "key": "word_hồng",
        "part": "hồng"
      }
    ],
    "sentenceAudioKey": "decod_9_1",
    "meaningJa": "はすのはなと ばら"
  },
  {
    "id": "decod_9_2",
    "lessonId": "phonics_9",
    "text": "Tóc xoăn, áo dài.",
    "tokens": [
      {
        "label": "Tóc",
        "key": "word_tóc",
        "part": "tóc"
      },
      {
        "label": "xoăn",
        "key": "word_xoăn",
        "part": "xoăn"
      },
      {
        "label": "áo",
        "key": "syl_áo",
        "part": "áo"
      },
      {
        "label": "dài",
        "key": "syl_dài",
        "part": "dài"
      }
    ],
    "sentenceAudioKey": "decod_9_2",
    "meaningJa": "くるくる かみと アオザイ"
  },
  {
    "id": "decod_9_3",
    "lessonId": "phonics_9",
    "text": "Khoai vàng, hoa huệ.",
    "tokens": [
      {
        "label": "Khoai",
        "key": "word_khoai",
        "part": "khoai"
      },
      {
        "label": "vàng",
        "key": "word_vàng",
        "part": "vàng"
      },
      {
        "label": "hoa",
        "key": "word_hoa",
        "part": "hoa"
      },
      {
        "label": "huệ",
        "key": "word_huệ",
        "part": "huệ"
      }
    ],
    "sentenceAudioKey": "decod_9_3",
    "meaningJa": "さつまいもと ゆり"
  },
  {
    "id": "decod_10_1",
    "lessonId": "phonics_10",
    "text": "Xuân hồng, hoa huệ.",
    "tokens": [
      {
        "label": "Xuân",
        "key": "word_xuân",
        "part": "xuân"
      },
      {
        "label": "hồng",
        "key": "word_hồng",
        "part": "hồng"
      },
      {
        "label": "hoa",
        "key": "word_hoa",
        "part": "hoa"
      },
      {
        "label": "huệ",
        "key": "word_huệ",
        "part": "huệ"
      }
    ],
    "sentenceAudioKey": "decod_10_1",
    "meaningJa": "はると ゆりのはな"
  },
  {
    "id": "decod_10_2",
    "lessonId": "phonics_10",
    "text": "Trăng khuya, tuyết xanh.",
    "tokens": [
      {
        "label": "Trăng",
        "key": "word_trăng",
        "part": "trăng"
      },
      {
        "label": "khuya",
        "key": "word_khuya",
        "part": "khuya"
      },
      {
        "label": "tuyết",
        "key": "word_tuyết",
        "part": "tuyết"
      },
      {
        "label": "xanh",
        "key": "word_xanh",
        "part": "xanh"
      }
    ],
    "sentenceAudioKey": "decod_10_2",
    "meaningJa": "よるの つきと ゆき"
  },
  {
    "id": "decod_10_3",
    "lessonId": "phonics_10",
    "text": "Mùa xuân, hoa huệ nở.",
    "tokens": [
      {
        "label": "Mùa",
        "key": "syl_mùa",
        "part": "mùa"
      },
      {
        "label": "xuân",
        "key": "word_xuân",
        "part": "xuân"
      },
      {
        "label": "hoa",
        "key": "word_hoa",
        "part": "hoa"
      },
      {
        "label": "huệ",
        "key": "word_huệ",
        "part": "huệ"
      },
      {
        "label": "nở",
        "key": "syl_nở",
        "part": "nở"
      }
    ],
    "sentenceAudioKey": "decod_10_3",
    "meaningJa": "はるに ゆりが さく"
  },
  {
    "id": "decod_11_1",
    "lessonId": "phonics_11",
    "text": "Xe cứu hỏa đỏ.",
    "tokens": [
      {
        "label": "Xe",
        "key": "word_xe",
        "part": "xe"
      },
      {
        "label": "cứu",
        "key": "syl_cứu",
        "part": "cứu"
      },
      {
        "label": "hỏa",
        "key": "syl_hỏa",
        "part": "hỏa"
      },
      {
        "label": "đỏ",
        "key": "word_đỏ",
        "part": "đỏ"
      }
    ],
    "sentenceAudioKey": "decod_11_1",
    "meaningJa": "あかい しょうぼうしゃ"
  },
  {
    "id": "decod_11_2",
    "lessonId": "phonics_11",
    "text": "Tre xanh, sáo hót.",
    "tokens": [
      {
        "label": "Tre",
        "key": "word_tre",
        "part": "tre"
      },
      {
        "label": "xanh",
        "key": "word_xanh",
        "part": "xanh"
      },
      {
        "label": "sáo",
        "key": "word_sáo",
        "part": "sáo"
      },
      {
        "label": "hót",
        "key": "word_hót",
        "part": "hót"
      }
    ],
    "sentenceAudioKey": "decod_11_2",
    "meaningJa": "あおい たけと とりの こえ"
  },
  {
    "id": "decod_11_3",
    "lessonId": "phonics_11",
    "text": "Nai con, mèo ngủ.",
    "tokens": [
      {
        "label": "Nai",
        "key": "word_nai",
        "part": "nai"
      },
      {
        "label": "con",
        "key": "syl_con",
        "part": "con"
      },
      {
        "label": "mèo",
        "key": "word_mèo",
        "part": "mèo"
      },
      {
        "label": "ngủ",
        "key": "word_ngủ",
        "part": "ngủ"
      }
    ],
    "sentenceAudioKey": "decod_11_3",
    "meaningJa": "こじかと ねむる ねこ"
  },
  {
    "id": "decod_12_1",
    "lessonId": "phonics_12",
    "text": "Cô giáo, bảng đen.",
    "tokens": [
      {
        "label": "Cô",
        "key": "word_cô",
        "part": "cô"
      },
      {
        "label": "giáo",
        "key": "syl_giáo",
        "part": "giáo"
      },
      {
        "label": "bảng",
        "key": "syl_bảng",
        "part": "bảng"
      },
      {
        "label": "đen",
        "key": "syl_đen",
        "part": "đen"
      }
    ],
    "sentenceAudioKey": "decod_12_1",
    "meaningJa": "せんせいと こくばん"
  },
  {
    "id": "decod_12_2",
    "lessonId": "phonics_12",
    "text": "Ghế gỗ, thước kẻ.",
    "tokens": [
      {
        "label": "Ghế",
        "key": "word_ghế",
        "part": "ghế"
      },
      {
        "label": "gỗ",
        "key": "word_gỗ",
        "part": "gỗ"
      },
      {
        "label": "thước",
        "key": "syl_thước",
        "part": "thước"
      },
      {
        "label": "kẻ",
        "key": "syl_kẻ",
        "part": "kẻ"
      }
    ],
    "sentenceAudioKey": "decod_12_2",
    "meaningJa": "きの いすと じょうぎ"
  },
  {
    "id": "decod_12_3",
    "lessonId": "phonics_12",
    "text": "Nghé, ngựa chạy nhanh.",
    "tokens": [
      {
        "label": "Nghé",
        "key": "word_nghé",
        "part": "nghé"
      },
      {
        "label": "ngựa",
        "key": "word_ngựa",
        "part": "ngựa"
      },
      {
        "label": "chạy",
        "key": "word_chạy",
        "part": "chạy"
      },
      {
        "label": "nhanh",
        "key": "syl_nhanh",
        "part": "nhanh"
      }
    ],
    "sentenceAudioKey": "decod_12_3",
    "meaningJa": "こうしと はやい うま"
  }
];

// LUYỆN TAI THANH ĐIỆU & CẶP TỐI THIỂU VIỆT - NHẬT
const MINIMAL_PAIR_DRILLS = [
  {
    "id": "mp_eo",
    "title": "Nhóm vần eo / èo / éo / ẹo",
    "options": [
      {
        "label": "eo",
        "audioKey": "syl_eo"
      },
      {
        "label": "èo",
        "audioKey": "syl_èo"
      },
      {
        "label": "éo",
        "audioKey": "syl_éo"
      },
      {
        "label": "ẹo",
        "audioKey": "syl_ẹo"
      }
    ]
  },
  {
    "id": "mp_hoa",
    "title": "Nhóm thanh hoa / hóa / hỏa",
    "options": [
      {
        "label": "hoa",
        "audioKey": "syl_hoa"
      },
      {
        "label": "hóa",
        "audioKey": "syl_hóa"
      },
      {
        "label": "hỏa",
        "audioKey": "syl_hỏa"
      }
    ]
  },
  {
    "id": "mp_ao",
    "title": "Nhóm vần ao / ào / áo",
    "options": [
      {
        "label": "ao",
        "audioKey": "syl_ao"
      },
      {
        "label": "ào",
        "audioKey": "syl_ào"
      },
      {
        "label": "áo",
        "audioKey": "syl_áo"
      }
    ]
  },
  {
    "id": "mp_oe",
    "title": "Nhóm âm đệm oe / òe / ỏe",
    "options": [
      {
        "label": "oe",
        "audioKey": "syl_oe"
      },
      {
        "label": "òe",
        "audioKey": "syl_òe"
      },
      {
        "label": "ỏe",
        "audioKey": "syl_ỏe"
      }
    ]
  },
  {
    "id": "mp_ay",
    "title": "Nhóm vần ay / ạy / ảy",
    "options": [
      {
        "label": "ay",
        "audioKey": "syl_ay"
      },
      {
        "label": "ạy",
        "audioKey": "syl_ạy"
      },
      {
        "label": "ảy",
        "audioKey": "syl_ảy"
      }
    ]
  },
  {
    "id": "mp_ien",
    "title": "Nhóm vần iên / iến / iển",
    "options": [
      {
        "label": "iên",
        "audioKey": "syl_iên"
      },
      {
        "label": "iến",
        "audioKey": "syl_iến"
      },
      {
        "label": "iển",
        "audioKey": "syl_iển"
      }
    ]
  },
  {
    "id": "mp_uoi",
    "title": "Nhóm vần ươi / ười / ưởi",
    "options": [
      {
        "label": "ươi",
        "audioKey": "syl_ươi"
      },
      {
        "label": "ười",
        "audioKey": "syl_ười"
      },
      {
        "label": "ưởi",
        "audioKey": "syl_ưởi"
      }
    ]
  },
  {
    "id": "mp_ung",
    "title": "Nhóm vần ưng / ứng / ừng",
    "options": [
      {
        "label": "ưng",
        "audioKey": "syl_ưng"
      },
      {
        "label": "ứng",
        "audioKey": "syl_ứng"
      },
      {
        "label": "ừng",
        "audioKey": "syl_ừng"
      }
    ]
  },
  {
    "id": "mp_sx",
    "title": "Cặp tối thiểu S / X: sâu vs xâu",
    "options": [
      { "label": "sâu", "audioKey": "word_sâu" },
      { "label": "xâu", "audioKey": "word_xâu" }
    ]
  },
  {
    "id": "mp_trch",
    "title": "Cặp tối thiểu TR / CH: tre vs che",
    "options": [
      { "label": "tre", "audioKey": "word_tre" },
      { "label": "che", "audioKey": "word_che" }
    ]
  },
  {
    "id": "mp_ln",
    "title": "Cặp tối thiểu L / N: lá vs ná",
    "options": [
      { "label": "lá", "audioKey": "word_lá" },
      { "label": "ná", "audioKey": "word_ná" }
    ]
  },
  {
    "id": "mp_tones",
    "title": "Luyện tai 6 Thanh điệu (ba / bá / bà / bả / bã / bạ)",
    "options": [
      { "label": "ba", "audioKey": "mp_tone_ba" },
      { "label": "bá", "audioKey": "mp_tone_ba_sac" },
      { "label": "bà", "audioKey": "mp_tone_ba_huyen" },
      { "label": "bả", "audioKey": "mp_tone_ba_hoi" },
      { "label": "bã", "audioKey": "mp_tone_ba_nga" },
      { "label": "bạ", "audioKey": "mp_tone_ba_nang" }
    ]
  }
];
