let crypto = (function(){
    return{
      encryptMessage: function(messageToencrypt = '', secretkey = ''){
        var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
        return encryptedMessage.toString();
      },
      decryptMessage: function(encryptedMessage = '', secretkey = ''){
        var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
        var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedMessage;
      }
    }
})();

function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function buildFromJsonContent(content){
  $.each(content,function(k,v){
    switch(k){
      case "home":
        buildHome(v);
        break;
      case "aboutMe":
        buildAboutMe(v);
        $(".aboutMe").niceScroll();
        break;
    }
  });

}

function buildAboutMe(map){
  var aboutMeSection = buildMap(map);
  $("#mainTag").append(aboutMeSection);
}

function buildHome(map){
  var homeSection = buildMap(map);
  $("#mainTag").append(homeSection);
}

function buildMap(map){
  var built;
  for (var key in map) {
    console.log(key + " -> " + map[key]);
    switch(key){
      case "content":
        console.log("recursive -->> ");
        for (var index in map[key]) {
          console.log("index -->> "+index);
          var content = buildMap(map[key][index]);
          built.append(content);
        }
        break;
      case "type":
        built = $("<"+map[key]+"/>");
        break;
      case "class":
        built.addClass(map[key]);
        break;
      case "stype":
        built.css(map[key]);
        break;
      case "text":
        built.text(map[key]);
        break;
    }
  }
  return built;
}


$(document).ready(function(){

  $(".bit-links a,.scrollLink").click(function(e){
    e.preventDefault();
    $(".bit-links li").removeClass("active");
    $(this).parent().addClass("active");
  });

  $(".menu-toggle").on("click", function () {
      $("body").toggleClass('mobile-menu-active');
  });

  $("#passwordButton").click(function(){
    console.log(crypto.encryptMessage('Welcome to AES !','your_password'));
    console.log(crypto.decryptMessage('U2FsdGVkX1/S5oc9WgsNyZb8TJHsuL7+p4yArjEpOCYgDTUdkVxkmr+E+NdJmro9','your_password'));
    //var file = readTextFile("securecv.json");
    //alert(file);
    $.get("securecv.json",function(content){
      var jsonContent = $.parseJSON(content);
      buildFromJsonContent(jsonContent);
    });
    $("#dialog").dialog("close");
    $(".loading").fadeOut("slow");
  });

  $("#dialog").dialog({
    autoOpen : false,
    modal : true,
    show : "blind",
    hide : "blind"
  }).on('dialogclose', function(event) {
     $(".loading").fadeOut("slow");
  });

  $("#dialog").dialog("open");

});
