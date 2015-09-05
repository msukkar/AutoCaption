var ready;

ready = function() {


}

var myDropzone = new Dropzone("#my-awesome-dropzone", { url: "/file/post"});

$(document).ready(ready);

$(document).on('page:load', ready);