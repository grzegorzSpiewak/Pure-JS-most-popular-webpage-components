/* ===== Select many checkbox ===== */
const selectCheckbox = {
  config: {
    $checkboxes: document.querySelectorAll('.inbox input[type="checkbox"]'),
    lastChecked: undefined,
    inBetween: false
  },

  handleCheck: function(e) {
    const checkbox = this.config.$checkboxes;
    let lastChecked = this.config.lastChecked;
    let inBetween = this.config.inBetween;

    if(e.shiftKey && e.target.checked) {
      checkbox.forEach(checkbox => {
        console.log(checkbox)
        if(checkbox === this.target || checkbox.checked) {
          inBetween = !inBetween;
          console.log("start to watch")
        }
        if (inBetween) {
          checkbox.checked = true;
        }
      })
    }
    lastChecked = this;
  },

  eventHandler: function() {
    const checkbox = this.config.$checkboxes;
    checkbox.forEach(checkbox => {
      checkbox.addEventListener('click', this.handleCheck.bind(this))
    })
  },

  initialize: function() {
    this.eventHandler();
  }
}
selectCheckbox.initialize();
