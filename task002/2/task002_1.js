/**
 * Created by icmonkeypc on 2017/2/8.
 */
$.click("#button_1", function () {
    var str = $("#input_1").value.toString();
    var Hobbies = uniqArray(str.split(","));
    var new_Hobbies = [];
    for(var i in Hobbies) {
        if(Hobbies[i] != "") {
            new_Hobbies.push(Hobbies[i]);
        }
    }
    $("#p_1").textContent = new_Hobbies.toString();
})

$.click("#button_2", function () {
    var str = $("#input_2").value.toString();
    var re = /[\w]+/g
    var Hobbies = uniqArray(str.match(re));
    var new_Hobbies = [];
    for(var i in Hobbies) {
        if(Hobbies[i] != "") {
            new_Hobbies.push(Hobbies[i]);
        }
    }
    $("#p_2").textContent = new_Hobbies.toString();
})

$.click("#button_3", function () {
    var str = $("#input_3").value.toString();
    var re = /[\w]+/g
    if(str.match(re) == null||str.match(re).length>10) {
        $("#error").textContent = "错误！请重新输入！"
        return;
    }
    var Hobbies = uniqArray(str.match(re));
    $("#error").textContent = "";
    for(var i in Hobbies) {
        if(Hobbies[i] != "") {
            var cb_hb = document.createElement('div');
            var cb = document.createElement('input');
            var hb = document.createTextNode(Hobbies[i]);
            cb_hb.style.display = "block";
            cb.type = "checkbox";
            cb_hb.appendChild(cb);
            cb_hb.appendChild(hb);
            $("#divforcheckbox").appendChild(cb_hb);

        }
    }
})