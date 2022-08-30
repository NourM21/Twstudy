/*------------------------- Page Loader ---------------------*/

window.addEventListener("load", () => {
    document.querySelector(".js-page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".js-page-loader").style.display = "none";
    }, 600);
});

/*--------------------- Testimonials Slider ---------------------*/

function testimonialsSlider () {
    const carouselOne = document.getElementById('carouselOne');
    if (carouselOne) { /* If The Element Exists */
        carouselOne.addEventListener('slid.bs.carousel', function () {
            const activeItem = this.querySelector(".active");
            document.querySelector(".js-testimonials-img").src = activeItem.getAttribute("data-js-testimonials-img");
        });
    };
};

testimonialsSlider();

/*--------------------------- Course Preview Video ---------------------------*/

function coursePreviewVideo () {
    const coursePreviewModal = document.querySelector(".js-course-preview-modal");
    if (coursePreviewModal) { /* If The Element Exists */
        coursePreviewModal.addEventListener("shown.bs.modal", function () {
            this.querySelector(".js-course-preview-video").play();
            this.querySelector(".js-course-preview-video").currentTime = 0;
        });
        coursePreviewModal.addEventListener("hide.bs.modal", function () {
            this.querySelector(".js-course-preview-video").pause();
        });
    };
};

coursePreviewVideo();

/*--------------------------- Style Switcher ---------------------------*/

function styleSwitcherToggle () {
    const styleSwitcher = document.querySelector(".js-style-switcher");
    const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");
    styleSwitcherToggler.addEventListener("click", function () {
        styleSwitcher.classList.toggle("open");
        this.querySelector("i").classList.toggle("fa-times");
        this.querySelector("i").classList.toggle("fa-cog");
    });
};

styleSwitcherToggle();

/*--------------------------- Theme Colors --------------------------*/

function themeColors () {
    const colorStyle = document.querySelector(".js-color-style");
    console.log(colorStyle);
    const themeColorsContainer = document.querySelector(".js-theme-colors");
    themeColorsContainer.addEventListener("click", ({target}) => {
        if (target.classList.contains("js-theme-color-item")) {
            localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
            setColor();
        }
    });
    function setColor () {
        let path = colorStyle.getAttribute("href").split("/");
        path = path.slice(0, path.length-1);
        colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");
        if (document.querySelector(".js-theme-color-item.active")) {
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
        };
        document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
    };
    if (localStorage.getItem("color") !== null) {
        setColor();
    }else {
        const defaultColor = document.getAttribute("href").split("/").pop().split(".").shift();
        document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
    }
};

themeColors();

/*---------------------------------- Theme Light & Dark Mode -----------------------------------*/

function themeLightDark () {
    const darkModeCheckBox = document.querySelector(".js-dark-mode");
    darkModeCheckBox.addEventListener("click", function () {
        if (this.checked) {
            localStorage.setItem("theme-dark", "true");
        }else {
            localStorage.setItem("theme-dark", "false");
        }
        themeMode();
    });
    function themeMode () {
        if (localStorage.getItem("theme-dark") === "false") {
            document.body.classList.remove("t-dark");
        }else {
            document.body.classList.add("t-dark");
        };
    };
    if (localStorage.getItem("theme-dark") !== null) {
        themeMode();
    };
    if (document.body.classList.contains("t-dark")) {
        darkModeCheckBox.checked = true;
    };
};

themeLightDark();

/*---------------------------------- Theme Glass Effect -----------------------------------*/

function themeGlassEffect () {
    const glassEffectCheckBox = document.querySelector(".js-glass-effect");
    const glassStyle = document.querySelector(".js-glass-style");
    glassEffectCheckBox.addEventListener("click", function () {
        if (this.checked) {
            localStorage.setItem("glass-effect", "true");
        }else {
            localStorage.setItem("glass-effect", "false");
        };
        glass();
    });
    function glass () {
        if (localStorage.getItem("glass-effect") === "true") {
            glassStyle.removeAttribute("disabled");
        }else {
            glassStyle.disabled = true;
        };
    };
    if (localStorage.getItem("glass-effect") !== null) {
        glass();
    };
    if (!glassStyle.hasAttribute("disabled")) {
        glassEffectCheckBox.checked = true;
    };
};

themeGlassEffect();

/*---------------------------------- Header Menu -----------------------------------*/

function headerMenu () {
    const menu = document.querySelector(".js-header-menu"),
    backDrop = document.querySelector(".js-header-backdrop"),
    menuCollapseBreakPoint = 991;
    function toggleMenu () {
        menu.classList.toggle("open");
        backDrop.classList.toggle("active");
        document.body.classList.toggle("overflow-hidden");
    };
    document.querySelectorAll(".js-header-menu-toggler").forEach((item) => {
        item.addEventListener("click", toggleMenu);
    });
    // close the menu by clicking outside it
    backDrop.addEventListener("click", toggleMenu);
    function collapse () {
        menu.querySelector(".active .js-sub-menu").removeAttribute("style");
        menu.querySelector(".active").classList.remove("active");
    };
    menu.addEventListener("click", (event) => {
        const { target } = event;
        if (target.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollapseBreakPoint) {
            // prevent default anchor click behavior
            event.preventDefault();
            // if menu-item already expended, collapse it and exit
            if (target.parentElement.classList.contains("active")) {
                collapse();
                return;
            }
            // if not already expended, ... run the below code
            // collapse the other expended menu-item if exists
            if (menu.querySelector(".active")) {
                collapse();
            }
            // expend new menu-item
            target.parentElement.classList.add("active");
            target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";
        }
    });
    // when resizing window 
    window.addEventListener("resize", function () {
        if (this.innerWidth > menuCollapseBreakPoint && menu.classList.contains("open")) {
            toggleMenu();
        };
        if (this.innerWidth > menuCollapseBreakPoint && menu.querySelector(".active")) {
            collapse();
        }
    });
};

headerMenu();