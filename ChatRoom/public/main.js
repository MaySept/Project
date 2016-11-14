
(function () {

    var socket = io(location.origin);

    var chatOut = document.querySelector("#ta-chat-out");
    var chatInputForm = document.querySelector("#form-chat-input");
    var myCanvas = document.querySelector("canvas");
    var btn = document.querySelector("#btn");
    var btn2 = document.querySelector("#btn2");
    var context= myCanvas.getContext("2d");
    var play=false;var pic;
    context.beginPath();
    myCanvas.addEventListener("mousedown",function () {
        localStorage.clear();
        play=true;
        var X = event.pageX-this.offsetLeft;
        var Y = event.pageY-this.offsetTop;
        context.moveTo(X,Y);
    });
    myCanvas.addEventListener("mousemove",function () {
        var X1 = event.pageX-this.offsetLeft;
        var Y1 = event.pageY-this.offsetTop;
        if(play){
            context.lineTo(X1,Y1);
            context.strokeStyle="red";
            context.stroke()
        }

    });
    myCanvas.addEventListener("mouseup",function () {
        play=false
    });

    btn.onclick=function () {
        var image=new Image();
        var imgAsDataURL =  myCanvas.toDataURL("image/png");
        localStorage.setItem("img",imgAsDataURL);



    };

    window.onload=function () {
        var canvas=document.querySelector("#myCanvas");
        var context=canvas.getContext("2d");
        pic=new Image();
        pic.src=localStorage.getItem('img');
        context.drawImage(pic,0,0);

    };

    btn2.onclick=function () {
        context.clearRect(0, 0, 500, 500);
        localStorage.clear();
    };

    chatInputForm.addEventListener("submit", function (e) {
        e.preventDefault();

        socket.emit("chat", {
            name: this['name'].value,
            message: this['chat-input'].value,
            pic:pic
        });

        this['chat-input'].value = "";
    });

    socket.on("chat", function (data) {
        chatOut.innerHTML += data.name + ":\n" + data.message + "\n";
        chatOut.scrollTop = chatOut.scrollHeight;
        var canvas=document.querySelector("#myCanvas");
        var context=canvas.getContext("2d");
        pic=new Image();
        pic.src=localStorage.getItem('img');
        context.drawImage(pic,0,0);
    });

})();