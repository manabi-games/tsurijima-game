const MAX_LEVEL = 10;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "manabi-tsuri-save-v1";
const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";

const subjectInfo = {
  math: { label: "さんすう", icon: "🧮", progressKey: "math" },
  roma: { label: "ローマじ", icon: "⌨️", progressKey: "roma" },
  word: { label: "とけい", icon: "🕒", progressKey: "word" },
  world: { label: "えいご・せかい", icon: "🌎", progressKey: "world" },
  animal: { label: "いきもの", icon: "🦋", progressKey: "animal" },
  quiz: { label: "なぞなぞ", icon: "💡", progressKey: "quiz" },
};

const places = [
  "はじまりのいけ",
  "はじまりのいけ",
  "きらきらがわ",
  "きらきらがわ",
  "みどりのみずうみ",
  "みどりのみずうみ",
  "あおぞらかいがん",
  "あおぞらかいがん",
  "ふしぎなしんかい",
  "にじいろつりば",
];

const outfits = [
  "#8fc7ff",
  "#7dd89b",
  "#ffd166",
  "#ff9f7d",
  "#9bd4d9",
  "#b69cff",
  "#f6a6c9",
  "#5cc8a7",
  "#4f83d1",
  "#f6c445",
];

const itemColors = [
  "#f6c445",
  "#7dd89b",
  "#ff9f7d",
  "#7ec8ff",
  "#ffd166",
  "#b69cff",
  "#f6a6c9",
  "#52b788",
  "#5f6caf",
  "#f8ef6d",
];

const buddyColors = [
  "#89ddff",
  "#8be8c4",
  "#ffd166",
  "#ffb3ba",
  "#baffc9",
  "#bae1ff",
  "#d7baff",
  "#f6d365",
  "#73d2de",
  "#fff176",
];

const lookInfo = {
  hero: {
    label: "しゅじんこう",
    subject: "math",
    asset: heroAsset,
    options: [
      { value: "1", label: "こども", level: 1 },
      { value: "5", label: "わかもの", level: 5, needs: 4 },
      { value: "9", label: "せいねん", level: 9, needs: 8 },
      { value: "10", label: "おじいちゃん", level: 10, needs: 10 },
    ],
  },
  blue: {
    label: "あおいあいぼう",
    subject: "roma",
    asset: buddyAsset,
    options: [
      { value: "1", label: "ちいさい", level: 1 },
      { value: "5", label: "つよい", level: 5, needs: 4 },
      { value: "10", label: "さいこう", level: 10, needs: 8 },
    ],
  },
  red: {
    label: "あかいあいぼう",
    subject: "word",
    asset: redBuddyAsset,
    options: [
      { value: "1", label: "ちいさい", level: 1 },
      { value: "5", label: "つよい", level: 5, needs: 4 },
      { value: "10", label: "さいこう", level: 10, needs: 8 },
    ],
  },
  world: {
    label: "しろいあいぼう",
    subject: "world",
    asset: worldBuddyAsset,
    options: [
      { value: "1", label: "ちいさい", level: 1 },
      { value: "5", label: "つよい", level: 5, needs: 4 },
      { value: "10", label: "さいこう", level: 10, needs: 8 },
    ],
  },
  animal: {
    label: "みどりのあいぼう",
    subject: "animal",
    asset: animalBuddyAsset,
    options: [
      { value: "1", label: "ちいさい", level: 1 },
      { value: "5", label: "つよい", level: 5, needs: 4 },
      { value: "10", label: "さいこう", level: 10, needs: 8 },
    ],
  },
  quiz: {
    label: "きいろのあいぼう",
    subject: "quiz",
    asset: quizBuddyAsset,
    options: [
      { value: "1", label: "ちいさい", level: 1 },
      { value: "5", label: "つよい", level: 5, needs: 4 },
      { value: "10", label: "さいこう", level: 10, needs: 8 },
    ],
  },
};

