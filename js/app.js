

/* Loading products data from api */  
const loadProducts = () => {

  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

};

//setModal
const setProductModal = (product) => {

    document.getElementById('productModalLabel').innerText=product.title;
    console.log(product);
    
    document.getElementById('modalBody').innerHTML = `
    <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Description: ${product.description}</p>
      <div class="rate">
        Average Rating: ${product.rating.rate}
        <p>Rated by ${product.rating.count} People</p>
      </div>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>

    
    `;

}

//Single product data
const getSingleProductData = (id) =>{
  console.log(id);
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>setProductModal(json))
}




// show all product in UI 
const showProducts = (products) => {
  
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
   
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
    
      <div class="rate">
        Average Rating: ${product.rating.rate}
        <p>Rated by ${product.rating.count} People</p>
      </div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>


      <button id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal" onclick="getSingleProductData(${product.id})" >Details</button></div>
      `; 
      
      document.getElementById("all-products").appendChild(div);
  }
};



let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  console.log('cob = '+converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    

  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};


loadProducts();
