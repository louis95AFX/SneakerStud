
// components/navbar.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="sticky top-0 z-40 bg-secondary shadow-lg">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="index.html" class="text-3xl font-extrabold uppercase text-primary tracking-tight">
                        Sneaker<span class="text-accent">Stud</span>
                    </a>

                    <div class="hidden md:flex space-x-10 text-base font-semibold uppercase items-center">
                        <a href="#" class="text-primary hover:text-accent transition-colors">SALE NOW ON</a>
                        
                        <div class="flex items-center space-x-2">
                            <a href="/sale" class="text-accent hover:text-blue-600 transition-colors"></a>
                            <div class="flex items-baseline space-x-1 ml-1 text-sm">
                                <span class="text-base font-bold text-accent">
                                </span>
                            </div>
                        </div>
                        </div>

                    <div class="flex items-center space-x-3">
                        <form id="navbar-search-form" class="hidden lg:flex relative items-center">
                        
                        </form>
                        
                        <button id="open-search-mobile" class="lg:hidden text-primary hover:text-accent p-2">
                            <i data-feather="search" class="w-6 h-6"></i>
                        </button>
                        
                        
                        <button id="open-cart" class="relative text-primary hover:text-accent p-2">
                            <i data-feather="shopping-bag" class="w-6 h-6"></i>
                            <span id="cart-count" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">0</span>
                        </button>
                        <button class="md:hidden text-primary hover:text-accent p-2">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </nav>
        `;
        // Re-initialize feather icons after content is loaded
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        const cartButton = this.querySelector('#open-cart');
        const searchForm = this.querySelector('#navbar-search-form');
        const mobileSearchButton = this.querySelector('#open-search-mobile');

        // --- Cart Modal Logic ---
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                const cartModal = document.getElementById('cart-modal');
                if (cartModal) {
                    cartModal.classList.remove('hidden');
                    cartModal.classList.add('flex');
                }
            });
        }

        // 🚀 Desktop Search Bar Logic (Dispatches event)
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault(); 
                
                const searchInput = this.querySelector('#navbar-search-input');
                const query = searchInput.value.trim();
                
                this.dispatchEvent(new CustomEvent('navbar-search', {
                    bubbles: true,
                    detail: { query: query }
                }));
                
                searchInput.blur();
            });
        }
        
        // --- Mobile Search Button Logic (Opens the modal created in script.js) ---
        if (mobileSearchButton) {
            mobileSearchButton.addEventListener('click', () => {
                const searchModal = document.getElementById('search-modal');
                const searchInput = document.getElementById('search-input'); 
                if (searchModal) {
                    searchModal.classList.remove('hidden');
                    if (searchInput) searchInput.focus();
                }
            });
        }
    }
}
customElements.define('custom-navbar', CustomNavbar);

// components/custom-footer.js
class CustomFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear(); 
        
        this.innerHTML = `
            <footer class="bg-primary text-secondary py-12 mt-12">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
                        <div>
                            <h4 class="text-base font-bold mb-4 uppercase text-accent">Shop</h4>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li><a href="#" class="hover:text-secondary transition-colors">Men's</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Women's</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">New Releases</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Sale Items</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-base font-bold mb-4 uppercase text-accent">Support</h4>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li><a href="#" class="hover:text-secondary transition-colors">Order Status</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Shipping & Returns</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Contact Us</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-base font-bold mb-4 uppercase text-accent">Company</h4>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li><a href="#" class="hover:text-secondary transition-colors">About Us</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Careers</a></li>
                                <li><a href="#" class="hover:text-secondary transition-colors">Affiliates</a></li>
                            </ul>
                        </div>
                        <div class="col-span-2 md:col-span-2">
                            <h4 class="text-base font-bold mb-4 uppercase text-accent">Connect</h4>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-400 hover:text-accent"><i data-feather="twitter" class="w-6 h-6"></i></a>
                                <a href="#" class="text-gray-400 hover:text-accent"><i data-feather="facebook" class="w-6 h-6"></i></a>
                                <a href="#" class="text-gray-400 hover:text-accent"><i data-feather="instagram" class="w-6 h-6"></i></a>
                            </div>
                            <h4 class="text-base font-bold mt-6 mb-4 uppercase text-accent">Newsletter</h4>
                            <p class="text-sm text-gray-300">Get the latest drops directly to your inbox.</p>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
                        <p>&copy; ${currentYear} Sneaker Stud, Inc. All Rights Reserved.</p>
                        <div class="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" class="hover:text-secondary">Terms of Use</a>
                            <a href="#" class="hover:text-secondary">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}
customElements.define('custom-footer', CustomFooter);

