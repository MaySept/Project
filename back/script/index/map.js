$(function () {


    var pageindex = 0;
    window.last = 0;  //分页开始设置
    window.amount = 8; //一页显示多少条记录
    window.exectue = false;
    window.clickTotalNumber = 0;

    var nowDataNumber=0,toDataNumber=0;
    var hoverMap = $('.hoverMap');
    var cityImg = $('.cityImg');
    var shop_list_panel = $('.shop_list_panel');
    var map_city_list = $('.map_city_list');
    var sheng_name = $('.ShengFen');
    var mapForm=$('#mapForm');
    var allData=[],clickData=[];
    var now_id,now_sh;
    var allArea=["黑龙江省","吉林省","辽宁省","河北省","北京市","天津市","山东省","江苏省","上海市","安徽省","浙江省","湖北省" +
    "江西省","福建省","广东省","海南省"];

    hoverMap.attr("href", "javascript:;");

    var boxMaker = {};

    var templateLi = "<div class=\"shop_name_title\">{1}</div><div class=\"shop_name_add\">{2}</div><div class=\"shop_picurl\">{3}</div>";

    //var templateLi ="<p class=\"author\">{1}</p><p class=\"content\">{2}</p><p style=\"float:right\" class=\"imgstr\">{3}</p>";
    //var templateLi = "<a title=\"{1}\" rel=\"{2}\" tip=\"{3},{4}\" href=\"javascript:;\"><b><img width=\"{5}\" height=\"{6}\" alt=\"{1}\" src=\"{7}\"></b><!--<i><img height=\"100%\" alt=\"\" src=\"{8}\"></i><cite>posted by <em>Aviva baby</em> <br><small>{9}</small></cite><tt></tt>--></a>";
    boxMaker.makeBoxes = function (data) {

        var boxes = [];
        //判断一个数组是否为空，不能用他的boolean数值，或者他是否等于一个空数组，空数组不等于空数组
        if(data.length){
            if(clickTotalNumber>nowDataNumber+amount){
                toDataNumber=nowDataNumber+amount;
            }else {
                toDataNumber=clickTotalNumber;
            }
            for (var i = nowDataNumber; i < toDataNumber; i++) {
                var tempLi = templateLi;

                //tempLi=tempLi.replace("{1}", data[i]["shetype"]);
                tempLi = tempLi.replace("{1}", data[i]["detial"]);
                tempLi = tempLi.replace("{2}", data[i]["title"]);
                tempLi = tempLi.replace("{3}", data[i]["picurl"]);

                var box = document.createElement('div');
                box.setAttribute('class', "SheItem");
                //box.setAttribute('style', ""+data[i]["stylestr"]+"");
                //alert(data[i]["stylestr"]);
                box.innerHTML = tempLi;

                boxes.push(box);
                console.log(last,toDataNumber,boxes);
            }
            sheng_name.html(data[0]["shesheng"]);
        }

        // window.shetotal = data[0]["shetotal"];

        return boxes;
    };

    function request(stract) {

        var url = "http://123.56.24.109/mybatisForSpring3/QueryAreaDetialController.do";

        //alert(pageindex); 测试当前第几页

        var data; //保存查询数据

        if (stract == "go") {
            pageindex = pageindex + 1;

            if(clickTotalNumber>nowDataNumber+amount){
                toDataNumber=nowDataNumber+amount;
            }else {
                toDataNumber=clickTotalNumber;
            }
            nowDataNumber = amount * pageindex; // 改变分页起始序数


            if (!clickData || clickData.length == 0) {
                //alert("no data!");
                pageindex = pageindex - 1;
                last = amount * pageindex;
                window.exectue = true;
                return;
            }
        }

        if ((stract == "back") && (pageindex > 0)) {
            pageindex = pageindex - 1;

            if(0<nowDataNumber-amount){
                toDataNumber=nowDataNumber-amount;
            }else {
                toDataNumber=0;
            }
            nowDataNumber = amount * pageindex; // 改变分页起始序数



            // if (!data || data.length == 0) {
            //     //alert("no data!");
            //     pageindex = pageindex + 1;
            //     last = amount * pageindex;
            //     window.exectue = true;
            //     return;
            // }
        }

        if (stract == "") {

            last = amount * pageindex; // 改变分页起始序数

            addHasNoData(clickData);

        }
        var $boxes = $(boxMaker.makeBoxes(clickData));


        window.setTimeout(function () {

            //$container.append($boxes);

            shop_list_panel.empty().html($boxes);

            //添加点击事件
            // $(".SheItem").click(function () {
            //     $(this).addClass("cur");
            //     $(this).siblings(".SheItem").removeClass("cur");
            //     $(this).find(".shop_picurl").css("display", "block");
            //     $(this).siblings(".SheItem").find(".shop_picurl").css("display", "none");
            // });

            map_city_list.show();

            window.exectue = false;
        }, 100);

        //以下为判断是否显示下一页按钮
        // $(".NextPage").show();
        if (clickTotalNumber > toDataNumber) {
            $(".NextPage").show();
            //$(".NextPage").attr("disabled","");
        } else {
            $(".NextPage").hide();
            //$(".NextPage").attr("disabled","disabled");
        }

        //以下为判断是否显示上一页按钮
        // $(".PrePage").show();
        if (pageindex == 0) {
            $(".PrePage").hide();
            //$(".PrePage").attr("disabled","disabled");
        } else {
            $(".PrePage").show();
            //$(".PrePage").attr("disabled","");
        }

    }

    function addHasNoData(data) {
        if (!data || data.length == 0) {
            //alert("no data!");
            shop_list_panel.empty().html("<center style=\"padding-top:100px;\">没有数据</center>");
            window.exectue = true;
        }
    }
    window.onload=function () {
        $.ajax(
            {   url: "http://123.56.24.109/mybatisForSpring3/QueryAreaDetialController.do",
                type:"POST",
                dataType:"json",
                timeout:5000,
                contentType:"application/json",
                success:function (data) {
                    allData=data;
                },
                error:function (data) {
                }
            }
        );
    };
    function filterNanme(name) {
        if(name.indexOf("省")){
            name=name.slice(0,name.indexOf("省"));
        }else  if(name.indexOf("市")){
            name=name.slice(0,name.indexOf("市"));
        }
        for(var i=0;i<allData.length;i++){
            if(allData[i].detial.replace("省","")==name){
                clickData.push(allData[i]);
            }
        }
    }
    mapForm.submit(function (e) {
        e.preventDefault();
        clickData=[];
        now_sh = this["IndexSeaKey"].value;
        var true_sh="无结果";
        for(var i=0;i<allArea.length;i++){
            if(allArea[i].indexOf(now_sh)!=-1){
                true_sh=allArea[i];
                break;
            }
        }
        sheng_name.html(true_sh);
        map_city_list.show();
        filterNanme(true_sh);
        clickTotalNumber=clickData.length;
        //cityImg.hide();
        //$("#s_"+now_id).show();


        //恢复初始状态
        pageindex = 0;
        last = 0;  //分页开始设置
        exectue = false;

        request("");
    });

    hoverMap.click(function () {
        clickData=[];
        now_sh = $(this).attr('id');
        now_id = $(this).attr('name');
        sheng_name.html(now_sh);
        map_city_list.show();
        filterNanme(now_sh);
        clickTotalNumber=clickData.length;
        //cityImg.hide();
        //$("#s_"+now_id).show();


        //恢复初始状态
        pageindex = 0;
        last = 0;  //分页开始设置
        exectue = false;

        request("");

    });

    $(".NextPage").click(function () {
        shop_list_panel.empty();
        request("go");
    });

    $(".PrePage").click(function () {
        shop_list_panel.empty();
        request("back");
    });

});