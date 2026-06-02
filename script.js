const MAX_LEVEL = 20;
const QUESTIONS_PER_LEVEL = 5;
const STORAGE_KEY = "tsurijima-sushi-lane-v1";
const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";

const plateClassByLevel = (level) => {
  if (level >= 20) return "rainbow";
  if (level >= 15) return "gold";
  if (level >= 10) return "silver";
  if (level >= 5) return "blue";
  return "white";
};

const mathReward = (level) => {
  if (level >= 20) return 1000;
  if (level >= 15) return 300;
  if (level >= 10) return 100;
  if (level >= 5) return 50;
  return 20;
};

const ticketReward = (level) => {
  if (level >= 20) return 20;
  if (level >= 15) return 10;
  if (level >= 10) return 5;
  if (level >= 5) return 3;
  return 1;
};

const rods = [
  { id: "wood", name: "木のつりざお", mark: "I", price: 0, math: 1, power: 1 },
  { id: "silver", name: "銀のつりざお", mark: "II", price: 300, math: 5, power: 2 },
  { id: "gold", name: "金のつりざお", mark: "III", price: 800, math: 10, power: 3 },
  { id: "star", name: "星のつりざお", mark: "IV", price: 1800, math: 15, power: 4 },
  { id: "rainbow", name: "虹のつりざお", mark: "V", price: 3500, math: 20, power: 5 },
];

const places = [
  { id: "pond", name: "はじまりの池", roma: 1 },
  { id: "river", name: "キラキラ川", roma: 5 },
  { id: "coast", name: "青空海岸", roma: 10 },
  { id: "deep", name: "ふしぎ深海", roma: 15 },
  { id: "phantom", name: "まぼろし島", roma: 20 },
];

const buddyStages = [
  { min: 1, id: "egg", name: "ころりんエッグ", title: "ころりんエッグの ようすが……！" },
  { min: 5, id: "chick", name: "ぴよペン", title: "ぴよペンに しんかした！" },
  { min: 10, id: "cap", name: "キャップペン", title: "キャップペンに しんかした！" },
  { min: 15, id: "pirate", name: "かいぞくペン", title: "かいぞくペンに しんかした！" },
  { min: 20, id: "king", name: "こおりキング", title: "こおりキングに しんかした！" },
];

const fishImage = (file) => `./assets/fish/${file}.png`;
const fish = (id, name, rarity, place, color, image = "") => ({ id, name, rarity, place, color, image });

