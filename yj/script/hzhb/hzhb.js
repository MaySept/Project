
$(function () {


          var arr=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];


        jQuery.support.cors = true;


    jQuery.support.cors = true;
    $.ajax({
        url: "http://nbptznjj.iego.cn/mybatisForSpring3/QueryPartnerController.do",
        type: 'POST',
        dataType: 'json',
        timeout: 5000,
        contentType: "application/json",
        success: function (data) {
            var i = 0;
            for (i in data) {
                console.log(data[i]);
                $(".HeZuoFen").append("<a class='title'></a>");
                $('.title').eq(i).addClass('title'+i);
                $('.title').eq(i).text(data[i].title);
            }
            $.ajax({
                url: "http://nbptznjj.iego.cn/mybatisForSpring3/QueryAddPartnerController.do",
                type: 'POST',
                dataType: 'json',
                timeout: 5000,
                contentType: "application/json",
                success: function (data) {
                    var i = 0;
                    for (i in data) {
                        arr.push(data[i].picurl);
                        if (data[i].type == "商城实物") {
                            arr2.push(data[i].picurl)
                        } else if (data[i].type == "生活服务") {
                            arr3.push(data[i].picurl)
                        } else if (data[i].type == "物业公司") {
                            arr4.push(data[i].picurl)
                        }
                    }

                },
                error: function (err) {
                    alert("加载失败，请重试！");
                }
            });

        },
        error: function (err) {
            alert("加载失败，请重试！");
        }
    });
    creatDiv(arr);


    function creatDiv(arr) {
        var len = arr.length<25?arr.length:25;
            for(var  i=0;i<len;i++){
                $(".box").append("<a href='hzhb2.html' class='sonDiv'></a>");
                $(".sonDiv").eq(i).append("<img class='image'/>");
                $(".image").eq(i).attr("src",arr[i])
            }
    }


    $(".more").delegate(".data1","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr);
        $(this).html("没有数据了");
        $(this).css("backgroundColor","white")
        console.log(1)
    });
    $(".more").delegate(".data2","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr2);
        $(this).html("没有数据了");
        $(this).css("backgroundColor","white")
        console.log(2)
    });
    $(".more").delegate(".data3","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr3);
        $(this).html("没有数据了");
        $(this).css("backgroundColor","white")
        console.log(3)
    });

    $(".more").delegate(".data4","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr4);
        $(this).html("没有数据了");
        $(this).css("backgroundColor","white")
        console.log(4)
    });




    setTimeout(function () {
        creatDiv(arr);
    },100);




    $(".title_sum").click(function () {
        $(".sonDiv").remove();
        creatDiv(arr);

        $(".more").empty().append("<span class='data1 data'>加载更多</span>");
        $(this).siblings("a").removeClass("aaa");
        $(this).addClass("aaa");
       
    });



    $(".HeZuoFen").delegate(".title0","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr2);
        $(".more").empty().append("<span class='data2 data'>加载更多</span>");
        $(this).siblings("a").removeClass("aaa");
        $(this).addClass("aaa");
    });

    $(".HeZuoFen").delegate(".title1","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr3);
        $(".more").empty().append("<span class='data3 data'>加载更多</span>");
        $(this).siblings("a").removeClass("aaa");
        $(this).addClass("aaa");
        
    });


    $(".HeZuoFen").delegate(".title2","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr4);
        $(".more").empty().append("<span class='data4 data'>加载更多</span>");
        $(this).siblings("a").removeClass("aaa");
        $(this).addClass("aaa");

    });

    $(".HeZuoFen").delegate(".title3","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr5);
    });

    $(".HeZuoFen").delegate(".title4","click",function(){
        $(".sonDiv").remove();
        creatDiv(arr6);
    });



});


