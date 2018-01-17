var slideIndex1 = 0;
var slideIndex2 = 0;
var slideIndex3 = 0;
var slideIndex4 = 0;

function slider1() {
    var i;
    var x = Array.from(document.getElementsByClassName("slide1"));
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex1++;
    if (slideIndex1 > x.length) {slideIndex1 = 1} 
    x[slideIndex1-1].style.display = "inline"; 
    setTimeout(slider1, 5000);
}

function slider2() {
    var i;
    var x = Array.from(document.getElementsByClassName("slide2"));
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex2++;
    if (slideIndex2 > x.length) {slideIndex2 = 1} 
    x[slideIndex2-1].style.display = "inline"; 
    setTimeout(slider2, 5000);
}

function slider3() {
    var i;
    var x = Array.from(document.getElementsByClassName("slide3"));
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex3++;
    if (slideIndex3 > x.length) {slideIndex3 = 1} 
    x[slideIndex3-1].style.display = "inline"; 
    setTimeout(slider3, 5000);
}

function slider4() {
    var i;
    var x = Array.from(document.getElementsByClassName("slide4"));
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex4++;
    if (slideIndex4 > x.length) {slideIndex4 = 1} 
    x[slideIndex4-1].style.display = "inline"; 
    setTimeout(slider4, 5000);
}

slider1();
slider2();
slider3();
slider4();