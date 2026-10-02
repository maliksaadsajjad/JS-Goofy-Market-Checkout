const products = {
  A: { name: 'Apple', price: 5 },
  B: { name: 'Mango', price: 10 },
  C: { name: 'Peach', price: 15 },
  D: { name: 'Orange', price: 20 },
};

const section = document.querySelector('section');

section.innerHTML = `
  <h1>Market Checkout</h1>

  <div class="product-list">
    <h3>Available Products</h3>
    <p>🍎 Apple - $5</p>
    <p>🥭 Mango - $10</p>
    <p>🍑 Peach - $15</p>
    <p>🍊 Orange - $20</p>
  </div>

  <form id="checkoutForm">
    <label for="product">Select a product:</label>
    <select id="product">
      <option value="" disabled selected>Choose a product</option>
      <option value="A">Apple - $5</option>
      <option value="B">Mango - $10</option>
      <option value="C">Peach - $15</option>
      <option value="D">Orange - $20</option>
    </select>

    <label for="quantity">Enter quantity:</label>
    
    <input
    type="text"
    id="quantity"
    placeholder="Enter quantity"
    inputmode="numeric"
    />

    <button type="submit">Calculate Bill</button>
  </form>

  <p id="error" role="alert"></p>
  <div id="result" aria-live="polite"></div>
`;

const modalHTML = `
  <div id="quantityModal" class="modal">
    <div class="modal-content">
      <button
        id="closeModal"
        class="close-btn"
        aria-label="Close"
      >&times;</button>

      <pre class="ascii-art">
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⣠⡄⢿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠌⣩⣌⠻⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⢛⣭⣿⣽⢁⣶⣿⣿⣿⣿⣶⡌⢻⠻⢿⣿⣿
⣿⣿⣿⡇⢚⣿⠿⢃⡾⣿⡏⢻⣿⢻⣿⣿⠘⣿⣦⢹⣿
⣿⡿⠟⣃⣨⣥⣶⣟⣴⣿⣿⣿⡈⠟⠘⣿⣿⣷⣌⡛⠸⣿
⣿⠁⠠⣭⣙⠻⣿⣿⣿⠟⢋⣴⣾⡷⣤⡙⠻⠟⠋⠁⠈
⡿⢠⣦⡉⠛⣓⣈⠃⢰⣶⣶⡖⢲⣆⣙⡛⠀⠛⠗⠀⣷
⢁⠞⣹⣾⣿⣿⣿⡟⢿⣿⣿⣿⡎⢿⣿⣽⣦⣱⣄⢺⣿
⡀⣾⣭⠛⣛⠛⠿⣿⡘⣿⣿⣿⠇⣼⣿⣿⣿⢉⠛⠂⣿
⣷⣌⠋⢸⣿⣿⣷⣤⡙⠻⠟⣁⡀⠻⠿⠟⣁⠞⣡⣾⣿
⣿⣿⣷⣶⣶⣶⣾⡘⡟⣠⠂⣿⡀⣿⡘⡏⢷⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣯⡔⣰⡇⣾⣿⣷⡌⣧⡘⠦⡙⣿⣿
      </pre>

      <h3>Invalid Values!</h3>
      <p>Is it so hard for your smooth brain to enter valid values?!</p>

      <button id="modalOk" class="modal-ok">OK</button>
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

const form = document.querySelector('#checkoutForm');
const productInput = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
const result = document.querySelector('#result');
const error = document.querySelector('#error');

const quantityModal = document.querySelector('#quantityModal');
const closeModal = document.querySelector('#closeModal');
const modalOk = document.querySelector('#modalOk');

function showQuantityModal() {
  quantityModal.style.display = 'flex';
}

function hideQuantityModal() {
  quantityModal.style.display = 'none';
}

closeModal.addEventListener('click', hideQuantityModal);
modalOk.addEventListener('click', hideQuantityModal);

quantityModal.addEventListener('click', function (event) {
  if (event.target === quantityModal) {
    hideQuantityModal();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    hideQuantityModal();
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const choice = productInput.value;
  const quantityValue = quantityInput.value.trim();

  error.textContent = '';
  result.style.display = 'none';

  if (!products[choice]) {
    showQuantityModal();
    return;
  }

  if (!/^[1-9]\d*$/.test(quantityValue)) {
    showQuantityModal();
    return;
  }

  const quantity = Number(quantityValue);

  if (!Number.isSafeInteger(quantity)) {
    showQuantityModal();
    return;
  }

  const selectedProduct = products[choice];
  const total = selectedProduct.price * quantity;

  if (!Number.isSafeInteger(total)) {
    showQuantityModal();
    return;
  }

  result.innerHTML = `
    <h3>Bill Summary</h3>
    <p><strong>Product:</strong> ${selectedProduct.name}</p>
    <p><strong>Price per item:</strong> $${selectedProduct.price}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <hr>
    <h3>Total Bill: $${total.toLocaleString('en-US')}</h3>
  `;

  result.style.display = 'block';
});
