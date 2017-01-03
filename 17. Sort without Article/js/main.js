/* ==================== Sort by name ==================== */
const sortBand = {
  config: {
    $bandsDiv: document.querySelector('#bands'),
    //Array with band name
    bands: ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog']
  },
  /* ==================== Functionality ==================== */

  strip: function(string) {
    return string.replace(/^(a |the |an )/i, '').trim();
  },

  sort: function(array) {
    array.sort((a, b) => this.strip(a) > this.strip(b) ? 1 : -1);
    return array;
  },

  sortedArray: function() {
    const bands = this.config.bands;
    return this.sort(bands)
  },

  /* ==================== Instert sorted DATA in DOM ==================== */

  sortHandler: function() {
    const bandsDiv = this.config.$bandsDiv;
    const sortedBands = this.sortedArray();
    bandsDiv.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join('');
  },

  /* ==================== Initialize ==================== */
  initialize: function() {
    this.sortHandler()
  }
}
sortBand.initialize();