// components/product-card.js
// components.js (Updated ProductCard class)

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    connectedCallback() {
        const name = this.getAttribute('name') || 'New Performance Runner';
        const category = this.getAttribute('category') || 'Running';
        const price = this.getAttribute('price') || '150.00';
        const originalPrice = this.getAttribute('original-price') || price;
        const image = this.getAttribute('image') || 'https://picsum.photos/id/42/400/300';

        const isNew = this.hasAttribute('new');
        const isDiscounted = parseFloat(originalPrice) > parseFloat(price);

        const originalPriceFixed = parseFloat(originalPrice).toFixed(2);
        const priceFixed = parseFloat(price).toFixed(2);

        // --- Size and Qty Inputs Setup ---
        const ukSizes = Array.from({ length: 9 }, (_, i) => i + 3); // UK 3 to UK 11
        const sizeOptionsHTML = ukSizes.map(size => 
            `<option value="UK${size}">UK ${size}</option>`
        ).join('');
        // --- End Size and Qty Inputs Setup ---

        let badge = '';
        if (isDiscounted) {
            badge = '<span class="absolute top-4 left-4 bg-red-500 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase z-10 shadow-lg">SALE</span>';
        } else if (isNew) {
            badge = '<span class="absolute top-4 left-4 bg-accent text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase z-10 shadow-lg">NEW</span>';
        }

        let priceHTML = '';
        if (isDiscounted) {
            priceHTML = `
                <div class="flex items-baseline space-x-1">
                    <span class="text-xs sm:text-sm text-gray-500 line-through"
                        style="-webkit-text-stroke: 0.4px #000; text-decoration-thickness: 2px; text-decoration-color: #888888;">
                        R${originalPriceFixed}
                    </span>
                    <span class="text-lg sm:text-xl font-extrabold text-accent">R${priceFixed}</span>
                </div>
            `;
        } else {
            priceHTML = `
                <div class="flex items-baseline space-x-1">
                    <span class="text-lg sm:text-xl font-extrabold text-primary">R${priceFixed}</span>
                </div>
            `;
        }

        this.innerHTML = `
            <div class="product-card bg-secondary rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative" data-category="${category.toLowerCase()}">
                ${badge}
                <div class="h-56 sm:h-64 mb-3 relative bg-gray-100">
                    <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                </div>

                <div class="px-3 pb-4">
                    <p class="text-xs text-gray-500 uppercase font-medium">${category}</p>
                    <h3 class="text-lg font-bold text-primary truncate">${name}</h3>

                    <div class="flex justify-between items-center mt-1 mb-3">
                        ${priceHTML}
                    </div>

                    <div class="flex items-center space-x-4 mb-4">
                        <div class="flex-1">
                            <label for="size-select-${name.replace(/\s/g, '-')}" class="block text-xs font-medium text-gray-700 mb-1">Size (UK)</label>
                            <select id="size-select-${name.replace(/\s/g, '-')}" class="size-select w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-primary focus:border-primary">
                                ${sizeOptionsHTML}
                            </select>
                        </div>
                    </div>
                    <button class="add-to-cart-btn w-full bg-primary text-secondary text-base font-semibold rounded-xl px-4 py-2 hover:bg-accent transition-colors shadow-lg flex items-center justify-center space-x-2">
                        <i data-feather="shopping-cart" class="w-5 h-5"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;

        const addToCartButton = this.querySelector('.add-to-cart-btn');
        if (addToCartButton) {
            addToCartButton.removeEventListener('click', this.handleAddToCart);
            addToCartButton.addEventListener('click', this.handleAddToCart);
        }

        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    handleAddToCart(event) {
        event.preventDefault();

        const productName = this.querySelector('h3').textContent.trim();
        const price = this.getAttribute('price');
        
        // --- New: Select size and quantity inputs
        const qtyInput = this.querySelector('.qty-input');
        const sizeSelect = this.querySelector('.size-select');

        const quantity = parseInt(qtyInput ? qtyInput.value : 1);
        const selectedSize = sizeSelect ? sizeSelect.value : 'N/A'; // Get selected size
        // --- End New ---

        if (quantity < 1 || isNaN(quantity)) {
            alert("Please select a valid quantity (1 or more).");
            return;
        }

        const productDetails = {
            name: productName,
            category: this.getAttribute('category'),
            price: parseFloat(price) * quantity,
            unitPrice: parseFloat(price),
            quantity: quantity,
            size: selectedSize // Include the selected size
        };

        this.dispatchEvent(new CustomEvent('product-added-to-cart', {
            detail: productDetails,
            bubbles: true,
            composed: true
        }));

        if (qtyInput) {
            qtyInput.value = 1;
        }
    }
}

customElements.define('product-card', ProductCard);


// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration ---
    const PRODUCTS_PER_PAGE = 10; 
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = ''; 

    // --- Sample Product Data ---
    const allProducts = [

     { id: 1, name: "Nike Zoom Vomero Roam", category: "Nike", price: 1150.00, originalPrice: 1299.00, image: "item6.jpg", isNew: true },
    { id: 2, name: "Jordan 4 Retro", category: "Nike", price: 1150.00, originalPrice: 1500.00, image: "item8.jpg", isNew: false },
    { id: 3, name: "Nike Air Force 1 ", category: "Nike ", price: 950.00, originalPrice: 1100.00, image: "item14.jpg", isNew: true },
    { id: 4, name: "New Balance", category: "New Balance", price: 999.00, originalPrice: 1199.00, image: "item21.jpg", isNew: true },
    { id: 5, name: "Nike Air Force 1", category: "Nike ", price: 950.00, originalPrice: 1100.00, image: "item15.jpg", isNew: false },
    { id: 6, name: "Nike Air Max Furyosa", category: "Nike Mix", price: 1200.00, originalPrice: 1800.00, image: "item16.jpg", isNew: false },
    { id: 7, name: "Nike", category: "Nike White", price: 1099.00, originalPrice: 1299.00, image: "item17.jpg", isNew: false },
    { id: 8, name: "Nike Mix", category: "Nike Mix", price: 1199.00, originalPrice: 1399.00, image: "item18.jpg", isNew: true },
    { id: 9, name: "Nike Bailleli", category: "Nike", price: 999.00, originalPrice: 1199.00, image: "item19.jpg", isNew: false },
    { id: 10, name: "Adidas Forum Mod", category: "Adidas", price: 999.00, originalPrice: 1199.00, image: "item20.jpg", isNew: false },

    // Page 2 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Nike", category: "Nike Green", price: 1199.00, originalPrice: 1399.00, image: "item22.jpg", isNew: true },
    { id: 2, name: "Adidas x Clot Black Superstar", category: "Adidas ", price: 1099.00, originalPrice: 1299.00, image: "item23.jpg", isNew: false },
    { id: 3, name: "Nike Dunk Low", category: "Nike", price: 1299.00, originalPrice: 1499.00, image: "item24.jpg", isNew: true },
    { id: 4, name: "Nike Bailleli", category: "Nike", price: 999.00, originalPrice: 1199.00, image: "item25.jpg", isNew: true },
    { id: 5, name: "Nike", category: "Nike Orange (Kids)", price: 500.00, originalPrice: 850.00, image: "item26.jpg", isNew: false },
    { id: 6, name: "Nike Air Portal Kids", category: "Nike Shox Blue (Kids)", price: 500.00, originalPrice: 850.00, image: "item27.jpg", isNew: false },
    { id: 7, name: "Nike", category: "Nike Mix", price: 1099.00, originalPrice: 1299.00, image: "item28.jpg", isNew: false },
    { id: 8, name: "Jordan 4 Retro", category: "Nike", price: 1800.00, originalPrice: 2500.00, image: "item29.jpg", isNew: true },
    { id: 9, name: "Nike Air Force 1 ", category: "Nike", price: 1299.00, originalPrice: 1499.00, image: "item30.jpg", isNew: false },
    { id: 10, name: "New Balance", category: "New Balance (Kids) ", price: 500.00, originalPrice: 750.00, image: "item31.jpg", isNew: false },

    // Page 3 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Nike Air Max ", category: "Nike ", price: 1099.00, originalPrice: 1099.00, image: "item32.jpg", isNew: true },
    { id: 2, name: "Nike Air Max 1", category: "Nike", price: 950.00, originalPrice: 1200.00, image: "item33.jpg", isNew: false },
    { id: 3, name: "Nike Air Max", category: "Nike", price: 1199.00, originalPrice: 1399.00, image: "item34.jpg", isNew: true },
    { id: 4, name: "Nike", category: "Nike", price: 1199.00, originalPrice: 1199.00, image: "item35.jpg", isNew: true },
    { id: 5, name: "Nike Orange", category: "Nike", price: 950.00, originalPrice: 1200.00, image: "item36.jpg", isNew: false },
    { id: 6, name: "Nike Red", category: "Nike", price: 950.00, originalPrice: 1200.00, image: "item37.jpg", isNew: false },
    { id: 7, name: "Adidas", category: "Adidas", price: 950.00, originalPrice: 1200.00, image: "item38.jpg", isNew: false },
    { id: 8, name: "Nike Dunk Low Brown", category: "Nike", price: 950.00, originalPrice: 1200.00, image: "item39.jpg", isNew: true },
    { id: 9, name: "Nike Air Max Plus", category: "Nike", price: 1100.00, originalPrice: 1300.00, image: "item40.jpg", isNew: false },
    { id: 10, name: "Adidas SL 72", category: "Adidas", price: 1200.00, originalPrice: 1500.00, image: "item42.jpg", isNew: false },

    // Page 4 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Adidas Gazelle", category: "Adidas", price: 1050.00, originalPrice: 1300.00, image: "item41.jpg", isNew: true },
    { id: 2, name: "Nike Dunk Low ", category: "Nike ", price: 950.00, originalPrice: 1200.00, image: "item43.jpg", isNew: false },
    { id: 3, name: "Nike Air Force 1 Luxe", category: "Nike", price: 1150.00, originalPrice: 1500.00, image: "item44.jpg", isNew: true },
    { id: 4, name: "Nike", category: "Nike", price: 1200.00, originalPrice: 1800.00, image: "item45.jpg", isNew: true },
    { id: 5, name: "Timberland", category: "Timberland", price: 1500.00, originalPrice: 2200.00, image: "item46.jpg", isNew: false },
    { id: 6, name: "Replay", category: "Replay", price: 1200.00, originalPrice: 1800.00, image: "item47.jpg", isNew: false },
    { id: 7, name: "Nike", category: "Nike Black/Grey", price: 1250.00, originalPrice: 1800.00, image: "item48.jpg", isNew: false },
    { id: 8, name: "Converse", category: "Converse", price: 1050.00, originalPrice: 1300.00, image: "item49.jpg", isNew: true },
    { id: 9, name: "Lacoste", category: "Lacost Green", price: 1200.00, originalPrice: 1500.00, image: "item50.jpg", isNew: false },
    { id: 10, name: "Puma", category: "Puma Blue", price: 950.00, originalPrice: 1200.00, image: "item51.jpg", isNew: false },

    // Page 5 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Converse All Star", category: "Converse", price: 1000.00, originalPrice: 1200.00, image: "item52.jpg", isNew: true },
    { id: 2, name: "New Balance ", category: "New Balance ", price: 1200.00, originalPrice: 1500.00, image: "item53.jpg", isNew: false },
    { id: 3, name: "Nike Men’s Shox", category: "Nike", price: 1150.00, originalPrice: 1300.00, image: "item54.jpg", isNew: true },
    { id: 4, name: "Ted Baker", category: "Ted Baker", price: 450.00, originalPrice: 700.00, image: "item58.jpg", isNew: true },
    { id: 5, name: "Ted Baker ", category: "Ted Baker ", price: 450.00, originalPrice: 700.00, image: "item76.jpg", isNew: false },
    { id: 6, name: "Ted Baker (Crocodile Skin)", category: "Ted Baker", price: 450.00, originalPrice: 700.00, image: "item75.jpg", isNew: true },
    { id: 7, name: "Nike Dunk Low Kids", category: "Nike", price: 500.00, originalPrice: 850.00, image: "item59.jpg", isNew: false },
    { id: 8, name: "New Balance 550 ", category: "New Balance", price: 1000.00, originalPrice: 1300.00, image: "item60.jpg", isNew: true },
    { id: 9, name: "Air Jordan 3 Retro ", category: "Nike", price: 1800.00, originalPrice: 2500.00, image: "item61.jpg", isNew: false },
    { id: 10, name: "Kids Jordan Retro 4 ", category: "Nike", price: 600.00, originalPrice: 1000.00, image: "item62.jpg", isNew: false },
        //page 6
    { id: 1, name: "Nike Shox TL", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item64.jpg", isNew: true },
    { id: 2, name: "Nike Shox TL White", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item65.jpg", isNew: false },
    { id: 3, name: "Nike Shox TL Black", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item66.jpg", isNew: true },
    { id: 4, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item67.jpg", isNew: true },
    { id: 5, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item68.jpg", isNew: false },
    { id: 6, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item69.jpg", isNew: false },
    { id: 7, name: "Nike Zoom Vomero Roam", category: "Nike", price: 1250.00, originalPrice: 1450.00, image: "item70.jpg", isNew: false },
    { id: 8, name: "Kids Sky Jordan 1 ", category: "Nike", price: 500.00, originalPrice: 850.00, image: "item71.jpg", isNew: true },
    { id: 9, name: "Nike", category: "Nike", price: 1150.00, originalPrice: 1400.00, image: "item1.jpg", isNew: false },
    { id: 10, name: "New Balance ", category: "New Balance", price: 1000.00, originalPrice: 1200.00, image: "item2.jpg", isNew: false },

   //page 7
    { id: 1, name: "Nike Bailleli Blanco", category: "Nike", price: 1000.00, originalPrice: 1200.00, image: "item3.jpg", isNew: true },
    { id: 2, name: "Nike Dunk", category: "Nike", price: 1150.00, originalPrice: 1400.00, image: "item4.jpg", isNew: false },
    { id: 3, name: "Adidas", category: "Adidas", price: 1050.00, originalPrice: 1300.00, image: "item7.jpg", isNew: false },
    { id: 4, name: "Nike T-Shirt", category: "Nike T-Shirt", price: 150.00, originalPrice: 250.00, image: "item57.jpg", isNew: false },
    { id: 5, name: "Nike T-Shirt", category: "Nike T-Shirt", price: 150.00, originalPrice: 250.00, image: "item56.jpg", isNew: false },

    ];

    // --- DOM Elements ---
    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paginationContainer = document.getElementById('pagination-container');
    
    let searchInput; 
    let searchModal;

    // --- Search Modal Setup ---
    function setupSearchModal() {
        searchModal = document.createElement('div');
        searchModal.id = 'search-modal';
        // Use primary color for backdrop
        searchModal.classList.add('hidden', 'fixed', 'inset-0', 'z-50', 'bg-primary', 'bg-opacity-80', 'flex', 'justify-center', 'pt-10');
        searchModal.innerHTML = `
            <div class="w-full max-w-2xl bg-white p-4 rounded-lg shadow-xl relative h-fit">
                <input id="search-input" type="text" placeholder="Search for shoe names or categories..."
                        class="w-full text-xl p-3 border-2 border-gray-300 rounded-lg focus:border-accent outline-none">
                <button id="close-search" class="absolute top-5 right-5 text-gray-500 hover:text-primary">
                    <i data-feather="x" class="w-6 h-6"></i>
                </button>
            </div>
        `;
        document.body.appendChild(searchModal);
        
        if (typeof feather !== 'undefined') {
            feather.replace(); 
        }

        searchInput = document.getElementById('search-input');
        const closeSearchBtn = document.getElementById('close-search');

        // Close search functionality
        closeSearchBtn.addEventListener('click', () => {
            searchModal.classList.add('hidden');
        });

        // Search input functionality (for the mobile modal search)
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
            // Don't close immediately on input, let the user refine the search
        });
    }
    setupSearchModal(); 

    // Central search handler
    function handleSearch(query) {
        currentSearchTerm = query.toLowerCase().trim();
        currentPage = 1; 
        
        // Reset category filter when search is used
        if (currentFilter !== 'all') {
             currentFilter = 'all';
             filterButtons.forEach(btn => btn.classList.remove('active'));
             const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
             if (allBtn) allBtn.classList.add('active');
        }

        filterAndPaginateProducts();
    }
    
    // Listen for the custom event dispatched from the navbar component
    document.addEventListener('navbar-search', (e) => {
        handleSearch(e.detail.query);
        
        const navbarSearchInput = document.getElementById('navbar-search-input');
        if (navbarSearchInput) navbarSearchInput.value = e.detail.query;
        if (searchInput) searchInput.value = e.detail.query;
    });

    // --- Core Rendering & Filtering Logic ---

    function filterAndPaginateProducts() {
        let filteredByFilter = currentFilter === 'all'
            ? allProducts
            : allProducts.filter(p => p.category.toLowerCase().trim() === currentFilter.toLowerCase().trim());
        
        const finalFilteredProducts = currentSearchTerm
            ? filteredByFilter.filter(p => 
                p.name.toLowerCase().includes(currentSearchTerm) || 
                p.category.toLowerCase().includes(currentSearchTerm)
              )
            : filteredByFilter;
        
        const totalPages = Math.ceil(finalFilteredProducts.length / PRODUCTS_PER_PAGE);
        
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        } else if (totalPages === 0) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        const productsForPage = finalFilteredProducts.slice(startIndex, endIndex);

        renderProducts(productsForPage);
        renderPagination(totalPages);
    }


    // script.js (Updated renderProducts function)

 function renderProducts(productsToDisplay) {
    productsGrid.innerHTML = ''; 
    if (!productsGrid || productsToDisplay.length === 0) {
        if (productsGrid) {
            productsGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-lg py-10">No products found for this query or category. Try searching again.</p>';
        }
        return;
    }

    productsToDisplay.forEach(product => {
        const card = document.createElement('product-card');
        
        // Set required attributes
        card.setAttribute('name', product.name);
        card.setAttribute('category', product.category);
        card.setAttribute('price', product.price.toFixed(2));
        card.setAttribute('image', product.image);
        
        // Original price for sale items
        if (product.originalPrice && product.originalPrice > product.price) {
            card.setAttribute('original-price', product.originalPrice.toFixed(2)); 
        }
        
        // New badge for new items not on sale
        if (product.isNew && !(product.originalPrice > product.price)) {
            card.setAttribute('new', '');
        }

        // ✅ Add inner HTML for quantity input and Add to Cart button
        card.innerHTML = `
            <div class="product-card-inner p-2 flex flex-col items-center">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg">
                <h3 class="text-base font-semibold mt-2">${product.name}</h3>
                <p class="text-sm text-gray-500">${product.category}</p>
                <p class="text-accent font-bold">R${product.price.toFixed(2)}</p>
                <div class="flex items-center mt-2 space-x-2">
                    <button class="add-to-cart-btn bg-primary text-white px-3 py-1 rounded">Add to Cart</button>
                    <input type="number" min="1" max="100" value="1" class="qty-input w-16 text-center border rounded p-1 text-sm">
                </div>
            </div>
        `;
        
        productsGrid.appendChild(card);
    });
    
    attachCartListeners(); // Now this will read the qty input properly
}

    // --- Pagination Logic ---
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add(
                'px-4', 'py-2', 'font-semibold', 'rounded-full', 
                'transition-colors', 'duration-150', 'text-lg'
            );
            
            if (i === currentPage) {
                // Pagination active uses primary color (Navy) for contrast
                button.classList.add('bg-primary', 'text-secondary'); 
            } else {
                button.classList.add('bg-gray-200', 'text-primary', 'hover:bg-accent', 'hover:text-secondary');
            }

            button.addEventListener('click', () => {
                currentPage = i;
                filterAndPaginateProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            paginationContainer.appendChild(button);
        }
    }

    // --- Event Listeners ---

    // Filter logic
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const newFilter = e.target.getAttribute('data-filter').toLowerCase().trim();
            
            // Highlight active button (Class definition is in index.html <style>)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = newFilter;
            currentPage = 1; 
            currentSearchTerm = ''; 
            
            // Clear search inputs
            const navbarSearchInput = document.getElementById('navbar-search-input');
            if (navbarSearchInput) navbarSearchInput.value = '';
            if (searchInput) searchInput.value = '';

            filterAndPaginateProducts();
        });
    });

    // Initial render
    filterAndPaginateProducts();


    // --- Cart Functionality ---
    // const cart = [];

    const closeCartBtn = document.getElementById('close-cart');
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.classList.remove('flex');
                cartModal.classList.add('hidden');
            }
        });
    }

    
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const cartShipping = document.getElementById('cart-shipping');
    const checkoutButton = document.querySelector('#cart-modal .w-full.bg-accent');

    if (!cartItemsContainer || !cartSubtotal || !cartTotal || !cartCount || !checkoutButton || !cartShipping) return;

    cartItemsContainer.innerHTML = '';
    const shippingFee = 10;
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="text-center text-gray-500 italic py-10">Your bag is empty. Start adding some fresh kicks!</p>';
        checkoutButton.disabled = true;
        checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    cart.forEach((item, index) => {
        const qty = item.qty || 1;
        const totalForItem = item.price * qty;
        subtotal += totalForItem;

        // ✅ FIX: Ensure size is a valid string, otherwise default to 'N/A'
        const productSize = item.size && item.size.trim() !== '' ? item.size : 'N/A';

        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'space-x-4', 'pb-4', 'border-b', 'border-gray-100');
        itemElement.innerHTML = `
            <img src="${item.image || 'https://picsum.photos/80'}" alt="${item.name}" 
                 class="w-20 h-20 object-cover rounded-md flex-shrink-0">

            <div class="flex-grow">
                <p class="font-semibold text-primary text-base">${item.name}</p>
                <p class="text-xs text-gray-500 mb-1">${item.category}</p>
                
                <p class="text-sm text-gray-600 mb-1">Size: <span class="size-display font-medium">${productSize}</span></p>
                
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Unit: <span class="unit-price">R${item.price.toFixed(2)}</span></p>
                        <p class="font-bold text-accent total-price" data-index="${index}">
                            R${totalForItem.toFixed(2)}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <label class="text-xs text-gray-600">Qty:</label>
                        <input type="number"
                            class="cart-qty-input w-14 h-7 text-center border border-gray-300 rounded-md text-sm"
                            min="1"
                            max="10"
                            value="${qty}"
                            data-index="${index}">
                    </div>
                </div>
            </div>

            <button class="remove-item-btn text-gray-400 hover:text-red-500 transition-colors" 
                    data-index="${index}">
                <i data-feather="trash-2" class="w-5 h-5"></i>
            </button>
        `;

        if (typeof feather !== 'undefined') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = itemElement.innerHTML;
            feather.replace({ root: tempDiv });
            itemElement.innerHTML = tempDiv.innerHTML;
        }

        cartItemsContainer.appendChild(itemElement);
    });

    const appliedShipping = cart.length > 0 ? shippingFee : 0;
    const totalWithShipping = subtotal + appliedShipping;

    cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;
    cartShipping.textContent = `R${appliedShipping.toFixed(2)}`;
    cartTotal.textContent = `R${totalWithShipping.toFixed(2)}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

    attachRemoveListeners();

    // Live quantity updates
    document.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            const newQty = parseInt(e.target.value);
            if (isNaN(newQty) || newQty < 1) return;

            cart[index].qty = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update line total only (keep unit price fixed)
            const priceEl = document.querySelector(`.total-price[data-index="${index}"]`);
            const newTotal = cart[index].price * newQty;
            priceEl.textContent = `R${newTotal.toFixed(2)}`;

            // Update overall totals
            const newSubtotal = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
            cartSubtotal.textContent = `R${newSubtotal.toFixed(2)}`;
            cartTotal.textContent = `R${(newSubtotal + appliedShipping).toFixed(2)}`;
            cartCount.textContent = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        });
    });
}

    function attachRemoveListeners() {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                // Find the closest button wrapper to get the index
                const btn = e.target.closest('.remove-item-btn');
                const index = parseInt(btn.getAttribute('data-index'), 10);
                
                cart.splice(index, 1);
                updateCartDisplay();
            });
        });
    }
