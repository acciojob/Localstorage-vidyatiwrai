const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = loadItems();

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem('items')) || [];
  } catch (error) {
    console.error('Error loading items from localStorage:', error);
    return [];
  }
}

function saveItems() {
  localStorage.setItem('items', JSON.stringify(items));
}

function addItem(e) {
  e.preventDefault();
  const textInput = this.querySelector('[name=item]');
  const text = textInput.value.trim();
  if (text === '') return;

  const newItem = {
    text,
    done: false,
  };

  items.push(newItem);
  populateList();
  saveItems();
  this.reset();
}

function populateList() {
  itemsList.innerHTML = items
    .map((item, i) => `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''} />
        <label for="item${i}">${item.text}</label>
      </li>
    `)
    .join('');
}

function toggleDone(e) {
  if (!e.target.matches('input[type="checkbox"]')) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  saveItems();
  populateList();
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList();
