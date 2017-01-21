/* ==================== Voice recognition Class  ==================== */
class voiceRecognition {
  constructor(config) {
    this.config = config;
  }

  /* ==================== Functionality  ==================== */

  // Allow for voiceRecognition in Chrome //
  voiceRecognition() {
    const speach = this.config.$speach;
    const recognition = new speach();
    recognition.interimResults = true
    recognition.start();
    return recognition;
  }
  // Converts saved words to text //
  voiceToText(transcript) {
    const words = this.config.$words;
    let p = document.createElement('p');
    p.textContent = transcript;
    return words.appendChild(p);
  }

  /* ==================== Eventhandler  ==================== */

  recognitionStart() {
    const recognition = this.voiceRecognition();
    recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      if (e.results[0].isFinal) {
        this.voiceToText(transcript);
      }
    })
    recognition.addEventListener('end', recognition.start);
  }

  /* ==================== Initialize  ==================== */

  initialize() {
    this.recognitionStart();
  }
}

const body = document.querySelectorAll('body');
body.forEach(elem => {
  const voice = new voiceRecognition ({
    $words: document.querySelector('.words'),
    $speach: window.SpeechRecognition || window.webkitSpeechRecognition
  })
  voice.initialize()
})
