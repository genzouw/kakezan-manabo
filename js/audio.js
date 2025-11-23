// 音声関連の定数
const AUDIO_CONFIG = {
  VOICE_NAME: "Google 日本語",
  LANGUAGE: "ja-JP",
  SOUND_FILES: {
    CORRECT: "correct.mp3",
    INCORRECT: "incorrect.mp3",
  },
};

/**
 * 音声合成用の音声を取得する
 * @returns {SpeechSynthesisVoice | undefined}
 */
function getVoice() {
  return speechSynthesis.getVoices().find((voice) => voice.name === AUDIO_CONFIG.VOICE_NAME);
}

/**
 * 問題を読み上げる
 * @param {string} questionReading - 問題の読み方
 * @returns {Promise<void>}
 */
export function speakQuestion(questionReading) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = questionReading;
    utterance.voice = getVoice();
    utterance.lang = AUDIO_CONFIG.LANGUAGE;
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}

/**
 * 解答を読み上げる
 * @param {string} answerReading - 解答の読み方
 */
export function speakAnswer(answerReading) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = answerReading;
  utterance.voice = getVoice();
  utterance.lang = AUDIO_CONFIG.LANGUAGE;
  speechSynthesis.speak(utterance);
}

/**
 * 正解音を再生する
 */
export function playCorrectSound() {
  const correctSound = new Audio(AUDIO_CONFIG.SOUND_FILES.CORRECT);
  correctSound.play();
}

/**
 * 不正解音を再生する
 */
export function playIncorrectSound() {
  const incorrectSound = new Audio(AUDIO_CONFIG.SOUND_FILES.INCORRECT);
  incorrectSound.play();
}
