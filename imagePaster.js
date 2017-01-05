document.onload = function (event) {
    //get us some jQuery
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


document.onpaste = function(event){
      var ticketID = 11011
    var items = event.clipboardData.items;
    console.log(JSON.stringify(items)); // will give you the mime types
    var blob = items[0].getAsFile();
    var reader = new FileReader();
    reader.onload = function(event){
        var dataURL = event.target.result;
        var mimeType = dataURL.split(",")[0].split(":")[1].split(";")[0];
        if ( mimeType = "image/png" ) 
        {
            filename = new Date().toISOString()
            var d = '------WebKitFormBoundarywZS6KiPlnY68NA60\r\n'+
            'Content-Disposition: form-data; name="file"; filename="'+filename+'.png"\r\n'+
            'Content-Type: '+mimeType+'\r\n'+
            'Content-Transfer-Encoding: binary\r\n\r\n'+
            dataURItoBlob(dataURL) +
            '\r\n\r\n'+
            '------WebKitFormBoundarywZS6KiPlnY68NA60--\r\n';
            $.ajax({
                method: "POST",
                url: "/helpdesk/attachment/upload?type=jobTicket&entityId=11011&returnFields=id,uploadDate",
                contentType: "multipart/form-data; boundary=----WebKitFormBoundarywZS6KiPlnY68NA60",
                data: d
            }).done(function(data){
                event.target.value += data
            })
        }
         
    };
    reader.readAsDataURL(blob);
}

document.onpaste = function(event){
    var ticketID = 11011
    var items = event.clipboardData.items;
    console.log(JSON.stringify(items)); // will give you the mime types
    var blob = items[0].getAsFile(); 
    var reader = new FileReader();
     reader.onload = function(event){
        var dataURL = event.target.result;
        var formData = new FormData();

        // Main magic with files here
        formData.append(filename+'.png', dataURL); 

        $.ajax({
            method: "POST",
            url: "/helpdesk/attachment/upload?type=jobTicket&entityId="+ticketID+"&returnFields=id,uploadDate",
            data: formData,
            processData: false,
            contentType:false
        }).done(function(data){
            event.target.value += data
        })

     }
    reader.readAsDataURL(blob);
    console.log(blob);
   
}