function attachCartListeners() {
    document.querySelectorAll('product-card .add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('product-card');

            // --- 1. Get Base Product Details ---
            const productName = card.getAttribute('name');
            const productCategory = card.getAttribute('category');
            const unitPrice = parseFloat(card.getAttribute('price')); // Use unitPrice here
            const productImage = card.getAttribute('image');

            // --- 2. CRITICAL: Read Quantity and Size from Inputs ---
            
            // Read quantity from the input
            const qtyInput = card.querySelector('.qty-input');
            let qty = 1;
            if (qtyInput) {
                const parsedQty = parseInt(qtyInput.value);
                if (!isNaN(parsedQty) && parsedQty > 0) qty = parsedQty;
            }
            
            // ✅ NEW: Read the selected size
            const sizeSelect = card.querySelector('.size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : 'N/A';


            const product = {
                name: productName,
                category: productCategory,
                price: unitPrice, // Storing unit price is cleaner for calculations
                image: productImage,
                qty: qty,
                size: selectedSize // ✅ NEW: Include the size
            };

            // --- 3. CRITICAL: Update Cart Logic ---
            
            // Find an item with the exact same name AND size
            const existingItemIndex = cart.findIndex(item => 
                item.name === product.name && item.size === product.size
            );

            if (existingItemIndex !== -1) {
                // Item with same name and size exists: ONLY increase quantity
                cart[existingItemIndex].qty += product.qty;
            } else {
                // Item with this size is new, add it to the cart
                cart.push(product);
            }
            
            // Reset quantity input after adding to cart
            if (qtyInput) {
                qtyInput.value = 1; 
            }

            // --- 4. Update Persistence and Display ---
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(); // This re-renders the cart modal content

            // Open the cart modal
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) {
                cartModal.classList.remove('hidden');
                cartModal.classList.add('flex');
            }
        });
    });
}


});

