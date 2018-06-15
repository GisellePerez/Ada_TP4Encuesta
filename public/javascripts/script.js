// $.getJSON( "/paises", function( data ) {
//     console.log(data);
//     data.paises.forEach(function(element) {
//         let option = `<option value="${element.nombre}">${element.nombre}</option>`
//         $("#paises").append(option);
//     }) 
// });
$.ajax({
	url: "/paises",
	dataType: "json",
}).done(function(data) {
	console.log(data.paises)
	data.paises.forEach(function(element) {
        let option = `<option value="${element.nombre}">${element.nombre}</option>`
        $("#paises").append(option);
    })
})

$.ajax({
	url: "/preguntas",
	dataType: "json",
}).done(function(data) {
	console.log(data.preguntas)
	data.preguntas.forEach(function(element) {
		let pregunta = $(`<div id="${element.name}"><h3>${element.pregunta}</h3></div>`);
		element.opciones.forEach(function(elem) {
			var respuestas = $(`<label for="${elem}"><input type='radio' class="radioBtn" name='${element.name}' value='${elem}' id='${elem}'>${elem}</label>`);
			pregunta.append(respuestas);
		})		
		$('form').append(pregunta);
	})
	$('form').append($(`<div class="btn"><input id="enviar" type='button' value='Enviar'></div>`));
	$('form').append($("<div class='error' style='display:none'></div>"));
})

function mostrarRespuestas(respuesta) {
		let fila = `<tr data-id="${respuesta.id}"><td><input type="checkbox"></td> <td>${respuesta.pais}</td> <td>${respuesta.lenguajes}</td><td>${respuesta.nivel}</td> <td>${respuesta.sistema}</td> <td>${respuesta.editor}</td><td><i class="fas fa-trash"></i></td> </tr>`;
		$('#table').append(fila);
		piePaises();
}

//trae las respuestas de localStorage o crea el array para las futuras respuestas
let respuestas = (JSON.parse(localStorage.getItem("respuestas")) || []);
//muestra las respuestas en la tabla
if (respuestas.length > 0) {
	respuestas.forEach(mostrarRespuestas);
}

$(document).on('click', "#enviar" ,function(){
	let pais = $('#paises option:selected').val();
	let lenguajes = ($('input:radio[name=lenguajes]:checked').val());
	let nivel = ($('input:radio[name=nivel]:checked').val());
	let sistema = ($('input:radio[name=sistema]:checked').val());
	let editor = ($('input:radio[name=editor]:checked').val());

	if (pais && lenguajes && nivel && sistema && editor) {
		//guardo la respuesta en localStorage
		let	respuesta = {
			pais: pais,
			lenguajes: lenguajes,
			nivel: nivel,
			sistema: sistema,
			editor: editor
		}
		respuestas.push(respuesta);
		let id = respuestas.indexOf(respuesta);


		//cuando ya la mandé al array de respuestas, creo un id con el índice
		respuesta.id = id;
		console.log(respuesta, id)

		localStorage.setItem("respuestas", JSON.stringify(respuestas));
		//muestro la respuesta
		mostrarRespuestas(respuesta);
		$("form")[0].reset();
		$(".error").css("display", "none");

		//pie(); //aca solo muestra con el click de enviar
	}

	else {
		$(".error").text("Faltan datos").css("display", "block")
	}
})

$(document).on('click', ".fas", function(){
	//saca la fila de la tabla
	$(this).closest("tr").remove();
	//saca la respuesta de localStorage y lo actualiza
	let id = $(this).closest("tr").data("id");
	respuestas.splice(id, 1);
	localStorage.setItem("respuestas", JSON.stringify(respuestas));	
});

/*********************************************************** */
function piePaises(){
	let resp = JSON.parse(localStorage.getItem("respuestas"));
	let arg = 0;
	let bol = 0;
	let bra = 0;
	let chi = 0;
	let par = 0;
	let uru = 0;
	console.log(resp);
	for (var i = 0; i < resp.length; i++) {
	var pais = resp[i].pais;	
		if (pais == "Argentina") {
			arg++;
		} else if (pais == "Bolivia") {
			bol++;
		} else if (pais == "Brasil") {
			bra++;
		} else if (pais == "Chile") {
			chi++;
		} else if (pais == "Paraguay") {
			par++;
		} else if (pais == "Uruguay") {
			uru++;
		}
	}
			
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ["Argentina", "Bolivia", "Brasil", "Chile", "Paraguay", "Uruguay"],
			datasets: [{
				label: '# of Votes',
				data: [arg,bol,bra,chi,par,uru],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)',
					'rgba(153, 102, 255)',
					'rgba(255, 159, 64)',
					'rgba(255, 10, 64)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 10, 64)'
				],
				borderWidth: 1
			}]
		},
		data: {
			labels:["Argentina", "Bolivia", "Brasil", "Chile", "Paraguay", "Uruguay"],

			datasets: [{
				label: '# of Votes',
				data: [arg,bol,bra,chi,par,uru],
				backgroundColor: [
					'rgba(255, 99, 132)',
					'rgba(54, 162, 235)',
					'rgba(255, 206, 86)',
					'rgba(75, 192, 192)',
					'rgba(153, 102, 255)',
					'rgba(255, 159, 64)',
					'rgba(255, 10, 64)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 10, 64)'
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			scales: {
			}
		}
	});
}

//localStorage.clear();
