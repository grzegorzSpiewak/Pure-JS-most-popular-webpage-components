/* ==================== Slide in on scroll ==================== */
class slideOnScroll {
  constructor(config) {
    this.config = config;
  }

  /* ==================== Functionality  ==================== */

  debounce(func, wait = 20, immediate = true) {
    console.log('ok')
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  slideCheck(e) {
    const images = this.config.$images;
    const window = this.config.$window;
    images.forEach(image => {
      const slideInAt = (window.scrollY + window.innerHeight) - image.height / 4;
      const imageBottom = image.offsetTop + image.height;
      const isHalfShown = slideInAt > image.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      this.addActiveClass(image, isHalfShown, isNotScrolledPast);
    })
  }

  addActiveClass(image, constOne, constTwo) {
    if(constOne && constTwo) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  }

  /* ==================== Event handlers  ==================== */

  slideCheckHandler() {
    const window = this.config.$window;
    const check = this.debounce(this.slideCheck.bind(this));
    window.addEventListener('scroll', check);
  }

  /* ==================== Initalize  ==================== */

  initialize() {
    this.slideCheckHandler();
  }
}

const section = document.querySelectorAll('.site-wrap')
section.forEach(image => {
  const imageSlide = new slideOnScroll ({
    $images: document.querySelectorAll('.slide-in'),
    $window: window
  })
  imageSlide.initialize();
})
