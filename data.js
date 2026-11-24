// Dữ liệu học tiếng Việt cho Bé Bảo Long (6 tuổi)
// Chuẩn hóa phát âm và đánh vần ngữ âm tiếng Việt chuẩn: BỜ A BA, ĐỜ A ĐA...
// Kho từ vựng phong phú 7 bài học + Thế giới Khủng Long + Thế giới Xe Cộ + Minigames

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
  { char: 'G', lower: 'g', phonetic: 'gờ', word: 'Ghế', example: 'cái ghế', icon: '🪑', ja: 'いす (Isu)' },
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
  { char: 'Q', lower: 'q', phonetic: 'cu', word: 'Quạt', example: 'cái quạt', icon: '🪭', ja: 'せんぷうき / うちわ' },
  { char: 'R', lower: 'r', phonetic: 'rờ', word: 'Rùa', example: 'con rùa', icon: '🐢', ja: 'かめ (Kame)' },
  { char: 'S', lower: 's', phonetic: 'sờ (uốn lưỡi)', word: 'Sách', example: 'quyển sách', icon: '📚', ja: 'ほん (Hon)' },
  { char: 'T', lower: 't', phonetic: 'tờ', word: 'Tàu', example: 'tàu hoả', icon: '🚂', ja: 'でんしゃ (Densha)' },
  { char: 'U', lower: 'u', phonetic: 'u', word: 'Cú', example: 'con cú', icon: '🦉', ja: 'ふくろう (Fukurou)' },
  { char: 'Ư', lower: 'ư', phonetic: 'ư', word: 'Sư tử', example: 'sư tử', icon: '🦁', ja: 'ライオン (Raion)' },
  { char: 'V', lower: 'v', phonetic: 'vờ', word: 'Voi', example: 'con voi', icon: '🐘', ja: 'ぞう (Zou)' },
  { char: 'X', lower: 'x', phonetic: 'xờ (nhẹ)', word: 'Xe', example: 'xe ô tô', icon: '🚗', ja: 'くるま (Kuruma)' },
  { char: 'Y', lower: 'y', phonetic: 'i dài', word: 'Y tá', example: 'y tá', icon: '👩‍⚕️', ja: 'かんごし (Kangoshi)' }
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
      { id: 'w21', word: 'cơm', breakdown: 'c - ơn - cơm', tone: 'Ngang', icon: '🍚', ja: 'ごはん (Gohan)', spellText: 'cờ - ơn - cơm', example: 'Bảo Long ăn cơm ngoan' },
      { id: 'w22', word: 'sữa', breakdown: 's - ưa - ngã', tone: 'Ngã', icon: '🥛', ja: 'ぎゅうにゅう (Gyuunyuu)', spellText: 'Sờ - ưa - sưa - ngã - sữa', example: 'Sữa tươi thơm ngon' },
      { id: 'w23', word: 'táo', breakdown: 't - ao - sắc', tone: 'Sắc', icon: '🍎', ja: 'りんご (Ringo)', spellText: 'Tờ - ao - tao - sắc - táo', example: 'Quả táo đỏ' },
      { id: 'w24', word: 'chuối', breakdown: 'ch - uôi - sắc', tone: 'Sắc', icon: '🍌', ja: 'バナナ (Banana)', spellText: 'Chờ - uôi - chuôi - sắc - chuối', example: 'Quả chuối ngọt' },
      { id: 'w25', word: 'kẹo', breakdown: 'k - eo - nặng', tone: 'Nặng', icon: '🍬', ja: 'あめ (Ame / Kyandi)', spellText: 'ca - eo - keo - nặng - kẹo', example: 'Viên kẹo ngọt ngào' },
      { id: 'w26', word: 'bút', breakdown: 'b - ut - sắc', tone: 'Sắc', icon: '✏️', ja: 'えんぴつ (Enpitsu)', spellText: 'Bờ - ut - but - sắc - bút', example: 'Bút chì tập viết' },
      { id: 'w27', word: 'vở', breakdown: 'v - ơ - hỏi', tone: 'Hỏi', icon: '📓', ja: 'ノート (Nooto)', spellText: 'Vờ - ơ - vơ - hỏi - vở', example: 'Quyển vở sạch đẹp' },
      { id: 'w28', word: 'bóng', breakdown: 'b - ong - sắc', tone: 'Sắc', icon: '⚽', ja: 'ボール (Booru)', spellText: 'Bờ - ong - bong - sắc - bóng', example: 'Bảo Long chơi đá bóng' },
      { id: 'w29', word: 'mũ', breakdown: 'm - u - ngã', tone: 'Ngã', icon: '🧢', ja: 'ぼうし (Boushi)', spellText: 'Mờ - u - mu - ngã - mũ', example: 'Chiếc mũ che nắng' },
      { id: 'w30', word: 'nước', breakdown: 'n - ươc - sắc', tone: 'Sắc', icon: '💧', ja: 'みず (Mizu)', spellText: 'Nờ - ước - nươc - sắc - nước', example: 'Bảo Long uống nước lọc' }
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
      { id: 'w41', word: 'mắt', breakdown: 'm - ắt - sắc', tone: 'Sắc', icon: '👀', ja: 'め (Me - Mắt)', spellText: 'Mờ - ắt - măt - sắc - mắt', example: 'Đôi mắt sáng long lanh' },
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
      { id: 'w47', word: 'mặt trời', breakdown: 'mặt - trời', tone: 'Nặng & Huyền', icon: '☀️', ja: 'たいよう (Taiyou)', spellText: 'Mặt trời chiếu sáng', example: 'Mặt trời buổi sáng bình minh' },
      { id: 'w48', word: 'mặt trăng', breakdown: 'mặt - trăng', tone: 'Nặng & Ngang', icon: '🌙', ja: 'つき (Tsuki)', spellText: 'Mặt trăng ban đêm', example: 'Mặt trăng tròn vằng vặc' },
      { id: 'w49', word: 'mây', breakdown: 'm - ây', tone: 'Ngang', icon: '☁️', ja: 'くも (Kumo)', spellText: 'Mờ - ây - mây', example: 'Đám mây bồng bềnh' },
      { id: 'w50', word: 'mưa', breakdown: 'm - ưa', tone: 'Ngang', icon: '🌧️', ja: 'あめ (Ame)', spellText: 'Mờ - ưa - mưa', example: 'Cơn mưa tưới mát cây cối' },
      { id: 'w51', word: 'nắng', breakdown: 'n - ăng - sắc', tone: 'Sắc', icon: '🌤️', ja: 'ひざし (Hizashi)', spellText: 'Nờ - ăng - năng - sắc - nắng', example: 'Ánh nắng ấm áp' },
      { id: 'w52', word: 'gió', breakdown: 'gi - o - sắc', tone: 'Sắc', icon: '💨', ja: 'かぜ (Kaze)', spellText: 'Dờ - o - do - sắc - gió', example: 'Gió mát rượi' },
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
      { id: 'w56', word: 'dưa hấu', breakdown: 'dưa - hấu', tone: 'Ngang & Sắc', icon: '🍉', ja: 'スイカ (Suika)', spellText: 'Dưa hấu mát ngọt', example: 'Miếng dưa hấu đỏ ngọt lịm' },
      { id: 'w57', word: 'xoài', breakdown: 'x - oai - huyền', tone: 'Huyền', icon: '🥭', ja: 'マンゴー (Mangoo)', spellText: 'Xờ - oai - xoai - huyền - xoài', example: 'Quả xoài chín vàng' },
      { id: 'w58', word: 'ổi', breakdown: 'ổi - hỏi', tone: 'Hỏi', icon: '🍈', ja: 'グアバ (Guaba)', spellText: 'Quả ổi giòn thơm', example: 'Quả ổi giòn ngọt' },
      { id: 'w59', word: 'nho', breakdown: 'nh - o', tone: 'Ngang', icon: '🍇', ja: 'ぶどう (Budou)', spellText: 'Nhờ - o - nho', example: 'Chùm nho tím ngọt ngào' },
      { id: 'w60', word: 'dâu tây', breakdown: 'dâu - tây', tone: 'Ngang', icon: '🍓', ja: 'いちご (Ichigo)', spellText: 'Dâu tây đỏ mọng', example: 'Quả dâu tây ngon tuyệt' }
    ]
  }
];