const fishList = [
  fish("medaka", "ひかりメダカ", "normal", "pond", "#7cc7e6"),
  fish("funna", "まるフナ", "normal", "pond", "#9bcf72"),
  fish("tanago", "ももタナゴ", "normal", "pond", "#ff9fb3"),
  fish("dojo", "にょろドジョウ", "normal", "pond", "#a87954"),
  fish("koi_baby", "こいこいコイ", "normal", "pond", "#f6c85f"),
  fish("kingyo", "こがねキンギョ", "rare", "pond", "#f6c445", fishImage("rare_kingyo")),
  fish("niji_masu", "きらきらニジマス", "rare", "river", "#76d7c4", fishImage("rare_nijimasu")),
  fish("ayu", "ぎんいろアユ", "rare", "river", "#d7f3ff", fishImage("rare_ayu")),
  fish("yamame", "しまヤマメ", "normal", "river", "#8db2c8"),
  fish("hasu", "はねハス", "normal", "river", "#80d6a8"),
  fish("kawaebi", "ぴょんエビ", "normal", "river", "#ff9f7d"),
  fish("hotaru", "ほたるフィッシュ", "rare", "river", "#ffe66d"),
  fish("tobiuo", "あおぞらトビウオ", "rare", "coast", "#5cc8ff", fishImage("rare_tobiuo")),
  fish("ishidai", "しましまイシダイ", "rare", "coast", "#d7d2c6", fishImage("rare_ishidai")),
  fish("fugu", "さくらフグ", "rare", "coast", "#ff9fc4", fishImage("rare_fugu")),
  fish("iwashi", "きらめきイワシ", "normal", "coast", "#a8d8ea"),
  fish("aji", "はやてアジ", "normal", "coast", "#7aa7c7"),
  fish("tai_small", "こだいタイ", "normal", "coast", "#ff8f78"),
  fish("manta", "ほしぞらマンタ", "legend", "coast", "#6c7fd8", fishImage("super_manta")),
  fish("unagi", "よぞらウナギ", "rare", "deep", "#4969c9", fishImage("rare_unagi")),
  fish("kurage", "ひかりクラゲ", "legend", "deep", "#8be8ff", fishImage("super_kurage")),
  fish("shark", "ぎんがザメ", "legend", "deep", "#7b8ca8", fishImage("super_shark")),
  fish("salmon", "オーロラサケ", "legend", "deep", "#ff8fb3", fishImage("super_salmon")),
  fish("ankou", "ランプアンコウ", "normal", "deep", "#6f82a6"),
  fish("ika", "すいすいイカ", "normal", "deep", "#d9c6ff"),
  fish("shell", "うたうかい", "normal", "deep", "#ffd0e0"),
  fish("koi_legend", "にじいろコイ", "legend", "phantom", "#f6a6c9", fishImage("legend_koi")),
  fish("tai_legend", "おうごんタイ", "legend", "phantom", "#ffd166", fishImage("legend_tai")),
  fish("coelacanth", "まぼろしシーラカンス", "legend", "phantom", "#5f6caf", fishImage("legend_coelacanth")),
  fish("maguro", "おうじゃマグロ", "legend", "phantom", "#2f6fb4", fishImage("legend_maguro")),
  fish("ryugu", "りゅうぐうのつかい", "mythic", "phantom", "#f2f0ff", fishImage("legend_ryugu")),
  fish("moon", "つきあかりフィッシュ", "rare", "phantom", "#c5d8ff"),
  fish("sun", "たいようフィッシュ", "rare", "phantom", "#ffcf5a"),
  fish("star", "ながれぼしフィッシュ", "legend", "phantom", "#b7a7ff"),
  fish("crystal", "クリスタルフィッシュ", "mythic", "phantom", "#9ff3ff"),
  fish("candy", "キャンディフィッシュ", "normal", "pond", "#ffb3d1"),
  fish("leaf", "このはフィッシュ", "normal", "river", "#7fd38d"),
  fish("cloud", "くもフィッシュ", "normal", "coast", "#d6f1ff"),
  fish("snow", "ゆきフィッシュ", "rare", "deep", "#e8fbff"),
  fish("rainbow", "にじのぬし", "mythic", "phantom", "#c17bff"),
];

const defaultSave = () => ({
  mathLevel: 1,
  romaLevel: 1,
  coins: 0,
  tickets: 0,
  ownedRods: ["wood"],
  equippedRod: "wood",
  currentPlace: "pond",
  fish: {},
  lastBuddyStage: "egg",
  endingSeen: false,
});

let save = loadSave();
let currentView = "home";
let selectedSubject = "math";
let selectedLevel = 1;
let quiz = null;
let selectedChoice = "";
let resetArmed = false;
let fishingBusy = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadSave() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultSave(), ...parsed, fish: parsed?.fish || {} };
  } catch {
    return defaultSave();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

function clampLevel(level) {
  return Math.max(1, Math.min(MAX_LEVEL, level));
}

function maxPlayableLevel(subject) {
  if (TEST_MODE) return MAX_LEVEL;
  return subject === "math" ? save.mathLevel : save.romaLevel;
}

function completedLevel(subject, level) {
  const key = subject === "math" ? "mathLevel" : "romaLevel";
  if (save[key] < MAX_LEVEL && level >= save[key]) {
    save[key] = clampLevel(level + 1);
  }
}

function getBuddyStage(mathLevel = save.mathLevel) {
  return buddyStages.filter((stage) => mathLevel >= stage.min).at(-1);
}

function currentHeroAsset() {
  if (save.mathLevel >= 20) return "./assets/characters/hero_lv10.png";
  if (save.mathLevel >= 15) return "./assets/characters/hero_lv09.png";
  if (save.mathLevel >= 8) return "./assets/characters/hero_lv05.png";
  return "./assets/characters/hero_lv01.png";
}

function renderPenguin(target, stageId, glow = false) {
  target.className = `penguin ${stageId}${glow ? " glow" : ""}`;
  target.innerHTML = stageId === "egg" ? "" : '<span class="eye-left"></span><span class="eye-right"></span><span class="beak"></span><span class="hat"></span>';
}

function renderAll() {
  renderWallet();
  renderHome();
  renderTabs();
  renderLevelList();
  renderSushiLane();
  renderPlaces();
  renderRods();
  renderBook();
}

function renderWallet() {
  $("#coin-count").textContent = save.coins;
  $("#ticket-count").textContent = save.tickets;
  $("#fish-count").textContent = `${caughtFishCount()}/40`;
}

function renderHome() {
  $("#home-math-level").textContent = save.mathLevel;
  $("#home-roma-level").textContent = save.romaLevel;
  $("#math-meter").style.width = `${(save.mathLevel / MAX_LEVEL) * 100}%`;
  $("#roma-meter").style.width = `${(save.romaLevel / MAX_LEVEL) * 100}%`;
  $("#home-rod").textContent = rods.find((rod) => rod.id === save.equippedRod).name;
  $("#home-place").textContent = `いけるつりば: ${unlockedPlaces().at(-1).name}`;
  const buddy = getBuddyStage();
  $("#buddy-name").textContent = buddy.name;
  renderPenguin($("#buddy-art"), buddy.id);
  const heroAvatar = $("#hero-avatar");
  if (heroAvatar) heroAvatar.src = currentHeroAsset();
  const homeBuddy = $("#home-buddy-copy");
  if (homeBuddy) renderPenguin(homeBuddy, buddy.id);
}

function renderTabs() {
  $$(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === currentView));
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.id === `${currentView}-view`));
}

