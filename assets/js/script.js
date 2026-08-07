/* =====================================================
   LIYAS ELECTRONICS
   MAIN JAVASCRIPT CONTROLLER
   Version: 1.0.0
===================================================== */


/* =========================
   DOM READY
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        console.log(
            "LIYAS Website Loaded Successfully"
        );


        initNavbar();

        initScrollReveal();

        initSmoothScroll();

        initProductHover();


    }
);



/* =========================
   NAVBAR CONTROL
========================= */


function initNavbar(){


    const navbar = document.querySelector(
        ".navbar"
    );


    if(!navbar) return;


    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 50){

                navbar.classList.add(
                    "scrolled"
                );

            }
            else{

                navbar.classList.remove(
                    "scrolled"
                );

            }


        }

    );


}




/* =========================
   SCROLL REVEAL
========================= */


function initScrollReveal(){


    const elements =
    document.querySelectorAll(
        ".reveal, .fade-up, .fade-left, .fade-right, .scale-up"
    );



    if(!elements.length)
        return;



    const observer =
    new IntersectionObserver(
        (entries)=>{


            entries.forEach(
                entry=>{


                    if(entry.isIntersecting){


                        entry.target.classList.add(
                            "active"
                        );


                        entry.target.classList.add(
                            "show"
                        );


                    }


                }
            );


        },

        {

            threshold:0.15

        }


    );



    elements.forEach(
        el=>observer.observe(el)
    );


}



/* =========================
   SMOOTH SCROLL
========================= */


function initSmoothScroll(){


    const links =
    document.querySelectorAll(
        'a[href^="#"]'
    );



    links.forEach(
        link=>{


            link.addEventListener(
                "click",
                function(e){


                    const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                    if(target){


                        e.preventDefault();


                        target.scrollIntoView({

                            behavior:"smooth"

                        });


                    }


                }

            );


        }

    );


}



/* =========================
   PRODUCT 3D HOVER
========================= */


function initProductHover(){


    const cards =
    document.querySelectorAll(
        ".product-card"
    );



    cards.forEach(
        card=>{


            card.addEventListener(
                "mousemove",
                (e)=>{


                    const rect =
                    card.getBoundingClientRect();



                    const x =
                    e.clientX - rect.left;



                    const y =
                    e.clientY - rect.top;



                    const rotateX =
                    ((y / rect.height)-0.5)*10;



                    const rotateY =
                    ((x / rect.width)-0.5)*10;



                    card.style.transform = `

                    perspective(1000px)

                    rotateX(${-rotateX}deg)

                    rotateY(${rotateY}deg)

                    translateY(-10px)

                    `;


                }

            );



            card.addEventListener(
                "mouseleave",
                ()=>{


                    card.style.transform="";


                }

            );


        }

    );


}
