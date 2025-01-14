const products = [
    { name: "Black Mamba", category: "Men", brand: "Nike", price: 100, image: "jd1.png", id: 1 },
    { name: "Walnut Wonders", category: "Men", brand: "Adidas", price: 120, image: "jd2.png", id: 2 },
    { name: "White Sparkle", category: "Men", brand: "New Balance", price: 110, image: "jd5.png", id: 3 },
    { name: "Pink Venom", category: "Ladies", brand: "Adidas", price: 130, image: "jd6.png", id: 4 },
    { name: "The Earth Tones", category: "Ladies", brand: "Asics", price: 130, image: "jd9.png", id: 5 },
    { name: "Red Spark Whites", category: "Ladies", brand: "New Balance", price: 130, image: "jd10.png", id: 6 },
    { name: "Black Crocs", category: "Junior", brand: "New Balance", price: 90, image: "jd3.png", id: 7 },
    { name: "Mint Marvels", category: "Junior", brand: "Nike", price: 95, image: "jd7.png", id: 8 },
    { name: "Chestnut Classics", category: "Junior", brand: "Adidas", price: 95, image: "jd12.png", id: 9 },
    { name: "White Hot", category: "Kids", brand: "Asics", price: 80, image: "jd4.png", id: 10 },
    { name: "Yin Yang", category: "Kids", brand: "Asics", price: 80, image: "jd11.png", id: 11 },
    { name: "Cherry Bomb", category: "Kids", brand: "Nike", price: 85, image: "jd8.png", id: 12 }
];

function displayProducts(filteredProducts) {
    const productListElement = document.querySelector(".productlist");
    productListElement.innerHTML = ""; 

    if (filteredProducts.length === 0) {
        productListElement.innerHTML = "<p>No products found.</p>";
        return;
    }

    for (const product of filteredProducts) {
        const productItem = document.createElement("div");
        productItem.className = "product-item";

        const productLink = document.createElement("a");
        productLink.href = `details.html?id=${product.id}`; 
        productLink.classList.add("product-link"); 

        productLink.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Brand: ${product.brand}</p>
                <p>Price: RM${product.price}</p>
            </div>
        `;

        productItem.appendChild(productLink);
        productListElement.appendChild(productItem);
    }
}

displayProducts(products);

function filterProducts(filterType, filterValue) {
    const filteredProducts = products.filter(product => product[filterType] === filterValue);
    displayProducts(filteredProducts);
}

document.querySelector(".search-bar input").addEventListener("input", event => {
    const searchValue = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue) || 
        product.brand.toLowerCase().includes(searchValue) || 
        product.category.toLowerCase().includes(searchValue) 
    );
    displayProducts(filteredProducts); 
});

document.querySelectorAll(".sidebar ul li a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); 
        const filterValue = link.textContent.trim(); 
        const filterType = link.parentElement.parentElement.previousElementSibling.textContent.trim(); 
        const filterKey = filterType === "Categories" ? "category" : "brand"; 
        filterProducts(filterKey, filterValue);
    });
});

