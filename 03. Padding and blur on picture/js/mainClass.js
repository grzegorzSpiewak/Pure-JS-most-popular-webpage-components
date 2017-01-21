/*===== Blur and Paadding Control Class =====*/
class pictureEffects {
  constructor(config) {
    this.config = config;
  }

  handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  }

  eventHandler() {
    const events = 'change mousemove'.split(' ');
    const inputs = this.config.$inputs;
    /*===== Loop to add handler to diffrent events =====*/
    for (var i = 0; i < events.length; i++) {
      inputs.forEach(input => input.addEventListener(events[i], this.handleUpdate));
    }
  }

  initialize() {
    this.eventHandler();
  }
}

const controls = document.querySelectorAll('.controls')
inputs.forEach(input => {
  const inputs = new pictureEffects ({
    $inputs: document.querySelectorAll('input')
  });
  controls.initialize();
})
