// بيانات الأربع لابتوبات المستخدمة في الموقع
const products = {
    'lenovo': {
        name: 'HP Victus 16-R1052NE Intel Core i7-14700HX - NVIDIA RTX 4070 8GB - 16GB DDR5 5600Mhz - 1TB M.2 Gen4 - 16.1" FHD IPS 144Hz',
        price: 63999,
        image: '_HP-Victus-16-r1055ne-Gaming-Laptop.jpg',
        description: 'Powerful HP laptop suitable for work, study, and light gaming with reliable performance.',
        specs: [
            'Processor: Intel Core i5',
            'RAM: 8GB DDR4',
            'Storage: 512GB SSD',
            'Display: 15.6" Full HD'
        ]
    },
    'macbook': {
        name: 'ASUS ExpertBook B1 B1502CBA-NJ3220 Intel Core i7-1255U - Intel UHD Graphics - 8GB DDR4 - 512GB SSD - 15.6-inch FHD - DOS',
        price: 24999,
        image: 'dlcdnwebimgs.asus.png',
        description: 'Premium ASUS with Retina display and long battery life, perfect for creators.',
        specs: [
            'Processor: Apple M1',
            'RAM: 8GB Unified Memory',
            'Storage: 256GB SSD',
            'Display: 13.3" Retina'
        ]
    },
    'samsung': {
        name: 'Lenovo IdeaPad Slim 3 15IRH8 83EM007VED Core i7-13620H 10 Cores - 16GB DDR5 4800 - 512GB SSD - 15.6 FHD - WIN 11 -Grey',
        price: 304999,
        image: 'lenovoidea.png',
        description: 'Slim and lightweight Lenovo Book ideal for travel and everyday productivity.',
        specs: [
            'Processor: Intel Core i5',
            'RAM: 8GB',
            'Storage: 256GB SSD',
            'Display: 15.6" Full HD'
        ]
    },
    'hp': {
        name: 'ASUS Zenbook S 16 OLED UM5606WA-RJ288W AMD Ryzen AI 9 HX 370 - AMD XDNA - 32GB LPDDR5X - 2TB M.2 NVMe - 16-Inch 3K OLED, 120Hz, Touch - Windows 11',
        price: 94999,
        image: 'zenbook_s_16__um5606wa_product_photo_3w_scandinavian_white_03.png',
        description: 'Premium ASUS Zenbook laptop with solid performance for Programmers and Home users.',
        specs: [
            'Processor: Intel Core i3',
            'RAM: 8GB',
            'Storage: 256GB SSD',
            'Display: 14" HD'
        ]
    }
};

window.onload = function() {
    loadProduct();
    updateCartCount();
};

function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || localStorage.getItem('selectedProduct');
    
    if (productId && products[productId]) {
        showProduct(products[productId], productId);
    }
}

function showProduct(product, id) {
    document.getElementById('p-img').src = product.image;
    document.getElementById('p-name').textContent = product.name;
    document.getElementById('p-price').textContent = '$' + product.price;
    document.getElementById('p-desc').textContent = product.description;
    
    const specsList = document.getElementById('p-specs');
    specsList.innerHTML = '';
    product.specs.forEach(function(spec) {
        const li = document.createElement('li');
        li.textContent = spec;
        li.style.padding = '8px 0';
        li.style.borderBottom = '1px solid rgba(139, 92, 246, 0.1)';
        specsList.appendChild(li);
    });
    
    document.getElementById('add-btn').onclick = function() {
        addToCart(id);
    };
    
    localStorage.setItem('selectedProduct', id);
}

function addToCart(productId) {
    if (!productId) {
        productId = localStorage.getItem('selectedProduct');
    }
    
    if (!products[productId]) {
        alert('Product not found!');
        return;
    }
    
    const product = products[productId];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const item = cart.find(function(x) { return x.id === productId; });
    
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(product.name + ' added to cart!');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(function(item) {
        total += item.quantity;
    });
    
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        if (total > 0) {
            countElement.textContent = total;
            countElement.style.display = 'inline-block';
        } else {
            countElement.style.display = 'none';
        }
    }
}
