/**
 * 封装ajax
 * ajax主要用途：数据交互/网络通信
 * 参数：
 *      1. method：请求方式
 *      2. url：请求地址
 *      3. data：请求参数（数据）
 *      4. isAsync：是否异步
 *      5. success：成功拿到数据的回调函数
 *      6. error：失败的回调函数
 */

/**
 * @param{Object} options
 * @description 封装一个ajax函数 使所有的网络请求都用该函数
 * 
 * 当前函数的局限性：data必须为字符串，method只能是GET和POST
 */
function ajax(options) {
    var method = options.method || 'GET';
    var url = options.url || "";
    var data = options.data || "";
    var isAsync = options.isAsync == undefined ? true : options.isAsync;
    var success = options.success || function () {};
    var error = options.error || function () {};

    //xhr兼容IE8之前
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return alert("该浏览器不支持XMLHttpRequest");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //接收到数据之后的处理
                success(JSON.parse(xhr.responseText));
            }
        }
    }
    // 当前请求出现问题了就会触发
    xhr.onerror = function (e) {
        error(e);
    }

    //统一将用户传递过来的请求方式转换为大写
    method = method.toUpperCase();
    
    if (method == 'GET') {
        //代表地址里面可能含有数据
        if (url.indexOf('?') > -1) {
            //判断问号的位置是否再最后，如果是则直接拼接，否则证明有数据
            if (url.indexOf('?') === url.length - 1) {
                url += data;
            } else {
                url += '&' + data;
            }
        } else {
            //地址当中没有数据
            url += '?' + data;
        }
        xhr.open(method, url, isAsync);
        xhr.send();
    } else {
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
        xhr.send(data);
    }
}