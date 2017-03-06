/**
 * Created by icmonkeypc on 2017/2/3.
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (arr instanceof Array) {
        return true
    }else {
        return false
    }
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if (arr instanceof Function) {
        return true
    }else {
        return false
    }
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var new_obj = new_obj || {}
    if(src instanceof Object){
        for(var i in src){
            if(typeof src[i] == "object" && src[i] != null){
                new_obj[i] = cloneObject(src[i])
            }else{
                new_obj[i] = src[i]
            }
        }

    }else{
        new_obj[i] = src[i]
    }
    return new_obj;
}




// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var new_arr = new_arr||[];
    var i = 0,repeat = 0;
    for(; i<arr.length; i++){
        for(var k = 0; k<new_arr.length;k++){
            if(new_arr[k] == arr[i]){
                repeat = 1;
                break;
            }
        }
        if(!repeat) {
            new_arr.push(arr[i]);
        }
        repeat = 0;
    }
    return new_arr;
}



// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var patt1 = /^\s*|\s*$/g;
    return str.replace(patt1,"");
}



// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    if(fn instanceof Object){
        if(fn.length == 1){
            var str = ""
            for(var i in arr){
                if(i != arr.length-1)
                    fn(arr[i]+",")
                else
                    fn(arr[i])
            }
        }else if(fn.length == 2){
            var str = ""
            for(var i in arr){
                if(i != arr.length-1)
                    fn(arr[i]+",",i)
                else
                    fn(arr[i],i)
            }
        }
    }
}





//正则表达式相关
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    return re.test(emailStr)
}
console.log(isEmail("asdasd@asdaasd.com"))
// 判断是否为手机号
function isMobilePhone(phone) {
    var re = /^1(\d){10}$/
    return re.test(phone)
}

// 判断element是否含有名为className的样式
function haveClass(element, className) {
    var re = /\w+/g;
    var classNamelist = element.className.match(re);
    for(var i in classNamelist) {
        if(classNamelist[i] == className)
            return true;
    }
    return false;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!haveClass(element, newClassName)) {
        element.className += element.className+ " "+ newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(haveClass(element, oldClassName)) {
        element.className
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode === siblingNode.parentNode)
        return true;
    else
        return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + document.documentElement.scrollLeft;
    pos.y = element.getBoundingClientRect().top + document.documentElement.scrollTop;
}
// your implement

// 实现一个简单的Query
function $(selector) {
    var node = null;
    var att = /^\[.+\]$/;
    var att_value = /^\[.+=.+\]$/;
    function recursion(selector, element) {

        if (selector[0] === "#") {
            node = document.getElementById(selector.slice(1));

        } else if ((selector[0] >= "a" && selector[0] <= "z") || (selector[0] >= "A" && selector[0] <= "Z") || (selector[0] >= "0" && selector[0] <= "1")) {
            node = document.getElementsByTagName(selector)[0];

        } else if (selector[0] === ".") {
            node = document.getElementsByClassName(selector.slice(1));

        } else if (att_value.test(selector)&& node == null) {
            if(element.hasChildNodes()) {
                var nodelist = element.childNodes;
                for (var i in nodelist) {
                    if (nodelist[i].nodeType == 1) {
                        if (nodelist[i].hasAttribute(selector.split("=")[0].slice(1)) == true&& nodelist[i].getAttribute(selector.split("=")[0].slice(1)) == selector.split("=")[1].slice(0, selector.split("=")[1].length-1)) {
                            node = nodelist[i];
                        }
                        recursion(selector, nodelist[i]);
                    }
                }

            }

        } else if (att.test(selector)&& node == null) {
            if(element.hasChildNodes()) {
                var nodelist = element.childNodes;
                for (var i in nodelist) {
                    if (nodelist[i].nodeType == 1) {
                        if (nodelist[i].hasAttribute(selector.toString().slice(1, selector.length-1)) == true) {
                            node = nodelist[i];
                        }
                        recursion(selector, nodelist[i]);
                    }
                }

            }
        }
        if (selector.split(" ")[1] != null) {
            recursion(selector.split(" ")[0], document)
            var fNode = node;
            node = null;
            if(fNode != null) {
                recursion(selector.split(" ")[1], fNode);
            }
        }
    }
    recursion(selector, document.body);
    return node;
}


function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    }else if(element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }else {
        element["on" + event] = listener;
    }

}


function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }else if(element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }else {
        element["on" + event] = null;
    }
}

function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}


function addEnterEvent(element, listener) {
    if(element.addEventListener) {
        element.addEventListener("keydown", function (event) {
            if(event.keyCode == 13)
                listener();
        })
    }else if(element.attachEvent) {
        element.attachEvent("onkeydown", function () {
            if(window.event.keyCode == 13)
                listener();
        })
    }else {
        element["onkeydown"] = function (event) {
            if(event.keyCode == 13)
                listener();
        }
    }

}

$.on = function (element, event, listener) {
    addEvent($(element), event, listener);
};
$.un = function (element, event, listener) {
    removeEvent($(element), event, listener);
};
$.click = function (element, listener) {
    addClickEvent($(element), listener);
};
$.enter = function (element, listener) {
    addEnterEvent($(element), listener);
};
$.delegate = function (selector, tag, event, listener) {
    $(selector).addEventListener(event, function (e) {
        if(e.target&&e.target.nodeName == tag){
            listener(e);
        }
    })
}


function isIE() {
    return ("ActiveXObject" in window);
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    //将过期天数转换为过期的日期
    var cookieDate = new Date();
    cookieDate.setDate(cookieDate.getDate() + expiredays);
    document.cookie = cookieName + "=" + cookieValue +
        ((expiredays == null)? "" : ";expries=" + cookieDate.toUTCString());
}
setCookie("Developer", "sawCao", 2);
// 获取cookie值
function getCookie(cookieName) {
        if(document.cookie.length > 0) {
        cookieStart = document.cookie.indexOf(cookieName + "=");
        if(cookieStart != 1) {
            cookieStart += cookieName.length + 1;
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if(cookieEnd == -1)//判断是否存在cookie属性值
                cookieEnd = document.cookie.length;
            return document.cookie.substring(cookieStart, cookieEnd);
        }
    }
    return "";
}
console.log(getCookie("Developer"));



// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
/*options是一个对象，里面可以包括的参数为：
    type: post或者get，可以有一个默认值
    data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
    onsuccess: 成功时的调用函数
    onfail: 失败时的调用函数*/
function ajax(url, options) {
    var xmlHttp = new XMLHttpRequest();
    //成功与否判断
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState == 4)
            if(xmlHttp.status == 200) {
                options.onsuccess(xmlHttp.responseText );
                }else if(options.onfail) {
                     options.onfail();
            }
    }
    //发送数据类型判断
    if(options.data) {
        if(typeof options.data == "object") {
            url += "?";
            for (var i in options.data) {
                url += i + "=" + options.data[i] + "&";
            }
            url = url.substring(0, url.length - 1);
        }else if(typeof options.data == "string") {
            url += options.data;
        }
    }
    xmlHttp.open((options.type == "POST"? "POST" : "GET"), url, true);
    xmlHttp.send();
}

