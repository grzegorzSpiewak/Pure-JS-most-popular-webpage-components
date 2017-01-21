/* ==================== geolocation  ==================== */
class geolocation {
  constructor(config) {
    this.config = config;
  }

  position() {
    navigator.geolocation.watchPosition((data) => { //succes function
      console.log(data);
      this.speed(data);
      this.arrow(data);
    }, (error) => { //Fail function when user don't agree
      console.error(err);
    });
  }

  speed(data) {
    const speed = this.config.$speed;
    speed.textContent = data.coords.speed;
    console.log(data.coords.speed)
    return speed;
  }

  arrow(data) {
    const arrow = this.config.$arrow;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    console.log(data.coords.heading)
    return arrow;
  }

  initialize() {
    this.position();
  }
}

const body = document.querySelectorAll('body');
body.forEach(elem => {
  const location = new geolocation ({
    $arrow: document.querySelector('.arrow'),
    $speed: document.querySelector('.speed-value')
  })
  location.initialize();
})
