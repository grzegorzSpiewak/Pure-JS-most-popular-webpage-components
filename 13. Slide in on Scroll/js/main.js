/* ==================== Slide in on scroll ==================== */
const slideOnScroll = {
  config: {
    $images: document.querySelectorAll('.slide-in'),
    $window: window
  },

  /* ==================== Functionality  ==================== */
  
  /* Debounce function  - to avoid lounching event to many times*/
  debounce: function(func, wait = 20, immediate = true) {
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
    };
  },
  /* Check image height position on screen */
  slideCheck: function(e) {
    const images = this.config.$images;
    const window = this.config.$window;
    images.forEach(image => {
      const slideInAt = (window.scrollY + window.innerHeight) - image.height / 4; //place where image will be shown
      const imageBottom = image.offsetTop + image.height; //Bottom of the image
      const isHalfShown = slideInAt > image.offsetTop; //Position when image is half way shown
      const isNotScrolledPast = window.scrollY < imageBottom; //To be sure that image will be displayed
      this.addActiveClass(image, isHalfShown, isNotScrolledPast);
    })
  },
  /* Funct to toggle active class */
  addActiveClass(image, constOne, constTwo) {
    if(constOne && constTwo) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  },

  /* ==================== Event handlers  ==================== */

  slideCheckHandler: function() {
    const window = this.config.$window;
    const check = this.debounce(this.slideCheck.bind(this));
    window.addEventListener('scroll', check);
  },

  /* ==================== Initalize  ==================== */

  initalize: function() {
    this.slideCheckHandler()
  }
}
slideOnScroll.initalize();
