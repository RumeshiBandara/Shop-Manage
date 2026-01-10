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

function renderProducts() {
    productGrid.innerHTML = '';
    state.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in';
        
        card.innerHTML = `
            <div class="relative aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden">
                <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-full object-contain p-4">
                <span class="absolute top-2 right-2 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    ${product.category}
                </span>
            </div>
            <h3 class="font-bold text-gray-800 line-clamp-1">${product.title}</h3>
            <p class="text-teal-600 font-bold text-lg mt-1">$${product.price}</p>
            
            <div class="mt-auto pt-4 flex gap-2">
                <button onclick="handleEdit(${product.id})" class="flex-1 bg-gray-50 hover:bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg transition-colors border border-blue-100">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button onclick="handleDelete(${product.id})" class="flex-1 bg-gray-50 hover:bg-red-50 text-red-600 font-semibold py-2 rounded-lg transition-colors border border-red-100">
                    <i class="fas fa-trash mr-1"></i> Delete
                </button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        title: document.getElementById('pTitle').value,
        price: parseFloat(document.getElementById('pPrice').value),
        category: document.getElementById('pCategory').value,
        thumbnail: document.getElementById('pImage').value || 'https://via.placeholder.com/150'
    };

    try {
        if (state.isEditing) {
            // Update Logic
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const updated = await res.json();
            
            // Local update for instant UI feedback
            state.products = state.products.map(p => p.id == id ? { ...p, ...productData } : p);
            alert('Product Updated Successfully');
        } else {
            // Add Logic
            const res = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const newProd = await res.json();
            
            // Mock adding to local state (since API won't persist)
            state.products = [newProd, ...state.products];
            alert('Product Added Successfully');
        }
        
        renderProducts();
        closeModal();
    } catch (error) {
        alert('Error saving product.');
    }
});
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        title: document.getElementById('pTitle').value,
        price: parseFloat(document.getElementById('pPrice').value),
        category: document.getElementById('pCategory').value,
        thumbnail: document.getElementById('pImage').value || 'https://via.placeholder.com/150'
    };

    try {
        if (state.isEditing) {
            // Update Logic
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const updated = await res.json();
            
            // Local update for instant UI feedback
            state.products = state.products.map(p => p.id == id ? { ...p, ...productData } : p);
            alert('Product Updated Successfully');
        } else {
            // Add Logic
            const res = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            const newProd = await res.json();
            
            // Mock adding to local state (since API won't persist)
            state.products = [newProd, ...state.products];
            alert('Product Added Successfully');
        }
        
        renderProducts();
        closeModal();
    } catch (error) {
        alert('Error saving product.');
    }
});



