// ========================================================
// MÔN TỰ NHIÊN & XÃ HỘI (VN GDPT 2018) + SEIKATSUKA / 生活科 (JP MEXT)
// Dành cho Bảo Long 6 tuổi (Chạm nghe toàn phần, không cần biết đọc trước)
// ========================================================

const SCIENCE_TOPICS_DATA = [
  {
    id: 'family_home',
    image: 'images/science/sc_topic_1.jpg',
    badge: '🏠 Chủ đề 1: Gia Đình',
    title: 'Gia Đình & Ngôi Nhà An Toàn',
    cards: [
      { id: 'sc_card_1', icon: '👨‍👩‍👦', title: 'Gia đình yêu thương', ja: 'かぞく (Kazoku)', desc: 'Ông bà, ba mẹ và Bảo Long cùng quan tâm, chia sẻ niềm vui mỗi ngày.' },
      { id: 'sc_card_2', icon: '🧹', title: 'Việc nhà vừa sức', ja: 'おてつだい (Otetsudai)', desc: 'Bảo Long tự gấp chăn gối, dọn đồ chơi gọn gàng và tưới cây giúp ba mẹ.' },
      { id: 'sc_card_3', icon: '⚡', title: 'An toàn điện & lửa', ja: 'でんき・ひのようじん', desc: 'Tuyệt đối không cho ngón tay hay đồ kim loại vào ổ cắm điện và tránh xa bếp lửa nóng.' },
      { id: 'sc_card_4', icon: '🔪', title: 'Đồ sắc nhọn nguy hiểm', ja: 'あぶないもの', desc: 'Không tự ý cầm dao nhọn hay chạy nhảy khi cầm kéo để tránh bị thương.' }
    ]
  },
  {
    id: 'school_seikatsu',
    image: 'images/science/sc_topic_2.jpg',
    badge: '🏫 Chủ đề 2: Trường Học',
    title: 'Trường Lớp & Đường Tới Trường (学校探検)',
    cards: [
      { id: 'sc_card_5', icon: '🏫', title: 'Khám phá trường học', ja: 'がっこうたんけん (Gakkou Tanken)', desc: 'Trường có phòng học lớp 1, thư viện đọc sách, phòng y tế và sân chơi rộng.' },
      { id: 'sc_card_6', icon: '🚦', title: 'Qua đường vạch trắng', ja: 'おうだんほどう (Oudanhodou)', desc: 'Đi trên vỉa hè, dừng lại đèn đỏ và giơ tay cao quan sát hai bên trước khi qua đường.' },
      { id: 'sc_card_7', icon: '📚', title: 'Giữ gìn sách vở sạch đẹp', ja: 'きょうかしょ・ノート', desc: 'Bao bìa sách, không vẽ bậy lên bàn ghế và soạn cặp đầy đủ từ tối hôm trước.' },
      { id: 'sc_card_8', icon: '🤝', title: 'Đoàn kết với bạn bè', ja: 'ともだちとなかよく', desc: 'Chơi hòa đồng, biết chia sẻ đồ chơi và gọi thầy cô ngay nếu bạn bị ngã.' }
    ]
  },
  {
    id: 'community',
    image: 'images/science/sc_topic_3.jpg',
    badge: '🚒 Chủ đề 3: Cộng Đồng',
    title: 'Các Nghề Quanh Bé & An Toàn Cộng Đồng',
    cards: [
      { id: 'sc_card_9', icon: '👩‍⚕️', title: 'Bác sĩ & Y tá', ja: 'おいしゃさん (Oishasan)', desc: 'Khám bệnh, tiêm phòng giúp Bảo Long mau khỏi ốm và luôn khỏe mạnh.' },
      { id: 'sc_card_10', icon: '🚒', title: 'Chú lính cứu hỏa 114', ja: 'しょうぼうし (Shouboushi)', desc: 'Dũng cảm dập tắt đám cháy và giải cứu mọi người khi gặp sự cố khẩn cấp.' },
      { id: 'sc_card_11', icon: '🌾', title: 'Cô chú nông dân', ja: 'のうかのひと (Nouka)', desc: 'Trồng lúa gạo, rau xanh và hoa quả tươi ngon cho bữa cơm hàng ngày.' },
      { id: 'sc_card_12', icon: '🚅', title: 'Kỹ sư lái tàu Shinkansen', ja: 'うんてんしゅ (Untenshu)', desc: 'Lái tàu cao tốc đúng giờ và đưa hành khách đi khắp nước Nhật an toàn.' }
    ]
  },
  {
    id: 'plants_animals',
    image: 'images/science/sc_topic_4.svg',
    badge: '🌻 Chủ đề 4: Sinh Vật',
    title: 'Cây Cối, Khủng Long & Muông Thú Quanh Bé',
    cards: [
      { id: 'sc_card_13', icon: '🌱', title: 'Các bộ phận của cây', ja: 'ね・くき・は・はな', desc: 'Cây xanh gồm rễ hút nước, thân đứng thẳng, lá đón nắng và hoa kết quả.' },
      { id: 'sc_card_14', icon: '💧', title: 'Cây cần nước và nắng', ja: 'みずとひかり', desc: 'Nếu quên tưới nước hoặc để nơi tối om, cây hoa sẽ bị héo rũ ngay đấy!' },
      { id: 'sc_card_15', icon: '🐶', title: 'Chăm sóc vật nuôi hiền lành', ja: 'どうぶつのおせわ', desc: 'Cho chó mèo ăn sạch, không kéo đuôi hay trêu chọc lúc chúng đang ăn hoặc ngủ.' },
      { id: 'sc_card_16', icon: '🐢', title: 'Bảo vệ thiên nhiên hoang dã', ja: 'しぜんをまもろう', desc: 'Không hái hoa bẻ cành nơi công cộng và yêu thương các loài vật nhỏ bé.' }
    ]
  },
  {
    id: 'body_health',
    image: 'images/science/sc_topic_5.svg',
    badge: '🫀 Chủ đề 5: Cơ Thể Bé',
    title: '5 Giác Quan, Rửa Tay 6 Bước & Tự Bảo Vệ',
    cards: [
      { id: 'sc_card_17', icon: '👀', title: '5 Giác quan kỳ diệu', ja: 'ごかん (Gokan)', desc: 'Mắt nhìn, Tai nghe, Mũi ngửi, Lưỡi nếm vị và Da cảm nhận nóng lạnh mềm cứng.' },
      { id: 'sc_card_18', icon: '🦷', title: 'Đánh răng sáng và tối', ja: 'はみがき (Hamigaki)', desc: 'Đánh răng đúng cách sau khi ăn và trước khi đi ngủ để răng trắng không bị sâu.' },
      { id: 'sc_card_19', icon: '🧼', title: 'Rửa tay 6 bước với xà phòng', ja: 'てあらい (Tearai)', desc: 'Rửa tay thật sạch trước khi ăn, sau khi đi vệ sinh và sau khi chơi ngoài sân.' },
      { id: 'sc_card_20', icon: '🛡️', title: 'Quy tắc vùng riêng tư', ja: 'プライベートゾーン', desc: 'Không cho người lạ chạm vào vùng đồ bơi, biết hét to và kể ngay với ba mẹ.' }
    ]
  },
  {
    id: 'earth_seasons',
    image: 'images/science/sc_topic_6.svg',
    badge: '☀️ Chủ đề 6: Bầu Trời',
    title: 'Ngày Đêm, Thời Tiết & 4 Mùa Việt – Nhật',
    cards: [
      { id: 'sc_card_21', icon: '☀️', title: 'Mặt Trời & Ban Ngày', ja: 'おひさま・ひる', desc: 'Mặt Trời mọc ở hướng Đông buổi sáng, tỏa ánh nắng ấm áp cho cây cối lớn lên.' },
      { id: 'sc_card_22', icon: '🌙', title: 'Mặt Trăng & Vì Sao', ja: 'おつきさま・ほし', desc: 'Ban đêm Mặt Trăng tròn hoặc khuyết tỏa sáng dịu dàng cùng hàng ngàn ngôi sao.' },
      { id: 'sc_card_23', icon: '🌸', title: '4 Mùa Xuân Hạ Thu Đông', ja: 'はる・なつ・あき・ふゆ', desc: 'Xuân hoa đào nở, Hạ nắng biển xanh, Thu lá phong đỏ, Đông tuyết trắng và áo ấm.' },
      { id: 'sc_card_24', icon: '🌍', title: 'Tiết kiệm nước & Trồng cây', ja: 'みどりをふやそう', desc: 'Khóa vòi nước sau khi dùng, tắt đèn khi ra khỏi phòng giúp Trái Đất luôn xanh tươi!' }
    ]
  }
];

