var ready;

ready = function() {

    $('#loading-image').hide();

    $('#tag-input-box').bind('keypress', {}, keypressInBox);

    $(document).on('click', '.btn.glyphicon', function() {
        // Remove the tag from list
        $(this).parent().fadeOut(400);
    });

    $(document).on('click', '.caption-btn', function() {
        $('.tags').addClass('hidden', 400);
        $('.loading').removeClass('hidden');
        $('.dropzone').hide();
        $.ajax({
            url: '../main',
            success: function() {
                $('.dropzone').show();
                $('.caption').removeClass('hidden', 400);
            },
            complete: function() {
                $('.loading').addClass('hidden');
              }
          });
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

            $('<li class=\"tag__container\"><a href=\"#\" class=\"btn glyphicon glyphicon-remove-circle\"></a><span class=\"tag-text\">' + tag + '</span></li>').hide().appendTo('.tags__list-of-tags').fadeIn(400);
            $('#tag-input-box').val('');
        }
        // $(".tags__inputs").submit();
    }
};

$(document).ready(ready);

$(document).on('page:load', ready);
