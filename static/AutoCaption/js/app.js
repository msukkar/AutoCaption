Dropzone.autoDiscover = false;
Dropzone.options.myAwesomeDropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 2, // MB
  clickable: true,
  init: function () {
   this.on("complete", function (file) {
     if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
       window.location.href = {% url 'main:imageUpload' %};
     }
   });
 }
};
var myDropzone = new Dropzone("#my-awesome-dropzone", Dropzone.options.myAwesomeDropzone);
