# 💡 Đề Xuất Cải Thiện Hệ Thống "Bảo Long Thám Hiểm Tiếng Việt"

> **Đi kèm:** `KET_QUA_DANH_GIA_DU_AN.md` (phần đánh giá, lỗi và rủi ro)
> **Ngày:** 26/11/2026
> **Phạm vi:** các **quan điểm và đề xuất** để hệ thống tốt hơn, ngoài việc sửa lỗi.

**Cách đọc tài liệu này:** đây là **ý kiến cá nhân** của người đánh giá, dựa trên mã nguồn (commit `2d07f96`) và hồ sơ dự án. Những điểm có **bằng chứng trong code** được đánh dấu 🔎. Những điểm còn lại là **đề xuất theo kinh nghiệm thiết kế học tập cho trẻ nhỏ**, bạn hoàn toàn có thể không đồng ý. Tôi chưa quan sát bé dùng thật, nên mọi đề xuất cần được thử với bé trước khi tin.

---

## 0. Ba nguyên tắc định hướng

1. **Chiều sâu quan trọng hơn chiều rộng.** Hệ thống đã phủ rất rộng (14 tab). Giá trị khó thay thế nhất nằm ở **tiếng Việt**, vì đó là ngôn ngữ thiểu số trong gia đình. Toán, Nhật, Anh bé vẫn được học ở trường.
2. **Mục tiêu cuối cùng là bé tự đọc, không phải bé chọn đúng đáp án.** Thiết kế hiện tại rất mạnh ở "nghe rồi chọn". Bước tiếp theo là "nhìn chữ rồi tự đọc".
3. **Đo sự nắm vững, không đo số lần chơi.** Sao và danh hiệu nên phản ánh việc bé nhớ được, không phải việc bé mở nhiều màn.

---

## 1. Tập trung vào tiếng Việt, giữ các môn còn lại ở mức "đủ dùng"

**Quan điểm:** đừng thêm môn hay tab mới. Mỗi tab mới là một khối nội dung phải bảo trì (dữ liệu, audio, quiz) và làm loãng sự chú ý của bé.

**Gợi ý cụ thể**
- Dồn công sức vào chuỗi: chữ cái → vần → từ → **câu → đoạn ngắn**.
- Với Toán, Khoa học, Đạo đức, Nghệ thuật: giữ nguyên, chỉ sửa lỗi, không mở rộng.
- Nếu cần cắt giảm: đưa Đua xe và các khu giải trí vào một nhóm "Chơi" duy nhất, tách khỏi nhóm "Học" ngay trong thanh điều hướng, để phụ huynh và bé phân biệt được.

---

## 2. Cầu nối từ "nghe và chọn" sang "tự đọc"

**Hiện trạng:** có 12 bài đánh vần (98 từ) và 6 bài đọc hiểu HK2 (mỗi bài 4 dòng thơ). Khoảng cách giữa hai phần khá lớn: từ ghép đơn lẻ nhảy sang bài thơ.

**Đề xuất: thêm "Câu giải mã được"** (decodable sentences)
- Mỗi bài vần có 5–8 câu rất ngắn, **chỉ dùng những vần bé đã học đến lúc đó** (ví dụ sau bài `-ai, -ay`: "Bà có hai cái bay.").
- Tăng độ khó dần: 3 từ → 4–5 từ → 2 câu nối.
- **Đọc theo từng từ (kiểu karaoke):** khi phát audio, từng từ sáng lên. Chạm vào từ bất kỳ để nghe lại và xem tách vần (đã có sẵn `speakPart`, `breakdown`).
- **Chế độ "Con tự đọc":** ẩn nút nghe, bé đọc thành tiếng, rồi chạm "Nghe đáp án" để đối chiếu. Phụ huynh bấm "đọc đúng / chưa đúng" (xem mục 9).

**Vì sao:** đây là bước chuyển từ nhận biết sang giải mã. Nó cũng dùng lại gần như toàn bộ hạ tầng hiện có (audio theo từ, tách vần, quiz), nên chi phí thấp so với giá trị.

