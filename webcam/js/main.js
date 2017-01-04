/* ==================== Tally up with reduce  ==================== */
const photobooth = {
  config: {
    $video: document.querySelector('.player'),
    $canvas: document.querySelector('.photo'),
    $strip: document.querySelector('.strip'),
    $snap: document.querySelector('.snap'),
    $window: window
  },

  /* ==================== Functionality  ==================== */

  getVideo: function() {
    const video = this.config.$video;
    const window = this.config.$window;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
      })
      .catch(err => {      // when user didng give acces to camera
        console.error(`OH NO!!!`, err);
      });
  },

  paintToCanvas: function(source) {
    const canvas = this.config.$canvas;
    const video = this.config.$video;
    const ctx = canvas.getContext('2d');
    /* Set up width and height of canvas */
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    /* streem in canvas */
    ctx.drawImage(video, 0, 0, width, height);
    /* refresh canvas 60 fps for 1 sec */
    window.requestAnimationFrame(() => {
      this.paintToCanvas();
    });
  },

  /* ==================== Handlers  ==================== */
  playVideo: function() {
    const video = this.config.$video;
    video.addEventListener('canplay', this.paintToCanvas.bind(this))
  },

  /* ==================== Initialize  ==================== */
  initialize: function() {
    this.getVideo();
    this.playVideo();
  },
}
photobooth.initialize();
