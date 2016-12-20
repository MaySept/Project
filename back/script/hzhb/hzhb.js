(function () {
    jQuery.support.cors = true;
    $.ajax({
        url: "http://123.56.24.109/mybatisForSpring3/QueryPartnerController.do",
        type: 'POST',
        dataType: 'json',
        timeout: 5000,
        contentType: "application/json",
        success: function (data) {
            
            for (var i in data) {

                $(".HeZuoFen").append($("<a class='tab'></a>").attr("id",data[i].title).text(data[i].title));
                $(".content").append($("<div class='box'></div>").addClass(data[i].title));
            }
            $(".tab").on("click",function(){
                $(".tab").attr("class","tab");

                $(this).addClass("aaa");
                $(".box").hide();
                $($("."+$(this).attr("id"))[0]).show();
            });
            $(".HeZuoFen").append("<div style='clear: both'></div>")
            $.ajax({

                url: "http://123.56.24.109/mybatisForSpring3/QueryAddPartnerController.do",
                type: 'POST',
                dataType: 'json',
                timeout: 5000,
                contentType: "application/json",
                success: function (data) {
                    for (var i in data) {
                        console.log(data);
                        $("<a class='sonDiv'></a>").attr("href","hzhb2.html?id="+ data[i].id +"").append($("<img class='image'>").attr("src", data[i].picurl)).insertBefore($(".moreAll"));
                        $("<a class='sonDiv'></a>").attr("href","hzhb2.html?id="+ data[i].id +"").append($("<img class='image'>").attr("src", data[i].picurl)).appendTo($("." + data[i].type));

                    }
                    $("<div class='more'></div>").append("<span class='data data1'>加载更多</span>").appendTo($(".box"));
                    $("<div style='clear: both'></div>").insertBefore($(".more"));

                    $(".data").on("click",function () {
                        $(this).text("没有数据了")
                    })

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





})();






