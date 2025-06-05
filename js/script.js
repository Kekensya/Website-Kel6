document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.close-menu-btn');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('show');
            overlay?.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("show");
            document.body.style.overflow = "";
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("show");
                document.body.style.overflow = "";
            }
        });
    }

    // Smooth scroll and highlight active link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    navLinks.forEach(btn => btn.classList.remove('active'));
                    link.classList.add('active');
                }
            } else if (href === "index.html" || href === "") {
                navLinks.forEach(btn => btn.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll-spy
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
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

    sections.forEach(section => observer.observe(section));

    // Job card click (Jobs page)
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.closest('button') && !e.target.closest('a')) {
                console.log('Navigating to job details');
            }
        });
    });

    // Search form (Jobs page)
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Submitting search');
        });
    }

    // Filter change (Jobs page)
    const filterOptions = document.querySelectorAll('.filter-option input');
    filterOptions.forEach(option => {
        option.addEventListener('change', function () {
            console.log('Filter changed:', this.id, this.checked);
        });
    });

    // Pagination (Jobs page)
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Page:', this.textContent);
            paginationButtons.forEach(btn => btn.classList.remove('page-active'));
            this.classList.add('page-active');
        });
    });

    // Register form (Hire page)
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Company Registered! (This is a mockup action)');
            registerForm.reset();
        });
    }

    // Login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (email === '' || password === '') {
        alert('Mohon isi semua field.');
        return;
        }

        // Demo akun login
        if (email === 'admin@jobku.com' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        window.location.href = 'admin.html';
        } else if (email === 'user@jobku.com' && password === 'user123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', email);
        window.location.href = 'user.html';
        } else {
        alert('Email atau password salah.\nGunakan:\nAdmin: admin@jobku.com / admin123\nUser: user@jobku.com / user123');
        }
    });
    }

});


// Cek status login
window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginBtn = document.querySelector('.auth-buttons');

  if (isLoggedIn && loginBtn) {
    loginBtn.innerHTML = `<a href="user.html" class="user-info">
                    <span>Welcome, Lorem Ipsum</span>
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="user-avatar">
                    <i class="fas fa-chevron-down"></i>
                </a>`;
    loginBtn.href = 'user.html'; // halaman akun user
  }
});


// Logout logic
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
});
