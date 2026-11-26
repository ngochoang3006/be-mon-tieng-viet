import asyncio
import hashlib
import os
import pathlib
import random
import sys
import aiohttp
import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent
FEMALE_DIR = ROOT / "audio" / "female"
MALE_DIR = ROOT / "audio" / "male"

ITEMS = [
  {
    "key": "ja_story_1",
    "text": "おじいさんが かぶの たねを まきました。 「あまい あまい かぶに なれ。おおきな かぶに なれ。」 あまい げんきの よい、とてつもなく おおきな かぶが できました。 おじいさんは かぶを ぬこうと しました。「うんとこしょ、どっこいしょ。」それでも かぶは ぬけません。 おじいさんは おばあさんを よんで きました。ふたりで ひっぱっても、まだ ぬけません。 おばあさんは まごを よびました。まごが おばあさんを ひっぱって、みんなで ひっぱっても ぬけません。 まごは いぬを よび、いぬは ねこを よび、ねこは 小さな ねずみを よんで きました。 ねずみが ねこを、ねこが いぬを、いぬが まごを、まごが おばあさんを、おばあさんが おじいさんを ひっぱって、「うんとこしょ、どっこいしょ。」 とうとう、おおきな かぶは ぬけました！ みんなで よろこんで わらいあいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l1",
    "text": "おじいさんが かぶの たねを まきました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l2",
    "text": "「あまい あまい かぶに なれ。おおきな かぶに なれ。」",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l3",
    "text": "あまい げんきの よい、とてつもなく おおきな かぶが できました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l4",
    "text": "おじいさんは かぶを ぬこうと しました。「うんとこしょ、どっこいしょ。」それでも かぶは ぬけません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l5",
    "text": "おじいさんは おばあさんを よんで きました。ふたりで ひっぱっても、まだ ぬけません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l6",
    "text": "おばあさんは まごを よびました。まごが おばあさんを ひっぱって、みんなで ひっぱっても ぬけません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l7",
    "text": "まごは いぬを よび、いぬは ねこを よび、ねこは 小さな ねずみを よんで きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l8",
    "text": "ねずみが ねこを、ねこが いぬを、いぬが まごを、まごが おばあさんを、おばあさんが おじいさんを ひっぱって、「うんとこしょ、どっこいしょ。」",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_l9",
    "text": "とうとう、おおきな かぶは ぬけました！ みんなで よろこんで わらいあいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_v1",
    "text": "かぶ",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_v2",
    "text": "ひっぱる",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_v3",
    "text": "ねずみ",
    "lang": "ja"
  },
  {
    "key": "ja_story_1_q2",
    "text": "Mọi người đã hợp sức gọi thêm từng ai ra kéo củ cải theo đúng trình tự nào?",
    "lang": "vi"
  },
  {
    "key": "ja_st1_q2_o1",
    "text": "Ông → Bà → Cháu → Chó → Mèo → Chuột",
    "lang": "vi"
  },
  {
    "key": "ja_st1_q2_o2",
    "text": "Chuột tự nhổ một mình từ đầu",
    "lang": "vi"
  },
  {
    "key": "ja_st1_q2_o3",
    "text": "Hổ và Gấu từ rừng chạy ra kéo giúp",
    "lang": "vi"
  },
  {
    "key": "ja_st1_q2_o4",
    "text": "Dùng xe máy kéo nông trại kéo lên",
    "lang": "vi"
  },
  {
    "key": "ja_story_2",
    "text": "いちねん 二くみの 子どもたちが、校庭で たいそうを して いました。 ふと 空を みあげると、まっ白な おおきな くじらぐもが うかんで いました。 「おーい、こっちへ おいでよ。」子どもたちも くじらぐもも、おたがいに よびあいました。 先生と 子どもたちは てを つないで、「てんまで とどけ、一、二、三！」と ジャンプしました。 さんどめに、とうとう くもに のる ことが できました！ くじらぐもは ぐんぐん 空へ のぼります。 空の うえからは、みんなが 住む まちや 青い うみが 小さく 見えました。 そろそろ おひるに なります。学校から きれいな チャイムの 音が きこえて きました。 子どもたちは くじらぐもに 「さようなら」と 手を ふって、もといた 校庭へ おりて きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l1",
    "text": "いちねん 二くみの 子どもたちが、校庭で たいそうを して いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l2",
    "text": "ふと 空を みあげると、まっ白な おおきな くじらぐもが うかんで いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l3",
    "text": "「おーい、こっちへ おいでよ。」子どもたちも くじらぐもも、おたがいに よびあいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l4",
    "text": "先生と 子どもたちは てを つないで、「てんまで とどけ、一、二、三！」と ジャンプしました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l5",
    "text": "さんどめに、とうとう くもに のる ことが できました！ くじらぐもは ぐんぐん 空へ のぼります。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l6",
    "text": "空の うえからは、みんなが 住む まちや 青い うみが 小さく 見えました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l7",
    "text": "そろそろ おひるに なります。学校から きれいな チャイムの 音が きこえて きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_l8",
    "text": "子どもたちは くじらぐもに 「さようなら」と 手を ふって、もといた 校庭へ おりて きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_v1",
    "text": "くじら",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_v2",
    "text": "くも",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_v3",
    "text": "たいそう",
    "lang": "ja"
  },
  {
    "key": "ja_story_2_q2",
    "text": "Khi nghe tiếng chuông trường báo giờ trưa vang lên, các bạn nhỏ đã làm gì?",
    "lang": "vi"
  },
  {
    "key": "ja_st2_q2_o1",
    "text": "Vẫy tay chào tạm biệt đám mây và đáp xuống sân trường",
    "lang": "vi"
  },
  {
    "key": "ja_st2_q2_o2",
    "text": "Ngủ quên luôn trên đám mây cả buổi chiều",
    "lang": "vi"
  },
  {
    "key": "ja_st2_q2_o3",
    "text": "Chơi đá bóng ngay trên tầng mây cao",
    "lang": "vi"
  },
  {
    "key": "ja_st2_q2_o4",
    "text": "Ngồi ăn kem cầu vồng cùng bầy chim sẻ",
    "lang": "vi"
  },
  {
    "key": "ja_story_3",
    "text": "むかし、山おくの いっけんやに きこりの ふうふが すんで いました。 まいばん、いたずらな たぬきが やぶの かげから いえの 中を のぞいて いました。 おかみさんが まわす いとぐるまの 「キーカラカラ、キークルクル」という おとが、たぬきは 大すきでした。 ある日、たぬきは きこりの わなに かかって しまいました。きこりは おこって、たぬきを はりに つるしました。 おかみさんは たぬきが かわいそうに なって、なわを ほどいて やりました。たぬきは よろこんで 森へ 帰りました。 さむい 冬が やって きました。おかみさんは びょうきに なり、きこりも 山へ 行けません。 ある ばん、月の 光の 中で 「キーカラカラ、キークルクル」と いとぐるまが まわって いました。 たぬきが 糸の たばを 山ほど つむいで、お礼を して くれたのでした。ふうふは なみだを 流して よろこびました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l1",
    "text": "むかし、山おくの いっけんやに きこりの ふうふが すんで いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l2",
    "text": "まいばん、いたずらな たぬきが やぶの かげから いえの 中を のぞいて いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l3",
    "text": "おかみさんが まわす いとぐるまの 「キーカラカラ、キークルクル」という おとが、たぬきは 大すきでした。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l4",
    "text": "ある日、たぬきは きこりの わなに かかって しまいました。きこりは おこって、たぬきを はりに つるしました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l5",
    "text": "おかみさんは たぬきが かわいそうに なって、なわを ほどいて やりました。たぬきは よろこんで 森へ 帰りました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l6",
    "text": "さむい 冬が やって きました。おかみさんは びょうきに なり、きこりも 山へ 行けません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l7",
    "text": "ある ばん、月の 光の 中で 「キーカラカラ、キークルクル」と いとぐるまが まわって いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_l8",
    "text": "たぬきが 糸の たばを 山ほど つむいで、お礼を して くれたのでした。ふうふは なみだを 流して よろこびました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_v1",
    "text": "たぬき",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_v2",
    "text": "いとぐるま",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_v3",
    "text": "おれい",
    "lang": "ja"
  },
  {
    "key": "ja_story_3_q2",
    "text": "Khi chú lửng bị mắc bẫy treo lên xà nhà, ai đã thương tình cởi trói giúp chú?",
    "lang": "vi"
  },
  {
    "key": "ja_st3_q2_o1",
    "text": "Vợ của bác tiều phu",
    "lang": "vi"
  },
  {
    "key": "ja_st3_q2_o2",
    "text": "Con sói xám trong rừng",
    "lang": "vi"
  },
  {
    "key": "ja_st3_q2_o3",
    "text": "Chú đại bàng trên núi",
    "lang": "vi"
  },
  {
    "key": "ja_st3_q2_o4",
    "text": "Nhà vua đi ngang qua",
    "lang": "vi"
  },
  {
    "key": "ja_story_4",
    "text": "ぼくと 犬の エルフは、いつも いっしょに おおきく なりました。 ぼくが せが のびるのに つれて、エルフは だんだん 年を とって いきました。 ある ころから、エルフは 階段を のぼるのも つらく なりました。ぼくは エルフを だきかかえて 部屋へ はこびました。 おふとんの 横に ねむる エルフの おなかを やさしく なでながら、ぼくは まいばん ささやきました。 「エルフ、ぼくは ずうっと ずっと、おまえが 大すきだよ。」エルフは うれしそうに しっぽを ひとふり しました。 ある あさ、目を さますと、エルフは しずかに 眠るように 旅立って いました。家族みんなが 泣きました。 となりの 家の 子が 新しい 子犬を くれようと しましたが、ぼくは 「いまは いいよ」と ことわりました。 だって ぼくは、まいばん エルフに 「ずうっと 大すきだよ」と 伝えつづけて きたから、心は あったかかったのです。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l1",
    "text": "ぼくと 犬の エルフは、いつも いっしょに おおきく なりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l2",
    "text": "ぼくが せが のびるのに つれて、エルフは だんだん 年を とって いきました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l3",
    "text": "ある ころから、エルフは 階段を のぼるのも つらく なりました。ぼくは エルフを だきかかえて 部屋へ はこびました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l4",
    "text": "おふとんの 横に ねむる エルフの おなかを やさしく なでながら、ぼくは まいばん ささやきました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l5",
    "text": "「エルフ、ぼくは ずうっと ずっと、おまえが 大すきだよ。」エルフは うれしそうに しっぽを ひとふり しました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l6",
    "text": "ある あさ、目を さますと、エルフは しずかに 眠るように 旅立って いました。家族みんなが 泣きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l7",
    "text": "となりの 家の 子が 新しい 子犬を くれようと しましたが、ぼくは 「いまは いいよ」と ことわりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_l8",
    "text": "だって ぼくは、まいばん エルフに 「ずうっと 大すきだよ」と 伝えつづけて きたから、心は あったかかったのです。",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_v1",
    "text": "大すき",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_v2",
    "text": "しっぽ",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_v3",
    "text": "かぞく",
    "lang": "ja"
  },
  {
    "key": "ja_story_4_q2",
    "text": "Khi chú chó Elf già yếu không leo nổi cầu thang, cậu bé đã làm gì?",
    "lang": "vi"
  },
  {
    "key": "ja_st4_q2_o1",
    "text": "Ôm bế Elf lên phòng ngủ và vuốt ve mỗi tối",
    "lang": "vi"
  },
  {
    "key": "ja_st4_q2_o2",
    "text": "Để Elf ngủ một mình ngoài sân vườn",
    "lang": "vi"
  },
  {
    "key": "ja_st4_q2_o3",
    "text": "Bỏ đi chơi không quan tâm tới Elf nữa",
    "lang": "vi"
  },
  {
    "key": "ja_st4_q2_o4",
    "text": "Đem Elf đi đổi một chú mèo mới",
    "lang": "vi"
  },
  {
    "key": "ja_story_5",
    "text": "がまくんは げんかんの 前で、かなしそうに すわって いました。 どうしたのかと かえるくんが きくと、「ぼくは いちども おてがみを もらったことが ないんだ」と 言いました。 かえるくんは いそいで 家へ 帰り、がまくんあてに おてがみを 書きました。 そして、かたつむりくんに 「この 手紙を がまくんに とどけてね」と たのみました。 かえるくんは がまくんの家へ もどり、「きっと きょう 手紙が くるよ」と いっしょに まちました。 ふたりは よっかも まちましたが、なかなか きません。そこで かえるくんは 内容を そっと 教えて あげました。 「しん愛なる がまがえるくん。ぼくは きみが ぼくの しんゆうで あることを うれしく おもっています。」 よっかめの 夜、ようやく かたつむりくんが とどけた 手紙を よんで、ふたりは とても しあわせに なりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l1",
    "text": "がまくんは げんかんの 前で、かなしそうに すわって いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l2",
    "text": "どうしたのかと かえるくんが きくと、「ぼくは いちども おてがみを もらったことが ないんだ」と 言いました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l3",
    "text": "かえるくんは いそいで 家へ 帰り、がまくんあてに おてがみを 書きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l4",
    "text": "そして、かたつむりくんに 「この 手紙を がまくんに とどけてね」と たのみました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l5",
    "text": "かえるくんは がまくんの家へ もどり、「きっと きょう 手紙が くるよ」と いっしょに まちました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l6",
    "text": "ふたりは よっかも まちましたが、なかなか きません。そこで かえるくんは 内容を そっと 教えて あげました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l7",
    "text": "「しん愛なる がまがえるくん。ぼくは きみが ぼくの しんゆうで あることを うれしく おもっています。」",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_l8",
    "text": "よっかめの 夜、ようやく かたつむりくんが とどけた 手紙を よんで、ふたりは とても しあわせに なりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_v1",
    "text": "てがみ",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_v2",
    "text": "かたつむり",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_v3",
    "text": "しんゆう",
    "lang": "ja"
  },
  {
    "key": "ja_story_5_q1",
    "text": "Vì sao bạn Ếch lại viết thư rồi nhờ chú Ốc Sên mang đến cho Cóc?",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q1_o1",
    "text": "Vì Cóc buồn khi chưa từng nhận được thư bao giờ",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q1_o2",
    "text": "Để mời Cóc đi ăn bánh pizza phô mai",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q1_o3",
    "text": "Để mượn Cóc quyển vở tập viết",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q1_o4",
    "text": "Để dặn Cóc mang theo ô che mưa",
    "lang": "vi"
  },
  {
    "key": "ja_story_5_q2",
    "text": "Trong bức thư, bạn Ếch đã viết điều gì gửi Cóc?",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q2_o1",
    "text": "Tớ rất vui vì cậu là bạn thân của tớ",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q2_o2",
    "text": "Nhớ dậy sớm chạy bộ tập thể dục nhé",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q2_o3",
    "text": "Ngày mai nhớ mang bút chì màu đi học",
    "lang": "vi"
  },
  {
    "key": "ja_st5_q2_o4",
    "text": "Chúc mừng sinh nhật chú mèo hàng xóm",
    "lang": "vi"
  },
  {
    "key": "ja_story_6",
    "text": "むかし、川で せんたくを していた おばあさんの ところに、大きな ももが どんぶらこと 流れて きました。 ももを わると、中から 元気な 男の子が 生まれ、ふうふは 「ももたろう」と 名づけました。 おおきく そだった ももたろうは、村人を こまらせる 鬼を たいじしに 出かける ことにしました。 おばあさんが つくった 日本一の きびだんごを 腰に つけて、ももたろうは 旅に 出ました。 とちゅうで 出会った いぬ、さる、きじは、きびだんごを もらって ももたろうの 仲間に なりました。 みんなは 小さな 船に のって、荒い 波を こえて おにがしまへと むかいました。 いぬは かみつき、さるは ひっかき、きじは 空から つっつき、力を 合わせて 鬼たちに 勝ちました。 うばわれた 宝物を とりもどした ももたろうと 仲間たちは、おじいさんと おばあさんの もとへ 帰りました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l1",
    "text": "むかし、川で せんたくを していた おばあさんの ところに、大きな ももが どんぶらこと 流れて きました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l2",
    "text": "ももを わると、中から 元気な 男の子が 生まれ、ふうふは 「ももたろう」と 名づけました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l3",
    "text": "おおきく そだった ももたろうは、村人を こまらせる 鬼を たいじしに 出かける ことにしました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l4",
    "text": "おばあさんが つくった 日本一の きびだんごを 腰に つけて、ももたろうは 旅に 出ました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l5",
    "text": "とちゅうで 出会った いぬ、さる、きじは、きびだんごを もらって ももたろうの 仲間に なりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l6",
    "text": "みんなは 小さな 船に のって、荒い 波を こえて おにがしまへと むかいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l7",
    "text": "いぬは かみつき、さるは ひっかき、きじは 空から つっつき、力を 合わせて 鬼たちに 勝ちました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_l8",
    "text": "うばわれた 宝物を とりもどした ももたろうと 仲間たちは、おじいさんと おばあさんの もとへ 帰りました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_v1",
    "text": "もも",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_v2",
    "text": "きびだんご",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_v3",
    "text": "なかま",
    "lang": "ja"
  },
  {
    "key": "ja_story_6_q1",
    "text": "Trên đường đi đến Đảo Quỷ, ba người bạn nào đã đi theo giúp đỡ Momotaro?",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q1_o1",
    "text": "Chó, Khỉ và Chim Trĩ",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q1_o2",
    "text": "Mèo, Chuột và Rùa",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q1_o3",
    "text": "Sư tử, Voi và Ngựa vằn",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q1_o4",
    "text": "Cá heo, Cua và Ốc sên",
    "lang": "vi"
  },
  {
    "key": "ja_story_6_q2",
    "text": "Món bánh nào bà lão đã chuẩn bị cho Momotaro mang theo trên đường?",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q2_o1",
    "text": "Bánh kê Kibi-dango",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q2_o2",
    "text": "Mì ramen nóng hổi",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q2_o3",
    "text": "Cơm cuộn cá hồi",
    "lang": "vi"
  },
  {
    "key": "ja_st6_q2_o4",
    "text": "Bánh kem dâu tây",
    "lang": "vi"
  },
  {
    "key": "ja_story_7",
    "text": "道路には、いろいろな しごとの 自動車が はしって います。どんな しごとを するのでしょう。 これは バスや 乗用車です。人を のせる ために、まどが おおきく つくられて います。 つぎは トラックです。おおきな にものを はこぶ ために、うしろに ひろい にだいが あります。 トラックの タイヤは、おもい 荷物を ささえる ために、ふとくて たくさん ついて います。 こちらは クレーン車です。おもい ものを つりあげる ために、ながく のびる うでが あります。 クレーン車は たおれないように、あしを しっかりと のばして じめんを おさえます。 ほかに しょうぼう車や パトカーなど、みんなの くらしを まもる 車も かつやくして います。 どの 自動車も、それぞれの しごとに 合わせた 大切な つくりに なっているのですね。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l1",
    "text": "道路には、いろいろな しごとの 自動車が はしって います。どんな しごとを するのでしょう。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l2",
    "text": "これは バスや 乗用車です。人を のせる ために、まどが おおきく つくられて います。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l3",
    "text": "つぎは トラックです。おおきな にものを はこぶ ために、うしろに ひろい にだいが あります。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l4",
    "text": "トラックの タイヤは、おもい 荷物を ささえる ために、ふとくて たくさん ついて います。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l5",
    "text": "こちらは クレーン車です。おもい ものを つりあげる ために、ながく のびる うでが あります。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l6",
    "text": "クレーン車は たおれないように、あしを しっかりと のばして じめんを おさえます。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l7",
    "text": "ほかに しょうぼう車や パトカーなど、みんなの くらしを まもる 車も かつやくして います。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_l8",
    "text": "どの 自動車も、それぞれの しごとに 合わせた 大切な つくりに なっているのですね。",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_v1",
    "text": "じどうしゃ",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_v2",
    "text": "トラック",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_v3",
    "text": "クレーンしゃ",
    "lang": "ja"
  },
  {
    "key": "ja_story_7_q1",
    "text": "Xe tải (トラック) có bộ phận đặc biệt nào để chở hàng hóa nặng?",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q1_o1",
    "text": "Thùng hàng rộng và bánh xe to khỏe",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q1_o2",
    "text": "Đôi cánh trắng để bay trên mây",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q1_o3",
    "text": "Cầu trượt nước ở phía sau",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q1_o4",
    "text": "Cánh buồm lớn để ra khơi",
    "lang": "vi"
  },
  {
    "key": "ja_story_7_q2",
    "text": "Xe cần cẩu (クレーンしゃ) dùng bộ phận nào để nhấc vật nặng lên cao an toàn?",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q2_o1",
    "text": "Cánh tay cần cẩu vươn dài và chân trụ vững",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q2_o2",
    "text": "Chiếc còi báo thức phát nhạc",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q2_o3",
    "text": "Chùm bóng bay khổng lồ",
    "lang": "vi"
  },
  {
    "key": "ja_st7_q2_o4",
    "text": "Chiếc thìa nhỏ xúc kem",
    "lang": "vi"
  },
  {
    "key": "ja_story_8",
    "text": "どうぶつの 赤ちゃんは、生まれた ばかりの ころ、どんな ようすを しているのでしょうか。 ライオンの 赤ちゃんは、とても 小さく 生まれます。まだ 目も 耳も よく 見えません。 お乳を のんで すくすく そだち、いっかげつくらいで ようやく 歩けるように なります。 しまうまの 赤ちゃんは、生まれた ばかりでも、とても 大きく 立派な しまもようが あります。 てきに おそわれても すぐ にげられるように、生まれて いちじかんも たたずに 立ちあがって 歩きます。 カンガルーの 赤ちゃんは、なんと 親指ほどしか ない ほど 小さく 生まれます。 赤ちゃんは じぶんで おかあさんの ふくろの 中へ はいり、その中で お乳を のんで 育ちます。 おなじ 赤ちゃんでも、生きる ばしょに 合わせて 生まれたときの すがたが ちがうのですね。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l1",
    "text": "どうぶつの 赤ちゃんは、生まれた ばかりの ころ、どんな ようすを しているのでしょうか。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l2",
    "text": "ライオンの 赤ちゃんは、とても 小さく 生まれます。まだ 目も 耳も よく 見えません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l3",
    "text": "お乳を のんで すくすく そだち、いっかげつくらいで ようやく 歩けるように なります。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l4",
    "text": "しまうまの 赤ちゃんは、生まれた ばかりでも、とても 大きく 立派な しまもようが あります。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l5",
    "text": "てきに おそわれても すぐ にげられるように、生まれて いちじかんも たたずに 立ちあがって 歩きます。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l6",
    "text": "カンガルーの 赤ちゃんは、なんと 親指ほどしか ない ほど 小さく 生まれます。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l7",
    "text": "赤ちゃんは じぶんで おかあさんの ふくろの 中へ はいり、その中で お乳を のんで 育ちます。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_l8",
    "text": "おなじ 赤ちゃんでも、生きる ばしょに 合わせて 生まれたときの すがたが ちがうのですね。",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_v1",
    "text": "あかちゃん",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_v2",
    "text": "しまうま",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_v3",
    "text": "ふくろ",
    "lang": "ja"
  },
  {
    "key": "ja_story_8_q1",
    "text": "Loài nào mới sinh ra đã đứng dậy đi được trong chưa đầy một giờ để tránh kẻ thù?",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q1_o1",
    "text": "Em bé Ngựa Vằn",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q1_o2",
    "text": "Em bé Sư Tử mới sinh",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q1_o3",
    "text": "Em bé Kangaroo nhỏ xíu",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q1_o4",
    "text": "Chim cánh cụt bé nhỏ",
    "lang": "vi"
  },
  {
    "key": "ja_story_8_q2",
    "text": "Em bé Kangaroo mới sinh nhỏ chừng nào và lớn lên ở đâu?",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q2_o1",
    "text": "Nhỏ bằng ngón tay cái và lớn trong túi bụng mẹ",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q2_o2",
    "text": "To bằng quả dưa hấu và ngủ trên cây cao",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q2_o3",
    "text": "Bơi ngay xuống biển cùng đàn cá voi",
    "lang": "vi"
  },
  {
    "key": "ja_st8_q2_o4",
    "text": "Bay ngay lên tận tầng mây xanh",
    "lang": "vi"
  },
  {
    "key": "ja_story_9",
    "text": "むかし、心の やさしい おじいさんが 山へ しばかりに 出かけました。 おひるに なって おむすびを 食べようとしたら、ひとつ コロコロと あなの 中へ おちて しまいました。 すると あなの 底から 「おむすび ころりん すっとんとん！」と かわいい 歌声が きこえました。 おじいさんが ふしぎに おもって のぞきこむと、うっかり じぶんも あなに おちて しまいました。 あなの 中では ねずみたちが おむすびの お礼に おもちを ついて、ごちそうして くれました。 帰りぎわ、ねずみたちは おじいさんに こばんの つまった おみやげの つづらを わたしました。 それを 聞いた よくばりな となりのおじいさんは、わざと おむすびを おとして 穴へ とびこみました。 よくばりおじいさんが ねこの なきまねを したため、ねずみたちは あかりを けし、まっくらに なって しまいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l1",
    "text": "むかし、心の やさしい おじいさんが 山へ しばかりに 出かけました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l2",
    "text": "おひるに なって おむすびを 食べようとしたら、ひとつ コロコロと あなの 中へ おちて しまいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l3",
    "text": "すると あなの 底から 「おむすび ころりん すっとんとん！」と かわいい 歌声が きこえました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l4",
    "text": "おじいさんが ふしぎに おもって のぞきこむと、うっかり じぶんも あなに おちて しまいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l5",
    "text": "あなの 中では ねずみたちが おむすびの お礼に おもちを ついて、ごちそうして くれました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l6",
    "text": "帰りぎわ、ねずみたちは おじいさんに こばんの つまった おみやげの つづらを わたしました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l7",
    "text": "それを 聞いた よくばりな となりのおじいさんは、わざと おむすびを おとして 穴へ とびこみました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_l8",
    "text": "よくばりおじいさんが ねこの なきまねを したため、ねずみたちは あかりを けし、まっくらに なって しまいました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_v1",
    "text": "おむすび",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_v2",
    "text": "あな",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_v3",
    "text": "よくばり",
    "lang": "ja"
  },
  {
    "key": "ja_story_9_q1",
    "text": "Đàn chuột nhắt dưới hang đã hát câu gì khi nhận được nắm cơm của ông lão tốt bụng?",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q1_o1",
    "text": "Cơm nắm lăn tròn, lăn tọt xuống đây!",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q1_o2",
    "text": "Tên lửa chuẩn bị bay lên mặt trăng!",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q1_o3",
    "text": "Trời ngoài kia sắp đổ cơn mưa rào!",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q1_o4",
    "text": "Tàu hỏa chuẩn bị rời khỏi nhà ga!",
    "lang": "vi"
  },
  {
    "key": "ja_story_9_q2",
    "text": "Vì sao ông hàng xóm tham lam cuối cùng không nhận được phần quà nào?",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q2_o1",
    "text": "Vì tham lam giả tiếng mèo kêu dọa đàn chuột",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q2_o2",
    "text": "Vì ông ấy đi lạc đường trong rừng sâu",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q2_o3",
    "text": "Vì ông ấy quên mang theo cơm nắm",
    "lang": "vi"
  },
  {
    "key": "ja_st9_q2_o4",
    "text": "Vì trời đã tối muộn mất rồi",
    "lang": "vi"
  },
  {
    "key": "ja_story_10",
    "text": "ある日、かにが ひろった おむすびを、ずるい さるが 「かきの たね」と とりかえました。 かには たねを うえて、「はやく めを だせ かきの たね」と まいにち 大切に 世話を しました。 やがて りっぱな かきの 木に あまい 実が たくさん なりましたが、かには 木に のぼれません。 さるが 木に のぼって、自分だけ あまい 実を 食べ、かたくて 青い 実を かにに ぶつけました。 けがをした かにの ために、うす、くり、はち、どろだんごが 仲間に なって たちあがりました。 みんなは さるの 家へ 入り、それぞれの ばしょに かくれて さるが 帰るのを まちました。 帰ってきた さるは、くりに おどろき、はちに 追われ、やねから おりた うすに おさえられました。 さるは 心から ごめんなさいと あやまり、みんなは 仲良く かきの 実を 分け合って 食べました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l1",
    "text": "ある日、かにが ひろった おむすびを、ずるい さるが 「かきの たね」と とりかえました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l2",
    "text": "かには たねを うえて、「はやく めを だせ かきの たね」と まいにち 大切に 世話を しました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l3",
    "text": "やがて りっぱな かきの 木に あまい 実が たくさん なりましたが、かには 木に のぼれません。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l4",
    "text": "さるが 木に のぼって、自分だけ あまい 実を 食べ、かたくて 青い 実を かにに ぶつけました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l5",
    "text": "けがをした かにの ために、うす、くり、はち、どろだんごが 仲間に なって たちあがりました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l6",
    "text": "みんなは さるの 家へ 入り、それぞれの ばしょに かくれて さるが 帰るのを まちました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l7",
    "text": "帰ってきた さるは、くりに おどろき、はちに 追われ、やねから おりた うすに おさえられました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_l8",
    "text": "さるは 心から ごめんなさいと あやまり、みんなは 仲良く かきの 実を 分け合って 食べました。",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_v1",
    "text": "かに",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_v2",
    "text": "かき",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_v3",
    "text": "なかよく",
    "lang": "ja"
  },
  {
    "key": "ja_story_10_q1",
    "text": "Chú Khỉ đã đổi thứ gì lấy nắm cơm của chú Cua rồi ném quả xanh làm đau bạn?",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q1_o1",
    "text": "Hạt hồng khô",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q1_o2",
    "text": "Hạt hoa hướng dương",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q1_o3",
    "text": "Quả dưa hấu tròn to",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q1_o4",
    "text": "Quả bóng bay màu đỏ",
    "lang": "vi"
  },
  {
    "key": "ja_story_10_q2",
    "text": "Những người bạn nào đã hợp sức giúp chú Cua dạy cho Khỉ một bài học?",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q2_o1",
    "text": "Hạt Dẻ, Ong Vàng và Cối Đá",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q2_o2",
    "text": "Cá mập và Bạch tuộc đại dương",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q2_o3",
    "text": "Khủng long và Rồng phun lửa",
    "lang": "vi"
  },
  {
    "key": "ja_st10_q2_o4",
    "text": "Đoàn tàu hỏa và Xe buýt",
    "lang": "vi"
  }
]

