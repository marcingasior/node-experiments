var http = require('http');
var fs = require('fs');


// curl --upload-file photo.jpg http://localhost:3000
http.createServer(function(request, response) {
  var newFile = fs.createWriteStream('newFile.jpg');
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;
  request.on('data', function(data) {
      uploadedBytes += data.length;
      var progress = (uploadedBytes / fileBytes) * 100;
      response.write("progress: " + parseInt(progress ,10) + "%\n");
  });
  request.pipe(newFile);
  
  request.on('end', function(){
    response.end('uploaded!');
  });

}).listen(3000);
