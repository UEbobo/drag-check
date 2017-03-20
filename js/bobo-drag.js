// JavaScript Document
(function($) {
    $.fn.drag = function(options) {

        //默认配置
        var defaults = {};

        var GLOBAL = {
            X: 0, //鼠标按下时候的x轴的位置
            MAX_WIDTH: this.width() - this.find('.drag-btn').width(),
            DRAG_FLAG: false // 记录是否可以将其拖动
        };

        var opts = $.extend({}, defaults, options);

        // jquery链式操作
        this.each(function(i) {
            var that = $(this),
                btnNo = that.find('.drag-btn'),
                dragOk = that.find('.drag-ok');

            // 注册鼠标按下事件
            btnNo.on('mousedown', function(e) {
                e.stopPropagation();
                GLOBAL.X = e.pageX - parseInt(btnNo.css('left'), 10);
                GLOBAL.DRAG_FLAG = true;

            });

            // 注册鼠标滑动事件
            btnNo.on('mousemove', function(e) {
                e.stopPropagation();
                var canX = e.pageX - GLOBAL.X;
                if (GLOBAL.DRAG_FLAG) {
                    if (canX > 0 && canX <= GLOBAL.MAX_WIDTH) {
                        dragOk.css({
                            'width': canX
                        });
                        btnNo.css({
                            'left': canX
                        })
                    } else if (canX > GLOBAL.MAX_WIDTH) { //鼠标指针移动距离达到最大时清空事件
                        clearEvent();
                    }
                }
            });

            // 注册鼠标松开事件
            btnNo.on('mouseup', function(e) {
                e.stopPropagation();
                GLOBAL.DRAG_FLAG = false;
                var canX = e.pageX - GLOBAL.X;
                if (canX < GLOBAL.MAX_WIDTH) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                    dragOk.css({
                        'width': 0
                    });
                    btnNo.css({
                        'left': 0
                    })
                };
            });

            // 清除事件
            function clearEvent() {
                GLOBAL.DRAG_FLAG = false;
                btnNo.off('mousedown');
                btnNo.off('mousemove');
                btnNo.off('mouseup');
                that.find('.drag-ok').text('验证成功！');
                that.find('.drag-no').text('');
            };

        });

    };

})(jQuery);
