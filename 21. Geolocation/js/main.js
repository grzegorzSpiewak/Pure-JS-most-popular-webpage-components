/* ==================== geolocation  ==================== */
const geolocation = {
  config: {
    $arrow: document.querySelector('.arrow'),
    $speed: document.querySelector('.speed-value')
  },

  position: function() {
    navigator.geolocation.watchPosition((data) => { //succes function
      console.log(data);
      this.speed(data);
      this.arrow(data);
    }, (error) => { //Fail function when user don't agree
      console.error(err);
    });
  },

  speed: function(data) {
    const speed = this.config.$speed;
    speed.textContent = data.coords.speed;
    console.log(data.coords.speed)
    return speed;
  },

  arrow: function(data) {
    const arrow = this.config.$arrow;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    console.log(data.coords.heading)
    return arrow;
  },

  initialize: function() {
    this.position();
  }
}
geolocation.initialize();
