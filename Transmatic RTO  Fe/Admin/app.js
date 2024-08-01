let hed = document.getElementById('header');
const header = document.querySelector("#header")
const footer = document.querySelector("#footer")

const loader = document.getElementById("loading-overlay");
window.addEventListener("load" , function(){
  loader.style.display = "none";
})
document.addEventListener("DOMContentLoaded", e => {
    // Adding Header
     header.innerHTML = window.header;
     footer.innerHTML = window.footer;


    //  Hamburger icon and close tag
     const bar = document.getElementById('bar');
     const close = document.getElementById('close');
     const nav = document.getElementById('navbar');
     
     if (bar) {
         bar.addEventListener('click', () =>{
             nav.classList.add('active');
         })
     }
     if (close) {
         close.addEventListener('click', () =>{
             nav.classList.remove('active');
         })
     }
}) 

// Mobile Close  resposive






var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

setInterval(function() {
    plusSlides(1);
  }, 3000);