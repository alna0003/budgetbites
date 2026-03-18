const container = document.querySelector("#results");
const endpoint = `https://dummyjson.com/products/category/groceries`;

let allData = [];

// Henter data
function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = data.products;
      showData(allData);
    });
}

// Viser data (Markup)
function showData(products) {
  let markup = "";
  products.forEach((element) => {
    markup += `
      <a href="productdetail.html?id=${element.id}" class="product-card">
        <article class="item ${element.stock < 5 ? "low-stock" : ""}">
          <img src="${element.thumbnail}" alt="${element.title}"/>
          <h3>${element.title}</h3>
          <div class="rating">⭐ ${element.rating}</div>
          <div class="price">Kr ${element.price}</div>
        </article>
      </a>`;
  });
  container.innerHTML = markup;
}

// Filtrerings-funktion
function filterAndSort() {
  const maxPriceValue = document.querySelector("#maxPrice").value;
  const sortValue = document.querySelector("#sortBy").value;

  // Start med alle data
  let filteredData = [...allData];

  // Filtrer på pris
  if (maxPriceValue !== "") {
    filteredData = filteredData.filter(
      (item) => item.price <= Number(maxPriceValue),
    );
  }

  // Sortering
  if (sortValue === "price-low") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-high") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  showData(filteredData);
}

// Event listeners på dropdowns
document.querySelector("#maxPrice").addEventListener("change", filterAndSort);
document.querySelector("#sortBy").addEventListener("change", filterAndSort);

getData();
