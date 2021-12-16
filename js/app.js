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

function readTextFile(file){ //ajax without jquery for internet explorer issues
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                //console.log(allText);
            }
        }
    }
    rawFile.send(null);
}

function buildFromJsonContent(content){
  $.each(content,function(k,v){
    switch(k){
      case "userinfo":
        buildUserInfo(v);
        break;
      case "home":
        buildHome(v);
        break;
      case "aboutMe":
        buildAboutMe(v);
        break;
      case 'portfolio':
        buildPorfolio(v);
        break;
      case 'current':
        buildCurrent(v);
        break;
      case 'resume':
        buildResume(v)
        break;
      case 'blog':
        buildBlog(v);
        break;
      case 'contact':
        buildContact(v);
        break;
    }
  });
  var scrollBoxes = $(".full-page > .overlay-container");
  scrollBoxes.scrollbar();
}

function buildUserInfo(map){
  var userInfo = buildMap(map);
  $("#menuTogglable").prepend(userInfo);
}

function buildHome(map){
  var homeSection = buildMap(map);
  $("#mainTag").append(homeSection);
  var sectionNav = buildSectionNav('home',true);
  $("#ulSectionNav").append(sectionNav);
}

function buildAboutMe(map){
  var aboutMeSection = buildMap(map);
  $("#mainTag").append(aboutMeSection);
  var sectionNav = buildSectionNav('aboutMe',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildPorfolio(map){
  var porfolio = buildMap(map);
  $("#mainTag").append(porfolio);
  var sectionNav = buildSectionNav('portfolio',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildResume(map){
  var resume = buildMap(map);
  $("#mainTag").append(resume);
  var sectionNav = buildSectionNav('resume',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildCurrent(map){
  var current = buildMap(map);
  $("#mainTag").append(current);
  var sectionNav = buildSectionNav('current',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildBlog(map){
  var blog = buildMap(map);
  $("#mainTag").append(blog);
  var sectionNav = buildSectionNav('blog',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildContact(map){
  var contact = buildMap(map);
  $("#mainTag").append(contact);
  var sectionNav = buildSectionNav('contact',false);
  $("#ulSectionNav").append(sectionNav);
}

function buildSectionNav(name,active){
  var section = '<li '+(active?'class="active"':'')+'>';
  switch(name){
    case 'home':
      section +='<a href="#home"><i class="fa fa-home"></i>Home</a>';
      break;
    case 'aboutMe':
      section +='<a href="#aboutMe"><i class="glyphicon glyphicon-user"></i>Sobre mí</a>';
      break;
    case 'portfolio':
      section +='<a href="#portfolio"><i class="fa fa-laptop"></i>Portfolio</a>';
      break;
    case 'current':
      section +='<a href="#current"><i class="fa fa-laptop"></i>Actualmente</a>';
      break;
    case 'resume':
      section +='<a href="#resume"><i class="glyphicon glyphicon-leaf"></i>Pasado</a>';
      break;
    case 'blog':
      section +='<a href="#blog"><i class="fa fa-newspaper-o"></i>Blog</a>';
      break;
    case 'contact':
      section +='<a href="#contact"><i class="glyphicon glyphicon-headphones"></i>Contacto</a>';
      break;
  }
  section+= '</li>';
  return section;
}

function buildMap(map){
  var built;
  for (var key in map) {
    switch(key){
      case "content":
        for (var index in map[key]) {
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
      case "style":
        built.css(map[key]);
        break;
      case "text":
        built.text(map[key]);
        break;
      case "src":
      case "alt":
      default: //any key="value"
        built.attr(key,map[key]);
        break;
    }
  }
  return built;
}

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function worker(p){
  $.get("securecv.enc",function(content){
    console.log("decoding...");
    var decrypted = "";
    if(p instanceof Object){
      var password = $("#password").val();
      try{
        decrypted = crypto.decryptMessage(content,password);
      }catch(e){
        $("<div>Ups! Bad password.</div>").dialog({
          buttons: {
              "Ok": function()  {
                  $(this).dialog("close");
                  window.location.href="";
              }
          }
        });
      }
    }else if(p && p.length>0){
      try{
        //var password = b64_to_utf8(p);
        decrypted = crypto.decryptMessage(content,p);
      }catch(e){
        $("<div>Ups! Bad password!</div>").dialog({
          buttons: {
              "Ok": function()  {
                  $(this).dialog("close");
                  window.location.href="";
              }
          }
        });
      }
    }else{
      $("<div>Ups! No password</div>").dialog({
          buttons: {
              "Ok": function()  {
                  $(this).dialog("close");
                  window.location.href="";
              }
          }
        });
    }

    console.log("done, perfect!");
    var jsonContent = $.parseJSON(decrypted);
    buildFromJsonContent(jsonContent);

    var parentHeight = $(".home").parent().css("height");
    $(".home").css("height",parentHeight);

    //events TODO configure
    $(".bit-links a,.scrollLink").click(function(e){
      e.preventDefault();
      $(".bit-links li").removeClass("active");
      $(this).parent().addClass("active");
      var target = e.target.href;
      target = target.substring(target.indexOf("#")+1);

      $(".menu-toggle").trigger("click");
      $('html, body').animate({
        scrollTop: $("section > ."+target).offset().top -25
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = "#"+target;
        $("section > ."+target).scrollTop(50);
      });
    });

    $('.portfolio-sorting li').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').addClass('active').siblings().removeClass('active');
      var seclector = $(this).attr('data-filter');
      $('.grid').isotope({
          filter: seclector
      });
      return false;
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        lazyLoad:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });

  });
  $(window).on("resize",function(){
    //apply fix for home section
    var parentHeight = $(".home").parent().css("height");
    $(".home").css("height",parseInt(parentHeight)-25);
  });

  if($("#dialog").length>0 && $("#dialog").is(':visible') && $("#dialog").dialog('isOpen')){
    $("#dialog").dialog("close");
  }
  $(".loading").fadeOut("slow");
//});

}

$(document).ready(function(){

  $(".menu-toggle").on("click", function () {
      $("body").toggleClass('mobile-menu-active');
  });

  let searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('p')){
    let p = searchParams.get('p');
    try{
        var decoded = b64_to_utf8(p);
        worker(decoded);
    }catch(e){
      $("<div>Ups! Bad url</div>").dialog({
          buttons: {
              "Ok": function()  {
                  $(this).dialog("close");
                  window.location.href="";
              }
          }
        });
    }
  }else{
    $("#passwordButton").click(worker);

    $("#dialog").dialog({
      autoOpen : false,
      modal : true,
      show : "blind",
      hide : "blind"
    }).on('dialogclose', function(event) {
       $(".loading").fadeOut("slow");
    });


    $("#dialog").dialog("open");
  }

});
