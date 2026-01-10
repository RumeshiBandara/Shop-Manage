let state = {
    products: [],
    isEditing: false
};

const API_URL = 'https://dummyjson.com/products';


const productGrid = document.getElementById('productGrid');
const loader = document.getElementById('loader');
const productModal = document.getElementById('productModal');
const modalContainer = document.getElementById('modalContainer');
const productForm = document.getElementById('productForm');

document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}?limit=10`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        state.products = data.products;
        renderProducts();
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('Failed to load products. Please check your connection.');
    } finally {
        loader.classList.add('hidden');
        productGrid.classList.remove('opacity-0');
    }
}



