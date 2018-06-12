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
		//console.log(element.pregunta+' '+element.opciones);
		element.opciones.forEach(function(elem) {
			var respuestas = $(`<label for="${elem}"><input type='radio' name='${element.name}' value='${elem}' id='${elem}'>${elem}</label>`);
		
			pregunta.append(respuestas);

		})
		
		$('form').append(pregunta);
	})
	$('form').append($(`<div class="btn"><input id="enviar" type='button' value='Enviar'></div>`));
	$('form').append($("<div class='error' style='display:none'></div>"));
})

	$(document).on('click', "#enviar" ,function(){
		//var respuesta = [];
	
		let pais = $('#paises option:selected').val();
		let lenguajes = ($('input:radio[name=lenguajes]:checked').val());
		let nivel = ($('input:radio[name=nivel]:checked').val());
		let sistema = ($('input:radio[name=sistema]:checked').val());
		let editor = ($('input:radio[name=editor]:checked').val());
		// console.log(pais+lenguaje+nivel+sistema+editor);
	
		//respuesta.push(pais,lenguaje, nivel, sistema, editor);
		//console.log(respuesta);
		if (pais && lenguajes && nivel && sistema && editor) {
			let fila = `<tr><td><input type="checkbox"></td> <td>${pais}</td> <td>${lenguajes}</td>
						<td>${nivel}</td> <td>${sistema}</td> <td>${editor}</td> </tr>`;
	
			$('#table').append(fila);
			$("form")[0].reset();
			$(".error").css("display", "none");
		}
	
		else {
			$(".error").text("Faltan datos").css("display", "block")
		}
	})

