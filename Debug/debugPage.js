//if you want use debug.js recommend you add below css is you html document
// <style type="text/css">
//        .debug{
//        font-weight:bold;
//        font-size:xx-large;
//        
//        }
//</style>
function debugPage(text) {
    var myinsert = document.getElementById("errorlogs");
    if (!myinsert) {
        myinsert = document.createElement("div");
        myinsert.innerHTML = "<div class='debug'>here is debug message </div>";
        myinsert.id = "errorlogs";
        document.body.appendChild(myinsert);
    }
    var msg = document.createElement("pre");
    msg.appendChild(document.createTextNode(text));
    myinsert.appendChild(msg);
}