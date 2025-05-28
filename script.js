document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');

    if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function () {
        nav.classList.toggle('show');
    });
    }
    
    // Highlight current page/section in navigation and smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent default anchor link behavior
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Update active state
                    navLinks.forEach(btn => btn.classList.remove('active'));
                    link.classList.add('active');
                }
            } else if (href === "index.html" || href === "") { // Handle "Home" link
                 navLinks.forEach(btn => btn.classList.remove('active'));
                 link.classList.add('active');
            }
        });
    });

    // Intersection Observer for highlighting nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // Job card click functionality (Jobs page specific)
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on a button or link
            if (!e.target.closest('button') && !e.target.closest('a')) {
                // In a real app, this would navigate to job details
                console.log('Navigating to job details');
            }
        });
    });
    
    // Search form submission (Jobs page specific)
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would submit the search
            console.log('Submitting search');
        });
    }
    
    // Filter toggles (Jobs page specific)
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            // In a real app, this would filter the jobs
            console.log('Filter changed:', this.id, this.checked);
        });
    });
    
    // Pagination (Jobs page specific)
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would load the selected page
            console.log('Page:', this.textContent);
            
            // Update active state
            paginationButtons.forEach(btn => btn.classList.remove('page-active'));
            this.classList.add('page-active');
        });
    });

    // Handle form submission on Hire page (new functionality for register form)
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Company Registered! (This is a mockup action)');
            // In a real application, you would send this data to a server.
            registerForm.reset(); // Clear the form after submission
        });
    }

    // --- Login Modal Logic ---
    const loginModalOverlay = document.querySelector('.login-modal-overlay');
    const openLoginModalBtn = document.querySelector('.open-login-modal');
    const closeLoginModalBtn = document.querySelector('.close-modal-btn');
    const loginForm = document.querySelector('.login-form'); // Target the login form inside the modal

    if (openLoginModalBtn && loginModalOverlay) {
        openLoginModalBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior (e.g., scrolling to top)
            loginModalOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }

    if (closeLoginModalBtn && loginModalOverlay) {
        closeLoginModalBtn.addEventListener('click', function() {
            loginModalOverlay.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the content
    if (loginModalOverlay) {
        loginModalOverlay.addEventListener('click', function(e) {
            if (e.target === loginModalOverlay) { // Check if the click was on the overlay itself
                loginModalOverlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle login form submission inside the modal
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login Attempt (This is a mockup action)');
            // In a real application:
            // 1. Get form data (email, password)
            // 2. Send it to your backend for authentication
            // 3. Handle response (e.g., show success/error, redirect, close modal)
            loginForm.reset(); // Clear form after submission
            loginModalOverlay.classList.remove('show'); // Close modal on submission (for mockup)
            document.body.style.overflow = '';
        });
    }
    // --- End Login Modal Logic ---
});