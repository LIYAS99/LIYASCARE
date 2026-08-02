// ==========================================
// LIYAS CARE
// script.js
// Version 1.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("LIYAS Care Loaded");

    // ===============================
    // Scroll To Top Button
    // ===============================

    const topBtn = document.createElement("button");

    topBtn.id = "topBtn";

    topBtn.innerHTML = "↑";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    // ===============================
    // Sticky Header Shadow
    // ===============================

    const header = document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.35)";

        }

        else{

            header.style.boxShadow="none";

        }

    });

    // ===============================
    // Fade Animation
    // ===============================

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0px)";

            }

        });

    },{

        threshold:.15

    });

    document.querySelectorAll("section").forEach(section=>{

        section.style.opacity="0";

        section.style.transform="translateY(50px)";

        section.style.transition=".8s";

        observer.observe(section);

    });

    // ===============================
    // Active Navigation
    // ===============================

    const navLinks=document.querySelectorAll("nav a");

    navLinks.forEach(link=>{

        link.addEventListener("click",()=>{

            navLinks.forEach(item=>item.classList.remove("active"));

            link.classList.add("active");

        });

    });

    // ===============================
    // Button Ripple Effect
    // ===============================

    document.querySelectorAll(".btn").forEach(btn=>{

        btn.addEventListener("click",function(e){

            const circle=document.createElement("span");

            const size=Math.max(this.clientWidth,this.clientHeight);

            circle.style.width=size+"px";

            circle.style.height=size+"px";

            circle.style.left=e.offsetX-size/2+"px";

            circle.style.top=e.offsetY-size/2+"px";

            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });

});
