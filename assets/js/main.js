(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center'
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});





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

})(jQuery);

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
        //buildPorfolio(v);
        break;
      case 'current':
        buildCurrent(v);
        break;
      case 'resume':
        buildResume(v)
        break;
      case 'blog':
        //buildBlog(v);
        break;
      case 'contact':
        buildContact(v);
        break;
    }
  });
  //var scrollBoxes = $(".full-page > .overlay-container");
  //scrollBoxes.scrollbar();
}

function buildUserInfo(map){
  var userInfo = buildMap(map);
  $("#header").append(userInfo);
}

function buildHome(map){
  var homeSection = buildMap(map);
  $("section#header").append(homeSection);
  var sectionNav = buildSectionNav('home',true);
  $("#nav ul").append(sectionNav);
	$("#navPanel nav").append('<a class="link depth-0" href="#banner"><span class="indent-0"></span>Home</a>')
}

function buildAboutMe(map){
  var aboutMeSection = buildMap(map);
  $("#page-wrapper").append(aboutMeSection);
  var sectionNav = buildSectionNav('aboutMe',false);
  $("#nav ul").append(sectionNav);
	$("#navPanel nav").append('<a class="link depth-0" href="#aboutMe"><span class="indent-0"></span>Sobre m&iacute;</a>')
}

function buildPorfolio(map){
  var porfolio = buildMap(map);
  $("#page-wrapper").append(porfolio);
  var sectionNav = buildSectionNav('portfolio',false);
  $("#nav ul").append(sectionNav);
}

function buildResume(map){
  var resume = buildMap(map);
  $("#page-wrapper").append(resume);
  var sectionNav = buildSectionNav('resume',false);
  $("#nav ul").append(sectionNav);
}

function buildCurrent(map){
  var current = buildMap(map);
  $("#page-wrapper").append(current);
  var sectionNav = buildSectionNav('current',false);
  $("#nav ul").append(sectionNav);
	$("#navPanel nav").append('<a class="link depth-0" href="#current"><span class="indent-0"></span>Actualmente</a>')
}

function buildBlog(map){
  var blog = buildMap(map);
  $("#page-wrapper").append(blog);
  var sectionNav = buildSectionNav('blog',false);
  $("#nav ul").append(sectionNav);
}

function buildContact(map){
  var contact = buildMap(map);
	if(document.getElementById("footer")){
		$("#footer").remove();
	}
  $("#page-wrapper").append(contact);
  var sectionNav = buildSectionNav('contact',false);
  $("#nav ul").append(sectionNav);
	$("#navPanel nav").append('<a class="link depth-0" href="#footer"><span class="indent-0"></span>Contacto</a>')
}

function buildSectionNav(name,active){
  var section = '<li '+(active?'class="active"':'')+'>';
  switch(name){
    case 'home':
      section +='<a href="#banner">Home</a>';
      break;
    case 'aboutMe':
      section +='<a href="#aboutMe">Sobre mí</a>';
      break;
    case 'portfolio':
      section +='<a href="#portfolio">Portfolio</a>';
      break;
    case 'current':
      section +='<a href="#current">Actualmente</a>';
      break;
    case 'resume':
      section +='<a href="#resume">Pasado</a>';
      break;
    case 'blog':
      section +='<a href="#blog">Blog</a>';
      break;
    case 'contact':
      section +='<a href="#footer">Contacto</a>';
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
		/* */
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
		/* */
		//var jsonContent = $.parseJSON(content);
		buildFromJsonContent(jsonContent);
	});

	if($("#dialog").length>0 && $("#dialog").is(':visible') && $("#dialog").dialog('isOpen')){
    $("#dialog").dialog("close");
  }

}
