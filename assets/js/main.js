document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       GSAP + SCROLLTRIGGER
    ========================================================= */

    if (typeof gsap !== "undefined") {

        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Clip Reveal
        const clipReveals = document.querySelectorAll(
            '[data-gsap="clip-reveal"]'
        );

        clipReveals.forEach(el => {

            gsap.fromTo(
                el,
                {
                    clipPath: "inset(45% 45% 45% 45% round 50px)",
                    scale: 0.8,
                    opacity: 0
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",

                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 20%",
                        scrub: 2
                    }
                }
            );

        });


        // Highlight text
        const highlight = document.querySelector(".highlight");
        const revealText = document.querySelector(".reveal-text");

        if (highlight && revealText) {

            gsap.to(highlight, {
                "--clip-width": "100%",
                ease: "none",

                scrollTrigger: {
                    trigger: revealText,
                    start: "top 75%",
                    end: "top 45%",
                    scrub: true,
                    markers: false
                }
            });

        }


        // Fluid reveal
        const fluidReveal = document.querySelectorAll(
            '[data-gsap="fluid-reveal"]'
        );

        fluidReveal.forEach(el => {

            gsap.fromTo(
                el,
                {
                    clipPath: "inset(10% 10% 10% 10%)"
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",

                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: true
                    }
                }
            );

        });


        /* =========================================================
           MAGNETIC BUTTON
        ========================================================= */

        const magneticElements =
            document.querySelectorAll(".magnetic");

        magneticElements.forEach(el => {

            el.addEventListener("mousemove", function (e) {

                const rect = el.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                const strength =
                    el.classList.contains("large")
                        ? 0.6
                        : 0.4;

                gsap.to(el, {
                    x: x * strength,
                    y: y * strength,
                    duration: 0.4,
                    ease: "power2.out"
                });

            });


            el.addEventListener("mouseleave", function () {

                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });

            });

        });

    }


    /* =========================================================
       SWIPER
    ========================================================= */

    if (typeof Swiper === "undefined") {

        console.error(
            "Swiper is NOT loaded. Check your Swiper CDN/script."
        );

        return;
    }


    console.log("Swiper loaded successfully");


    /* =========================================================
       HELPER
    ========================================================= */

    function initSwiper(selector, config) {

        const element = document.querySelector(selector);

        if (!element) {

            console.warn(
                "Swiper element not found:",
                selector
            );

            return null;
        }

        console.log(
            "Initializing:",
            selector
        );

        return new Swiper(element, config);
    }


    /* =========================================================
       PROCEDURES SWIPER
    ========================================================= */

    const proceduresSwiper = initSwiper(
        ".proceduresSwiper",
        {

            slidesPerView: 1.2,

            spaceBetween: 20,

            loop: true,

            speed: 700,

            grabCursor: true,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },

            pagination: {
                el: ".proceduresSwiper .swiper-pagination",
                clickable: true
            },

            breakpoints: {

                640: {
                    slidesPerView: 2.2,
                    spaceBetween: 20
                },

                1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 30
                }

            }

        }
    );


    /* =========================================================
       TESTIMONIAL SWIPER
    ========================================================= */

    initSwiper(
        ".testimonialSwiper",
        {

            slidesPerView: 1,

            spaceBetween: 30,

            loop: true,

            speed: 700,

            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

            pagination: {
                el: ".testimonialSwiper .swiper-pagination",
                clickable: true
            },

            navigation: {
                nextEl:
                    ".testimonialSwiper .swiper-button-next",

                prevEl:
                    ".testimonialSwiper .swiper-button-prev"
            },

            breakpoints: {

                768: {
                    slidesPerView: 2
                },

                1024: {
                    slidesPerView: 3
                }

            }

        }
    );


    /* =========================================================
       HOSPITAL SWIPER
    ========================================================= */

    initSwiper(
        ".hospitalSwiper",
        {

            slidesPerView: 1,

            spaceBetween: 0,

            loop: true,

            speed: 800,

            effect: "fade",

            fadeEffect: {
                crossFade: true
            },

            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

            pagination: {
                el: ".hospitalSwiper .swiper-pagination",
                clickable: true
            },

            navigation: {
                nextEl:
                    ".hospitalSwiper .swiper-button-next",

                prevEl:
                    ".hospitalSwiper .swiper-button-prev"
            }

        }
    );


    /* =========================================================
       LOGO SWIPER
    ========================================================= */

    initSwiper(
        ".logoSwiper",
        {

            slidesPerView: 2,

            spaceBetween: 20,

            loop: true,

            speed: 700,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },

            breakpoints: {

                640: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },

                768: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },

                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50
                }

            }

        }
    );


    /* =========================================================
       FAQ
    ========================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".fa-plus");

        if (!question || !answer) return;


        question.addEventListener("click", function () {

            const isOpen =
                item.classList.contains("active");


            // Close others
            faqItems.forEach(otherItem => {

                if (otherItem === item) return;

                otherItem.classList.remove("active");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(
                        ".fa-minus, .fa-plus"
                    );


                if (otherAnswer) {
                    otherAnswer.style.height = "0px";
                }


                if (otherIcon) {

                    otherIcon.classList.remove("fa-minus");

                    otherIcon.classList.add("fa-plus");

                }

            });


            // Toggle current
            if (isOpen) {

                item.classList.remove("active");

                answer.style.height = "0px";

                if (icon) {

                    icon.classList.remove("fa-minus");

                    icon.classList.add("fa-plus");

                }

            } else {

                item.classList.add("active");

                answer.style.height =
                    answer.scrollHeight + "px";

                if (icon) {

                    icon.classList.remove("fa-plus");

                    icon.classList.add("fa-minus");

                }

            }

        });

    });


    /* =========================================================
       TEXT REVEAL
    ========================================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        const revealWrappers =
            document.querySelectorAll(".text-reveal");

        revealWrappers.forEach(wrapper => {

            const bg =
                wrapper.querySelector(".text-reveal__bg");

            if (!bg) return;

            gsap.to(bg, {

                scaleX: 1,

                duration: 0.9,

                ease: "power2.out",

                scrollTrigger: {

                    trigger: wrapper,

                    start: "top 85%",

                    once: true,

                    onEnter: () => {
                        wrapper.classList.add("is-active");
                    }

                }

            });

        });

    }


    console.log("Website JS initialized successfully");

});

// faq
document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-items");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");
        const iconElement = item.querySelector(".faq-icon i");

        if (!question || !answer) return;

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close ALL FAQs
            faqItems.forEach(function (otherItem) {

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                const otherIcon =
                    otherItem.querySelector(".faq-icon");

                const otherIconElement =
                    otherItem.querySelector(".faq-icon i");

                otherItem.classList.remove("active");

                if (otherAnswer) {
                    otherAnswer.classList.add("hidden");
                }

                if (otherIcon) {
                    otherIcon.classList.remove("rotate-45");
                }

                if (otherIconElement) {
                    otherIconElement.classList.remove("fa-minus");
                    otherIconElement.classList.add("fa-plus");
                }

            });


            // If clicked item was already open,
            // leave everything closed.
            if (isOpen) {
                return;
            }


            // OPEN CLICKED FAQ
            item.classList.add("active");

            answer.classList.remove("hidden");

            if (icon) {
                icon.classList.add("rotate-45");
            }

            if (iconElement) {
                iconElement.classList.remove("fa-plus");
                iconElement.classList.add("fa-minus");
            }

        });

    });

});