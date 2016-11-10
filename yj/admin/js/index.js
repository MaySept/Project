/**
 * Created by REN on 2016/10/14.
 */

var nu;
function setCheckNum() {
    var str = "";
    for (var i = 0; i < 4; i++) {
        str += Math.floor(Math.random() * 10);
    }
    nu = str;
    $("#checkCode").text(str);
}

setCheckNum();

$("#checkCode").on("click", function () {
    setCheckNum();
});

$(".button").on("click", function (e) {
    e.preventDefault();

    var id = $("#username").val();
    var pw = $("#password").val();
    var num = $("#verify").val();

    if (!id) {
        alert("请输入管理员姓名！");
        return;
    }
    if (!pw) {
        alert("请输入管理员密码！");
        return;
    }
    if (!num || num != nu) {
        alert("请填写正确的验证码！");
        return;
    }

    var info = {
        'username': id,
        'password': pw
    };

    $.ajax({
        url:"http://nbptznjj.iego.cn/mybatisForSpring3/LoginUserController.do",
        type:'POST',
        dataType:'json',
        contentType:"application/json",
        data:JSON.stringify(info),
        success:function (data) {
            if (data.length !=0) {
                if (data.result == -1) {
                    alert("用户名密码不匹配！");
                    setCheckNum();
                    return;
                }
                sessionStorage.login = "true";
                sessionStorage.username = data[0]["username"];
                sessionStorage.power = data[0]["power"];
                top.location = "admin_index.html";
            }else {
                alert("服务器异常，请重试！");
                setCheckNum();
            }
        },
        error:function (err) {
            alert("连接失败，请重试！");
            console.warn(err);
        }
    })

})
