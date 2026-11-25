// ========================================================
// BỘ MÔN ĐẠO ĐỨC & GIÁO DỤC CÔNG DÂN LỚP 1 CHO BÉ BẢO LONG (6 TUỔI)
// Chuẩn chương trình Lớp 1 Việt Nam kết hợp nếp sống văn minh Việt - Nhật
// Gồm 4 phần: 8 Bài học thói quen đẹp, 8 Tình huống nhập vai,
// Game Nên/Không Nên (10 câu), Thực hành Đèn Giao Thông & Phân Loại Rác
// ========================================================

const ETHICS_LESSONS_DATA = [
  {
    id: 'eth_1',
    badge: '🏠 GIA ĐÌNH',
    title: 'Yêu thương & Hiếu thảo với Ba Mẹ, Ông Bà',
    icon: '👨‍👩‍👦',
    ja: 'おやこうこう・かぞく (Gia đình & Hiếu thảo)',
    summary: 'Lễ phép thưa gửi, nói lời yêu thương và phụ giúp ba mẹ việc nhỏ vừa sức.',
    practice: 'Hàng ngày: Dọn đồ chơi, rót nước mời ba mẹ, gọi điện hỏi thăm ông bà.',
    audioKey: 'ethics_lesson_1'
  },
  {
    id: 'eth_2',
    badge: '🙇 LỄ PHÉP',
    title: 'Chào hỏi, Cảm ơn & Xin lỗi đúng lúc',
    icon: '🙏',
    ja: 'あいさつ・ありがとう・ごめんなさい',
    summary: 'Khoanh tay chào người lớn, nhận bằng hai tay nói "Con cảm ơn ạ!" và biết nhận lỗi "Con xin lỗi ạ!".',
    practice: 'Gặp người lớn luôn mỉm cười chào hỏi rõ ràng.',
    audioKey: 'ethics_lesson_2'
  },
  {
    id: 'eth_3',
    badge: '🪥 TỰ LẬP',
    title: 'Tự giác giữ vệ sinh & Tự soạn đồ dùng',
    icon: '🧼',
    ja: 'てあらい・はみがき・じりつ',
    summary: 'Đánh răng sáng tối, rửa tay xà phòng trước khi ăn, tự gấp quần áo và soạn cặp đi học.',
    practice: 'Bé 6 tuổi tự lập làm việc cá nhân không cần ba mẹ nhắc nhiều.',
    audioKey: 'ethics_lesson_3'
  },
  {
    id: 'eth_4',
    badge: '🌟 TRUNG THỰC',
    title: 'Thật thà, dũng cảm nhận lỗi & trả đồ nhặt được',
    icon: '💎',
    ja: 'しょうじき (Chân thật)',
    summary: 'Không nói dối bao che lỗi; lỡ làm sai thì dũng cảm nhận lỗi; nhặt được của rơi tìm trả lại.',
    practice: 'Trung thực giúp mọi người luôn tin tưởng và yêu quý Bảo Long.',
    audioKey: 'ethics_lesson_4'
  },
  {
    id: 'eth_5',
    badge: '🤝 TÌNH BẠN',
    title: 'Hòa đồng, chia sẻ & Biết xếp hàng chờ tới lượt',
    icon: '🧑‍🤝‍🧑',
    ja: 'なかよし・じゅんばん (Xếp hàng)',
    summary: 'Biết nhường nhịn em nhỏ, chia sẻ đồ chơi với bạn, luôn xếp hàng trật tự không chen lấn.',
    practice: 'Chơi vui cùng bạn bè ở trường, không trêu chọc hay đánh bạn.',
    audioKey: 'ethics_lesson_5'
  },
  {
    id: 'eth_6',
    badge: '🚦 AN TOÀN',
    title: 'Tuân thủ luật giao thông & Trật tự công cộng',
    icon: '🚸',
    ja: 'こうつうあんぜん・マナー',
    summary: 'Đèn đỏ dừng lại, đèn xanh mới đi; thắt dây an toàn trên ô tô; giữ im lặng văn minh trên tàu Shinkansen.',
    practice: 'Quan sát hai bên khi qua đường vạch kẻ trắng và luôn nắm tay ba mẹ.',
    audioKey: 'ethics_lesson_6'
  },
  {
    id: 'eth_7',
    badge: '🌍 CÔNG DÂN XANH',
    title: 'Bảo vệ thiên nhiên & Phân loại rác sạch đẹp',
    icon: '♻️',
    ja: 'エコ・ゴミぶんべつ (Phân loại rác)',
    summary: 'Không vứt rác bừa bãi, biết phân loại chai nhựa / rác hữu cơ / pin, tắt nước điện khi không dùng.',
    practice: 'Yêu cây xanh, không bẻ cành hái hoa nơi công viên.',
    audioKey: 'ethics_lesson_7'
  },
  {
    id: 'eth_8',
    badge: '🇻🇳 NGUỒN CỘI',
    title: 'Chăm chỉ học tập & Tự hào gốc Việt Nam',
    icon: '📚',
    ja: 'べんきょう・ベトナムの心',
    summary: 'Chăm học tiếng Việt và Toán lớp 1 để đọc sách, nói chuyện thân thương với gia đình hai quê hương Việt - Nhật.',
    practice: 'Hoàn thành bài học mỗi ngày trước khi xem tivi hay chơi game.',
    audioKey: 'ethics_lesson_8'
  }
];