const PHONICS_LESSONS = [
  {
    id: 1,
    title: 'Bài 1: Âm cuối P – Vần ap, ăp, âp, ep, êp, ip... – Cơ bản – Âm cuối p',
    subtitle: 'Khám phá bí quyết ghép vần kết thúc bằng chữ P',
    words: [
      { id: 'p1', word: 'sáp', rhyme: 'Vần -ap', breakdown: 's + ap + sắc', icon: '🖍️', ja: 'クレヨン (Kureyon) / ろうそく', spellText: 'sờ - ap - sap - sắc - sáp', example: 'Bút sáp màu tô vẽ' },
      { id: 'p2', word: 'cặp', rhyme: 'Vần -ăp', breakdown: 'c + ăp + nặng', icon: '🎒', ja: 'ランドセル / カバン (Kaban)', spellText: 'cờ - ắp - cắp - nặng - cặp', example: 'Cặp sách đến trường' },
      { id: 'p3', word: 'tập', rhyme: 'Vần -âp', breakdown: 't + âp + nặng', icon: '🤸', ja: 'れんしゅう (Renshuu - Tập thể dục / tập vở)', spellText: 'tờ - ấp - tấp - nặng - tập', example: 'Bảo Long tập thể dục buổi sáng' },
      { id: 'p4', word: 'dép', rhyme: 'Vần -ep', breakdown: 'd + ep + sắc', icon: '🩴', ja: 'サンダル / スリッパ (Sandaru)', spellText: 'dờ - ep - dep - sắc - dép', example: 'Đôi dép đi trong nhà' },
      { id: 'p5', word: 'bếp', rhyme: 'Vần -êp', breakdown: 'b + êp + sắc', icon: '🍳', ja: 'だいどころ / コンロ (Daidokoro)', spellText: 'bờ - ếp - bêp - sắc - bếp', example: 'Mẹ nấu ăn trong bếp' },
      { id: 'p6', word: 'nhịp', rhyme: 'Vần -ip', breakdown: 'nh + ip + nặng', icon: '🥁', ja: 'リズム (Rizumu - Nhịp điệu)', spellText: 'nhờ - ip - nhip - nặng - nhịp', example: 'Vỗ tay theo nhịp bài hát' },
      { id: 'p7', word: 'họp', rhyme: 'Vần -op', breakdown: 'h + op + nặng', icon: '👥', ja: 'かいぎ (Kaigi - Họp mặt)', spellText: 'hờ - op - hop - nặng - họp', example: 'Cả nhà họp mặt vui vẻ' },
      { id: 'p8', word: 'hộp', rhyme: 'Vần -ôp', breakdown: 'h + ôp + nặng', icon: '📦', ja: 'はこ (Hako - Hộp giấy / quà)', spellText: 'hờ - ốp - hôp - nặng - hộp', example: 'Chiếc hộp quà bất ngờ' },
      { id: 'p9', word: 'chớp', rhyme: 'Vần -ơp', breakdown: 'ch + ơp + sắc', icon: '⚡', ja: 'いなずま (Inazuma - Sấm chớp)', spellText: 'chờ - ớp - chơp - sắc - chớp', example: 'Tia chớp sáng loé' },
      { id: 'p10', word: 'súp', rhyme: 'Vần -up', breakdown: 's + up + sắc', icon: '🍲', ja: 'スープ (Suupu - Món súp)', spellText: 'sờ - up - sup - sắc - súp', example: 'Bát súp thơm ngon nóng hổi' }
    ]
  },
  {
    id: 2,
    title: 'Bài 2: Âm cuối T – Vần at, ăt, ât, et, êt, it, ot, uôt...',
    subtitle: 'Học đánh vần các từ có kết thúc bằng âm T',
    words: [
      { id: 't1', word: 'cát', rhyme: 'Vần -at', breakdown: 'c + at + sắc', icon: '🏖️', ja: 'すな (Suna - Cát biển)', spellText: 'cờ - at - cat - sắc - cát', example: 'Bãi cát vàng bên bờ biển' },
      { id: 't2', word: 'mắt', rhyme: 'Vần -ăt', breakdown: 'm + ăt + sắc', icon: '👀', ja: 'め (Me - Đôi mắt)', spellText: 'mờ - ắt - măt - sắc - mắt', example: 'Đôi mắt Bảo Long sáng long lanh' },
      { id: 't3', word: 'đất', rhyme: 'Vần -ât', breakdown: 'đ + ât + sắc', icon: '🌱', ja: 'つち (Tsuchi - Đất trồng)', spellText: 'đờ - ất - đât - sắc - đất', example: 'Đất phù sa màu mỡ' },
      { id: 't4', word: 'kẹo tét', rhyme: 'Vần -et', breakdown: 't + et + sắc', icon: '🧨', ja: 'おしょうがつ (Tết)', spellText: 'tờ - et - tet - sắc - tét', example: 'Ngày Tết bé được mừng tuổi' },
      { id: 't5', word: 'tết', rhyme: 'Vần -êt', breakdown: 't + êt + sắc', icon: '🧧', ja: 'ベトナムの正月 (Tet)', spellText: 'tờ - ết - têt - sắc - tết', example: 'Bé vui đón Tết Việt Nam' },
      { id: 't6', word: 'vịt', rhyme: 'Vần -it', breakdown: 'v + it + nặng', icon: '🦆', ja: 'かも (Kamo)', spellText: 'vờ - it - vit - nặng - vịt', example: 'Đàn vịt con theo mẹ' },
      { id: 't7', word: 'hót', rhyme: 'Vần -ot', breakdown: 'h + ot + sắc', icon: '🐦', ja: 'なく (Chích chòe hót)', spellText: 'hờ - ot - hot - sắc - hót', example: 'Chim hót líu lo' },
      { id: 't8', word: 'chuột', rhyme: 'Vần -uôt', breakdown: 'ch + uôt + nặng', icon: '🐭', ja: 'ねずみ (Nezumi)', spellText: 'chờ - uôt - chuôt - nặng - chuột', example: 'Chú chuột Mickey' }
    ]
  }
];

