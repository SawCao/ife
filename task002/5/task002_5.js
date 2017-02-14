/**
 * Created by icmonkeypc on 2017/2/14.
 */
$(document).ready(function () {
    var dnd = {
        // 初始化
        init: function () {
            var me = this;
            me.src = $('.panel-item');
            me.panelList = $('.con');

            // 为拖拽源监听dragstart,设置关联数据
            me.src.each(function () {
                $(this)[0].addEventListener('dragstart', function (e) {
                    e.dataTransfer.setData('text/plain', $(this)[0].getAttribute("id"));
                }, false);
            })

            // 拖拽鼠标移入元素,在拖放目标上设置视觉反馈
            me.panelList.each(function () {
                $(this)[0].addEventListener('dragenter', function (e) {
                    if (e.target.classList.contains('con')) {
                        e.target.classList.add('in');
                    }
                }, false);
            })

            // 取消元素dragover默认行为,使其可拖放
            me.panelList.each(function () {
                $(this)[0].addEventListener('dragover', function (e) {
                    e.preventDefault();
                }, false);
            })

            // 拖拽移出元素,清除视觉反馈
            me.panelList.each(function () {
                $(this)[0].addEventListener('dragleave', function (e) {
                    if (e.target.classList.contains('con')) {
                        e.target.classList.remove('in');
                    }
                }, false);
            })

            // 鼠标释放,在拖放目标上接收数据并处理
            me.panelList.each(function () {
                $(this)[0].addEventListener('drop', function (e) {
                    var id = "#" + e.dataTransfer.getData('text/plain');
                    var src = $(id);
                    var target = e.target;
                    if (target.classList.contains('con')) {
                        target.appendChild(src[0]);
                        target.classList.remove('in');
                    }
                }, false);
            })
        },


    };

    dnd.init();
})