const romajiLevels = [
  [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]],
  [["か", "ka"], ["さ", "sa"], ["た", "ta"], ["な", "na"], ["は", "ha"]],
  [["ま", "ma"], ["や", "ya"], ["ら", "ra"], ["わ", "wa"], ["ん", "n"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["さかな", "sakana"], ["やま", "yama"], ["そら", "sora"]],
  [["くるま", "kuruma"], ["つみき", "tsumiki"], ["みかん", "mikan"], ["ひこうき", "hikouki"], ["おにぎり", "onigiri"]],
  [["すいとう", "suitou"], ["えんぴつ", "enpitsu"], ["ともだち", "tomodachi"], ["たからばこ", "takarabako"], ["あさごはん", "asagohan"]],
  [["あかちゃん", "akachan"], ["らっぱ", "rappa"], ["きって", "kitte"], ["でんしゃ", "densha"], ["きんぎょ", "kingyo"]],
  [["あさ", "asa"], ["うみ", "umi"], ["かさ", "kasa"], ["ほし", "hoshi"], ["ゆき", "yuki"]],
  [["すいか", "suika"], ["たいこ", "taiko"], ["らっぱ", "rappa"], ["きって", "kitte"], ["がっこう", "gakkou"]],
  [["オーストラリア", "o-sutoraria"], ["うんどうかい", "undoukai"], ["たんじょうび", "tanjoubi"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"]],
];

const clockLevels = [
  [clockQ(1, 0), clockQ(2, 0), clockQ(3, 0), clockQ(4, 0), clockQ(5, 0)],
  [clockQ(6, 0), clockQ(7, 0), clockQ(8, 0), clockQ(9, 0), clockQ(10, 0)],
  [clockQ(1, 30), clockQ(2, 30), clockQ(3, 30), clockQ(4, 30), clockQ(5, 30)],
  [clockQ(6, 30), clockQ(7, 30), clockQ(8, 30), clockQ(9, 30), clockQ(10, 30)],
  [clockQ(1, 0, "この とけいの 1じかんごは？", 2, 0), clockQ(3, 0, "この とけいの 1じかんごは？", 4, 0), clockQ(5, 0, "この とけいの 1じかんごは？", 6, 0), clockQ(7, 0, "この とけいの 1じかんごは？", 8, 0), clockQ(9, 0, "この とけいの 1じかんごは？", 10, 0)],
  [clockQ(1, 15), clockQ(2, 45), clockQ(4, 15), clockQ(5, 45), clockQ(7, 15)],
  [clockQ(1, 5), clockQ(2, 10), clockQ(3, 20), clockQ(4, 25), clockQ(5, 55)],
  [clockQ(8, 10), clockQ(9, 25), clockQ(10, 35), clockQ(11, 40), clockQ(12, 50)],
  [clockQ(2, 0, "この とけいの 1じかんごは？", 3, 0), clockQ(4, 30, "この とけいの 1じかんごは？", 5, 30), clockQ(6, 15, "この とけいの 1じかんごは？", 7, 15), clockQ(8, 45, "この とけいの 1じかんごは？", 9, 45), clockQ(10, 20, "この とけいの 1じかんごは？", 11, 20)],
  [clockInputQ(6, 5), clockInputQ(12, 10), clockInputQ(3, 35), clockInputQ(5, 45), clockInputQ(7, 50)],
];

const worldLevels = [
  [
    qChoice("えいごの もじ", "えー は どれ？", ["A", "B", "C", "D"], "A"),
    qChoice("えいごの もじ", "びー は どれ？", ["B", "A", "D", "E"], "B"),
    qChoice("えいごの もじ", "しー は どれ？", ["C", "G", "A", "F"], "C"),
    qChoice("えいごの もじ", "でぃー は どれ？", ["D", "B", "E", "C"], "D"),
    qChoice("えいごの もじ", "いー は どれ？", ["E", "F", "A", "D"], "E"),
  ],
  [
    qChoice("えいごの もじ", "えふ は どれ？", ["F", "E", "H", "A"], "F"),
    qChoice("えいごの もじ", "じー は どれ？", ["G", "C", "J", "D"], "G"),
    qChoice("えいごの もじ", "えいち は どれ？", ["H", "A", "F", "K"], "H"),
    qChoice("えいごの もじ", "あい は どれ？", ["I", "L", "T", "E"], "I"),
    qChoice("えいごの もじ", "じぇー は どれ？", ["J", "G", "I", "C"], "J"),
  ],
  [
    qChoice("えいごで どれ？", "ねこ", ["cat キャット", "dog ドッグ", "fish フィッシュ", "bird バード"], "cat キャット"),
    qChoice("えいごで どれ？", "いぬ", ["dog ドッグ", "cat キャット", "sun サン", "book ブック"], "dog ドッグ"),
    qChoice("えいごで どれ？", "さかな", ["fish フィッシュ", "milk ミルク", "pen ペン", "rain レイン"], "fish フィッシュ"),
    qChoice("えいごで どれ？", "とり", ["bird バード", "car カー", "moon ムーン", "cake ケーキ"], "bird バード"),
    qChoice("えいごで どれ？", "りんご", ["apple アップル", "orange オレンジ", "banana バナナ", "grape グレープ"], "apple アップル"),
  ],
  [
    qChoice("えいごで どれ？", "あか", ["red レッド", "blue ブルー", "green グリーン", "yellow イエロー"], "red レッド"),
    qChoice("えいごで どれ？", "あお", ["blue ブルー", "red レッド", "black ブラック", "white ホワイト"], "blue ブルー"),
    qChoice("えいごで どれ？", "みどり", ["green グリーン", "pink ピンク", "orange オレンジ", "gray グレー"], "green グリーン"),
    qChoice("えいごで どれ？", "きいろ", ["yellow イエロー", "purple パープル", "brown ブラウン", "black ブラック"], "yellow イエロー"),
    qChoice("えいごで どれ？", "しろ", ["white ホワイト", "red レッド", "blue ブルー", "green グリーン"], "white ホワイト"),
  ],
  [
    qChoice("えいごで どれ？", "1", ["one ワン", "two ツー", "three スリー", "four フォー"], "one ワン"),
    qChoice("えいごで どれ？", "2", ["two ツー", "one ワン", "five ファイブ", "ten テン"], "two ツー"),
    qChoice("えいごで どれ？", "3", ["three スリー", "six シックス", "seven セブン", "nine ナイン"], "three スリー"),
    qChoice("えいごで どれ？", "4", ["four フォー", "five ファイブ", "one ワン", "eight エイト"], "four フォー"),
    qChoice("えいごで どれ？", "5", ["five ファイブ", "two ツー", "six シックス", "ten テン"], "five ファイブ"),
  ],
  [
    flagQ("jp", ["にほん", "アメリカ", "ブラジル", "フランス"], "にほん"),
    flagQ("us", ["アメリカ", "にほん", "イタリア", "インド"], "アメリカ"),
    flagQ("fr", ["フランス", "ドイツ", "カナダ", "かんこく"], "フランス"),
    flagQ("it", ["イタリア", "スペイン", "イギリス", "にほん"], "イタリア"),
    flagQ("br", ["ブラジル", "アメリカ", "ドイツ", "インド"], "ブラジル"),
  ],
  [
    qChoice("えいごで どれ？", "たいよう", ["sun", "moon", "star", "rain"], "sun"),
    qChoice("えいごで どれ？", "つき", ["moon", "sun", "cloud", "snow"], "moon"),
    qChoice("えいごで どれ？", "ほし", ["star", "rain", "wind", "sky"], "star"),
    qChoice("えいごで どれ？", "あめ", ["rain", "sun", "sea", "tree"], "rain"),
    qChoice("えいごで どれ？", "ゆき", ["snow", "wind", "moon", "river"], "snow"),
  ],
  [
    qChoice("えいごで どれ？", "おはよう", ["good morning", "good night", "thank you", "hello"], "good morning"),
    qChoice("えいごで どれ？", "ありがとう", ["thank you", "sorry", "hello", "yes"], "thank you"),
    qChoice("えいごで どれ？", "こんにちは", ["hello", "bye", "no", "good night"], "hello"),
    qChoice("えいごで どれ？", "おやすみ", ["good night", "good morning", "thank you", "please"], "good night"),
    qChoice("えいごで どれ？", "はい", ["yes", "no", "bye", "sorry"], "yes"),
  ],
  [
    flagQ("gb", ["イギリス", "フランス", "ドイツ", "カナダ"], "イギリス"),
    flagQ("de", ["ドイツ", "イタリア", "ブラジル", "にほん"], "ドイツ"),
    flagQ("ca", ["カナダ", "アメリカ", "インド", "スペイン"], "カナダ"),
    flagQ("kr", ["かんこく", "にほん", "ちゅうごく", "タイ"], "かんこく"),
    flagQ("in", ["インド", "カナダ", "ドイツ", "フランス"], "インド"),
  ],
  [
    qChoice("えいごで どれ？", "みず", ["water", "milk", "juice", "tea"], "water"),
    qChoice("えいごで どれ？", "ぎゅうにゅう", ["milk", "water", "rice", "bread"], "milk"),
    qChoice("えいごで どれ？", "ごはん", ["rice", "fish", "apple", "cake"], "rice"),
    qChoice("えいごで どれ？", "パン", ["bread", "rice", "water", "egg"], "bread"),
    qChoice("えいごで どれ？", "たまご", ["egg", "milk", "fish", "book"], "egg"),
  ],
];

const animalLevels = [
  [
    qChoice("この とくちょうの いきものは どれかな？", "「ニャー」と なくよ", ["ねこ", "いぬ", "うし", "とり"], "ねこ"),
    qChoice("この とくちょうの いきものは どれかな？", "「ワンワン」と なくよ", ["いぬ", "ねこ", "さる", "かめ"], "いぬ"),
    qChoice("この とくちょうの いきものは どれかな？", "みずの なかを すいすい およぐよ", ["さかな", "うま", "ぞう", "へび"], "さかな"),
    qChoice("この とくちょうの いきものは どれかな？", "はねを つかって そらを とぶよ", ["とり", "かに", "ねこ", "うし"], "とり"),
    qChoice("この とくちょうの いきものは どれかな？", "かたい こうらを せおっているよ", ["かめ", "いぬ", "さる", "とり"], "かめ"),
  ],
  [
    qChoice("この とくちょうの いきものは どれかな？", "ながい はなで ものを つかむよ", ["ぞう", "きりん", "うさぎ", "かえる"], "ぞう"),
    qChoice("この とくちょうの いきものは どれかな？", "くびが ながくて たかい はっぱを たべるよ", ["きりん", "ぞう", "らいおん", "ねこ"], "きりん"),
    qChoice("この とくちょうの いきものは どれかな？", "ながい みみで ぴょんぴょん はねるよ", ["うさぎ", "さかな", "へび", "かに"], "うさぎ"),
    qChoice("この とくちょうの いきものは どれかな？", "「ガオー」と なく つよそうな いきものだよ", ["らいおん", "うし", "うさぎ", "かめ"], "らいおん"),
    qChoice("この とくちょうの いきものは どれかな？", "てを つかって きに のぼるのが とくいだよ", ["さる", "ぞう", "きりん", "かめ"], "さる"),
  ],
  [
    qChoice("どの むしの とくちょうかな？", "きれいな はねで ひらひら とぶよ", ["ちょう", "あり", "かぶとむし", "とんぼ"], "ちょう"),
    qChoice("どの むしの とくちょうかな？", "あたまの つのが かっこいいよ", ["かぶとむし", "ちょう", "だんごむし", "あり"], "かぶとむし"),
    qChoice("どの むしの とくちょうかな？", "みんなで ならんで あるくよ", ["あり", "とんぼ", "かまきり", "せみ"], "あり"),
    qChoice("どの むしの とくちょうかな？", "おおきな めで すいすい とぶよ", ["とんぼ", "あり", "かぶとむし", "だんごむし"], "とんぼ"),
    qChoice("どの むしの とくちょうかな？", "さわると からだを まるめるよ", ["だんごむし", "せみ", "ちょう", "あり"], "だんごむし"),
  ],
  [
    qChoice("この とくちょうの いきものは どれかな？", "うしろあしで ぴょんと ジャンプするよ", ["かえる", "へび", "かに", "うし"], "かえる"),
    qChoice("この とくちょうの いきものは どれかな？", "てや あしが なくて からだが ながいよ", ["へび", "かめ", "とり", "ねこ"], "へび"),
    qChoice("この とくちょうの いきものは どれかな？", "みずべで よこに あるくよ", ["かに", "さかな", "うさぎ", "ぞう"], "かに"),
    qChoice("この とくちょうの いきものは どれかな？", "ての ところに はさみが あるよ", ["かに", "かえる", "へび", "とり"], "かに"),
    qChoice("この とくちょうの いきものは どれかな？", "あめの ひに げんきに なくよ", ["かえる", "らいおん", "きりん", "うし"], "かえる"),
  ],
  [
    qChoice("この いきものは なにを たべるかな？", "パンダが よく たべる ものは どれ？", ["ささ", "さかな", "にんじん", "みかん"], "ささ"),
    qChoice("この いきものは なにを たべるかな？", "うさぎが すきな たべものは どれ？", ["にんじん", "さかな", "にく", "パン"], "にんじん"),
    qChoice("この いきものは なにを たべるかな？", "ねこが すきな たべものは どれ？", ["さかな", "ささ", "くさ", "どんぐり"], "さかな"),
    qChoice("この いきものは なにを たべるかな？", "りすが よく ひろう たべものは どれ？", ["どんぐり", "にく", "さかな", "ささ"], "どんぐり"),
    qChoice("この いきものは なにを たべるかな？", "うしが もぐもぐ たべる ものは どれ？", ["くさ", "どんぐり", "さかな", "にんじん"], "くさ"),
  ],
  [
    qChoice("この いきものは どこで くらすかな？", "さかなが すんでいる ところは どこ？", ["みず", "そら", "き", "すな"], "みず"),
    qChoice("この いきものは どこで くらすかな？", "とりが とぶ ところは どこ？", ["そら", "みず", "つち", "ゆき"], "そら"),
    qChoice("この いきものは どこで くらすかな？", "もぐらが あなを ほる ところは どこ？", ["つち", "そら", "みず", "き"], "つち"),
    qChoice("この いきものは どこで くらすかな？", "ペンギンが とくいな ところは どこ？", ["さむい ところ", "あつい すな", "きのうえ", "かわ"], "さむい ところ"),
    qChoice("この いきものは どこで くらすかな？", "らくだが あるく あつい ところは どこ？", ["すな", "うみ", "ゆき", "きのうえ"], "すな"),
  ],
  [
    qChoice("この むしの せつめいで ただしいのは どれ？", "ちょうは どんな むしかな？", ["たまごから うまれる", "いしから うまれる", "みずに とける", "つのが 2ほん"], "たまごから うまれる"),
    qChoice("この むしの せつめいで ただしいのは どれ？", "せみは いつ よく なくかな？", ["なつに よく なく", "ふゆに こおる", "うみで およぐ", "くびが ながい"], "なつに よく なく"),
    qChoice("この むしの せつめいで ただしいのは どれ？", "かまきりの からだで とくちょうが あるのは どこ？", ["かまのような てが ある", "こうらが ある", "みずを ふく", "つのが 3ほん"], "かまのような てが ある"),
    qChoice("この むしの せつめいで ただしいのは どれ？", "はちは どこに あつまるかな？", ["はなに あつまる", "うみに すむ", "こうらが ある", "にんじんが すき"], "はなに あつまる"),
    qChoice("この むしの せつめいで ただしいのは どれ？", "ありは どんな むしかな？", ["ちいさくて みんなで はこぶ", "そらで ねる", "さかなを つる", "くびが ながい"], "ちいさくて みんなで はこぶ"),
  ],
  [
    qChoice("この いきものに ちかい なかまは どれかな？", "ねこと にている なかまは どれ？", ["らいおん", "かえる", "かに", "とんぼ"], "らいおん"),
    qChoice("この いきものに ちかい なかまは どれかな？", "いぬと にている なかまは どれ？", ["おおかみ", "さかな", "ちょう", "かめ"], "おおかみ"),
    qChoice("この いきものに ちかい なかまは どれかな？", "うまと にている なかまは どれ？", ["しまうま", "へび", "あり", "かに"], "しまうま"),
    qChoice("この いきものに ちかい なかまは どれかな？", "かえるの こどもの ころは どれ？", ["おたまじゃくし", "ねこ", "とり", "ぞう"], "おたまじゃくし"),
    qChoice("この いきものに ちかい なかまは どれかな？", "ちょうの こどもの ころは どれ？", ["ようちゅう", "さかな", "うさぎ", "きりん"], "ようちゅう"),
  ],
  [
    qChoice("この とくちょうの いきものは どれかな？", "しろと くろの もようで ささを たべるよ", ["パンダ", "ぞう", "らいおん", "うさぎ"], "パンダ"),
    qChoice("この とくちょうの いきものは どれかな？", "しましま もようの からだを しているよ", ["しまうま", "ぞう", "かえる", "かに"], "しまうま"),
    qChoice("この とくちょうの いきものは どれかな？", "おなかの ふくろで こどもを そだてるよ", ["カンガルー", "ねこ", "とり", "さかな"], "カンガルー"),
    qChoice("この とくちょうの いきものは どれかな？", "とりだけど そらより うみを およぐのが とくいだよ", ["ペンギン", "すずめ", "かも", "はと"], "ペンギン"),
    qChoice("この とくちょうの いきものは どれかな？", "からだに とげが ある ちいさな いきものだよ", ["ハリネズミ", "うし", "きりん", "さる"], "ハリネズミ"),
  ],
  [
    qChoice("この いきものの せつめいで ただしいのは どれ？", "くじら", ["ほにゅうるい", "ぎょるい", "とり", "こうかくるい"], "ほにゅうるい"),
    qChoice("この いきものの せつめいで ただしいのは どれ？", "こうもり", ["ほにゅうるい", "とり", "むし", "ぎょるい"], "ほにゅうるい"),
    qChoice("この いきものの せつめいで ただしいのは どれ？", "たこ", ["あしが 8ほん", "あしが 6ぽん", "からが ある", "はねが ある"], "あしが 8ほん"),
    qChoice("この いきものの せつめいで ただしいのは どれ？", "いるか", ["ほにゅうるい", "ぎょるい", "とり", "むし"], "ほにゅうるい"),
    qChoice("この いきものの せつめいで ただしいのは どれ？", "くらげ", ["からだが やわらかい", "こうらが ある", "あしが 4ほん", "つのが ある"], "からだが やわらかい"),
  ],
];

const quizLevels = [
  [
    qChoice("この せつめいに あうものは どれかな？", "あさに そらへ のぼる まるくて あかるい ものは？", ["たいよう", "つき", "さかな", "かさ"], "たいよう"),
    qChoice("この せつめいに あうものは どれかな？", "あめの ひに ぬれないように つかう ものは？", ["かさ", "ぼうし", "くつした", "ほん"], "かさ"),
    qChoice("この せつめいに あうものは どれかな？", "あしに はくと そとを あるきやすい ものは？", ["くつ", "ぼうし", "てぶくろ", "かばん"], "くつ"),
    qChoice("この せつめいに あうものは どれかな？", "よるの そらで きらきら ひかる ものは？", ["ほし", "りんご", "いす", "さかな"], "ほし"),
    qChoice("この せつめいに あうものは どれかな？", "みずを のむときに てに もって つかう ものは？", ["コップ", "くつ", "ふとん", "えんぴつ"], "コップ"),
  ],
  [
    qChoice("この とき どうするのが いいかな？", "そとから いえに かえってきたら、まず なにを する？", ["てを あらう", "ねる", "テレビを みる", "くつを はく"], "てを あらう"),
    qChoice("この とき どうするのが いいかな？", "あかしんごうを みつけたら、どうする？", ["とまる", "はしる", "ねる", "およぐ"], "とまる"),
    qChoice("この とき どうするのが いいかな？", "はを きれいに するために、いつ みがく？", ["あさと よる", "つりのあとだけ", "ねるまえだけ", "しない"], "あさと よる"),
    qChoice("この とき どうするのが いいかな？", "ごはんを たべる まえに、なにを する？", ["てを あらう", "くつを はく", "かさを さす", "ねる"], "てを あらう"),
    qChoice("この とき どうするのが いいかな？", "どうろを わたる まえに、なにを みる？", ["みぎひだりを みる", "めを とじる", "はしりつづける", "すわる"], "みぎひだりを みる"),
  ],
  [
    qChoice("この せつめいに あう どうぐは どれかな？", "からだに きると あたたかく なる ものは？", ["ふく", "こおり", "みず", "さかな"], "ふく"),
    qChoice("この せつめいに あう どうぐは どれかな？", "つかれたときに こしを おろして すわる ものは？", ["いす", "かさ", "くつ", "りんご"], "いす"),
    qChoice("この せつめいに あう どうぐは どれかな？", "かみに じや えを かくときに つかう ものは？", ["えんぴつ", "コップ", "かさ", "ぼうし"], "えんぴつ"),
    qChoice("この せつめいに あう どうぐは どれかな？", "おはなしや えを たのしみながら よむ ものは？", ["ほん", "くつ", "さかな", "かぎ"], "ほん"),
    qChoice("この せつめいに あう どうぐは どれかな？", "よるに ねるとき、からだに かける ものは？", ["ふとん", "かさ", "いす", "えんぴつ"], "ふとん"),
  ],
  [
    qChoice("あぶない ときは どうするのが いいかな？", "あつい なべを みつけたら、どうする？", ["さわらない", "なめる", "かぶる", "ける"], "さわらない"),
    qChoice("あぶない ときは どうするのが いいかな？", "けがを したら、まず だれに つたえる？", ["おとなに いう", "かくす", "はしる", "わらう"], "おとなに いう"),
    qChoice("あぶない ときは どうするのが いいかな？", "しらない ひとに さそわれたら、どうする？", ["ついていかない", "ついていく", "おかしを もらう", "いえを おしえる"], "ついていかない"),
    qChoice("あぶない ときは どうするのが いいかな？", "かみなりが なったら、どこから はなれる？", ["たかい きから はなれる", "きのしたに いく", "うみで およぐ", "そとで あそぶ"], "たかい きから はなれる"),
    qChoice("あぶない ときは どうするのが いいかな？", "はさみを つかうときに たいせつな ことは？", ["きをつける", "なげる", "はしる", "くちに いれる"], "きをつける"),
  ],
  [
    qChoice("からだの どこを つかうかな？", "ものを みるときに つかう、かおに ふたつある ところは？", ["め", "みみ", "あし", "て"], "め"),
    qChoice("からだの どこを つかうかな？", "おとや こえを きくときに つかう ところは？", ["みみ", "め", "くち", "ひざ"], "みみ"),
    qChoice("からだの どこを つかうかな？", "ごはんを たべるときに つかう ところは？", ["くち", "め", "みみ", "あし"], "くち"),
    qChoice("からだの どこを つかうかな？", "あるいたり はしったり するときに つかう ところは？", ["あし", "くち", "め", "みみ"], "あし"),
    qChoice("からだの どこを つかうかな？", "ものを もったり つかんだり するときに つかう ところは？", ["て", "あし", "くち", "みみ"], "て"),
  ],
  [
    qChoice("ともだちと すごすとき、どうするのが いいかな？", "ともだちが こまっていたら、どうする？", ["こえを かける", "わらう", "かくれる", "おこる"], "こえを かける"),
    qChoice("ともだちと すごすとき、どうするのが いいかな？", "ありがとうと いわれたら、なんて いう？", ["どういたしまして", "いやだ", "しらない", "だめ"], "どういたしまして"),
    qChoice("ともだちと すごすとき、どうするのが いいかな？", "みんなで あそぶ まえに、たいせつな ことは？", ["やくそくを まもる", "おもちゃを なげる", "ひとりじめする", "かえる"], "やくそくを まもる"),
    qChoice("ともだちと すごすとき、どうするのが いいかな？", "おもちゃを かりたい とき、なんて いう？", ["かしてと いう", "だまって とる", "かくす", "こわす"], "かしてと いう"),
    qChoice("ともだちと すごすとき、どうするのが いいかな？", "まちがえて いやなことを したら、なんて いう？", ["ごめんねと いう", "にげる", "わらう", "かくす"], "ごめんねと いう"),
  ],
  [
    qChoice("すこし かんがえる なぞなぞだよ", "あさは 4ほん、ひるは 2ほん、よるは 3ぼんで あるくものは？", ["ひと", "いぬ", "つくえ", "かさ"], "ひと"),
    qChoice("すこし かんがえる なぞなぞだよ", "きっても きっても、へらずに あそべる ものは？", ["トランプ", "パン", "かみ", "えんぴつ"], "トランプ"),
    qChoice("すこし かんがえる なぞなぞだよ", "くろい ところを はしる、ほそくて しろい ものは？", ["チョーク", "くつ", "さかな", "コップ"], "チョーク"),
    qChoice("すこし かんがえる なぞなぞだよ", "あたまの うえに のせて つかう ものは？", ["ぼうし", "くつ", "コップ", "ふとん"], "ぼうし"),
    qChoice("すこし かんがえる なぞなぞだよ", "かぎを つかわなくても、あいたり とじたり する ものは？", ["め", "ドア", "はこ", "くるま"], "め"),
  ],
  [
    qChoice("この なかで あうものは どれかな？", "ごはんや おかずに よく はいっている やさいは どれ？", ["にんじん", "りんご", "みかん", "ぶどう"], "にんじん"),
    qChoice("この なかで あうものは どれかな？", "あまくて そのまま たべることが おおい くだものは どれ？", ["りんご", "きゅうり", "ねぎ", "だいこん"], "りんご"),
    qChoice("この なかで あうものは どれかな？", "あまい あじが する のみものは どれ？", ["ジュース", "みず", "おちゃ", "くうき"], "ジュース"),
    qChoice("この なかで あうものは どれかな？", "あさに ひとと あったときに いう ことばは？", ["おはよう", "おやすみ", "いただきます", "ごちそうさま"], "おはよう"),
    qChoice("この なかで あうものは どれかな？", "ごはんを たべる まえに いう ことばは？", ["いただきます", "おはよう", "おやすみ", "ただいま"], "いただきます"),
  ],
  [
    qChoice("この せつめいに あうものは どれかな？", "さんかくの かたちで、のりが ついている たべものは？", ["おにぎり", "パン", "みかん", "うどん"], "おにぎり"),
    qChoice("この せつめいに あうものは どれかな？", "きると めが しみて、なみだが でやすい やさいは？", ["たまねぎ", "にんじん", "じゃがいも", "きゅうり"], "たまねぎ"),
    qChoice("この せつめいに あうものは どれかな？", "あめの あとに そらへ でる、いろが きれいな ものは？", ["にじ", "かわ", "みち", "やま"], "にじ"),
    qChoice("この せつめいに あうものは どれかな？", "キャンプで ふくろの なかに はいって ねる どうぐは？", ["ねぶくろ", "かばん", "コップ", "くつ"], "ねぶくろ"),
    qChoice("この せつめいに あうものは どれかな？", "あかくて まるく、くだものとして よく たべる ものは？", ["りんご", "にんじん", "トマト", "いちご"], "りんご"),
  ],
  [
    qChoice("こまった ときや あぶない ときは どうする？", "じしんで ぐらぐら ゆれたら、まず なにを まもる？", ["あたまを まもる", "そとへ とびだす", "まどを たたく", "はしりまわる"], "あたまを まもる"),
    qChoice("こまった ときや あぶない ときは どうする？", "ひが でているのを みつけたら、まず どうする？", ["おとなに しらせる", "ちかづく", "かくれる", "あそぶ"], "おとなに しらせる"),
    qChoice("こまった ときや あぶない ときは どうする？", "よる ねる まえに、はを きれいに するため なにを する？", ["はを みがく", "そとで あそぶ", "おかしを たくさん たべる", "くつを はく"], "はを みがく"),
    qChoice("こまった ときや あぶない ときは どうする？", "からだが つかれた ときは、どうするのが いい？", ["やすむ", "むりを する", "はしりつづける", "ねない"], "やすむ"),
    qChoice("こまった ときや あぶない ときは どうする？", "ひとりで こまった ときは、どうするのが いい？", ["おとなに そうだん", "ひとりで がまん", "かくす", "なくす"], "おとなに そうだん"),
  ],
];

const fishList = [
  fish("medaka", "メダカ", "よくでる", "#7ec8ff", 1, 0.2),
  fish("koi", "コイ", "よくでる", "#f4a261", 1, 0.18),
  fish("aji", "アジ", "よくでる", "#9bd4d9", 2, 0.16),
  fish("kingyo", "キンギョ", "たまにでる", "#ff7b54", 3, 0.11),
  fish("yamame", "ヤマメ", "たまにでる", "#9fd7ca", 3, 0.1),
  fish("nijimasu", "ニジマス", "たまにでる", "#b69cff", 4, 0.09),
  fish("kasago", "カサゴ", "たまにでる", "#d95d39", 5, 0.08),
  fish("rare_nijimasu", "きらきらニジマス", "レア", "#8be8c4", 5, 0.055, "./assets/fish/rare_nijimasu.png"),
  fish("rare_ayu", "ぎんいろアユ", "レア", "#e8f7ff", 6, 0.05, "./assets/fish/rare_ayu.png"),
  fish("rare_ishidai", "しましまイシダイ", "レア", "#d7d2c6", 7, 0.045, "./assets/fish/rare_ishidai.png"),
  fish("rare_tobiuo", "あおぞらトビウオ", "レア", "#5cc8ff", 8, 0.04, "./assets/fish/rare_tobiuo.png"),
  fish("rare_kingyo", "こがねキンギョ", "レア", "#f6c445", 8, 0.035, "./assets/fish/rare_kingyo.png"),
  fish("rare_fugu", "さくらフグ", "レア", "#ff9fc4", 6, 0.045, "./assets/fish/rare_fugu.png"),
  fish("rare_unagi", "よぞらウナギ", "レア", "#4969c9", 7, 0.04, "./assets/fish/rare_unagi.png"),
  fish("super_manta", "ほしぞらマンタ", "スーパー レア", "#6c7fd8", 8, 0.028, "./assets/fish/super_manta.png"),
  fish("super_shark", "ぎんがザメ", "スーパー レア", "#7b8ca8", 9, 0.022, "./assets/fish/super_shark.png"),
  fish("super_salmon", "オーロラサケ", "スーパー レア", "#ff8fb3", 9, 0.02, "./assets/fish/super_salmon.png"),
  fish("super_kurage", "ひかりクラゲ", "スーパー レア", "#8be8ff", 8, 0.024, "./assets/fish/super_kurage.png"),
  fish("legend_koi", "にじいろコイ", "でんせつ", "#f6a6c9", 9, 0.025, "./assets/fish/legend_koi.png"),
  fish("legend_tai", "おうごんタイ", "でんせつ", "#ffd166", 10, 0.02, "./assets/fish/legend_tai.png"),
  fish("legend_coelacanth", "まぼろしシーラカンス", "でんせつ", "#5f6caf", 10, 0.015, "./assets/fish/legend_coelacanth.png"),
  fish("legend_maguro", "おうじゃマグロ", "でんせつ", "#2f6fb4", 10, 0.014, "./assets/fish/legend_maguro.png"),
  fish("legend_ryugu", "りゅうぐうのつかい", "でんせつ", "#f2f0ff", 10, 0.01, "./assets/fish/legend_ryugu.png"),
];

let state = loadState();
let activeSubject = "math";
let selectedLevels = defaultLevels();
let quiz = null;
let selectedChoice = "";
let resetArmed = false;
let fishingBusy = false;
let pendingCatch = null;
let fishingPullsLeft = 0;

function qChoice(prompt, topic, choices, answer) {
  return { type: "choice", prompt, topic, choices, answer };
}

function flagQ(kind, choices, answer) {
  return qChoice("どこの はた？", flagSvg(kind), choices, answer);
}

function clockQ(hour, minute, prompt = "この とけいは？", answerHour = hour, answerMinute = minute) {
  const answer = timeLabel(answerHour, answerMinute);
  return {
    type: "clock",
    prompt,
    topic: clockSvg(hour, minute),
    choices: timeChoices(answerHour, answerMinute),
    answer,
  };
}

function clockInputQ(hour, minute) {
  const answer = timeLabel(hour, minute);
  return {
    type: "clockInput",
    prompt: "この とけいは なんじなんぷん？",
    topic: clockSvg(hour, minute),
    answer,
    answers: clockAnswerVariants(hour, minute),
    hint: "れい 7:30",
  };
}

function timeLabel(hour, minute) {
  if (minute === 0) return `${hour}じ`;
  if (minute === 30) return `${hour}じはん`;
  return `${hour}じ${minute}ふん`;
}

function clockAnswerVariants(hour, minute) {
  const minuteText = String(minute).padStart(2, "0");
  const values = [
    timeLabel(hour, minute),
    `${hour}:${minuteText}`,
    `${hour}:${minute}`,
    `${hour} ${minute}`,
    `${hour}じ${minute}`,
    `${hour}じ${minute}ぷん`,
    `${hour}じ${minuteText}ふん`,
    `${hour}じ${minuteText}ぷん`,
  ];
  if (minute === 0) values.push(`${hour}:00`, `${hour}じ0ふん`, `${hour}じ00ふん`);
  if (minute === 30) values.push(`${hour}じ30ぷん`, `${hour}じはん`);
  return values.map(normalizeAnswer);
}

function timeChoices(hour, minute) {
  const answer = timeLabel(hour, minute);
  const choices = new Set([answer]);
  const offsets = minute === 0 ? [1, 2, 3, -1, -2] : [5, 10, -5, -10, 15, -15];
  for (const offset of offsets) {
    if (choices.size >= 4) break;
    if (minute === 0) {
      choices.add(timeLabel(wrapHour(hour + offset), 0));
    } else {
      const total = (hour % 12) * 60 + minute + offset;
      const nextHour = wrapHour(Math.floor(total / 60));
      const nextMinute = ((total % 60) + 60) % 60;
      choices.add(timeLabel(nextHour, nextMinute));
    }
  }
  return shuffle([...choices]).slice(0, 4);
}

function wrapHour(hour) {
  const wrapped = ((hour - 1) % 12 + 12) % 12 + 1;
  return wrapped;
}

function flagSvg(kind) {
  const flags = {
    jp: `<rect width="180" height="108" fill="#fff"/><circle cx="90" cy="54" r="28" fill="#d22f3d"/>`,
    us: `<rect width="180" height="108" fill="#fff"/><g fill="#c6283a"><rect y="0" width="180" height="12"/><rect y="24" width="180" height="12"/><rect y="48" width="180" height="12"/><rect y="72" width="180" height="12"/><rect y="96" width="180" height="12"/></g><rect width="76" height="60" fill="#244a91"/><g fill="#fff"><circle cx="16" cy="14" r="3"/><circle cx="36" cy="14" r="3"/><circle cx="56" cy="14" r="3"/><circle cx="26" cy="32" r="3"/><circle cx="46" cy="32" r="3"/><circle cx="16" cy="50" r="3"/><circle cx="36" cy="50" r="3"/><circle cx="56" cy="50" r="3"/></g>`,
    fr: `<rect width="60" height="108" fill="#244a91"/><rect x="60" width="60" height="108" fill="#fff"/><rect x="120" width="60" height="108" fill="#d22f3d"/>`,
    it: `<rect width="60" height="108" fill="#168a4a"/><rect x="60" width="60" height="108" fill="#fff"/><rect x="120" width="60" height="108" fill="#d22f3d"/>`,
    br: `<rect width="180" height="108" fill="#169b62"/><path d="M90 16 164 54 90 92 16 54Z" fill="#f7d13d"/><circle cx="90" cy="54" r="25" fill="#244a91"/>`,
    gb: `<rect width="180" height="108" fill="#224c9a"/><path d="M0 0 180 108M180 0 0 108" stroke="#fff" stroke-width="24"/><path d="M0 0 180 108M180 0 0 108" stroke="#d22f3d" stroke-width="10"/><path d="M90 0v108M0 54h180" stroke="#fff" stroke-width="34"/><path d="M90 0v108M0 54h180" stroke="#d22f3d" stroke-width="18"/>`,
    de: `<rect width="180" height="36" fill="#222"/><rect y="36" width="180" height="36" fill="#d22f3d"/><rect y="72" width="180" height="36" fill="#f7d13d"/>`,
    ca: `<rect width="180" height="108" fill="#fff"/><rect width="42" height="108" fill="#d22f3d"/><rect x="138" width="42" height="108" fill="#d22f3d"/><path d="M90 23 98 45 117 37 106 57 124 62 102 70 108 88 90 76 72 88 78 70 56 62 74 57 63 37 82 45Z" fill="#d22f3d"/>`,
    kr: `<rect width="180" height="108" fill="#fff"/><path d="M90 30a24 24 0 1 1 0 48 12 12 0 1 0 0-24 12 12 0 1 1 0-24Z" fill="#d22f3d"/><path d="M90 78a24 24 0 1 1 0-48 12 12 0 1 0 0 24 12 12 0 1 1 0 24Z" fill="#244a91"/><g stroke="#222" stroke-width="5"><path d="M34 24h26M34 34h26M34 44h26M120 64h26M120 74h26M120 84h26M120 24h26M120 44h26M34 64h26M34 84h26"/></g>`,
    in: `<rect width="180" height="36" fill="#f1993a"/><rect y="36" width="180" height="36" fill="#fff"/><rect y="72" width="180" height="36" fill="#168a4a"/><circle cx="90" cy="54" r="15" fill="none" stroke="#244a91" stroke-width="4"/><circle cx="90" cy="54" r="3" fill="#244a91"/>`,
  };
  return `<svg class="flag-picture" viewBox="0 0 180 108" role="img" aria-label="はた">${flags[kind]}</svg>`;
}

function clockSvg(hour, minute) {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  const marks = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    const angle = (value * 30 - 90) * Math.PI / 180;
    const x = 100 + Math.cos(angle) * 72;
    const y = 100 + Math.sin(angle) * 72;
    return `<text x="${x}" y="${y + 6}" text-anchor="middle">${value}</text>`;
  }).join("");
  return `
    <svg class="clock-face" viewBox="0 0 200 200" role="img" aria-label="とけい">
      <circle cx="100" cy="100" r="88"></circle>
      <circle cx="100" cy="100" r="5" class="clock-center"></circle>
      <g class="clock-numbers">${marks}</g>
      <line x1="100" y1="100" x2="100" y2="48" class="clock-hand clock-hand--hour" transform="rotate(${hourAngle} 100 100)"></line>
      <line x1="100" y1="100" x2="100" y2="28" class="clock-hand clock-hand--minute" transform="rotate(${minuteAngle} 100 100)"></line>
    </svg>
  `;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function fish(id, name, rarity, color, minLevel, weight, image = "") {
  return { id, name, rarity, color, minLevel, weight, image };
}

function defaultState() {
  return {
    levels: defaultLevels(),
    looks: defaultLooks(),
    tickets: 0,
    bait: 0,
    fish: {},
  };
}

function defaultLevels() {
  return Object.fromEntries(Object.keys(subjectInfo).map((key) => [key, 1]));
}

function defaultLooks() {
  return Object.fromEntries(Object.keys(lookInfo).map((key) => [key, "auto"]));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      ...defaultState(),
      ...saved,
      levels: { ...defaultLevels(), ...(saved.levels || {}) },
      looks: { ...defaultLooks(), ...(saved.looks || {}) },
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clampLevel(level) {
  return Math.max(1, Math.min(MAX_LEVEL, level));
}

function currentBestLevel() {
  return Math.max(...Object.values(state.levels));
}

function render() {
  renderAvatar();
  renderStatus();
  renderHome();
  renderLookPicker();
  renderSubjectPicker();
  renderLevelPicker();
  renderFishBook();
  document.getElementById("place-name").textContent = places[currentBestLevel() - 1];
}

function renderAvatar() {
  const snapshot = avatarSnapshot();
  const avatar = document.getElementById("avatar");
  const buddy = document.getElementById("buddy");
  const redBuddy = document.getElementById("red-buddy");
  const worldBuddy = document.getElementById("world-buddy");
  const animalBuddy = document.getElementById("animal-buddy");
  const quizBuddy = document.getElementById("quiz-buddy");
  avatar.innerHTML = `
    <img class="character-sprite hero-sprite" src="${snapshot.hero.src}" alt="しゅじんこう" />
  `;
  redBuddy.innerHTML = `
    <img class="character-sprite red-buddy-sprite" src="${snapshot.red.src}" alt="とけいのあいぼう" />
  `;
  buddy.innerHTML = `
    <img class="character-sprite buddy-sprite" src="${snapshot.blue.src}" alt="ローマじのあいぼう" />
  `;
  worldBuddy.innerHTML = `
    <img class="character-sprite world-buddy-sprite" src="${snapshot.world.src}" alt="せかいのあいぼう" />
  `;
  animalBuddy.innerHTML = `
    <img class="character-sprite animal-buddy-sprite" src="${snapshot.animal.src}" alt="いきもののあいぼう" />
  `;
  quizBuddy.innerHTML = `
    <img class="character-sprite quiz-buddy-sprite" src="${snapshot.quiz.src}" alt="なぞなぞのあいぼう" />
  `;
}

function avatarSnapshot() {
  return buildAvatarSnapshot(false);
}

function progressSnapshot() {
  return buildAvatarSnapshot(true);
}

function buildAvatarSnapshot(ignoreLooks) {
  const math = clampLevel(state.levels.math);
  const roma = clampLevel(state.levels.roma);
  const word = clampLevel(state.levels.word);
  const world = clampLevel(state.levels.world);
  const animal = clampLevel(state.levels.animal);
  const quizLevel = clampLevel(state.levels.quiz);
  const elder = Object.values(state.levels).every((level) => level === MAX_LEVEL);
  const heroLevel = elder ? 10 : Math.min(9, math);
  const heroLook = ignoreLooks ? heroLevel : selectedLookLevel("hero", heroLevel);
  const blueLook = ignoreLooks ? roma : selectedLookLevel("blue", roma);
  const redLook = ignoreLooks ? word : selectedLookLevel("red", word);
  const worldLook = ignoreLooks ? world : selectedLookLevel("world", world);
  const animalLook = ignoreLooks ? animal : selectedLookLevel("animal", animal);
  const quizLook = ignoreLooks ? quizLevel : selectedLookLevel("quiz", quizLevel);
  return {
    hero: { key: "hero", level: heroLook, src: heroAsset(heroLook), name: "しゅじんこう" },
    blue: { key: "blue", level: blueLook, src: buddyAsset(blueLook), name: "あおい あいぼう" },
    red: { key: "red", level: redLook, src: redBuddyAsset(redLook), name: "あかい あいぼう" },
    world: { key: "world", level: worldLook, src: worldBuddyAsset(worldLook), name: "せかいの あいぼう" },
    animal: { key: "animal", level: animalLook, src: animalBuddyAsset(animalLook), name: "いきものの あいぼう" },
    quiz: { key: "quiz", level: quizLook, src: quizBuddyAsset(quizLook), name: "なぞなぞの あいぼう" },
  };
}

function selectedLookLevel(key, fallbackLevel) {
  const value = state.looks?.[key] || "auto";
  if (value === "auto") return fallbackLevel;
  const info = lookInfo[key];
  const option = info.options.find((item) => item.value === value);
  if (!option || !lookUnlocked(key, option)) return fallbackLevel;
  return option.level;
}

function lookUnlocked(key, option) {
  if (option.allMax) return Object.values(state.levels).every((level) => level === MAX_LEVEL);
  const needed = option.needs || 1;
  return clampLevel(state.levels[lookInfo[key].subject]) >= needed;
}

function heroAsset(level) {
  if (level >= 10) return "./assets/characters/hero_lv10.png";
  if (level >= 8) return "./assets/characters/hero_lv09.png";
  if (level >= 4) return "./assets/characters/hero_lv05.png";
  return "./assets/characters/hero_lv01.png";
}

function buddyAsset(level) {
  if (level >= 8) return "./assets/buddy/buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/buddy_lv05.png";
  return "./assets/buddy/buddy_lv01.png";
}

function redBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/red_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/red_buddy_lv05.png";
  return "./assets/buddy/red_buddy_lv01.png";
}

function worldBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/world_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/world_buddy_lv05.png";
  return "./assets/buddy/world_buddy_lv01.png";
}

function animalBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/animal_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/animal_buddy_lv05.png";
  return "./assets/buddy/animal_buddy_lv01.png";
}

function quizBuddyAsset(level) {
  if (level >= 8) return "./assets/buddy/quiz_buddy_lv10.png";
  if (level >= 4) return "./assets/buddy/quiz_buddy_lv05.png";
  return "./assets/buddy/quiz_buddy_lv01.png";
}

function renderStatus() {
  document.getElementById("ticket-count").textContent = state.tickets;
  document.getElementById("bait-count").textContent = state.bait;
  document.getElementById("fish-count").textContent = Object.keys(state.fish).length;
}

function renderHome() {
  for (const key of Object.keys(subjectInfo)) {
    const level = state.levels[key];
    document.getElementById(`${key}-level`).textContent = level;
    document.getElementById(`${key}-meter`).style.width = `${level * 10}%`;
  }
  const allMax = Object.values(state.levels).every((level) => level === MAX_LEVEL);
  document.getElementById("story-text").textContent = allMax
    ? "ぜんぶできた！さいごは、にこにこおじいちゃん。"
    : "すきなもんだいをえらんで、ぜんぶせいかいをめざそう。";
}

function renderLookPicker() {
  const picker = document.getElementById("look-picker");
  if (!picker) return;
  picker.innerHTML = Object.entries(lookInfo).map(([key, info]) => {
    const current = state.looks?.[key] || "auto";
    const options = [
      `<button class="look-choice ${current === "auto" ? "is-active" : ""}" data-look-key="${key}" data-look-value="auto">
        <span class="look-name">おまかせ</span>
      </button>`,
      ...info.options.map((option) => {
        const locked = !lookUnlocked(key, option);
        return `
          <button class="look-choice ${current === option.value ? "is-active" : ""}" data-look-key="${key}" data-look-value="${option.value}" ${locked ? "disabled" : ""}>
            <img src="${info.asset(option.level)}" alt="" />
            <span class="look-name">${option.label}</span>
            <span class="look-lock">${locked ? "まだ" : "えらべる"}</span>
          </button>
        `;
      }),
    ].join("");
    return `
      <article class="look-row">
        <h3>${info.label}</h3>
        <div class="look-options">${options}</div>
      </article>
    `;
  }).join("");
}

