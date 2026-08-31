// testimonial code

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".patient-stories-slider");

    if (!slider) return;

    const track = slider.querySelector(".testimonial-track");

    const cards = Array.from(
        track.querySelectorAll(".testimonial-card")
    );

    const prevButton = slider.querySelector(
        ".testimonial-arrow-left"
    );

    const nextButton = slider.querySelector(
        ".testimonial-arrow-right"
    );

    const controls = document.querySelector(
        ".testimonial-controls"
    );

    const dots = controls
        ? Array.from(
            controls.querySelectorAll(".testimonial-dot")
        )
        : [];

    if (!track || !cards.length) return;


    /* =====================================================
       SETTINGS
    ===================================================== */

    const AUTO_SLIDE_TIME = 3500;

    let currentIndex = 0;

    let autoSlide = null;

    let resizeTimer = null;


    /* =====================================================
       VISIBLE CARDS
    ===================================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 767) {
            return 1;
        }

        if (window.innerWidth <= 1023) {
            return 2;
        }

        return 3;
    }


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider(index, animate = true) {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        currentIndex = Math.max(
            0,
            Math.min(index, maxIndex)
        );


        /* -----------------------------------------------
           Calculate card movement
        ------------------------------------------------ */

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap =
            parseFloat(
                window.getComputedStyle(track).columnGap
            ) || 0;

        const moveAmount =
            currentIndex * (cardWidth + gap);


        /* -----------------------------------------------
           Smooth transition
        ------------------------------------------------ */

        track.style.transition = animate
            ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
            : "none";


        track.style.transform =
            `translate3d(-${moveAmount}px, 0, 0)`;


        /* -----------------------------------------------
           Update dots
        ------------------------------------------------ */

        dots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "testimonial-dot-active",
                dotIndex === currentIndex
            );

        });

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        if (currentIndex >= maxIndex) {

            updateSlider(0);

        } else {

            updateSlider(
                currentIndex + 1
            );

        }

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            cards.length - visibleCards
        );

        if (currentIndex <= 0) {

            updateSlider(maxIndex);

        } else {

            updateSlider(
                currentIndex - 1
            );

        }

    }


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(
            nextSlide,
            AUTO_SLIDE_TIME
        );

    }


    function stopAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = null;

    }


    /* =====================================================
       ARROWS
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                startAutoSlide();

            }
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                previousSlide();

                startAutoSlide();

            }
        );

    }


    /* =====================================================
       DOTS
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            function () {

                updateSlider(index);

                startAutoSlide();

            }
        );

    });


    /* =====================================================
       HOVER PAUSE
    ===================================================== */

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );

    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    slider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.touches[0].clientX;

            stopAutoSlide();

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].clientX;

            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) >= 50) {

                if (difference > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }

            }

            startAutoSlide();

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RESPONSIVE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function () {

                    updateSlider(
                        currentIndex,
                        false
                    );

                },
                150
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSlider(
        0,
        false
    );

    startAutoSlide();

});


// =========================================================
// HOSPITAL SWIPER
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    if (typeof Swiper === 'undefined') {
        console.warn('Swiper is not loaded.');
        return;
    }

    const hospitalSlider = document.querySelector('.hospitalSwiper');

    if (!hospitalSlider) {
        return;
    }

    new Swiper(hospitalSlider, {

        slidesPerView: 1,
        spaceBetween: 0,

        loop: true,

        effect: 'fade',

        fadeEffect: {
            crossFade: true
        },

        speed: 900,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },

        pagination: {
            el: '.hospitalSwiper .swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.hospitalSwiper .swiper-button-next',
            prevEl: '.hospitalSwiper .swiper-button-prev'
        }

    });

});

// faq
document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon i");

        if (!question || !answer || !icon) return;


        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");


            // Close every FAQ
            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(".faq-icon");

                const otherIconElement =
                    otherItem.querySelector(".faq-icon i");


                if (otherAnswer) {
                    otherAnswer.classList.remove(
                        "grid-rows-[1fr]"
                    );

                    otherAnswer.classList.add(
                        "grid-rows-[0fr]"
                    );
                }


                if (otherIcon) {
                    otherIcon.classList.remove(
                        "rotate-45"
                    );
                }


                if (otherIconElement) {

                    otherIconElement.classList.remove(
                        "fa-minus"
                    );

                    otherIconElement.classList.add(
                        "fa-plus"
                    );

                }

            });


            // Open clicked FAQ
            if (!isOpen) {

                item.classList.add("active");


                answer.classList.remove(
                    "grid-rows-[0fr]"
                );

                answer.classList.add(
                    "grid-rows-[1fr]"
                );


                const iconWrapper =
                    item.querySelector(".faq-icon");


                if (iconWrapper) {
                    iconWrapper.classList.add(
                        "rotate-45"
                    );
                }


                icon.classList.remove(
                    "fa-plus"
                );

                icon.classList.add(
                    "fa-minus"
                );

            }

        });

    });

});


// header

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('mobile-menu-icon');

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', function () {
    const isOpen = !mobileMenu.classList.contains('hidden');

    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');

    menuIcon.classList.toggle('fa-bars', isOpen);
    menuIcon.classList.toggle('fa-xmark', !isOpen);
  });

  document.querySelectorAll('.mobile-submenu-button').forEach(function (button) {
    button.addEventListener('click', function () {
      const submenu = button.nextElementSibling;
      const chevron = button.querySelector('i');
      const isOpen = !submenu.classList.contains('hidden');

      submenu.classList.toggle('hidden');
      button.setAttribute('aria-expanded', String(!isOpen));
      chevron.classList.toggle('rotate-180', !isOpen);
    });
  });

  // Close the mobile menu after selecting a normal link.
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-xmark');
    });
  });

  // Reset mobile menu when switching back to desktop.
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-xmark');
    }
  });
});
