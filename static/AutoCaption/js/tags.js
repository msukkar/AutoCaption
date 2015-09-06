var ready;

var tags = [];

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
        var text = $(this).text();
        tags.push(text);
    });

    $('#tag-input-box').bind('keypress', {}, keypressInBox);

    $(document).on('click', '.retry-btn', function() {
        // Do something, request to django to redirect to homepage?

    });

    $(document).on('click', '.refresh-btn', function() {
        // Refresh, try something new
        
    });

    $(document).on('click', '.up-btn', function() {
        // Communicate an upvote with server and probably bold the icon
        
    });

    $(document).on('click', '.btn.glyphicon', function(e) {
        // Remove the tag from list
        var tagName = $(this).parent().text().trim();
        var index = $.inArray(tagName, tags);
        tags.splice(index, 1);
        $(this).parent().fadeOut(400);
        return false;
        e.preventDefault();

    });

    $(document).on('click', '.caption-btn', function() {
        $('.tags').addClass('hidden', 400);
        $('.imgContainer').addClass('hidden');
        $('.loading').removeClass('hidden');
        var src = $('.img-responsive.img-thumbnail').attr('src');
        var dataObject = { "tags": tags, "imageSource": src }

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
            success: function(result) {
                $('.caption').removeClass('hidden', 400);
                $('.caption').text('THIS IS A CAPTION');
                $('.loading').removeClass('hidden');
                $('.imgContainer').addClass('hidden');
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
