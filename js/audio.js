export function speakQuestion(questionReading) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = questionReading;
    utterance.voice = speechSynthesis.getVoices().filter(function (n) {
      return n.name == "Google 日本語";
    })[0];
    utterance.lang = "ja-JP";
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}

export function speakAnswer(answerReading) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = answerReading;
  utterance.voice = speechSynthesis.getVoices().filter(function (n) {
    return n.name == "Google 日本語";
  })[0];
  utterance.lang = "ja-JP";
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
