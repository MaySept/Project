/**
 * Created by Administrator on 2016/9/26 0026.
 */
/*
 * 考虑做轮播图，用原生js还是插件，
 * 轮播图，先加五张图到一个div里，别的都隐藏，出现的那个用class控制，
 * 隔一秒class换一个位置，*/
(function () {
    //制造每个轮播图的块
    var bannerNumber=0, bannerImageAllUrl = [],mainCurrentIndex = 0,preIndex = 0,opacityChangeSpeed = 0.05
        ,duration = 700,pageChangeTime = 3000,frame = 20,nowframe = 0,frameduration = duration / frame
        ,switchId,animatePlaying = false;
    var buttonCompilations=$(".buttonCompilations")[0];
    function createBannerImageBlock(url,i) {
        if(i==0){return $("<div class='bannerImageBlock' style='display:block;filter（opacity=100)'><img class='bannerImage' src='"+url+"'></div>")[0];}
        return $("<div class='bannerImageBlock'><img class='bannerImage' src='"+url+"'></div>")[0];
    }
    //制作出所有快
    function createAllImageBlock() {
        var bannerImageBody =$("<div class='bannerImageBody'></div>")[0];
        for (var i = 0; i < bannerNumber; i++) {
            bannerImageBody.appendChild(createBannerImageBlock(bannerImageAllUrl[i],i));
        }
        $(".banner-container")[0].appendChild(bannerImageBody);
        // $(".bannerImageBlock")[0].style.display = "block";
    }
    //设置动画过程
    function fadeToNextPhoto(preIndex,mainCurrentIndex) {
        var Node=$(".bannerImageBlock");
        var preNode = Node[preIndex];
        var currentNode = Node[mainCurrentIndex];
        var preopacity = 1;
        var currentopacity = 0;
        // alert($(".bannerImage")[mainCurrentIndex].getAttribute("src"));
        // mainCurrentIndex = currentIndex;
        currentNode.style.display = "block";
        var id = setInterval(function (e) {
            animatePlaying = true;
            nowframe++;
            preopacity -= opacityChangeSpeed;
            currentopacity += opacityChangeSpeed;
            if (nowframe == frame) {
                clearInterval(id);
                nowframe = 0;
                preopacity = 0;
                currentopacity = 1;
                //有的时候逻辑上的缺失，chorme会帮你解决，而IE不会，
                //最主要的问题是z-index，如果ie里不设置z-index，他会
                //opacity透明度是CSS3的属性，在IE7.8不支持,IE下filter:alpha（opacity=60）;
                //IE里e对象下还没有target属性，只有srcElement
                //IE8事件，e没有target事件，只有e.srcElement而且事件一定要声明为event=event||window.event;
                //IE使用滤镜使背景图片占满背景
                // filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg',sizingMethod='scale');
                preNode.style.display="none";
                animatePlaying = false;
            }
            preNode.style.opacity = preopacity + "";
            preNode.style.filter="alpha(opacity="+(preopacity*100)+")";
            currentNode.style.opacity = currentopacity + "";
            currentNode.style.filter="alpha(opacity="+(currentopacity*100)+")";
        }, frameduration)
    }
    //无限自动轮播
    function autoCarseoul() {
        preIndex = mainCurrentIndex;
        mainCurrentIndex++;
        if (mainCurrentIndex == bannerNumber){
            mainCurrentIndex = 0;
        }
        if(bannerNumber!=1) {
            fadeToNextPhoto(preIndex,mainCurrentIndex);
        }
        changeButtonWithAnimation();
    }
    function createButton() {
        for(var i=0;i<bannerNumber;i++){
            if(i==0){
                $(buttonCompilations).append($("<div class='banner-button button-hover'></div>"));
            }else {
                $(buttonCompilations).append($("<div class='banner-button'></div>"));
            }
        }
    }
    //给按钮加上index
    function addIndexToButton() {
        for (var  button = $(".banner-button"), i = 0; i < button.length; i++) {
            button[i].setAttribute("index", i);
        }
    }
    //让按钮的填充随着轮播自动切换
    function changeButtonWithAnimation() {
        var button = $(".banner-button");
        button[preIndex].className = button[preIndex].className.replace("button-hover", " ");
        button[mainCurrentIndex].className = button[mainCurrentIndex].className + " " + "button-hover";
    }
    //给按钮加上事件
    function buttonAddEvent() {
        for (var  button = $(".banner-button"), i = 0; i < button.length; i++) {
            button[i].onclick = function (event) {
                if (!animatePlaying) {
                    clearInterval(switchId);
                    preIndex = mainCurrentIndex;
                    event=window.event||event;
                    if(event.srcElement){
                        mainCurrentIndex = event.srcElement.getAttribute("index");
                    }else {
                        console.log(event,mainCurrentIndex);
                        mainCurrentIndex = event.target.getAttribute("index");
                    }
                    if (preIndex != mainCurrentIndex) {
                        fadeToNextPhoto(preIndex, mainCurrentIndex);
                        changeButtonWithAnimation();
                        setTimeout(function () {
                            animateStart();
                            //    三秒之后的确计时器是进行了，但是轮播图也要等上三秒开始
                            //所有每次轮播图没开始就被我点击清除定时器
                        }, 3000);
                    }
                }
            }
        }
    }
    //动画的开始和重置
    function animateStart() {
        if (switchId != -1) {
            clearInterval(switchId);
        }
        switchId = setInterval(animatePlaySetInter, pageChangeTime);
    }
     function animatePlaySetInter() {
         autoCarseoul();
     }
    function init() {
        requestData("http://123.56.24.109/mybatisForSpring3/QueryHomePageController.do", function (data) {
            bannerNumber=data.length;
            for (var i = 0; i < bannerNumber; i++) {
                bannerImageAllUrl.push(data[i].picurl);
            }
            createAllImageBlock();
            createButton();
            buttonAddEvent();
            addIndexToButton();
            if(bannerNumber!=1){
                fadeToNextPhoto(bannerNumber-1,0);
                animateStart();
            }
            else {
                var node=$(".bannerImageBlock ")[0];
                node.style.opacity = "1";
                node.style.filter="alpha(opacity=100)";
            }
        });
        // fadeToNextPhoto(4,0);
    }

    init();
})();