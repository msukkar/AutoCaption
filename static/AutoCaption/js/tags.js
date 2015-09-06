var ready;

var tags = [];

var captions = [];
var currentCaption = 0;

ready = function() {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $('#loading-image').hide();

    $('.tag-text').each(function(i, obj) {
        var text = $(this).text().toLowerCase();
        if(text.indexOf('scene') > -1) {
          text.replace('scene','');
        }
        if(text != '') {
          tags.push(text);
        }
    });

    $('#tag-input-box').bind('keypress', {}, keypressInBox);


    $(document).on('mousedown', '.refresh-btn', function() {
      currentCaption += 1;
      $('.caption').html(captions[currentCaption]);
      if(currentCaption == captions.length) {
        $('.refresh-btn').attr('disabled', 'disabled');
        $('.refresh-btn').css('color', '#777');
      }
      if($('.up-btn').css('background-color') == 'rgb(255, 255, 255)'){
        $('.up-btn').css('background-color', 'rgba(34, 150, 189, .3);');
        $('.up-btn').css('color', '#fff');
      }
    });

    $(document).on('mousedown', '.up-btn', function() {
        // Communicate an upvote with server and probably bold the icon
        if($(this).css('background-color') != 'rgb(255, 255, 255)'){
          $(this).css('background-color', '#fff');
          $(this).css('color', 'rgb(34, 150, 189)');
        }
        else {
          $(this).css('background-color', 'rgba(34, 150, 189, .3);');
          $(this).css('color', '#fff');
        }
    });

    $(document).on('click', '.btn.glyphicon', function(e) {
        // Remove the tag from list
        if(!$(this).hasClass('up-btn') && !$(this).hasClass('refresh-btn')){
          var tagName = $(this).parent().text().trim();
          var index = $.inArray(tagName, tags);
          tags.splice(index, 1);
          $(this).parent().fadeOut(400);
          return false;
          e.preventDefault();
        }
    });

    $(document).on('click', '.caption-btn', function() {
        var src = $('.img-responsive').attr('src');
        var dataObject = { "tags": tags, "imageSource": src }
        $('.tags').addClass('hidden');
        $('.imgContainer').addClass('hidden');
        $('.loading').removeClass('hidden');


        var csrftoken = getCookie('csrftoken');
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
        });
        $.ajax({
            url: '../submitTags/',
            type: 'POST',
            data: JSON.stringify(dataObject),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data) {
                captions = data[0];
                var currentCaption = 0;
                $('.tags').removeClass('hidden');
                $('.tags__list-of-tags').addClass('hidden');
                $('.imgContainer').removeClass('hidden');
                $('.loading').addClass('hidden');
                $('.input-and-caption').addClass('hidden');
                $('.caption-container').removeClass('hidden');
                if(captions.length != 0) {
                  $('.caption').html(captions[currentCaption]);
                }
                else {
                  $('.caption').html("Could not find any related captions! Please try again with another image or try again another time as we expand our database!");
                  $('.refresh-btn').attr('disabled', 'disabled');
                  $('.refresh-btn').css('color', '#777');
                  $('.up-btn').attr('disabled', 'disabled');
                  $('.up-btn').css('color', '#777');
                }
                // console.log("ITS DONE!");
                // $('.caption').removeClass('hidden', 400);
                // $('.caption').text('THIS IS A CAPTION');
                // $('.loading').removeClass('hidden');
                // $('.imgContainer').addClass('hidden');
            }
        });

        // .done(function (data) {
        //     $('.caption').removeClass('hidden', 400);
        //     $('.caption').text('THIS IS A CAPTION');
        //     $('.loading').addClass('hidden');
        // });
    });
    // $(".tags__list-of-tags").tagit();
}

function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
        e.preventDefault();
        var tag = $('#tag-input-box').val();
        if (tag.length > 0) {

            // Add the tag to a list of tags to be sent to the captioner?
            tags.push(tag);

            $('<li class=\"tag__container\"><a href=\"#\" class=\"btn glyphicon glyphicon-remove\"></a><span class=\"tag-text\">' + tag + '</span></li>').hide().appendTo('.tags__list-of-tags').fadeIn(400);
            $('#tag-input-box').val('');
        }
        // $(".tags__inputs").submit();
    }
};

$(document).ready(ready);

$(document).on('page:load', ready);

$( window ).unload(function() {
  tags = [];
  captions = [];
  currentCaption = 0;
});