---

## 3. "Đã học" chưa có nghĩa là "đã nắm" 🔎

**Bằng chứng trong code**
- `markWordLearned()` (`app.js:138–148`) đánh dấu từ là đã học và **cộng 2 sao ngay lần đầu từ đó được mở/gặp**, từ các chỗ gọi ở `app.js:652`, `1015`, `1046`, `1168`.
- Khi bé chọn sai trong quiz hoặc mini-game, code chỉ thêm class CSS `wrong` (ví dụ `app.js:948`, `1049`, `1829`) và **không lưu lại từ nào bị sai**.
- `localStorage` hiện chỉ lưu `stars`, `learnedIds`, `equippedStickerId`, `completedGames` (`loadProgress`, `app.js:100–113`).

**Hệ quả:** hệ thống không biết bé hay nhầm từ nào, nên không thể ôn đúng chỗ. "Đã học" thực chất là "đã gặp".

**Đề xuất: ôn tập ngắt quãng đơn giản (kiểu hộp Leitner)**
- Mỗi từ có một "mức nhớ" 0–4 lưu trong `localStorage`.
  - Đúng → lên mức, hẹn ngày ôn lại xa hơn (1 → 2 → 4 → 8 → 16 ngày).
  - Sai → về mức 0 hoặc 1, ôn lại sớm.
- Mọi quiz/mini-game ghi kết quả đúng/sai theo `wordId` (một hàm duy nhất `recordAnswer(wordId, isCorrect)`).
- Một mục **"Từ cần ôn hôm nay"** (3–6 từ) xuất hiện đầu trang.
- **Giảm trợ giúp dần:** từ mới có hình + giọng + tách vần; từ đã nhớ khá thì ẩn hình hoặc ẩn tách vần, để bé tự nhớ.
- Sao nên thưởng cho **việc nhớ được** (ví dụ từ lên mức 3), không chỉ cho lần mở đầu tiên.

**Gợi ý cấu trúc dữ liệu (chỉ để tham khảo, kèm hàm di trú từ `baolong_progress_v2`)**
```json
{
  "version": 3,
  "stars": 120,
  "words": {
    "w12": { "level": 2, "due": "2026-12-02", "seen": 5, "wrong": 1, "lastSeen": "2026-11-26" }
  },
  "dailyLog": { "2026-11-26": { "minutes": 14, "newWords": 3, "reviewed": 6 } }
}
```

---

## 4. Một "Lộ trình hôm nay" thay cho 14 tab

**Quan điểm:** với trẻ 6 tuổi, 14 lựa chọn thường dẫn đến việc chỉ chơi phần mình thích nhất (nhiều khả năng là Đua xe). Việc cho bé "chọn mọi thứ" là điểm mạnh về tự do nhưng là điểm yếu về đều đặn.

**Đề xuất**
- Một nút lớn **"Bắt đầu hôm nay"** gợi ý khoảng **10–15 phút**: 1 hoạt động từ mới, 1 hoạt động ôn (từ mục 3), 1 trò chơi.
- Hoàn thành lộ trình thì **mở khoá phần thưởng** (sticker, một vòng Đua xe).
- Vẫn giữ nguyên 14 tab để bé và phụ huynh tự khám phá, nhưng lộ trình là "lối chính".
- Hiện lịch học 7 ngày dạng dấu tích. **Không** dùng chuỗi ngày liên tục có hình phạt khi đứt (xem mục 11).

---

## 5. Tận dụng lợi thế song ngữ Việt – Nhật

Đây là chỗ ứng dụng của bạn có thể khác hẳn các ứng dụng đại trà.

