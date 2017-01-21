/* ==================== Mouse move and shadow Class ==================== */
class mouseMoveEffect {
  constructor(config) {
    this.config = config;
  }

  /* ==================== Functionality ==================== */

  shadow(x, y) {
    const text = this.config.$text;
    text.style.textShadow =
      `${x}px ${y}px 0 rgba(255,0,255,0.7),
       ${x * -1}px ${y}px 0 rgba(0,255,255,0.7),
       ${y}px ${x * -1}px 0 rgba(0,255,0,0.7),
       ${y * -1}px ${x}px 0 rgba(0,0,255,0.7)`
  }

  shadowPosition(e) {
    const hero = this.config.$hero;
    const walk = this.config.walk;
    const heroWidth = hero.offsetWidth;
    const heroHeight = hero.offsetHeight;
    let eventX = e.offsetX;
    let eventY = e.offsetY;
    //Deal with nested elements
    if(this !== e.target) {
       eventX = eventX + e.target.offsetLeft;
       eventY = eventY + e.target.offsetTop;
    };
    const xWalk = Math.round((eventX / heroWidth * walk) - (walk / 2));
    const yWalk = Math.round((eventY / heroHeight * walk) - (walk / 2));
    this.shadow(xWalk, yWalk);
  }

  /* ==================== Event handlers ==================== */

  eventHandler() {
    const hero = this.config.$hero;
    hero.addEventListener('mousemove', this.shadowPosition.bind(this))
  }

  /* ==================== Initialize ==================== */

  initialize() {
    this.eventHandler();
  }
}

const divs = document.querySelectorAll('div')
divs.forEach(div => {
  const shadowEffect = new mouseMoveEffect ({
    $hero: document.querySelector('.hero'),
    $text: document.querySelector('h1'),
    /* Needed variables */
    walk: 200
  })
  shadowEffect.initialize();
})
