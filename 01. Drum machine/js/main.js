/*===== Player Function =====*/
const playKeys = {
  config: {
    $keys: document.querySelectorAll('.key'),
    $window: window
  },

  playAudio: function (event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    if(!audio) return;  // Disablle error when other keys pressed
    audio.currentTime = 0; // Shortens the time of played audio
    audio.play();
  },

  removeTransition: function (event) {    // Removes animation
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
  },

  transitionListener: function(event) { // Listenes to "changes on keys" and apply remove function
    const keys = this.config.$keys;
    keys.forEach(key => key.addEventListener('transitionend', this.removeTransition.bind(this)));
  },

  keyAnimation: function (event) {
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    key.classList.add('playing');
    this.transitionListener();
  },

  audioAndAnimation: function(event) { //One to rule them all
    this.keyAnimation(event);
    this.playAudio(event);
  },

  eventHandler: function (event) {
    this.config.$window.addEventListener('keydown', this.audioAndAnimation.bind(this));
  },

  initialize: function() {
    this.eventHandler();
  }
};

playKeys.initialize();
