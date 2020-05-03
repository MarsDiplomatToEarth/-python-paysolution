//判断访问终端
var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    //睡眠，非假死
const sleep = (timeountMS) => new Promise((resolve) => { setTimeout(resolve, timeountMS); });
//http get函数，需要加头部
function getjson(link) { return $.ajax({ url: link, async: false }).responseJSON; };

function getnoresponse(link) { return $.ajax({ url: link, async: false }); };

function gettext(link) { return $.ajax({ url: link, async: false }).responseText; };

function getdata(link) { return $.ajax({ url: link, async: false }).responseJSON["data"]; };

//打印在html上
function log(msg) {
    try { document.getElementById("jslog").innerHTML = document.getElementById("jslog").innerHTML + '<div class="">' + msg + '</div>' } catch (err) {};
    console.log(msg)
};
//打印
function lo(msg) { console.log(msg) };
//打印并弹窗
function la(msg) {
    console.log(msg);
    alert(msg);
};
//获取div by id
function ider(iderr) {
    return document.getElementById(iderr);
}
//获取div by class
function classer(cerr) {
    return document.getElementsByClassName(cerr)[0];
}

//改写text
function cte(diver, msg) {
    diver.innerText = msg;
};
//改写html
function cht(diver, msg) {
    diver.innerHTML = msg;
};
//改写textByid
function ctebyid(iderrr, msg) {
    document.getElementById(iderrr).innerText = msg;
};
//改写htmlByHTML
function chtbyid(iderrr, msg) {
    document.getElementById(iderrr).innerHTML = msg;
};
//控制多个div等高
function setshjq(diver1, diver2) {
    diver2.css("height", diver1.outerHeight(true));
    diver2.css("overflow-x", "hidden");
    diver2.css("overflow-y", "scroll");
};
//控制多个div等高,有差值
function setshdrtjq(diver1, diver2, drt) {
    diver2.css("height", diver1.height() + drt);
    diver2.css("overflow-x", "hidden");
    diver2.css("overflow-y", "scroll");
};

function setshdrtjq1(screenht, imght, buttonht, chooseht, xmlconsoleht) {
    xmlconsoleht.css("height", screenht.height() + imght.height() + buttonht.height() - chooseht.outerHeight(true));
    xmlconsoleht.css("overflow-x", "hidden");
    xmlconsoleht.css("overflow-y", "scroll");
};
//控制多个2和1
function setshjq1(diver1, diver2) {
    var m = diver2;
    m.css("height", "auto");
    if (m.height > diver1.height()) {
        m.css("height", "400px");
        m.css("overflow", "scroll");
    }
    diver2.css("height", diver1.height());
};