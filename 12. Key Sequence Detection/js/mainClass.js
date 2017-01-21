/* ==================== Secrte code detection ==================== */
class keyDetection {
  constructor(config) {
    this.config = config
  }

  reward() {
    const reward = this.config.$reward;
    const html = '<p> Zwycięstwo! Klikaj dla większej radości i tęcz! </p>'
    reward.innerHTML = html;
  }

  keys(e) {
    const pressed = this.config.pressedButtons;
    const secretCode = this.config.secretCode;
    pressed.push(e.key)
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      console.log('DING DING!');
      cornify_add();
      this.reward();
    }
  }

  eventHandler() {
    const window = this.config.$window;
    window.addEventListener('keyup', this.keys.bind(this));
  }

  initialize() {
    this.eventHandler();
  }
}

const reward = document.querySelectorAll('.reward')
reward.forEach(elem => {
  const keyPressed = new keyDetection ({
    $window: window,
    $reward: document.querySelector('.reward'),
    pressedButtons: [],
    secretCode: 'kot'
  })
  keyPressed.initialize()
})
