const panelControl = {
  config: {
    $panels: document.querySelectorAll('.panel')
  },

  toggleOpen: function() {
    this.classList.toggle('open');
  },

  toggleActive: function(e) {
    if(e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    };
  },

  eventHandler: function() {
    this.config.$panels.forEach(panel => {
      panel.addEventListener('click', this.toggleOpen);
      panel.addEventListener('transitionend', this.toggleActive);
    });
  },
  /*===== Start function =====*/
  initialize: function() {
    this.eventHandler();
  }
}
panelControl.initialize();