1. **Cặp tối thiểu thanh điệu** (ma – má – mà – mả – mã – mạ): người nói tiếng Nhật thường khó phân biệt 6 thanh. Trò chơi "nghe và chọn" trên cặp tối thiểu có giá trị luyện tai rất cụ thể. Hiện có `tone_*` (6 file) và `speakTone`; có thể mở rộng thành bộ 10–15 cặp.
2. **Âm khó với người nói tiếng Nhật:** phụ âm cuối `-p, -t, -c, -ch`; nguyên âm `ơ, ư, â, ă`; cặp `s/x`, `tr/ch`, `đ/d`. Hệ thống đã có trò "Nghe âm bắt chữ" với 16 âm dễ nhầm; nên **ưu tiên cho bé luyện đúng các cặp này** dựa trên dữ liệu sai của mục 3.
3. **Từ Hán–Việt ↔ Kanji** (山 sơn – núi, 学 học – học, 人 nhân – người): thêm âm Hán–Việt vào thẻ Kanji lớp 1 khi có. Đây là cầu nối ngôn ngữ độc đáo, nhưng **để sau cùng** vì cần rà soát chuyên môn cho từng chữ.
4. **Nhãn song ngữ nhất quán:** khi bé thấy từ tiếng Việt, nghĩa tiếng Nhật đã có. Nên đảm bảo chiều ngược lại cũng làm được (thấy chữ Nhật → chọn từ tiếng Việt).

---

## 6. Tập viết có phản hồi

**Hiện trạng:** canvas 4 ô ly và Masume cho phép vẽ tự do với nét mờ làm mẫu. Bé viết xong **không có phản hồi** là đúng hay chưa.

**Đề xuất theo cấp độ, từ rẻ đến đắt**
1. **Đo độ phủ đường mẫu (rẻ nhất, không cần AI):** so sánh nét bé vẽ với đường mẫu ẩn; hiển thị "con đã viết gần hết nét rồi" hoặc "con chưa chạm tới phần dưới". Không cần chấm điểm chính xác, chỉ cần khích lệ có căn cứ.
2. **Viết theo thứ tự nét (có hoạt hình mẫu):** cho Hiragana, Katakana và 80 Kanji. Dữ liệu thứ tự nét mở có sẵn (ví dụ KanjiVG, giấy phép **CC BY-SA**, cần ghi nguồn đúng). Với chữ Quốc ngữ, có thể tự dựng đường nét cho 29 chữ cái.
3. **Giảm hỗ trợ dần:** nét mờ đầy đủ → chỉ có chấm khởi đầu → ô trống.
4. **Tránh** nhận dạng chữ viết tay bằng AI ở giai đoạn này: nét của trẻ 6 tuổi rất khác nhau, dễ báo sai và làm bé nản.

**Lưu ý:** hồ sơ cũng chưa có thứ tự nét; đây là điểm bên thứ 3 đã đặt câu hỏi.

---

## 7. Khu "Dành cho phụ huynh"

**Hiện trạng:** không có Reset, Export/Import hay báo cáo; dữ liệu chỉ nằm trong trình duyệt của một thiết bị.

**Đề xuất (đặt sau một "cổng người lớn" để bé khó mở, ví dụ nhấn giữ 3 giây hoặc giải một phép tính)**
- **Reset / Export / Import** tiến độ dạng JSON. Đổi thiết bị hoặc xoá cache là mất toàn bộ sao và sticker của bé, đây là rủi ro lớn nhất đối với trải nghiệm của trẻ.
- **Báo cáo tuần:** số ngày học, tổng phút, số từ nhớ được, 5 từ hay sai nhất, 3 âm hay nhầm nhất.
- **Giới hạn thời gian** (ví dụ 20 phút/ngày) với nhắc nghỉ mắt nhẹ nhàng.
- **Chọn giọng mặc định, tốc độ, ẩn bớt tab** (ví dụ giấu Đua xe vào giờ học).
- **Hồ sơ nhiều bé** (nếu sau này có em hoặc bạn): khoá `localStorage` theo từng hồ sơ.

---

## 8. Thiết kế phần thưởng lành mạnh

**Quan điểm:** gamification hiện tại (sao → sticker → danh hiệu) là nhẹ nhàng và không thấy cơ chế gây nghiện. Nên giữ đúng tinh thần đó.

