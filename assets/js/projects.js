// Projects JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectModals();
    loadMoreProjects();
});

// Initialize project filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Trigger 'all' filter by default
    filterProjects('all');
}

// Filter projects by category
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter projects with animation
    projectCards.forEach(card => {
        card.classList.remove('active');
        card.classList.add('fade-out');
        
        setTimeout(() => {
            if (category === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.remove('fade-out');
                    card.classList.add('active');
                }, 50);
            } else {
                const tags = card.getAttribute('data-tags');
                if (tags && tags.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('fade-out');
                        card.classList.add('active');
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }
        }, 300);
    });
}

// Initialize project modal windows
function initProjectModals() {
    const projectLinks = document.querySelectorAll('.project-details-btn');
    const modal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal) return;
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project-id');
            loadProjectDetails(projectId);
            
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
    
    // Close modal on button click
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

// Load project details (this would typically fetch from a backend)
function loadProjectDetails(projectId) {
    const modalContent = document.querySelector('.modal-content');
    const modalLoading = document.querySelector('.modal-loading');
    
    if (!modalContent || !modalLoading) return;
    
    // Show loading animation
    modalContent.style.display = 'none';
    modalLoading.style.display = 'flex';
    
    // Project data - in a real application, this would be fetched from a server
    // For demo purposes, we're using a simple object with project details
    const projects = {
        "project1": {
            title: "E-commerce Website",
            client: "Fashion Brand",
            date: "January 2023",
            category: "Web Development",
            images: ["project1.jpg", "project1-detail-1.jpg", "project1-detail-2.jpg"],
            description: `
                <p>A fully responsive e-commerce platform built for a fashion brand with advanced filtering, product recommendations, and a seamless checkout experience.</p>
                <p>The project involved developing a custom shopping cart functionality, user authentication system, and integration with payment gateways.</p>
                <h3>Technologies Used:</h3>
                <ul>
                    <li>React for the frontend</li>
                    <li>Node.js and Express for backend API</li>
                    <li>MongoDB for database</li>
                    <li>Stripe for payment processing</li>
                    <li>AWS S3 for image storage</li>
                </ul>
                <h3>Key Features:</h3>
                <ul>
                    <li>Responsive design for all devices</li>
                    <li>Advanced filtering and search capabilities</li>
                    <li>User account management</li>
                    <li>Wishlist functionality</li>
                    <li>Order tracking</li>
                    <li>Admin dashboard for inventory management</li>
                </ul>
            `,
            liveLink: "https://example.com/project1",
            githubLink: "https://github.com/yourusername/project1"
        },
        "project2": {
            title: "Task Management App",
            client: "Productivity Startup",
            date: "March 2023",
            category: "Web Application",
            images: ["project2.jpg", "project2-detail-1.jpg", "project2-detail-2.jpg"],
            description: `
                <p>A drag-and-drop task management application designed to help teams organize and prioritize their work efficiently.</p>
                <p>The application features real-time updates, allowing team members to collaborate effectively regardless of their location.</p>
                <h3>Technologies Used:</h3>
                <ul>
                    <li>Vue.js for frontend</li>
                    <li>Firebase for backend services</li>
                    <li>Firestore for database</li>
                    <li>Firebase Authentication</li>
                    <li>Tailwind CSS for styling</li>
                </ul>
                <h3>Key Features:</h3>
                <ul>
                    <li>Drag-and-drop interface</li>
                    <li>Real-time collaboration</li>
                    <li>Task assignment and tagging</li>
                    <li>Due date reminders</li>
                    <li>File attachments</li>
                    <li>Activity logging</li>
                    <li>Team management</li>
                </ul>
            `,
            liveLink: "https://example.com/project2",
            githubLink: "https://github.com/yourusername/project2"
        }
        // Additional projects would be added here
    };
    
    // Simulate server delay
    setTimeout(() => {
        if (projects[projectId]) {
            const project = projects[projectId];
            
            // Create image slider HTML
            let imagesHtml = `<div class="project-slider">`;
            project.images.forEach(image => {
                imagesHtml += `<div class="slider-item"><img src="assets/images/projects/${image}" alt="${project.title}"></div>`;
            });
            imagesHtml += `
                <div class="slider-nav">
                    <button class="slider-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="slider-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>`;
            
            // Populate modal with project details
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <div class="project-meta">
                    <div class="meta-item">
                        <span class="meta-label">Client:</span>
                        <span class="meta-value">${project.client}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Date:</span>
                        <span class="meta-value">${project.date}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Category:</span>
                        <span class="meta-value">${project.category}</span>
                    </div>
                </div>
                ${imagesHtml}
                <div class="project-description">
                    ${project.description}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" class="btn btn-primary" target="_blank">View Live</a>
                    <a href="${project.githubLink}" class="btn btn-secondary" target="_blank">View Code</a>
                </div>
            `;
            
            // Initialize slider
            initProjectSlider();
            
            // Show content
            modalContent.style.display = 'block';
            modalLoading.style.display = 'none';
        } else {
            // Handle project not found
            modalContent.innerHTML = `
                <div class="error-message">
                    <h2>Project Not Found</h2>
                    <p>Sorry, the requested project could not be found.</p>
                </div>
            `;
            
            modalContent.style.display = 'block';
            modalLoading.style.display = 'none';
        }
    }, 1000);
}

// Initialize project image slider
function initProjectSlider() {
    const slider = document.querySelector('.project-slider');
    if (!slider) return;
    
    const sliderItems = slider.querySelectorAll('.slider-item');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentIndex = 0;
    
    // Show slide function
    function showSlide(index) {
        sliderItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Initialize first slide
    showSlide(currentIndex);
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = sliderItems.length - 1;
            }
            showSlide(currentIndex);
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex++;
            if (currentIndex >= sliderItems.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        });
    }
    
    // Swipe functionality for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next
            nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous
            prevBtn.click();
        }
    }
}

// Load more projects functionality
function loadMoreProjects() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        const projectsContainer = document.querySelector('.projects-grid');
        
        // Show loading spinner
        this.style.display = 'none';
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        
        // Simulate loading more projects from server
        setTimeout(() => {
            // In a real application, this would fetch more projects from a backend
            // For demo purposes, we're adding pre-defined HTML for new projects
            const newProjects = `
                <!-- Project 3 -->
                <div class="project-card reveal" data-tags="ui,frontend">
                    <div class="project-image">
                        <img src="assets/images/projects/project3.jpg" alt="Project 3">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                                <a href="#" class="project-link" target="_blank"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-details-btn project-link" data-project-id="project3"><i class="fas fa-info-circle"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">Portfolio Website</h3>
                        <p class="project-description">A responsive portfolio website with smooth animations and interactive elements.</p>
                        <div class="project-tags">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JavaScript</span>
                            <span>GSAP</span>
                        </div>
                    </div>
                </div>
                
                <!-- Project 4 -->
                <div class="project-card reveal" data-tags="backend,database">
                    <div class="project-image">
                        <img src="assets/images/projects/project4.jpg" alt="Project 4">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="#" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                                <a href="#" class="project-link" target="_blank"><i class="fab fa-github"></i></a>
                                <a href="#" class="project-details-btn project-link" data-project-id="project4"><i class="fas fa-info-circle"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">Recipe Sharing Platform</h3>
                        <p class="project-description">A community-driven recipe sharing platform with user authentication and image uploads.</p>
                        <div class="project-tags">
                            <span>Node.js</span>
                            <span>Express</span>
                            <span>MongoDB</span>
                            <span>AWS</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Add new projects to container
            if (projectsContainer) {
                projectsContainer.insertAdjacentHTML('beforeend', newProjects);
                
                // Reinitialize project functionality
                initProjectModals();
                
                // Apply current filter to new projects
                const activeFilter = document.querySelector('.filter-btn.active');
                if (activeFilter) {
                    filterProjects(activeFilter.getAttribute('data-filter'));
                }
                
                // Initialize reveal animation for new projects
                revealOnScroll();
            }
            
            // Hide loading spinner and button
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            this.style.display = 'none';
        }, 1500);
    });
}