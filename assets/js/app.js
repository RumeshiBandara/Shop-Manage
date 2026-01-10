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