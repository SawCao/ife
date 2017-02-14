/**
 * Created by icmonkeypc on 2017/2/11.
 */
function testajax(url, options) {
    var xmlhttp = new XMLHttpRequest();
    var list = [];
    //成功与否判断
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                list = xmlhttp.responseText.toString().split(",");
                for(var i in list) {
                    var node = document.createElement("option");
                    node.value = list[i];
                    $("#list").appendChild(node);
                }
        }
    }
    xmlhttp.open("GET","test.php",true);
    xmlhttp.send();
}