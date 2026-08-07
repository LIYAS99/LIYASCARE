/* =====================================================
   LIYAS ELECTRONICS
   SCROLL ANIMATION ENGINE
   Version: 1.0.0
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const items =
document.querySelectorAll(
".reveal, .fade-up, .fade-left, .fade-right, .scale-up"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"active"
);


entry.target.classList.add(
"show"
);



observer.unobserve(
entry.target
);



}


});


},
{

threshold:.15

}

);



items.forEach(
(item)=>{


observer.observe(item);


});


});
