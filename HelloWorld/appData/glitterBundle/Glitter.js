/*Read only*/
/*Please dont change*/
"use strict";

//頁面切換動畫
class Animator {
    constructor() {
        this.translation = 0;
        this.rotation = 1;
        this.verticalTranslation = 2;
    }
}

//應用類型
class AppearType {
    constructor() {
        this.Web = 0;
        this.Android = 1;
        this.Ios = 2;
    }
}

//Html類型
class HtmlType {
    constructor() {
        this.Page = 0;
        this.Dialog = 1;
        this.Frag = 2;
    }
}

class Glitter {
    constructor() {
        var getUrl = window.location;
        this.baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        //Html類型
        this.htmlType = new HtmlType()
        //轉場動畫
        this.animator = new Animator()
        //設定類型
        this.type = new AppearType().Web
        //現在所有的Iframe
        this.iframe = []
        //現在所有的Frag
        this.ifrag = []
        //現在所有的Dialog
        this.dialog = []
        //存紀錄
        this.setPro = function (tag, data) {
            switch (glitter.type) {
                case appearType.Web: {
                    document.cookie = '' + tag + '=' + data + '; max-age=' + (2592000 * 12 * 10) + '; path=/';
                    break
                }
                case appearType.Android: {
                    window.GL.setPro(tag, data)
                    break
                }
                case appearType.Ios: {
                    break
                }
            }

        }
        //取紀錄
        this.getPro = function (tag) {
            switch (glitter.type) {
                case appearType.Web: {
                    return getCookieByName(tag)
                }
                case appearType.Android: {
                    return window.GL.getPro(tag)
                }
                case appearType.Ios: {
                    break
                }
            }
        }
        //設定某頁面的資料
        this.setPageData = function (tag, objName, value) {
            return window.Jz.setPageData(tag, objName, value)
        }

        //取得某頁面的資料
        this.getPageData = function (tag, data) {
            return window.Jz.getPageData(tag, data)
        }

        //取得MainActivity的資料
        this.getActivityData = function () {
            return JSON.parse(window.Jz.getActivityData())
        }

        //取得MainActivity的資料
        this.setActivityData = function (objName, value) {
            return window.Jz.setActivityData(objName, value)
        }

        //取得現在Html的Tag名稱
        this.getTagName = function () {
            return window.Jz.getTagName()
        }

//Log顯示
        this.logE = function (a, b) {
            window.Jz.logE(a, b);
        }

//設定首頁
        this.setHome = function (url, tag, obj) {
            this.showLoadingView()
            var map = {}
            map.id = tag
            map.obj = obj
            map.goback = true
            glitter.iframe = []
            glitter.iframe = glitter.iframe.concat(map)
            $('#framePlace').empty();
            $('#framePlace').append('<iframe name="' + map.id + '" src="' + this.baseUrl + '/' + url + '?tag=' + tag + '" id="' + tag + '"></iframe>')
        }
        //吐司顯示
        this.toast = function (a) {
            window.Jz.toast(a);
        }
        //設定側滑選單
        this.setNavigation = function (src, obj) {
            glitter.addScript('glitterBundle/NaviGation.js')
            $("#Navigation").html('')
            $("#Navigation").html('<iframe src="' + this.baseUrl + '/' + src + '" style="width: 100%;"></iframe>')
        }
        //顯示加載畫面
        this.showLoadingView = function () {
            $('#loadingView').show()
        }
        //設定加載畫面
        this.setLoadingView = function (link) {
            $('#loadingView').hide()
            $('#loadingView').append('<iframe  src="' + this.baseUrl + '/' + link + '" style="width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, 0.5);"></iframe>')
        }
        //關閉加載畫面
        this.hideLoadingView = function () {
            $('#loadingView').hide()
        }
        //打開側滑選單
        this.openNavigation = function () {
            window.drawer.open();
        }
        //關閉側滑選單
        this.closeNavigation = function () {
            window.drawer.close();
        }
        //開關側滑選單
        this.toggleNavigation = function () {
            window.drawer.toggle();
        }
        //按鈕監聽
        this.keyEventListener = function (obj) {

        }
        //關閉側滑選單
        this.closeNavigation = function () {

            if (this.onclose || $(document.getElementById('navigation')).is(":hidden")) {
                return
            }
            this.onclose = true
            var elem = document.getElementById('navigation');
            $("#navigation").show()
            var ind = 0
            var pos = $('#navigation').width();
            var id = setInterval(frame, 1);

            function frame() {
                if (ind >= pos) {
                    $("#navigation").hide()
                    clearInterval(id);
                    this.onclose = false
                } else {
                    ind += 5;
                    elem.style.transform = 'translateX(-' + ind + 'px)';
                }
            }
        }
        //頁面切換
        this.changePage = function (link, tag, goBack, obj) {
            this.showLoadingView()
            $('#framePlace').append('<iframe name="' + tag + '" src="' + this.baseUrl + '/' + link + '?tag=' + tag + '" id="' + tag + '" style="background-color: white;width: 100vw;height: 100vh;"></iframe>')
            for (var i = 0; i < glitter.iframe.length; i++) {
                console.log(glitter.iframe)
                $('#' + glitter.iframe[i].id).hide()
            }
            document.getElementById(glitter.iframe[glitter.iframe.length - 1].id).contentWindow.lifeCycle.onPause();
            var map = {}
            map.id = tag
            map.obj = obj
            map.goback = goBack
            glitter.iframe = glitter.iframe.concat(map)
        }
        //Fragment切換
        this.changeFrag = function (root, link, tag, obj) {
            root.innerHTML = ''
            var ife = []
            for (var a = 0; a < glitter.ifrag.length; a++) {
                if (glitter.ifrag[a].id !== 'Frag-' + tag) {
                    ife = ife.concat(glitter.ifrag[a])
                }
            }
            glitter.ifrag = ife;
            var map = {}
            map.id = 'Frag-' + tag
            map.obj = obj
            map.goback = false
            glitter.ifrag = glitter.ifrag.concat(map)
            if (link.indexOf('http') !== -1) {
                root.innerHTML = '<iframe name="' + map.id + '" src="' + link + '?tag=' + map.id + '" id="' + map.id + '" style="width: 100%;height: 100%;border-width: 0;"></iframe>'
            } else {
                root.innerHTML = '<iframe name="' + map.id + '" src="' + this.baseUrl + '/' + link + '?tag=' + map.id + '" id="' + map.id + '" style="width: 100%;height: 100%;border-width: 0;"></iframe>'
            }
        }
        //
        //頁面切換與動畫
        this.changePageWithAnimation = function (link, tag, goBack, animator, obj) {
            this.showLoadingView()
            var map = {}
            map.id = tag
            map.obj = obj
            map.goback = goBack
            document.getElementById(glitter.iframe[glitter.iframe.length - 1].id).contentWindow.lifeCycle.onPause();
            glitter.iframe = glitter.iframe.concat(map)
            $('#framePlace').append('<iframe name="' + map.id + '" src="' + this.baseUrl + '/' + link + '?tag=' + tag + '" id="' + tag + '" style="background-color: white;width: 100vw;height: 100vh;"></iframe>')
             if (animator === this.animator.translation) {
                var elem = document.getElementById(tag);
                elem.style.transform = 'translateX(' + $('#' + tag).width() + 'px)'
                var pos = $('#' + tag).width();
                var id = setInterval(frame, 1);

                function frame() {
                    if (pos <= 0) {
                        clearInterval(id);
                        for (var i = 0; i < glitter.iframe.length - 1; i++) {
                            $('#' + glitter.iframe[i].id).hide()
                        }
                    } else {
                        pos -= 10;
                        elem.style.transform = 'translateX(' + pos + 'px)';
                    }
                }
            }
        }

        //顯示Dialog
        this.openDiaLog = function (url, tag, swipe, cancelable, obj) {
            var map = {}
            map.id = 'Dialog-' + tag
            map.obj = obj
            map.cancelable = cancelable
            glitter.dialog = glitter.dialog.concat(map)
            $('#framePlace').append('<iframe name="' + map.id + '" src="' + this.baseUrl + '/' + url + '?tag=' + map.id + '" id="' + map.id + '" style="display: none;"></iframe>')
            var element = document.getElementById(map.id)
            if (!swipe) {
                element.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
            }
            setTimeout("$('#" + map.id + "').show()", 200)
        }

        //關閉所有Dialog
        this.closeDiaLog = function () {
            for (var i = 0; i < glitter.dialog.length; i++) {
                $('#' + glitter.dialog[i].id).remove()
            }
            glitter.dialog = []
        }


        //取得Dialog參數內容
        this.getDialog = function (tag) {
            for (var i = 0; i < this.dialog.length; i++) {
                if (this.dialog[i].id === tag) {
                    return this.dialog[i]
                }
            }
        }

        //關閉特定頁面Dialog
        this.closeDiaLogWithTag = function (tag) {
            console.log(tag)
            var tempArray = []
            for (var i = 0; i < glitter.dialog.length; i++) {
                var id = glitter.dialog[i].id
                if (id === 'Dialog-' + (tag) || id === tag) {
                    $('#' + id).remove()
                } else {
                    tempArray.concat(glitter.dialog[i])
                }
            }
            glitter.dialog = tempArray
        }

        //判斷此頁面為何種類型
        this.getHtmlType = function (tag) {
            for (var i = 0; i < glitter.dialog.length; i++) {
                if (glitter.dialog[i].id === tag) {
                    return this.htmlType.Dialog
                }
            }
            for (var a = 0; a < glitter.iframe.length; a++) {
                if (glitter.iframe[a].id === tag) {
                    return this.htmlType.Page
                }
            }
        }
//取得切換頁面的夾帶資料
        this.getObjectBundle = function (tag) {
            for (var i = 0; i < this.iframe.length; i++) {
                if (this.iframe[i].id === tag) {
                    return this.iframe[i].obj
                }
            }
            for (var i = 0; i < this.ifrag.length; i++) {
                if (this.ifrag[i].id === tag) {
                    return this.ifrag[i].obj
                }
            }
        }
        //顯示上滑Dialog
        this.openBottomSheet = function (url, tag, obj, height, topHandle) {
            var map = {}
            map.id = 'Dialog-' + tag
            map.obj = obj
            $('#country-selector').remove()
            // $('#'+map.id).remove()
            $("body").append('<div id="country-selector" >' +
                '<div class="c-bottom-sheet__scrim ">' +
                '<div class="c-bottom-sheet__sheet">' +
                '<div class="c-bottom-sheet__handle">' + '<span></span>' + '<span></span>' + '</div>' +
                '<div id="c-bottom-sheet__list" class="c-bottom-sheet__list" style="overflow-x: hidden;">' + '<iframe  name="' + map.id + '" src="' + this.baseUrl + '/' + url + '?tag=' + map.id + '" id="' + map.id + '" style="height: 100%"></iframe>' + '</div>' +
                '</div>' +
                '</div>')
            if (topHandle) {
                $('.c-bottom-sheet__handle').show()
            } else {
                $('.c-bottom-sheet__handle').hide()
            }
            $('.c-bottom-sheet__list').css('height', height + 'px')
            try {
                window.bottomSheet = new BottomSheet("country-selector");
                window.bottomSheet.activate()
            } catch (e) {
            }
        }
        //關閉上滑Dialog
        this.closeBottomSheet = function () {
            window.bottomSheet.deactivate()
        }


        //Dialog是否正在顯示
        this.diaIsShowing = function (tag) {
            return window.Jz.diaIsShowing(tag);
        }


        //跳轉至系統特定功能
        this.intent = function (string) {
            window.Jz.intent(string);
        }

        //返回上一頁
        this.goBack = function () {
            var index = 0
            for (var i = 0; i < glitter.iframe.length; i++) {
                var tindex = glitter.iframe.length - i - 1
                if (tindex <= 0) {
                    this.goBackOnRootPage()
                    return;
                }
                if (glitter.iframe[tindex].goback) {
                    index = tindex
                    break
                }
            }
            if (index <= 0) {
                this.goBackOnRootPage()
                return
            }
            console.log("goBack" + index)
            document.getElementById(glitter.iframe[glitter.iframe.length - 1].id).contentWindow.lifeCycle.onDestroy();
            var tag = glitter.iframe[index].id
            $('#' + tag).remove()
            console.log("remove" + tag)
            glitter.iframe.splice(index, 1);
            console.log("show" + glitter.iframe[index - 1].id)
            $('#' + glitter.iframe[index - 1].id).show()
            document.getElementById(glitter.iframe[index - 1].id).contentWindow.lifeCycle.onResume();
        }
        //添加script內容
        this.addScript = function (url) {
            var my_script = document.createElement('script');
            my_script.setAttribute('src', this.baseUrl + '/' + url);
            document.head.appendChild(my_script);
        }
        //添加css
        this.addCss = function (fileName) {

            var head = document.head;
            var link = document.createElement("link");

            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = fileName;

            head.appendChild(link);
        }
        //返回鍵的監聽
        this.onBackPressed = function () {
            this.goBack()
        }
        //設定title Bar
        this.setTitleBar = function (url) {
            $("#titleBar").show()
            $("#titleBar").html('<iframe  src="' + this.baseUrl + '/' + url + '" id="titleBarFrame" style="height:60px;width: 100%;"></iframe>')
            $("#framePlace").css("height", "calc(100vh - 60px)")
        }
        //關閉應用
        this.closeApp = function () {
            console.log("closeApp")
            if (window.GL !== undefined) {
                window.GL.closeApp()
            }
        }
        //當已反回到RootPage時，在按下返回鍵時所需執行的動作
        this.goBackOnRootPage = function () {
        }
    }
}

class LifeCycle {
    constructor(props) {
        this.onResume = function () {
        }
        this.onPause = function () {
        }
        this.onDestroy = function () {
        }
    }
}

//Application生命週期
var lifeCycle = new LifeCycle()
//glitter變數
var glitter = new Glitter()
//glitter變數
var rootGlitter = glitter
//顯示類型
var appearType = new AppearType()
// 監聽鍵盤按鍵事件，並回傳所按的按鍵為何
window.addEventListener('keydown', function (e) {
    var arrat = glitter.dialog
    for (var i = 0; i < arrat.length; i++) {
        if (arrat[i].cancelable) {
            glitter.closeDiaLog(arrat[i].id)
        }
    }
});

function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    for (var i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    return cookieObj;
}


function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}


$(document).ready(function () {
    if (window.GL === undefined) {
        glitter.baseUrl = "../"
        onCreate()
    }
});
