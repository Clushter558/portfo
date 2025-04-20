// Main JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    updateYear();
    handleNavigation();
    handleTypewriter();
    startTypewriter();
    handleLoading();
});

// Update year in footer
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Navigation functions
function handleNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Change navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Typewriter effect
function handleTypewriter() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    window.typewriterStrings = [
        'Web Developer',
        'UI/UX Designer',
        'Creative Problem Solver',
        'Freelancer'
    ];
    
    window.typewriterIndex = 0;
    window.charIndex = 0;
    window.isDeleting = false;
    window.typingDelay = 150; // Delay between each character typing
    window.erasingDelay = 100; // Delay between each character erasing
    window.newTextDelay = 2000; // Delay before starting to erase text
}

function startTypewriter() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const currentString = window.typewriterStrings[window.typewriterIndex];
    
    if (window.isDeleting) {
        // Removing characters
        typedTextElement.textContent = currentString.substring(0, window.charIndex - 1);
        window.charIndex--;
        window.typingDelay = window.erasingDelay;
    } else {
        // Adding characters
        typedTextElement.textContent = currentString.substring(0, window.charIndex + 1);
        window.charIndex++;
        window.typingDelay = window.typingDelay;
    }
    
    // If word is complete
    if (!window.isDeleting && window.charIndex === currentString.length) {
        window.isDeleting = true;
        window.typingDelay = window.newTextDelay;
    } 
    // If deletion is complete
    else if (window.isDeleting && window.charIndex === 0) {
        window.isDeleting = false;
        window.typewriterIndex++;
        // Cycle back to the first string if we've gone through all of them
        if (window.typewriterIndex >= window.typewriterStrings.length) {
            window.typewriterIndex = 0;
        }
    }
    
    setTimeout(startTypewriter, window.typingDelay);
}

// Handle loading screen
function handleLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('fade-out');
                document.body.classList.add('loaded');
                
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = 'This field is required';
            
            // Only add error message if it doesn't exist already
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                input.parentNode.insertBefore(errorElement, input.nextElementSibling);
            }
        } else {
            input.classList.remove('error');
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
                
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = 'Please enter a valid email address';
                
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                    input.parentNode.insertBefore(errorElement, input.nextElementSibling);
                }
            }
        }
    });
    
    return isValid;
}

// Handle form submission
function handleFormSubmit(event, formId) {
    event.preventDefault();
    
    if (validateForm(formId)) {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const submissionStatus = document.querySelector('.submission-status');
        
        // Show loading state
        if (submissionStatus) {
            submissionStatus.textContent = 'Sending...';
            submissionStatus.style.display = 'block';
            submissionStatus.className = 'submission-status info';
        }
        
        // This would normally be an actual fetch request to your backend
        // Simulating server request with setTimeout
        setTimeout(function() {
            // Reset form
            form.reset();
            
            if (submissionStatus) {
                submissionStatus.textContent = 'Message sent successfully!';
                submissionStatus.className = 'submission-status success';
                
                setTimeout(function() {
                    submissionStatus.style.display = 'none';
                }, 5000);
            }
        }, 2000);
    }
}

// Project filtering
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
    
    // Filter projects
    projectCards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('active');
            }, 100);
        } else {
            const tags = card.querySelector('.project-tags').textContent.toLowerCase();
            if (tags.includes(category.toLowerCase())) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('active');
                }, 100);
            } else {
                card.classList.remove('active');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
}