/**
 * Created by Administrator on 2016/9/25 0025.
 */
window.chuanan = window.chuanan || {};
(function () {
    var index=1;

    function tab() {
        var NewsFen = document.getElementById("NewsFen");
        var arra = NewsFen.getElementsByTagName("a");
        var NewsItemListBox = document.getElementById("NewsItemListBox");
        var arrNewsItemList = NewsItemListBox.getElementsByTagName("li");
        var len = arra.length;

        for (var i = 0; i < len; i++) {
            arra[i].index = i;
            arra[i].onclick = function () {
                index=this.index+1;
                console.log(index);
                for (var i = 0; i < len; i++) {
                    arra[i].className = '';
                    arrNewsItemList[i].className = 'NewsItemList';
                }
                arra[this.index].className = 'act';
                arrNewsItemList[this.index].className = '';
            }
        }
    }
    tab();
    $(function () {
        function creatNewsItem(box,URL,date,message) {
            var NewsItem = $('<div></div>').addClass('NewsItem');
            NewsItem.appendTo($(box));
            var NewsLeft = $('<div></div>').addClass('NewsLeft');
            NewsLeft.append($('<a href="#"></a>').html("<img src=" + URL + ">")).appendTo(NewsItem);
            var NewsRight = $('<div></div>').addClass('NewsRight');
            NewsRight.html('<div class="NewsDate">' + date + '</div><h2><a href="#">' + message + '</a></h2><p></p><div class="NewsDeil"><a href="#">详情信息</a></div>').appendTo(NewsItem);
            var clear = $('<div></div>').addClass('clear').appendTo(NewsItem);
        }

        $("#GetMoreNews").append($('<a>加载更多</a>'));

        $("#GetMoreNews a").on("click", function () {
            creatNewsItem(".box"+index, "images/yjqxw/news.jpg", "2016-09-18", "物业+互联网重构物业管理价值");
            creatNewsItem(".box"+index, "images/yjqxw/20160830090950268720231.jpg", "2016-08-30", "亿街区跳蚤市场功能上线 产品体验不断升级");
            creatNewsItem(".box"+index, "images/yjqxw/201608300933001223611395.jpg", "2016-08-30", "多家知名物业公司及政府机构集中签约亿街区，智慧..");
            creatNewsItem(".box"+index, "images/yjqxw/201608241752121896834888.jpg", "2016-08-24", "亿街区积分商城正式上线 一站式智慧物业服务系统再..");
            creatNewsItem(".box"+index, "images/yjqxw/20160824174848692142919.jpg", "2016-08-24", "“最美物业人”圆满落幕 亿街区携手物业弘扬正能量");
        });
        creatNewsItem(".box1","images/yjqxw/news.jpg","2016-09-18","物业+互联网重构物业管理价值");
        creatNewsItem(".box1","images/yjqxw/20160830090950268720231.jpg","2016-08-30","亿街区跳蚤市场功能上线 产品体验不断升级");
        creatNewsItem(".box1","images/yjqxw/201608300933001223611395.jpg","2016-08-30","多家知名物业公司及政府机构集中签约亿街区，智慧..");
        creatNewsItem(".box1","images/yjqxw/201608241752121896834888.jpg","2016-08-24","亿街区积分商城正式上线 一站式智慧物业服务系统再..");
        creatNewsItem(".box1","images/yjqxw/20160824174848692142919.jpg","2016-08-24","“最美物业人”圆满落幕 亿街区携手物业弘扬正能量");

        creatNewsItem(".box2","images/yjqxw/20160830090950268720231.jpg","2016-08-30","亿街区跳蚤市场功能上线 产品体验不断升级");
        creatNewsItem(".box2","images/yjqxw/201608241752121896834888.jpg","2016-08-24","亿街区积分商城正式上线 一站式智慧物业服务系统再..");
        creatNewsItem(".box2","images/yjqxw/20160824174848692142919.jpg","2016-08-24","“最美物业人”圆满落幕 亿街区携手物业弘扬正能量");
        creatNewsItem(".box2","images/yjqxw/news.jpg","2016-06-21","亿街区产品功能再升级 助力市场营销");
        creatNewsItem(".box2","images/yjqxw/2016053110000619763395.jpg","2016-05-31","亿街区联手万德福广场物业，共赢未来");

        creatNewsItem(".box3","images/yjqxw/news.jpg","2016-06-21","物业+互联网重构物业管理价值");
        creatNewsItem(".box3","images/yjqxw/201608300933001223611395.jpg","2016-08-30","多家知名物业公司及政府机构集中签约亿街区，智慧..");
        creatNewsItem(".box3","images/yjqxw/news.jpg","2016-05-23","智慧物业平台 物业公司突围方向(图)");
        creatNewsItem(".box3","images/yjqxw/news.jpg","2016-05-16","高效管理+提升收益 亿街区打造智慧物业平台");
        creatNewsItem(".box3","images/yjqxw/news.jpg","2016-05-09","远洋亿家新三板挂牌上市 主要提供物业管理服务");

        creatNewsItem(".box4","images/yjqxw/201608241752121896834888.jpg","2016-09-07","前方高能福利预警‖积分当钱花，还有实惠大礼等你拿！");
        creatNewsItem(".box4","images/yjqxw/201605311010001120474045.jpg","2016-05-31","【点击领取】千元现金、粽子礼盒");
        creatNewsItem(".box4","images/yjqxw/201605231710562028355680.jpg","2016-05-23","【新用户专享】32枚德清源鸡蛋，9.9元包邮");
        creatNewsItem(".box4","images/yjqxw/201605161522331376013367.jpg","2016-05-16","【秒杀】德青源咸鸭蛋1元18枚！32枚德青源鲜鸡蛋只..");
        creatNewsItem(".box4","images/yjqxw/201605091136311834080175.jpg","2016-05-09","DUANG~，答题赢购物袋送麻麻！");

    });



        
})();
