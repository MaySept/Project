/**
 * Created by Administrator on 2016/9/26 0026.
 */
/*
 * 考虑做轮播图，用原生js还是插件，
 * 轮播图，先加五张图到一个div里，别的都隐藏，出现的那个用class控制，
 * 隔一秒class换一个位置，*/
(function () {
    //制造每个轮播图的块
    var bannerNumber = 5, bannerImageAllUrl = [];
    var mainCurrentIndex = 0;
    var preIndex = 0;
    var opacityChangeSpeed = 0.05;
    var duration = 700;
    var pageChangeTime = 3000;
    var frame = 20;
    var nowframe = 0;
    var frameduration = duration / frame;
    var switchId;
    var animatePlaying=false;
    function createBannerImageBlock(url) {
        var image = document.createElement("img");
        var bannerImageBlock = document.createElement("div");
        bannerImageBlock.className = "bannerImageBlock";
        image.src = url;
        image.className = "bannerImage";
        bannerImageBlock.appendChild(image);
        return bannerImageBlock;
    }

    //制作出所有快
    function createAllImageBlock() {
        var bannerImageBody = document.createElement("div");
        bannerImageBody.className = "bannerImageBody";
        for (var i = 0; i < bannerNumber; i++) {
            bannerImageBody.appendChild(createBannerImageBlock(bannerImageAllUrl[i]));
        }
        document.getElementsByClassName("banner-container")[0].appendChild(bannerImageBody);
        document.getElementsByClassName("bannerImageBlock")[0].style.display = "block";
    }

    function addImageUrl() {
        for (var i = 0; i < bannerNumber; i++) {
            bannerImageAllUrl.push("images/index/banner" + (i + 1) + ".jpg")
        }
    }

    //设置动画过程
    function fadeToNextPhoto(preIndex, currentIndex) {
        var preNode = document.getElementsByClassName("bannerImageBlock")[preIndex];
        var currentNode = document.getElementsByClassName("bannerImageBlock")[currentIndex];
        var preopacity = 1;
        var currentopacity = 0;
        mainCurrentIndex = currentIndex;
        currentNode.style.display = "block";
        var id = setInterval(function (e) {
            nowframe++;
            preopacity -= opacityChangeSpeed;
            currentopacity += opacityChangeSpeed;
            if (nowframe == frame) {
                nowframe = 0;
                clearInterval(id);
                preopacity = 0;
                currentopacity = 1;
                animatePlaying=false;
            }
            preNode.style.opacity = preopacity + "";
            currentNode.style.opacity = currentopacity + "";
        }, frameduration)
    }
    //无限自动轮播
    function autoCarseoul() {
        preIndex = mainCurrentIndex;
        mainCurrentIndex++;
        if (mainCurrentIndex == 5)mainCurrentIndex = 0;
        fadeToNextPhoto(preIndex, mainCurrentIndex);
        changeButtonWithAnimation();
    }
    //给按钮加上index
    function addIndexToButton() {
        for (button=document.getElementsByClassName("banner-button"), i=0;i<button.length;i++){
            button[i].setAttribute("index",i);
        }
    }
    //让按钮的填充随着轮播自动切换
    function changeButtonWithAnimation() {
        var button=document.getElementsByClassName("banner-button");
        button[preIndex].className=button[preIndex].className.replace("button-hover"," ");
        button[mainCurrentIndex].className=button[mainCurrentIndex].className+" "+"button-hover";
    }
    //给按钮加上事件
    function buttonAddEvent() {
        for(button=document.getElementsByClassName("banner-button"),i=0;i<button.length;i++){
            button[i].onclick=function (e) {
                if (!animatePlaying){
                    clearInterval(switchId);
                    preIndex=mainCurrentIndex;
                    mainCurrentIndex=e.target.getAttribute("index");
                    if (preIndex!=mainCurrentIndex){
                        fadeToNextPhoto(preIndex,mainCurrentIndex);
                        changeButtonWithAnimation();
                        setTimeout(function () {
                            animateStart();
                        //    三秒之后的确计时器是进行了，但是轮播图也要等上三秒开始
                            //所有每次轮播图没开始就被我点击清除定时器
                        },3000);
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
        switchId = setInterval(function () {
            animatePlaying=true;
            autoCarseoul();
        }, pageChangeTime);
    }

    function init() {
        addImageUrl();
        createAllImageBlock();
        addIndexToButton();
        fadeToNextPhoto(4, 0);
        animateStart();
        buttonAddEvent();
        // fadeToNextPhoto(4,0);
    }

    init();
})();