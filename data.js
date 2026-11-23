// Dữ liệu học tiếng Việt cho Bé Mon (6 tuổi)
// Thiết kế sinh động, chuẩn theo lộ trình mầm non - tiểu học Việt Nam kết hợp chú thích tiếng Nhật gần gũi cho bé ở Nhật

const ALPHABET_DATA = [
  { char: 'A', lower: 'a', word: 'Gà', spell: 'A - con gà', icon: '🐔', ja: 'にわとり (Niwatori)' },
  { char: 'Ă', lower: 'ă', word: 'Mặt trăng', spell: 'Á - mặt trăng', icon: '🌙', ja: 'つき (Tsuki)' },
  { char: 'Â', lower: 'â', word: 'Cây', spell: 'Ớ - cái cây', icon: '🌳', ja: 'き (Ki)' },
  { char: 'B', lower: 'b', word: 'Bò', spell: 'Bờ - con bò', icon: '🐮', ja: 'うし (Ushi)' },
  { char: 'C', lower: 'c', word: 'Cá', spell: 'Cờ - con cá', icon: '🐟', ja: 'さかな (Sakana)' },
  { char: 'D', lower: 'd', word: 'Dê', spell: 'Dờ - con dê', icon: '🐐', ja: 'ヤギ (Yagi)' },
  { char: 'Đ', lower: 'đ', word: 'Đá', spell: 'Đờ - hòn đá', icon: '🪨', ja: 'いし (Ishi)' },
  { char: 'E', lower: 'e', word: 'Me', spell: 'E - quả me', icon: '🌿', ja: 'タマリンド' },
  { char: 'Ê', lower: 'ê', word: 'Bếp', spell: 'Ê - cái bếp', icon: '🍳', ja: 'キッチン (Kitchin)' },
  { char: 'G', lower: 'g', word: 'Ghế', spell: 'Gờ - cái ghế', icon: '🪑', ja: 'いす (Isu)' },
  { char: 'H', lower: 'h', word: 'Hoa', spell: 'Hờ - bông hoa', icon: '🌸', ja: 'はな (Hana)' },
  { char: 'I', lower: 'i', word: 'Bi', spell: 'I - viên bi', icon: '🔮', ja: 'ビー玉 (Biidama)' },
  { char: 'K', lower: 'k', word: 'Kéo', spell: 'Ca - cái kéo', icon: '✂️', ja: 'はさみ (Hasami)' },
  { char: 'L', lower: 'l', word: 'Lá', spell: 'Lờ - chiếc lá', icon: '🍃', ja: 'はっぱ (Happa)' },
  { char: 'M', lower: 'm', word: 'Mèo', spell: 'Mờ - con mèo', icon: '🐱', ja: 'ねこ (Neko)' },
  { char: 'N', lower: 'n', word: 'Nơ', spell: 'Nờ - cái nơ', icon: '🎀', ja: 'リボン (Ribon)' },
  { char: 'O', lower: 'o', word: 'Ong', spell: 'O - con ong', icon: '🐝', ja: 'ハチ (Hachi)' },
  { char: 'Ô', lower: 'ô', word: 'Ô dù', spell: 'Ô - cái ô dù', icon: '☂️', ja: 'かさ (Kasa)' },
  { char: 'Ơ', lower: 'ơ', word: 'Cờ', spell: 'Ơ - lá cờ', icon: '🚩', ja: 'はた (Hata)' },
  { char: 'P', lower: 'p', word: 'Pin', spell: 'Pờ - cục pin', icon: '🔋', ja: 'でんち (Denchi)' },
  { char: 'Q', lower: 'q', word: 'Quạt', spell: 'Cu - cái quạt', icon: '🪭', ja: 'せんぷうき / うちわ' },
  { char: 'R', lower: 'r', word: 'Rùa', spell: 'Rờ - con rùa', icon: '🐢', ja: 'かめ (Kame)' },
  { char: 'S', lower: 's', word: 'Sách', spell: 'Sờ - quyển sách', icon: '📚', ja: 'ほん (Hon)' },
  { char: 'T', lower: 't', word: 'Tàu', spell: 'Tờ - tàu hoả', icon: '🚂', ja: 'でんしゃ (Densha)' },
  { char: 'U', lower: 'u', word: 'Cú', spell: 'U - con cú', icon: '🦉', ja: 'ふくろう (Fukurou)' },
  { char: 'Ư', lower: 'ư', word: 'Sư tử', spell: 'Ư - sư tử', icon: '🦁', ja: 'ライオン (Raion)' },
  { char: 'V', lower: 'v', word: 'Voi', spell: 'Vờ - con voi', icon: '🐘', ja: 'ぞう (Zou)' },
  { char: 'X', lower: 'x', word: 'Xe', spell: 'Xờ - xe ô tô', icon: '🚗', ja: 'くるま (Kuruma)' },
  { char: 'Y', lower: 'y', word: 'Y tá', spell: 'I dài - y tá', icon: '👩‍⚕️', ja: 'かんごし (Kangoshi)' }
];

