let voices = [];

function loadVoices() {
  return new Promise((resolve) => {
    voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve();
    } else {
      speechSynthesis.addEventListener('voiceschanged', () => {
        voices = speechSynthesis.getVoices();
        resolve();
      }, { once: true });
    }
  });
}

function getJapaneseVoice() {
  // 優先順位: "Google 日本語" > lang が "ja-JP" の音声 > デフォルト
  return voices.find(v => v.name === "Google 日本語") ||
         voices.find(v => v.lang === "ja-JP") ||
         null;
}

function createUtterance(text) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = "ja-JP";
  const voice = getJapaneseVoice();
  if (voice) {
    utterance.voice = voice;
  }
  return utterance;
}

export async function speakQuestion(questionReading) {
  if (voices.length === 0) {
    await loadVoices();
  }
  return new Promise((resolve) => {
    const utterance = createUtterance(questionReading);
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}

export async function speakAnswer(answerReading) {
  if (voices.length === 0) {
    await loadVoices();
  }
  const utterance = createUtterance(answerReading);
  speechSynthesis.speak(utterance);
}

export function playCorrectSound() {
  const correctSound = new Audio("correct.mp3");
  correctSound.play();
}

export function playIncorrectSound() {
  const incorrectSound = new Audio("incorrect.mp3");
  incorrectSound.play();
}
