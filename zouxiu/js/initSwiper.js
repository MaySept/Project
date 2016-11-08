/**
 * Created by REN on 2016/10/5.
 */


if (!localStorage.isOpened) {
    $(".containerContent").css("display","none");

    // 封面
    var startInterfaceSwiper = new Swiper('.containerStartInterface', {
        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
    });

    document.querySelector(".s4img3").onclick = function () {
        document.body.removeChild(document.querySelector(".containerStartInterface"));
        document.querySelector(".containerContent").style.display = "block";
        startInterfaceSwiper = null;
        //更新二级swiper
        contentSwiper.update();
        carouselSwiper.update();
        myShowSwiper.update();
    }
}

//内容
var contentSwiper = new Swiper('.containerContent', {
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: false,
    effect: 'fade',
    fade: {
        crossFade: true
    },
    onInit: function (swiper) {
        swiper.lockSwipes();
    }

});
//二级swiper:轮播图
var carouselSwiper = new Swiper('.containerCarousel', {
    pagination: '.carouselBar',
    autoplay: 5000
});

//二级swiper：MyShow
var myShowSwiper = new Swiper('.containerMyShow', {
    effect: 'fade',
    fade: {
        crossFade: true
    },
    onInit: function (swiper) {
        swiper.lockSwipes();
    }
});