function renderSubjectPicker() {
  const picker = document.getElementById("subject-picker");
  picker.innerHTML = Object.entries(subjectInfo)
    .map(([key, info]) => `
      <button class="subject-choice ${key === activeSubject ? "is-active" : ""}" data-subject="${key}">
        <strong><span class="pick-icon">${info.icon}</span>${info.label}</strong>
        <span>いま れべる ${state.levels[key]}</span>
      </button>
    `)
    .join("");
}

function renderLevelPicker() {
  const picker = document.getElementById("level-picker");
  const currentMax = TEST_MODE ? MAX_LEVEL : state.levels[activeSubject];
  picker.innerHTML = Array.from({ length: MAX_LEVEL }, (_, index) => {
    const level = index + 1;
    const locked = level > currentMax;
    const active = level === selectedLevels[activeSubject];
    return `
      <button class="level-choice ${active ? "is-active" : ""} ${locked ? "is-locked" : ""}" data-level="${level}" ${locked ? "disabled" : ""}>
        ${level}
      </button>
    `;
  }).join("");
}

function setView(view) {
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("is-active"));
  document.getElementById(`${view}-view`).classList.add("is-active");
  const tabView = view === "look" ? "home" : view;
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === tabView);
  });
}

function startQuiz(subject) {
  activeSubject = subject;
  selectedChoice = "";
  const max = TEST_MODE ? MAX_LEVEL : state.levels[subject];
  selectedLevels[subject] = Math.min(clampLevel(selectedLevels[subject]), max);
  const level = selectedLevels[subject];
  quiz = {
    subject,
    level,
    index: 0,
    correct: 0,
    questions: buildQuestions(subject, level),
    locked: false,
  };
  renderSubjectPicker();
  renderLevelPicker();
  renderQuestion();
}

