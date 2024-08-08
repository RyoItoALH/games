var startTypingFlg = true;
var TPListNum = 0; //タイピング対象のリスト配列番号管理
var spellCount = 0; //対象スペルの文字数
var spellList = []; //タイピング対象のスペル管理
var typedSpell = ""; // タイピング済みのスペル管理
var typingSpellCount = 0; // 入力中のタイピングスペル番号
let timeCount = 10; // カウントダウンの開始値
var score = 0; // スコア管理

// html要素取得
var modalBodyWord = document.getElementById("modalBodyWord");
var modalBodySpell = document.getElementById("modalBodySpell");
var modalBodyTypingSpell = document.getElementById("modalBodyTypingSpell");
var modalTime = document.getElementById("modalTime");
var modalScore = document.getElementById("modalScore");
var TitleScore = document.getElementById("titleScore");
let list1;
let list2;
let list3;

// htmlからjsにファイルを送る
function setTypingList(typingList) {
  list1 = typingList[0];
  list2 = typingList[1];
  list3 = typingList[2];
}
// モーダルボタン押下時の処理
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("modalButton").addEventListener("click", function () {
    // 1～3のランダムでリストを指定する
    //　画面初期表示
    showScore(0);
    showRestTime(60);
    setModalView();
    startRestTime();
  });

  //　入力時の判定
  document.addEventListener("keyup", function (event) {
    if (startTypingFlg) {
      checkSpell(event.key);
    }
  });
});

// 制限時間管理の変数を動かす
function startRestTime() {
  timeMGT = setInterval(() => {
    countdown();
    if (!startTypingFlg) {
      clearInterval(timeMGT);
    }
  }, 1000);
}

//モーダル画面の表示 一旦list1
function setModalView() {
  console.log(TPListNum);
  modalBodyWord.textContent = list1[TPListNum].viewName;
  modalBodySpell.textContent = list1[TPListNum].spell;
  spellCount = list1[TPListNum].spell.length;
  for (i = 0; i < spellCount; i++) {
    this.spellList.push(list1[TPListNum].spell.slice(i, i + 1));
  }
}

// 入力時の判定
function checkSpell(key) {
  if (spellList[typingSpellCount] === key) {
    this.typingSpellCount++;

    // 入力済みのスペルを格納・スコア計算
    this.typedSpell += key;
    scoreCount();

    // スペル数とタイピング数をクリアする
    if (typingSpellCount === spellCount) {
      this.typingSpellCount = 0;
      this.spellCount = 0;
      this.spellList.length = 0; // 配列も空にする;
      this.TPListNum++;
      this.typedSpell = "";
      setModalView();
    }
  } else {
    console.log("入力失敗");
  }

  // 入力済みのスペルを表示・Score表示
  modalBodyTypingSpell.textContent = typedSpell;
}

// スコア管理 5点刻み
function scoreCount() {
  this.score += 5;
  showScore(this.score);
}

// スコア表示処理
function showScore(isScore) {
  modalScore.textContent = isScore;
}

// 残り時間表示処理
function showRestTime(isTime) {
  modalTime.textContent = isTime;
}

// 制限時間管理関数
function countdown() {
  timeCount -= 1;
  showRestTime(timeCount);
  if (timeCount <= 0) {
    finishTimersStyle();
    this.startTypingFlg = false;
  }
}

// 終了時のスタイル変更関数
function finishTimersStyle() {
  modalTime.style.color = "red";
  modalScore.style.color = "red";
  modalScore.style.fontSize = "30px";
}

// クローズボタン押下時の処理
document
  .getElementById("closeModalButton")
  .addEventListener("click", function () {
    document.getElementsByClassName("typigScore-content").innerText = score;
  });