const ETHICS_SITUATIONS_DATA = [
  {
    id: 'sit1',
    badge: '🛝 Xếp hàng nơi công cộng',
    audioKey: 'ethics_sit_1',
    icon: '🎡',
    question: 'Ở công viên, nhiều bạn đang xếp hàng chờ tới lượt chơi cầu trượt. Bảo Long muốn chơi nhanh thì làm sao?',
    options: [
      { text: 'Xếp hàng ngay ngắn phía sau và chờ tới lượt của mình', isGood: true, feedback: 'Chuẩn công dân văn minh! Xếp hàng giúp mọi người chơi vui và an toàn!' },
      { text: 'Chen lên phía trước đẩy các bạn ra để chơi trước', isGood: false, feedback: 'Chen lấn có thể làm bạn bị ngã đau đấy, Bảo Long đứng xếp hàng nhé!' }
    ]
  },
  {
    id: 'sit2',
    badge: '🚅 Văn minh trên Tàu Shinkansen',
    audioKey: 'ethics_sit_2',
    icon: '🚅',
    question: 'Khi đang đi trên tàu điện Shinkansen hoặc xe buýt đông người cùng ba mẹ, Bảo Long nên làm gì?',
    options: [
      { text: 'Nói chuyện nhỏ nhẹ, ngồi yên trên ghế để mọi người nghỉ ngơi', isGood: true, feedback: 'Tuyệt vời! Ở Nhật hay Việt Nam thì giữ trật tự trên tàu đều rất lịch sự!' },
      { text: 'La hét thật to và chạy nhảy dọc hành lang tàu', isGood: false, feedback: 'Ồn ào và chạy trên tàu rất dễ ngã và làm phiền mọi người xung quanh đó!' }
    ]
  },
  {
    id: 'sit3',
    badge: '🌟 Dũng cảm nhận lỗi',
    audioKey: 'ethics_sit_3',
    icon: '🥛',
    question: 'Khi tự rót nước, Bảo Long lỡ tay làm đổ hết nước ra bàn ăn. Con sẽ làm gì ngay lúc đó?',
    options: [
      { text: 'Nói thật "Con xin lỗi mẹ, con lỡ tay!" rồi lấy khăn lau sạch', isGood: true, feedback: 'Hoan hô dũng khí nhận lỗi! Sai biết sửa mới là cậu bé thật thà đáng khen!' },
      { text: 'Chạy đi trốn hoặc đổ lỗi tại chú mèo làm đổ', isGood: false, feedback: 'Nói dối hay đổ thừa sẽ làm ba mẹ buồn, dũng cảm nhận lỗi tốt hơn nhiều nhé!' }
    ]
  },
  {
    id: 'sit4',
    badge: '🎁 Lễ phép khi nhận quà',
    audioKey: 'ethics_sit_4',
    icon: '🎁',
    question: 'Ông bà ở Việt Nam gửi tặng Bảo Long một hộp đồ chơi khủng long mới. Khi nhận quà từ người lớn, con làm gì?',
    options: [
      { text: 'Đưa cả hai tay nhận quà, cúi chào và nói to "Con cảm ơn ông bà ạ!"', isGood: true, feedback: 'Quá lễ phép! Ông bà nghe được chắc chắn sẽ mỉm cười hạnh phúc lắm!' },
      { text: 'Cầm lấy bằng một tay rồi chạy đi chơi chẳng nói lời nào', isGood: false, feedback: 'Đón bằng hai tay và nói "Con cảm ơn ạ" mới là bé ngoan lễ phép Bảo Long nhé!' }
    ]
  },
  {
    id: 'sit5',
    badge: '🚦 An toàn qua đường',
    audioKey: 'ethics_sit_5',
    icon: '🚦',
    question: 'Tới ngã tư đường phố, đèn tín hiệu cho người đi bộ đang sáng màu ĐỎ 🔴 nhưng đường vắng xe. Con làm thế nào?',
    options: [
      { text: 'Đứng yên trên vỉa hè chờ đèn chuyển sang XANH 🟢 rồi nắm tay ba bước qua', isGood: true, feedback: 'An toàn là số 1! Tuyệt đối dừng lại khi có đèn đỏ kể cả khi đường vắng!' },
      { text: 'Chạy ù qua đường một mình thật nhanh trước khi xe tới', isGood: false, feedback: 'Ôi nguy hiểm quá! Phải chờ đèn xanh và quan sát xe kỹ mới qua đường nhé!' }
    ]
  },
  {
    id: 'sit6',
    badge: '🧸 Tự lập thu dọn đồ chơi',
    audioKey: 'ethics_sit_6',
    icon: '🦖',
    question: 'Bảo Long vừa bày 10 chú khủng long và xe cứu hỏa chơi khắp phòng, giờ mẹ gọi vào ăn cơm tối. Con làm gì?',
    options: [
      { text: 'Nhanh nhẹn cất gọn khủng long và xe vào hộp đồ chơi rồi đi rửa tay ăn cơm', isGood: true, feedback: 'Bé Bảo Long tự lập quá! Nhà gọn gàng sạch đẹp lại đỡ vất vả cho mẹ!' },
      { text: 'Bỏ mặc đồ chơi vương vãi trên sàn để mẹ đi làm về phải dọn', isGood: false, feedback: 'Đồ chơi mình bày ra mình tự cất gọn mới là người lớn tự giác 6 tuổi nhé!' }
    ]
  },
  {
    id: 'sit7',
    badge: '🤕 Yêu thương bạn bè',
    audioKey: 'ethics_sit_7',
    icon: '🩹',
    question: 'Trong giờ ra chơi ở sân trường, một bạn cùng lớp chẳng may chạy bị vấp ngã đau chân. Bảo Long sẽ làm gì?',
    options: [
      { text: 'Chạy lại hỏi thăm "Bạn có sao không?", đỡ bạn dậy và gọi cô giáo giúp', isGood: true, feedback: 'Trái tim nhân hậu quá! Giúp bạn lúc khó khăn là điều tuyệt vời nhất!' },
      { text: 'Chỉ tay cười bạn ngã rồi bỏ đi chơi trò khác', isGood: false, feedback: 'Thấy bạn bị đau chúng mình cần thương và giúp đỡ, không được cười nhạo bạn!' }
    ]
  },
  {
    id: 'sit8',
    badge: '♻️ Giữ gìn môi trường sạch đẹp',
    audioKey: 'ethics_sit_8',
    icon: '🧃',
    question: 'Đi dạo công viên uống xong hộp sữa mà ngay chỗ ngồi chưa thấy thùng rác, Bảo Long nên làm gì với vỏ hộp?',
    options: [
      { text: 'Cầm theo hoặc bỏ vào túi ba lô, tìm đúng thùng rác để phân loại bỏ vào', isGood: true, feedback: 'Đúng chuẩn công dân xanh yêu thiên nhiên rồi Bảo Long ơi!' },
      { text: 'Ném đại hộp sữa vào bụi cây công viên để đỡ mỏi tay', isGood: false, feedback: 'Vứt rác bừa bãi làm bẩn công viên và hại các chú chim đấy, giữ tìm thùng rác nhé!' }
    ]
  }
];