function selectLevel(level) {
  const max = TEST_MODE ? MAX_LEVEL : state.levels[activeSubject];
  selectedLevels[activeSubject] = Math.min(clampLevel(level), max);
  startQuiz(activeSubject);
}

function buildQuestions(subject, level) {
  if (subject === "math") return buildMathQuestions(level);
  if (subject === "roma") {
    return romajiLevels[level - 1].map(([kana, roma]) => ({
      type: "typing",
      prompt: kana,
      topic: "ローマじで うとう",
      hint: level <= 7 ? roma : "",
      answer: roma,
      answers: romajiAnswers(kana, roma),
    }));
  }
  if (subject === "world") return worldLevels[level - 1];
  if (subject === "animal") return animalLevels[level - 1];
  if (subject === "quiz") return quizLevels[level - 1];
  return clockLevels[level - 1];
}

function buildMathQuestions(level) {
  const specs = [
    () => add(1, 8, 1, 8, false),
    () => add(4, 9, 4, 9, true),
    () => sub(2, 10, 1, 9),
    () => add(8, 19, 1, 9, true),
    () => sub(11, 20, 1, 10),
    () => add(10, 89, 1, 9, true),
    () => sub(20, 50, 1, 9),
    () => add(10, 40, 10, 20, false),
    () => sub(21, 60, 10, 20),
    () => Math.random() > 0.5 ? add(20, 80, 1, 20, true) : sub(30, 80, 1, 20),
  ];
  return Array.from({ length: QUESTIONS_PER_LEVEL }, specs[level - 1]);
}