- Sao nên đến từ **tiến bộ thật** (nhớ được từ, đọc được câu, hoàn thành lộ trình), không chỉ từ số lần chơi hoặc lặp một mini-game dễ.
- Đặt **trần sao mỗi ngày** để việc "cày sao" ở Đua xe hay trò dễ không thể thay thế việc học.
- Phản hồi khi sai nên **nhẹ nhàng và có hướng dẫn** ("thử lại nhé", rồi đọc đáp án đúng chậm), tránh âm sai gây xấu hổ. Hệ thống đã có `speakTryAgain`, nên chỉ cần giữ nhất quán.
- Kiểm tra xem tổng sao có thể đạt các mốc (750 ⭐ cho danh hiệu cuối, 800 ⭐ cho sticker cuối) trong một khoảng thời gian hợp lý với nhịp học dự kiến của bé; nếu quá dễ hoặc quá khó, bé sẽ mất hứng.

---

## 9. Giọng thật của Ba/Mẹ và ghi âm của bé

1. **Giọng đọc thật của Ba/Mẹ cho một số từ then chốt** (bảng chữ cái, thanh điệu, câu chúc mừng): TTS rất ổn, nhưng giọng người thân vừa gần gũi vừa là giọng chuẩn mà bé thực sự sẽ nghe ngoài đời. Có thể tạo một chế độ ưu tiên tệp ghi âm riêng nếu tồn tại, rồi mới dùng TTS. Điều này cũng giải quyết một phần vấn đề 43 file trùng giọng.
2. **Cho bé ghi âm lúc tự đọc** (`MediaRecorder`, **lưu cục bộ**, không gửi đi đâu) để Ba/Mẹ nghe lại và bấm "đọc đúng / chưa đúng" ở chế độ phụ huynh. Không cần nhận dạng giọng nói tự động, vì nhận dạng tiếng Việt của trẻ nhỏ khó đáng tin.
   - Cần xin quyền micro và nói rõ trên giao diện rằng bản ghi chỉ nằm trên thiết bị.
   - Nên có nút xoá toàn bộ bản ghi.

---

## 10. Nền tảng kỹ thuật để các đề xuất trên làm được

| Việc | Vì sao hỗ trợ các đề xuất trên | Mức công sức |
| :--- | :--- | :---: |
| **Mở khoá audio trên iOS** (dùng lại một đối tượng audio/`AudioContext` được "đánh thức" ở lần chạm đầu) | Không có tiếng thì mọi tính năng "nghe trước" mất tác dụng | Thấp |
| **Hàm ghi kết quả thống nhất** `recordAnswer(wordId, isCorrect)` gọi từ mọi quiz/mini-game | Là điều kiện cho mục 3, 4, 7 | Trung bình |
| **Di trú dữ liệu** (`baolong_progress_v2` → `v3`) | Không để bé mất sao khi cập nhật | Thấp |
| **Sinh nhãn UI từ `array.length`** | Hết lỗi lệch nhãn mỗi lần mở rộng nội dung | Thấp |
| **Biến web thành PWA** (Service Worker + manifest) | Chạy offline thật trên iPad, thêm vào màn hình chính, cache audio có kiểm soát; self-host Google Fonts | Trung bình |
| **Tách dần `app.js`** (~2.600 dòng) theo trách nhiệm: tiến độ, bài học, canvas, mini-game; chuyển sang ES Modules | Dễ thêm mục 2, 3, 6 mà không đụng chỗ khác | Trung bình–cao |
| **ESLint + `node --check` + vài test** (dữ liệu quiz, tách từ, đọc số) | Giữ chất lượng khi nội dung tăng | Thấp–trung bình |
| **Ghi chú `LICENSE` + `CREDITS.md`** (nguồn 30 ảnh, cách tạo audio) | Rủi ro pháp lý duy nhất mang tính chặn nếu repo công khai | Thấp |

---

## 11. Những điều tôi **không** khuyên làm