const ETHICS_TF_DATA = [
  { id: 'tf1', icon: '🪥', text: 'Tự giác đánh răng buổi sáng và trước khi đi ngủ', shouldDo: true, reason: 'Bảo vệ hàm răng trắng khỏe không bị sâu răng!', audioKey: 'ethics_tf_1' },
  { id: 'tf2', icon: '📢', text: 'Hét ầm ĩ khi đang ở trong thư viện hoặc bệnh viện', shouldDo: false, reason: 'Thư viện và bệnh viện cần sự yên tĩnh cho mọi người.', audioKey: 'ethics_tf_2' },
  { id: 'tf3', icon: '🙏', text: 'Nói "Con cảm ơn ạ" khi được người khác giúp đỡ', shouldDo: true, reason: 'Lời cảm ơn là phép lịch sự kỳ diệu khiến ai cũng vui!', audioKey: 'ethics_tf_3' },
  { id: 'tf4', icon: '🌺', text: 'Hái trộm hoa và giẫm lên thảm cỏ trong công viên', shouldDo: false, reason: 'Cần giữ gìn hoa cỏ đẹp để mọi người cùng ngắm.', audioKey: 'ethics_tf_4' },
  { id: 'tf5', icon: '🤲', text: 'Đưa và nhận đồ với ông bà, ba mẹ bằng cả hai tay', shouldDo: true, reason: 'Đưa bằng hai tay thể hiện sự kính trọng và ngoan ngoãn.', audioKey: 'ethics_tf_5' },
  { id: 'tf6', icon: '🤥', text: 'Nói dối ba mẹ để trốn làm bài tập về nhà', shouldDo: false, reason: 'Trẻ ngoan luôn thật thà, chăm chỉ hoàn thành bài tập trước khi chơi.', audioKey: 'ethics_tf_6' },
  { id: 'tf7', icon: '🧼', text: 'Rửa tay sạch bằng xà phòng trước khi ăn cơm', shouldDo: true, reason: 'Rửa tay diệt vi khuẩn giúp Bảo Long bụng khỏe mạnh!', audioKey: 'ethics_tf_7' },
  { id: 'tf8', icon: '🚌', text: 'Xô đẩy chen lấn khi bước lên xe buýt đông người', shouldDo: false, reason: 'Xếp hàng nhường người già và lên từng người mới an toàn.', audioKey: 'ethics_tf_8' },
  { id: 'tf9', icon: '💡', text: 'Tắt đèn và khóa vòi nước cẩn thận sau khi sử dụng', shouldDo: true, reason: 'Tiết kiệm điện nước giúp bảo vệ tài nguyên Trái Đất!', audioKey: 'ethics_tf_9' },
  { id: 'tf10', icon: '🗑️', text: 'Ném rác bừa bãi ra đường phố khi không ai nhìn thấy', shouldDo: false, reason: 'Giữ đường phố sạch đẹp là trách nhiệm của mỗi công dân nhí!', audioKey: 'ethics_tf_10' }
];