# Story 1..4 full narrations MUST be updated to match the expanded 8-9 sentence text!
FORCE_REGEN_KEYS = set()  # JA 121/121 already generated; pass --force to regenerate all


def sha256_file(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def clean_vi_tts(text: str) -> str:
    s = text.replace("→", ", ").replace("—", ", ").replace("-", " ")
    s = " ".join(s.split()).strip()
    if s and not s.endswith((".", "!", "?")):
        s += "."
    return s


async def try_one(job, sem):
    path, text, voice, rate, allow_period_swap = job
    tmp = path.with_suffix(".mp3.tmp")
    async with sem:
        try:
            conn = aiohttp.TCPConnector(resolver=aiohttp.ThreadedResolver())
            await edge_tts.Communicate(
                text, voice, rate=rate, connector=conn, connect_timeout=8, receive_timeout=12
            ).save(str(tmp))
            if tmp.stat().st_size < 500:
                return job, False
            os.replace(tmp, path)
            return job, True
        except Exception:
            if tmp.exists():
                tmp.unlink()
            return job, False


async def main():
    print(f"edge_tts version: {getattr(edge_tts, '__version__', 'unknown')}", flush=True)
    FEMALE_DIR.mkdir(parents=True, exist_ok=True)
    MALE_DIR.mkdir(parents=True, exist_ok=True)
    force = "--force" in sys.argv

    # Build individual file jobs so F and M are completely independent
    jobs = []
    for it in ITEMS:
        key = it["key"]
        lang = it["lang"]
        text = it["text"] if lang == "ja" else clean_vi_tts(it["text"])
        if lang == "ja":
            f_voice, f_rate = "ja-JP-NanamiNeural", "+0%"
            m_voice, m_rate = "ja-JP-KeitaNeural", "+0%"
        else:
            f_voice, f_rate = "vi-VN-HoaiMyNeural", "-6%"
            m_voice, m_rate = "vi-VN-NamMinhNeural", "+0%"

        fpath = FEMALE_DIR / f"{key}.mp3"
        mpath = MALE_DIR / f"{key}.mp3"
        f_force = force or (key in FORCE_REGEN_KEYS)
        if f_force or not (fpath.exists() and fpath.stat().st_size >= 500):
            jobs.append([fpath, text, f_voice, f_rate, lang == "vi"])
        if f_force or not (mpath.exists() and mpath.stat().st_size >= 500) or (
            fpath.exists() and mpath.exists() and sha256_file(fpath) == sha256_file(mpath)
        ):
            jobs.append([mpath, text, m_voice, m_rate, lang == "vi"])

    print(f"Pending individual voice files: {len(jobs)}", flush=True)
    if not jobs:
        print("All files already present and distinct!")
        return

    sem = asyncio.Semaphore(4)
    zero_waves = 0
    for wave in range(1, 35):
        if not jobs:
            break
        # Swap trailing '?' -> '.' after wave 2 on any stubborn VI question
        if wave >= 3:
            for j in jobs:
                if j[4] and j[1].endswith("?"):
                    j[1] = j[1][:-1] + "."
        results = await asyncio.gather(*(try_one(j, sem) for j in jobs))
        next_jobs = []
        ok_count = 0
        for j, ok in results:
            if ok:
                ok_count += 1
            else:
                next_jobs.append(j)
        print(f"[Wave {wave}] start={len(jobs)} -> ok={ok_count}, remain={len(next_jobs)}", flush=True)
        jobs = next_jobs
        if not jobs:
            break
        if ok_count == 0:
            zero_waves += 1
            wait_s = min(20, 6 * zero_waves)
            print(f"  0 hits; cooling down {wait_s}s...", flush=True)
            await asyncio.sleep(wait_s)
        else:
            zero_waves = 0
            await asyncio.sleep(1.5)

    if jobs:
        raise RuntimeError(f"Still missing after 34 waves ({len(jobs)}): {[j[0].name for j in jobs[:10]]}")

    # Final F != M SHA-256 sanity verification across all ITEMS
    for it in ITEMS:
        k = it["key"]
        fp = FEMALE_DIR / f"{k}.mp3"
        mp = MALE_DIR / f"{k}.mp3"
        assert fp.exists() and fp.stat().st_size >= 500, f"Missing/small F: {fp}"
        assert mp.exists() and mp.stat().st_size >= 500, f"Missing/small M: {mp}"
        assert sha256_file(fp) != sha256_file(mp), f"Identical F/M hash: {k}"
    print(f"ALL {len(ITEMS)} F+M PAIRS VERIFIED CLEAN!", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
