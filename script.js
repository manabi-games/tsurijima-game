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
  { id: "wood", name: "きのつりざお", mark: "I", price: 0, math: 1, power: 1, label: "はじめの つりざお" },
  { id: "silver", name: "ぎんのつりざお", mark: "II", price: 300, math: 5, power: 2, label: "レアに すこし つよい" },
  { id: "gold", name: "きんのつりざお", mark: "III", price: 800, math: 10, power: 3, label: "でんせつを ねらえる" },
  { id: "star", name: "ほしのつりざお", mark: "IV", price: 1800, math: 15, power: 4, label: "きらめく つよいさお" },
  { id: "rainbow", name: "にじのつりざお", mark: "V", price: 3500, math: 20, power: 5, label: "さいこうレアの かぎ" },
];

const rodAsset = (rodId) => `./assets/rods/rod_${rodId}.png`;

const places = [
  { id: "pond", name: "はじまりのいけ", roma: 1, note: "みどりの こじま" },
  { id: "river", name: "きらきらがわ", roma: 5, note: "ながれる ひかり" },
  { id: "coast", name: "あおぞらかいがん", roma: 10, note: "なみと すなはま" },
  { id: "deep", name: "ふしぎしんかい", roma: 15, note: "くらい うみのそこ" },
  { id: "phantom", name: "まぼろしじま", roma: 20, note: "にじの ひみつばしょ" },
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
  fish("medaka", "ひかりメダカ", "normal", "pond", "#7cc7e6", fishImage("medaka")),
  fish("funna", "まるフナ", "normal", "pond", "#9bcf72", fishImage("funna")),
  fish("tanago", "ももタナゴ", "normal", "pond", "#ff9fb3", fishImage("tanago")),
  fish("dojo", "にょろドジョウ", "normal", "pond", "#a87954", fishImage("dojo")),
  fish("koi_baby", "こいこいコイ", "normal", "pond", "#f6c85f", fishImage("koi_baby")),
  fish("kingyo", "こがねキンギョ", "rare", "pond", "#f6c445", fishImage("rare_kingyo")),
  fish("niji_masu", "きらきらニジマス", "rare", "river", "#76d7c4", fishImage("rare_nijimasu")),
  fish("ayu", "ぎんいろアユ", "rare", "river", "#d7f3ff", fishImage("rare_ayu")),
  fish("yamame", "しまヤマメ", "normal", "river", "#8db2c8", fishImage("yamame")),
  fish("hasu", "はねハス", "normal", "river", "#80d6a8", fishImage("hasu")),
  fish("kawaebi", "ぴょんエビ", "normal", "river", "#ff9f7d", fishImage("kawaebi")),
  fish("hotaru", "ほたるフィッシュ", "rare", "river", "#ffe66d", fishImage("hotaru")),
  fish("tobiuo", "あおぞらトビウオ", "rare", "coast", "#5cc8ff", fishImage("rare_tobiuo")),
  fish("ishidai", "しましまイシダイ", "rare", "coast", "#d7d2c6", fishImage("rare_ishidai")),
  fish("fugu", "さくらフグ", "rare", "coast", "#ff9fc4", fishImage("rare_fugu")),
  fish("iwashi", "きらめきイワシ", "normal", "coast", "#a8d8ea", fishImage("iwashi")),
  fish("aji", "はやてアジ", "normal", "coast", "#7aa7c7", fishImage("aji")),
  fish("tai_small", "こだいタイ", "normal", "coast", "#ff8f78", fishImage("tai_small")),
  fish("manta", "ほしぞらマンタ", "legend", "coast", "#6c7fd8", fishImage("super_manta")),
  fish("unagi", "よぞらウナギ", "rare", "deep", "#4969c9", fishImage("rare_unagi")),
  fish("kurage", "ひかりクラゲ", "legend", "deep", "#8be8ff", fishImage("super_kurage")),
  fish("shark", "ぎんがザメ", "legend", "deep", "#7b8ca8", fishImage("super_shark")),
  fish("salmon", "オーロラサケ", "legend", "deep", "#ff8fb3", fishImage("super_salmon")),
  fish("ankou", "ランプアンコウ", "normal", "deep", "#6f82a6", fishImage("ankou")),
  fish("ika", "すいすいイカ", "normal", "deep", "#d9c6ff", fishImage("ika")),
  fish("shell", "うたうかい", "normal", "deep", "#ffd0e0", fishImage("shell")),
  fish("koi_legend", "にじいろコイ", "legend", "phantom", "#f6a6c9", fishImage("legend_koi")),
  fish("tai_legend", "おうごんタイ", "legend", "phantom", "#ffd166", fishImage("legend_tai")),
  fish("coelacanth", "まぼろしシーラカンス", "legend", "phantom", "#5f6caf", fishImage("legend_coelacanth")),
  fish("maguro", "おうじゃマグロ", "legend", "phantom", "#2f6fb4", fishImage("legend_maguro")),
  fish("ryugu", "りゅうぐうのつかい", "mythic", "phantom", "#f2f0ff", fishImage("legend_ryugu")),
  fish("moon", "つきあかりフィッシュ", "rare", "phantom", "#c5d8ff", fishImage("moon")),
  fish("sun", "たいようフィッシュ", "rare", "phantom", "#ffcf5a", fishImage("sun")),
  fish("star", "ながれぼしフィッシュ", "legend", "phantom", "#b7a7ff", fishImage("star")),
  fish("crystal", "クリスタルフィッシュ", "mythic", "phantom", "#9ff3ff", fishImage("crystal")),
  fish("candy", "キャンディフィッシュ", "normal", "pond", "#ffb3d1", fishImage("candy")),
  fish("leaf", "このはフィッシュ", "normal", "river", "#7fd38d", fishImage("leaf")),
  fish("cloud", "くもフィッシュ", "normal", "coast", "#d6f1ff", fishImage("cloud")),
  fish("snow", "ゆきフィッシュ", "rare", "deep", "#e8fbff", fishImage("snow")),
  fish("rainbow", "にじのぬし", "mythic", "phantom", "#c17bff", fishImage("rainbow")),
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
  mathFinalCleared: false,
  romaFinalCleared: false,
});

