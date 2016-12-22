/*===== Blur and Paadding Control =====*/
const control = {
  config: {
    $inputs: document.querySelectorAll('.controls input')
  },
  /*===== handle scale and blur =====*/
  handleUpdate: function() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  },
  /*===== Change scale and blur =====*/
  eventHandler: function() {
    const events = 'change mousemove'.split(' ');
    const inputs = this.config.$inputs;
    /*===== Loop to add handler to diffrent events =====*/
    for (var i = 0, len = events.length; i < len; i++) {
      inputs.forEach(input => input.addEventListener(events[i], this.handleUpdate));
    }
  },
  /*===== Start function =====*/
  initialize: function() {
    this.eventHandler();
  }
}
control.initialize();
