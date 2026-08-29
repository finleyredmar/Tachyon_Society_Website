/* =========================================================
   TACHYON RACING SOCIETY
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (!nav) return;

    nav.classList.toggle("open");

}


/* Close mobile menu when clicking a link */

document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        const nav = document.querySelector(".nav-links");

        if (nav) {

            nav.classList.remove("open");

        }

    });

});


/* =========================================================
   RESOURCES PASSWORD
========================================================= */

const passwordForm =
    document.getElementById("password-form");



if (passwordForm) {

    passwordForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const password =
            document.getElementById("password").value;


        const error =
            document.getElementById("password-error");


        /*
            TEMPORARY PASSWORD

            Change this later.

            IMPORTANT:
            This is only a client-side demonstration.
            It is NOT secure authentication.
        */

        const correctPassword = "ZephyrTachyon";


        if (password === correctPassword) {

            error.textContent = "";

            window.location.href =
                "https://github.com/finleyredmar/Tachyon_Society_Ressources";

        }

        else {

            error.textContent =
                "Incorrect password. Please try again.";

        }

    });

}


/* =========================================================
   SCROLL ANIMATIONS
========================================================= */

const animatedElements = document.querySelectorAll(
    ".about, .next-card, .info-card, .timeline-item, .phase-card"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    animatedElements.forEach(function(element) {

        observer.observe(element);

    });

}
/* =========================================================
   TACHYON RACING SOCIETY
   SHARED JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("open");

        });


        /* Close menu after clicking a link */

        const links =
            navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

            });

        });

    }


    /* =====================================================
       SPONSOR FORM
    ====================================================== */

    const sponsorForm =
        document.getElementById("sponsorForm");

    const formMessage =
        document.getElementById("formMessage");


    if (sponsorForm) {

        sponsorForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * Prevents the browser from refreshing the page.
                 * This is currently a front-end form only.
                 */

                event.preventDefault();


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your inquiry has been prepared. We'll get back to you soon.";

                    formMessage.style.display =
                        "block";

                }

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navItems =
        document.querySelectorAll(".nav-links a");


    navItems.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) {
            return;
        }


        const cleanLinkPage =
            linkPage
                .split("/")
                .pop()
                .toLowerCase();


        if (
            cleanLinkPage === currentPage &&
            currentPage !== ""
        ) {

            navItems.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

        }

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (anchor) {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }

            }
        );

    });

});