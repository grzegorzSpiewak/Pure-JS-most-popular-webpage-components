/*==================== Player Function Class ====================*/
class controlKeys {
  constructor(config) {
    this.config = config;
  }

  playAudio(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if(!audio) return;  // Disablle error when other keys pressed
    audio.currentTime = 0; // Shortens the time of played audio
    audio.play();
  }

  removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
  }

  transitionListener(event) {
    const keys = this.config.$keys;
    keys.forEach(key => key.addEventListener('transitionend', this.removeTransition.bind(this)));
  }

  keyAnimation(event) {
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    key.classList.add('playing');
    this.transitionListener();
  }

  audioAndAnimation(event) {
    this.keyAnimation(event);
    this.playAudio(event);
  }

  eventHandler() {
    this.config.$window.addEventListener('keydown', this.audioAndAnimation.bind(this));
  }

  initialize() {
    this.eventHandler();
  }
}

const keysContainer = document.querySelectorAll('.keys-container');

keysContainer.forEach(key => {
  const play = new controlKeys ({
    $keys: document.querySelectorAll('.key'),
    $window: window
  });
  play.initialize();
})
