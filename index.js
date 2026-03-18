const container = document.querySelector("#popularGrid");
// Vi henter alle groceries
const endpoint = `https://dummyjson.com/products/category/groceries`;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData)
    .catch((error) => console.error("Fejl ved hentning:", error));
}

function showData(data) {
  const topFire = data.products.slice(0, 4);

  let markup = "";
  topFire.forEach((element) => {
    markup += `
      <a class="product-card" href="productlist.html?category=${element.category}"> 
        <img src="${element.thumbnail}" alt="${element.title}">
        <div class="card-content">
          <h3>${element.title}</h3>
          <p class="price">${element.price} Kr</p>
        </div>
      </a>`;
  });

  container.innerHTML = markup;
}

getData();
