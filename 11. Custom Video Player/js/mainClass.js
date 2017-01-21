/*==================== Custom Video Player Class ==================== */
class videoPlayer {
  constructor(config) {
    this.config = config;
  }

  /*==================== Player functions ====================*/

  togglePlay() {
    const video = this.config.$video;
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  playIcon() {
    const toggle = this.config.$toggle;
    const video = this.config.$video;
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
  }

  skipTime(e) {
    const video = this.config.$video;
    const skippedTime = parseFloat(e.target.dataset.skip);
    video.currentTime += skippedTime;
  }

  rangeUpdates(e) {
    const video = this.config.$video;
    video[e.target.name] = e.target.value;
  }

  progressBar() {
    const video = this.config.$video;
    const progressBar = this.config.$progressBar;
    const videoProgress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${videoProgress}%`;
  }

  progressBarControl(e) {
    const video = this.config.$video;
    const barLength = e.target.offsetWidth; //progress bar length
    const currentLength = e.offsetX; //where clikc occured on progress bar
    const clikedProgress = (currentLength / barLength) * video.duration; // click = video progress
    video.currentTime = clikedProgress;
  }

  /*==================== Event Handlers ====================*/

  playVideo() {
    const clickToplay = [this.config.$video, this.config.$toggle];
    clickToplay.forEach(element => element.addEventListener('click', this.togglePlay.bind(this)));
  }

  changePlayIcon() {
    const video = this.config.$video;
    const events = ['play', 'pause']
    events.forEach(event => video.addEventListener(event, this.playIcon.bind(this)));
  }

  handleSkipTime() {
    const skipButtons = this.config.$skipButtons;
    skipButtons.forEach(button => button.addEventListener('click', this.skipTime.bind(this)));
  }

  handleRangeUpdates() {
    const ranges = this.config.$ranges;
    ranges.forEach(range => range.addEventListener('change', this.rangeUpdates.bind(this)));
  }

  handleProgressBar() {
    const video = this.config.$video;
    video.addEventListener('timeupdate', this.progressBar.bind(this));
  }

  handleProgressBarControl() {
    let mousedown= this.config.mousedown;
    const progress = this.config.$progress;
    progress.addEventListener('click', this.progressBarControl.bind(this));
    progress.addEventListener('mousemove', (e) => mousedown && this.progressBarControl.bind(this)(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
  }

  /* ==================== Initialize ====================*/

  initialize() {
    this.playVideo();
    this.changePlayIcon();
    this.handleSkipTime();
    this.handleRangeUpdates();
    this.handleProgressBar();
    this.handleProgressBarControl();
  }
}

const player = document.querySelectorAll('.player');
player.forEach(elem => {
  const playerControl = new videoPlayer ({
    $player: document.querySelector('.player'),
    $video: document.querySelector('.viewer'),
    $progress: document.querySelector('.progress'),
    $progressBar: document.querySelector('.progress__filled'),
    $toggle: document.querySelector('.toggle'),
    $skipButtons: document.querySelectorAll('[data-skip]'),
    $ranges: document.querySelectorAll('.player__slider'),
    /*Needed variables*/
    mousedown: false
  })
  playerControl.initialize()
})
