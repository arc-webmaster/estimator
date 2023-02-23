//adding in the SVG help icons
$(document).ready(function(){
   $(".help").append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90"><path class="svg" d="M45 2.1C21.3 2.1 2.1 21.3 2.1 45c0 8.6 2.5 16.5 6.8 23.2L5.2 83.2l16-2.4c6.8 4.5 15 7.2 23.7 7.2 23.7 0 42.9-19.2 42.9-42.9S68.7 2.1 45 2.1zM45 77.9c-18.2 0-32.9-14.8-32.9-32.9S26.8 12.1 45 12.1 77.9 26.8 77.9 45 63.2 77.9 45 77.9z"/><path class="svg" d="M45 17.9c-14.9 0-27.1 12.2-27.1 27.1 0 14.9 12.2 27.1 27.1 27.1 14.9 0 27.1-12.2 27.1-27.1C72.1 30.1 59.9 17.9 45 17.9zM44.4 66.5c-3.2 0-5.7-2.6-5.7-5.7 0-3.2 2.6-5.8 5.7-5.8 3.2 0 5.8 2.6 5.8 5.8C50.2 63.9 47.6 66.5 44.4 66.5zM50.3 45.5c-1.7 0.8-1.8 2.2-1.8 3.8v2.8h-8.3v-5.5c0-2.2 0.1-4 2.4-5.5 3.1-2 5.9-2.1 5.9-5.7 0-2.4-1.8-4.1-4.1-4.1 -3.6 0-5.4 3-5.9 5.2L31.2 33c0-0.3 2.2-9.5 13.4-9.5 7.5 0 14.3 4.9 14.3 12C58.8 40.5 55.2 43.5 50.3 45.5z" /></svg>');
});

//Key blocks for inputs accepting numbers only
$(".forcenumeric").on("keypress keyup blur",function (event) {    
     if (event.which == 8 || event.which == 46  || event.which == 190 || event.which == 9 || event.which == 13 || event.which == 45 || event.which == 120 || event.which == 88 || event.which == 32 || event.which == 9 ) {
          //this too shall pass
     }else if ((event.which < 48 || event.which > 57)) {
          event.preventDefault();     }
});

//vars for number chars to check against
var numbersplus = /^[0-9- ]+$/;
var numbersonly = /^[0-9]+$/;
var numbersdec = /^[0-9.]+$/;
var numberssize = /^[0-9x]+$/;

//vars for global use
var fieldhighlight = "border-color: rgb(247, 116, 116); background: rgba(247, 116, 116, 0.50)";
 var showtoolip = "opacity:1; margin: -55px 0 0 480px";
 var hidetooltip = "margin: -55px 0 0 480px";


// mouseover / mouseout functions for sales rep name
$("#helpcdnum").mouseover(function(){

 document.getElementById("ttcdnum").style.cssText = showtoolip;
 document.getElementById("ttcdnum").innerHTML = "If a CD Number hasn't been assigned you can leave this blank.<br /><br />Otherwise this needs to be a number at least 4 digits long (ex. 3145)<br /><br />If more than one CD number is needed, use a range (ex. 3145 - 3148)";
}).mouseout(function() {
 document.getElementById("ttcdnum").style.cssText = hidetooltip;
});

$("#helpsize").mouseover(function(){

 document.getElementById("ttsize").style.cssText = showtoolip;
 document.getElementById("ttsize").innerHTML = "Use easy sleeve size in format: T x L x B<br />(ex. 12.25 x 15 x 3.75)";
}).mouseout(function() {
 document.getElementById("ttsize").style.cssText = hidetooltip;
});

$("#helprepeat").mouseover(function(){

 document.getElementById("ttrepeat").style.cssText = showtoolip;
 document.getElementById("ttrepeat").innerHTML = "Use exact repeat with decimal (ex. 15.080)";
}).mouseout(function() {
 document.getElementById("ttrepeat").style.cssText = hidetooltip;
});

$("#helpnumcolors").mouseover(function(){

 document.getElementById("ttnumcolors").style.cssText = showtoolip;
 document.getElementById("ttnumcolors").innerHTML = "Number of artwork colors or stations needed (ex. 4)";
}).mouseout(function() {
 document.getElementById("ttnumcolors").style.cssText = hidetooltip;
});

// arrow on left
//
// <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
//   viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
// <style type="text/css">
//  .st0{fill:#58595B;}
// </style>
// <g>
//  <path class="st0" d="M2.1,45c0,23.7,19.2,42.9,42.9,42.9c8.8,0,16.9-2.6,23.7-7.2l16,2.4l-3.7-14.9c4.3-6.7,6.8-14.7,6.8-23.2
//      C87.9,21.3,68.7,2.1,45,2.1S2.1,21.3,2.1,45z M12.1,45c0-18.2,14.8-32.9,32.9-32.9S77.9,26.8,77.9,45S63.2,77.9,45,77.9
//      S12.1,63.2,12.1,45z"/>
//  <path class="st0" d="M45,17.9c-14.9,0-27.1,12.2-27.1,27.1c0,14.9,12.2,27.1,27.1,27.1c14.9,0,27.1-12.2,27.1-27.1
//      C72.1,30.1,59.9,17.9,45,17.9z M44.4,66.5c-3.2,0-5.7-2.6-5.7-5.7c0-3.2,2.6-5.8,5.7-5.8c3.2,0,5.8,2.6,5.8,5.8
//      C50.2,63.9,47.6,66.5,44.4,66.5z M50.3,45.5c-1.7,0.8-1.8,2.2-1.8,3.8v2.8h-8.3v-5.5c0-2.2,0.1-4,2.4-5.5c3.1-2,5.9-2.1,5.9-5.7
//      c0-2.4-1.8-4.1-4.1-4.1c-3.6,0-5.4,3-5.9,5.2L31.2,33c0-0.3,2.2-9.5,13.4-9.5c7.5,0,14.3,4.9,14.3,12
//      C58.8,40.5,55.2,43.5,50.3,45.5z"/>