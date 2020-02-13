// ==UserScript==
// @name         慕课小助手
// @namespace    https://github.com/maomao1996/tampermonkey-scripts
// @version      0.1.0
// @description  慕课网问答区快速查看问答详情
// @author       maomao1996
// @include      *://coding.imooc.com/learn/qa/*
// @grant        none
// @require		   https://cdn.jsdelivr.net/npm/jquery@v3.4.1
// ==/UserScript==
;
(function () {
    'use strict';
    function addStyle(rules) {
        $('head').append("<style>" + rules + "</style>");
    }
    // 重置样式
    addStyle("\n  .mm-modal {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1996;\n    display: none;\n    overflow-y: auto;\n  }\n  .mm-mask {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1;\n    background-color: rgba(0, 0, 0, 0.5);\n  }\n  .mm-modal-x {\n    position: absolute;\n    left: 50%;\n    top: 20%;\n    z-index: 2;\n    padding-top: 10px;\n    padding-bottom: 20px;\n    width: 800px;\n    background: #fff;\n    transform: translateX(-50%);\n  }\n  .wrap,\n  #new_header .new-header,\n  .wenda-top-intro-box .wenda-top-intro-wrap {\n    width: 100%!important;\n  }\n  .layout .col-aside.wenda-col-aside,\n  .mm-model .elevator,\n  .mm-modal #footer {\n    display: none!important;\n  }\n  .mm-modal .layout {\n    padding: 0;\n  }\n");
    // 获取按钮 html
    function getBntHtml(id) {
        return ('<a class="mm-btn" href="javascript:void(0)" data-id="' +
            id +
            '">查看详情</a>');
    }
    // 插入弹窗 dom
    function appendModal() {
        var modalHtml = "<div class=\"mm-modal\" id=\"mm-modal\"><div class=\"mm-mask\"></div><div class=\"mm-modal-x\" id=\"mm-content\"></div></div>";
        $('body').append(modalHtml);
    }
    // 点击事件
    function handleClick() {
        var id = $(this).data('id');
        $.ajax({
            type: 'get',
            url: "http://coding.imooc.com/learn/questiondetail/" + id + ".html",
            dataType: 'html',
            success: function (html) {
                $('#mm-modal').show();
                $('#mm-content').html(html);
            }
        });
    }
    // 初始化操作
    window.onload = function () {
        $('.qa-item-title').each(function () {
            var id = $(this)
                .find('a')
                .attr('href')
                .replace(/\D/g, '');
            $(this).append(getBntHtml(id));
        });
        appendModal();
        $(document).on('click', '.mm-mask', function () {
            $('#mm-modal').hide();
        });
        $('#qa-list').on('click', '.mm-btn', handleClick);
    };
})();