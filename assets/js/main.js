/*
=========================================================
LIYAS Electronics
Main JavaScript
Version : 1.0.0
Author : LIYAS Electronics

Common Website Functions

Compatible:
✔ HTML5
✔ CSS3
✔ GitHub Pages
✔ Supabase
=========================================================
*/

"use strict";

/*=========================================================
APP
=========================================================*/

const LIYAS = {

    version: "1.0.0",

    company: "LIYAS Electronics",

    website: "https://liyascare.com",

    debug: false

};


/*=========================================================
SELECTORS
=========================================================*/

const navbar = document.querySelector(".navbar");

const menuButton = document.getElementById("menuButton");

const navLinks = document.querySelector(".nav-links");


/*=========================================================
DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


/*=========================================================
INITIALIZE
=========================================================*/

function initializeWebsite() {

    mobileMenu();

    navbarScroll();

    smoothScroll();

    revealAnimation();

    activeNavigation();

    rippleButtons();

    lazyImages();

    footerYear();

    console.log(

        "LIYAS Electronics Loaded"

    );

}


/*=========================================================
MOBILE MENU
=========================================================*/

function mobileMenu() {

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        menuButton.innerHTML =

            navLinks.classList.contains("show")

           menuButton.innerHTML =
    navLinks.classList.contains("show")
        ? "✕"
        : "☰";

    });

}


/*=========================================================
NAVBAR
=========================================================*/

function navbarScroll() {

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("navbar-scroll");

        }

        else {

            navbar.classList.remove("navbar-scroll");

        }

    });

}


/*=========================================================
SMOOTH SCROLL
=========================================================*/

function smoothScroll() {

    document

    .querySelectorAll('a[href^="#"]')

    .forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const target =

            document.querySelector(

                this.getAttribute("href")

            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

}


/*=========================================================
ACTIVE MENU
=========================================================*/

function activeNavigation() {

    const current =

    window.location.pathname

    .split("/")

    .pop();

    document

    .querySelectorAll(".nav-links a")

    .forEach(link=>{

        const href =

        link.getAttribute("href");

        if(

            href.includes(current)

        ){

            link.classList.add("active");

        }

    });

}


/*=========================================================
SCROLL ANIMATION
=========================================================*/

function revealAnimation(){

    const items =

    document.querySelectorAll(

    ".glass,.feature-card,.product-card"

    );

    if(!items.length) return;

    const observer =

    new IntersectionObserver(

    entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add(

                "show-item"

                );

            }

        });

    },

    {

        threshold:0.15

    });

    items.forEach(item=>{

        observer.observe(item);

    });

}


/*=========================================================
BUTTON RIPPLE
=========================================================*/

function rippleButtons(){

    document

    .querySelectorAll(

    ".btn-primary,.btn-secondary"

    )

    .forEach(button=>{

        button.addEventListener(

        "click",

        function(e){

            const ripple=

            document.createElement("span");

            ripple.className="ripple";

            ripple.style.left=

            e.offsetX+"px";

            ripple.style.top=

            e.offsetY+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}


/*=========================================================
LAZY IMAGE
=========================================================*/

function lazyImages(){

    const images=

    document.querySelectorAll(

    "img[data-src]"

    );

    if(!images.length) return;

    const observer=

    new IntersectionObserver(

    entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const img=

                entry.target;

                img.src=

                img.dataset.src;

                observer.unobserve(img);

            }

        });

    });

    images.forEach(img=>{

        observer.observe(img);

    });

}


/*=========================================================
FOOTER YEAR
=========================================================*/

function footerYear(){

    const year=

    document.getElementById(

    "currentYear"

    );

    if(year){

        year.textContent=

        new Date().getFullYear();

    }

}


/*=========================================================
LOADER
=========================================================*/

function showLoader(){

    document.body.classList.add(

    "loading"

    );

}

function hideLoader(){

    document.body.classList.remove(

    "loading"

    );

}


/*=========================================================
TOAST
=========================================================*/

function showToast(

message,

type="success"

){

    alert(message);

}


/*=========================================================
VALIDATION
=========================================================*/

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(email);

}

function validMobile(number){

    return /^[6-9]\d{9}$/

    .test(number);

}


/*=========================================================
UTILITY
=========================================================*/

function generateID(){

    return

    "LY"+

    Date.now()+

    Math.floor(

    Math.random()*999

    );

}


/*=========================================================
END
=========================================================*/
