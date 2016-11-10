/**
 * Created by REN on 2016/9/25.
 */

var nav = document.createElement("div");
nav.className = "Header";
nav.innerHTML = "<div class='nav'><a href='index.html' class='logo'><img src='lib/images/logo.png'></a> <ul class='nav-in'> <li><a href='index.html'>首&nbsp;&nbsp;&nbsp;页</a></li> <li><a href='ptjs.html'>平台介绍</a></li> <li><a href='fgsq.html'>覆盖社区</a></li> <li><a href='yxal.html'>优秀案例</a></li> <li><a href='hzhb.html'>合作伙伴</a></li> <li><a href='yjqxw.html'>亿街区新闻</a></li> <li><a href='jmhz.html'>加盟合作</a></li> <li><a href='gywm.html'>关于我们</a></li> </ul>";
document.body.appendChild(nav);

window.onload = function () {
    var RighFix = document.createElement("div");
    RighFix.className = "RighFix";
    RighFix.innerHTML = "<div class='RighFixItem'><span class='ico_tel'></span><div class='SecDivBox'><label class='tel_txt'>400-641-1058</label></div></div><div class='RighFixItem'><span class='ico_app'></span><div class='SecDivBox'><label><img src='lib/images/erweimaxp.jpg'></label></div></div><div class='RighFixItem'><span class='ico_wei'></span><div class='SecDivBox'><label><img src='lib/images/erweima.jpg'></label></div></div><div class='RighFixItem'><span class='ico_sian'></span><div class='SecDivBox'><label><img src='lib/images/sinawei1.jpg'></label></div></div><div class='RighFixItem'><i>TOP</i></div><div class='RighFixItem'><a href='#'><img src='lib/images/fbar_caseico.png'></a></div></div> ";
    document.body.appendChild(RighFix);

    var jmNow = document.createElement("div");
    jmNow.className = "JiaMengNow";
    jmNow.innerHTML = "<div class='JiaMengNow'><a href='jmhz2.html' target='_blank'><img src='lib/images/jiameng.gif' width='110'></a></div>";
    document.body.appendChild(jmNow);

    var bottomDiv = document.createElement("div");
    bottomDiv.className = "Bottom Inpag";
    bottomDiv.innerHTML = "<div class='BottomBox'> <div class='BottomBody'> <div class='ConImg'><img src='lib/images/incontact.png' width='241' height='70'><a href='FaLv.php'>法律声明</a></div> <h3>亿街区---我们的亿时代</h3> <div class='Copy'>Copyright 2015-2020 All Rights Reserved bjyijiequ.com co.,ltd.<br> <span>Add</span>：北京市朝阳区慈云寺北里210号远洋国际中心E座10层&nbsp;&nbsp;&nbsp;<span>Code</span>：100025 <br> <span>Tel</span>：+86（10）5083 1293&nbsp;&nbsp;&nbsp;<span>Fax</span>：+86（10）5083 1570&nbsp;&nbsp;&nbsp;<span>E-mail</span>：niejj@sinooceanland.com&nbsp;&nbsp;&nbsp;京ICP备1519425867号</div> </div> <div class='BottomWei'> <h3>关注我们：</h3> <div class='WeiArea'> <a href='#' class='sian'><img src='lib/images/sinawei.png' width='280' height='280'></a> <a href='#' class='wei'><img src='lib/images/weierwei.png' width='280' height='280'></a> <a href='#' class='app'><img src='lib/images/apperwei.png' width='280' height='280'></a> </div> </div> <div class='clear'></div> </div>";
    document.body.appendChild(bottomDiv);
}