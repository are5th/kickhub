function addToCart() {
    const size = document.getElementById('size-select').value;

    if (!size) {
        alert("Please select a size before adding to cart.");
        return;
    }

    if (!product) {
        alert("Unable to add the product to the cart. Please try again.");
        return;
    }

    const productToAdd = {
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: size,
        quantity : 1
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
}
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
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product = products.find(p => p.id === parseInt(productId));
if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-category').innerText = `Category: ${product.category}`;
    document.getElementById('product-brand').innerText = `Brand: ${product.brand}`;
    document.getElementById('product-price').innerText = `Price: RM${product.price}`;
} else {
    document.body.innerHTML = "<h2>Product not found</h2>";
}    
    