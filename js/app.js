$(document).ready( function() {
//obsługa podstron
  $(".container").on("click","#about",function(e) {
    e.preventDefault(); 
    $("a").removeClass()
    $(this).toggleClass("on");
    $(".main").load("index.html #content");
  }); 

  $(".container").on("click","#skicams",function(e) {
    e.preventDefault();
    $("a").removeClass()
    $(this).toggleClass("on");
    getData(); //funkcja pobierająca dane
    $(".main").load("skicams.html #content");
  });

  $(".container").on("click", "#contact",function(e) {
    e.preventDefault();
    $("a").removeClass()
    $(this).toggleClass("on");
    $(".main").load("contact.html #contact-form");
  });

  $("a").click(function(e) {
    window.location.hash = $(this).attr("id")
    e.preventDefault();
  });
});

//pobieramy dane
function getData() {
  $.ajax({
    url: "https://makevoid-skicams.p.mashape.com/cams.json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Mashape-Key", "kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
    },
    dataType: "json",
    type : "get",
  })
    .done(function(data) {
      //testowe wypisanie pobranych danych w konsoli 
      console.log(data);

      addDate(); //data i godzina pobrania zdjęć
      
      //UWAGA! Zmieniłem miasta ponieważ nie udostępniają obecnie żadnych zdjęć (kamery wyłączone?) Wymieniłem je na Bielmote oraz Campo Tures

      //Bielmonte
      const cam1 = data[32].cams;
      $( "<h2>" ).append(data[32].name).appendTo( "#camera1" ); 
      //wg zadania tutaj powinno się znaleźć Andalo - wystarczy zmienić 32 element tablicy na 14 -> w data[32].name oraz data[32].cams -> poniżej kod:
      // const cam1 = data[14].cams;
      // $( "<h2>" ).append(data[14].name).appendTo( "#camera1" );
      $.each( cam1, function( i, item ) {
        $( "<img>" ).attr( "src", item.url ).appendTo( "#camera1" );
        $( "<p>" ).append(item.name).appendTo( "#camera1" );
      });
      
      //Campo Tures
      const cam2 = data[45].cams;
      $( "<h2>" ).append(data[45].name).appendTo( "#camera2" ); 
      //wg zadania tutaj powinno się znaleźć Monte Bondone - wystarczy zmienić 45 element tablicy na 159 -> w data[45].name oraz data[45].cams -> poniżej kod:
      // const cam2 = data[159].cams;
      // $( "<h2>" ).append(data[159].name).appendTo( "#camera2" );
      $.each( cam2, function( i, item ) {
        $( "<img>" ).attr( "src", item.url ).appendTo( "#camera2" );
        $( "<p>" ).append(item.name).appendTo( "#camera2" );
      });
      
    })
    
    .fail(function(data) {
      document.querySelector("#content").innerHTML = "wystąpił błąd w połączeniu"
      console.warn( "Wystąpił błąd w połączniu");
    });
}

//funkcja wyświetlająca datę i godzinę pobrania zdjęć
function addDate() {
  //data
  const d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let year = d.getFullYear();
  let hour = d.getHours();
  let min = d.getMinutes();

  //minuty
  if (min < 10) {
    min = "0" + min;
    console.log("minuty - dodajemy zero");
  } else {
    console.log("minuty ok");
  };

  //dni
  if (day < 10) {
    day = "0" + day;
    console.log("dni - dodajemy zero");
  } else {
    console.log("dni ok");
  };

  //miesiące
  if (month < 10) {
    month = "0" + month;
    console.log("miesiąc - dodajemy zero");
  } else {
    console.log("miesiące ok");
  };

  //data i godzina pobrania zdjęć
  const dat = day + "-" + month + "-" + year + "  " + hour + ":" + min;
  document.querySelector("#camera1").innerHTML = "<span>zdjęcia pobrano: " + dat + "</span>";
  document.querySelector("#camera2").innerHTML = "<span>zdjęcia pobrano: " + dat + "</span>";
}