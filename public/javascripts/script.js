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
	console.log(data)
})
