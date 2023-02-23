var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

//Format numbers as Currency
function currencyFormat (num) {
    return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 500, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutQuad'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 500, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutQuad'
	});
});

$(document).on("click", ".remove", function() {
  $(this).parent().parent().parent().fadeOut( 250, 'easeOutQuad', function(){
  	 $(this).remove();
  });
});

$('.add').click(function(){
    $(".platewrapper").append('<div class="plate" id="platebox"><ul class="platecolor"><li><input type="text" name="platecolor" placeholder="Plate Color" /></li><li class="quant"><input type="text" name="qty" placeholder="QTY" value="1" /></li> </ul> <ul class="wxh"> <li><input type="text" name="dimwidth" placeholder="Width" /></li> <li class="x"> X </li><li><input type="text" name="dimheight" placeholder="Height" /></li> <li class="removebtn"><input type="button" class="remove" name="remove" value="Remove" /></li> </ul> </div>');
});

$(".print").click(function(){
	window.print();
  return false;
});

$(".pulldata").click(function(){
  
  var cdnumber = "CD " + $("input[name=cdnum]").val() + " ";
  var salesrep = $("input[name=salesname]").val();
  var customername = $("input[name=customername]").val();
  var jobdescription = $("input[name=jobdesc]").val();
  var numcolors = $("input[name=numcolors]").val();
  var repeat = $("input[name=repeat]").val();
  var size = $("input[name=size]").val();
  var sides = $("input[name=printlayout]:checked").val();
  var location = $("input[name=printloc]:checked").val();
  var totals = [];

if (cdnumber === "CD  "){
 var cdnumber = "";
}
else{
 var cdnumber = "CD " + $("input[name=cdnum]").val() + " ";
}

    $('.email').click(function(){
      document.location.href = "mailto:?Subject=Plate Estimate for " + cdnumber + customername + "&Body=" + salesrep + ",%0D%0A%0D%0AThe plate estimate for " + customername + " is based on a sleeve size of " + size + '", ' + numcolors + " colors, " + sides + ", printing at " + location + ' on a ' + repeat + '" repeat. %0D%0AThe total cost for plates should land somewhere between ' + lowend + " and " + highend + ".%0D%0A";
      return false;
    });

	/*Clears out any previously appended plate info*/
	$(".breakdown").text("");

  if (location === "WRS") {

$(".plate").each(function () { 

  	var platename = $("input[name=platecolor]", this).val();
  	var dimwidth = $("input[name=dimwidth]", this).val();
  		var dimw = Number(dimwidth) + 2;
 	var dimheight = $("input[name=dimheight]", this).val();
 		var dimh = Number(dimheight) + 2;
 	var qty = $("input[name=qty]", this).val();
 		var qty = Number(qty);
  	var sqrin =  Math.ceil(dimw * dimh);
  	var rawcost = sqrin * 0.49;
  	var rawcost = Math.ceil(rawcost);
  	var totalcost = Math.ceil(qty * rawcost);
  	totals.push(totalcost);

    var rawcost = (currencyFormat(rawcost));
    var totalcost = (currencyFormat(totalcost));

	if (qty > 1){
		$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br />Per Plate Cost: ' + rawcost + '<br /> Total Plate Cost: ' + totalcost);
	} else {
	$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br /> Total Plate Cost: ' + totalcost);
	}
});

  } else if (location === "PPC Flex"){

$(".plate").each(function () { 
  	var platename = $("input[name=platecolor]", this).val();
  	var dimwidth = $("input[name=dimwidth]", this).val();
  		var dimw = Number(dimwidth) + 3;
 	var dimheight = $("input[name=dimheight]", this).val();
 		var dimh = Number(dimheight) + 3;
 	var qty = $("input[name=qty]", this).val();
 		var qty = Number(qty);
  	var sqrin =  Math.ceil(dimw * dimh);
  	var rawcost = sqrin * 0.49;
  	var rawcost = Math.ceil(rawcost);
  	var totalcost = Math.ceil(qty * rawcost);
  	totals.push(totalcost);

    var rawcost = (currencyFormat(rawcost));
    var totalcost = (currencyFormat(totalcost));

	if (qty > 1){
		$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br />Per Plate Cost: ' + rawcost + '<br /> Total Plate Cost: ' + totalcost);
	} else {
	$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br /> Total Plate Cost: ' + totalcost);
	}
});

  } else {

  	$(".plate").each(function () { 

  	var platename = $("input[name=platecolor]", this).val();
  	var dimwidth = $("input[name=dimwidth]", this).val();
  		var dimw = Number(dimwidth);
 	var dimheight = $("input[name=dimheight]", this).val();
 		var dimh = Number(dimheight);
 	var qty = $("input[name=qty]", this).val();
 		var qty = Number(qty);
  	var sqrin =  Math.ceil(dimw * dimh);
  	var rawcost = sqrin * 0.49;
  	var rawcost = Math.ceil(rawcost);
    var totalcost = Math.ceil(qty * rawcost);
    totals.push(totalcost);

    var rawcost = (currencyFormat(rawcost));
    var totalcost = (currencyFormat(totalcost));

	if (qty > 1){
		$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br />Per Plate Cost: ' + rawcost + '<br /> Total Plate Cost: ' + totalcost);
	} else {
	$(".breakdown").append('<p class="perplate"><strong>Plate: ' + platename + '</strong><br />Raw Plate Dimentions: ' + dimwidth + ' x ' + dimheight + '<br /> Calculated Plate Dimentions: ' + dimw + ' x ' + dimh + '<br /> Total Square Inches: ' + sqrin + '"' + '<br />Quantity: ' + qty + '<br /> Total Plate Cost: ' + totalcost);
	}

});

  }

  var data_pulled = cdnumber + customername + " Plate Estimate";
  
  document.getElementById("overview").innerHTML = data_pulled + '<div id="summery">The ' + customername + " plate estimate for the " + jobdescription + " is based on " + numcolors + " colors on a " + repeat + '" repeat with a finished sleeve size of ' + size + '" | ' + sides + ' | Printing at ' + location + '</div>';

//add all values in totals array
var lowend = totals.reduce(function(a, b){
	return a + b;
}, 0);


	var margin = Math.ceil(lowend * 0.2);
    var highend = lowend + margin;

    var lowend = (currencyFormat(lowend));
    var highend = (currencyFormat(highend));

document.getElementById("range").innerHTML = lowend + " - "  + highend;

});