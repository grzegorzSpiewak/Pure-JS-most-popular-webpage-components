/* ==================== Flex Panel Gallery Class ==================== */
class flexGallery {
  constructor(config) {
    this.config = config;
  }

  toggleOpen() {
    this.classList.toggle('open');
  }

  toggleActive(e) {
    if(e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  }

  eventHandler() {
    const panels = this.config.$panels;
    panels.forEach(panel => {
      panel.addEventListener('click', this.toggleOpen);
      panel.addEventListener('transitionend', this.toggleActive);
    });
  }

  initialize() {
    this.eventHandler();
  }
}

const panels = document.querySelectorAll('.panels')
panels.forEach(panel => {
  const gallery = new flexGallery ({
    $panels: document.querySelectorAll('.panel')
  })
  gallery.initialize();
})
