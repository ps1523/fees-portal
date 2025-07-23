// Wishlist Management System
class WishlistManager {
    constructor() {
        this.wishlist = this.loadWishlist();
        this.init();
    }
    
    init() {
        this.updateWishlistBadge();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Wishlist modal events
        const wishlistModal = document.getElementById('wishlistModal');
        const wishlistCloseBtn = document.querySelector('#wishlistModal .close');
        const wishlistBtn = document.getElementById('wishlistBtn');
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.showWishlistModal());
        }
        
        if (wishlistCloseBtn) {
            wishlistCloseBtn.addEventListener('click', () => this.closeWishlistModal());
        }
        
        if (wishlistModal) {
            wishlistModal.addEventListener('click', (e) => {
                if (e.target === wishlistModal) {
                    this.closeWishlistModal();
                }
            });
        }
    }
    
    loadWishlist() {
        try {
            // Since we can't use localStorage, use in-memory storage
            if (!window.wishlistData) {
                window.wishlistData = [];
            }
            return window.wishlistData;
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    }
    
    saveWishlist() {
        try {
            // Save to in-memory storage
            window.wishlistData = this.wishlist;
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }
    
    toggleWishlist(collegeId) {
        if (this.isInWishlist(collegeId)) {
            this.removeFromWishlist(collegeId);
        } else {
            this.addToWishlist(collegeId);
        }
    }
    
    addToWishlist(collegeId) {
        const college = collegesData.find(c => c.id === collegeId);
        if (!college) {
            console.error('College not found');
            return false;
        }
        
        // Check if already in wishlist
        if (this.isInWishlist(collegeId)) {
            this.showNotification('College already in wishlist!', 'warning');
            return false;
        }
        
        // Add to wishlist
        this.wishlist.push({
            id: college.id,
            name: college.name,
            location: college.location,
            type: college.type,
            rating: college.rating,
            totalFee: college.totalFee,
            yearlyFee: college.yearlyFee,
            image: college.image,
            dateAdded: new Date().toISOString()
        });
        
        this.saveWishlist();
        this.updateWishlistBadge();
        this.updateWishlistButtons();
        this.showNotification('Added to wishlist!', 'success');
        return true;
    }
    
    removeFromWishlist(collegeId) {
        const index = this.wishlist.findIndex(item => item.id === collegeId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.saveWishlist();
            this.updateWishlistBadge();
            this.updateWishlistButtons();
            this.renderWishlistItems();
            this.showNotification('Removed from wishlist', 'info');
        }
    }
    
    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
        this.updateWishlistBadge();
        this.updateWishlistButtons();
        this.renderWishlistItems();
        this.showNotification('Wishlist cleared', 'info');
    }
    
    isInWishlist(collegeId) {
        return this.wishlist.some(item => item.id === collegeId);
    }
    
    updateWishlistBadge() {
        const wishlistBadge = document.querySelector('.wishlist-badge');
        const wishlistCount = document.getElementById('wishlistCount');
        
        if (wishlistBadge) {
            wishlistBadge.textContent = this.wishlist.length;
            wishlistBadge.style.display = this.wishlist.length > 0 ? 'block' : 'none';
        }
        
        if (wishlistCount) {
            wishlistCount.textContent = this.wishlist.length;
        }
    }
    
    updateWishlistButtons() {
        // Update all wishlist buttons on the page
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const collegeId = parseInt(btn.closest('.college-card').dataset.id);
            if (this.isInWishlist(collegeId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-heart"></i> Wishlist';
            }
        });
    }
    
    showWishlistModal() {
        const wishlistModal = document.getElementById('wishlistModal');
        if (wishlistModal) {
            this.renderWishlistItems();
            wishlistModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeWishlistModal() {
        const wishlistModal = document.getElementById('wishlistModal');
        if (wishlistModal) {
            wishlistModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    renderWishlistItems() {
        const wishlistItems = document.getElementById('wishlistItems');
        const wishlistEmpty = document.getElementById('wishlistEmpty');
        const wishlistContent = document.getElementById('wishlistContent');
        
        if (!wishlistItems) return;
        
        if (this.wishlist.length === 0) {
            if (wishlistEmpty) wishlistEmpty.style.display = 'block';
            if (wishlistContent) wishlistContent.style.display = 'none';
            return;
        }
        
        if (wishlistEmpty) wishlistEmpty.style.display = 'none';
        if (wishlistContent) wishlistContent.style.display = 'block';
        
        wishlistItems.innerHTML = this.wishlist.map(item => `
            <div class="wishlist-item" data-id="${item.id}">
                <div class="wishlist-item-info">
                    <div class="wishlist-item-icon">
                        <i class="${item.image}"></i>
                    </div>
                    <div class="wishlist-item-details">
                        <h4>${item.name}</h4>
                        <p class="wishlist-item-location">
                            <i class="fas fa-map-marker-alt"></i> ${item.location}
                        </p>
                        <p class="wishlist-item-type">${item.type}</p>
                        <div class="wishlist-item-rating">
                            <div class="stars">${generateStars(item.rating)}</div>
                            <span class="rating-text">${item.rating}/5</span>
                        </div>
                        <div class="wishlist-item-fee">
                            <span class="total-fee">${formatCurrency(item.totalFee)}</span>
                            <small>Per Year: ${formatCurrency(item.yearlyFee)}</small>
                        </div>
                    </div>
                </div>
                <div class="wishlist-item-actions">
                    <button class="btn btn-sm btn-primary" onclick="cartManager.addToCart(${item.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="portal.showCollegeDetails(${item.id})">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="wishlistManager.removeFromWishlist(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getWishlistSummary() {
        const avgRating = this.wishlist.length > 0 
            ? this.wishlist.reduce((sum, item) => sum + item.rating, 0) / this.wishlist.length
            : 0;
        
        const avgFee = this.wishlist.length > 0
            ? this.wishlist.reduce((sum, item) => sum + item.totalFee, 0) / this.wishlist.length
            : 0;
        
        return {
            itemCount: this.wishlist.length,
            averageRating: avgRating,
            averageFee: avgFee,
            items: this.wishlist
        };
    }
    
    exportWishlist() {
        if (this.wishlist.length === 0) {
            this.showNotification('Wishlist is empty!', 'warning');
            return;
        }
        
        const data = {
            exportDate: new Date().toISOString(),
            totalItems: this.wishlist.length,
            colleges: this.wishlist.map(item => ({
                name: item.name,
                location: item.location,
                type: item.type,
                rating: item.rating,
                totalFee: item.totalFee,
                yearlyFee: item.yearlyFee,
                dateAdded: item.dateAdded
            }))
        };
        
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `college-wishlist-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Wishlist exported successfully!', 'success');
    }
    
    compareColleges() {
        if (this.wishlist.length < 2) {
            this.showNotification('Add at least 2 colleges to compare!', 'warning');
            return;
        }
        
        // Create comparison modal or redirect to comparison page
        this.showComparisonModal();
    }
    
    showComparisonModal() {
        // Create a simple comparison view
        const modal = document.createElement('div');
        modal.className = 'modal comparison-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>College Comparison</h2>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="comparison-table">
                        ${this.generateComparisonTable()}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    generateComparisonTable() {
        const headers = ['College Name', 'Location', 'Type', 'Rating', 'Total Fee', 'Yearly Fee'];
        
        let tableHTML = '<table class="table"><thead><tr>';
        headers.forEach(header => {
            tableHTML += `<th>${header}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        this.wishlist.forEach(college => {
            tableHTML += `
                <tr>
                    <td><strong>${college.name}</strong></td>
                    <td>${college.location}</td>
                    <td>${college.type}</td>
                    <td>${college.rating}/5</td>
                    <td>${formatCurrency(college.totalFee)}</td>
                    <td>${formatCurrency(college.yearlyFee)}</td>
                </tr>
            `;
        });
        
        tableHTML += '</tbody></table>';
        return tableHTML;
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
    module.exports = WishlistManager;
}

// HTML Structure
document.body.innerHTML += `
<a href="javascript:void(0);" class="nav-link" id="wishlistBtn">
    <i class="fas fa-heart"></i>
    Wishlist <span class="wishlist-badge" id="wishlistCount">0</span>
</a>

<!-- Wishlist Modal -->
<div id="wishlistModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>Your Wishlist</h2>
            <span class="close">&times;</span>
        </div>
        <div class="modal-body">
            <div id="wishlistItems" class="wishlist-items"></div>
            <div id="wishlistEmpty" class="empty-state" style="display:none;">
                <i class="fas fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save colleges you're interested in to compare later</p>
            </div>
        </div>
    </div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    window.wishlistManager = new WishlistManager();
});