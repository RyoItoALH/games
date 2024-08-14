var startTypingFlg = true;
var TPListNum = 0; //タイピング対象のリスト配列番号管理
var spellCount = 0; //対象スペルの文字数
var spellList = []; //タイピング対象のスペル管理
var typedSpell = ""; // タイピング済みのスペル管理
var typingSpellCount = 0; // 入力中のタイピングスペル番号
let timeCount = 60; // カウントダウンの開始値
var score = 0; // スコア管理

// html要素取得
var modalTime = document.getElementById("modalTime");
var modalScore = document.getElementById("modalScore");
var TitleScore = document.getElementById("titleScore");
let typingList;

// モーダルボタン押下時の処理
document
  .getElementById("modalButton")
  .addEventListener("click", async function () {
    //　画面初期表示
    showScore(0);
    showRestTime(60);

    // 非同期通信でファイルを取得
    getTypingListData(1, function (data) {
      if (data != null) {
        typingList = data;
        setModalView();
        startRestTime();
      }
    });
  });

//　入力時の判定
document.addEventListener("keyup", function (event) {
  if (startTypingFlg) {
    checkSpell(event.key);
  }
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

//モーダル画面の表示
function setModalView() {
  // 日本語表示
  document.getElementById("modalBodyWord").innerText =
    typingList[TPListNum].viewName;

  // アルファベット表示
  document.getElementById("modalBodySpell").innerText =
    typingList[TPListNum].spell;

  // アルファベット数計測・入力用スペルリスト作成
  spellCount = typingList[TPListNum].spell.length;
  for (i = 0; i < spellCount; i++) {
    this.spellList.push(typingList[TPListNum].spell.slice(i, i + 1));
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
    finishTyping();
  }
}

// タイピング終了処理
function finishTyping() {
  finishTimersStyle();
  setSession();
  this.startTypingFlg = false;
}

// 終了時のスタイル変更関数
function finishTimersStyle() {
  modalTime.style.color = "red";
  modalScore.style.color = "red";
  modalScore.style.fontSize = "30px";
}

// ローカルストレージ管理
function setSession() {
  if (localStorage.getItem("typingTotal")) {
    let totalScore = parseInt(localStorage.getItem("typingTotal"));
    totalScore += score;
    localStorage.setItem("typingTotal", totalScore);
  } else {
    localStorage.setItem("typingTotal", score);
  }
  console.log(localStorage);
}

// クローズボタン押下時の処理
document
  .getElementById("closeModalButton")
  .addEventListener("click", function () {
    location.reload();
  });

// 非同期通信処理(タイピングリストを取得)
function getTypingListData(num, callback) {
  $.ajax({
    type: "GET",
    url: "/typingList",
    data: { num: num },
    dataType: "json",
    success: function (response) {
      callback(response);
    },
    error: function (error) {
      console.error("非同期通信失敗", error);
      callback(null);
    },
  });
}
