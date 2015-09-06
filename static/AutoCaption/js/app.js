// Dropzone.autoDiscover = false;
// Dropzone.options.myAwesomeDropzone = {
//   paramName: "file", // The name that will be used to transfer the file
//   maxFilesize: 2, // MB
//   clickable: true
// };
// var myDropzone = new Dropzone("#my-awesome-dropzone", Dropzone.options.myAwesomeDropzone);

var ready;

ready = function() {

	$('#url').keypress(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if (code == 13) {
			$('.container').addClass('hidden');
        	$('.loading').removeClass('hidden');
		}
	});


	$('.fileUpload').on('change', function (e) {
		$('.container').addClass('hidden');
        $('.loading').removeClass('hidden');
	});

}

// function keypressInBox(e) {
//     var code = (e.keyCode ? e.keyCode : e.which);
//     if (code == 13) { //Enter keycode
//         e.preventDefault();
//         // $('.container').addClass('hidden');
//         // $('.loading').removeClass('hidden');
//     }
// };

$(document).ready(ready);

$(document).on('page:load', ready);