const SCIENCE_ASAGAO_STAGES = [
  { step: 1, key: 'sc_asagao_1', emoji: '🫘', title: '1. Gieo hạt Bìm Bìm (たね)', desc: 'Vùi hạt nhỏ vào đất tơi xốp và tưới một chút nước mát.' },
  { step: 2, key: 'sc_asagao_2', emoji: '🌱', title: '2. Nảy hai lá mầm (ふたば)', desc: 'Sau vài ngày tắm nắng, hai chiếc lá non hình trái tim vươn lên!' },
  { step: 3, key: 'sc_asagao_3', emoji: '🌿', title: '3. Ra lá thật & Leo giàn (つる)', desc: 'Thân cây vươn dài, quấn nhẹ lên giàn tre hướng về phía Mặt Trời.' },
  { step: 4, key: 'sc_asagao_4', emoji: '🌷', title: '4. Kết nụ hoa chúm chím (つぼみ)', desc: 'Những nụ hoa xoắn xinh màu tím chuẩn bị bung cánh vào sáng sớm!' },
  { step: 5, key: 'sc_asagao_5', emoji: '🌺', title: '5. Nở rộ hoa rực rỡ (あさがお咲いた!)', desc: 'Hoan hô! Hoa Bìm Bìm nở rộ đón bình minh rực rỡ trên ban công lớp 1!' }
];

