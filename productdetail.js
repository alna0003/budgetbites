const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id"); // Dette fanger tallet efter ?id=
const productContainer = document.querySelector("#results");

// Her bruger vi et andet endpoint, der kun henter ÉT produkt baseret på ID
const endpoint = `https://dummyjson.com/products/${id}`;

function getProduct() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      showProduct(data); // Vi sender det enkelte produkt videre
    });
}
function showProduct(product) {
  productContainer.innerHTML = `
    <div class="product-visual">
       <img src="${product.thumbnail}" alt="${product.title}" class="product-visual__img">
    </div>

    <section class="product-detail-card">
       <h1 class="product-title">${product.title}</h1>
       <div class="product-rating">Rating: ${product.rating} / 5</div>
       <div class="product-price">${product.price} kr</div>
       <p class="product-description">${product.description}</p>
       <button class="btn btn--primary add-to-cart">Tilføj til kurv</button>
    </section>`;
}

if (id) {
  getProduct();
} else {
  productContainer.innerHTML = "<h2>Hov! Vi kunne ikke finde produktet.</h2>";
}
