/*===== Clock control =====*/
const clock = {
  config: {
    $secondsHand: document.querySelector('.second-hand'),
    $minutesHand: document.querySelector('.min-hand'),
    $hourHand: document.querySelector('.hour-hand'),
  },
  /*===== Interval will refresh clock every 1 sec =====*/
  interval: function(func, time) {
    setInterval(func.bind(this), time);
  },
  /*===== Seconds hand animation and position =====*/
  seconds: function() {
    const seconds = new Date().getSeconds();
    const secondsRotation = ((seconds / 60) * 360) + 90;
    this.config.$secondsHand.style.transform = `rotate(${secondsRotation}deg)`;
  },
  /*===== Minutes hand animation and position =====*/
  minutes: function() {
    const minutes = new Date().getMinutes();
    const minutesRotation = ((minutes / 60) * 360) + 90;
    this.config.$minutesHand.style.transform = `rotate(${minutesRotation}deg)`;
  },
  /*===== Hours hand animation and position =====*/
  hour: function() {
    const hour = new Date().getHours();
    const hourRotation = ((hour / 12) * 360) + 90;
    this.config.$hourHand.style.transform = `rotate(${hourRotation}deg)`;
  },
  /*===== One to rule them all =====*/
  setDate: function() {
    this.seconds();
    this.minutes();
    this.hour();
  },
  /*===== Refresh hands position every second =====*/
  clockWork: function() {
    const that = this;
    that.interval(that.setDate.bind(this), 1000);
  },
  /*===== Start clock =====*/
  initialize: function() {
    this.clockWork();
  }
}
clock.initialize();