let save = loadSave();
let currentView = "home";
let selectedSubject = "math";
let selectedLevel = 1;
let quiz = null;
let selectedChoice = "";
let resetArmed = false;
let fishingBusy = false;
let fishingSession = null;
let pendingPlaceUnlock = null;
let pendingEvolutionStage = null;

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
  return "./assets/characters/hero_lv01.png";
}

function penguinAsset(stageId) {
  return `./assets/buddy_penguin/penguin_${stageId}.png`;
}

function renderPenguin(target, stageId, glow = false) {
  const homeClass = target.id === "home-buddy-copy" ? " penguin-home" : "";
  target.className = `penguin-sprite ${stageId}${homeClass}${glow ? " glow" : ""}`;
  target.innerHTML = `<img src="${penguinAsset(stageId)}" alt="" />`;
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
  $("#fish-count").textContent = `${caughtFishCount()}/${fishList.length}`;
}

function renderHome() {
  $("#home-math-level").textContent = save.mathLevel;
  $("#home-roma-level").textContent = save.romaLevel;
  $("#math-meter").style.width = `${(save.mathLevel / MAX_LEVEL) * 100}%`;
  $("#roma-meter").style.width = `${(save.romaLevel / MAX_LEVEL) * 100}%`;
  $("#home-rod").textContent = rods.find((rod) => rod.id === save.equippedRod).name;
  $("#home-place").textContent = `いけるつりば: ${unlockedPlaces().at(-1).name}`;
  $("#summary-math").textContent = `Lv ${save.mathLevel}`;
  $("#summary-roma").textContent = `Lv ${save.romaLevel}`;
  $("#summary-book").textContent = `${caughtFishCount()}/${fishList.length}`;
  $("#next-math-goal").textContent = save.mathFinalCleared ? "さんすう ぜんぶクリア！" : `さんすう Lv${save.mathLevel} をクリア`;
  $("#next-roma-goal").textContent = save.romaFinalCleared ? "ローマじ ぜんぶクリア！" : `ローマじ Lv${save.romaLevel} をクリア`;
  $("#next-book-goal").textContent = caughtFishCount() >= fishList.length ? "ずかん コンプリート！" : `あと ${fishList.length - caughtFishCount()}しゅるい`;
  renderRewardBoard();
  const buddy = getBuddyStage();
  $("#buddy-name").textContent = buddy.name;
  renderPenguin($("#buddy-art"), buddy.id);
  const heroAvatar = $("#hero-avatar");
  if (heroAvatar) heroAvatar.src = currentHeroAsset();
  const homeBuddy = $("#home-buddy-copy");
  if (homeBuddy) renderPenguin(homeBuddy, buddy.id);
  const activeRod = $("#active-rod-image");
  if (activeRod) activeRod.src = rodAsset(save.equippedRod);
  const heroRod = $("#hero-rod-image");
  if (heroRod) heroRod.src = rodAsset(save.equippedRod);
}

