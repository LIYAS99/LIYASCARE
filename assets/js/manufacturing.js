/* =====================================================
   LIYAS ELECTRONICS
   MANUFACTURING SCROLL EXPERIENCE
   Version: 1.0.0
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const stages =
document.querySelectorAll(
".assembly-stage"
);


const progress =
document.querySelector(
".progress-fill"
);



if(!stages.length) return;



window.addEventListener(
"scroll",
()=>{


let active = 0;



stages.forEach(
(stage,index)=>{


const box =
stage.getBoundingClientRect();



if(
box.top <
window.innerHeight/2
){

active=index+1;


}


});



if(progress){


let height =
(active /
stages.length)*100;



progress.style.height =
height+"%";


}



});


});
