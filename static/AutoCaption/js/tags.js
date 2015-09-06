var ready;

var tags = [];

ready = function() {

    $('#loading-image').hide();

    $('.tag-text').each(function(i, obj) {
        var text = $(this).text();
        tags.push(text);
    });

    $('#tag-input-box').bind('keypress', {}, keypressInBox);

    $(document).on('click', '.btn.glyphicon', function() {
        // Remove the tag from list
        var tagName = $(this).parent().text().trim();
        var index = $.inArray(tagName, tags);
        tags.splice(index, 1);
        $(this).parent().fadeOut(400);
    });

    $(document).on('click', '.caption-btn', function() {
        $('.tags').addClass('hidden', 400);
        $('.loading').removeClass('hidden');
        var src = $('.img-responsive.img-thumbnail').attr('src');
        console.log(src);
        var dataObject = { "tags": tags, "imageSource": src }
        $.ajax({
            url: '../submitTags',
            type: 'POST',
            data: dataObject,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(result) {
                $('.caption').removeClass('hidden', 400);
                $('.caption').text('THIS IS A CAPTION');
                $('.loading').addClass('hidden');
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

            $('<li class=\"tag__container\"><a href=\"#\" class=\"btn glyphicon glyphicon-remove-circle\"></a><span class=\"tag-text\">' + tag + '</span></li>').hide().appendTo('.tags__list-of-tags').fadeIn(400);
            $('#tag-input-box').val('');
        }
        // $(".tags__inputs").submit();
    }
};

$(document).ready(ready);

$(document).on('page:load', ready);