function allStagesCleared() {
  return save.mathFinalCleared && save.romaFinalCleared;
}

function fishBookCompleted() {
  return caughtFishCount() >= fishList.length;
}

function renderRewardBoard() {
  const board = $("#reward-board");
  if (!board) return;
  const rewards = [];
  if (allStagesCleared()) {
    rewards.push({
      icon: "100",
      title: "ぜんステージクリア おめでとう！",
      text: "パパから おこづかい 100えんを もらえるよ！おさかなを ぜんしゅるい あつめると、もっと いいことが あるかもね！",
    });
  }
  if (fishBookCompleted()) {
    rewards.push({
      icon: "500",
      title: "おさかなずかん かんせい おめでとう！",
      text: "パパから おこづかい 500えんを もらえるよ！おべんきょう がんばってね！",
    });
  }
  board.hidden = rewards.length === 0;
  board.innerHTML = rewards.map((reward) => `
    <article class="reward-card">
      <span>${reward.icon}えん</span>
      <div>
        <strong>${reward.title}</strong>
        <p>${reward.text}</p>
      </div>
    </article>
  `).join("");
}

function renderTabs() {
  $(".app").classList.toggle("is-play-view", currentView !== "home");
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
    button.innerHTML = `<span class="place-chip ${place.id}"></span><strong>${place.name}</strong><br><span>ローマじ Lv${place.roma} / ${place.note}</span>`;
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
  const current = places.find((place) => place.id === save.currentPlace);
  $("#fish-place-name").textContent = current.name;
  const scene = $(".water-scene");
  if (scene) {
    scene.classList.remove(...places.map((place) => `place-${place.id}`));
    scene.classList.add(`place-${current.id}`);
  }
}

function renderRods() {
  const list = $("#rod-list");
  list.innerHTML = "";
  rods.forEach((rod) => {
    const owned = save.ownedRods.includes(rod.id);
    const canBuy = save.coins >= rod.price && save.mathLevel >= rod.math;
    const card = document.createElement("div");
    card.className = `rod-card rod-${rod.id}${save.equippedRod === rod.id ? " is-equipped" : ""}${owned ? " is-owned" : ""}`;
    const actionLabel = owned ? (save.equippedRod === rod.id ? "そうびちゅう" : "そうび") : "かう";
    card.innerHTML = `
      <div>
        <h3>${rod.name}</h3>
        <p>${rod.price}コイン / さんすうLv${rod.math}</p>
        <span>${rod.label}</span>
      </div>
      <div class="rod-preview" aria-hidden="true"><img src="${rodAsset(rod.id)}" alt="" /></div>
      <button class="${owned ? "secondary" : "primary"}" ${(!owned && !canBuy) || save.equippedRod === rod.id ? "disabled" : ""}>${actionLabel}</button>
    `;
    card.querySelector("button").addEventListener("click", () => buyOrEquipRod(rod));
    list.appendChild(card);
  });
}

