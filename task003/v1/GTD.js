/**
 * Created by icmonkeypc on 2017/2/19.
 */

var now_tasksort = $('#task_sort');
var editORadd = true;
var now_task = $('#tasksort_time');
var taskli = $('#task_sort').children;
var now_tasktime;//当前选定的子分类
var now_tasknode;
var tasktype_array = new Array();//当前任务分类下的具体任务分类数组
var now_taskdetailed_data;//当前选任务的日期
var now_taskdetailed_title;//当前选任务的标题
var task_subclasses_unfolded = [];//当前任务分类是否展开
var task_subclasses_exist = [];//当前任务分类是否存在，判断是否需要向其添加子元素
var task_subclasses_new = [];//当前任务分类是否有更新

if(!localStorage.hasOwnProperty('task')) {//判断localstorage是否有task的数据
    localStorage.setItem('task', JSON.stringify(taskl));
}
var task = JSON.parse(localStorage.getItem('task'));

function ini() {//进行任务分类的初始化
    for(var i in task.tasksort) {
        var node_1 = document.createElement('li');
        node_1.innerHTML = task.tasksort[i] + " (" + task.tasksort_type[task.tasksort[i]].length + ")";
        var deleteimg = document.createElement('img');
        deleteimg.src = "img/ic_close_black_18dp_1x.png";
        deleteimg.className = "deleteimg";
        node_1.appendChild(deleteimg);
        $('#task_sort').appendChild(node_1);
    }

};
ini();
var tasktype = $('#task_sort');
addClickEvent($('#add_tasksort'), function () {//绑定添加分类
    var tasktype_name = prompt("请输入你想要添加的分类名称：");
    task.tasksort_type[taskli[now_tasksort].innerText.split(' ')[0]].push(tasktype_name);
    task.tasksort_time[tasktype_name] = {};
    localStorage.setItem('task', JSON.stringify(task));
    task_subclasses_unfolded[now_tasksort] = false;
    task_subclasses_exist[now_tasksort] = false;
    task_subclasses_new[now_tasksort] = true;
    sortList(now_tasksort);
    typeList();
    taskList(now_tasksort);
    task_subclasses_exist[now_tasksort] = true;
});
addClickEvent($('#add_task'), function () {//绑定添加任务
    $('#taskdetailed').style.display = "none";
    $('#taskappend').style.display = "block";
});
addClickEvent($('#task_edit'),function () {//绑定任务信息修改
    $('#taskdetailed').style.display = "none";
    $('#taskappend').style.display = "block";
    delete task.tasksort_time[now_tasktime][now_taskdetailed_data][now_taskdetailed_title];
});
addClickEvent($('#tasksubmit'), function () {//绑定任务信息修改界面提交
    var time = $('#datainput').value;
    var title = $('#titleinput').value;
    var addtask = ['unachieve'];
    addtask.push($('#ta').value);
    if(editORadd) {//默认为添加任务
        if(now_task.hasChildNodes()) {
            for (var i in now_task.children) {
                var contrastTime = now_task.children[i].innerText.split(' ')[0];
                if (contrastTime == time) {
                    task.tasksort_time[now_tasktime][time][title] = addtask;
                    $('#taskdetailed').style.display = "block";
                    $('#taskappend').style.display = "none";
                    alert("添加成功！")
                    break;
                } else {
                    task.tasksort_time[now_tasktime][time] = {};
                    task.tasksort_time[now_tasktime][time][title] = addtask;
                    $('#taskdetailed').style.display = "block";
                    $('#taskappend').style.display = "none";
                    break;
                }
            }
        }else {
            task.tasksort_time[now_tasktime][time] = {};
            task.tasksort_time[now_tasktime][time][title] = addtask;
            $('#taskdetailed').style.display = "block";
            $('#taskappend').style.display = "none";
        }
    }
    while($('#tasksort_time').hasChildNodes()) {
        $('#tasksort_time').removeChild($('#tasksort_time').firstChild);
    }
    for(var i in task.tasksort_time) {
        if(i == now_tasktime) {
            for(var l in task.tasksort_time[i]) {
                var node_1 = document.createElement('li');
                var node_ul = document.createElement('ul');
                node_1.innerHTML = l;
                for(var k in task.tasksort_time[i][l]) {
                    var node_2 = document.createElement('li');
                    node_2.innerHTML = k;
                    node_ul.appendChild(node_2);
                }
                node_1.appendChild(node_ul);
                $('#tasksort_time').appendChild(node_1);
            }
            num = i;
            clicktask();
            chooseStatus(num);
        }

    }

});
addClickEvent($('#task_achieve'), function () {
    task.tasksort_time[now_tasktime][now_taskdetailed_data][now_taskdetailed_title][0] = "achieve";
});
addClickEvent($('#taskquie'), function () {
    $('#taskdetailed').style.display = "block";
    $('#taskappend').style.display = "none";
});
for(var i in $('.deleteimg')) {
    function sss() {
        console.log(i);
    }
    sss();
    addClickEvent($('.deleteimg')[i], function () {
        var delete_taskName = this.parentNode.innerText.split(" ")[0];
        if(delete_taskName == "默认任务"){
            alert("默认任务不可删除！！！");
        }else {
            var YN = confirm("是否删除该分类：" + delete_taskName);
            if (YN == true) {
                for (var i in task.tasksort) {
                    if (task.tasksort[i] == delete_taskName) {
                        delete task.tasksort[i];
                    }
                }
                for (var i in task.tasksort_type[delete_taskName]) {
                    for (var ii in task.tasksort_time) {
                        if (ii == i) {
                            delete task.tasksort_time[ii];
                        }
                    }
                }
                delete task.tasksort_type[delete_taskName];
                $('#task_sort').removeChild(this.parentNode);
                while ($('#tasksort_time').hasChildNodes()) {
                    $('#tasksort_time').removeChild($('#tasksort_time').firstChild);
                }
            }
        }
    });
}
function ini_alltask() {
    for(var i in taskli) {
        var tasksort_close = function (numh) {
            task_subclasses_unfolded[numh] = false;
            task_subclasses_exist[numh] = false;
            task_subclasses_new[numh] = false;
            return function () {
                sortList(numh);
                num = i;
                typeList();
                taskList(numh);
            }
        }
        addClickEvent(taskli[i], tasksort_close(i));
    };
}
ini_alltask();
function sortList(numh) {
    if(!task_subclasses_unfolded[numh] && !task_subclasses_exist[numh] && !task_subclasses_new[numh]) {
        for (var tasktype in task.tasksort_type) {//任务分类下任务
            var ul = document.createElement('ul');
            if (taskli[numh].innerText.split(' ')[0] == tasktype) {
                now_tasksort = numh;//设定当前选中的分类
                for (var tasktype_sort in task.tasksort_type[tasktype]) {
                    var li = document.createElement('li');
                    var thistasktype = task.tasksort_type[tasktype][tasktype_sort];
                    var thislength = 0;
                    for(var len in task.tasksort_time[thistasktype]) {
                        thislength += Object.keys(task.tasksort_time[thistasktype][len]).length;
                    }
                    li.innerHTML = thistasktype + " (" + thislength + ")";
                    ul.appendChild(li);
                }
                taskli[numh].appendChild(ul);
                task_subclasses_unfolded[numh] = true;
                task_subclasses_exist[numh] = true;
                break;
            }
        }
    }else if(task_subclasses_new[numh]) {
        var li = document.createElement('li');
        li.innerHTML = task.tasksort_type[taskli[now_tasksort].innerHTML.split(' ')[0]][task.tasksort_type[taskli[now_tasksort].innerHTML.split(' ')[0]].length - 1]+ " (0)";
        taskli[numh].lastElementChild.appendChild(li);
        task_subclasses_new[numh] = false;
    }else if(task_subclasses_exist[numh] && !task_subclasses_unfolded[numh]) {
        taskli[numh].children[1].style.display = "block";
        task_subclasses_unfolded[numh] = true;
    }else if(task_subclasses_unfolded[numh]) {
        taskli[numh].children[1].style.display = "none";
        task_subclasses_unfolded[numh] =  false;
    }
}
function typeList() {
    for(var i in taskli) {//时间任务栏
        if(taskli[i].nodeName == 'LI') {
            var tasklii = taskli[i];
            if(tasklii.childElementCount != 0) {
                for (var sort in taskli[i].lastElementChild.children) {
                    if (tasklii.lastElementChild.children[sort].nodeName == 'LI') {
                        tasktype_array.push(tasklii.lastElementChild.children[sort]);
                    }
                }
            }
        }
    }
}
function taskList(num_2) {
    $('#alltask').style.backgroundColor = 'white';
    for(var i in tasktype_array) {//任务子分类详情
        var tasksort_time_close = function (numh) {
            return function () {
                task_subclasses_unfolded[num_2] = true;
                task_subclasses_exist[num_2] = true;
                sortList(num_2);
                for(var k in tasktype_array) {
                    tasktype_array[k].style.backgroundColor = "azure";
                }
                tasktype_array[numh].style.backgroundColor = "white";
                while($('#tasksort_time').hasChildNodes()) {
                    $('#tasksort_time').removeChild($('#tasksort_time').firstChild);
                }
                for(var i in task.tasksort_time) {
                    if(i == tasktype_array[numh].innerHTML.toString().split(' ')[0]) {
                        for(var l in task.tasksort_time[i]) {
                            var node_1 = document.createElement('li');
                            var node_ul = document.createElement('ul');
                            node_1.innerHTML = l;
                            for(var k in task.tasksort_time[i][l]) {
                                var node_2 = document.createElement('li');
                                node_2.innerHTML = k;
                                node_ul.appendChild(node_2);
                            }
                            node_1.appendChild(node_ul);
                            $('#tasksort_time').appendChild(node_1);
                        }
                        num = i;
                        now_tasktime = num;
                        clicktask();
                        chooseStatus(num);
                    }

                }


            }
        }
        addClickEvent(tasktype_array[i], tasksort_time_close(i));
    }
}
function clicktask() {
    var detailed_close = function (num, date, taskName) {
        return function () {
            $('#task_name').innerHTML = taskName;
            $('#task_time').innerHTML = '<p>日期：'+date+'</p>';
            $('#task_detailed').innerHTML = task.tasksort_time[num][date][taskName][1];
            now_tasktime = num;
            now_taskdetailed_data = date;
            now_taskdetailed_title = taskName;
            now_tasknode = this;
        }
    }
    for(var date in $('#tasksort_time').children) {
        var datetask = $('#tasksort_time').children[date];
        if(datetask.nodeName == 'LI' && datetask.hasChildNodes()) {
            for(var taskName in datetask.children) {
                if(datetask.children[taskName].nodeName == "UL") {
                    var datetask_li = datetask.children[taskName];
                    for(var tasktodo in datetask_li.children) {
                        addClickEvent(datetask_li.children[tasktodo], detailed_close(num, datetask.childNodes[0].data, datetask_li.children[tasktodo].innerHTML))
                    }
                }

            }
        }
    }
};

