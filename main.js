 document.addEventListener('DOMContentLoaded', () => {
            // Initialize AOS
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });

            // Preloader
            const preloader = document.getElementById('preloader');
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            });

            // Sticky Header
            const header = document.getElementById('header');
            const scrollThreshold = 50;
            window.addEventListener('scroll', () => {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            });

            // Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const closeMenuButton = document.getElementById('close-menu');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuBackdrop = document.getElementById('menu-backdrop');

            function toggleMobileMenu() {
                mobileMenu.classList.toggle('-translate-x-full');
                menuBackdrop.classList.toggle('hidden');
                document.body.style.overflow = mobileMenu.classList.contains('-translate-x-full') ? '' : 'hidden';
            }

            mobileMenuButton.addEventListener('click', toggleMobileMenu);
            closeMenuButton.addEventListener('click', toggleMobileMenu);
            menuBackdrop.addEventListener('click', toggleMobileMenu);

            // Close mobile menu when a link is clicked
            const mobileNavLinks = mobileMenu.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', toggleMobileMenu);
            });

            // Active Navigation Link Highlighting
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            function changeNavActiveState() {
                let index = sections.length;
                while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
                navLinks.forEach((link) => link.classList.remove('active'));
                const activeLinkSelector = `a.nav-link[href*="${sections[index].id}"]`;
                const activeLinks = document.querySelectorAll(activeLinkSelector);
                activeLinks.forEach(link => link.classList.add('active'));
            }

            changeNavActiveState();
            window.addEventListener('scroll', changeNavActiveState);

            // GSAP Hero Animations
            gsap.registerPlugin(ScrollTrigger);
            gsap.to("#hero-headline", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.5
            });

            gsap.to("#hero-subheadline", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.7
            });

            gsap.to("#hero-cta", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.9
            });

            // Hero background parallax effect
            gsap.to("#hero img", {
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                scale: 1.1,
                y: 50
            });

            // ScrollReveal Animations
            const sr = ScrollReveal({
                distance: '50px',
                duration: 800,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                mobile: true,
                reset: false,
                viewFactor: 0.2,
                origin: 'bottom'
            });

            // Featured Vehicles Swiper
            const featuredSwiper = new Swiper('.featured-swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
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
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });

            // Reviews Swiper
            const reviewsSwiper = new Swiper('.reviews-swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.reviews-swiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.reviews-swiper .swiper-button-next',
                    prevEl: '.reviews-swiper .swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });

            // Search Toggle Functionality
            const searchToggle = document.getElementById('search-toggle');
            const searchContainer = document.getElementById('search-container');
            if (searchToggle && searchContainer) {
                searchToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    searchContainer.classList.toggle('opacity-0');
                    searchContainer.classList.toggle('invisible');
                    searchContainer.classList.toggle('translate-x-4');
                });

                document.addEventListener('click', (e) => {
                    if (!searchContainer.contains(e.target) && e.target !== searchToggle) {
                        searchContainer.classList.add('opacity-0', 'invisible', 'translate-x-4');
                    }
                });
            }

            // Contact Form Handling
            const contactForm = document.getElementById('contact-form');
            const formStatus = document.getElementById('form-status');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const message = document.getElementById('message').value;

                    if (!name || !email || !message) {
                        formStatus.textContent = 'Please fill in all required fields.';
                        formStatus.className = 'mt-4 text-sm text-red-600';
                        return;
                    }

                    formStatus.textContent = 'Sending message...';
                    formStatus.className = 'mt-4 text-sm text-blue-600';

                    setTimeout(() => {
                        formStatus.textContent = 'Message sent successfully! We will get back to you soon.';
                        formStatus.className = 'mt-4 text-sm text-green-600';
                        contactForm.reset();
                    }, 1500);
                });
            }

            // Test Drive Form Handling
            const testDriveForm = document.getElementById('test-drive-form');
            if (testDriveForm) {
                testDriveForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(testDriveForm);
                    const formValues = Object.fromEntries(formData.entries());
                    
                    console.log('Test Drive Scheduled:', formValues);
                    alert('Thank you! Your test drive has been scheduled. We will contact you shortly to confirm.');
                    testDriveForm.reset();
                });
            }
        });