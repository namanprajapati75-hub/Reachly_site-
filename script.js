document.addEventListener('DOMContentLoaded', () => {

    // ─── NAVBAR SCROLL EFFECT ───
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Pause float animation while scrolling
    let scrollStopTimer;
    window.addEventListener('scroll', () => {
        document.body.classList.add('scrolling');
        clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);
    }, { passive: true });

    // ─── MOBILE MENU TOGGLE ───
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .nav-btn');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ─── SMOOTH SCROLL FOR NAV LINKS ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 72; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    // ─── SCROLL REVEAL ANIMATION ───
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ─── COUNTER ANIMATION ───
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        statNumbers.forEach(num => {
            const target = parseInt(num.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    num.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    num.textContent = target;
                }
            };

            updateCounter();
        });
    };

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsRow);
    }


    // ─── SERVICE ITEM INTERACTION ───
    const serviceItems = document.querySelectorAll('.service-item');
    const servicePanels = document.querySelectorAll('.service-panel');

    const activateService = (serviceName) => {
        serviceItems.forEach(item => {
            item.classList.toggle('active', item.dataset.service === serviceName);
        });
        servicePanels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.panel === serviceName);
        });
    };

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            activateService(item.dataset.service);
        });

        item.addEventListener('mouseenter', () => {
            activateService(item.dataset.service);
        });
    });

    // Auto-rotate services
    let serviceAutoRotate;
    const serviceNames = ['seo', 'ads', 'social', 'email', 'funnel'];
    let currentServiceIndex = 0;

    const startServiceRotation = () => {
        serviceAutoRotate = setInterval(() => {
            currentServiceIndex = (currentServiceIndex + 1) % serviceNames.length;
            activateService(serviceNames[currentServiceIndex]);
        }, 3000);
    };

    const stopServiceRotation = () => {
        clearInterval(serviceAutoRotate);
    };

    startServiceRotation();

    const serviceList = document.querySelector('.service-list');
    if (serviceList) {
        serviceList.addEventListener('mouseenter', stopServiceRotation);
        serviceList.addEventListener('mouseleave', () => {
            const activeItem = document.querySelector('.service-item.active');
            if (activeItem) {
                currentServiceIndex = serviceNames.indexOf(activeItem.dataset.service);
            }
            startServiceRotation();
        });
    }


    // ─── MARQUEE DUPLICATION ───
    const marqueeTrack = document.getElementById('marquee-track');
    if (marqueeTrack) {
        const cards = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = cards + cards;
    }


    // ─── HERO PARTICLE SYSTEM ───
    const createHeroParticles = () => {
        const container = document.getElementById('hero-particles');
        if (!container) return;

        const particleCount = window.innerWidth < 640 ? 25 : 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 2 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 5;

            Object.assign(particle.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
                left: `${x}%`,
                top: `${y}%`,
                animation: `particleDrift ${duration}s ease-in-out ${delay}s infinite alternate`,
                pointerEvents: 'none'
            });

            container.appendChild(particle);
        }

        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleDrift {
                0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2); opacity: 0.6; }
                100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8); opacity: 0.2; }
            }
        `;
        document.head.appendChild(style);
    };

    createHeroParticles();


    // ─── STATEMENT SECTION CANVAS PARTICLES ───
    const initStatementCanvas = () => {
        const canvas = document.getElementById('statement-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.pulse = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += 0.015;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                const dynamicOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120, 100, 160, ${dynamicOpacity})`;
                ctx.fill();
            }
        }

        const particleCount = window.innerWidth < 640 ? 40 : 80;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Draw connections between nearby particles
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(120, 100, 160, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        };

        // Only animate when in viewport
        const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });

        canvasObserver.observe(canvas);
    };

    initStatementCanvas();


    // ─── SCROLL-BASED HIDE INDICATOR ───
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = Math.max(0, 0.4 - window.scrollY / 300);
        }, { passive: true });
    }


    // ─── PRICING CARD HOVER TILT ───
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-6px) perspective(600px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    // ─── RESULT CARD HOVER TILT ───
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `translateY(-4px) perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    // ─── BUTTON GLOW EFFECT ON HOVER ───
    const glowButtons = document.querySelectorAll('.hero-cta, .cta-btn, .pc-cta, .nav-btn--filled');
    glowButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--glow-x', `${x}px`);
            btn.style.setProperty('--glow-y', `${y}px`);
        });
    });


    // ─── ACTIVE NAV LINK HIGHLIGHT ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        const scrollY = window.pageYOffset + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });



    // ─── INTRO ANIMATION ───
    const introOverlay = document.getElementById('intro-overlay');

    if (introOverlay) {

        document.body.classList.add('intro-active');

        // CSS handles the reveal animations.
        // JS just triggers the exit after a hold.

        // Fade out overlay after 2.2s
        setTimeout(() => {
            introOverlay.classList.add('exit');
        }, 2200);

        // Remove from DOM after fade completes
        setTimeout(() => {
            document.body.classList.remove('intro-active');
            introOverlay.classList.add('hidden');
        }, 3050);

    }


    // ─── STATEMENT SECTION REVEAL (independent — works without light bar) ───
    const statementSection = document.getElementById('statement');

    if (statementSection) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statementSection.classList.add('stmt-revealed');
                } else if (entry.boundingClientRect.top > 0) {
                    statementSection.classList.remove('stmt-revealed');
                }
            });
        }, { threshold: 0.05 });

        statObserver.observe(statementSection);
    }


    // ─── CAMPAIGN DASHBOARD — Live Clock ───
    const dashClock = document.getElementById('dash-clock');
    if (dashClock) {
        const updateClock = () => {
            const now = new Date();
            dashClock.textContent = now.toLocaleTimeString('en-US', {
                hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
        };
        updateClock();
        setInterval(updateClock, 1000);
    }


    // ─── CAMPAIGN DASHBOARD — Animated Stat Counters ───
    const dashStatEls = document.querySelectorAll('#dashboard .dash-stat-value[data-display]');

    if (dashStatEls.length) {
        const animateDashStats = () => {
            dashStatEls.forEach((el, i) => {
                setTimeout(() => {
                    const display = el.dataset.display; // final display text e.g. "2.1M", "340%", "₹4.2L"
                    const isPercent  = display.includes('%');
                    const isRupee    = display.includes('₹');
                    const isMillions = display.includes('M');
                    const isLakhs   = display.includes('L');

                    let start = 0;
                    let end, suffix, prefix = '';

                    if (isMillions) { end = 2.1; suffix = 'M'; }
                    else if (isLakhs) { end = 4.2; suffix = 'L'; prefix = '₹'; }
                    else if (isPercent) { end = 340; suffix = '%'; }
                    else { end = parseFloat(el.dataset.target) || 0; suffix = ''; }

                    const duration = 1800;
                    const startTime = performance.now();

                    const tick = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = start + (end - start) * eased;

                        if (isMillions) {
                            el.textContent = current.toFixed(1) + 'M';
                        } else if (isLakhs) {
                            el.textContent = '₹' + current.toFixed(1) + 'L';
                        } else if (isPercent) {
                            el.textContent = Math.round(current) + '%';
                        } else {
                            el.textContent = Math.round(current);
                        }

                        if (progress < 1) requestAnimationFrame(tick);
                        else el.textContent = display; // snap to final
                    };
                    requestAnimationFrame(tick);
                }, i * 180); // stagger each card
            });
        };

        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            const dashObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateDashStats();
                        dashObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });
            dashObserver.observe(dashboard);
        }
    }

});