// --- New Sale Pop-up Modal Logic ---
function setupSalePopup() {
    const modal = document.getElementById('sale-popup-modal');
    const content = document.getElementById('sale-popup-content');
    const closeBtn = document.getElementById('close-sale-popup');
    const shopBtn = document.getElementById('shop-sale-btn');
    const laterBtn = document.getElementById('later-sale-btn');

    // We no longer check sessionStorage, so it shows on every refresh!

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Ensure the modal element exists before proceeding
    if (!modal) {
        return;
    }

    // Function to close
    const closeModal = () => {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            // NO LONGER SETTING sessionStorage ITEM HERE
        }, 300); 
    };
    
    // Function to open the modal
    const openModal = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
        }, 50); 
    }

    // Attach event listeners
    closeBtn.addEventListener('click', closeModal);
    laterBtn.addEventListener('click', closeModal);
    
    shopBtn.addEventListener('click', closeModal); // Changed this to just close, as the link handles the navigation

    // Show the modal after a short delay
    setTimeout(openModal, 500); 
}

// Call the function at the end of DOMContentLoaded
setupSalePopup();
// script.js

// ... existing code ...

    // --- Core Rendering & Filtering Logic ---
    const DISCOUNT_RATE = 0.80; // 20% off

    function filterAndPaginateProducts() {
        
        // 🚀 NEW LOGIC: Apply the 20% discount dynamically to all products
        const discountedProducts = allProducts.map(p => {
            // Check if a sale price already exists (originalPrice > price).
            // If it does, we use the current price (which is already the lower sale price).
            // If it doesn't, we apply the 20% discount.
            
            const currentPrice = p.price;
            
            // Check if the original price exists and is higher (meaning it's already a sale)
            const isAlreadyOnSale = p.originalPrice && p.originalPrice > currentPrice;

            if (isAlreadyOnSale) {
                 // If it's already on sale, we'll keep the current price as the final price, 
                 // and the originalPrice attribute will display the previous price.
                return p;
            } else {
                 // If it's NOT on sale, calculate the new sale price.
                 const newPrice = p.price * DISCOUNT_RATE;
                 return {
                    ...p, // keep all existing properties
                    originalPrice: p.price, // the old price becomes the original price
                    price: newPrice // the new discounted price
                 };
            }
        });

        let filteredByFilter = currentFilter === 'all'
            ? discountedProducts // Use the discounted array here
            : discountedProducts.filter(p => p.category.toLowerCase().trim() === currentFilter.toLowerCase().trim())};

