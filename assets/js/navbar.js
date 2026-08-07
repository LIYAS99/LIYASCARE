/* =====================================================
   LIYAS ELECTRONICS
   NAVBAR SYSTEM
   Version: 1.0.0
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const toggle =
document.querySelector(".menu-toggle");


const menu =
document.querySelector(".nav-menu");



if(toggle && menu){


toggle.addEventListener(
"click",
()=>{


menu.classList.toggle(
"active"
);



toggle.classList.toggle(
"active"
);



});


}



const links =
document.querySelectorAll(
".nav-menu a"
);



links.forEach(
link=>{


link.addEventListener(
"click",
()=>{


menu.classList.remove(
"active"
);



});


});


});
