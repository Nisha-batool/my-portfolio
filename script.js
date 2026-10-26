/**
 * NISHA BATOOL PORTFOLIO - SCRIPT.JS
 * Vanilla JavaScript for premium animations, modal logic, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. SCROLL PROGRESS & STICKY NAV ===
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    let scrollTicking = false;
    const updateScrollUI = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        if (scrollProgress) scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollUI);
            scrollTicking = true;
        }
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === 2. MOBILE MENU ===
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        mobileOverlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('open')));
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };

    hamburger?.addEventListener('click', toggleMenu);
    mobileOverlay?.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link, .nav-cta-btn').forEach(l => l.addEventListener('click', () => {
        if(navLinks.classList.contains('open')) toggleMenu();
    }));

    // === 3. TYPING ANIMATION ===
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["Front-End Developer", "React.js Developer", "Web Interface Designer"];
    let textIdx = 0;
    let charIdx = 0;

    function resetTyping() {
        typedTextSpan.textContent = '';
        charIdx = 0;
        type();
    }

    function type() {
        if (charIdx < textArray[textIdx].length) {
            typedTextSpan.textContent += textArray[textIdx][charIdx];
            charIdx++;
            setTimeout(type, 55);
        } else {
            setTimeout(erase, 1200);
        }
    }

    function erase() {
        if (charIdx > 0) {
            typedTextSpan.textContent = textArray[textIdx].substring(0, charIdx - 1);
            charIdx--;
            setTimeout(erase, 25);
        } else {
            textIdx = (textIdx + 1) % textArray.length;
            setTimeout(type, 300);
        }
    }

    if (typedTextSpan) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            typedTextSpan.textContent = textArray[0];
        } else {
            typedTextSpan.textContent = '';
            setTimeout(type, 400);
        }
    }

    // === 4. PROJECT MODAL LOGIC ===
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');

    const projectData = {
        "netflix-clone": {
            title: "Netflix Clone",
            tech: "React.js, JavaScript, CSS",
            desc: "A responsive streaming platform with search and a watchlist.",
            features: ["Responsive streaming interface", "Search experience", "Watchlist"],
            link: "https://netflix-project-seven-pink.vercel.app"
        },
        "cloth-store": {
            title: "Cloth Store",
            tech: "React.js, JavaScript, CSS",
            desc: "An e-commerce store with product filtering and a shopping cart.",
            features: ["Product filtering", "Shopping cart", "Responsive storefront"],
            link: "https://cloth-store-main-delta.vercel.app"
        },
        "pharmacy-system": {
            title: "Pharmacy Management System",
            tech: "JavaScript, CSS, Dashboard UI",
            desc: "A dashboard for managing inventory, sales, and prescriptions.",
            features: ["Inventory management", "Sales dashboard", "Prescription tracking"],
            link: "https://pharmacy-management-system-project-three.vercel.app"
        },
        "pixel-game": {
            title: "Pixel Game",
            tech: "JavaScript, HTML, CSS",
            desc: "A 2D browser game featuring levels and scoring.",
            features: ["2D browser gameplay", "Multiple levels", "Scoring"],
            link: "https://pixel-game-framwork.vercel.app"
        }
    };

    const exploreMoreBtn = document.getElementById('explore-more-projects');
    if (exploreMoreBtn) {
        exploreMoreBtn.addEventListener('click', () => {
            document.querySelectorAll('.project-extra').forEach((card, index) => {
                card.classList.add('visible');
                card.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.24)}s`);
                requestAnimationFrame(() => card.classList.add('visible'));
            });
            exploreMoreBtn.parentElement.style.display = 'none';
        });
    }

    document.querySelectorAll('.open-project').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const data = projectData[id];
            
            modalBody.innerHTML = `
                <h2 style="margin-bottom:1rem; color:var(--primary-light);">${data.title}</h2>
                <p style="color:var(--primary-light); font-weight:600; margin-bottom:1rem;">Tech: ${data.tech}</p>
                <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1.5rem;">${data.desc}</p>
                <h4 style="margin-bottom:1rem;">Key Features:</h4>
                <ul style="list-style:disc; padding-left:1.5rem; margin-bottom:2rem; color:var(--text-muted);">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                ${data.link ? `<a href="${data.link}" class="btn btn-primary" target="_blank">Visit Project Site</a>` : ''}
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.getElementById('contact-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get('name')}`);
        const body = encodeURIComponent(`${formData.get('message')}\n\nFrom: ${formData.get('name')}\nEmail: ${formData.get('email')}`);
        window.location.href = `mailto:nishabatool@gmail.com?subject=${subject}&body=${body}`;
    });

    // === 5. SCROLL REVEAL ===
    const revealGroups = [
        '.section-header',
        '.about-card',
        '.skill-chip',
        '.project-card',
        '.timeline-box',
        '.achievement-card',
        '.contact-info',
        '.contact-form-wrap'
    ];

    revealGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.setProperty('--reveal-delay', `${Math.min(index * 0.04, 0.2)}s`);
            el.style.setProperty('--reveal-x', index % 2 === 0 ? '-56px' : '56px');
        });
    });

    document.querySelectorAll('.section-header').forEach((el, index) => {
        el.style.setProperty('--reveal-x', index % 2 === 0 ? '-42px' : '42px');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // === 6. PARTICLE BACKGROUND ===
    const canvas = document.getElementById('particle-canvas');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    if (canvas && !reduceMotion && !isSmallScreen) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId = null;
        let heroIsVisible = false;
        let lastFrameTime = 0;
        const frameInterval = 1000 / 30;
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 20; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    s: Math.random() * 2
                });
            }
        };
        const animate = timestamp => {
            animationId = null;
            if (!heroIsVisible || document.hidden) return;
            if (timestamp - lastFrameTime >= frameInterval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#00c27a33";
                particles.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                    ctx.fill();
                });
                lastFrameTime = timestamp;
            }
            animationId = requestAnimationFrame(animate);
        };
        const updateAnimation = () => {
            if (heroIsVisible && !document.hidden && animationId === null) {
                animationId = requestAnimationFrame(animate);
            } else if ((!heroIsVisible || document.hidden) && animationId !== null) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        };
        const heroObserver = new IntersectionObserver(([entry]) => {
            heroIsVisible = entry.isIntersecting;
            updateAnimation();
        });
        init();
        heroObserver.observe(canvas.closest('.hero') || canvas);
        document.addEventListener('visibilitychange', updateAnimation);
        window.addEventListener('resize', () => {
            init();
            lastFrameTime = 0;
        }, { passive: true });
    } else if (canvas) {
        canvas.remove();
    }
});
