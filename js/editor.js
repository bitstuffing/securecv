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

$(document).ready(function(){
  $(".loading").fadeOut("slow");
  resize();
});

function resize(){
  var width = $(window).height();
  console.log(width);
  $("textarea").css("height",parseInt(width)/2);
}

$(window).on("resize",resize);

function decode(){
  var password = $("#password").val();
  var content = $("#encryptedTextArea").val();
  var decrypted = crypto.decryptMessage(content,password);
  save("securecv.dec",decrypted);
  //$("#decryptedTextArea").html(decrypted);
}

function encode(){
  var password = $("#password").val();
  var content = $("#decryptedTextArea").val();
  var encrypted = crypto.encryptMessage(content,password);
  save("securecv.enc",encrypted);
  //$("#encryptedTextArea").html(encrypted);
}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}