function renderBook() {
  const count = caughtFishCount();
  $("#book-title").textContent = `${count}/${fishList.length}`;
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
  $("#retry-level").textContent = "もういちど";
  $("#next-question").hidden = true;
  $("#check-answer").hidden = false;
  $("#quiz-subject").textContent = selectedSubject === "math" ? "さんすう" : "ローマじ";
  $("#quiz-level").textContent = `Lv ${selectedLevel}`;
  renderLevelList();
  renderQuestion();
  playLevelIntro();
}

function renderQuestion() {
  const question = quiz.questions[quiz.index];
  playServeAnimation();
  $("#quiz-score").textContent = `${quiz.correct}/5`;
  hideAnswerStamp();
  $("#question-guide").textContent = question.guide;
  $("#question-text").textContent = question.prompt;
  renderServedPlate();
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

function playLevelIntro() {
  const toast = $("#level-toast");
  if (!toast) return;
  toast.textContent = `レベル ${selectedLevel}`;
  toast.classList.remove("is-visible");
  void toast.offsetWidth;
  toast.classList.add("is-visible");
}

function renderServedPlate() {
  const plate = $("#served-plate");
  if (!plate || !quiz) return;
  plate.className = `served-plate ${plateClassByLevel(selectedLevel)}`;
  plate.innerHTML = `<span>${quiz.index + 1}</span>`;
}

function playServeAnimation() {
  const panel = $(".quiz-panel");
  if (!panel) return;
  panel.classList.remove("is-serving");
  void panel.offsetWidth;
  panel.classList.add("is-serving");
}

function checkAnswer() {
  if (!quiz || quiz.finished) return;
  if (quiz.plates[quiz.index]) return;
  const question = quiz.questions[quiz.index];
  const rawAnswer = question.type === "choice" ? selectedChoice : $("#answer-input").value;
  if (normalize(rawAnswer) === "") {
    $("#feedback").textContent = "こたえを にゅうりょくしてね。";
    return;
  }
  const answers = question.answers || [question.answer];
  const ok = answers.some((answer) => normalize(rawAnswer) === normalize(answer));
  quiz.plates[quiz.index] = ok ? "done" : "miss";
  if (ok) quiz.correct += 1;
  showAnswerStamp(ok);
  $("#feedback").textContent = ok ? "せいかい！おさら クリア！" : `おしい！こたえは ${question.answerDisplay || question.answer}`;
  $("#check-answer").hidden = true;
  $("#next-question").hidden = quiz.index >= QUESTIONS_PER_LEVEL - 1;
  renderSushiLane();
  if (quiz.index >= QUESTIONS_PER_LEVEL - 1) finishQuiz();
}

function showAnswerStamp(ok) {
  const stamp = $("#answer-stamp");
  if (!stamp) return;
  stamp.textContent = ok ? "○" : "×";
  stamp.className = `answer-stamp ${ok ? "is-ok" : "is-ng"} is-visible`;
}

function hideAnswerStamp() {
  const stamp = $("#answer-stamp");
  if (!stamp) return;
  stamp.className = "answer-stamp";
  stamp.textContent = "";
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
  if (closeTopModalByEnter()) return;
  if (!$("#next-question").hidden) {
    nextQuestion();
    return;
  }
  if (!$("#check-answer").hidden) {
    checkAnswer();
    return;
  }
  if (!$("#retry-level").hidden) {
    continueAfterQuiz();
  }
}

function handleFishEnter(event) {
  if (event.key !== "Enter" || currentView !== "fish") return;
  event.preventDefault();
  event.stopPropagation();
  if (closeTopModalByEnter()) return;
  fishOnce();
}

function finishQuiz() {
  quiz.finished = true;
  $("#quiz-score").textContent = `${quiz.correct}/5`;
  $("#retry-level").hidden = false;
  if (quiz.subject === "math") finishMath();
  else finishRoma();
  persist();
  renderAll();
  updateFinishButton();
}

function updateFinishButton() {
  const nextUnlocked = quiz.correct === QUESTIONS_PER_LEVEL && quiz.level < MAX_LEVEL;
  $("#retry-level").textContent = nextUnlocked ? "つぎのレベルへ" : "もういちど";
}

function continueAfterQuiz() {
  if (quiz?.finished && quiz.correct === QUESTIONS_PER_LEVEL && quiz.level < MAX_LEVEL) {
    selectedLevel = clampLevel(quiz.level + 1);
    startQuiz();
    return;
  }
  startQuiz();
}

function finishMath() {
  if (quiz.correct === QUESTIONS_PER_LEVEL) {
    const before = getBuddyStage().id;
    const reward = mathReward(quiz.level);
    save.coins += reward;
    completedLevel("math", quiz.level);
    if (quiz.level === MAX_LEVEL) save.mathFinalCleared = true;
    $("#feedback").textContent = `ぜんぶできた！${reward}コイン もらったよ。`;
    showClearModal("さんすう", quiz.level, `${reward}コイン もらったよ。`);
    const after = getBuddyStage().id;
    if (before !== after) pendingEvolutionStage = after;
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
    const beforePlaces = unlockedPlaces().length;
    save.tickets += reward;
    completedLevel("roma", quiz.level);
    if (quiz.level === MAX_LEVEL) save.romaFinalCleared = true;
    $("#feedback").textContent = `ぜんぶできた！チケット ${reward}まい もらったよ。`;
    showClearModal("ローマじ", quiz.level, `チケット ${reward}まい もらったよ。`);
    pendingPlaceUnlock = unlockedPlaces()[beforePlaces] || null;
  } else if (quiz.correct > 0) {
    save.tickets += 1;
    $("#feedback").textContent = `${quiz.correct}もん できた！チケット 1まい もらったよ。`;
  } else {
    $("#feedback").textContent = "チケットは つぎの おたのしみ。";
  }
}

function showClearModal(subjectLabel, level, rewardText) {
  $("#clear-subject").textContent = `${subjectLabel} クリア！`;
  $("#clear-title").textContent = `${subjectLabel} レベル ${level} クリア！`;
  $("#clear-text").textContent = rewardText;
  $("#clear-modal").hidden = false;
  setTimeout(() => $("#close-clear").focus(), 0);
}

function showPlaceUnlock(place) {
  $("#place-unlock-title").textContent = `${place.name}に いけるよ！`;
  $("#place-unlock-text").textContent = "あたらしい さかなが まっているよ。";
  $("#place-modal").hidden = false;
  setTimeout(() => $("#close-place").focus(), 0);
}

function closeClearModal() {
  $("#clear-modal").hidden = true;
  if (pendingEvolutionStage) {
    const stageId = pendingEvolutionStage;
    pendingEvolutionStage = null;
    showEvolution(stageId);
  } else if (pendingPlaceUnlock) {
    const place = pendingPlaceUnlock;
    pendingPlaceUnlock = null;
    showPlaceUnlock(place);
  }
  renderAll();
}

function closeTopModalByEnter() {
  if (!$("#clear-modal").hidden) {
    closeClearModal();
    return true;
  }
  if (!$("#place-modal").hidden) {
    $("#place-modal").hidden = true;
    return true;
  }
  if (!$("#evolution-modal").hidden) {
    $("#evolution-modal").hidden = true;
    renderAll();
    return true;
  }
  if (!$("#ending-modal").hidden) {
    $("#ending-modal").hidden = true;
    return true;
  }
  return false;
}

function normalize(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

function buildQuestions(subject, level) {
  return subject === "math" ? buildMathQuestions(level) : buildRomaQuestions(level);
}

function buildMathQuestions(level) {
  return mathBank[level - 1].map((item) => makeMathQuestion(item));
}

function makeMathQuestion(item) {
  if (item.length === 1) {
    return {
      type: "input",
      guide: "でてきた すうじを そのまま うってね",
      prompt: String(item[0]),
      answer: item[0],
      inputMode: "numeric",
    };
  }
  const [left, sign, right] = item;
  const answer = sign === "+" ? left + right : left - right;
  return { type: "input", guide: "こたえを すうじで いれてね", prompt: `${left} ${sign} ${right}`, answer, inputMode: "numeric" };
}

const mathBank = [
  [[1], [2], [3], [4], [5]],
  [[6], [7], [8], [9], [10]],
  [[1, "+", 1], [2, "+", 1], [3, "+", 1], [4, "+", 1], [5, "+", 1]],
  [[1, "+", 2], [2, "+", 2], [3, "+", 2], [4, "+", 2], [5, "+", 2]],
  [[2, "+", 3], [4, "+", 1], [5, "+", 2], [6, "+", 3], [7, "+", 2]],
  [[8, "+", 2], [7, "+", 3], [6, "+", 4], [5, "+", 5], [9, "+", 1]],
  [[3, "-", 1], [4, "-", 1], [5, "-", 2], [6, "-", 2], [7, "-", 3]],
  [[8, "-", 3], [9, "-", 4], [10, "-", 5], [7, "-", 5], [6, "-", 4]],
  [[8, "+", 5], [9, "+", 4], [7, "+", 6], [6, "+", 8], [9, "+", 8]],
  [[12, "+", 5], [14, "+", 3], [16, "+", 2], [11, "+", 8], [15, "+", 4]],
  [[21, "+", 13], [32, "+", 14], [25, "+", 22], [41, "+", 18], [53, "+", 16]],
  [[28, "+", 17], [36, "+", 25], [47, "+", 18], [59, "+", 24], [64, "+", 27]],
  [[22, "+", 11], [31, "+", 12], [24, "+", 13], [42, "+", 15], [53, "+", 14]],
  [[26, "+", 13], [35, "+", 12], [43, "+", 16], [51, "+", 18], [62, "+", 15]],
  [[23, "+", 18], [34, "+", 27], [45, "+", 36], [56, "+", 28], [67, "+", 19]],
  [[28, "+", 36], [39, "+", 25], [47, "+", 34], [58, "+", 29], [66, "+", 27]],
  [[32, "+", 49], [48, "+", 37], [55, "+", 28], [64, "+", 19], [73, "+", 18]],
  [[46, "+", 38], [57, "+", 29], [68, "+", 24], [75, "+", 17], [86, "+", 13]],
  [[59, "+", 28], [67, "+", 25], [74, "+", 19], [83, "+", 16], [88, "+", 11]],
  [[87, "-", 49], [92, "-", 58], [74, "-", 37], [81, "-", 46], [95, "-", 67]],
];

const romaBank = [
  [["A", "a"], ["I", "i"], ["U", "u"], ["E", "e"], ["O", "o"]],
  [["K", "k"], ["S", "s"], ["T", "t"], ["N", "n"], ["H", "h"]],
  [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]],
  [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]],
  [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]],
  [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]],
  [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]],
  [["ま", "ma"], ["み", "mi"], ["や", "ya"], ["ら", "ra"], ["わ", "wa"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["やま", "yama"], ["そら", "sora"], ["うみ", "umi"]],
  [["か", "ka"], ["さ", "sa"], ["た", "ta"], ["な", "na"], ["は", "ha"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["やま", "yama"], ["そら", "sora"], ["うみ", "umi"]],
  [["さかな", "sakana"], ["みかん", "mikan"], ["くるま", "kuruma"], ["つみき", "tsumiki"], ["おはな", "ohana"]],
  [["しゃしん", "shashin"], ["でんしゃ", "densha"], ["しゅくだい", "shukudai"], ["しょうがつ", "shougatsu"], ["おしゃれ", "oshare"]],
  [["ちゃわん", "chawan"], ["おちゃ", "ocha"], ["ちゅうい", "chuui"], ["ちょきん", "chokin"], ["かぼちゃ", "kabocha"]],
  [["きょう", "kyou"], ["きゅうり", "kyuuri"], ["りょうり", "ryouri"], ["ぎゅうにゅう", "gyuunyuu"], ["にゃんこ", "nyanko"]],
  [["らっぱ", "rappa"], ["きって", "kitte"], ["ねっこ", "nekko"], ["がっこう", "gakkou"], ["にっき", "nikki"]],
  [["えんぴつ", "enpitsu"], ["しんぶん", "shinbun"], ["さんぽ", "sanpo"], ["ほんだな", "hondana"], ["せんせい", "sensei"]],
  [["ともだち", "tomodachi"], ["たからばこ", "takarabako"], ["あさごはん", "asagohan"], ["すいとう", "suitou"], ["おとうさん", "otousan"]],
  [["たんじょうび", "tanjoubi"], ["うんどうかい", "undoukai"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"], ["じてんしゃ", "jitensha"]],
  [["ぱわーあっぷ", "pawaappu", ["pawaappu", "pawa-appu"]], ["ちゅうしゃき", "chuushaki"], ["きょうりゅう", "kyouryuu"], ["じゅんびたいそう", "junbitaisou"], ["でんせつのつりめいじん", "densetsunotsurimeijin"]],
];

function buildRomaQuestions(level) {
  return romaBank[level - 1].map(([kana, answer, aliases]) => {
    const hint = `${answer.toUpperCase()} / ${answer.toLowerCase()}`;
    const prompt = level <= 2
      ? `${hint}\nを うってね`
      : level <= 9
        ? `${kana} を うってね\n${hint}`
        : `${kana} を うってね`;
    return {
      type: "input",
      guide: level <= 9 ? "おてほんを みて うってね" : "ローマじで いれてね",
      prompt,
      answer,
      answers: buildRomajiAnswers(answer, aliases),
      answerDisplay: level <= 9 ? hint : answer,
      inputMode: "text",
    };
  });
}

function buildRomajiAnswers(answer, aliases = []) {
  const seeds = [answer, ...aliases];
  const rules = [
    ["shi", "si"],
    ["chi", "ti"],
    ["tsu", "tu"],
    ["fu", "hu"],
    ["ji", "zi"],
    ["sha", "sya"],
    ["shu", "syu"],
    ["sho", "syo"],
    ["cha", "tya"],
    ["chu", "tyu"],
    ["cho", "tyo"],
    ["ja", "zya"],
    ["ju", "zyu"],
    ["jo", "zyo"],
  ];
  const answers = new Set(seeds.map((item) => normalize(item)));
  let changed = true;
  while (changed && answers.size <= 128) {
    changed = false;
    for (const [from, to] of rules) {
      for (const item of [...answers]) {
        if (item.includes(from)) changed = addAnswerVariant(answers, item.replaceAll(from, to)) || changed;
        if (item.includes(to)) changed = addAnswerVariant(answers, item.replaceAll(to, from)) || changed;
      }
    }
  }
  addNnVariants(answers);
  return [...answers];
}

function addAnswerVariant(answers, value) {
  if (answers.has(value)) return false;
  answers.add(value);
  return true;
}

function addNnVariants(answers) {
  for (const item of [...answers]) {
    answers.add(item.replace(/n(?=$|[bcdfghjklmpqrstvwxz])/g, "nn"));
  }
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
  if (fishingSession?.ready) {
    reelFish();
    return;
  }
  if (fishingBusy) return;
  if (save.tickets <= 0) {
    $("#fish-message").textContent = "チケットが たりないよ。ローマじで あつめよう。";
    return;
  }
  fishingBusy = true;
  $("#fish-button").disabled = true;
  save.tickets -= 1;
  const caught = pickFish();
  fishingSession = {
    caught,
    pulls: 0,
    needed: pullsNeeded(caught),
    ready: false,
  };
  const scene = $(".water-scene");
  const display = $("#catch-display");
  scene.classList.remove("is-caught", "is-reeling");
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
    fishingSession.ready = true;
    $("#fish-button").disabled = false;
    $("#fish-button").textContent = "ひっぱる！";
    $("#fish-message").textContent = `ぴくぴく……${fishingSession.needed}かい ひっぱろう！`;
  }, 420);
}

function reelFish() {
  if (!fishingSession) return;
  const scene = $(".water-scene");
  const display = $("#catch-display");
  fishingSession.pulls += 1;
  scene.classList.remove("is-reeling");
  void scene.offsetWidth;
  scene.classList.add("is-reeling");
  const remaining = fishingSession.needed - fishingSession.pulls;
  if (remaining > 0) {
    display.innerHTML = "!".repeat(Math.min(3, fishingSession.pulls + 1));
    $("#fish-message").textContent = `ぐぐっ！あと ${remaining}かい！`;
    return;
  }
  finishFishingCatch();
}

function finishFishingCatch() {
  const caught = fishingSession.caught;
  const scene = $(".water-scene");
  const display = $("#catch-display");
  scene.classList.remove("is-biting", "is-reeling");
  scene.classList.add("is-caught");
  display.classList.remove("is-waiting");
  display.innerHTML = fishArt(caught);
  const isNew = !save.fish[caught.id];
  save.fish[caught.id] = (save.fish[caught.id] || 0) + 1;
  $("#fish-message").textContent = isNew
    ? `はじめての ${caught.name}！ずかんに のった！`
    : `${caught.name}を つった！ ${save.fish[caught.id]}ひきめ`;
  if (caughtFishCount() === fishList.length && !save.endingSeen) {
    save.endingSeen = true;
    $("#ending-modal").hidden = false;
  }
  fishingSession = null;
  fishingBusy = false;
  $("#fish-button").disabled = false;
  $("#fish-button").textContent = "つる";
  persist();
  renderAll();
}

function pullsNeeded(item) {
  return { normal: 1, rare: 2, legend: 3, mythic: 4 }[item.rarity] || 1;
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
  const newBonus = save.fish[item.id] ? 0 : 18;
  const duplicatePenalty = Math.min(save.fish[item.id] || 0, 8) * 3;
  return Math.max(4, base + rodBonus + newBonus - duplicatePenalty);
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
  fishingBusy = false;
  fishingSession = null;
  pendingPlaceUnlock = null;
  pendingEvolutionStage = null;
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
  $("#retry-level").addEventListener("click", continueAfterQuiz);
  $("#fish-button").addEventListener("click", fishOnce);
  $("#reset-button").addEventListener("click", resetGame);
  $("#close-evolution").addEventListener("click", () => {
    $("#evolution-modal").hidden = true;
    renderAll();
  });
  $("#close-clear").addEventListener("click", closeClearModal);
  $("#close-place").addEventListener("click", () => {
    $("#place-modal").hidden = true;
  });
  $("#close-ending").addEventListener("click", () => {
    $("#ending-modal").hidden = true;
  });
  document.addEventListener("keydown", handleLearnEnter);
  document.addEventListener("keydown", handleFishEnter);
}

bindEvents();
startQuiz();
renderAll();
