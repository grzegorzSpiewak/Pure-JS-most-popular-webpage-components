/* ========== Select many checkbox with shift ========== */
class selectCheckbox {
  constructor(config) {
    this.config = config;
  }

  handleCheck(e) {
    const checkbox = this.config.$checkboxes;
    let lastChecked = this.config.lastChecked;
    let inBetween = this.config.inBetween;

    if(e.shiftKey && e.target.checked) {
      checkbox.forEach(checkbox => {
        if(checkbox === this.target || checkbox.checked) {
          inBetween = !inBetween;
        }
        if (inBetween) {
          checkbox.checked = true;
        }
      })
    }
    lastChecked = this;
  }

  eventHandler() {
    const checkbox = this.config.$checkboxes;
    checkbox.forEach(checkbox => {
      checkbox.addEventListener('click', this.handleCheck.bind(this))
    })
  }

  initialize() {
    this.eventHandler();
  }
}

const inboxes = document.querySelectorAll('.inbox');
inboxes.forEach(inbox => {
  const checkbox = new selectCheckbox ({
    $checkboxes: document.querySelectorAll('.inbox input[type="checkbox"]'),
    lastChecked: undefined,
    inBetween: false
  })
  checkbox.initialize()
})