const ECO_TRASH_ITEMS = [
  { id: 'eco1', emoji: '🍌', name: 'Vỏ chuối chín', bin: 'organic', binName: 'Rác Hữu Cơ / Đốt được (Xanh lá)' },
  { id: 'eco2', emoji: '🧴', name: 'Chai nhựa PET', bin: 'recycle', binName: 'Rác Tái Chế (Vàng - Chai/Giấy/Lon)' },
  { id: 'eco3', emoji: '🔋', name: 'Cục pin đã hết', bin: 'hazard', binName: 'Pin & Rác Đặc Biệt (Đỏ)' },
  { id: 'eco4', emoji: '📰', name: 'Tờ báo giấy cũ', bin: 'recycle', binName: 'Rác Tái Chế (Vàng - Chai/Giấy/Lon)' },
  { id: 'eco5', emoji: '🍏', name: 'Lõi quả táo thừa', bin: 'organic', binName: 'Rác Hữu Cơ / Đốt được (Xanh lá)' },
  { id: 'eco6', emoji: '🥫', name: 'Vỏ lon nước ngọt', bin: 'recycle', binName: 'Rác Tái Chế (Vàng - Chai/Giấy/Lon)' }
];

// State Đạo Đức & GDCD
let currentEthicsTab = 'lessons'; // 'lessons' | 'situations' | 'truefalse' | 'traffic_eco'
let ethicsSessionScore = 0;
let ethicsAutoTimer = null;