function chooseStatus(num) {
    var choosemethod = function (status) {
        return function () {
            $('#alltask').style.backgroundColor = 'azure';
            $('#achieve').style.backgroundColor = 'azure';
            $('#unachieve').style.backgroundColor = 'azure';
            $('#'+status).style.backgroundColor = 'white';
            for (var date in $('#tasksort_time').children) {
                var datetask = $('#tasksort_time').children[date];
                if (datetask.nodeName == 'LI' && datetask.hasChildNodes()) {
                    for (var taskName in datetask.children) {
                        if (datetask.children[taskName].nodeName == "UL") {
                            var datetask_li = datetask.children[taskName];
                            var length = datetask_li.childElementCount;
                            for (var tasktodo in datetask_li.children) {
                                if(datetask_li.children[tasktodo].nodeName == 'LI') {
                                    if (datetask_li.children[tasktodo].nodeName == 'LI' && task.tasksort_time[num][datetask.childNodes[0].data][datetask_li.children[tasktodo].innerHTML][0] == status) {
                                        datetask_li.children[tasktodo].style.display = "none";
                                        length--;
                                        if (length == 0) {
                                            datetask.style.display = "none";
                                        }
                                    } else {
                                        datetask_li.children[tasktodo].style.display = "list-item";
                                        datetask.style.display = "block";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    addClickEvent($('#achieve'), choosemethod('achieve'));
    addClickEvent($('#unachieve'), choosemethod('unachieve'));
}
