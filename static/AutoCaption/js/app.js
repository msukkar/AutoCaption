Dropzone.autoDiscover = false;
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  clickable: true,
};
var myDropzone = new Dropzone("#my-awesome-dropzone", Dropzone.options.myAwesomeDropzone);