const SCIENCE_SENSES_DATA = [
  { id: 'sight', key: 'sc_sense_1', emoji: '👁️', organ: 'Đôi Mắt', ja: 'め (Me)', job: 'Nhìn thấy màu sắc, chữ cái, khủng long và ánh sáng!' },
  { id: 'hear', key: 'sc_sense_2', emoji: '👂', organ: 'Đôi Tai', ja: 'みみ (Mimi)', job: 'Nghe tiếng ba mẹ gọi, tiếng nhạc hay và tiếng Shinkansen!' },
  { id: 'smell', key: 'sc_sense_3', emoji: '👃', organ: 'Chiếc Mũi', ja: 'はな (Hana)', job: 'Ngửi hương hoa thơm ngát và mùi cơm ngon mẹ nấu!' },
  { id: 'taste', key: 'sc_sense_4', emoji: '👅', organ: 'Chiếc Lưỡi', ja: 'した (Shita)', job: 'Nếm vị ngọt của táo, vị chua của cam và mặn của muối!' },
  { id: 'touch', key: 'sc_sense_5', emoji: '🖐️', organ: 'Bàn Tay & Da', ja: 'て・ひふ', job: 'Cảm nhận nước ấm hay lạnh, lông mèo mềm hay vỏ sầu riêng gai!' }
];