//Email Logic

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
  console.log('Cart display updated!');
}

// Show the checkout form dynamically
function showCheckoutForm() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) cartModal.classList.add('hidden');
    
    const existingForm = document.getElementById('checkout-form-container');
    if (existingForm) existingForm.remove();

    const formContainer = document.createElement('div');
    formContainer.id = 'checkout-form-container';
    formContainer.className = 'fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50';
    formContainer.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xs transform transition-all duration-300 scale-100">
            <h2 class="text-xl font-bold mb-5 text-center text-gray-800">Complete Your Order</h2>
            <form id="checkout-form" class="space-y-3">
                <input type="text" id="customer-name" class="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-150" placeholder="Full Name" required>
                <input type="email" id="customer-email" class="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-150" placeholder="Email Address" required>
                <input type="tel" id="customer-phone" class="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-150" placeholder="Cell Number" required>
                
                <div class="flex flex-col space-y-2 pt-3">
                    <button type="submit" class="w-full bg-blue-900 text-white font-semibold text-sm py-2 rounded-md shadow-sm hover:bg-blue-800 transition duration-150">
                        Confirm Purchase
                    </button>
                    <button type="button" id="cancel-checkout" class="w-full bg-white text-blue-900 border border-blue-900 font-semibold text-sm py-2 rounded-md hover:bg-blue-50 transition duration-150">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(formContainer);

    document.getElementById('cancel-checkout').addEventListener('click', () => {
        formContainer.remove();
        if (cartModal) cartModal.classList.remove('hidden');
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleCheckout(formContainer);
    });
}

