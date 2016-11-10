/**
 * Created by Administrator on 2016/9/24 0024.
 */
(function () {
    var backgroundImage = [];
    var index = 0;
    var partnerPage=4;

    function addPartnerChange() {
        var titleBlock = document.getElementsByClassName("partner-class-title");
        var partnerIndex=document.getElementsByClassName("partnerIndex");
        //返回的是一个伪数组对象
        for (var i = 0; i < titleBlock.length; i++) {
            titleBlock[i].setAttribute("index", i);
            titleBlock[i].onclick = function (e) {
                titleBlock[index].className = titleBlock[index].className.replace("partner-class-title-click", " ");
                partnerIndex[index].className=partnerIndex[index].className.replace("partnerPointer"," ");
                index = parseInt(e.target.getAttribute("index"));
                e.target.className = e.target.className + " " + "partner-class-title-click";
                partnerIndex[index].className=partnerIndex[index].className+" "+"partnerPointer";
            }
        }
    }

    function createPartnerBlock() {
        var img= document.createElement("img");
        var a=document.createElement("a");
        a.appendChild(img);
        a.className = "partnerBlock";
        a.href="#";
        return a;
    }

    function addbackground() {
        for (var i = 1; i <28; i++) {
            backgroundImage.push("images/index/index-partner" + i + ".jpg");
        }
    }

    function createPartnerIndex() {
        var partnerIndex = document.createElement("div");
        partnerIndex.className = "partnerIndex";
        for (var i = 0; i < 10; i++) {
            var block = createPartnerBlock();
            block.childNodes[0].src = backgroundImage[Math.floor(Math.random()*backgroundImage.length)];
            partnerIndex.appendChild(block);
        }
        return partnerIndex;
    }

    function createPartnerIcoBody() {
        var partnerIcoBody = document.createElement("div");
        partnerIcoBody.className = "partnerIcoBody";
        for (var i=0;i<partnerPage;i++){
            partnerIcoBody.appendChild(createPartnerIndex());
        }
        partnerIcoBody.childNodes[0].className="partnerIndex partnerPointer";
        document.getElementsByClassName("partner-All-ico")[0].appendChild(partnerIcoBody);
    }

    function init() {
        addbackground();
        createPartnerIcoBody();
        addPartnerChange();
    }

    init();
})();