function renderLevelList() {
  const list = $("#level-list");
  list.innerHTML = "";
  for (let level = 1; level <= MAX_LEVEL; level += 1) {
    const button = document.createElement("button");
    button.className = "level-button";
    button.textContent = `Lv${level}`;
    button.disabled = level > maxPlayableLevel(selectedSubject);
    button.classList.toggle("is-active", level === selectedLevel);
    button.classList.toggle("is-locked", button.disabled);
    button.addEventListener("click", () => {
      selectedLevel = level;
      startQuiz();
    });
    list.appendChild(button);
  }
  $$(".subject-button").forEach((button) => button.classList.toggle("is-active", button.dataset.subject === selectedSubject));
}

function renderSushiLane() {
  const lane = $("#sushi-lane");
  lane.innerHTML = "";
  const states = quiz?.plates || Array(QUESTIONS_PER_LEVEL).fill("");
  states.forEach((state, index) => {
    const plate = document.createElement("div");
    const current = quiz && index === quiz.index && !state && !quiz.finished ? "current incoming" : "";
    plate.className = `sushi-plate ${plateClassByLevel(selectedLevel)} ${state} ${current}`;
    plate.innerHTML = `<span>${index + 1}</span>`;
    lane.appendChild(plate);
  });
}

function unlockedPlaces() {
  return places.filter((place) => save.romaLevel >= place.roma);
}

function renderPlaces() {
  const list = $("#place-list");
  list.innerHTML = "";
  unlockedPlaces().forEach((place) => {
    const button = document.createElement("button");
    button.className = "place-button";
    button.classList.toggle("is-active", save.currentPlace === place.id);
    button.innerHTML = `<strong>${place.name}</strong><br><span>ローマじ Lv${place.roma}</span>`;
    button.addEventListener("click", () => {
      save.currentPlace = place.id;
      persist();
      renderPlaces();
    });
    list.appendChild(button);
  });
  if (!unlockedPlaces().some((place) => place.id === save.currentPlace)) {
    save.currentPlace = unlockedPlaces().at(-1).id;
  }
  $("#fish-place-name").textContent = places.find((place) => place.id === save.currentPlace).name;
}

function renderRods() {
  const list = $("#rod-list");
  list.innerHTML = "";
  rods.forEach((rod) => {
    const owned = save.ownedRods.includes(rod.id);
    const canBuy = save.coins >= rod.price && save.mathLevel >= rod.math;
    const card = document.createElement("div");
    card.className = "rod-card";
    const actionLabel = owned ? (save.equippedRod === rod.id ? "そうび中" : "そうび") : "かう";
    card.innerHTML = `
      <div>
        <h3>${rod.name}</h3>
        <p>${rod.price}コイン / さんすうLv${rod.math}</p>
      </div>
      <div class="rod-mark">${rod.mark}</div>
      <button class="${owned ? "secondary" : "primary"}" ${(!owned && !canBuy) || save.equippedRod === rod.id ? "disabled" : ""}>${actionLabel}</button>
    `;
    card.querySelector("button").addEventListener("click", () => buyOrEquipRod(rod));
    list.appendChild(card);
  });
}

