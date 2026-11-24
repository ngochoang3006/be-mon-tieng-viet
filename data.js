// Dữ liệu học tiếng Việt cho Bé Bảo Long (6 tuổi)
// Chuẩn hóa phát âm và đánh vần ngữ âm tiếng Việt chuẩn: BỜ A BA, ĐỜ A ĐA...
// Kho từ vựng phong phú 7 bài học + Thế giới Khủng Long + Thế giới Xe Cộ + Minigames

const ALPHABET_DATA = [
  { char: 'A', lower: 'a', phonetic: 'a', word: 'Gà', example: 'con gà', icon: '🐔', ja: 'にわとり (Niwatori)' },
  { char: 'Ă', lower: 'ă', phonetic: 'á', word: 'Mặt trăng', example: 'mặt trăng', icon: '🌙', ja: 'つき (Tsuki)' },
  { char: 'Â', lower: 'â', phonetic: 'ớ', word: 'Cây', example: 'cái cây', icon: '🌳', ja: 'き (Ki)' },
  { char: 'B', lower: 'b', phonetic: 'bờ', word: 'Bò', example: 'con bò', icon: '🐮', ja: 'うし (Ushi)' },
  { char: 'C', lower: 'c', phonetic: 'cờ', word: 'Cá', example: 'con cá', icon: '🐟', ja: 'さかな (Sakana)' },
  { char: 'D', lower: 'd', phonetic: 'dờ', word: 'Dê', example: 'con dê', icon: '🐐', ja: 'ヤギ (Yagi)' },
  { char: 'Đ', lower: 'đ', phonetic: 'đờ', word: 'Đá', example: 'hòn đá', icon: '🪨', ja: 'いし (Ishi)' },
  { char: 'E', lower: 'e', phonetic: 'e', word: 'Me', example: 'quả me', icon: '🌿', ja: 'タマリンド' },
  { char: 'Ê', lower: 'ê', phonetic: 'ê', word: 'Bếp', example: 'cái bếp', icon: '🍳', ja: 'キッチン (Kitchin)' },
  { char: 'G', lower: 'g', phonetic: 'gờ', word: 'Ghế', example: 'cái ghế', icon: '🪑', ja: 'いす (Isu)' },
  { char: 'H', lower: 'h', phonetic: 'hờ', word: 'Hoa', example: 'bông hoa', icon: '🌸', ja: 'はな (Hana)' },
  { char: 'I', lower: 'i', phonetic: 'i', word: 'Bi', example: 'viên bi', icon: '🔮', ja: 'ビー玉 (Biidama)' },
  { char: 'K', lower: 'k', phonetic: 'cờ', word: 'Kéo', example: 'cái kéo', icon: '✂️', ja: 'はさみ (Hasami)' },
  { char: 'L', lower: 'l', phonetic: 'lờ', word: 'Lá', example: 'chiếc lá', icon: '🍃', ja: 'はっぱ (Happa)' },
  { char: 'M', lower: 'm', phonetic: 'mờ', word: 'Mèo', example: 'con mèo', icon: '🐱', ja: 'ねこ (Neko)' },
  { char: 'N', lower: 'n', phonetic: 'nờ', word: 'Nơ', example: 'cái nơ', icon: '🎀', ja: 'リボン (Ribon)' },
  { char: 'O', lower: 'o', phonetic: 'o', word: 'Ong', example: 'con ong', icon: '🐝', ja: 'ハチ (Hachi)' },
  { char: 'Ô', lower: 'ô', phonetic: 'ô', word: 'Ô dù', example: 'cái ô dù', icon: '☂️', ja: 'かさ (Kasa)' },
  { char: 'Ơ', lower: 'ơ', phonetic: 'ơ', word: 'Cờ', example: 'lá cờ', icon: '🚩', ja: 'はた (Hata)' },
  { char: 'P', lower: 'p', phonetic: 'pờ', word: 'Pin', example: 'cục pin', icon: '🔋', ja: 'でんち (Denchi)' },
  { char: 'Q', lower: 'q', phonetic: 'cu', word: 'Quạt', example: 'cái quạt', icon: '🪭', ja: 'せんぷうき / うちわ' },
  { char: 'R', lower: 'r', phonetic: 'rờ', word: 'Rùa', example: 'con rùa', icon: '🐢', ja: 'かめ (Kame)' },
  { char: 'S', lower: 's', phonetic: 'sờ', word: 'Sách', example: 'quyển sách', icon: '📚', ja: 'ほん (Hon)' },
  { char: 'T', lower: 't', phonetic: 'tờ', word: 'Tàu', example: 'tàu hoả', icon: '🚂', ja: 'でんしゃ (Densha)' },
  { char: 'U', lower: 'u', phonetic: 'u', word: 'Cú', example: 'con cú', icon: '🦉', ja: 'ふくろう (Fukurou)' },
  { char: 'Ư', lower: 'ư', phonetic: 'ư', word: 'Sư tử', example: 'sư tử', icon: '🦁', ja: 'ライオン (Raion)' },
  { char: 'V', lower: 'v', phonetic: 'vờ', word: 'Voi', example: 'con voi', icon: '🐘', ja: 'ぞう (Zou)' },
  { char: 'X', lower: 'x', phonetic: 'xờ', word: 'Xe', example: 'xe ô tô', icon: '🚗', ja: 'くるま (Kuruma)' },
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
      { id: 'w8', word: 'cá', breakdown: 'c - a - sắc', tone: 'Sắc', icon: '🐟', ja: 'さかな (Sakana)', spellText: 'Cờ - a - ca - sắc - cá', example: 'Con cá bơi lội' },
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
      { id: 'w16', word: 'cô', breakdown: 'c - ô', tone: 'Ngang', icon: '👩‍🏫', ja: 'おばさん / 先生 (Cô)', spellText: 'Cờ - ô - cô', example: 'Cô giáo dạy Bảo Long học' },
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
      { id: 'w21', word: 'cơm', breakdown: 'c - ơn - cơm', tone: 'Ngang', icon: '🍚', ja: 'ごはん (Gohan)', spellText: 'Cờ - ơn - cơm', example: 'Bảo Long ăn cơm ngoan' },
      { id: 'w22', word: 'sữa', breakdown: 's - ưa - ngã', tone: 'Ngã', icon: '🥛', ja: 'ぎゅうにゅう (Gyuunyuu)', spellText: 'Sờ - ưa - sưa - ngã - sữa', example: 'Sữa tươi thơm ngon' },
      { id: 'w23', word: 'táo', breakdown: 't - ao - sắc', tone: 'Sắc', icon: '🍎', ja: 'りんご (Ringo)', spellText: 'Tờ - ao - tao - sắc - táo', example: 'Quả táo đỏ' },
      { id: 'w24', word: 'chuối', breakdown: 'ch - uôi - sắc', tone: 'Sắc', icon: '🍌', ja: 'バナナ (Banana)', spellText: 'Chờ - uôi - chuôi - sắc - chuối', example: 'Quả chuối ngọt' },
      { id: 'w25', word: 'kẹo', breakdown: 'k - eo - nặng', tone: 'Nặng', icon: '🍬', ja: 'あめ (Ame / Kyandi)', spellText: 'Ca - eo - keo - nặng - kẹo', example: 'Viên kẹo ngọt ngào' },
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
      { id: 'w35', word: 'cam', breakdown: 'c - am', tone: 'Ngang', icon: '🟠', ja: 'オレンジ (Orenji - Cam)', spellText: 'Cờ - am - cam', example: 'Quả cam màu cam' },
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
      { id: 'p1', word: 'sáp', rhyme: 'Vần -ap', breakdown: 's + ap + sắc', icon: '🖍️', ja: 'クレヨン (Kureyon) / ろうそく', spellText: 'Sờ - ap - sap - sắc - sáp', example: 'Bút sáp màu tô vẽ' },
      { id: 'p2', word: 'cặp', rhyme: 'Vần -ăp', breakdown: 'c + ăp + nặng', icon: '🎒', ja: 'ランドセル / カバン (Kaban)', spellText: 'Cờ - ắp - cắp - nặng - cặp', example: 'Cặp sách đến trường' },
      { id: 'p3', word: 'tập', rhyme: 'Vần -âp', breakdown: 't + âp + nặng', icon: '🤸', ja: 'れんしゅう (Renshuu - Tập thể dục / tập vở)', spellText: 'Tờ - ấp - tấp - nặng - tập', example: 'Bảo Long tập thể dục buổi sáng' },
      { id: 'p4', word: 'dép', rhyme: 'Vần -ep', breakdown: 'd + ep + sắc', icon: '🩴', ja: 'サンダル / スリッパ (Sandaru)', spellText: 'Dờ - ep - dep - sắc - dép', example: 'Đôi dép đi trong nhà' },
      { id: 'p5', word: 'bếp', rhyme: 'Vần -êp', breakdown: 'b + êp + sắc', icon: '🍳', ja: 'だいどころ / コンロ (Daidokoro)', spellText: 'Bờ - ếp - bêp - sắc - bếp', example: 'Mẹ nấu ăn trong bếp' },
      { id: 'p6', word: 'nhịp', rhyme: 'Vần -ip', breakdown: 'nh + ip + nặng', icon: '🥁', ja: 'リズム (Rizumu - Nhịp điệu)', spellText: 'Nhờ - ip - nhip - nặng - nhịp', example: 'Vỗ tay theo nhịp bài hát' },
      { id: 'p7', word: 'họp', rhyme: 'Vần -op', breakdown: 'h + op + nặng', icon: '👥', ja: 'かいぎ (Kaigi - Họp mặt)', spellText: 'Hờ - op - hop - nặng - họp', example: 'Cả nhà họp mặt vui vẻ' },
      { id: 'p8', word: 'hộp', rhyme: 'Vần -ôp', breakdown: 'h + ôp + nặng', icon: '📦', ja: 'はこ (Hako - Hộp giấy / quà)', spellText: 'Hờ - ốp - hôp - nặng - hộp', example: 'Chiếc hộp quà bất ngờ' },
      { id: 'p9', word: 'chớp', rhyme: 'Vần -ơp', breakdown: 'ch + ơp + sắc', icon: '⚡', ja: 'いなずま (Inazuma - Sấm chớp)', spellText: 'Chờ - ớp - chơp - sắc - chớp', example: 'Tia chớp sáng loé' },
      { id: 'p10', word: 'súp', rhyme: 'Vần -up', breakdown: 's + up + sắc', icon: '🍲', ja: 'スープ (Suupu - Món súp)', spellText: 'Sờ - up - sup - sắc - súp', example: 'Bát súp thơm ngon nóng hổi' }
    ]
  },
  {
    id: 2,
    title: 'Bài 2: Âm cuối T – Vần at, ăt, ât, et, êt, it, ot, uôt...',
    subtitle: 'Học đánh vần các từ có kết thúc bằng âm T',
    words: [
      { id: 't1', word: 'cát', rhyme: 'Vần -at', breakdown: 'c + at + sắc', icon: '🏖️', ja: 'すな (Suna - Cát biển)', spellText: 'Cờ - at - cat - sắc - cát', example: 'Bãi cát vàng bên bờ biển' },
      { id: 't2', word: 'mắt', rhyme: 'Vần -ăt', breakdown: 'm + ăt + sắc', icon: '👀', ja: 'め (Me - Đôi mắt)', spellText: 'Mờ - ắt - măt - sắc - mắt', example: 'Đôi mắt Bảo Long sáng long lanh' },
      { id: 't3', word: 'đất', rhyme: 'Vần -ât', breakdown: 'đ + ât + sắc', icon: '🌱', ja: 'つち (Tsuchi - Đất trồng)', spellText: 'Đờ - ất - đât - sắc - đất', example: 'Đất phù sa màu mỡ' },
      { id: 't4', word: 'kẹo tét', rhyme: 'Vần -et', breakdown: 't + et + sắc', icon: '🧨', ja: 'おしょうがつ (Tết)', spellText: 'Tờ - et - tet - sắc - tét', example: 'Ngày Tết bé được mừng tuổi' },
      { id: 't5', word: 'tết', rhyme: 'Vần -êt', breakdown: 't + êt + sắc', icon: '🧧', ja: 'ベトナムの正月 (Tet)', spellText: 'Tờ - ết - têt - sắc - tết', example: 'Bé vui đón Tết Việt Nam' },
      { id: 't6', word: 'vịt', rhyme: 'Vần -it', breakdown: 'v + it + nặng', icon: '🦆', ja: 'かも (Kamo)', spellText: 'Vờ - it - vit - nặng - vịt', example: 'Đàn vịt con theo mẹ' },
      { id: 't7', word: 'hót', rhyme: 'Vần -ot', breakdown: 'h + ot + sắc', icon: '🐦', ja: 'なく (Chích chòe hót)', spellText: 'Hờ - ot - hot - sắc - hót', example: 'Chim hót líu lo' },
      { id: 't8', word: 'chuột', rhyme: 'Vần -uôt', breakdown: 'ch + uôt + nặng', icon: '🐭', ja: 'ねずみ (Nezumi)', spellText: 'Chờ - uôt - chuôt - nặng - chuột', example: 'Chú chuột Mickey' }
    ]
  }
];

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
    icon: '🦖',
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
    icon: '🦏',
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
    spellText: 'Cờ - ô - cô - hỏi - cổ, dờ - ai - dai - huyền - dài -> cổ dài',
    icon: '🦕',
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
    icon: '🦅',
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
    icon: '🦎',
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
    icon: '🛡️',
    ja: 'アンキロサウルス (Ankylosaurus)',
    funFact: 'Được ví như chiếc xe tăng sống, toàn thân bọc giáp gai và chiếc đuôi gắn quả chùy sắt!',
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
    icon: '⚡',
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
    icon: '🥚',
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
    icon: '🐾',
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
    icon: '🦴',
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
    spellText: 'Cờ - anh - canh - hỏi - cảnh, sờ - at - sat - sắc - sát -> xe cảnh sát',
    icon: '🚓',
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
    spellText: 'Cờ - ưu - cưu - sắc - cứu, hờ - oa - hoa - hỏi - hỏa -> xe cứu hỏa',
    icon: '🚒',
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
    spellText: 'Cờ - ưu - cưu - sắc - cứu, thờ - ương - thương -> xe cứu thương',
    icon: '🚑',
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
    icon: '🚜',
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
    icon: '🚌',
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
    icon: '🚛',
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
    icon: '🚅',
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
    icon: '✈️',
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
    icon: '🚁',
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
    icon: '🚢',
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
    icon: '🚗',
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
    icon: '🚲',
    ja: 'じてんしゃ (Jitensha)',
    funFact: 'Bảo Long đạp hai bàn đạp quay đều, rèn luyện sức khỏe dẻo dai!',
    example: 'Bảo Long tập đi xe đạp'
  }
];

// DỮ LIỆU GAME LẬT THẺ KHỦNG LONG (DINO MEMORY FLIP)
const DINO_MEMORY_PAIRS = [
  { id: 'pair1', name: 'T-Rex Bạo Chúa', icon: '🦖', ja: 'ティラノサウルス', audioKey: 'dino_bao_chua' },
  { id: 'pair2', name: 'Ba Sừng Dũng Mãnh', icon: '🦏', ja: 'トリケラトプス', audioKey: 'dino_ba_sung' },
  { id: 'pair3', name: 'Cổ Dài Cao Lớn', icon: '🦕', ja: 'ブラキオサウルス', audioKey: 'dino_co_dai' },
  { id: 'pair4', name: 'Khủng Long Bay', icon: '🦅', ja: 'プテラノドン', audioKey: 'dino_khung_long_bay' },
  { id: 'pair5', name: 'Đuôi Gai Sắc Nhọn', icon: '🦎', ja: 'ステゴサウルス', audioKey: 'dino_duoi_gai' },
  { id: 'pair6', name: 'Giáp Búa Thiết Giáp', icon: '🛡️', ja: 'アンキロサウルス', audioKey: 'dino_giap_bua' }
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
