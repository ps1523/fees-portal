// Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }
    
    init() {
        this.updateCartBadge();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Cart modal events
        const cartModal = document.getElementById('cartModal');
        const cartCloseBtn = document.querySelector('#cartModal .close');
        const cartBtn = document.getElementById('cartBtn');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCartModal());
        }
        
        if (cartCloseBtn) {
            cartCloseBtn.addEventListener('click', () => this.closeCartModal());
        }
        
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    this.closeCartModal();
                }
            });
        }
    }
    
    loadCart() {
        try {
            // Since we can't use localStorage, use in-memory storage
            if (!window.cartData) {
                window.cartData = [];
            }
            return window.cartData;
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }
    
    saveCart() {
        try {
            // Save to in-memory storage
            window.cartData = this.cart;
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }
    
    addToCart(collegeId) {
        const college = collegesData.find(c => c.id === collegeId);
        if (!college) {
            console.error('College not found');
            return false;
        }
        
        // Check if already in cart
        const existingItem = this.cart.find(item => item.id === collegeId);
        if (existingItem) {
            this.showNotification('College already in cart!', 'warning');
            return false;
        }
        
        // Add to cart
        this.cart.push({
            id: college.id,
            name: college.name,
            location: college.location,
            type: college.type,
            totalFee: college.totalFee,
            yearlyFee: college.yearlyFee,
            image: college.image,
            dateAdded: new Date().toISOString()
        });
        
        this.saveCart();
        this.updateCartBadge();
        this.showNotification('Added to cart successfully!', 'success');
        return true;
    }
    
    removeFromCart(collegeId) {
        const index = this.cart.findIndex(item => item.id === collegeId);
        if (index > -1) {
            this.cart.splice(index, 1);
            this.saveCart();
            this.updateCartBadge();
            this.renderCartItems();
            this.showNotification('Removed from cart', 'info');
        }
    }
    
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartBadge();
        this.renderCartItems();
        this.showNotification('Cart cleared', 'info');
    }
    
    updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        const cartCount = document.getElementById('cartCount');
        
        if (cartBadge) {
            cartBadge.textContent = this.cart.length;
            cartBadge.style.display = this.cart.length > 0 ? 'block' : 'none';
        }
        
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
    }
    
    showCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            this.renderCartItems();
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartContent = document.getElementById('cartContent');
        
        if (!cartItems) return;
        
        if (this.cart.length === 0) {
            if (cartEmpty) cartEmpty.style.display = 'block';
            if (cartContent) cartContent.style.display = 'none';
            return;
        }
        
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartContent) cartContent.style.display = 'block';
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-icon">
                        <i class="${item.image}"></i>
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-location">
                            <i class="fas fa-map-marker-alt"></i> ${item.location}
                        </p>
                        <p class="cart-item-type">${item.type}</p>
                        <div class="cart-item-fee">
                            <span class="total-fee">${formatCurrency(item.totalFee)}</span>
                            <small>Per Year: ${formatCurrency(item.yearlyFee)}</small>
                        </div>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn btn-sm btn-danger" onclick="cartManager.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Calculate and display total
        const total = this.cart.reduce((sum, item) => sum + item.totalFee, 0);
        if (cartTotal) {
            cartTotal.innerHTML = `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Total Colleges:</span>
                        <span>${this.cart.length}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total Amount:</span>
                        <span>${formatCurrency(total)}</span>
                    </div>
                </div>
            `;
        }
    }
    
    getCartSummary() {
        const total = this.cart.reduce((sum, item) => sum + item.totalFee, 0);
        return {
            itemCount: this.cart.length,
            totalAmount: total,
            items: this.cart
        };
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}