$(document).ready(function(){
	console.log("ready");

	//var client = new Faye.Client('http://localhost:3000/faye/',
	//	{timeout: 20 });

	var client = new Faye.Client('http://easyorder.herokuapp.com/faye/',
		{timeout: 120 },{endpoints: {websocket: 'ws://easyorder.herokuapp.com/faye/'}});
	client.disable('websocket');
	$('#error p').hide();
	$('#feedback').hide();

//MENU ACCORDION

	var accordion_mini = $('.miniaccordion > li > a');
	var accordion_mini_body = $('.miniaccordion li > .mini-sub');

	accordion_mini.on('click', function(e){
		e.preventDefault();
		if($(this).attr('class') != 'mini-active'){
			accordion_mini_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_mini.removeClass('mini-active');
			$(this).addClass('mini-active');
		}
	});

	var accordion_head = $('.accordion > li > a');
	var accordion_body = $('.accordion li > .miniaccordion');

	accordion_head.on('click', function(e){
		e.preventDefault();
		if($(this).attr('class') != 'active'){
			accordion_body.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_head.removeClass('active');
			$(this).addClass('active');
		}
	});

	var accordion_large = $('.large-accordion > li > a');
	var accordion_inner = $('.large-accordion li > .accordion');

	accordion_large.on('click', function(e){
		e.preventDefault();
		console.log("click");

		if($(this).attr('class') != 'large-active'){
			accordion_inner.slideUp('normal');
			$(this).next().stop(true,true).slideToggle('normal');
			accordion_large.removeClass('large-active');
			$(this).addClass('large-active');
		}
	});

//HOE TE BESTELLEN
	$('.item').on('click', function(){

		$(this).parent().toggleClass('bestel');

	});

	var orderId = 0;
	var idArray = [];
	var idArray_2 = [];	

	var saveOrder = function(currentID,tafelNummer,datum,tijd){
	order = [];
	//console.log(currentID);
	//console.log(tafelNummer);
	//console.log(datum);
	//console.log(tijd);
	$('#orders #' + currentID + ' li').each(function(index){
		
		var aantalstr = $(this).find('p:nth-child(2)').text();
		var aantal = aantalstr.substr(0, aantalstr.length-1);
		//console.log(aantal);
		var product = $(this).find('h4').text();
		//console.log(product);
		var prijs = $(this).find('p:last-child').text();
		//var prijs = prijsstr.substring(prijsstr.indexOf('€') + 1);
		//console.log(prijs);
		order.push({aantal: aantal, product: product, prijs: prijs});
	});

	$.ajax({
			type: 'POST',
			url: 'http://easyorder.herokuapp.com/order',
			data: {id: currentID, datum: datum, tijd: tijd, tafelnummer: tafelNummer, order: order},
			dataType: 'json',
		})
	 .done(function(data){
	 		//console.log('success');
	 		//console.log(data);
	 		previd = data;
	 });
	}


	var getBestelling = function(){

		var bestelling = [];
		console.log(tafel);
		$(".bestel").each(function(index)
		{
			var naam = $(this).find('div:first-child').text();
			var prijs = $(this).find('div:nth-child(2)').text().substring(1);
			var aantal = $(this).find('div:last-child input').val();
			var tafel = $("#tafel").val();
			bestelling.push({aantal: aantal, naam: naam, prijs: prijs, tafel: tafel});
			console.log(bestelling);
			
			//console.log(index + ":" + aantal + "" + naam + "" + prijs);
		});
		client.publish("/order", bestelling);
		//data variabelen
		orderId++;
		idArray_2.push(orderId);

		/*var bestellingnaam = $('.bestel div:first-child').text();
		var bestellingprijs = $('.bestel div:nth-child(2)').text();
		var bestellingaantal = $('.bestel div:last-child input').val();
		console.log(bestellingaantal + " " + bestellingnaam + " " + bestellingprijs);*/
	}


	$('#bestel').on('click', function(){
		console.log('getbestelling');
		var items = $('.bestel div:first-child').text();
		var inputfield = $('.bestel input').val();
		var tafelNR = $('#tafel').val();
		//console.log(items + ":" + inputfield);

		if(items === "")
		{
			console.log("bestelling niet correct!");
			$('#error p').text("Je kan niet niets bestellen!");
			$('#error p').slideDown();	

		}
		else
		{
		
			var allFilled = true;
			$(".bestel input").each(function(){
				return allFilled = allFilled && $(this).val();
			});
				if(!allFilled)
				{
					//console.log('vergeet aantal niet');
					$('#error p').text("Vergeet de hoeveelheid niet!");
					$('#error p').slideDown();
					
				}
				else
				{
					if(tafelNR == "")
					{
						$('#error p').text("Vergeet je tafelnummer niet!");
						$('#error p').slideDown();
					}
					else
					{
						getBestelling();
						location.href = "http://easyorder.herokuapp.com/feedback";
						$('#error p').hide();
						$('.bestel input').val("");
						$('#tafel').val("");
						$('.item').parent().removeClass('bestel');
					}

				}
			
		}
		
		//e.preventDefault();
		
	});

	client.subscribe("/order",function(result){
		//console.log(result);
		var ul = document.createElement('ul');
		ul.id = "order" + orderId;
		$('#orders').append(ul);
		var aantal;
		var naam;
		var prijs;
		var itemprijs;
		var totaalprijs = 0;
		var bestelling2 = [];
		$.each(result, function( index, value ) {
  			console.log(index + " " + value.naam);
  			aantal = value.aantal;
  			naam = value.naam;
  			prijs = value.prijs;
  			itemprijs = aantal * prijs;
  			tafel = value.tafel;
  			totaalprijs += parseFloat(itemprijs);
  			//console.log(aantal + "," + naam + "," + prijs);
  			var order = "<li><h5 class='neworder tafel'>tafel " + tafel + "</h5><p class='neworder aantal'>" + aantal + " X</p><h4 class='neworder it'>" + naam + " </h4><p class='neworder prijs'>€" + prijs + "</p></li>";
  			console.log(order);	
  			bestelling2.push(order);
		});
		totaal = totaalprijs.toFixed(2);
		$.each(bestelling2, function(index, value){
			console.log(value);

			$("#orders ul:last").append(value);
			
		});

		$('#orders ul:last').append("<div id='totdiv'><p id='totaal'>Totaal: €" + totaal + "</p><input class='print' type='button' value='print'/></div>")

		orderId++;
		idArray.push("order" + orderId);
		console.log(idArray);
	});


//TIMER FUNCTIE
	var Timer = function(p_bestelling){
		console.log('hide');
		//console.log(p_bestelling);
		idArray.shift();
		p_bestelling.remove();
		console.log(idArray);
	}
//ORDERREADY FUNCTIE = BEREKENEN HOELANG HET ONGEVEER ZAL DUREN 
	var ready;
	var orderReady = function(){
		var n = idArray.length;
		return ready = n * 10;

		//console.log(orderReady);
		//tijd publishen naar index 
		
	}


	client.subscribe("/feedback",function(data){
			console.log(data);
			var p = "<p>Uw bestelling zal klaar zijn binnen </br><span>" + data.ready + "</span> minuten!</br> Het te betalen bedrag is <span>" +data.totaal+".</span></p>";
			$('#movingBallG').hide();
			$('#feedback').fadeIn();
			$('#feedback').prepend(p);

		});

//TIMER FUNCTIE START OP KLIK PRINT
	$('#orders').on('click', '.print', function(){
		console.log('print');
		//console.log($(this).parent());
		var currentT = $(this).parent();
		var currentB = currentT.parent();
		var currentID = currentB.attr('id');
		var tafelNummerstr = currentB.find('h5:first').text();
		var tafelNummer = tafelNummerstr.substr(tafelNummerstr.length - 1);
		var totaalArr = $(this).parent().find('p').text().split(':');
		var totaalB = totaalArr[1];
		console.log(tafelNummer);
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var hour = d.getHours();
		var minute = d.getMinutes(); 
		var datum = day + "-" + month + "-" + year;
		var tijd = hour + ":" + minute;
		console.log(datum + " - " + tijd);
		//console.log(currentB, currentT);
		//bestelling saven in orders
		saveOrder(currentID,tafelNummer,datum,tijd);
		
		//berekening hoelang bestelling zal duren
		orderReady();
		console.log(ready);
		client.publish("/feedback", {ready: ready, totaal: totaalB});
		//de bestelling verdwijnt uit van /order
		currentB.fadeOut();

		//timefunctie starten
		setTimeout(function() {Timer(currentB);}, 600000);

	});

//TABBLADEN ORDER.JADE

	$('#orders').css('display','block');
	$('#alles').css('display', 'none');
	var tabID = $('.tab').attr('id');
	$('.tabs .tab-links a').on('click', function(e){
		var currentAttrVal = $(this).attr('href');
		console.log(currentAttrVal);
		//$(currentAttrVal).css('display', 'block');
		if(currentAttrVal === '#alles'){
			$('#alles').css('display','block');
			$('#orders').css('display', 'none');
		}
		else
		{
			$('#orders').css('display','block');
			$('#alles').css('display', 'none');
		}
		//$('.tab ' + currentAttrVal).addClass('active');
		//$('.tab ' + currentAttrVal).parent('div').siblings().removeClass('active');
		$(this).parent('li').addClass('tabactive').siblings().removeClass('tabactive');

		e.preventDefault();
	});
});


//twee tabbladen maken in /order
//1 recente orders, 2 alle orders
//recente bestelling op bestel in array time out 15 min * hoeveelste in array vanaf klik print
// print klik feedback naar / :  heel menu weg wel knop met terug naar menu
// na 15min moet oudste bestelling automatisch verhuizen naar de alle bestellingen tab.
//klik bestel aantal elementen in array tellen * 10(min)
// na 10min id verwijderen uit array wnr op print gedrukt is geweest.
