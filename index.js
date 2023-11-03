const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach(function (item) {
        const itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) !== -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function additem(e) {
    e.preventDefault();
    const input = itemInput.value;
    if (itemInput.value === '') {
        alert('Please insert a valid item');
        return;
    }
    const newItem = document.createElement('li');
    newItem.className = 'list-group-item list-group-item-secondary';
    newItem.appendChild(document.createTextNode(input));
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));
    newItem.appendChild(deleteBtn);
    itemList.appendChild(newItem);
    itemInput.value = '';
    checkUI();
}

function remove(e) {
    if (confirm('Are you sure?')) {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            itemList.removeChild(li);
            checkUI();
        }
    }
}

function clearall(e) {
    if (confirm('Are you sure you want to clear all items?')) {
        itemList.innerHTML = '';
        checkUI();
    }
}

itemForm.addEventListener('submit', additem);
itemList.addEventListener('click', remove);
clearBtn.addEventListener('click', clearall);
itemFilter.addEventListener('keyup', filterItems);

checkUI(); // Call this to initialize the UI
