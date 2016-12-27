/* ===== Type ahead with jason Data ===== */
const displayHint = {
    config: {
        $searchInput: document.querySelector('.search'),
        $suggestions: document.querySelector('.suggestions'),
        ready: false,
        link: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    },
    /* ===== Return object list from API and initialize function ===== */
    getInformations: function() {
      const source = this.config.link,
            informations = [];
      fetch(source)
            .then(blob => blob.json())
            .then(data => {
                this.data = data;
                this.ready = true;
                this.eventHandler();
            })
    },
    /* ===== Compare information typed in input with data in JSON =====*/
    findMatches: function(wordToMatch) {
        const cities = this.data;
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        })
    },
    /* ===== Add commas to numbers to make them more readable ===== */
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    /* ===== Display results on page ===== */
    displayMatches: function() {
        const inputValue = this.config.$searchInput.value,
              matchArray = this.findMatches(inputValue),
              commas = this.numberWithCommas;
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
    },
    /* ===== Assign display function to diffrent events ===== */
    eventHandler: function() {
        const input = this.config.$searchInput,
              events = 'keyup change'.split(' ');
        for (var i = 0; i < events.length; i++) {
          input.addEventListener(events[i], this.displayMatches.bind(this))
        };
    },
}
displayHint.getInformations();