const SCIENCE_QUIZ_DATA = [
  { id: 'sc_q1', q: 'Bảo Long nhìn thấy màu sắc cầu vồng và hình khủng long bằng bộ phận nào?', ans: 'Đôi mắt', opts: [
    { key: 'sc_opt_eye', icon: '👁️', text: 'Đôi mắt' },
    { key: 'sc_opt_ear', icon: '👂', text: 'Đôi tai' },
    { key: 'sc_opt_nose', icon: '👃', text: 'Chiếc mũi' },
    { key: 'sc_opt_hand', icon: '🖐️', text: 'Bàn tay' }
  ]},
  { id: 'sc_q2', q: 'Cây hoa Bìm Bìm Nhật Bản (Asagao) cần gì hàng ngày để lớn nhanh và ra hoa?', ans: 'Nước và ánh nắng', opts: [
    { key: 'sc_opt_water_sun', icon: '💧', text: 'Nước và ánh nắng' },
    { key: 'sc_opt_candy', icon: '🍬', text: 'Kẹo ngọt' },
    { key: 'sc_opt_dark', icon: '🌑', text: 'Bóng tối hoàn toàn' },
    { key: 'sc_opt_ice', icon: '🧊', text: 'Đá lạnh buốt' }
  ]},
  { id: 'sc_q3', q: 'Khi thấy ổ cắm điện bị hở hoặc dây điện đứt, Bảo Long phải làm gì?', ans: 'Không chạm, báo ba mẹ', opts: [
    { key: 'sc_opt_no_touch', icon: '🚨', text: 'Không chạm, báo ba mẹ' },
    { key: 'sc_opt_poke', icon: '🔧', text: 'Lấy que sắt chọc vào' },
    { key: 'sc_opt_splash', icon: '💦', text: 'Tạt nước vào' },
    { key: 'sc_opt_hide', icon: '🙈', text: 'Giấu đi không nói ai' }
  ]},
  { id: 'sc_q4', q: 'Bộ phận nào giúp cây xanh hút nước và chất dinh dưỡng từ trong đất?', ans: 'Rễ cây', opts: [
    { key: 'sc_opt_root', icon: '🌱', text: 'Rễ cây' },
    { key: 'sc_opt_flower', icon: '🌸', text: 'Bông hoa' },
    { key: 'sc_opt_fruit', icon: '🍎', text: 'Quả táo' },
    { key: 'sc_opt_seed', icon: '🫘', text: 'Hạt giống' }
  ]},
  { id: 'sc_q5', q: 'Mùa nào ở Nhật Bản có hoa anh đào Sakura nở hồng rực rỡ khi khai giảng lớp 1?', ans: 'Mùa Xuân', opts: [
    { key: 'sc_opt_spring', icon: '🌸', text: 'Mùa Xuân' },
    { key: 'sc_opt_summer', icon: '🌻', text: 'Mùa Hạ' },
    { key: 'sc_opt_autumn', icon: '🍁', text: 'Mùa Thu' },
    { key: 'sc_opt_winter', icon: '⛄', text: 'Mùa Đông' }
  ]},
  { id: 'sc_q6', q: 'Khi bị ốm sốt, ai là người khám bệnh và kê thuốc giúp bé mau khỏe?', ans: 'Bác sĩ và Y tá', opts: [
    { key: 'sc_opt_doctor', icon: '👩‍⚕️', text: 'Bác sĩ và Y tá' },
    { key: 'sc_opt_pilot', icon: '✈️', text: 'Phi công' },
    { key: 'sc_opt_baker', icon: '🥐', text: 'Thợ làm bánh' },
    { key: 'sc_opt_singer', icon: '🎤', text: 'Ca sĩ' }
  ]},
  { id: 'sc_q7', q: 'Bé nên rửa tay bằng xà phòng vào lúc nào để phòng chống vi khuẩn?', ans: 'Trước bữa ăn', opts: [
    { key: 'sc_opt_before_eat', icon: '🧼', text: 'Trước bữa ăn' },
    { key: 'sc_opt_never_wash', icon: '🚫', text: 'Không cần rửa' },
    { key: 'sc_opt_only_sun', icon: '🗓️', text: 'Chỉ rửa Chủ Nhật' },
    { key: 'sc_opt_only_sand', icon: '🏜️', text: 'Xoa bằng cát' }
  ]},
  { id: 'sc_q8', q: 'Ban ngày bầu trời sáng rực là nhờ ánh sáng của thiên thể nào?', ans: 'Mặt Trời', opts: [
    { key: 'sc_opt_sun', icon: '☀️', text: 'Mặt Trời' },
    { key: 'sc_opt_moon', icon: '🌙', text: 'Mặt Trăng' },
    { key: 'sc_opt_cloud', icon: '☁️', text: 'Đám mây' },
    { key: 'sc_opt_flash', icon: '🔦', text: 'Đèn pin' }
  ]},
  { id: 'sc_q9', q: 'Khi muốn nếm xem quả dâu tây ngọt hay chua, bé dùng giác quan nào?', ans: 'Chiếc lưỡi', opts: [
    { key: 'sc_opt_tongue', icon: '👅', text: 'Chiếc lưỡi' },
    { key: 'sc_opt_ear', icon: '👂', text: 'Đôi tai' },
    { key: 'sc_opt_eye', icon: '👁️', text: 'Đôi mắt' },
    { key: 'sc_opt_hair', icon: '💇', text: 'Mái tóc' }
  ]},
  { id: 'sc_q10', q: 'Khi đi bộ qua đường có vạch kẻ trắng dành cho người đi bộ, bé cần làm gì?', ans: 'Dừng quan sát hai bên', opts: [
    { key: 'sc_opt_look', icon: '🚦', text: 'Dừng quan sát hai bên' },
    { key: 'sc_opt_run_blind', icon: '🏃', text: 'Nhắm mắt chạy bừa' },
    { key: 'sc_opt_play_ball', icon: '⚽', text: 'Đá bóng giữa đường' },
    { key: 'sc_opt_sit_road', icon: '🪑', text: 'Ngồi xuống đường' }
  ]},
  { id: 'sc_q11', q: 'Hành động nào giúp tiết kiệm nước sạch và bảo vệ Trái Đất?', ans: 'Khóa vòi sau khi rửa', opts: [
    { key: 'sc_opt_save_water', icon: '💧', text: 'Khóa vòi sau khi rửa' },
    { key: 'sc_opt_leave_tap', icon: '🌊', text: 'Mở nước chảy suốt đêm' },
    { key: 'sc_opt_throw_river', icon: '🗑️', text: 'Vứt rác xuống sông' },
    { key: 'sc_opt_break_tree', icon: '🪓', text: 'Bẻ cành cây xanh' }
  ]},
  { id: 'sc_q12', q: 'Khi trời mưa rào kèm sấm chớp, Bảo Long cần làm gì cho an toàn?', ans: 'Ở trong nhà trú mưa', opts: [
    { key: 'sc_opt_stay_in', icon: '🏠', text: 'Ở trong nhà trú mưa' },
    { key: 'sc_opt_under_tree', icon: '🌳', text: 'Đứng dưới cây to' },
    { key: 'sc_opt_fly_kite', icon: '🪁', text: 'Chạy ra thả diều' },
    { key: 'sc_opt_swim_pond', icon: '🏊', text: 'Bơi ngoài ao hồ' }
  ]}
];

let currentScienceTab = 'topics';
let currentScienceTopicId = SCIENCE_TOPICS_DATA[0].id;
const SCIENCE_ASAGAO_STORAGE_KEY = 'baolong_science_asagao_v1';
let scienceAsagaoState = (() => {
  try {
    const d = JSON.parse(localStorage.getItem(SCIENCE_ASAGAO_STORAGE_KEY) || '{}');
    return {
      stage: Math.max(1, Math.min(5, Number(d.stage) || 1)),
      watered: !!d.watered,
      sunned: !!d.sunned,
      bloomRewarded: !!d.bloomRewarded
    };
  } catch (e) {
    return { stage: 1, watered: false, sunned: false, bloomRewarded: false };
  }
})();
function saveAsagaoState() {
  try { localStorage.setItem(SCIENCE_ASAGAO_STORAGE_KEY, JSON.stringify(scienceAsagaoState)); } catch (e) {}
}
let scienceAutoTimer = null;
let scienceAutoRunning = false;
let scienceSessionScore = 0;
let scienceEpoch = 0;
let scienceQuizList = [];
let scienceQuizIdx = 0;
let scienceQuizScore = 0;
let senseMatchTargetIdx = 0;

