// Example JavaScript code for adding products dynamically
const productsContainer = document.querySelector('.products');

// Example data for products
const products = [
    { name: 'Hello Kitty T-shirt', price: 20 },
    { name: 'Kuromi Hoodie', price: 30 },
    { name: 'Hello Kitty Dress', price: 25 }
];

// Function to generate product listings
function renderProducts() {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button>Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Call the function to render products
renderProducts();