const TONES_DATA = [
  { name: 'Thanh Ngang (Không dấu)', sign: '—', example: 'ba (bố)', audioText: 'ba, thanh ngang', desc: 'Giọng đọc đều, bằng phẳng' },
  { name: 'Dấu Sắc', sign: '´', example: 'bá, cá, bé', audioText: 'Dấu sắc, cá, bé', desc: 'Giọng lên cao vút' },
  { name: 'Dấu Huyền', sign: '`', example: 'bà, bò, gà', audioText: 'Dấu huyền, bà, bò, gà', desc: 'Giọng hạ thấp êm đềm' },
  { name: 'Dấu Hỏi', sign: '?', example: 'bả, hổ, thỏ', audioText: 'Dấu hỏi, hổ, thỏ', desc: 'Giọng hơi lượn sóng xuống rồi lên' },
  { name: 'Dấu Ngã', sign: '~', example: 'bã, sữa, vẽ', audioText: 'Dấu ngã, sữa, vẽ', desc: 'Giọng ngắt rồi lên cao' },
  { name: 'Dấu Nặng', sign: '.', example: 'bạ, mẹ, nạ', audioText: 'Dấu nặng, mẹ, vẹt', desc: 'Giọng đọc gọn, dứt khoát' }
];

const VOCAB_LESSONS = [
  {
    id: 1,
    title: 'Bài 1: Từ 1 tiếng, 2 chữ cái – Nhóm 1 – Rất dễ',
    subtitle: 'Làm quen các từ đầu tiên thân quen nhất với bé',
    words: [
      { id: 'w1', word: 'ba', breakdown: 'b - a', tone: 'Ngang', icon: '👨', ja: 'お父さん (Otousan)', spellText: 'Bờ - a - ba', example: 'Ba yêu bé Mon' },
      { id: 'w2', word: 'bà', breakdown: 'b - a - huyền', tone: 'Huyền', icon: '👵', ja: 'おばあさん (Obaasan)', spellText: 'Bờ - a - ba - huyền - bà', example: 'Bà hiền từ' },
      { id: 'w3', word: 'bố', breakdown: 'b - ô - sắc', tone: 'Sắc', icon: '🧔', ja: 'お父さん (Bố / Papa)', spellText: 'Bờ - ô - bô - sắc - bố', example: 'Bố của Mon' },
      { id: 'w4', word: 'mẹ', breakdown: 'm - e - nặng', tone: 'Nặng', icon: '👩', ja: 'お母さん (Okaasan)', spellText: 'Mờ - e - me - nặng - mẹ', example: 'Mẹ yêu Mon nhất' },
      { id: 'w5', word: 'bé', breakdown: 'b - e - sắc', tone: 'Sắc', icon: '👶', ja: 'あかちゃん / 子ども (Bé)', spellText: 'Bờ - e - be - sắc - bé', example: 'Bé Mon chăm ngoan' },
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
      { id: 'w16', word: 'cô', breakdown: 'c - ô', tone: 'Ngang', icon: '👩‍🏫', ja: 'おばさん / 先生 (Cô)', spellText: 'Cờ - ô - cô', example: 'Cô giáo dạy Mon học' },
      { id: 'w17', word: 'dì', breakdown: 'd - i - huyền', tone: 'Huyền', icon: '👩‍🦰', ja: 'おばさん (Dì)', spellText: 'Dờ - i - di - huyền - dì', example: 'Dì mua quà cho Mon' },
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
      { id: 'w21', word: 'cơm', breakdown: 'c - ơn - huyền', tone: 'Ngang', icon: '🍚', ja: 'ごはん (Gohan)', spellText: 'Cờ - cơm', example: 'Bé Mon ăn cơm ngoan' },
      { id: 'w22', word: 'sữa', breakdown: 's - ưa - ngã', tone: 'Ngã', icon: '🥛', ja: 'ぎゅうにゅう (Gyuunyuu)', spellText: 'Sờ - ưa - sưa - ngã - sữa', example: 'Sữa tươi thơm ngon' },
      { id: 'w23', word: 'táo', breakdown: 't - ao - sắc', tone: 'Sắc', icon: '🍎', ja: 'りんご (Ringo)', spellText: 'Tờ - ao - tao - sắc - táo', example: 'Quả táo đỏ' },
      { id: 'w24', word: 'chuối', breakdown: 'ch - uôi - sắc', tone: 'Sắc', icon: '🍌', ja: 'バナナ (Banana)', spellText: 'Chờ - uôi - chuôi - sắc - chuối', example: 'Quả chuối ngọt' },
      { id: 'w25', word: 'kẹo', breakdown: 'k - eo - nặng', tone: 'Nặng', icon: '🍬', ja: 'あめ (Ame / Kyandi)', spellText: 'Ca - eo - keo - nặng - kẹo', example: 'Viên kẹo ngọt ngào' },
      { id: 'w26', word: 'bút', breakdown: 'b - ut - sắc', tone: 'Sắc', icon: '✏️', ja: 'えんぴつ (Enpitsu)', spellText: 'Bờ - ut - but - sắc - bút', example: 'Bút chì tập viết' },
      { id: 'w27', word: 'vở', breakdown: 'v - ơ - hỏi', tone: 'Hỏi', icon: '📓', ja: 'ノート (Nooto)', spellText: 'Vờ - ơ - vơ - hỏi - vở', example: 'Quyển vở sạch đẹp' },
      { id: 'w28', word: 'bóng', breakdown: 'b - ong - sắc', tone: 'Sắc', icon: '⚽', ja: 'ボール (Booru)', spellText: 'Bờ - ong - bong - sắc - bóng', example: 'Bé chơi đá bóng' },
      { id: 'w29', word: 'mũ', breakdown: 'm - u - ngã', tone: 'Ngã', icon: '🧢', ja: 'ぼうし (Boushi)', spellText: 'Mờ - u - mu - ngã - mũ', example: 'Chiếc mũ che nắng' },
      { id: 'w30', word: 'nước', breakdown: 'n - ươc - sắc', tone: 'Sắc', icon: '💧', ja: 'みず (Mizu)', spellText: 'Nờ - ước - nươc - sắc - nước', example: 'Bé uống nước lọc' }
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
      { id: 'p3', word: 'tập', rhyme: 'Vần -âp', breakdown: 't + âp + nặng', icon: '🤸', ja: 'れんしゅう (Renshuu - Tập thể dục / tập vở)', spellText: 'Tờ - ấp - tấp - nặng - tập', example: 'Mon tập thể dục buổi sáng' },
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
      { id: 't2', word: 'mắt', rhyme: 'Vần -ăt', breakdown: 'm + ăt + sắc', icon: '👀', ja: 'め (Me - Đôi mắt)', spellText: 'Mờ - ắt - măt - sắc - mắt', example: 'Đôi mắt bé Mon sáng long lanh' },
      { id: 't3', word: 'đất', rhyme: 'Vần -ât', breakdown: 'đ + ât + sắc', icon: '🌱', ja: 'つち (Tsuchi - Đất trồng)', spellText: 'Đờ - ất - đât - sắc - đất', example: 'Đất phù sa màu mỡ' },
      { id: 't4', word: 'kẹo tét', rhyme: 'Vần -et', breakdown: 't + et + sắc', icon: '🧨', ja: 'おしょうがつ (Tết)', spellText: 'Tờ - et - tet - sắc - tét', example: 'Ngày Tết bé được mừng tuổi' },
      { id: 't5', word: 'tết', rhyme: 'Vần -êt', breakdown: 't + êt + sắc', icon: '🧧', ja: 'ベトナムの正月 (Tet)', spellText: 'Tờ - ết - têt - sắc - tết', example: 'Bé vui đón Tết Việt Nam' },
      { id: 't6', word: 'vịt', rhyme: 'Vần -it', breakdown: 'v + it + nặng', icon: '🦆', ja: 'かも (Kamo)', spellText: 'Vờ - it - vit - nặng - vịt', example: 'Đàn vịt con theo mẹ' },
      { id: 't7', word: 'hót', rhyme: 'Vần -ot', breakdown: 'h + ot + sắc', icon: '🐦', ja: 'なく (Chích chòe hót)', spellText: 'Hờ - ot - hot - sắc - hót', example: 'Chim hót líu lo' },
      { id: 't8', word: 'chuột', rhyme: 'Vần -uôt', breakdown: 'ch + uôt + nặng', icon: '🐭', ja: 'ねずみ (Nezumi)', spellText: 'Chờ - uôt - chuôt - nặng - chuột', example: 'Chú chuột Mickey' }
    ]
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
  }
];