// Situations state
let ethicsSitQuestions = [];
let ethicsSitIndex = 0;
let ethicsSitScore = 0;

// True/False state
let ethicsTfQuestions = [];
let ethicsTfIndex = 0;
let ethicsTfScore = 0;
let ethicsTfStreak = 0;

// Eco trash game state
let ecoQueue = [];
let ecoIndex = 0;
let ecoScore = 0;

function addEthicsScore(pts) {
  ethicsSessionScore += pts;
  const el = document.getElementById('ethicsSessionStars');
  if (el) el.innerText = `⭐ Điểm Bé Ngoan: ${ethicsSessionScore}`;
}

function renderEthicsHub() {
  const el = document.getElementById('ethicsSessionStars');
  if (el) el.innerText = `⭐ Điểm Bé Ngoan: ${ethicsSessionScore}`;
  switchEthicsSubTab(currentEthicsTab);
}

function stopEthicsAutoPlay() {
  if (ethicsAutoTimer) {
    clearTimeout(ethicsAutoTimer);
    ethicsAutoTimer = null;
  }
  const btn = document.getElementById('btnAutoPlayEthics');
  if (btn) {
    btn.classList.remove('playing');
    btn.innerHTML = '<span>🎧</span> Nghe cả 8 bài';
  }
  document.querySelectorAll('#ethicsLessonsGrid .ethics-lesson-card.is-speaking-active').forEach(c => c.classList.remove('is-speaking-active'));
}

function switchEthicsSubTab(subtab) {
  stopEthicsAutoPlay();
  currentEthicsTab = subtab;

  const tabs = {
    lessons: ['ethicsPaneLessons', 'ethicsTabLessons'],
    situations: ['ethicsPaneSituations', 'ethicsTabSituations'],
    truefalse: ['ethicsPaneTrueFalse', 'ethicsTabTrueFalse'],
    traffic_eco: ['ethicsPaneTrafficEco', 'ethicsTabTrafficEco']
  };

  Object.entries(tabs).forEach(([k, [paneId, btnId]]) => {
    const p = document.getElementById(paneId);
    const b = document.getElementById(btnId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });

  if (subtab === 'lessons') renderEthicsLessonsTab();
  else if (subtab === 'situations') initEthicsSituationsGame();
  else if (subtab === 'truefalse') initEthicsTfGame();
  else if (subtab === 'traffic_eco') renderTrafficEcoTab();
}

// ========================================================
// TAB 1: 8 BÀI HỌC THÓI QUEN ĐẸP
// ========================================================
function renderEthicsLessonsTab() {
  const grid = document.getElementById('ethicsLessonsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  ETHICS_LESSONS_DATA.forEach(item => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds.includes(item.id);
    const card = document.createElement('div');
    card.className = `ethics-lesson-card ${learned ? 'is-learned' : ''}`;
    card.innerHTML = `
      <div class="ethics-card-top">
        <span class="ethics-badge">${item.badge}</span>
        <span class="ethics-star">${learned ? '⭐' : '☆'}</span>
      </div>
      <div class="ethics-icon">${item.icon}</div>
      <h4 class="ethics-title">${item.title}</h4>
      <div class="ethics-ja">🇯🇵 ${item.ja}</div>
      <p class="ethics-summary">${item.summary}</p>
      <div class="ethics-practice">🌱 ${item.practice}</div>
      <div class="ethics-hear-hint">🔊 Chạm để nghe bài học</div>
    `;

    card.addEventListener('click', () => {
      stopEthicsAutoPlay();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(item.audioKey, null, `${item.title}. ${item.summary}`);
      if (typeof markWordLearned === 'function') {
        const isNew = markWordLearned(item.id);
        if (isNew) {
          addEthicsScore(5);
          renderEthicsLessonsTab();
          if (typeof showToast === 'function') showToast(`⭐ +2 Sao! Bảo Long đã học: "${item.badge}"!`);
        } else if (typeof showToast === 'function') {
          showToast(`💝 ${item.title}`);
        }
      }
    });

    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayEthics');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (ethicsAutoTimer) {
        stopEthicsAutoPlay();
        window.soundMgr.stopAll();
        return;
      }
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng nghe';
      let idx = 0;
      const cards = document.querySelectorAll('#ethicsLessonsGrid .ethics-lesson-card');

      function playNext() {
        if (idx >= ETHICS_LESSONS_DATA.length) {
          stopEthicsAutoPlay();
          if (typeof showToast === 'function') showToast('🎉 Bảo Long đã nghe hết 8 bài học Đạo Đức rồi!');
          return;
        }
        document.querySelectorAll('#ethicsLessonsGrid .ethics-lesson-card').forEach(c => c.classList.remove('is-speaking-active'));
        if (cards[idx]) {
          cards[idx].classList.add('is-speaking-active');
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        const cur = ETHICS_LESSONS_DATA[idx];
        if (typeof markWordLearned === 'function') markWordLearned(cur.id);
        window.soundMgr.playAudioFile(cur.audioKey, () => {
          idx++;
          ethicsAutoTimer = setTimeout(playNext, 650);
        }, cur.title);
      }
      playNext();
    };
  }
}

