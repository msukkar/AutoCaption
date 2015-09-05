var ready;

ready = function() {

	$("#my-awesome-dropzone").dropzone({ url: "/file/post" });


}


$(document).ready(ready);

$(document).on('page:load', ready);