function stopScienceAutoPlay() {
  scienceAutoRunning = false;
  if (scienceAutoTimer) { clearTimeout(scienceAutoTimer); scienceAutoTimer = null; }
  const btn = document.getElementById('btnAutoPlayScienceTopic');
  if (btn) {
    btn.classList.remove('playing');
    btn.innerHTML = '<span>🎧</span> Nghe cả chủ đề';
  }
  document.querySelectorAll('#scienceCardsGrid .active-pulse').forEach(el => el.classList.remove('active-pulse'));
}
window.stopScienceAutoPlay = stopScienceAutoPlay;

function addScienceScore(pts) {
  scienceSessionScore += pts;
  const el = document.getElementById('scienceSessionStars');
  if (el) el.innerText = `⭐ Điểm Khám Phá Khoa Học: ${scienceSessionScore}`;
}

function renderScienceLifeHub() {
  const el = document.getElementById('scienceSessionStars');
  if (el) el.innerText = `⭐ Điểm Khám Phá Khoa Học: ${scienceSessionScore}`;
  switchScienceSubTab(currentScienceTab);
}

function switchScienceSubTab(subtab) {
  stopScienceAutoPlay();
  window.soundMgr?.stopAll?.();
  scienceEpoch++;
  currentScienceTab = subtab;
  const map = {
    topics: ['sciencePaneTopics', 'scienceTabTopics'],
    lab: ['sciencePaneLab', 'scienceTabLab'],
    quiz: ['sciencePaneQuiz', 'scienceTabQuiz']
  };
  Object.entries(map).forEach(([k, [pId, bId]]) => {
    const p = document.getElementById(pId);
    const b = document.getElementById(bId);
    if (p) p.style.display = k === subtab ? 'block' : 'none';
    if (b) b.classList.toggle('active', k === subtab);
  });
  if (subtab === 'topics') renderScienceTopicsTab();
  else if (subtab === 'lab') renderScienceLabTab();
  else if (subtab === 'quiz') initScienceQuizGame();
}

function renderScienceTopicsTab() {
  const track = document.getElementById('scienceTopicsTrack');
  const grid = document.getElementById('scienceCardsGrid');
  const titleEl = document.getElementById('scienceTopicTitle');
  if (!track || !grid) return;

  const topic = SCIENCE_TOPICS_DATA.find(t => t.id === currentScienceTopicId) || SCIENCE_TOPICS_DATA[0];
  track.innerHTML = '';
  SCIENCE_TOPICS_DATA.forEach(t => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `lesson-pill ${t.id === topic.id ? 'active' : ''}`;
    pill.innerText = t.badge;
    pill.onclick = () => {
      stopScienceAutoPlay();
      window.soundMgr?.stopAll?.();
      scienceEpoch++;
      window.soundMgr.playClick();
      currentScienceTopicId = t.id;
      renderScienceTopicsTab();
    };
    track.appendChild(pill);
  });

  if (titleEl) titleEl.innerText = topic.title;
  let coverEl = document.getElementById('scienceTopicCoverBox');
  if (!coverEl) {
    coverEl = document.createElement('div');
    coverEl.id = 'scienceTopicCoverBox';
    coverEl.className = 'subject-topic-cover';
    grid.parentElement.insertBefore(coverEl, grid);
  }
  coverEl.innerHTML = topic.image
    ? `<img src="${topic.image}" alt="${topic.title}" loading="lazy"><div class="subject-topic-caption">${topic.badge} — ${topic.title}</div>`
    : '';

  grid.innerHTML = '';
  topic.cards.forEach(c => {
    const learned = typeof explorerState !== 'undefined' && explorerState.learnedIds?.includes(c.id);
    const card = document.createElement('div');
    card.className = `vocab-card ${learned ? 'is-learned' : ''}`;
    card.style.borderColor = '#86efac';
    card.innerHTML = `
      <div class="card-badge">${topic.badge.split(':')[0]} ${learned ? '⭐' : ''}</div>
      <div class="card-icon">${c.icon}</div>
      <div class="card-word" style="font-size: 19px;">${c.title}</div>
      <div class="card-phonetic" style="color: #059669;">🇯🇵 ${c.ja}</div>
      <div style="font-size: 12.5px; color: #475569; font-weight: 700; line-height: 1.45; margin-top: 6px;">${c.desc}</div>
    `;
    card.onclick = () => {
      stopScienceAutoPlay();
      window.soundMgr.playPop();
      window.soundMgr.playAudioFile(c.id, null, `${c.title}. ${c.desc}`);
      addScienceScore(2);
      if (typeof markWordLearned === 'function' && markWordLearned(c.id)) {
        card.classList.add('is-learned');
        const badge = card.querySelector('.card-badge');
        if (badge && !badge.innerText.includes('⭐')) badge.innerText += ' ⭐';
      }
      if (typeof showToast === 'function') showToast(`🌿 ${c.title}!`);
    };
    grid.appendChild(card);
  });

  const btnAuto = document.getElementById('btnAutoPlayScienceTopic');
  if (btnAuto) {
    btnAuto.onclick = () => {
      if (scienceAutoRunning || btnAuto.classList.contains('playing')) {
        stopScienceAutoPlay();
        window.soundMgr?.stopAll?.();
        return;
      }
      stopScienceAutoPlay();
      window.soundMgr.playClick();
      scienceAutoRunning = true;
      btnAuto.classList.add('playing');
      btnAuto.innerHTML = '<span>⏹️</span> Dừng đọc';
      const myEpoch = scienceEpoch;
      const myNav = window.appNavEpoch || 0;
      let idx = 0;
      const next = () => {
        if (!scienceAutoRunning || myEpoch !== scienceEpoch || (window.appNavEpoch || 0) !== myNav) return;
        if (idx >= topic.cards.length) {
          stopScienceAutoPlay();
          if (typeof showToast === 'function') showToast(`🎉 Đã nghe hết chủ đề "${topic.title}"!`);
          return;
        }
        const c = topic.cards[idx];
        const cardEl = grid.children[idx];
        if (cardEl) { cardEl.classList.add('active-pulse'); cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        window.soundMgr.playAudioFile(c.id, () => {
          if (cardEl) cardEl.classList.remove('active-pulse');
          if (!scienceAutoRunning || myEpoch !== scienceEpoch || (window.appNavEpoch || 0) !== myNav) return;
          idx++;
          scienceAutoTimer = setTimeout(next, 400);
        }, `${c.title}. ${c.desc}`);
      };
      next();
    };
  }
}

