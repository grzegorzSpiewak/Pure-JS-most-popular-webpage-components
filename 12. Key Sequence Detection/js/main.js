/* ===== Secrte code detection ===== */
const keyDetection = {
  config: {
    $window: window,
    $reward: document.querySelector('.reward'),
    pressedButtons: [],
    secretCode: 'kot'
  },
  reward: function() {
    const reward = this.config.$reward;
    const html = '<p> Zwycięstwo! Klikaj dla większej radości i tęcz! </p>'
    reward.innerHTML = html;
  },
  keys: function(e) {
    const pressed = this.config.pressedButtons;
    const secretCode = this.config.secretCode;
    pressed.push(e.key)
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      console.log('DING DING!');
      cornify_add();
      this.reward();
    }
  },
  eventHandler: function() {
    const window = this.config.$window;
    window.addEventListener('keyup', this.keys.bind(this));
  },
  initiliaze: function() {
    this.eventHandler();
  }
}
keyDetection.initiliaze()