function renderBook() {
  const count = caughtFishCount();
  $("#book-title").textContent = `${count}/40`;
  const book = $("#fish-book");
  book.innerHTML = "";
  fishList.forEach((item) => {
    const caught = save.fish[item.id] || 0;
    const card = document.createElement("div");
    card.className = `fish-card ${caught ? "" : "locked"}`;
    card.innerHTML = `
      <div class="fish-art">${caught ? fishArt(item) : "?"}</div>
      <strong>${caught ? item.name : "???"}</strong>
      <p class="rarity-${item.rarity}">${caught ? rarityLabel(item.rarity) : "まだ"}</p>
      <p>${caught ? `${caught}ひき` : places.find((place) => place.id === item.place).name}</p>
    `;
    book.appendChild(card);
  });
}

function fishArt(item) {
  if (item.image) return `<img src="${item.image}" alt="${item.name}" />`;
  return `<div class="css-fish" style="--fish-color:${item.color}"></div>`;
}

function rarityLabel(rarity) {
  return {
    normal: "ふつう",
    rare: "レア",
    legend: "でんせつ",
    mythic: "さいこうレア",
  }[rarity];
}

function caughtFishCount() {
  return fishList.filter((item) => save.fish[item.id] > 0).length;
}

function buyOrEquipRod(rod) {
  if (save.ownedRods.includes(rod.id)) {
    save.equippedRod = rod.id;
    $("#shop-message").textContent = `${rod.name}を そうびしたよ。`;
  } else if (save.coins >= rod.price && save.mathLevel >= rod.math) {
    save.coins -= rod.price;
    save.ownedRods.push(rod.id);
    save.equippedRod = rod.id;
    $("#shop-message").textContent = `${rod.name}を かったよ。`;
  }
  persist();
  renderAll();
}

function startQuiz() {
  selectedLevel = Math.min(selectedLevel, maxPlayableLevel(selectedSubject));
  quiz = {
    subject: selectedSubject,
    level: selectedLevel,
    index: 0,
    correct: 0,
    plates: Array(QUESTIONS_PER_LEVEL).fill(""),
    questions: buildQuestions(selectedSubject, selectedLevel),
    finished: false,
  };
  selectedChoice = "";
  $("#feedback").textContent = "";
  $("#retry-level").hidden = true;
  $("#next-question").hidden = true;
  $("#check-answer").hidden = false;
  $("#quiz-subject").textContent = selectedSubject === "math" ? "さんすう" : "ローマじ";
  $("#quiz-level").textContent = `Lv ${selectedLevel}`;
  renderLevelList();
  renderQuestion();
}

function renderQuestion() {
  const question = quiz.questions[quiz.index];
  $("#quiz-score").textContent = `${quiz.correct}/5`;
  $("#question-guide").textContent = question.guide;
  $("#question-text").textContent = question.prompt;
  const area = $("#answer-area");
  area.innerHTML = "";
  selectedChoice = "";

  if (question.type === "choice") {
    const grid = document.createElement("div");
    grid.className = "choice-grid";
    question.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", () => {
        selectedChoice = choice;
        grid.querySelectorAll("button").forEach((item) => item.classList.remove("is-selected"));
        button.classList.add("is-selected");
      });
      grid.appendChild(button);
    });
    area.appendChild(grid);
  } else {
    const input = document.createElement("input");
    input.id = "answer-input";
    input.inputMode = question.inputMode || "text";
    input.autocomplete = "off";
    input.enterKeyHint = "done";
    input.addEventListener("keydown", handleLearnEnter);
    area.appendChild(input);
    setTimeout(() => input.focus(), 0);
  }
  renderSushiLane();
}

