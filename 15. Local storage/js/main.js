/* ==================== Local Storage ==================== */
const localStorage = {
  config: {
    /* DOM elements */
    $addItems: document.querySelector('.add-items'),
    $itemList: document.querySelector('.plates'),
    $localStorage: window.localStorage,
    $window: window,
    /* Neded variables */
    itemArray: JSON.parse(window.localStorage.getItem('itemArray')) || [],
  },

  /* ==================== Functionality ==================== */

  /* function to fill the list with dishes */
  completeList: function(dishes = [], dishList) {
   dishList.innerHTML = dishes.map((dish, i) => {
     return`
       <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${dish.done ? 'checked' : ''} />
          <label for="item${i}">${dish.text}</label>
       </li>
     `;         // ${dish.done? ...} part allows input to be displayed as not checked
   }).join(''); //map function return array and join changes it to string
  },

  /* function which check typed value and creates list of items */
  addItem: function(e) {
    e.preventDefault(); //Stops refreshing page
    const localStorage = this.config.$localStorage;
    const itemArray = this.config.itemArray;
    const itemList = this.config.$itemList;
    const inputValue = e.target.querySelector('[name=item]').value;
    const item = {
      text: inputValue,
      done: false
    };

    itemArray.push(item);
    this.completeList(itemArray, itemList);
    localStorage.setItem('itemArray', JSON.stringify(itemArray)); //Put dieshes in storage
    e.target.reset(); //resets typed in value
  },
  //Function to display what is in storage after refresh
  listDisplay: function() {
    const itemArray = this.config.itemArray;
    const itemList = this.config.$itemList;

    this.completeList(itemArray, itemList);
  },
  //Function to keep icon when chekced
  checkBoxIcon: function(e) {
    const localStorage = this.config.$localStorage;
    const itemArray = this.config.itemArray;
    const itemList = this.config.$itemList;
    const checkbox = e.target;
    const index = checkbox.dataset.index;  //index is setup in completeList function

    if (!e.target.matches('input')) return; // skip this unless it's an input
    itemArray[index].done = !itemArray[index].done;
    localStorage.setItem('itemArray', JSON.stringify(itemArray));
  },

  /* ==================== Event handlers ==================== */

  addItemHandler: function() {
    const addItems = this.config.$addItems;
    addItems.addEventListener('submit', this.addItem.bind(this));
  },

  listDisplayHandler: function() {
    const window = this.config.$window;
    window.addEventListener('onload',this.listDisplay());
  },

  checkBoxIconHandler: function() {
    const itemList = this.config.$itemList;
    itemList.addEventListener('click', this.checkBoxIcon.bind(this));
  },

  /* ==================== Initialize ==================== */

  initialize: function() {
    this.listDisplayHandler();
    this.addItemHandler();
    this.checkBoxIconHandler();
  }
}
localStorage.initialize();
