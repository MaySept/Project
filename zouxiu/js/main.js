/**
 * Created by REN on 2016/9/29.
 */

$(function () {

    //设置动态滚动高度
    window.addEventListener("resize", function () {
        autoBoxHeight();
    });

    function autoBoxHeight() {
        $(".ctBox").css("height", window.innerHeight / calSize - 2.9 + "rem");
        $(".detailBox").css("height", window.innerHeight / calSize - 3.8 + "rem");
        $(".sTBox").css("height", window.innerHeight / calSize - 2.9 + "rem");
        $(".containerMyShow").css("height", window.innerHeight / calSize - 1 + "rem");
    }

    autoBoxHeight();


    function getData(url, dataType, dataObj, callBack) {
        $.ajax({
            url: url,
            method: 'post',
            dataType: dataType,
            data: dataObj,
            success: function (data) {
                callBack && callBack(data);
            },
            error: function (data) {
                console.log("error", data);
            }
        })
    }

    //获取Banner图
    getData("http://datainfo.duapp.com/shopdata/getBanner.php", "jsonp", "", function (data) {
        var sInIMG = document.querySelectorAll(".carouselIMG>img");
        for (var i = 0, j = data.length; i < j; i++) {
            sInIMG[i].src = data[i]["goodsBenUrl"].split(",")[0].slice(2, -1);
        }
    });

    //设置首页物品模板
    function setIndexGoods(src, tit, price, originaPrice, sell, cla) {
        $("<div></div>").addClass("indexGoods").appendTo($(".ctBox"))
            .append($("<img class='indexGoodsIMG'/>").attr("src", src))
            .append(
                $("<div></div>").addClass("indexGoodsRight")
                    .append($("<p class='tit'></p>").text(tit))
                    .append($("<span class='price'></span>").text(price))
                    .append($("<span class='originalPrice'></span>").text(originaPrice))
                    .append($("<span class='sell'></span>").text(sell))
                    .append($("<span class='buy'></span>").attr("goodsClass", cla))
            )
    }

    //获取商品
    getData("http://datainfo.duapp.com/shopdata/getGoods.php", "jsonp", "", function (data) {
        for (var i = 0, j = data.length; i < j; i++) {
            var obj = data[i];
            var src = obj["goodsListImg"], tit = obj["goodsName"], originaPrice = obj["price"],
                sell = obj["discount"], price = sell == 0 ? originaPrice : originaPrice * 1 * (sell * 1) / 10;
            setIndexGoods(src, tit, '￥' + price, '￥' + originaPrice, sell + '折', obj["className"]);
        }

        $(".buy").on("click",function () {
            var src = this.parentNode.parentNode.childNodes[0].src,
                tit = this.parentNode.childNodes[0].innerHTML,
                cla = $(this).attr("goodsclass"),
                price = this.parentNode.childNodes[1].innerHTML;
            setShopGoods(src,tit,cla,price);
            updataPrice();

            $(".numReduce").on("click",function () {
                var num = parseInt(this.parentNode.childNodes[1].innerHTML);
                num--;
                this.parentNode.childNodes[1].innerHTML = num;
                updataPrice();
                if (num ==0) {
                    document.querySelector(".sTBox").removeChild(this.parentNode.parentNode.parentNode);
                }
            })

            $(".numAdd").on("click",function () {
                var num = parseInt(this.parentNode.childNodes[1].innerHTML);
                num++;
                this.parentNode.childNodes[1].innerHTML = num;
                updataPrice();
            })

        })


    });

    //获取分类
    getData("http://datainfo.duapp.com/shopdata/getclass.php", "json", "", function (data) {
        for (var i = 0, j = data.length; i < j; i++) {
            $("<div></div>").addClass("detailedClassification").text(data[i]["className"]).appendTo($(".detailBox"));
        }
    });


    $(".goodsClassifyAll").on("click", function () {
        $(".detailBox").css("display") === "block" ?
            ($(".detailBox").css("display", "none"), $(".goodsClassifyAll").css("background-image", "url('img/arrowRight.png')")) :
            ($(".detailBox").css("display", "block"), $(".goodsClassifyAll").css("background-image", "url('img/arrowDown.png')"));
    })

    //登录
    $(".btnLogin").on("click", function () {

        getData("http://datainfo.duapp.com/shopdata/userinfo.php", "json", {
            status: "login",
            userID: $("#loginID").val(),
            password: $("#loginPW").val()
        }, function (data) {
            if(data==2) {
                alert("用户名密码错误！");
                return;
            }
            if (data==0) {
                alert("用户名不存在！");
                return;
            }
            if ($("#check").hasClass("on")) {
                localStorage.loginID = $("#loginID").val();
                localStorage.loginPW = $("#loginPW").val();
            }
            alert("登录成功！");
            $("#loginID").val("");
            $("#loginPW").val("");
            $(".nickname").text(data["userID"]);
            $(".avatar").attr("src", "img/tx.jpg");
            $(".userInfo .toLogin").text("注销");
            $(".loginOrExit").text("退出登录");
            gotoPage(myShowSwiper, 0);
        })

    });

    $("#loginID").on("input",function () {
        var id = $(this).val();
        $("#loginPW").val("");
        if ($("#check").hasClass("on") && localStorage.loginID) {
            localStorage.loginID == id && $("#loginPW").val(localStorage.loginPW);
        }
    })

    $("#check").on("click",function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            localStorage.removeItem("loginID");
            localStorage.removeItem("loginPW");
        }else {
            $(this).addClass("on");
        }
    })

    //注册
    $("#btnRegister").on("click", function () {

        if (!$("#registerID").val()) {
            alert("用户名不能为空！");
            return;
        }
        if (!$("#registerPW").val() || !$("#registerPW2").val()) {
            alert("密码不能为空！");
            return;
        }
        if ($("#registerPW").val() != $("#registerPW2").val()) {
            alert("两次密码不一致！");
            return;
        }

        getData("http://datainfo.duapp.com/shopdata/userinfo.php", "", {
            status: "register",
            userID: $("#registerID").val(),
            password: $("#registerPW").val()
        }, function (data) {
            if (data == 0) {
                alert("用户名已存在！");
                return;
            }
            if (data == 2) {
                alert("未知错误，请重新注册！");
                return;
            }
            if (data == 1) {
                alert("注册成功，请登录！");
                $("#loginID").val($("#registerID").val());
                $("#registerID").val("");
                $("#registerPW").val("");
                $("#registerPW2").val("");
                gotoPage(myShowSwiper, 1);
            }


        })

    })

    //购物车
    function setShopGoods(src,tit,cla,price) {
        $("<div></div>").addClass("shopBagGoods").appendTo($(".sTBox"))
            .append(
                $("<div></div>").addClass("shopIMG")
                    .append($("<img/>").attr("src", src))
            )
            .append(
                $("<div></div>").addClass("shopInfo")
                    .append($("<p></p>").text(tit))
                    .append($("<p></p>").text(cla))
                    .append($("<p>单价：</p>").append($("<span></span>").addClass("shopPrice").text(price)))
                    .append(
                        $("<p></p>")
                            .append("<span class='numReduce'>-</span>")
                            .append("<span class='shopNum'>1</span>")
                            .append("<span class='numAdd'>+</span>")
                    )
            )
    }

    function updataPrice() {
        var p = document.querySelectorAll(".shopPrice");
        var n = document.querySelectorAll(".shopNum");
        var totalPrice = 0;
        for (var i=0,j=p.length;i<j;i++) {
            var price = p[i].innerHTML.slice(1)*1;
            var num = parseInt(n[i].innerHTML);
            totalPrice += price*num;
        }
        $(".totalPrice").text("￥" + totalPrice);
    }



});