//챗봇 연결 js

var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    // $("#disconnect").prop("disabled", !connected);
    // $("#send").prop("disabled", !connected);
    // if (connected) {
    $("#conversation").show();
    // }
    // else {
    //     $("#conversation").hide();
    // }
    $("#msg").html("");
}

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);

        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (message) {
            const messages = message.body.split(['|']);
            for(let i=1; i<messages.length; i++){
                ((x) => {
                    setTimeout(() => {
                        showMessage("받은 메시지: " + messages[i]); //서버에 메시지 전달 후 리턴받는 메시지
                    }, 500*x);
                })(i);
            }
        });
    });

}


function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    let message = $("#msg").val()
    showMessage("보낸 메시지: " + message);

    stompClient.send("/app/sendMessage", {}, JSON.stringify(message)); //서버에 보낼 메시지
}

function showMessage(message) {
    $("#communicate").append("<tr><td>" + message + "</td></tr>");
}



$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#disconnect").click(function () { disconnect(); });
    $("#send").click(function () { sendMessage(); });
    $("#connect").click(function () {
        connect();
        basicmessage();
    });
});



// 질문 js


$(document).on("click", ".botcat", (e) => {
    e.stopImmediatePropagation();
    showMessage($(e.target).text());
    $(e.target).parent().remove();
    stompClient.send("/app/sendMessage", {}, JSON.stringify($(e.target).text()));
    cid = e.target.id;
    setTimeout(() => {
        if (cid.includes('qna')) {
            console.log("qna-cat");
            qnabtn();
        } else if (cid.includes('guide')) {
            console.log("guide-cat");
            guidebtn();
        } else if (cid.includes('precautions')) {
            console.log("pre-cat");
            prebtn();
        } else if (cid.includes('import')) {
            console.log("import-cat");
            importbtn();
        } else if (cid.includes('info')) {
            console.log("info-cat");
            infobtn();
        }
    }, 2000);
});

$(document).on("click", ".botbtn", (e) => {
    showMessage($(e.target).text());
    $(e.target).parent().remove();
    stompClient.send("/app/sendMessage", {}, JSON.stringify($(e.target).text()));
    bid = e.target.id;
    setTimeout(() => {
        if (bid.includes('qna')) {
            console.log("qna");
            qnabtn();
        } else if (bid.includes('guide')) {
            console.log("guide");
            guidebtn();
        } else if (bid.includes('precautions')) {
            console.log("pre");
            prebtn();
        } else if (bid.includes('import')) {
            console.log("import");
            importbtn();
        } else if (bid.includes('info')) {
            console.log("info");
            infobtn();
        }
        
    }, 2000);
});

$(document).on("click", "chat", (e) => {
    showMessage($(e.target).text());
    $(e.target).parent().remove();
    $("#communicate").append('<div class="bot chat">' +
        '<button type="button" class="btn btn-default con" id="">상담사 연결</button>' +
        '<button type="button" class="btn btn-default" id="home">이전단계</button>' +
        '</div>')
});

$(document).on("click", "#home", (e) => {
    $(e.target).parent().remove();
    basicmessage();
});
