/**
 * Created by REN on 2016/10/12.
 */

(function () {
    if (sessionStorage.login != "true") {
        if (!!(window.attachEvent && !window.opera))
        { document.execCommand("stop"); }
        else
        { window.stop(); }
        top.location = "index.html";
    }
})();

/**
 * @param {String} url 上传数据的接口;
 * @param  {Object} dataObj 上传的数据;
 * @param {Function} callback 回调函数;
 */
function postData(url,dataObj,callback) {
    $.ajax({
        url:url,
        type:'POST',
        dataType:'json',
        contentType:"application/json",
        data:JSON.stringify(dataObj),
        success:function (data) {
            callback && callback(data);
        },
        error:function (err) {
            alert("连接失败，请重试！");
            console.warn(err);
        }
    })
}

/**
 * @param {String} url 请求数据的接口;
 * @param {Function} callback 回调函数;
 */
function requestData(url, callback) {
    $.ajax({
        url:url,
        type:'POST',
        dataType:'json',
        timeout:5000,
        contentType:"application/json",
        success:function (data) {
            callback && callback(data);
        },
        error:function (err) {
            alert("加载失败，请重试！");
            console.warn(err);
        }
    })
}

/**
 * @param {String} url 执行删除的接口地址;
 * @param {String} id 执行删除操作时传递的参数的！！--属性名--！！;
 * @param {Number} colspan 空白的列数;
 */
function addGetAllListener(url,id,colspan) {
    $(".update").on("click",function () {sessionStorage.inUpdate = $(this).text();sessionStorage.code = $(this).attr("code");})
    var $table = $("#list-table")
    $table.append($("<tr></tr>")
        .append($("<td align='center'><span id='getAll' style='cursor: pointer'>全选</span></td>"))
        .append($("<td></td>").attr("colspan",colspan))
        .append($("<td align='center'></td>").append($("<input type='button' id='btndel' value='删除'/>"))))

    var getAll = $("#getAll"),btndel = $("#btndel"),checkBox = $("input:checkbox");
    getAll.on("click",function () {
        for(var i=0,j=checkBox.length;i<j;i++) {
            checkBox[i].checked = true;
        }
    });
    btndel.on("click",function () {
        var checked,ids = "";
        if ($("input:checked").length == 0) {
            return;
        }
        checked = $("input:checked");
        for (var i=0,j=checked.length;i<j;i++) {
            ids = ids + checked[i].value +",";
        }
        var info = {};
        info[id] = ids.slice(0,-1);
        postData(
            url, info,
            function (data) {
                if (data.result == 0) {
                    alert("删除成功！");
                    location.href = location.href;
                }
            }
        )
    })
}

//将对应权限值转换为文字
function translateCode(code) {
    var power;
    code == 0 && (power = "招聘管理");
    code == 1 && (power = "合作伙伴管理");
    code == 2 && (power = "新单幻管理");
    code == 3 && (power = "小区加盟管理");
    code == 4 && (power = "超级管理员");
    return power;
}

//表单提交后回退的页面地址
function goBack(url) {
    document.getElementById("frame").onload = function () {
        location.href = url;
    }
}

/**
 * 该添加函数传参不固定
 * @param {String} url 标题点击时跳转的页面，无则填写"#";
 * @param {String} deleteValue (该值为checkbox的value值，用于删除操作是使用)  执行删除操作时传递的参数的！！--属性值--！！;
 * 其余传入参数按照自己对应table的内容依次填入即可;
 */
function addList(url,deleteValue) {
    var $table = $("#list-table"),$tr = $("<tr></tr>");
    $tr.append($("<td align='center'></td>").append($("<input  type='checkbox' name='cb'/>").val(deleteValue)));
    $tr.append($("<td align='center'></td>").append($("<a class='update'></a>").attr("code",deleteValue).attr("href",url).text(arguments[2])));
    for (var i=3,j=arguments.length;i<j;i++) {
        $tr.append($("<td align='center'></td>").text(arguments[i]));
    }
    $("#none").remove(),$table.append($tr);
}

function autoValue(data) {
    if (data.length !=0) {
        for(var key in data[0]) {
            $("*[name="+key+"]").val(data[0][key]);
        }
    }
}

function hideAll() {
    var ele = $(".update");
    for (var i=0,j=ele.length;i<j;i++) {
        ele[i].parentNode.parentNode.style.display = "none";
    }
}

function addSearchListener() {
    var inSearch = $(".update");
    var searchBox = document.querySelector("input[name=keyword]");
    searchBox.oninput=function () {
        hideAll();
        var val = this.value;
        for (var i=0,j=inSearch.length;i<j;i++) {
            if (inSearch[i].innerHTML.indexOf(val) != -1) {
                inSearch[i].parentNode.parentNode.style.display = "table-row";
            }
        }
    }
}