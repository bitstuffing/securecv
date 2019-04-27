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

function buildMainTag(){
  $("#mainTag").append(getMainContent("Profesor Hubert Farnsworth"));
}

function getMainContent(name){
  var content = '<section class="full-page" id="home">';
  content += '<div class="home overlay-container">';
  content += '<div class="overlay">';
  content += '<div class="intro-section kayo-container display-table">';
  content += '<div class="display-table-cell">';
  content += '<h3 class="kayo-hello">Hola, soy</h3>';
  content += '<h1 class="mr-kayo">'+name+'</h1>';
  content += '<h3 class="kayo-work-description">&nbsp;<span class="kayo-work"></span></h3>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '</div>';
  content += '</section>';
  return content;
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
    console.log(crypto.decryptMessage('U2FsdGVkX1/S5oc9WgsNyZb8TJHsuL7+p4yArjEpOCYgDTUdkVxkmr+E+NdJmro9','your_password'))
    $("#dialog").dialog("close");
    $(".loading").fadeOut("slow");
    buildMainTag();
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
