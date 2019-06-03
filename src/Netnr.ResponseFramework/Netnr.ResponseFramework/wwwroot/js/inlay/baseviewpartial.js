﻿//新增
z.button("add", function () {
    //重置
    z.FormRequired('reset');
    //清空
    z.FormClear();
});

//编辑
z.button("edit", function () {
    //重置
    z.FormRequired('reset');
    //清空
    z.FormClear();
});

//查看
z.button("see", function () {
    z.FormRequired('reset');
});

//批处理
z.button("batch", function () {
    z.batchButtonSwitch();
});

//关闭批处理
z.button("batch_close", function () {
    z.batchButtonSwitch();
});

//批处理按钮切换
z.batchButtonSwitch = function (isopen) {
    if (arguments.length == 0) {
        z.batchControlStatus = isopen = !(z.batchControlStatus || false);
    }
    $('#BtnMenu').children().each(function () {
        var that = $(this);
        if (this.nodeName != "BUTTON") {
            that = $(this).children();
        }
        if (this.id.toLowerCase().indexOf("batch_") >= 0) {
            if (isopen) {
                that.removeClass('hidden');
            } else {
                that.addClass('hidden');
            }
        } else {
            if ("m_Query m_Reload".indexOf(this.id) == -1) {
                if (isopen) {
                    that.addClass('disabled')
                } else {
                    that.removeClass('disabled')
                }
            }
        }
    });
    if (isopen) {
        $('#m_Batch').addClass('hidden');
    } else {
        $('#m_Batch').removeClass('hidden');
    }
}

//导出
z.button("export", function () {
    var da = {
        title: document.title
    };

    //导出回调，自定义导出事件
    if (typeof ExportCallBack == "function") {
        if (ExportCallBack(da) == false) {
            return false;
        }
    }

    var mod = z.Modal();
    mod.title = "<i class='fa fa-file-excel-o green'></i><span>导出</span>";

    var htm = [];
    htm.push('<div class="text-center h2">')
    htm.push('<img src="/images/loading.gif" style="vertical-align:sub;" />');
    htm.push('<h3>正在生成文件，请稍等 . . .</h3>');
    htm.push('</div>');

    mod.content = htm.join('');
    mod.showFooter = false;
    mod.append();
    mod.modal.attr('data-backdrop', 'static');
    mod.modal.find('.modal-header').addClass('hidden');
    mod.modal.on('hidden.bs.modal', function () { $('#' + this.id).remove() });
    mod.show();

    $.ajax({
        url: '/io/export?uri=' + z.TableName,
        data: da,
        dataType: 'json',
        success: function (data) {
            var mb = mod.modal.find('.modal-body');
            mod.modal.find('.modal-header').removeClass('hidden');
            if (data.code == 200) {
                mb.html('<h4 class="text-center"><a href="' + data.data + '" ><i class="fa fa-file-excel-o"></i> 点击下载文件</a></h4>');
            } else {
                mb.html('<h4 class="text-center red">' + data.message + '</h4>');
            }
        }
    })
});