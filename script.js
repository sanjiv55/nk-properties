document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Icon & Navigation Systems
       ========================================================================== */
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Sticky Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Drawer Controls
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const closeDrawerBtn = document.querySelector('.close-drawer-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const openDrawer = () => mobileDrawer.classList.add('open');
    const closeDrawer = () => mobileDrawer.classList.remove('open');

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Dynamic Navigation Active Highlight on Scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       2. Swiper.js Integrations
       ========================================================================== */
    // Initialize Gallery Slider
    if (typeof Swiper !== 'undefined') {
        new Swiper('.gallerySwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Initialize Testimonial Slider
        new Swiper('.testimonialSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    /* ==========================================================================
       3. GSAP & ScrollTrigger Premium Animations
       ========================================================================== */
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // -- HERO ANIMATIONS --
        const heroTl = gsap.timeline();
        
        // Background slow scale reveal
        heroTl.to('.hero-bg-img', {
            scale: 1,
            duration: 2.5,
            ease: 'power3.out'
        });

        // Fading taglines and headings
        heroTl.fromTo('.hero-tagline', 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
            '-=2.0'
        );

        heroTl.fromTo('.hero-title',
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' },
            '-=1.5'
        );

        heroTl.fromTo('.hero-subtitle',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
            '-=1.1'
        );

        heroTl.fromTo('.hero-actions',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
            '-=0.9'
        );

        // -- SCROLL REVEALS --
        // Base fade-up animations for common sections
        const revealElements = document.querySelectorAll('.fade-up');
        revealElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Scale-in visual wrappers
        const scaleElements = document.querySelectorAll('.scale-in');
        scaleElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Staggered reveals for grids (e.g. Property Cards, Why items)
        gsap.from('.property-card', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.properties-grid',
                start: 'top 80%'
            }
        });

        // -- STAT COUNTER FUNCTIONALITY (GSAP & SCROLLTRIGGER) --
        const statCounters = document.querySelectorAll('.count');
        
        statCounters.forEach(counter => {
            const targetVal = parseInt(counter.getAttribute('data-target'), 10);
            
            gsap.fromTo(counter, 
                { textContent: 0 },
                {
                    textContent: targetVal,
                    duration: 2.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    /* ==========================================================================
       4. Property Video Walkthrough Modal Lightbox
       ========================================================================== */
    const playVideoBtns = document.querySelectorAll('.play-video-btn');
    const videoLightbox = document.getElementById('video-lightbox');
    const modalVideoPlayer = document.getElementById('modal-video-player');
    const lightboxClose = document.querySelector('.video-modal-close');

    if (playVideoBtns.length > 0 && videoLightbox && modalVideoPlayer) {
        playVideoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoSrc = btn.getAttribute('data-video');
                modalVideoPlayer.src = videoSrc;
                videoLightbox.classList.add('open');
                modalVideoPlayer.play().catch(error => {
                    console.log("Autoplay was prevented. Playing with controls.");
                });
            });
        });

        const closeVideoModal = () => {
            videoLightbox.classList.remove('open');
            modalVideoPlayer.pause();
            modalVideoPlayer.src = "";
        };

        lightboxClose.addEventListener('click', closeVideoModal);
        videoLightbox.addEventListener('click', (e) => {
            if (e.target === videoLightbox) {
                closeVideoModal();
            }
        });
    }

    /* ==========================================================================
       5. Luxury Form Validation & Submission
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiry-form');
    const successAlert = document.getElementById('form-success-alert');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch inputs
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const property = document.getElementById('property-select').value;
            const message = document.getElementById('message').value;

            // Optional: Forward to WhatsApp if user wants direct message
            // We can also just hide form and show clean premium success prompt.
            console.log('NK Real Estate Form Submitted:', { name, phone, property, message });

            // Hide Form & Show Success Alert
            inquiryForm.classList.add('hide');
            successAlert.classList.remove('hide');

            // Set dynamic success alert animations with GSAP if loaded
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(successAlert, 
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)' }
                );
            }
        });
    }

});
