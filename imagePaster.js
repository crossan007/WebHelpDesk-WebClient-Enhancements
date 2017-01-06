document.onload = function (event) {
    //get us some jQuery
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

console.log(jQuery.fn.jquery);
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var jq224 = $.noConflict();
console.log(jQuery.fn.jquery);

document.onpaste = function(event){
    var ticketID = 11011
    var items = event.clipboardData.items;
    var blob = items[0].getAsFile(); 
    var reader = new FileReader();
    reader.onload = function(event){
        var dataURL = event.target.result;
        var formData = new FormData();
        // Main magic with files here
        filename = new Date().toISOString()
        var f = new File([dataURL],"image.png")
        formData.append("file", f); 

        jq224.ajax({
            method: "POST",
            url: "/helpdesk/attachment/upload?type=jobTicket&entityId="+ticketID+"&returnFields=id,uploadDate",
            data: formData,
            processData: false,
            contentType:false
        }).done(function(data){
            event.target.value += data
        })



     }
    reader.readAsBinaryString(blob);
}