const SENSE_MATCH_ITEMS = [
  { organId: 'sight', prompt: '🌈 Ngắm cầu vồng bảy sắc và đọc sách tranh', label: 'Đôi Mắt' },
  { organId: 'hear', prompt: '🚅 Nghe tiếng tàu Shinkansen & giọng ba mẹ', label: 'Đôi Tai' },
  { organId: 'smell', prompt: '🌸 Ngửi hương hoa sen thơm ngát ban mai', label: 'Chiếc Mũi' },
  { organId: 'taste', prompt: '🍓 Nếm vị dâu tây ngọt lịm & cam chua dịu', label: 'Chiếc Lưỡi' },
  { organId: 'touch', prompt: '🧊 Chạm viên đá lạnh hay bộ lông mèo êm ái', label: 'Bàn Tay & Da' }
];

function renderScienceLabTab() {
  const stageBox = document.getElementById('scienceAsagaoStageCard');
  const stepBtns = document.getElementById('scienceAsagaoSteps');
  const sensesGrid = document.getElementById('scienceSensesGrid');

  if (stageBox && stepBtns) {
    const curStep = scienceAsagaoState.stage || 1;
    const st = SCIENCE_ASAGAO_STAGES.find(s => s.step === curStep) || SCIENCE_ASAGAO_STAGES[0];
    const canGrow = curStep < 5 && scienceAsagaoState.watered && scienceAsagaoState.sunned;
    stageBox.innerHTML = `
      <div class="asagao-illus-wrap"><img src="images/science/asagao_${st.step}.svg" alt="${st.title}" loading="lazy"></div>
      <div class="asagao-stage-title">${st.title}</div>
      <div class="asagao-stage-desc">${st.desc}</div>
      <div class="asagao-care-bar">
        <button type="button" class="tool-chip ${scienceAsagaoState.watered ? 'active-filter' : ''}" id="btnAsagaoWater">
          ${scienceAsagaoState.watered ? '💧 Đã tưới nước ✓' : '💧 Tưới nước'}
        </button>
        <button type="button" class="tool-chip ${scienceAsagaoState.sunned ? 'active-filter' : ''}" id="btnAsagaoSun">
          ${scienceAsagaoState.sunned ? '☀️ Đã tắm nắng ✓' : '☀️ Đón nắng ấm'}
        </button>
        ${curStep < 5 ? `<button type="button" class="challenge-btn" id="btnAsagaoGrow" style="padding:7px 14px; font-size:13px;" ${canGrow ? '' : 'disabled'}>🌱 Lớn lên bước ${curStep + 1}!</button>` : '<span class="story-status-badge done">🌺 Hoa đã nở rộ!</span>'}
        ${curStep > 1 ? '<button type="button" class="tool-chip" id="btnAsagaoReset">🔄 Gieo lại</button>' : ''}
      </div>
      <button type="button" class="btn-hear-hint" id="btnHearAsagaoStage" style="margin: 10px auto 0 auto;"><span>🔊</span> Nghe giải thích bước này</button>
    `;
    document.getElementById('btnHearAsagaoStage')?.addEventListener('click', () => {
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(st.key, null, `${st.title}. ${st.desc}`);
    });
    document.getElementById('btnAsagaoWater')?.addEventListener('click', () => {
      scienceAsagaoState.watered = true;
      saveAsagaoState();
      window.soundMgr.playPop();
      renderScienceLabTab();
    });
    document.getElementById('btnAsagaoSun')?.addEventListener('click', () => {
      scienceAsagaoState.sunned = true;
      saveAsagaoState();
      window.soundMgr.playPop();
      renderScienceLabTab();
    });
    document.getElementById('btnAsagaoGrow')?.addEventListener('click', () => {
      if (!(scienceAsagaoState.watered && scienceAsagaoState.sunned)) return;
      scienceAsagaoState.stage = Math.min(5, curStep + 1);
      scienceAsagaoState.watered = false;
      scienceAsagaoState.sunned = false;
      if (scienceAsagaoState.stage === 5) {
        if (typeof fireConfetti === 'function') fireConfetti();
        if (!scienceAsagaoState.bloomRewarded && typeof awardStars === 'function') {
          scienceAsagaoState.bloomRewarded = true;
          awardStars(5, 'Chăm sóc hoa Asagao nở rộ tuyệt đẹp!');
        }
      }
      saveAsagaoState();
      window.soundMgr.playCorrect();
      renderScienceLabTab();
      const ns = SCIENCE_ASAGAO_STAGES[scienceAsagaoState.stage - 1];
      if (ns) window.soundMgr.playAudioFile(ns.key, null, `${ns.title}. ${ns.desc}`);
      addScienceScore(3);
    });
    document.getElementById('btnAsagaoReset')?.addEventListener('click', () => {
      scienceAsagaoState.stage = 1;
      scienceAsagaoState.watered = false;
      scienceAsagaoState.sunned = false;
      saveAsagaoState();
      window.soundMgr.playClick();
      renderScienceLabTab();
    });

    stepBtns.innerHTML = '';
    SCIENCE_ASAGAO_STAGES.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `tool-chip ${s.step === curStep ? 'active-filter' : ''}`;
      b.innerText = `${s.emoji} Bước ${s.step}`;
      b.onclick = () => {
        scienceAsagaoState.stage = s.step;
        saveAsagaoState();
        window.soundMgr.playPop();
        if (s.step === 5 && typeof fireConfetti === 'function') fireConfetti();
        renderScienceLabTab();
        window.soundMgr.playAudioFile(s.key, null, `${s.title}. ${s.desc}`);
        addScienceScore(2);
      };
      stepBtns.appendChild(b);
    });
  }

  if (sensesGrid) {
    const task = SENSE_MATCH_ITEMS[senseMatchTargetIdx % SENSE_MATCH_ITEMS.length];
    sensesGrid.innerHTML = '';
    let challengeBox = document.getElementById('scienceSensesChallenge');
    if (!challengeBox) {
      challengeBox = document.createElement('div');
      challengeBox.id = 'scienceSensesChallenge';
      challengeBox.className = 'sense-challenge-bar';
      sensesGrid.parentElement.insertBefore(challengeBox, sensesGrid);
    }
    challengeBox.innerHTML = `
      <span>🧩 <strong>Thử thách Giác Quan:</strong> "${task.prompt}" — Chạm đúng giác quan bên dưới nhé!</span>
    `;

    SCIENCE_SENSES_DATA.forEach(sn => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.style.borderColor = '#7dd3fc';
      card.innerHTML = `
        <div class="card-icon" style="font-size: 46px;">${sn.emoji}</div>
        <div class="card-word" style="font-size: 18px; color: #0369a1;">${sn.organ}</div>
        <div class="card-phonetic" style="color: #e11d48;">🇯🇵 ${sn.ja}</div>
        <div style="font-size: 12.5px; color: #334155; font-weight: 700; margin-top: 6px;">${sn.job}</div>
      `;
      card.onclick = () => {
        window.soundMgr.playAudioFile(sn.key, null, `${sn.organ}. ${sn.job}`);
        if (sn.id === task.organId) {
          card.classList.add('is-learned');
          window.soundMgr.playCorrect();
          addScienceScore(4);
          if (typeof showToast === 'function') showToast(`🌟 Chuẩn xác! ${sn.organ} giúp bé thực hiện điều đó!`);
          senseMatchTargetIdx = (senseMatchTargetIdx + 1) % SENSE_MATCH_ITEMS.length;
          const nt = SENSE_MATCH_ITEMS[senseMatchTargetIdx];
          challengeBox.innerHTML = `<span>🧩 <strong>Thử thách Giác Quan:</strong> "${nt.prompt}" — Chạm đúng giác quan bên dưới nhé!</span>`;
        } else {
          window.soundMgr.playPop();
          addScienceScore(2);
        }
      };
      sensesGrid.appendChild(card);
    });
  }
}