function checkAnswer() {
  if (!quiz || quiz.finished) return;
  if (quiz.plates[quiz.index]) return;
  const question = quiz.questions[quiz.index];
  const rawAnswer = question.type === "choice" ? selectedChoice : $("#answer-input").value;
  const ok = normalize(rawAnswer) === normalize(question.answer);
  quiz.plates[quiz.index] = ok ? "done" : "miss";
  if (ok) quiz.correct += 1;
  $("#feedback").textContent = ok ? "せいかい！おさら クリア！" : `おしい！こたえは ${question.answer}`;
  $("#check-answer").hidden = true;
  $("#next-question").hidden = quiz.index >= QUESTIONS_PER_LEVEL - 1;
  renderSushiLane();
  if (quiz.index >= QUESTIONS_PER_LEVEL - 1) finishQuiz();
}

function nextQuestion() {
  quiz.index += 1;
  $("#feedback").textContent = "";
  $("#next-question").hidden = true;
  $("#check-answer").hidden = false;
  renderQuestion();
}

function handleLearnEnter(event) {
  if (event.key !== "Enter" || currentView !== "learn") return;
  event.preventDefault();
  event.stopPropagation();
  if (!$("#next-question").hidden) {
    nextQuestion();
    return;
  }
  if (!$("#check-answer").hidden) {
    checkAnswer();
    return;
  }
  if (!$("#retry-level").hidden) {
    startQuiz();
  }
}

function finishQuiz() {
  quiz.finished = true;
  $("#quiz-score").textContent = `${quiz.correct}/5`;
  $("#retry-level").hidden = false;
  if (quiz.subject === "math") finishMath();
  else finishRoma();
  persist();
  renderAll();
}

function finishMath() {
  if (quiz.correct === QUESTIONS_PER_LEVEL) {
    const before = getBuddyStage().id;
    const reward = mathReward(quiz.level);
    save.coins += reward;
    completedLevel("math", quiz.level);
    $("#feedback").textContent = `ぜんぶできた！${reward}コイン もらったよ。`;
    const after = getBuddyStage().id;
    if (before !== after) showEvolution(after);
  } else if (quiz.correct > 0) {
    const small = Math.max(5, Math.floor(mathReward(quiz.level) * 0.15));
    save.coins += small;
    $("#feedback").textContent = `${quiz.correct}もん できた！${small}コイン もらったよ。`;
  } else {
    $("#feedback").textContent = "だいじょうぶ。もういちど やってみよう。";
  }
}

function finishRoma() {
  if (quiz.correct === QUESTIONS_PER_LEVEL) {
    const reward = ticketReward(quiz.level);
    save.tickets += reward;
    completedLevel("roma", quiz.level);
    $("#feedback").textContent = `ぜんぶできた！チケット ${reward}まい もらったよ。`;
  } else if (quiz.correct > 0) {
    save.tickets += 1;
    $("#feedback").textContent = `${quiz.correct}もん できた！チケット 1まい もらったよ。`;
  } else {
    $("#feedback").textContent = "チケットは つぎの おたのしみ。";
  }
}

function normalize(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

function buildQuestions(subject, level) {
  return subject === "math" ? buildMathQuestions(level) : buildRomaQuestions(level);
}

function buildMathQuestions(level) {
  const questions = [];
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i += 1) {
    questions.push(makeMathQuestion(level, i));
  }
  return questions;
}

function makeMathQuestion(level, i) {
  const a = ((level * 3 + i * 4) % 9) + 1;
  const b = ((level * 5 + i * 3) % 9) + 1;
  let left = a;
  let right = b;
  let answer = a + b;
  let sign = "+";

  if (level <= 4) {
    left = ((level + i * 2) % 8) + 1;
    right = ((level + i) % Math.max(2, 10 - left)) + 1;
    answer = left + right;
  } else if (level <= 8) {
    left = 10 + ((level * 2 + i * 3) % 10);
    right = ((level + i * 4) % 9) + 1;
    answer = left + right;
  } else if (level <= 12) {
    sign = "-";
    right = ((level + i * 2) % 9) + 1;
    answer = 6 + ((level * 3 + i * 5) % 14);
    left = answer + right;
  } else if (level <= 16) {
    left = 20 + ((level * 4 + i * 7) % 50);
    right = 10 + ((level * 5 + i * 4) % 30);
    answer = left + right;
  } else if (level <= 19) {
    sign = "-";
    right = 12 + ((level * 3 + i * 6) % 45);
    answer = 20 + ((level * 5 + i * 7) % 60);
    left = answer + right;
  } else {
    const patterns = [
      [128, "+", 247],
      [603, "-", 278],
      [36, "+", 48, "+", 57],
      [720, "-", 389],
      [195, "+", 286],
    ];
    const p = patterns[i];
    const prompt = p.length === 5 ? `${p[0]} ${p[1]} ${p[2]} ${p[3]} ${p[4]}` : `${p[0]} ${p[1]} ${p[2]}`;
    const ans = p.length === 5 ? p[0] + p[2] + p[4] : p[1] === "+" ? p[0] + p[2] : p[0] - p[2];
    return { type: "input", guide: "こたえを すうじで いれてね", prompt, answer: ans, inputMode: "numeric" };
  }

  return { type: "input", guide: "こたえを すうじで いれてね", prompt: `${left} ${sign} ${right}`, answer, inputMode: "numeric" };
}