// ========================================================
// HỆ THỐNG MINH HỌA KHỦNG LONG ĐỘC QUYỀN CHO BẢO LONG (SVG)
// Không còn dùng emoji nhầm lẫn (như khiên 🛡️, tê giác 🦏, chim 🦅)
// ========================================================
const DINO_SVGS = {
  trex: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="55" rx="22" ry="18" fill="#16a34a" transform="rotate(-15 45 55)"/>
    <path d="M48 42 C50 25, 68 20, 78 26 C84 30, 85 40, 76 45 C70 47, 60 48, 52 46 Z" fill="#22c55e"/>
    <path d="M68 38 L76 43 L66 43 Z" fill="#ffffff"/>
    <path d="M70 38 L73 43 L67 43 Z" fill="#ffffff"/>
    <circle cx="70" cy="28" r="4" fill="#ffffff"/>
    <circle cx="71" cy="28" r="2" fill="#0f172a"/>
    <circle cx="72" cy="27" r="0.8" fill="#ffffff"/>
    <path d="M28 62 C18 64, 10 56, 5 44 C8 58, 20 68, 32 68 Z" fill="#15803d"/>
    <path d="M38 68 L36 84 L42 86 L45 84 L42 70 Z" fill="#15803d"/>
    <path d="M48 68 L50 85 L56 86 L58 84 L52 68 Z" fill="#16a34a"/>
    <path d="M54 52 L62 55 L58 57 Z" fill="#15803d"/>
    <ellipse cx="48" cy="58" rx="14" ry="10" fill="#86efac" transform="rotate(-15 48 58)"/>
  </svg>`,

  ankylosaurus: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Khủng long bọc giáp Ankylosaurus: Thân mai gai & Đuôi chùy búa tròn đặc trưng (KHÔNG PHẢI CÁI KHIÊN) -->
    <path d="M25 60 C25 40, 45 35, 70 42 C78 45, 82 55, 78 65 C70 70, 30 70, 25 60 Z" fill="#b45309"/>
    <ellipse cx="50" cy="50" rx="24" ry="14" fill="#78350f"/>
    <!-- Gai giáp nhọn trên lưng -->
    <polygon points="36,40 38,32 41,40" fill="#fde047"/>
    <polygon points="46,38 49,30 52,38" fill="#fde047"/>
    <polygon points="57,38 60,30 63,38" fill="#fde047"/>
    <polygon points="66,42 70,35 73,43" fill="#fde047"/>
    <polygon points="40,48 42,42 45,48" fill="#fef08a"/>
    <polygon points="52,48 55,42 58,48" fill="#fef08a"/>
    <polygon points="62,49 65,43 68,50" fill="#fef08a"/>
    <!-- Đầu khủng long -->
    <path d="M72 52 C78 50, 88 52, 90 58 C90 64, 82 66, 75 64 Z" fill="#b45309"/>
    <polygon points="76,50 82,46 80,53" fill="#fde047"/>
    <circle cx="83" cy="55" r="2.5" fill="#ffffff"/>
    <circle cx="84" cy="55" r="1.3" fill="#0f172a"/>
    <!-- Chân ngắn vững chãi -->
    <rect x="34" y="62" width="8" height="18" rx="3" fill="#78350f"/>
    <rect x="62" y="62" width="8" height="18" rx="3" fill="#78350f"/>
    <!-- Đuôi có quả chùy sắt tròn to -->
    <path d="M28 58 Q16 62 10 60" stroke="#78350f" stroke-width="6" stroke-linecap="round" fill="none"/>
    <circle cx="8" cy="60" r="7" fill="#451a03"/>
    <circle cx="7" cy="58" r="5" fill="#78350f"/>
    <circle cx="6" cy="56" r="2" fill="#ca8a04"/>
  </svg>`,

  triceratops: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Khủng long 3 sừng: Khiên cổ xòe to & 3 sừng nhọn (KHÔNG PHẢI CON TÊ GIÁC) -->
    <ellipse cx="40" cy="58" rx="24" ry="17" fill="#0d9488"/>
    <path d="M54 36 C54 22, 75 22, 76 45 C76 58, 62 60, 56 55 Z" fill="#0f766e"/>
    <circle cx="62" cy="30" r="3" fill="#fef08a"/>
    <circle cx="70" cy="34" r="3" fill="#fef08a"/>
    <circle cx="73" cy="44" r="3" fill="#fef08a"/>
    <path d="M60 48 C66 45, 82 54, 85 62 C82 68, 70 68, 62 62 Z" fill="#14b8a6"/>
    <!-- 2 sừng trên mắt -->
    <path d="M68 45 L88 32 L84 46 Z" fill="#fef3c7"/>
    <path d="M62 44 L78 28 L76 42 Z" fill="#fef9c3"/>
    <!-- 1 sừng trên mũi -->
    <polygon points="82,56 92,53 84,60" fill="#fef3c7"/>
    <circle cx="72" cy="54" r="3" fill="#ffffff"/>
    <circle cx="73" cy="54" r="1.5" fill="#0f172a"/>
    <rect x="26" y="66" width="8" height="17" rx="3" fill="#0f766e"/>
    <rect x="46" y="66" width="8" height="17" rx="3" fill="#0f766e"/>
    <path d="M20 62 C14 65, 8 72, 4 80 C10 75, 18 70, 22 66 Z" fill="#0d9488"/>
  </svg>`,

  brachiosaurus: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Cổ siêu dài cao vút -->
    <ellipse cx="38" cy="68" rx="22" ry="15" fill="#2563eb"/>
    <path d="M46 68 C50 50, 56 30, 68 18 C72 14, 78 14, 80 18 C80 24, 66 45, 58 70 Z" fill="#3b82f6"/>
    <ellipse cx="76" cy="18" rx="8" ry="6" fill="#60a5fa"/>
    <circle cx="77" cy="16" r="2.5" fill="#ffffff"/>
    <circle cx="78" cy="16" r="1.2" fill="#0f172a"/>
    <path d="M84 20 Q92 16 90 22 Q84 24 84 20 Z" fill="#22c55e"/>
    <rect x="24" y="74" width="7" height="18" rx="3" fill="#1d4ed8"/>
    <rect x="42" y="74" width="7" height="18" rx="3" fill="#1d4ed8"/>
    <circle cx="34" cy="64" r="3" fill="#93c5fd"/>
    <circle cx="42" cy="62" r="2.5" fill="#93c5fd"/>
    <path d="M20 70 C12 72, 6 78, 2 85 C8 80, 16 76, 20 74 Z" fill="#2563eb"/>
  </svg>`,

  pteranodon: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Thằn lằn bay: Cánh dang rộng & Mào dài (KHÔNG PHẢI CHIM ĐẠI BÀNG) -->
    <path d="M50 50 Q28 20 8 32 Q26 48 44 56 Z" fill="#7c3aed"/>
    <path d="M54 50 Q76 18 94 30 Q78 48 58 56 Z" fill="#8b5cf6"/>
    <ellipse cx="51" cy="54" rx="8" ry="14" fill="#a855f7"/>
    <path d="M48 42 L36 30 L48 38 Z" fill="#f97316"/>
    <path d="M50 40 L68 36 L52 46 Z" fill="#ea580c"/>
    <circle cx="50" cy="40" r="2.5" fill="#ffffff"/>
    <circle cx="51" cy="40" r="1.2" fill="#0f172a"/>
    <path d="M48 68 L46 76 M54 68 L56 76" stroke="#ea580c" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  stegosaurus: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Đuôi gai: Phiến sừng cam trên lưng & 4 gai nhọn ở đuôi (KHÔNG PHẢI CON THẰN LẰN) -->
    <ellipse cx="48" cy="60" rx="26" ry="16" fill="#059669"/>
    <polygon points="32,46 36,32 42,44" fill="#f97316"/>
    <polygon points="42,43 47,27 53,42" fill="#ea580c"/>
    <polygon points="53,42 59,28 65,44" fill="#f97316"/>
    <polygon points="64,45 69,34 74,47" fill="#ea580c"/>
    <path d="M70 58 C76 56, 86 60, 88 66 C84 70, 75 68, 70 65 Z" fill="#10b981"/>
    <circle cx="80" cy="62" r="2" fill="#0f172a"/>
    <path d="M26 60 C18 60, 12 56, 8 50 C12 58, 20 66, 26 66 Z" fill="#059669"/>
    <line x1="12" y1="52" x2="6" y2="44" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    <line x1="14" y1="54" x2="8" y2="48" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    <line x1="10" y1="56" x2="4" y2="58" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    <line x1="12" y1="58" x2="6" y2="64" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    <rect x="34" y="68" width="7" height="15" rx="3" fill="#047857"/>
    <rect x="58" y="68" width="7" height="15" rx="3" fill="#047857"/>
  </svg>`,

  velociraptor: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <!-- Khủng long chạy nhanh: Lao về phía trước & Móng vuốt liềm (KHÔNG PHẢI TIA SÉT) -->
    <path d="M12 44 Q28 48 38 54 Q26 54 14 50 Z" fill="#be123c"/>
    <ellipse cx="48" cy="54" rx="16" ry="11" fill="#e11d48" transform="rotate(-10 48 54)"/>
    <path d="M56 46 C62 36, 76 34, 86 40 C88 46, 82 52, 72 50 Z" fill="#f43f5e"/>
    <polygon points="76,48 82,50 78,52" fill="#ffffff"/>
    <circle cx="74" cy="42" r="3" fill="#ffffff"/>
    <circle cx="75" cy="42" r="1.5" fill="#0f172a"/>
    <path d="M54 62 L50 76 L58 78 L62 72 Z" fill="#9f1239"/>
    <path d="M58 72 Q64 68 62 76" stroke="#fde047" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M58 52 L66 58 L62 62" stroke="#be123c" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <line x1="8" y1="36" x2="24" y2="36" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="40" x2="18" y2="40" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  egg: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 56 Q20 78 40 88 Q60 92 74 84 Q82 74 76 56 L68 62 L60 54 L52 62 L44 54 L36 62 Z" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    <circle cx="38" cy="74" r="4" fill="#14b8a6"/>
    <circle cx="56" cy="78" r="5" fill="#06b6d4"/>
    <circle cx="68" cy="70" r="3.5" fill="#f43f5e"/>
    <ellipse cx="50" cy="44" rx="14" ry="12" fill="#22c55e"/>
    <circle cx="44" cy="42" r="4" fill="#ffffff"/>
    <circle cx="45" cy="42" r="2" fill="#0f172a"/>
    <circle cx="56" cy="42" r="4" fill="#ffffff"/>
    <circle cx="57" cy="42" r="2" fill="#0f172a"/>
    <path d="M46 50 Q50 54 54 50" stroke="#15803d" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M40 34 L46 26 L52 32 L58 26 L62 34 Z" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
    <ellipse cx="64" cy="50" rx="3" ry="5" fill="#16a34a" transform="rotate(30 64 50)"/>
  </svg>`,

  footprint: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="70" height="70" rx="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/>
    <path d="M50 48 C44 48, 36 56, 38 68 C40 76, 60 76, 62 68 C64 56, 56 48, 50 48 Z" fill="#475569"/>
    <path d="M46 48 L46 28 L50 20 L54 28 L54 48 Z" fill="#334155"/>
    <path d="M42 54 L26 38 L22 36 L28 46 L40 58 Z" fill="#334155"/>
    <path d="M58 54 L74 38 L78 36 L72 46 L60 58 Z" fill="#334155"/>
    <line x1="20" y1="25" x2="32" y2="30" stroke="#94a3b8" stroke-width="2"/>
    <line x1="80" y1="75" x2="68" y2="70" stroke="#94a3b8" stroke-width="2"/>
  </svg>`,

  fossil: `<svg viewBox="0 0 100 100" class="dino-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 25 Q50 14 82 22 Q88 54 80 82 Q46 90 18 80 Q12 50 18 25 Z" fill="#d97706" stroke="#92400e" stroke-width="3"/>
    <path d="M30 42 C30 32, 54 30, 68 36 C74 40, 74 48, 66 52 C58 54, 46 54, 40 50 Z" fill="#fef3c7"/>
    <circle cx="48" cy="38" r="5" fill="#78350f"/>
    <ellipse cx="62" cy="40" rx="3" ry="2" fill="#78350f"/>
    <path d="M42 50 L44 54 L46 50 L48 54 L50 50 L52 54 L54 50 L56 54 L58 50 L60 54 L62 50" stroke="#78350f" stroke-width="1.5" fill="none"/>
    <path d="M34 54 C40 54, 62 54, 66 56 C60 60, 40 60, 34 54 Z" fill="#fef3c7"/>
  </svg>`
};

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
    breakdown: 'b - ao - bạo, ch - ua - chúa',
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
    breakdown: 'b - a - ba, s - ưng - sừng',
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
    breakdown: 'c - ô - cổ, d - ai - dài',
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
    breakdown: 'b - ay - bay',
    spellText: 'Bờ - ay - bay -> khủng long bay',
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
    breakdown: 'đ - uôi - đuôi, g - ai - gai',
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
    breakdown: 'gi - ap - giáp, b - ua - búa',
    spellText: 'Dờ - ap - giap - sắc - giáp, bờ - ua - bua - sắc - búa -> giáp búa',
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
    breakdown: 'ch - ay - chạy, nh - anh - nhanh',
    spellText: 'Chờ - ay - chay - nặng - chạy, nờ - anh - nhanh -> chạy nhanh',
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
    breakdown: 'tr - ưng - trứng',
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
    breakdown: 'd - âu - dấu, ch - ân - chân',
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
    breakdown: 'h - oa - hóa, th - ach - thạch',
    spellText: 'Hờ - oa - hoa - sắc - hóa, thờ - ach - thach - nặng - thạch -> hóa thạch',
    icon: DINO_PHOTOS.hoa_thach,
    ja: 'かせき (Fossil)',
    funFact: 'Xương khủng long nằm sâu trong lòng đất triệu năm để bé khám phá!',
    example: 'Nhà khảo cổ học tìm thấy hóa thạch'
  }
];

// CHUYÊN MỤC MỚI: THẾ GIỚI CÁC LOẠI XE (VEHICLES WORLD)
const VEHICLE_LESSONS = [
  {
    id: 'veh1',
    word: 'xe cảnh sát',
    vehName: 'Xe Cảnh Sát (Patrol Car)',
    audioKey: 'veh_xe_canh_sat',
    spellKey: 'spell_xe_canh_sat',
    breakdown: 'c - anh - cảnh, s - at - sát',
    spellText: 'cờ - anh - canh - hỏi - cảnh, sờ - at - sat - sắc - sát -> xe cảnh sát',
    icon: VEHICLE_PHOTOS.xe_canh_sat,
    ja: 'パトカー (Patokaa)',
    funFact: 'Đèn chớp đỏ xanh, còi hú vang dội, các chú cảnh sát bảo vệ bình yên!',
    example: 'Xe cảnh sát tuần tra trên phố'
  },
  {
    id: 'veh2',
    word: 'xe cứu hỏa',
    vehName: 'Xe Cứu Hỏa (Fire Truck)',
    audioKey: 'veh_xe_cuu_hoa',
    spellKey: 'spell_xe_cuu_hoa',
    breakdown: 'c - ưu - cứu, h - oa - hỏa',
    spellText: 'cờ - ưu - cưu - sắc - cứu, hờ - oa - hoa - hỏi - hỏa -> xe cứu hỏa',
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
    breakdown: 'c - ưu - cứu, th - ương - thương',
    spellText: 'cờ - ưu - cưu - sắc - cứu, thờ - ương - thương -> xe cứu thương',
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
    breakdown: 'm - ay - máy, x - uc - xúc',
    spellText: 'Mờ - ay - may - sắc - máy, xờ - uc - xuc - sắc - xúc -> máy xúc',
    icon: VEHICLE_PHOTOS.may_xuc,
    ja: 'ショベルカー (Shoberukaa)',
    funFact: 'Chiếc cánh tay sắt khổng lồ múc đất đá khỏe như một dũng sĩ công trường!',
    example: 'Máy xúc đào đất làm đường mới'
  },
  {
    id: 'veh5',
    word: 'xe buýt',
    vehName: 'Xe Buýt Chở Khách (Bus)',
    audioKey: 'veh_xe_buyt',
    spellKey: 'spell_xe_buyt',
    breakdown: 'b - uyt - buýt',
    spellText: 'Bờ - uyt - buyt - sắc - buýt -> xe buýt',
    icon: VEHICLE_PHOTOS.xe_buyt,
    ja: 'バス (Basu)',
    funFact: 'Xe dài nhiều chỗ ngồi, đón các bạn nhỏ Bảo Long đến trường mỗi ngày!',
    example: 'Bảo Long lên xe buýt đi học'
  },
  {
    id: 'veh6',
    word: 'xe tải',
    vehName: 'Xe Tải Chở Hàng (Truck)',
    audioKey: 'veh_xe_tai',
    spellKey: 'spell_xe_tai',
    breakdown: 't - ai - tải',
    spellText: 'Tờ - ai - tai - hỏi - tải -> xe tải',
    icon: VEHICLE_PHOTOS.xe_tai,
    ja: 'トラック (Torakku)',
    funFact: 'Thùng xe to lớn chở đồ chơi, hoa quả và hàng hóa đi khắp mọi miền!',
    example: 'Xe tải chở hàng hóa nặng'
  },
  {
    id: 'veh7',
    word: 'tàu hỏa',
    vehName: 'Tàu Hỏa / Shinkansen (Train)',
    audioKey: 'veh_tau_hoa',
    spellKey: 'spell_tau_hoa',
    breakdown: 't - au - tàu, h - oa - hỏa',
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
    breakdown: 'm - ay - máy, b - ay - bay',
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
    breakdown: 'tr - ực - trực, th - ăng - thăng',
    spellText: 'Trờ - ực - trưc - nặng - trực, thờ - ăng - thăng -> trực thăng',
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
    breakdown: 't - au - tàu, th - uy - thủy',
    spellText: 'Tờ - au - tau - huyền - tàu, thờ - uy - thuy - hỏi - thủy -> tàu thủy',
    icon: VEHICLE_PHOTOS.tau_thuy,
    ja: 'ふね (Fune)',
    funFact: 'Chiếc tàu khổng lồ rẽ sóng trắng xóa lướt êm trên đại dương bao la!',
    example: 'Tàu thủy chở hàng ra khơi'
  },
  {
    id: 'veh11',
    word: 'xe con',
    vehName: 'Xe Ô Tô Con (Car)',
    audioKey: 'veh_xe_con',
    spellKey: 'spell_xe_con',
    breakdown: 'x - e - xe, c - on - con',
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
    breakdown: 'x - e - xe, đ - ap - đạp',
    spellText: 'Xờ - e - xe, đờ - ap - đap - nặng - đạp -> xe đạp',
    icon: VEHICLE_PHOTOS.xe_dap,
    ja: 'じてんしゃ (Jitensha)',
    funFact: 'Bảo Long đạp hai bàn đạp quay đều, rèn luyện sức khỏe dẻo dai!',
    example: 'Bảo Long tập đi xe đạp'
  }
];

// DỮ LIỆU GAME 1: LẬT THẺ KHỦNG LONG (DINO MEMORY FLIP)
const DINO_MEMORY_PAIRS = [
  { id: 'pair1', name: 'T-Rex Bạo Chúa', icon: DINO_PHOTOS.bao_chua, ja: 'ティラノサウルス', audioKey: 'dino_bao_chua' },
  { id: 'pair2', name: 'Ba Sừng Dũng Mãnh', icon: DINO_PHOTOS.ba_sung, ja: 'トリケラトプス', audioKey: 'dino_ba_sung' },
  { id: 'pair3', name: 'Cổ Dài Cao Lớn', icon: DINO_PHOTOS.co_dai, ja: 'ブラキオサウルス', audioKey: 'dino_co_dai' },
  { id: 'pair4', name: 'Khủng Long Bay', icon: DINO_PHOTOS.khung_long_bay, ja: 'プテラノドン', audioKey: 'dino_khung_long_bay' },
  { id: 'pair5', name: 'Đuôi Gai Sắc Nhọn', icon: DINO_PHOTOS.duoi_gai, ja: 'ステゴサウルス', audioKey: 'dino_duoi_gai' },
  { id: 'pair6', name: 'Giáp Búa Ankylosaurus', icon: DINO_PHOTOS.giap_bua, ja: 'アンキロサウルス', audioKey: 'dino_giap_bua' }
];

// DỮ LIỆU GAME 2: ĐỐ VUI KHỦNG LONG CHO BẢO LONG (DINO QUIZ)
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
  }
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
  {
    target: 'ba',
    consonant: 'b',
    vowel: 'a',
    tone: 'ngang',
    meaning: 'Bố / Ba (お父さん)',
    icon: '👨',
    puzzle: ['b', 'a'],
    options: ['b', 'a', 'c', 'm', 'd']
  },
  {
    target: 'bà',
    consonant: 'b',
    vowel: 'à',
    tone: 'huyền',
    meaning: 'Bà ngoại / Bà nội (おばあさん)',
    icon: '👵',
    puzzle: ['b', 'à'],
    options: ['b', 'à', 'á', 'm', 'n']
  },
  {
    target: 'bố',
    consonant: 'b',
    vowel: 'ố',
    tone: 'sắc',
    meaning: 'Bố (お父さん)',
    icon: '🧔',
    puzzle: ['b', 'ố'],
    options: ['b', 'ố', 'ô', 'h', 'g']
  },
  {
    target: 'mẹ',
    consonant: 'm',
    vowel: 'ẹ',
    tone: 'nặng',
    meaning: 'Mẹ (お母さん)',
    icon: '👩',
    puzzle: ['m', 'ẹ'],
    options: ['m', 'ẹ', 'e', 'b', 'l']
  },
  {
    target: 'bò',
    consonant: 'b',
    vowel: 'ò',
    tone: 'huyền',
    meaning: 'Con bò (うし)',
    icon: '🐮',
    puzzle: ['b', 'ò'],
    options: ['b', 'ò', 'o', 'c', 'đ']
  },
  {
    target: 'cá',
    consonant: 'c',
    vowel: 'á',
    tone: 'sắc',
    meaning: 'Con cá (さかな)',
    icon: '🐟',
    puzzle: ['c', 'á'],
    options: ['c', 'á', 'a', 'g', 't']
  },
  {
    target: 'gà',
    consonant: 'g',
    vowel: 'à',
    tone: 'huyền',
    meaning: 'Con gà (にわとり)',
    icon: '🐔',
    puzzle: ['g', 'à'],
    options: ['g', 'à', 'a', 'b', 'k']
  },
  {
    target: 'cặp',
    consonant: 'c',
    vowel: 'ặp',
    tone: 'nặng',
    meaning: 'Cặp sách (ランドセル)',
    icon: '🎒',
    puzzle: ['c', 'ặp'],
    options: ['c', 'ặp', 'ắp', 'd', 's']
  },
  {
    target: 'dép',
    consonant: 'd',
    vowel: 'ép',
    tone: 'sắc',
    meaning: 'Đôi dép (サンダル)',
    icon: '🩴',
    puzzle: ['d', 'ép'],
    options: ['d', 'ép', 'ep', 'b', 't']
  },
  {
    target: 'bếp',
    consonant: 'b',
    vowel: 'ếp',
    tone: 'sắc',
    meaning: 'Cái bếp (だいどころ)',
    icon: '🍳',
    puzzle: ['b', 'ếp'],
    options: ['b', 'ếp', 'êp', 'p', 'm']
  },
  {
    target: 'xe',
    consonant: 'x',
    vowel: 'e',
    tone: 'ngang',
    meaning: 'Xe cộ (くるま)',
    icon: '🚗',
    puzzle: ['x', 'e'],
    options: ['x', 'e', 'a', 'c', 't']
  },
  {
    target: 'tàu',
    consonant: 't',
    vowel: 'àu',
    tone: 'huyền',
    meaning: 'Tàu điện (でんしゃ)',
    icon: '🚅',
    puzzle: ['t', 'àu'],
    options: ['t', 'àu', 'au', 'm', 'n']
  }
];