function romajiAnswers(kana, hint) {
  const answers = new Set(romajiKanaVariants(kana).map(normalizeAnswer));
  if (hint) answers.add(normalizeAnswer(hint));
  return [...answers];
}

function romajiKanaVariants(kana) {
  const text = kanaToHiragana(kana);
  const groups = [];
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1] || "";
    if (char === "っ") {
      const nextVariants = kanaChunkVariants(next);
      const doubled = nextVariants
        .map((item) => doubleConsonant(item))
        .filter(Boolean);
      groups.push([...new Set([...doubled, "ltu", "xtu"])]);
      continue;
    }
    if ("ゃゅょ".includes(next)) {
      groups.push(kanaChunkVariants(char + next));
      index += 1;
      continue;
    }
    groups.push(kanaChunkVariants(char));
  }
  return combineRomajiGroups(groups);
}

function kanaToHiragana(text) {
  return text.replace(/[ァ-ン]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

function kanaChunkVariants(chunk) {
  const map = {
    あ: ["a"], い: ["i"], う: ["u"], え: ["e"], お: ["o"],
    か: ["ka"], き: ["ki"], く: ["ku"], け: ["ke"], こ: ["ko"],
    さ: ["sa"], し: ["shi", "si"], す: ["su"], せ: ["se"], そ: ["so"],
    た: ["ta"], ち: ["chi", "ti"], つ: ["tsu", "tu"], て: ["te"], と: ["to"],
    な: ["na"], に: ["ni"], ぬ: ["nu"], ね: ["ne"], の: ["no"],
    は: ["ha"], ひ: ["hi"], ふ: ["fu", "hu"], へ: ["he"], ほ: ["ho"],
    ま: ["ma"], み: ["mi"], む: ["mu"], め: ["me"], も: ["mo"],
    や: ["ya"], ゆ: ["yu"], よ: ["yo"],
    ら: ["ra"], り: ["ri"], る: ["ru"], れ: ["re"], ろ: ["ro"],
    わ: ["wa"], を: ["wo"], ん: ["n", "nn"],
    が: ["ga"], ぎ: ["gi"], ぐ: ["gu"], げ: ["ge"], ご: ["go"],
    ざ: ["za"], じ: ["ji", "zi"], ず: ["zu"], ぜ: ["ze"], ぞ: ["zo"],
    だ: ["da"], ぢ: ["di"], づ: ["du"], で: ["de"], ど: ["do"],
    ば: ["ba"], び: ["bi"], ぶ: ["bu"], べ: ["be"], ぼ: ["bo"],
    ぱ: ["pa"], ぴ: ["pi"], ぷ: ["pu"], ぺ: ["pe"], ぽ: ["po"],
    ゃ: ["lya", "xya"], ゅ: ["lyu", "xyu"], ょ: ["lyo", "xyo"],
    きゃ: ["kya", "kilya", "kixya"], きゅ: ["kyu", "kilyu", "kixyu"], きょ: ["kyo", "kilyo", "kixyo"],
    しゃ: ["sha", "sya", "silya", "sixya", "shilya", "shixya"],
    しゅ: ["shu", "syu", "silyu", "sixyu", "shilyu", "shixyu"],
    しょ: ["sho", "syo", "silyo", "sixyo", "shilyo", "shixyo"],
    ちゃ: ["cha", "tya", "tilya", "tixya", "chilya", "chixya"],
    ちゅ: ["chu", "tyu", "tilyu", "tixyu", "chilyu", "chixyu"],
    ちょ: ["cho", "tyo", "tilyo", "tixyo", "chilyo", "chixyo"],
    じゃ: ["ja", "zya", "jilya", "jixya", "zilya", "zixya"],
    じゅ: ["ju", "zyu", "jilyu", "jixyu", "zilyu", "zixyu"],
    じょ: ["jo", "zyo", "jilyo", "jixyo", "zilyo", "zixyo"],
    ぎゃ: ["gya", "gilya", "gixya"], ぎゅ: ["gyu", "gilyu", "gixyu"], ぎょ: ["gyo", "gilyo", "gixyo"],
    ー: ["-"],
  };
  return map[chunk] || [chunk];
}

function doubleConsonant(value) {
  if (!/^[bcdfghjklmpqrstvwxyz]/.test(value)) return "";
  return value[0];
}

function combineRomajiGroups(groups) {
  return groups.reduce((acc, group) => {
    const next = [];
    for (const prefix of acc) {
      for (const item of group) {
        next.push(`${prefix}${item}`);
      }
    }
    return next;
  }, [""]);
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase().replace(/[‐‑‒–—―−ー]/g, "-").replace(/\s+/g, " ");
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add(aMin, aMax, bMin, bMax, carry) {
  let a;
  let b;
  do {
    a = rand(aMin, aMax);
    b = rand(bMin, bMax);
  } while (!carry && (a % 10) + (b % 10) >= 10);
  return { type: "number", prompt: `${a} + ${b} = ?`, answer: String(a + b) };
}

function sub(aMin, aMax, bMin, bMax) {
  const a = rand(aMin, aMax);
  const b = rand(bMin, Math.min(bMax, a));
  return { type: "number", prompt: `${a} - ${b} = ?`, answer: String(a - b) };
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  selectedChoice = "";
  quiz.locked = false;
  document.getElementById("answer-mark").className = "answer-mark";
  document.getElementById("quiz-subtitle").textContent = subjectInfo[quiz.subject].label;
  document.getElementById("quiz-title").textContent = `れべる ${quiz.level}`;
  document.getElementById("question-count").textContent = quiz.index + 1;
  const guide = q.type === "clock" || q.type === "clockInput" || q.type === "choice" ? q.prompt : q.topic || questionGuide(quiz.subject);
  const prompt = q.type === "clock" || q.type === "clockInput" || q.type === "choice" && q.topic ? q.topic : q.prompt;
  document.getElementById("question-guide").textContent = guide;
  document.getElementById("question-box").innerHTML = q.hint ? `${prompt}<br><small>${q.hint}</small>` : prompt;
  document.getElementById("feedback").textContent = "";
  document.getElementById("check-answer").hidden = false;
  document.getElementById("next-question").hidden = true;
  setResultButtons(false);
  const answerBox = document.getElementById("answer-box");
  if (q.type === "choice" || q.type === "clock") {
    answerBox.innerHTML = `<div class="choice-grid">${shuffle(q.choices).map((choice) => `<button class="choice" data-choice="${choice}">${choice}</button>`).join("")}</div>`;
  } else {
    const inputMode = q.type === "number" || q.type === "clockInput" ? "numeric" : "latin";
    answerBox.innerHTML = `<input id="answer-input" class="answer-input" inputmode="${inputMode}" autocomplete="off" />`;
    document.getElementById("answer-input").focus();
  }
}

function questionGuide(subject) {
  if (subject === "math") return "こたえを すうじで いれよう";
  if (subject === "roma") return "ローマじで うとう";
  return "あうものを えらぼう";
}

function checkAnswer() {
  if (!quiz || quiz.locked) return;
  const q = quiz.questions[quiz.index];
  const value = q.type === "choice" || q.type === "clock"
    ? selectedChoice
    : document.getElementById("answer-input").value.trim().toLowerCase().replace(/\s+/g, " ");
  if (!value) {
    document.getElementById("feedback").textContent = "こたえをいれてね。";
    return;
  }
  const ok = q.answers ? q.answers.includes(normalizeAnswer(value)) : value === q.answer;
  if (ok) quiz.correct += 1;
  quiz.locked = true;
  showAnswerMark(ok);
  document.getElementById("feedback").textContent = ok ? "せいかい！" : "ちがうよ。こたえは " + q.answer;
  document.getElementById("check-answer").hidden = true;
  document.getElementById("next-question").hidden = false;
}

function showAnswerMark(ok) {
  const mark = document.getElementById("answer-mark");
  mark.textContent = ok ? "○" : "×";
  mark.className = `answer-mark ${ok ? "is-correct" : "is-wrong"} is-showing`;
  setTimeout(() => {
    mark.classList.remove("is-showing");
  }, 900);
}

function nextQuestion() {
  if (!quiz) return;
  if (quiz.index < QUESTIONS_PER_LEVEL - 1) {
    quiz.index += 1;
    renderQuestion();
    return;
  }
  finishQuiz();
}

function finishQuiz() {
  const clear = quiz.correct === QUESTIONS_PER_LEVEL;
  const feedback = document.getElementById("feedback");
  const beforeAvatar = progressSnapshot();
  document.getElementById("check-answer").hidden = true;
  document.getElementById("next-question").hidden = true;
  document.getElementById("answer-box").innerHTML = "";
  document.getElementById("question-box").textContent = `${quiz.correct}/5`;
  const finishedSubject = quiz.subject;
  const finishedLevel = quiz.level;
  if (clear) {
    const clearedLatestLevel = quiz.level === state.levels[quiz.subject];
    if (clearedLatestLevel && state.levels[quiz.subject] < MAX_LEVEL) {
      state.levels[quiz.subject] += 1;
    }
    const reward = ticketReward(finishedLevel);
    state.tickets += reward;
    feedback.textContent = `すごい！ぜんぶできた！つりけんを ${reward}まい もらったよ。`;
    setResultButtons(true, finishedSubject, finishedLevel, state.levels[finishedSubject]);
  } else {
    state.bait += 1;
    while (state.bait >= 3) {
      state.bait -= 3;
      state.tickets += 1;
    }
    feedback.textContent = resultMessage(quiz.correct);
    setResultButtons(true, finishedSubject, finishedLevel, state.levels[finishedSubject]);
  }
  saveState();
  render();
  if (clear) showEvolutionIfChanged(beforeAvatar, progressSnapshot());
}

function ticketReward(level) {
  if (level >= 10) return 5;
  if (level >= 7) return 3;
  if (level >= 4) return 2;
  return 1;
}

function showEvolutionIfChanged(before, after) {
  const changed = ["hero", "blue", "red", "world", "animal", "quiz"].find((key) => before[key].src !== after[key].src);
  if (!changed) return;
  const modal = document.getElementById("evolution-modal");
  document.getElementById("evolution-before").src = before[changed].src;
  document.getElementById("evolution-after").src = after[changed].src;
  document.getElementById("evolution-title").textContent = `${after[changed].name}が ぱわーあっぷ！`;
  document.getElementById("evolution-message").textContent = `れべる ${after[changed].level} の すがたに なったよ。`;
  modal.hidden = false;
  modal.classList.remove("is-closing");
}

function setResultButtons(show, subject = activeSubject, finishedLevel = selectedLevels[activeSubject], maxLevel = state.levels[activeSubject]) {
  const retry = document.getElementById("retry-level");
  const next = document.getElementById("next-level");
  const fish = document.getElementById("go-fishing");
  retry.hidden = !show;
  fish.hidden = !show;
  next.hidden = !show || finishedLevel >= maxLevel;
  retry.dataset.subject = subject;
  retry.dataset.retryLevel = String(finishedLevel);
  next.dataset.subject = subject;
  next.dataset.nextLevel = String(Math.min(finishedLevel + 1, MAX_LEVEL));
  delete retry.dataset.level;
  delete next.dataset.level;
}

function resultMessage(correct) {
  if (correct === 4) return "おしい！あとすこし！もういちどちゃれんじしてみよう！";
  if (correct === 3) return "いいかんじ！つぎはもっとできるよ！";
  if (correct > 0) return "だいじょうぶ！ゆっくりやってみよう！";
  return "はじめてのもんだいはむずかしいね。いっしょにもういちど！";
}

function goFishing() {
  const message = document.getElementById("fishing-message");
  const button = document.getElementById("fish-button");
  const stage = document.getElementById("fishing-stage");
  if (pendingCatch) {
    pullFishingLine();
    return;
  }
  if (fishingBusy) return;
  if (state.tickets <= 0) {
    message.textContent = "つりけんがないよ。まなびにいこう。";
    return;
  }
  fishingBusy = true;
  state.tickets -= 1;
  const caught = pickFish();
  saveState();
  render();
  stage.querySelector(".caught-fish")?.remove();
  stage.querySelector(".splash")?.remove();
  stage.classList.remove("is-rare", "is-super", "is-legend");
  message.textContent = "うきが ゆれてるよ...";
  button.textContent = "まってね";
  button.disabled = true;

  setTimeout(() => {
    stage.classList.add("is-biting");
    const splash = document.createElement("div");
    splash.className = "splash";
    stage.appendChild(splash);
    applyFishingRarityClass(stage, caught);
    fishingPullsLeft = fishingPullCount(caught);
    message.textContent = biteMessage(caught);
    button.textContent = "ひっぱる";
    button.disabled = false;
    pendingCatch = caught;
  }, 900 + Math.random() * 700);
}

function pullFishingLine() {
  const message = document.getElementById("fishing-message");
  const button = document.getElementById("fish-button");
  const stage = document.getElementById("fishing-stage");
  fishingPullsLeft -= 1;
  stage.classList.remove("is-pulled");
  void stage.offsetWidth;
  stage.classList.add("is-pulled");
  if (fishingPullsLeft <= 0) {
    finishFishing(pendingCatch);
    return;
  }
  message.textContent = pullMessage(fishingPullsLeft);
  button.textContent = "ひっぱる";
}

function finishFishing(caught) {
  const message = document.getElementById("fishing-message");
  const button = document.getElementById("fish-button");
  const stage = document.getElementById("fishing-stage");
  stage.classList.remove("is-biting", "is-pulled", "is-rare", "is-super", "is-legend");
  stage.querySelector(".splash")?.remove();
  state.fish[caught.id] = (state.fish[caught.id] || 0) + 1;
  message.textContent = isRareFish(caught) ? `${caught.name} だ！やったね！` : `${caught.name} がつれた！`;
  showCaughtFish(caught);
  saveState();
  render();
  button.textContent = "つる";
  fishingBusy = false;
  pendingCatch = null;
  fishingPullsLeft = 0;
}

function isRareFish(item) {
  return item.rarity === "レア" || item.rarity === "スーパー レア" || item.rarity === "でんせつ";
}

function fishingPullCount(item) {
  if (item.rarity === "でんせつ") return 4;
  if (item.rarity === "スーパー レア") return 3;
  if (item.rarity === "レア") return 2;
  return 1;
}

function applyFishingRarityClass(stage, item) {
  if (item.rarity === "でんせつ") {
    stage.classList.add("is-legend");
    return;
  }
  if (item.rarity === "スーパー レア") {
    stage.classList.add("is-super");
    return;
  }
  if (item.rarity === "レア") stage.classList.add("is-rare");
}

function biteMessage(item) {
  if (item.rarity === "でんせつ") return "ものすごい ひきだ！かなり おおものだ！";
  if (item.rarity === "スーパー レア") return "すごい ひきだ！がんばれ！";
  if (item.rarity === "レア") return "おおきな ひきだ！ひっぱれ！";
  return "きた！ひっぱれ！";
}

function pullMessage(pullsLeft) {
  if (pullsLeft >= 3) return "まだまだ！ぜんぜん あがらない！";
  if (pullsLeft === 2) return "つよいぞ！かなり おおものだ！";
  return "あとすこし！まだ ひっぱれ！";
}

function pickFish() {
  const level = currentBestLevel();
  const available = fishList.filter((item) => item.minLevel <= level);
  const weighted = available.map((item) => ({
    item,
    weight: fishDrawWeight(item),
  }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let draw = Math.random() * total;
  for (const entry of weighted) {
    draw -= entry.weight;
    if (draw <= 0) return entry.item;
  }
  return available[0];
}

function fishDrawWeight(item) {
  const seen = state.fish[item.id] || 0;
  if (seen > 0) return item.weight;
  if (item.rarity === "よくでる") return item.weight * 8;
  if (item.rarity === "たまにでる") return item.weight * 6;
  if (item.rarity === "レア") return item.weight * 2;
  if (item.rarity === "スーパー レア") return item.weight * 1.7;
  return item.weight * 1.5;
}

function showCaughtFish(fishItem) {
  const stage = document.getElementById("fishing-stage");
  stage.querySelector(".caught-fish")?.remove();
  const wrap = document.createElement("div");
  wrap.className = `caught-fish ${isRareFish(fishItem) ? "is-rare" : ""}`;
  wrap.innerHTML = fishArt(fishItem);
  stage.appendChild(wrap);
}

function renderFishBook() {
  const book = document.getElementById("fish-book");
  book.innerHTML = fishList.map((item) => {
    const count = state.fish[item.id] || 0;
    const locked = count === 0;
    return `
      <article class="fish-card ${locked ? "is-locked" : ""}">
        <div class="fish-thumb">${fishArt(item)}</div>
        <strong>${locked ? "？？？" : item.name}</strong>
        <span>${locked ? "まだだよ" : `${item.rarity} ${count}`}</span>
      </article>
    `;
  }).join("");
}

function fishArt(item) {
  if (item.image) {
    return `<img class="fish-img" src="${item.image}" alt="${item.name}" />`;
  }
  return fishSvg(item);
}

function fishSvg(item) {
  const rare = isRareFish(item);
  return `<svg class="fish-svg" viewBox="0 0 180 95" role="img" aria-label="${item.name}">
    <path d="M18 48l34-24v48z" fill="${item.color}" stroke="#234" stroke-width="5" />
    <ellipse cx="98" cy="48" rx="58" ry="32" fill="${item.color}" stroke="#234" stroke-width="5" />
    <path d="M94 20l18-16 12 24" fill="${item.color}" stroke="#234" stroke-width="5" />
    <circle cx="132" cy="40" r="5" fill="#182633" />
    <path d="M144 53q-12 10-25 0" fill="none" stroke="#234" stroke-width="4" stroke-linecap="round" />
    <path d="M68 34h32M62 48h44M70 62h30" stroke="rgba(255,255,255,.65)" stroke-width="5" stroke-linecap="round" />
    ${rare ? '<path d="M92 12l8 14 15 2-11 10 3 15-15-7-14 7 3-15-11-10 15-2z" fill="#fff176" stroke="#234" stroke-width="3" />' : ''}
  </svg>`;
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".reset-control")) resetArmed = false;

  const tab = event.target.closest(".tab");
  if (tab) setView(tab.dataset.view);

  const go = event.target.closest("[data-go]");
  if (go) setView(go.dataset.go);

  const homeSubject = event.target.closest("[data-home-subject]");
  if (homeSubject) {
    setView("study");
    startQuiz(homeSubject.dataset.homeSubject);
  }

  const subject = event.target.closest("[data-subject]");
  if (subject) startQuiz(subject.dataset.subject);

  const level = event.target.closest("[data-level]");
  if (level) selectLevel(Number(level.dataset.level));

  const look = event.target.closest("[data-look-key]");
  if (look && !look.disabled) {
    state.looks[look.dataset.lookKey] = look.dataset.lookValue;
    saveState();
    render();
  }

  const choice = event.target.closest("[data-choice]");
  if (choice) {
    selectedChoice = choice.dataset.choice;
    document.querySelectorAll(".choice").forEach((button) => button.classList.remove("is-selected"));
    choice.classList.add("is-selected");
  }
});

document.getElementById("check-answer").addEventListener("click", checkAnswer);
document.getElementById("next-question").addEventListener("click", nextQuestion);
document.getElementById("fish-button").addEventListener("click", goFishing);
document.getElementById("retry-level").addEventListener("click", () => {
  selectedLevels[activeSubject] = quiz ? quiz.level : selectedLevels[activeSubject];
  startQuiz(activeSubject);
});
document.getElementById("next-level").addEventListener("click", () => {
  const level = Number(document.getElementById("next-level").dataset.nextLevel);
  selectLevel(level);
});
document.getElementById("go-fishing").addEventListener("click", () => setView("fish"));
document.getElementById("look-auto").addEventListener("click", () => {
  state.looks = defaultLooks();
  saveState();
  render();
});
document.getElementById("close-evolution").addEventListener("click", () => {
  const modal = document.getElementById("evolution-modal");
  modal.classList.add("is-closing");
  setTimeout(() => {
    modal.hidden = true;
    modal.classList.remove("is-closing");
  }, 180);
});
document.querySelectorAll(".reset-control").forEach((control) => control.addEventListener("click", () => {
  const button = control;
  if (!resetArmed) {
    resetArmed = true;
    document.querySelectorAll(".reset-control").forEach((item) => {
      item.textContent = "データをけしていいの？";
    });
    setTimeout(() => {
      if (!resetArmed) return;
      resetArmed = false;
      document.querySelectorAll(".reset-control").forEach((item) => {
        item.textContent = "さいしょから";
      });
    }, 2200);
    return;
  }
  resetArmed = false;
  document.querySelectorAll(".reset-control").forEach((item) => {
    item.textContent = "さいしょから";
  });
  state = defaultState();
  selectedLevels = defaultLevels();
  quiz = null;
  saveState();
  startQuiz(activeSubject);
  render();
}));

document.addEventListener("keydown", (event) => {
  const homeSubject = event.target.closest?.("[data-home-subject]");
  if ((event.key === "Enter" || event.key === " ") && homeSubject) {
    event.preventDefault();
    setView("study");
    startQuiz(homeSubject.dataset.homeSubject);
    return;
  }
  if (event.key !== "Enter") return;
  if (document.getElementById("study-view").classList.contains("is-active")) {
    if (!document.getElementById("check-answer").hidden) checkAnswer();
    else if (!document.getElementById("next-question").hidden) nextQuestion();
  }
  if (document.getElementById("fish-view").classList.contains("is-active")) {
    const button = document.getElementById("fish-button");
    if (!button.disabled) goFishing();
  }
});

render();
startQuiz("math");
