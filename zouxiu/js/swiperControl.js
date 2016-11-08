/**
 * Created by REN on 2016/10/4.
 */

$(function () {

    //一级Swiper点击切换
    var bar = document.querySelectorAll(".bar span");
    for (var i = 0, j = bar.length; i < j; i++) {
        bar[i].index = i;
        bar[i].onclick = function () {
            contentSwiper.unlockSwipes();
            contentSwiper.slideTo(this.index, 500, false);
            contentSwiper.lockSwipes();
        }
    }

    //二级Swiper:myShow点击切换
    changePage($(".toMyShowAll"),0);
    changePage($(".toLogin"),1);
    changePage($(".toRegister"),2);
    changePage($(".toOrder"),3);
    changePage($(".toCoupon"),4);
    changePage($(".toRecords"),5);
    changePage($(".toCollection"),6);

    //点击切换页面
    function changePage(ele,page) {
        ele.on("click",function () {
            gotoPage(myShowSwiper,page);
        })
    }

    function gotoPage(swiperID,page) {
        swiperID.unlockSwipes();
        swiperID.slideTo(page,500,false);
        swiperID.lockSwipes();
    }






    window.gotoPage = gotoPage;

});