const romaBank = [
  [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]],
  [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]],
  [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]],
  [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]],
  [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]],
  [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]],
  [["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"]],
  [["やま", "yama"], ["ゆき", "yuki"], ["よる", "yoru"], ["そら", "sora"], ["うみ", "umi"]],
  [["らっぱ", "rappa"], ["きって", "kitte"], ["ねっこ", "nekko"], ["がっこう", "gakkou"], ["にっき", "nikki"]],
  [["さかな", "sakana"], ["みかん", "mikan"], ["くるま", "kuruma"], ["つみき", "tsumiki"], ["おにぎり", "onigiri"]],
  [["でんしゃ", "densha"], ["しゃしん", "shashin"], ["ちゃわん", "chawan"], ["じてんしゃ", "jitensha"], ["しゅくだい", "shukudai"]],
  [["きょう", "kyou"], ["りょうり", "ryouri"], ["ぎゅうにゅう", "gyuunyuu"], ["しょうがつ", "shougatsu"], ["ちゅうしゃ", "chuusha"]],
  [["あさごはん", "asagohan"], ["たからばこ", "takarabako"], ["ともだち", "tomodachi"], ["えんぴつ", "enpitsu"], ["すいとう", "suitou"]],
  [["たんじょうび", "tanjoubi"], ["うんどうかい", "undoukai"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"], ["おとうさん", "otousan"]],
  [["neko", "ねこ"], ["inu", "いぬ"], ["sora", "そら"], ["umi", "うみ"], ["hana", "はな"]],
  [["sakana", "さかな"], ["kuruma", "くるま"], ["mikan", "みかん"], ["yakyuu", "やきゅう"], ["densha", "でんしゃ"]],
  [["konnichiwa", "こんにちは"], ["arigatou", "ありがとう"], ["ohayou", "おはよう"], ["oyasumi", "おやすみ"], ["sayonara", "さよなら"]],
  [["watashi", "わたし"], ["tomodachi", "ともだち"], ["benkyou", "べんきょう"], ["tsurizima", "つりじま"], ["pengin", "ペンギン"]],
  [["kyouhaumiheiku", "きょうはうみへいく"], ["sakanaotsuru", "さかなをつる"], ["koindekau", "コインでかう"], ["sushiganagareru", "すしがながれる"], ["rainbowrod", "にじのつりざお"]],
  [["manabitoshuri", "まなびとつり"], ["subetenoosara", "すべてのおさら"], ["maboroshinoshima", "まぼろしのしま"], ["koorinoking", "こおりのキング"], ["densetsunotsurimeijin", "でんせつのつりめいじん"]],
];

function buildRomaQuestions(level) {
  return romaBank[level - 1].map(([prompt, answer]) => ({
    type: "input",
    guide: level >= 15 ? "よみかたを いれてね" : "ローマじで いれてね",
    prompt,
    answer,
    inputMode: "text",
  }));
}

function goTo(view) {
  currentView = view;
  renderTabs();
}

function selectSubject(subject) {
  selectedSubject = subject;
  selectedLevel = subject === "math" ? save.mathLevel : save.romaLevel;
  startQuiz();
}

function fishOnce() {
  if (fishingBusy) return;
  if (save.tickets <= 0) {
    $("#fish-message").textContent = "チケットが たりないよ。ローマじで あつめよう。";
    return;
  }
  fishingBusy = true;
  $("#fish-button").disabled = true;
  save.tickets -= 1;
  const caught = pickFish();
  const scene = $(".water-scene");
  const display = $("#catch-display");
  scene.classList.remove("is-caught");
  scene.classList.add("is-casting");
  display.classList.add("is-waiting");
  display.innerHTML = "!";
  $("#fish-message").textContent = "えいっ！うきを なげたよ。";
  persist();
  renderAll();

  setTimeout(() => {
    scene.classList.remove("is-casting");
    scene.classList.add("is-biting");
    display.innerHTML = "!!";
    $("#fish-message").textContent = "ぴくぴく……なにか きた！";
  }, 420);

  setTimeout(() => {
    scene.classList.remove("is-biting");
    scene.classList.add("is-caught");
    display.classList.remove("is-waiting");
    display.innerHTML = fishArt(caught);
    save.fish[caught.id] = (save.fish[caught.id] || 0) + 1;
    $("#fish-message").textContent = `${caught.name}を つった！`;
    if (caughtFishCount() === fishList.length && !save.endingSeen) {
      save.endingSeen = true;
      $("#ending-modal").hidden = false;
    }
    fishingBusy = false;
    $("#fish-button").disabled = false;
    persist();
    renderAll();
  }, 900);
}

function pickFish() {
  const rod = rods.find((item) => item.id === save.equippedRod);
  const placeId = save.currentPlace;
  const candidates = fishList.filter((item) => item.place === placeId && allowedByRod(item, rod));
  const weighted = candidates.map((item) => ({ item, weight: fishWeight(item, rod, placeId) }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of weighted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.item;
  }
  return weighted[0].item;
}

function allowedByRod(item, rod) {
  if (item.rarity === "legend" && rod.power < 3) return false;
  if (item.rarity === "mythic" && !(rod.id === "rainbow" && save.currentPlace === "phantom")) return false;
  return true;
}

function fishWeight(item, rod) {
  const base = { normal: 70, rare: 18, legend: 7, mythic: 4 }[item.rarity];
  const rodBonus = { normal: 0, rare: rod.power * 4, legend: Math.max(0, rod.power - 2) * 5, mythic: rod.power >= 5 ? 8 : 0 }[item.rarity];
  const newBonus = save.fish[item.id] ? 0 : 8;
  return base + rodBonus + newBonus;
}

function showEvolution(stageId) {
  const stage = buddyStages.find((item) => item.id === stageId);
  save.lastBuddyStage = stageId;
  renderPenguin($("#evolution-buddy"), stageId, true);
  $("#evolution-title").textContent = stage.title;
  $("#evolution-text").textContent = `${stage.name}に なった！これからも いっしょに がんばろう。`;
  $("#evolution-modal").hidden = false;
}

function resetGame() {
  if (!resetArmed) {
    resetArmed = true;
    $("#reset-button").textContent = "ほんとうに？";
    setTimeout(() => {
      resetArmed = false;
      $("#reset-button").textContent = "さいしょから";
    }, 2500);
    return;
  }
  save = defaultSave();
  persist();
  resetArmed = false;
  startQuiz();
  renderAll();
}

function bindEvents() {
  $$(".tab").forEach((button) => button.addEventListener("click", () => goTo(button.dataset.view)));
  $$("[data-go]").forEach((button) => button.addEventListener("click", () => goTo(button.dataset.go)));
  $$(".subject-button").forEach((button) => button.addEventListener("click", () => selectSubject(button.dataset.subject)));
  $$(".stat-card").forEach((card) => card.addEventListener("click", () => {
    goTo(card.dataset.jump);
    selectSubject(card.dataset.subject);
  }));
  $("#check-answer").addEventListener("click", checkAnswer);
  $("#next-question").addEventListener("click", nextQuestion);
  $("#retry-level").addEventListener("click", startQuiz);
  $("#fish-button").addEventListener("click", fishOnce);
  $("#reset-button").addEventListener("click", resetGame);
  $("#close-evolution").addEventListener("click", () => {
    $("#evolution-modal").hidden = true;
    renderAll();
  });
  $("#close-ending").addEventListener("click", () => {
    $("#ending-modal").hidden = true;
  });
  document.addEventListener("keydown", handleLearnEnter);
}

bindEvents();
startQuiz();
renderAll();
