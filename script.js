
// components/navbar.js
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
                            <input 
                                type="search" 
                                id="navbar-search-input"
                                name="q" 
                                placeholder="Search products..." 
                                class="pl-4 pr-10 py-2 w-48 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 bg-gray-50"
                            >
                            <button type="submit" class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-primary transition-colors">
                                <i data-feather="search" class="w-5 h-5"></i>
                            </button>
                        </form>
                        
                        <button id="open-search-mobile" class="lg:hidden text-primary hover:text-accent p-2">
                            <i data-feather="search" class="w-6 h-6"></i>
                        </button>
                        
                        <button class="text-primary hover:text-accent p-2 hidden sm:block">
                            <i data-feather="user" class="w-6 h-6"></i>
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
    }

    connectedCallback() {
        const name = this.getAttribute('name') || 'New Performance Runner';
        const category = this.getAttribute('category') || 'Running';
        const price = this.getAttribute('price') || '150.00';
        const originalPrice = this.getAttribute('original-price') || price; // Default to same price if missing
        const image = this.getAttribute('image') || 'https://picsum.photos/id/42/400/300';
        
        const isNew = this.hasAttribute('new');
        const isDiscounted = parseFloat(originalPrice) > parseFloat(price);

        // --- Badge Logic ---
        let badge = '';
        if (isDiscounted) {
            badge = '<span class="absolute top-4 left-4 bg-red-500 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase z-10 shadow-lg">SALE</span>';
        } else if (isNew) {
            badge = '<span class="absolute top-4 left-4 bg-accent text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase z-10 shadow-lg">NEW</span>';
        }

        // --- Price Display Logic ---
        let priceHTML = '';
        if (isDiscounted) {
            // Show both prices when discounted
            priceHTML = `
                <div class="flex items-baseline space-x-2">
<span class="text-sm text-gray-500 line-through" 
      style="-webkit-text-stroke: 0.4px #000; text-decoration-thickness: 2px; text-decoration-color: #888888;">
    R${parseFloat(originalPrice).toFixed(2)}
</span>
                    <span class="text-xl font-extrabold text-accent">R${parseFloat(price).toFixed(2)}</span>
                </div>
            `;
        } else {
            // If same price, show both neatly (no line-through)
            priceHTML = `
                <div class="flex items-baseline space-x-2">
<span class="text-sm text-gray-500 line-through" 
      style="-webkit-text-stroke: 0.4px #000; text-decoration-thickness: 2px; text-decoration-color: #888888;">
    R${parseFloat(originalPrice).toFixed(2)}
</span>
                    <span class="text-xl font-extrabold text-primary">R${parseFloat(price).toFixed(2)}</span>
                </div>
            `;
        }

        // --- Final Card HTML ---
        this.innerHTML = `
            <div class="product-card bg-secondary rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 relative" data-category="${category.toLowerCase()}">
                ${badge}
                <div class="h-56 sm:h-64 mb-3 relative bg-gray-100">
                    <img src="${image}" alt="${name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                </div>
                
                <div class="px-3 pb-4">
                    <p class="text-xs text-gray-500 uppercase font-medium">${category}</p>
                    <h3 class="text-lg font-bold text-primary truncate">${name}</h3>
                    
                    <div class="flex justify-between items-center mt-3">
                        <div class="flex items-center">
                            ${priceHTML}
                        </div>
                        
                        <button class="add-to-cart-btn bg-primary text-secondary rounded-full p-2 hover:bg-accent transition-colors shadow-lg" data-product-name="${name}" data-product-price="${price}">
                            <i data-feather="shopping-cart" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Replace icons if Feather is loaded
        if (typeof feather !== 'undefined') {
            feather.replace();
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

     { id: 1, name: "Nike Zoom Vomero Roam", category: "Nike", price: 900.00, originalPrice: 1299.00, image: "item6.jpg", isNew: true },
    { id: 2, name: "Jordan 4 Retro", category: "Nike", price: 1150.00, originalPrice: 1500.00, image: "item8.jpg", isNew: false },
    { id: 3, name: "Nike Air Force 1 ", category: "Nike ", price: 999.00, originalPrice: 1199.00, image: "item14.jpg", isNew: true },
    { id: 4, name: "New Balance", category: "New Balance", price: 999.00, originalPrice: 1199.00, image: "item21.jpg", isNew: true },
    { id: 5, name: "Nike Air Force 1", category: "Nike ", price: 950.00, originalPrice: 1100.00, image: "item15.jpg", isNew: false },
    { id: 6, name: "Nike Air Max Furyosa", category: "Nike Mix", price: 2799.00, originalPrice: 2999.00, image: "item16.jpg", isNew: false },
    { id: 7, name: "Nike", category: "Nike White", price: 1099.00, originalPrice: 1299.00, image: "item17.jpg", isNew: false },
    { id: 8, name: "Nike Mix", category: "Nike Mix", price: 1199.00, originalPrice: 1399.00, image: "item18.jpg", isNew: true },
    { id: 9, name: "Nike", category: "Nike Green", price: 999.00, originalPrice: 1199.00, image: "item19.jpg", isNew: false },
    { id: 10, name: "Adidas Forum Mod", category: "Adidas", price: 999.00, originalPrice: 1199.00, image: "item20.jpg", isNew: false },

    // Page 2 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Nike", category: "Nike Green", price: 1199.00, originalPrice: 1399.00, image: "item22.jpg", isNew: true },
    { id: 2, name: "Adidas x Clot Black Superstar", category: "Adidas ", price: 1099.00, originalPrice: 1299.00, image: "item23.jpg", isNew: false },
    { id: 3, name: "Nike Dunk Low", category: "Nike", price: 1299.00, originalPrice: 1499.00, image: "item24.jpg", isNew: true },
    { id: 4, name: "Nike Bailleli", category: "Nike", price: 1099.00, originalPrice: 1099.00, image: "item25.jpg", isNew: true },
    { id: 5, name: "Nike", category: "Nike Orange", price: 1199.00, originalPrice: 1399.00, image: "item26.jpg", isNew: false },
    { id: 6, name: "Nike Air Portal Kids", category: "Nike Shox Blue", price: 1150.00, originalPrice: 1300.00, image: "item27.jpg", isNew: false },
    { id: 7, name: "Nike", category: "Nike Mix", price: 1099.00, originalPrice: 1299.00, image: "item28.jpg", isNew: false },
    { id: 8, name: "Jordan 4 Retro", category: "Nike", price: 1099.00, originalPrice: 1299.00, image: "item29.jpg", isNew: true },
    { id: 9, name: "Nike Air Force 1 ", category: "Nike", price: 1299.00, originalPrice: 1499.00, image: "item30.jpg", isNew: false },
    { id: 10, name: "New Balance", category: "New Balance ", price: 500.00, originalPrice: 750.00, image: "item31.jpg", isNew: false },

    // Page 3 - Prices updated with hypothetical originalPrice
    { id: 1, name: "Nike Air Max ", category: "Nike ", price: 1099.00, originalPrice: 1099.00, image: "item32.jpg", isNew: true },
    { id: 2, name: "Nike Air Max 1", category: "Nike", price: 1399.00, originalPrice: 1599.00, image: "item33.jpg", isNew: false },
    { id: 3, name: "Nike Air Max", category: "Nike", price: 1199.00, originalPrice: 1399.00, image: "item34.jpg", isNew: true },
    { id: 4, name: "Nike", category: "Nike", price: 1199.00, originalPrice: 1199.00, image: "item35.jpg", isNew: true },
    { id: 5, name: "Nike", category: "Nike", price: 1399.00, originalPrice: 1599.00, image: "item36.jpg", isNew: false },
    { id: 6, name: "Nike", category: "Nike", price: 1299.00, originalPrice: 1499.00, image: "item37.jpg", isNew: false },
    { id: 7, name: "Adidas", category: "Adidas", price: 950.00, originalPrice: 1200.00, image: "item38.jpg", isNew: false },
    { id: 8, name: "Nike Dunk Low", category: "Nike", price: 1299.00, originalPrice: 1299.00, image: "item39.jpg", isNew: true },
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
    { id: 4, name: "Ted Baker", category: "Ted Baker", price: 400.00, originalPrice: 1400.00, image: "item58.jpg", isNew: true },
    { id: 5, name: "Nike T-Shirt", category: "Nike T-Shirt", price: 150.00, originalPrice: 250.00, image: "item56.jpg", isNew: false },
    { id: 6, name: "Nike T-Shirt", category: "Nike T-Shirt", price: 150.00, originalPrice: 250.00, image: "item57.jpg", isNew: false },
    { id: 7, name: "Nike Dunk Low Kids", category: "Nike", price: 500.00, originalPrice: 850.00, image: "item59.jpg", isNew: false },
    { id: 8, name: "New Balance 550 ", category: "New Balance", price: 1000.00, originalPrice: 1300.00, image: "item60.jpg", isNew: true },
    { id: 9, name: "Air Jordan 3 Retro ", category: "Nike", price: 1800.00, originalPrice: 2500.00, image: "item61.jpg", isNew: false },
    { id: 10, name: "Kids Jordan Retro 4 ", category: "Nike", price: 600.00, originalPrice: 1000.00, image: "item62.jpg", isNew: false },


        //page 6
    { id: 1, name: "Nike Shox TL", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item64.jpg", isNew: true },
    { id: 2, name: "Nike Shox TL", category: "Nike White ", price: 1300.00, originalPrice: 1800.00, image: "item65.jpg", isNew: false },
    { id: 3, name: "Nike Shox TL", category: "Nike Black", price: 1350.00, originalPrice: 1800.00, image: "item66.jpg", isNew: true },
    { id: 4, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item67.jpg", isNew: true },
    { id: 5, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item68.jpg", isNew: false },
    { id: 6, name: "Nike Shox Z", category: "Nike", price: 1300.00, originalPrice: 1800.00, image: "item69.jpg", isNew: false },
    { id: 7, name: "Nike Zoom Vomero Roam", category: "Nike", price: 1250.00, originalPrice: 1450.00, image: "item70.jpg", isNew: false },
    { id: 8, name: "Kids Sky Jordan 1 ", category: "Nike", price: 500.00, originalPrice: 850.00, image: "item71.jpg", isNew: true },
    { id: 9, name: "Nike", category: "Nike", price: 1150.00, originalPrice: 1400.00, image: "item1.jpg", isNew: false },
    { id: 10, name: "New Balance ", category: "New Balance", price: 1000.00, originalPrice: 1200.00, image: "item2.jpg", isNew: false },

   //page 7
    { id: 1, name: "Nike ", category: "Nike", price: 1000.00, originalPrice: 1200.00, image: "item3.jpg", isNew: true },
    { id: 2, name: "Nike", category: "Nike White ", price: 1150.00, originalPrice: 1400.00, image: "item4.jpg", isNew: false },
    { id: 3, name: "Adidas", category: "Adidas", price: 1050.00, originalPrice: 1300.00, image: "item7.jpg", isNew: false },

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
        
        // Current price (the new/sale price) must always be set
        card.setAttribute('price', product.price.toFixed(2));
        card.setAttribute('image', product.image);
        
        // --- CRITICAL UPDATE FOR SALE PRICE DISPLAY ---
        // Only set the 'original-price' attribute if it exists AND is greater than the current price.
        if (product.originalPrice && product.originalPrice > product.price) {
            // The custom component will use this attribute to display the 'before' price and the 'SALE' badge.
            card.setAttribute('original-price', product.originalPrice.toFixed(2)); 
        }
        
        // Set 'new' attribute only if the item is flagged as new AND not currently on sale.
        if (product.isNew && !(product.originalPrice > product.price)) {
            card.setAttribute('new', '');
        }
        
        // Append to the grid (which triggers connectedCallback)
        productsGrid.appendChild(card);
    });
    
    attachCartListeners();
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
    const cart = [];

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
    const cartShipping = document.getElementById('cart-shipping'); // add an id to your shipping span
    const checkoutButton = document.querySelector('#cart-modal .w-full.bg-accent');

    if (!cartItemsContainer || !cartSubtotal || !cartTotal || !cartCount || !checkoutButton || !cartShipping) return;

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    const shippingFee = 10; // R10 shipping

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 italic py-10">Your bag is empty. Start adding some fresh kicks!</p>';
        checkoutButton.disabled = true;
        checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    cart.forEach((item, index) => {
        subtotal += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'space-x-4', 'pb-4', 'border-b', 'border-gray-100');
        itemElement.innerHTML = `
            <img src="${item.image || 'https://picsum.photos/80'}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md flex-shrink-0">
            <div class="flex-grow">
                <p class="font-semibold text-primary text-base">${item.name}</p>
                <p class="text-xs text-gray-500 mb-2">${item.category}</p>
                <p class="font-bold text-accent">R${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item-btn text-gray-400 hover:text-red-500 transition-colors" data-index="${index}">
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

    // Update subtotal
    cartSubtotal.textContent = `R${subtotal.toFixed(2)}`;

    // Update shipping display
    const appliedShipping = cart.length > 0 ? shippingFee : 0;
    cartShipping.textContent = `R${appliedShipping.toFixed(2)}`;

    // Update estimated total
    const totalWithShipping = subtotal + appliedShipping;
    cartTotal.textContent = `R${totalWithShipping.toFixed(2)}`;

    cartCount.textContent = cart.length;

    attachRemoveListeners();
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

                const productName = card.getAttribute('name');
                const productCategory = card.getAttribute('category');
                const productPrice = parseFloat(card.getAttribute('price')); 
                const productImage = card.getAttribute('image');

                const product = {
                    name: productName,
                    category: productCategory,
                    price: productPrice,
                    image: productImage
                };
                
                cart.push(product);
                updateCartDisplay();
                
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