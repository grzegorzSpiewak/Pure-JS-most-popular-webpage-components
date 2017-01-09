/* ==================== Voice recognition  ==================== */
const voiceRecognation = {
  config: {
    $words: document.querySelector('.words'),
    $speach: window.SpeechRecognition || window.webkitSpeechRecognition
  },

  /* ==================== Functionality  ==================== */

  // Allow for voiceRecognition in Chrome //
  voiceRecognition: function() {
    const speach = this.config.$speach;
    const recognition = new speach();
    recognition.interimResults = true
    recognition.start();
    return recognition;
  },
  // Converts saved words to text //
  voiceToText: function(transcript) {
    const words = this.config.$words;
    let p = document.createElement('p');
    p.textContent = transcript;
    return words.appendChild(p);
  },

  /* ==================== Eventhandler  ==================== */

  recognitionStart: function() {
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
  },

  /* ==================== Initialize  ==================== */

  initialize: function() {
    this.recognitionStart();
  }
}
voiceRecognation.initialize();
