/**
 * Created by icmonkeypc on 2017/2/9.
 */
$(document).ready(function () {
    $("button").click(function () {
        var time = $("#time").val();
        var cycle = $("#cycle");
        var img
        if($("#cycle").is( ":checked" )) {
            var i = 1;
            ll();
            function ll() {
                var img_in = "";
                var t1 = setInterval(function () {
                    var img_out = "#img" + i;
                    if(i == 5) { //判断是否循环一轮完毕
                        img_in = "#img2";
                    }else {
                        img_in = "#img" + (i + 1);
                    }
                    var img_in_btn = "#btn_" + img_in.substring(1);
                    $(img_in_btn).css("background-color", "white");
                    var img_out_btn = "#btn_" + img_out.substring(1);
                    $(img_out_btn).css("background-color", "rebeccapurple");
                    $(img_in).animate({
                        top: '0px',
                    },"slow");
                    $(img_out).animate({
                        top: '-300px',
                    },"slow",function () {
                        if(img_out != "#img1") {
                            $(img_out).css("top", "300px")
                        }
                    });
                    i++;
                    if(i == 6) {
                        i = 2 ;
                    }
                }, time)
                $(".btn").each(function () {
                    $(this).click(function () {
                        var img = "#" + $(this).attr("id").split("_")[1];
                        var img_in_btn = "#btn_" + img_in.substring(1);
                        clearInterval(t1);
                        $(this).css("background-color", "white");
                        $(img_in_btn).css("background-color", "rebeccapurple");
                        if(img_in != img) {
                            $(img_in).animate({
                                top: '-300px',
                            }, 'slow', function () {
                                $(img_in).css("top", "300px")
                                img_in = img;
                            });
                            $(img).animate({
                                top: '0px',
                            }, "slow");
                        }

                    })
                })
            }
        }else {
            var i = 1;
            ll();
            function ll() {
                var t2 = setInterval(function () {
                    if(i == 4) {
                        return;
                    }
                    var img_out = "#img" + i;
                    var img_in = "#img" + (i + 1);
                    var img_in_btn = "btn_" + img_in;
                    var img_in_btn = "#btn_" + img_in.substring(1);
                    $(img_in_btn).css("background-color", "white");
                    var img_out_btn = "#btn_" + img_out.substring(1);
                    $(img_out_btn).css("background-color", "rebeccapurple");
                    $(img_in).animate({
                        top: '0px',
                    },"slow");
                    $(img_out).animate({
                        top: '-150px',
                    },"slow");
                    i++;
                }, time)
            }
        }
    })
})