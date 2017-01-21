/*==================== Clock control Class ====================*/
class clock {
  constructor(config) {
    this.config = config;
  }
  /*===== Interval will refresh clock every 1 sec =====*/
  interval(func, time) {
    setInterval(func.bind(this), time);
  }
  /*===== Seconds hand animation and position =====*/
  seconds() {
    const seconds = new Date().getSeconds();
    const secondsRotation = ((seconds / 60) * 360) + 90;
    this.config.$secondsHand.style.transform = `rotate(${secondsRotation}deg)`;
  }
  /*===== Minutes hand animation and position =====*/
  minutes() {
    const minutes = new Date().getMinutes();
    const minutesRotation = ((minutes / 60) * 360) + 90;
    this.config.$minutesHand.style.transform = `rotate(${minutesRotation}deg)`;
  }
  /*===== Hours hand animation and position =====*/
  hour() {
    const hour = new Date().getHours();
    const hourRotation = ((hour / 12) * 360) + 90;
    this.config.$hourHand.style.transform = `rotate(${hourRotation}deg)`;
  }
  /*===== Set date =====*/
  setDate() {
    this.seconds();
    this.minutes();
    this.hour();
  }
  /*===== Refresh hands position every second =====*/
  clockWork() {
    const that = this;
    that.interval(that.setDate.bind(this), 1000);
  }
  /*===== Start clock =====*/
  initialize() {
    this.clockWork();
  }
}

const clockAnimation = document.querySelectorAll('.clock');

clockAnimation.forEach(elem => {
  const clockWork = new clock ({
    $secondsHand: document.querySelector('.second-hand'),
    $minutesHand: document.querySelector('.min-hand'),
    $hourHand: document.querySelector('.hour-hand'),
  });
  clockWork.initialize();
})
