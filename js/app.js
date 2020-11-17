$(function() {

  var currentPokemonId = 1;

  /* Escribe tu código aquí */
  /* */
  /* Función que detecta los clicks del usuario */
  $(document).ready(function(){

    /* click que introduce el input del usuario en la función getPkmn*/
    $("#boton-busqueda").click(function(){
      getPkmn($("input:text").val());
    });

    /* click que introduce la id actual más uno, para simular el siguiente pkmn en la lista, en la función getPkmn*/
    $("#boton-ant").click(function(){
      getPkmn(currentPokemonId - 1);
    });

    /* click que introduce la id actual menos uno, para simular el siguiente pkmn en la lista, en la función getPkmn*/
    $("#boton-pos").click(function(){
      getPkmn(currentPokemonId + 1);
    });
  });

  /* Función que obtiene la JSON de la pokeAPI según la Id introducida(número o nombre del pkmn) y esta info. se entrega a la función printPkmn */
  function getPkmn(pokemonId) {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, function(data) {
      printPkmn(data);
    });
  }

  /* Función que actualiza los datos del archivo HTML según el JSON entregado por la Id usada*/
  function printPkmn(data) {
    /* Se actualiza el Id actual del pkmn*/
    currentPokemonId = data.id;
    
    /* Se escribe el nombre del pkmn en la etiqueta pokemon-name*/
    $("#pokemon-name").text(data.name);
    
    /* Se utiliza condicionales en caso de que la URL de la imagen no este disponible*/
    if (data.sprites.other["official-artwork"].front_default != null) {
      /* Se actualiza de la URL en el atributo "src" de pokemon-image */
      $("#pokemon-image").attr("src", data.sprites.other["official-artwork"].front_default);
    } else if (data.sprites.front_default != null) {
      $("#pokemon-image").attr("src", data.sprites.front_default);
    } else {  
      $("#pokemon-image").attr("src", data.sprites.versions["generation-viii"].icons.front_default);
    }
    
    /* Se actualiza el texto en la barra de búsqueda con la Id del pkmn actúal */
    $("#barra-busqueda").val(currentPokemonId);
  }

  /* Hasta aquí :) */
});
