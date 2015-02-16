/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('#subscribe-button').click(function(){
  var email = $('#get-info-email').val();
  $('.subscribe-error').hide();
  $('.subscribe-error-message').hide();
  if($('#get-info-email')[0].validity.valid){
    $('.subscribe-spinner').show();
    $.post('/subscribe', {email: email}, function(data){
      $('.subscribe-spinner').hide('slow', function(){
        if(typeof(data.error) == 'undefined'){
          $('.subscribe-success').show('slow', function(){
            $('#get-info-email').val('');
            setTimeout(function(){
              $('.subscribe-success').hide('fast');
            }, 3000);
          });
        }else{
          $('.subscribe-error-message').text(data.error);
          $('.subscribe-error').show('slow');
          $('.subscribe-error-message').show('slow');
        }
      });
    }).fail(function(){
      $('.subscribe-spinner').hide('slow', function(){
        $('.subscribe-error-message').text('Tuntematon virhe!');
        $('.subscribe-error').show('slow');
        $('.subscribe-error-message').show('slow');
      });
    });
  }else {
    $('.subscribe-error-message').text('Syötä sähköpostiosoite.');
    $('.subscribe-error').show('slow');
    $('.subscribe-error-message').show('slow');
  }
});

var MAX_FEED_ITEMS = 3;
var WORD_COUNT = 50;

function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  var text = tmp.textContent || tmp.innerText || "";
  var words = text.split(' ');
  if (words.length < WORD_COUNT) {
    return text;
  } else {
    text = "";
    for (var i = 0; i < WORD_COUNT; i++) {
      text += ' ' + words[i];
    }
    return text + '...';
  }
}

$.get('http://mikkeli.hacklab.fi/blog/rss/', function (feed) {
  count = 0;
  $(feed).find('item').each(function () {
    if (count < MAX_FEED_ITEMS) {
      var el = $(this);
      var title = el.find("title").text();
      var link = el.find("link").text();
      var content = strip(el.find("description").text());
      $('#latest-blog-posts').append('<div class="col-lg-8 col-lg-offset-2"><a href="'+link+'"><h3>'+title+'</h3></a><p class="blog-post-content">'+content+'</p></div>');
    }
    count++;
  });
});