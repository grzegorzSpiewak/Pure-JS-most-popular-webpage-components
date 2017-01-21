/* ==================== Follow Along Link Highlighter  ==================== */
const Highlighter = {
  config: {
    $triggers: document.querySelectorAll('a'),
    $highlight: document.createElement('span'),
    $body: document.body
  },

  highlight: function() {
    const highlight = this.config.$highlight;
    const body = this.config.$body;
    highlight.classList.add('highlight');
    body.appendChild(highlight);
  },

  eventHandler: function() {
    const triggers = this.config.$triggers;
    triggers.forEach(a => a.addEventListener('mouseenter', this.highlight.bind(this)));
  },

  initialize: function() {
    this.eventHandler();
  }
}

Highlighter.initialize();
