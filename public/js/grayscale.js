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