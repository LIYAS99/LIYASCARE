/* =====================================================
   LIYAS ELECTRONICS
   LOADER SYSTEM
   Version: 1.0.0
===================================================== */


window.addEventListener(
"load",
()=>{


const loader =
document.querySelector(".loader");


if(!loader) return;



setTimeout(()=>{


loader.classList.add(
"hide"
);



document.body.style.overflow =
"visible";



},3000);



});