function initScienceQuizGame() {
  scienceQuizList = [...SCIENCE_QUIZ_DATA].sort(() => Math.random() - 0.5).slice(0, 8);
  scienceQuizIdx = 0;
  scienceQuizScore = 0;
  document.getElementById('scienceQuizPlayStage').style.display = 'block';
  document.getElementById('scienceQuizVictoryStage').style.display = 'none';
  loadScienceQuizQuestion();
}

function loadScienceQuizQuestion() {
  if (scienceQuizIdx >= scienceQuizList.length) {
    fireConfetti();
    window.soundMgr.playVictory();
    window.soundMgr.playAudioFile('cheer_vn_win', null, 'Hoan hô Bảo Long siêu giỏi!');
    window.markDailyStep?.('play');
    if (typeof awardStars === 'function') awardStars(15, 'Nhà Thám Hiểm Khoa Học & Đời Sống!');
    document.getElementById('scienceQuizPlayStage').style.display = 'none';
    document.getElementById('scienceQuizVictoryStage').style.display = 'block';
    document.getElementById('scienceQuizVictoryScore').innerText =
      `Bảo Long hoàn thành 8 câu Tự nhiên & Đời sống đạt ${scienceQuizScore} điểm (+15 ⭐)!`;
    return;
  }

  const q = scienceQuizList[scienceQuizIdx];
  const myNav = window.appNavEpoch || 0;
  const myEp = scienceEpoch;
  document.getElementById('scienceQuizProgress').innerText = `Câu ${scienceQuizIdx + 1} / ${scienceQuizList.length}`;
  document.getElementById('scienceQuizScore').innerText = `⭐ ${scienceQuizScore} điểm`;
  document.getElementById('scienceQuizPrompt').innerText = q.q;

  const optsGrid = document.getElementById('scienceQuizOptionsGrid');
  optsGrid.innerHTML = '';
  let locked = false;
  const qBoxEl = document.querySelector('#scienceQuizPlayStage .quiz-question-box');
  const tour = [{ key: q.id, fallbackText: q.q, el: qBoxEl, pauseAfterMs: 180 }];

  const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
  shuffled.forEach(opt => {
    const card = document.createElement('div');
    card.className = 'quiz-option-card';
    card.innerHTML = `
      <button type="button" class="quiz-opt-speak-btn" aria-label="Nghe lựa chọn">🔊</button>
      <div style="font-size: 40px; margin-bottom: 6px;">${opt.icon}</div>
      <div class="quiz-opt-name">${opt.text}</div>
    `;
    const spk = card.querySelector('.quiz-opt-speak-btn');
    if (spk) spk.onclick = (e) => {
      e.stopPropagation();
      window.soundMgr.playClick();
      window.soundMgr.playAudioFile(opt.key, null, opt.text);
    };
    tour.push({ key: opt.key, fallbackText: opt.text, el: card, pauseAfterMs: 110 });
    card.onclick = () => {
      if (locked || card.classList.contains('correct') || card.classList.contains('wrong')) return;
      window.soundMgr.stopAll();
      if (opt.text === q.ans) {
        locked = true;
        card.classList.add('correct');
        scienceQuizScore += 10;
        addScienceScore(10);
        window.recordAnswer?.(q.id, true, { label: q.ans, mode: 'science', audioKey: q.id });
        document.getElementById('scienceQuizScore').innerText = `⭐ ${scienceQuizScore} điểm`;
        window.soundMgr.playCorrect();
        fireConfetti();
        if (typeof showToast === 'function') showToast(`🌿 Chuẩn luôn Bảo Long ơi! ${q.ans}!`);
        window.soundMgr.playPraiseThen(false,
          () => (window.appNavEpoch || 0) === myNav && scienceEpoch === myEp,
          () => {
            scienceQuizIdx++;
            loadScienceQuizQuestion();
          }
        );
      } else {
        card.classList.add('wrong');
        window.recordAnswer?.(q.id, false, { label: q.ans, mode: 'science', audioKey: q.id });
        window.soundMgr.playWrong();
        window.soundMgr.speakTryAgain();
      }
    };
    optsGrid.appendChild(card);
  });

  const btnHear = document.getElementById('btnHearScienceQuiz');
  if (btnHear) {
    btnHear.onclick = () => {
      window.soundMgr.playClick();
      window.soundMgr.playChoiceTour(tour);
    };
  }
  setTimeout(() => {
    if ((window.appNavEpoch || 0) === myNav && scienceEpoch === myEp) window.soundMgr.playChoiceTour(tour);
  }, 60);
}
