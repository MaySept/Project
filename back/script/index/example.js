/**
 * Created by Administrator on 2016/10/18 0018.
 */
(function () {
    var exampleImage=[],exampleTitle=[],exampleId=[],allExample=$(".all-example");
    function addTextToArray(data) {
        for(var i=0;i<data.length;i++){
            if(!data[i]){
                continue;
            }
            exampleImage.push(data[i].picurl);
            exampleTitle.push(data[i].title);
            exampleId.push(data[i].id);
        }
    }
    function createDiv(i) {
        //IE使用滤镜使背景图片占满背景
        // filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg',sizingMethod='scale');
        return $("<a  class='example'></a>").attr("href","yxal10.html?id="+exampleId[i])
            .css({"backgroundImage":"url("+exampleImage[i]+")",
            "filter":"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+exampleImage[i]+"',sizingMethod='scale')"})
            .append("<div class='blackhover'></div>")
            .append($("<div class='example_text'></div>").append("<em></em>")
                .append("<p>"+exampleTitle[i]+"</p>")
                .append("<i class='example_line'></i>")
                .append("<span>查看详情</span>"));

    }
    requestData("http://123.56.24.109/mybatisForSpring3/QueryCaseDetialController.do",function (data) {
        addTextToArray(data);
        for(var i=0;i<exampleImage.length;i++){
            allExample.append(createDiv(i));
        }
    })
})();