// ========================================================
// TAB 2: XỬ LÝ TÌNH HUỐNG NHẬP VAI (8 TÌNH HUỐNG)
// ========================================================
function initEthicsSituationsGame() {
  ethicsSitQuestions = [...ETHICS_SITUATIONS_DATA].sort(() => Math.random() - 0.5);
  ethicsSitIndex = 0;
  ethicsSitScore = 0;

  document.getElementById('ethicsSitPlayStage').style.display = 'block';
  document.getElementById('ethicsSitVictoryStage').style.display = 'none';
  loadEthicsSituationQuestion();
}

function loadEthicsSituationQuestion() {
  if (ethicsSitIndex >= ethicsSitQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_ethics_win', null, 'Hoan hô Bảo Long công dân nhí ngoan ngoãn!');
    if (typeof awardStars === 'function') awardStars(15, 'Chuyên gia Xử Lý Tình Huống Đạo Đức!');

    document.getElementById('ethicsSitPlayStage').style.display = 'none';
    document.getElementById('ethicsSitVictoryStage').style.display = 'block';
    document.getElementById('ethicsSitVictoryScore').innerText =
      `Bé Bảo Long đạt ${ethicsSitScore} điểm cách cư xử văn minh (+15 ⭐ vào Kho Báu)!`;
    return;
  }

  const q = ethicsSitQuestions[ethicsSitIndex];
  document.getElementById('ethicsSitProgressText').innerText = `Tình huống ${ethicsSitIndex + 1} / ${ethicsSitQuestions.length}`;
  document.getElementById('ethicsSitScoreText').innerText = `⭐ ${ethicsSitScore} điểm`;

  document.getElementById('ethicsSitBadge').innerText = q.badge;
  document.getElementById('ethicsSitIcon').innerText = q.icon;
  document.getElementById('ethicsSitQuestion').innerText = q.question;

  document.getElementById('btnHearEthicsSit').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(q.audioKey, null, q.question);
  };
  setTimeout(() => window.soundMgr.playAudioFile(q.audioKey, null, q.question), 300);

  const optsWrap = document.getElementById('ethicsSitOptionsWrap');
  optsWrap.innerHTML = '';
  const choices = [...q.options].sort(() => Math.random() - 0.5);

  choices.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'ethics-sit-option';
    btn.innerText = opt.text;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;
      if (opt.isGood) {
        btn.classList.add('correct');
        ethicsSitScore += 10;
        addEthicsScore(10);
        document.getElementById('ethicsSitScoreText').innerText = `⭐ ${ethicsSitScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        window.soundMgr.playAudioFile('ethics_good', null, 'Tuyệt vời!');
        if (typeof showToast === 'function') showToast(`🌟 ${opt.feedback}`);

        setTimeout(() => {
          ethicsSitIndex++;
          loadEthicsSituationQuestion();
        }, 2100);
      } else {
        btn.classList.add('wrong');
        window.soundMgr.playWrong();
        window.soundMgr.playAudioFile('ethics_try', null, 'Bảo Long chọn lại nhé!');
        if (typeof showToast === 'function') showToast(`💡 ${opt.feedback}`);
      }
    });
    optsWrap.appendChild(btn);
  });
}

// ========================================================
// TAB 3: GAME NÊN LÀM HAY KHÔNG NÊN LÀM (10 CÂU)
// ========================================================
function initEthicsTfGame() {
  ethicsTfQuestions = [...ETHICS_TF_DATA].sort(() => Math.random() - 0.5);
  ethicsTfIndex = 0;
  ethicsTfScore = 0;
  ethicsTfStreak = 0;

  document.getElementById('ethicsTfPlayStage').style.display = 'block';
  document.getElementById('ethicsTfVictoryStage').style.display = 'none';
  loadEthicsTfQuestion();
}

function loadEthicsTfQuestion() {
  if (ethicsTfIndex >= ethicsTfQuestions.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_ethics_win', null, 'Hoan hô Bảo Long!');
    if (typeof awardStars === 'function') awardStars(15, 'Hoàn thành Game Nên hay Không Nên!');

    document.getElementById('ethicsTfPlayStage').style.display = 'none';
    document.getElementById('ethicsTfVictoryStage').style.display = 'block';
    document.getElementById('ethicsTfVictoryScore').innerText =
      `Bảo Long đạt ${ethicsTfScore} điểm (+15 ⭐ vào Kho Báu)!`;
    return;
  }

  const q = ethicsTfQuestions[ethicsTfIndex];
  document.getElementById('ethicsTfProgressText').innerText = `Câu ${ethicsTfIndex + 1} / ${ethicsTfQuestions.length}`;
  document.getElementById('ethicsTfStreakBadge').innerText = `🔥 Chuỗi x${ethicsTfStreak}`;
  document.getElementById('ethicsTfScoreText').innerText = `⭐ ${ethicsTfScore} điểm`;

  document.getElementById('ethicsTfIcon').innerText = q.icon;
  document.getElementById('ethicsTfText').innerText = q.text;

  document.getElementById('btnHearEthicsTf').onclick = () => {
    window.soundMgr.playClick();
    window.soundMgr.playAudioFile(q.audioKey, null, q.text);
  };
  setTimeout(() => window.soundMgr.playAudioFile(q.audioKey, null, q.text), 250);

  const btnYes = document.getElementById('btnEthicsShouldDo');
  const btnNo = document.getElementById('btnEthicsShouldNot');
  btnYes.classList.remove('correct', 'wrong');
  btnNo.classList.remove('correct', 'wrong');
  let locked = false;

  function answer(choiceShouldDo, btnEl) {
    if (locked) return;
    if (choiceShouldDo === q.shouldDo) {
      locked = true;
      btnEl.classList.add('correct');
      ethicsTfStreak++;
      const pts = ethicsTfStreak >= 3 ? 15 : 10;
      ethicsTfScore += pts;
      addEthicsScore(pts);
      document.getElementById('ethicsTfStreakBadge').innerText = `🔥 Chuỗi x${ethicsTfStreak}`;
      document.getElementById('ethicsTfScoreText').innerText = `⭐ ${ethicsTfScore} điểm`;

      window.soundMgr.playCorrect();
      if (typeof fireConfetti === 'function') fireConfetti();
      window.soundMgr.playAudioFile('ethics_good', null, 'Tuyệt vời!');
      if (typeof showToast === 'function') showToast(`✅ Chuẩn xác! ${q.reason}`);

      setTimeout(() => {
        ethicsTfIndex++;
        loadEthicsTfQuestion();
      }, 1800);
    } else {
      ethicsTfStreak = 0;
      document.getElementById('ethicsTfStreakBadge').innerText = `🔥 Chuỗi x0`;
      btnEl.classList.add('wrong');
      window.soundMgr.playWrong();
      window.soundMgr.playAudioFile('ethics_try', null, 'Thử chọn lại nhé!');
      if (typeof showToast === 'function') showToast(`💡 Nghĩ kỹ nhé: ${q.reason}`);
    }
  }

  btnYes.onclick = () => answer(true, btnYes);
  btnNo.onclick = () => answer(false, btnNo);
}

// ========================================================
// TAB 4: ĐÈN GIAO THÔNG THÔNG MINH & PHÂN LOẠI RÁC XANH
// ========================================================
function renderTrafficEcoTab() {
  // Interactive Traffic Light
  const btns = document.querySelectorAll('.tl-light-btn');
  const carEl = document.getElementById('trafficSimCar');
  const statusEl = document.getElementById('trafficSimStatus');

  btns.forEach(btn => {
    btn.onclick = () => {
      const color = btn.dataset.color;
      btns.forEach(b => b.classList.remove('lit'));
      btn.classList.add('lit');
      window.soundMgr.playClick();

      if (color === 'red') {
        if (carEl) {
          carEl.classList.remove('go', 'slow');
          carEl.classList.add('stop');
        }
        if (statusEl) statusEl.innerText = '🔴 ĐÈN ĐỎ: TẤT CẢ DỪNG LẠI NGAY TRƯỚC VẠCH TRẮNG!';
        window.soundMgr.playAudioFile('ethics_tl_red', null, 'Đèn đỏ, dừng lại an toàn!');
      } else if (color === 'yellow') {
        if (carEl) {
          carEl.classList.remove('go', 'stop');
          carEl.classList.add('slow');
        }
        if (statusEl) statusEl.innerText = '🟡 ĐÈN VÀNG: ĐI CHẬM LẠI VÀ CHÚ Ý QUAN SÁT!';
        window.soundMgr.playAudioFile('ethics_tl_yellow', null, 'Đèn vàng, đi chậm lại cẩn thận!');
      } else if (color === 'green') {
        if (carEl) {
          carEl.classList.remove('stop', 'slow');
          carEl.classList.add('go');
        }
        if (statusEl) statusEl.innerText = '🟢 ĐÈN XANH: ĐƯỢC PHÉP ĐI AN TOÀN!';
        window.soundMgr.playAudioFile('ethics_tl_green', null, 'Đèn xanh, được phép đi an toàn!');
      }
    };
  });

  initEcoSortingGame();
}

function initEcoSortingGame() {
  ecoQueue = [...ECO_TRASH_ITEMS].sort(() => Math.random() - 0.5);
  ecoIndex = 0;
  ecoScore = 0;

  document.getElementById('ecoGamePlay').style.display = 'block';
  document.getElementById('ecoGameVictory').style.display = 'none';
  loadNextEcoItem();
}

function loadNextEcoItem() {
  if (ecoIndex >= ecoQueue.length) {
    if (typeof fireConfetti === 'function') fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('ethics_eco_correct', null, 'Bảo Long phân loại rác chuẩn quá!');
    if (typeof awardStars === 'function') awardStars(12, 'Chiến Binh Môi Trường Xanh!');

    document.getElementById('ecoGamePlay').style.display = 'none';
    document.getElementById('ecoGameVictory').style.display = 'block';
    return;
  }

  const item = ecoQueue[ecoIndex];
  document.getElementById('ecoProgressText').innerText = `Món đồ ${ecoIndex + 1} / ${ecoQueue.length}`;
  document.getElementById('ecoScoreText').innerText = `⭐ ${ecoScore} điểm`;
  document.getElementById('ecoTrashEmoji').innerText = item.emoji;
  document.getElementById('ecoTrashName').innerText = item.name;

  document.querySelectorAll('.eco-bin-btn').forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    btn.onclick = () => {
      if (btn.classList.contains('correct')) return;
      if (btn.dataset.bin === item.bin) {
        btn.classList.add('correct');
        ecoScore += 10;
        addEthicsScore(10);
        document.getElementById('ecoScoreText').innerText = `⭐ ${ecoScore} điểm`;
        window.soundMgr.playCorrect();
        if (typeof fireConfetti === 'function') fireConfetti();
        if (typeof showToast === 'function') showToast(`♻️ Tuyệt vời! "${item.name}" bỏ vào ${item.binName}!`);

        setTimeout(() => {
          ecoIndex++;
          loadNextEcoItem();
        }, 1200);
      } else {
        btn.classList.add('wrong');
        window.soundMgr.playWrong();
        if (typeof showToast === 'function') showToast(`💡 Chưa đúng thùng rồi! "${item.name}" cần bỏ vào thùng ${item.binName}!`);
      }
    };
  });
}
