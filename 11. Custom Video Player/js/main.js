/*===== Custom Video Player ===== */
const videoPlayer = {
  config: {
    /*Set doom elements*/
    $player: document.querySelector('.player'),
    $video: document.querySelector('.viewer'),
    $progress: document.querySelector('.progress'),
    $progressBar: document.querySelector('.progress__filled'),
    $toggle: document.querySelector('.toggle'),
    $skipButtons: document.querySelectorAll('[data-skip]'),
    $ranges: document.querySelectorAll('.player__slider'),
    /*Needed variables*/
    mousedown: false
  },

  /*==================== Player functions ====================*/

  /*Play and stop video*/
  togglePlay: function() {
    const video = this.config.$video;
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  },
  /*Change icon on stop or play*/
  playIcon: function() {
    const toggle = this.config.$toggle;
    const video = this.config.$video;
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
  },
  /*Skip time*/
  skipTime: function(e) {
    const video = this.config.$video;
    const skippedTime = parseFloat(e.target.dataset.skip); //change string to number
    video.currentTime += skippedTime;
  },
  /*Controls time and volume*/
  rangeUpdates: function(e) {
    const video = this.config.$video;
    video[e.target.name] = e.target.value;
  },
  /*Control video progres animation*/
  progressBar: function() {
    const video = this.config.$video;
    const progressBar = this.config.$progressBar;
    const videoProgress = (video.currentTime / video.duration) * 100; //The % of video passed time
    progressBar.style.flexBasis = `${videoProgress}%`; //Changes flexBasis style in CSS
  },
  /*Control progressBar and allows to control video*/
  progressBarControl: function(e) {
    const video = this.config.$video;
    const barLength = e.target.offsetWidth; //progress bar length
    const currentLength = e.offsetX; //where clikc occured on progress bar
    const clikedProgress = (currentLength / barLength) * video.duration; // click = video progress
    video.currentTime = clikedProgress;
  },

  /*==================== Event Handlers ====================*/

  /*Play video handler*/
  playVideo: function() {
    /* Array with elements to add same function */
    const clickToplay = [this.config.$video, this.config.$toggle];
    clickToplay.forEach(element => element.addEventListener('click', this.togglePlay.bind(this)));
  },
  /*Play icon handler*/
  changePlayIcon: function() {
    const video = this.config.$video;
    /* Array with events to add same function */
    const events = ['play', 'pause']
    events.forEach(event => video.addEventListener(event, this.playIcon.bind(this)));
  },
  /*Skip time handler*/
  handleSkipTime: function() {
    const skipButtons = this.config.$skipButtons;
    skipButtons.forEach(button => button.addEventListener('click', this.skipTime.bind(this)));
  },
  /*RangeUpdates handler */
  handleRangeUpdates: function() {
    const ranges = this.config.$ranges;
    ranges.forEach(range => range.addEventListener('change', this.rangeUpdates.bind(this)));
  },
  /*progressBar handler */
  handleProgressBar: function() {
    const video = this.config.$video;
    video.addEventListener('timeupdate', this.progressBar.bind(this));
  },
  /*progressBarControl handler */
  handleProgressBarControl: function() {
    let mousedown= this.config.mousedown;
    const progress = this.config.$progress;
    progress.addEventListener('click', this.progressBarControl.bind(this));
    progress.addEventListener('mousemove', (e) => mousedown && this.progressBarControl.bind(this)(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
  },

  /* ==================== Initialize ====================*/

  initialize: function() {
    this.playVideo();
    this.changePlayIcon();
    this.handleSkipTime();
    this.handleRangeUpdates();
    this.handleProgressBar();
    this.handleProgressBarControl();
  },
}
videoPlayer.initialize();
