var message = document.getElementById("message");
var content = document.querySelector('.content');
var sendBtn = document.getElementById('send');
message.onkeydown = function (e) {
    var value = message.value;
    // 如果按下的键是enter则发送数据
    if (e.keyCode === 13) {
        // 判断当前输入框是否有信息
        if (value) {
            renderMessage('mine', value);
            this.value = "";
            sendMessage(value);
        }
    }
}

sendBtn.onclick = function () {
    if (message.value) {
        renderMessage('mine', message.value);
        message.value = "";
        sendMessage(message.value);
    }
}

// 发出网络请求
function sendMessage (text) {
    ajax({
        method: 'get',
        url: "https://developer.duyiedu.com/edu/turing/chat",
        data: "text="+text,
        success: function (data) {
            renderMessage('robot', data.text);
        }
    });
}

// 渲染信息 who:谁说的  text：内容
function renderMessage(who, text) {
    var dom = document.createElement('div');
    var img = new Image();
    var textDom = document.createElement('div');
    textDom.innerText = text;
    img.className = 'avator';
    textDom.className = 'text';
    dom.className = who;
    if (who === 'mine') {
        img.src = "./img/dog1.jpg";
    } else {
        img.src = "./img/3.png";
    }
    dom.appendChild(img);
    dom.appendChild(textDom);
    content.appendChild(dom);
    //scrollHeight 代表的是当前内容区在没有滚动条的时候 里面元素撑开的大小
    //clientHeight 代表当前内容区视口的高度
    content.scrollTo(0, content.scrollHeight - content.clientHeight);
}