- **Thêm môn hoặc tab mới** khi chưa có dữ liệu cho thấy bé đã dùng hết các tab hiện có.
- **Bảng xếp hạng, so sánh với bé khác, chuỗi ngày liên tục có phạt khi đứt** (streak): với trẻ nhỏ dễ tạo áp lực và ép chơi cho đủ chuỗi thay vì chơi để học.
- **Quảng cáo, mua trong ứng dụng, đăng nhập tài khoản, thu thập dữ liệu ra ngoài.** Việc ứng dụng hiện chạy hoàn toàn cục bộ là một ưu điểm lớn về riêng tư, nên giữ.
- **Nhận dạng chữ viết tay hoặc giọng nói bằng AI** ở giai đoạn này (độ chính xác với trẻ 6 tuổi thấp, báo sai gây nản).
- **Tự động phát tiếng liên tục không có nút tắt** hoặc nhiều âm thanh chồng nhau; luôn giữ nút Bật/Tắt tiếng và Tốc độ chậm dễ thấy như hiện nay.

---

## 12. Thứ tự ưu tiên đề xuất

| Giai đoạn | Việc | Giá trị cho bé | Công sức |
| :---: | :--- | :--- | :---: |
| **1** (vài ngày) | Mở khoá audio iOS; sinh nhãn từ dữ liệu; `LICENSE` + `CREDITS.md`; Export/Import tiến độ | Có tiếng; không mất dữ liệu; hết rủi ro pháp lý | Thấp |
| **2** (1–2 tuần) | `recordAnswer` + mức nhớ từ + "Từ cần ôn hôm nay" | Ôn đúng chỗ, tiến bộ thật | Trung bình |
| **3** (2–3 tuần) | "Lộ trình hôm nay" + khu phụ huynh (báo cáo tuần, giới hạn thời gian) | Học đều, phụ huynh thấy rõ | Trung bình |
| **4** (1 tháng) | "Câu giải mã được" + đọc karaoke + chế độ "Con tự đọc" | Bước chuyển sang tự đọc | Trung bình–cao |
| **5** | Phản hồi tập viết (độ phủ đường mẫu, thứ tự nét); cặp tối thiểu thanh điệu | Viết đúng; luyện tai đúng chỗ | Trung bình |
| **6** | PWA/offline; tách `app.js`; giọng Ba/Mẹ; âm Hán–Việt cho Kanji | Nền tảng và chiều sâu lâu dài | Cao |

---

## 13. Cách biết hệ thống có thực sự tốt hơn

Chọn **vài chỉ số đơn giản** và xem theo tuần, thay vì chỉ nhìn tổng sao:

- **Số từ ở mức nhớ ≥ 3** (nhớ ổn định).
- **Tỷ lệ đúng ngay lần đầu** của các từ đã học.
- **Số ngày học trong tuần** và số phút trung bình mỗi buổi.
- **Số câu bé tự đọc đúng** ở chế độ "Con tự đọc" (nếu làm mục 2).
- **Quan sát trực tiếp 3–5 buổi:** bé tự mở app hay phải nhắc? bé bỏ dở ở đâu? bé thích và chán phần nào? Phần này quan trọng hơn mọi chỉ số.

---

## 14. Câu hỏi để chốt hướng đi

1. Mục tiêu cuối năm lớp 1 của bé ở tiếng Việt là gì (đọc được đoạn ngắn tự lực, viết được câu chép, hay chỉ làm quen)? Câu trả lời quyết định có nên đầu tư mục 2 và 6 hay không.
2. Bé dùng khoảng bao nhiêu phút mỗi ngày, trên thiết bị nào? Điều này quyết định kích thước "Lộ trình hôm nay".
3. Bạn có thời gian ghi âm giọng Ba/Mẹ cho những từ then chốt không?
4. Ứng dụng chỉ dành cho Bảo Long, hay bạn muốn chia sẻ cho gia đình khác? Nếu chia sẻ, phần `LICENSE`, hồ sơ nhiều bé và Export/Import phải làm sớm hơn.

---

*Đây là các quan điểm để tham khảo và có thể thay đổi sau khi quan sát bé dùng thật.*
