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

$('#enviar').on('click', function(){
	//var respuesta = [];

	let pais = $('#paises option:selected').val();
	let lenguaje = ($('input:radio[name=lenguaje]:checked').val());
	let nivel = ($('input:radio[name=nivel]:checked').val());
	let sistema = ($('input:radio[name=sistema]:checked').val());
	let editor = ($('input:radio[name=editor]:checked').val());
	// console.log(pais+lenguaje+nivel+sistema+editor);

	//respuesta.push(pais,lenguaje, nivel, sistema, editor);
	//console.log(respuesta);
	if (pais && lenguaje && nivel && sistema && editor) {
		let fila = `<tr><td><input type="checkbox"></td> <td>${pais}</td> <td>${lenguaje}</td>
					<td>${nivel}</td> <td>${sistema}</td> <td>${editor}</td> </tr>`;

		$('#table').append(fila);
		$("form")[0].reset();
		$(".error").css("display", "none");
	}

	else {
		$(".error").text("Faltan datos").css("display", "block")
	}
})

