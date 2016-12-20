/**
 * Created by Administrator on 2016/9/25 0025.
 */
(function () {
    var index, data1, data2;

    /*获取查询类别的data*/
    $(function () {
        $.ajax({
            url: 'http://123.56.24.109/mybatisForSpring3/QueryArticleController.do',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                data1 = data;
                createCategory(data1);
                tab();

                /*获取查询文章的data*/
                $.ajax({
                    url: 'http://123.56.24.109/mybatisForSpring3/QueryArticleDetialController.do',
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json",
                    success: function (data) {
                        data2 = data;
                        for (var i = 0; i < data.length; i++) {
                            // console.log(data);
                            if (!data[i])continue;
                            createItem(data[i]).appendTo($(".box1"));
                            if ($("." + data[i].type)) {
                                createItem(data[i]).appendTo($("." + data[i].type));
                            }
                        }

                    },
                    error: function (err) {
                        alert("连接失败，请重试！");
                        console.warn(err);
                    }
                });

            },
            error: function (err) {
                alert("连接失败，请重试！");
                console.warn(err);
            }
        });


        /*创建选项卡*/
        function createCategory(data) {
            var i;
            for (i = 0; i < data.length; i++) {
                /*根据查询类别的数据来创建的类别个数*/
                if (!data[i])continue;
                $("#NewsFen").append($("<a>" + data[i].title + "</a>").attr("href", "#"));
                $("#NewsItemListBox").append($("<li class='NewsItemList'></li>")
                    .append($("<div class='GetMoreBox'></div>")
                        .addClass(data[i].title)));

            }
            /*加载更多，写不出区分每个网页的按钮*/
            $(".NewsList").append($("<div id='GetMoreNews'></div>")
                .append($("<a class=data>加载更多</a>").click(function () {
                    $(this).html("没有数据了")
                })));
        }





        /*实现选项卡功能*/
        function tab() {
            var NewsFen = document.getElementById("NewsFen");
            var aArr = NewsFen.getElementsByTagName("a");
            var NewsItemListBox = document.getElementById("NewsItemListBox");
            var liArr = NewsItemListBox.getElementsByTagName("li");
            var len = aArr.length;

            for (var i = 0; i < len; i++) {
                (function (i) {
                    aArr[i].index = i;
                    aArr[i].onclick = function () {
                        index = this.index + 1;
                        for (var i = 0; i < len; i++) {
                            (function (i) {
                                aArr[i].className = '';
                                liArr[i].className = 'NewsItemList';
                            })(i);
                        }
                        aArr[this.index].className = 'act';
                        liArr[this.index].className = '';
                    }
                })(i);
            }
        }

        /*创建一个*/

        function createItem(obj) {
            /*整个盒子 写到li里面*/
            var NewsItem = $('<div></div>').addClass('NewsItem');
            NewsItem.appendTo('NewsItemList');

            /*左边的图片 写到盒子里面 要传图片路径*/
            var NewsLeft = $('<div></div>').addClass('NewsLeft');
            NewsLeft.append($('<a></a>').attr("href","yjqxw2.html?id="+obj.id).html("<img src=" + obj.picurl + ">")).appendTo(NewsItem);

            /*右边的 时间 标题 详细内容*/
            var NewsRight = $('<div></div>').addClass('NewsRight');
            NewsRight.html('<div class="NewsDate">' + obj.time + '</div>' + /*时间*/
                '<h2><a href="#">' + obj.title + '</a></h2>' + /*标题*/
                '<p></p><div class="NewsDeil">' +
                '<a href="yjqxw2.html?id='+ obj.id +'">详情信息</a></div>').appendTo(NewsItem);
            /*详细内容*/

            var clear = $('<div></div>').addClass('clear').appendTo(NewsItem);
            return NewsItem;
        }


    })
})();
