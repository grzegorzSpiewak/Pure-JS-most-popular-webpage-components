/* ===== Type ahead with jason Data ===== */

class displayHint_ {
  constructor(config) {
    this.config = config;
  }

  getInformations() {
    const source = this.config.link,
          informations = [];
    fetch(source)
          .then(blob => blob.json())
          .then(data => {
              this.data = data;
              this.ready = true;
              this.eventHandler();
          });
  }

  findMatches(wordToMatch) {
    const cities = this.data;
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  displayMatches() {
    const inputValue = this.config.$searchInput.value,
          matchArray = this.findMatches(inputValue),
          commas = this.numberWithCommas,
          html = matchArray.map(place =>{
            const regex = new RegExp(inputValue, 'gi'),
                  /* ===== Add effects which highligths searched words in results ===== */
                  cityName = place.city.replace(regex, `<span class="hl">${inputValue}</span>`),
                  stateName = place.state.replace(regex, `<span class="hl">${inputValue}</span>`);
            return `
              <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${commas(place.population)}</span>
              </li>
            `;
        }).join('')
    this.config.$suggestions.innerHTML = html;
  }

  eventHandler() {
    const input = this.config.$searchInput,
          events = 'keyup change'.split(' ');
    for (var i = 0; i < events.length; i++) {
      input.addEventListener(events[i], this.displayMatches.bind(this))
    };
  }
}

const forms = document.querySelectorAll('form');

forms.forEach(form => {
  const v1 = new displayHint_({
      $searchInput: form.querySelector('.search'),
      $suggestions: form.querySelector('.suggestions'),
      ready: false,
      link: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
  });

  v1.getInformations();
});
