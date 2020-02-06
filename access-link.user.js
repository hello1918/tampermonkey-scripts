// ==UserScript==
// @name         跳转链接修复
// @namespace    https://github.com/maomao1996/access-link
// @version      0.2.0
// @description  为知乎、微信拦截页面增加跳转按钮（支持3秒后自动跳转）
// @author       maomao1996
// @include      *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/*
// @include      *://support.weixin.qq.com/cgi-bin/mmsupport-bin/*
// @include      *://link.zhihu.com/*
// @grant        none
// @require		 https://cdn.jsdelivr.net/npm/jquery@v3.4.1
// ==/UserScript==
;(function() {
  'use strict'
  function getQueryStringArgs(url) {
    if (url && url.indexOf('?') > -1) {
      var arr = url.split('?')
      var qs = arr[1]
      var args = {}
      var items = qs.length ? qs.split('&') : []
      for (var i = 0; i < items.length; i++) {
        var item = items[i].split('=')
        var key = decodeURIComponent(item[0])
        var value = decodeURIComponent(item[1])
        if (key.length) {
          args[key] = value
        }
      }
      return args
    }
    return {}
  }
  var params = getQueryStringArgs(location.search)
  var target = ''
  var url = ''
  function initParams(u, t) {
    url = u
    target = t
    return "<a href='" + u + "'>继续访问 - mm (3 秒后自动跳转)<a/>"
  }
  var fns = {
    'weixin110.qq.com': function() {
      return (
        "<div class='weui-msg__text-area weui-btn-area weui-btn weui-btn_plain-primary'>" +
        initParams(params.url, '.weui-msg') +
        '</div>'
      )
    },
    'support.weixin.qq.com': function() {
      return initParams(params.url, '#url')
    },
    'link.zhihu.com': function() {
      return initParams(params.target, '.link')
    }
  }
  var fn = fns[location.hostname]
  var html = typeof fn === 'function' ? fn() : ''
  if (target && html && url) {
    $(target).after(html)
    setTimeout(function() {
      location.href = url
    }, 3000)
  }
})()
