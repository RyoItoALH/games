const breakingProbability = 8; // 大当たり突入確率
let feverTime = false; //大当たりタイムの判定
let pScore = 0;

// html要素取得
const possibleNumHtml = document.getElementById("possibleNum");
const pModalScoreHtml = document.getElementById("pModalScore");
const pModalBodyTextHazureHtml = document.getElementById(
  "pModalBodyTextHazure"
);
const pModalBodyTextAtariHtml = document.getElementById("pModalBodyTextAtari");

// モーダルボタン押下時の処理
document
  .getElementById("pachinkoModalButton")
  .addEventListener("click", async function () {
    // モーダルタイトル表示設定
    possibleNumHtml.innerText = possibleLottery();
  });

// モーダル内STARTボタン押下時処理
document
  .getElementById("lotteryStartBtn")
  .addEventListener("click", async function () {
    roopLottery();
  });

// モーダル内STOPボタン押下時処理
document
  .getElementById("lotteryStopBtn")
  .addEventListener("click", async function () {});

// 抽選処理
function roopLottery() {
  featureCount = possibleLottery();
  if (featureCount > 0) {
    if (feverTime) {
      // 確変時抽選
      feverGeneralLottery();
    } else {
      // 通常時抽選
      generalLottery();
    }
  }
  // スコア表示
  pModalScoreHtml.innerText = pScore;
}

// 通常抽選処理
function generalLottery() {
  lotteryNum = getRandomInt(breakingProbability);

  // 抽選結果を判別
  if (lotteryNum == 7) {
    // 当たり
    pModalBodyTextHazureHtml.style.display = "none";
    pModalBodyTextAtariHtml.style.display = "flex";
    feverTime = true;
    pScore += 300;
  } else {
    // はずれ
    pModalBodyTextAtariHtml.style.display = "none";
    pModalBodyTextHazureHtml.style.display = "flex";
  }
}

// FEVER中抽選処理
function feverGeneralLottery() {
  lotteryNum = getRandomInt(100);

  // 抽選結果を判別
  if (lotteryNum <= 85) {
    // 継続

    pScore += 1500;
  } else {
    // 転落

    feverTime = false;
  }
}

// 抽選可能回数を算出
function possibleLottery() {
  if (localStorage.getItem("typingTotal")) {
    typingScore = parseInt(localStorage.getItem("typingTotal"));
    possibleNum = typingScore / 4;
    return Number(possibleNum);
  }
  return 0;
}

// クローズボタン押下時の処理
document
  .getElementById("closePModalButton")
  .addEventListener("click", function () {
    setSession();
    location.reload();
  });

// ローカルストレージ管理
function setSession() {
  if (localStorage.getItem("gambleTotal")) {
    let totalScore = parseInt(localStorage.getItem("gambleTotal"));
    totalScore += pScore;
    localStorage.setItem("gambleTotal", totalScore);
  } else {
    localStorage.setItem("gambleTotal", pScore);
  }
}
// ランダム関数(0~max-1)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
