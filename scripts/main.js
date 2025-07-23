// Main JavaScript functionality
class CollegeFeePortal {
    constructor() {
        this.colleges = collegesData;
        this.filteredColleges = [...this.colleges];
        this.currentPage = 1;
        this.collegesPerPage = 9;
        this.currentFilters = {
            search: '',
            type: 'All',
            location: 'All',
            feeRange: 'All'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderColleges();
        this.updateStats();
        this.populateFilters();
        this.setupScrollEffects();
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.applyFilters();
            });
        }
        
        // Filter dropdowns
        const typeFilter = document.getElementById('typeFilter');
        const locationFilter = document.getElementById('locationFilter');
        const feeFilter = document.getElementById('feeFilter');
        
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFilters();
            });
        }
        
        if (locationFilter) {
            locationFilter.addEventListener('change', (e) => {
                this.currentFilters.location = e.target.value;
                this.applyFilters();
            });
        }
        
        if (feeFilter) {
            feeFilter.addEventListener('change', (e) => {
                this.currentFilters.feeRange = e.target.value;
                this.applyFilters();
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreColleges();
            });
        }
        
        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
                this.closeModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
        
        // Navigation smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    populateFilters() {
        // Populate type filter
        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            filterOptions.types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                typeFilter.appendChild(option);
            });
        }
        
        // Populate location filter
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter) {
            filterOptions.locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location;
                option.textContent = location;
                locationFilter.appendChild(option);
            });
        }
        
        // Populate fee range filter
        const feeFilter = document.getElementById('feeFilter');
        if (feeFilter) {
            filterOptions.feeRanges.forEach(range => {
                const option = document.createElement('option');
                option.value = range.label;
                option.textContent = range.label;
                feeFilter.appendChild(option);
            });
        }
    }
    
    applyFilters() {
        this.filteredColleges = this.colleges.filter(college => {
            // Search filter
            const searchMatch = this.currentFilters.search === '' || 
                college.name.toLowerCase().includes(this.currentFilters.search.toLowerCase()) ||
                college.location.toLowerCase().includes(this.currentFilters.search.toLowerCase()) ||
                college.type.toLowerCase().includes(this.currentFilters.search.toLowerCase());
            
            // Type filter
            const typeMatch = this.currentFilters.type === 'All' || 
                college.type === this.currentFilters.type;
            
            // Location filter
            const locationMatch = this.currentFilters.location === 'All' || 
                college.location === this.currentFilters.location;
            
            // Fee range filter
            let feeMatch = true;
            if (this.currentFilters.feeRange !== 'All') {
                const selectedRange = filterOptions.feeRanges.find(range => 
                    range.label === this.currentFilters.feeRange
                );
                if (selectedRange) {
                    feeMatch = college.totalFee >= selectedRange.min && 
                              college.totalFee <= selectedRange.max;
                }
            }
            
            return searchMatch && typeMatch && locationMatch && feeMatch;
        });
        
        this.currentPage = 1;
        this.renderColleges();
        this.updateStats();
    }
    
    renderColleges() {
        const collegesGrid = document.getElementById('collegesGrid');
        if (!collegesGrid) return;
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.collegesPerPage;
        const collegesToShow = this.filteredColleges.slice(startIndex, endIndex);
        
        if (collegesToShow.length === 0) {
            collegesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No colleges found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            this.hideLoadMoreButton();
            return;
        }
        
        collegesGrid.innerHTML = collegesToShow.map(college => 
            this.createCollegeCard(college)
        ).join('');
        
        // Update load more button visibility
        if (endIndex >= this.filteredColleges.length) {
            this.hideLoadMoreButton();
        } else {
            this.showLoadMoreButton();
        }
        
        // Add event listeners for buttons
        this.setupCollegeCardListeners();
    }
    
    createCollegeCard(college) {
        return `
            <div class="college-card">
                <div class="college-image">
                    <i class="${college.image}"></i>
                </div>
                <div class="college-info">
                    <div class="college-name">${college.name}</div>
                    <div class="college-location"><i class="fas fa-map-marker-alt"></i> ${college.location}</div>
                    <div class="college-type">${college.type}</div>
                    <div class="college-fee">${formatCurrency(college.totalFee)}</div>
                    <div class="college-rating">
                        <span class="stars">${generateStars(college.rating)}</span>
                        <span class="rating-text">${college.rating.toFixed(1)}</span>
                    </div>
                    <div class="college-actions">
                        <button class="btn view-details-btn" onclick="portal.showCollegeDetails(${college.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="btn btn-primary" onclick="cartManager.addToCart(${college.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupCollegeCardListeners() {
        // Update wishlist button states
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const collegeId = parseInt(btn.closest('.college-card').dataset.id);
            if (wishlistManager.isInWishlist(collegeId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
            }
        });
    }
    
    loadMoreColleges() {
        this.currentPage++;
        this.renderColleges();
    }
    
    showLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    showCollegeDetails(collegeId) {
        const college = this.colleges.find(c => c.id === collegeId);
        if (!college) return;
        
        const modal = document.getElementById('collegeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.textContent = college.name;
        modalBody.innerHTML = this.createCollegeDetailsHTML(college);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    createCollegeDetailsHTML(college) {
        return `
            <div class="college-summary">
                <h3><i class="fas fa-university"></i> College Summary</h3>
                <div class="summary-grid">
                    <div class="summary-item">
                        <strong>Established:</strong>
                        <span>${college.established}</span>
                    </div>
                    <div class="summary-item">
                        <strong>Location:</strong>
                        <span>${college.location}</span>
                    </div>
                    <div class="summary-item">
                        <strong>Type:</strong>
                        <span>${college.type}</span>
                    </div>
                    <div class="summary-item">
                        <strong>Rating:</strong>
                        <span>${college.rating}/5</span>
                    </div>
                    <div class="summary-item">
                        <strong>Accreditation:</strong>
                        <span>${college.accreditation}</span>
                    </div>
                    <div class="summary-item">
                        <strong>Total Fee:</strong>
                        <span>${formatCurrency(college.totalFee)}</span>
                    </div>
                </div>
            </div>
            
            <div class="fee-structure">
                <h3><i class="fas fa-rupee-sign"></i> Fee Structure Breakdown</h3>
                <table class="fee-table">
                    <thead>
                        <tr>
                            <th>Fee Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admission Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.admissionFee)}</td>
                        </tr>
                        <tr>
                            <td>Tuition Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.tuitionFee)}</td>
                        </tr>
                        <tr>
                            <td>Hostel Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.hostelFee)}</td>
                        </tr>
                        <tr>
                            <td>Examination Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.examFee)}</td>
                        </tr>
                        <tr>
                            <td>Library Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.libraryFee)}</td>
                        </tr>
                        <tr>
                            <td>Laboratory Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.labFee)}</td>
                        </tr>
                        <tr>
                            <td>Miscellaneous Fee</td>
                            <td class="fee-amount">${formatCurrency(college.feeStructure.miscFee)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="college-summary">
                <h3><i class="fas fa-graduation-cap"></i> Courses Offered</h3>
                <p>${college.courses.join(', ')}</p>
            </div>
            
            <div class="college-summary">
                <h3><i class="fas fa-building"></i> Facilities</h3>
                <p>${college.facilities.join(', ')}</p>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="cartManager.addToCart(${college.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="wishlistManager.toggleWishlist(${college.id})">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
            </div>
        `;
    }
    
    closeModal() {
        const modal = document.getElementById('collegeModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    updateStats() {
        const totalColleges = document.getElementById('totalColleges');
        const avgFee = document.getElementById('avgFee');
        const topRated = document.getElementById('topRated');
        
        if (totalColleges) {
            totalColleges.textContent = this.filteredColleges.length;
        }
        
        if (avgFee && this.filteredColleges.length > 0) {
            const average = this.filteredColleges.reduce((sum, college) => 
                sum + college.totalFee, 0) / this.filteredColleges.length;
            avgFee.textContent = formatCurrency(average);
        }
        
        if (topRated && this.filteredColleges.length > 0) {
            const highest = Math.max(...this.filteredColleges.map(c => c.rating));
            topRated.textContent = `${highest}/5`;
        }
    }
    
    setupScrollEffects() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe college cards
        document.querySelectorAll('.college-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portal = new CollegeFeePortal();
    window.cartManager = new CartManager();
    window.wishlistManager = new WishlistManager();
});