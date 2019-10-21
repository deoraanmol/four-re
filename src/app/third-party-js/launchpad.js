

/*** cnvyr.min.js.gz ***/
$(document).on("click","a",function(){var b=this.hash;var a=$(b);var c=a.offset();if(c&&b!==""&&this.host==location.host){event.preventDefault();$("html, body").animate({scrollTop:c.top},800,function(){window.location.hash=b})}});