function handleCheckout() {
  const customerName = document.getElementById('customer-name').value.trim();
  const customerEmail = document.getElementById('customer-email').value.trim();
  const customerPhone = document.getElementById('customer-phone').value.trim();

  if (!customerName || !customerEmail || !customerPhone) {
    alert("Please fill in all fields before confirming.");
    return;
  }

  // ------------------------
  // SHOW LOADING SPINNER
  // ------------------------
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  loadingOverlay.style.position = 'fixed';
  loadingOverlay.style.top = '0';
  loadingOverlay.style.left = '0';
  loadingOverlay.style.width = '100%';
  loadingOverlay.style.height = '100%';
  loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  loadingOverlay.style.display = 'flex';
  loadingOverlay.style.justifyContent = 'center';
  loadingOverlay.style.alignItems = 'center';
  loadingOverlay.style.zIndex = '9999';
  loadingOverlay.innerHTML = `<div style="border:6px solid #f3f3f3; border-top:6px solid #3498db; border-radius:50%; width:50px; height:50px; animation:spin 1s linear infinite;"></div>`;
  document.body.appendChild(loadingOverlay);

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Calculate totals including quantity
  let subtotal = 0;
  cart.forEach(item => {
    const qty = item.qty || 1;
    subtotal += item.price * qty;
  });

  const shippingFee = 10;
  const appliedShipping = cart.length > 0 ? shippingFee : 0;
  const totalWithShipping = subtotal + appliedShipping;

  // Create order summary including qty, size, and total for each item
  const cartSummary = cart.map(item => {
    const qty = item.qty || 1;
    const totalItemPrice = item.price * qty;
    // ⭐ ADDED SIZE LOGIC HERE ⭐
    const productSize = item.size && item.size.trim() !== '' ? item.size : 'N/A';
    // ⭐ UPDATED RETURN STRING TO INCLUDE SIZE ⭐
    return `${item.name} (${item.category}) - Size: ${productSize} - Qty: ${qty} - Total: R${totalItemPrice.toFixed(2)}`;
  }).join('\n');

  const templateParams = {
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    order_items: cartSummary,
    subtotal: `R${subtotal.toFixed(2)}`,
    shipping_fee: `R${appliedShipping.toFixed(2)}`,
    total_amount: `R${totalWithShipping.toFixed(2)}`,
    order_number: Date.now(),
    payment_info: `
       Welcome To The Sneaker Stud! 

You Then Make A Payment That Includes The Shipping Amount. 

Paxi: 
We Use The Large Bag. 

3-5 days - R150
7-9 days - R120 

You May Also Choose Any Courier Of Your Choice.

Account details
Bank name:  Standard Bank
Branch name:    ROSEBANK            
Branch code:    4305
Account holder: THE DIRECTOR KWAKHANYA EZWENI PTY LTD KWAKHANYA EZWENI PTY LTD
Account number: 10 20 110 974 1
Account type:   CURRENT

Please Use Your Name As Your Reference. 
If You Are Going To Deposit Into A Standard Bank ATM, Please Add R10 For Charges. 

Once You Have Made Payment , Please Send Your Proof Of Payment Along With Your Pep Code. 

Once This Has Been Done Please Give Us A Minimum Of 3 Business Days To Ship Your Sneaker. 

We Look Forward To Doing Business With You.
    `
  };

  emailjs.send('service_n6cw895', 'template_vzwck3k', templateParams)
    .then(() => {
      alert(`🎉 Thank you ${customerName}! Your order has been confirmed. An Invoice has been sent to ${customerEmail}.`);

      cart.length = 0;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
      location.reload(); // Refresh page
    })
    .catch(error => {
      console.error('Checkout Error:', error);
      alert('Checkout failed: Could not send confirmation email.');
    })
    .finally(() => {
      loadingOverlay.remove();
      style.remove();
    });
}
// Attach listener (with fallback selectors)
function attachCheckoutListener() {
  const checkoutButton =
    document.querySelector('#cart-modal .w-full.bg-accent') ||
    document.getElementById('proceedCheckout') ||
    document.querySelector('.checkout-btn');

  if (checkoutButton) {
    checkoutButton.addEventListener('click', showCheckoutForm);
  } else {
    console.warn('⚠️ Checkout button not found.');
  }
}

document.addEventListener('DOMContentLoaded', attachCheckoutListener);

