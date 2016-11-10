$(function () {


  window.pageindex = 0;
  window.last=0;  //分页开始设置
  window.amount=7; //一页显示多少条记录
  window.exectue=false;
  window.shetotal=0;

  var hoverMap = $('.hoverMap');
  var cityImg  = $('.cityImg');
  var shop_list_panel = $('.shop_list_panel');
  var map_city_list  = $('.map_city_list');
  var sheng_name=$('.ShengFen');
  
  hoverMap.attr("href","javascript:;");

 		var boxMaker = {};
		
		 var templateLi ="<div class=\"shop_name_title\">{1}</div><div class=\"shop_name_add\">{2}</div><div class=\"shop_picurl\">{3}</div>";

		 //var templateLi ="<p class=\"author\">{1}</p><p class=\"content\">{2}</p><p style=\"float:right\" class=\"imgstr\">{3}</p>";
        //var templateLi = "<a title=\"{1}\" rel=\"{2}\" tip=\"{3},{4}\" href=\"javascript:;\"><b><img width=\"{5}\" height=\"{6}\" alt=\"{1}\" src=\"{7}\"></b><!--<i><img height=\"100%\" alt=\"\" src=\"{8}\"></i><cite>posted by <em>Aviva baby</em> <br><small>{9}</small></cite><tt></tt>--></a>";
        boxMaker.makeBoxes = function (data) {
		
        var boxes = [];
        for (var i = 0; i < data.length; i++) {
            var tempLi = templateLi;
          
            //tempLi=tempLi.replace("{1}", data[i]["shetype"]);
			tempLi=tempLi.replace("{1}", data[i]["shediqu"]);
			tempLi=tempLi.replace("{2}", data[i]["shename"]);
			tempLi=tempLi.replace("{3}", data[i]["picurl"]);
          
            var box = document.createElement('div');
            box.setAttribute('class', "SheItem");
			//box.setAttribute('style', ""+data[i]["stylestr"]+"");
            //alert(data[i]["stylestr"]);
            box.innerHTML = tempLi;
            
            boxes.push(box);
        }
		
		sheng_name.html(data[0]["shesheng"]);
		
		window.shetotal=data[0]["shetotal"];
		
        return boxes;
    };
	
    function request(stract)
    {   
		
        var url = "/ajax_shop.php";

	   //alert(pageindex); 测试当前第几页
	      
	   var data; //保存查询数据
	   
	   if(stract=="go"){
		   pageindex=pageindex+1;
		   
		   last=amount*pageindex; // 改变分页起始序数
		   
		   data = getDatas(url,  pageindex);
     
			if (!data || data.length == 0) {
				//alert("no data!");
				pageindex=pageindex-1;
				last=amount*pageindex;
				window.exectue=true;
				return;
		   	}
		   }
		   
	   if((stract=="back")&&(pageindex>0)){
		   pageindex=pageindex-1;
		   
		   last=amount*pageindex; // 改变分页起始序数
		   
		   data = getDatas(url,  pageindex);
      
			if (!data || data.length == 0) {
				//alert("no data!");
				pageindex=pageindex+1;
				last=amount*pageindex;
				window.exectue=true;
				return;
		   	}
		   }
		   
		if(stract==""){
			
        last=amount*pageindex; // 改变分页起始序数
	   
        data = getDatas(url,  pageindex);
	       
			if (!data || data.length == 0) {
				//alert("no data!");
				shop_list_panel.empty().html("<center style=\"padding-top:100px;\">没有数据</center>");
				window.exectue=true;
				return;
		   }
		}
		
        var $boxes = $(boxMaker.makeBoxes(data));
       

        window.setTimeout(function () {
           
            //$container.append($boxes);
			
			shop_list_panel.empty().html($boxes);
			
			//添加点击事件
			$(".SheItem").click(function(){
				$(this).addClass("cur");
				$(this).siblings(".SheItem").removeClass("cur");
				$(this).find(".shop_picurl").css("display","block");
				$(this).siblings(".SheItem").find(".shop_picurl").css("display","none");
			});
			
			map_city_list.show();
			
            window.exectue=false;
        }, 100);
		
		//以下为判断是否显示下一页按钮
		
		if(shetotal>(last+amount)){
			$(".NextPage").show();
			//$(".NextPage").attr("disabled","");
			}else{
				$(".NextPage").hide();
				//$(".NextPage").attr("disabled","disabled");
				}
				
		//以下为判断是否显示上一页按钮
		
		if(last==0){
			$(".PrePage").hide();
			//$(".PrePage").attr("disabled","disabled");
			}else{
				$(".PrePage").show();
				//$(".PrePage").attr("disabled","");
				}
        
    }

    function getDatas(url, pageindex) {
        var myData;		
        $.ajaxSettings.async = false;
        $.post(url, { Action: "post", "last": last,"pid": now_id, "amount": amount }, function (data, textStatus) {
            if (textStatus == "success") {
                myData = data;
            }
        },"json");
		
        return myData;
    }
	
	hoverMap.click(function(){
  
	  now_sh =  $(this).attr('id');
	  now_id =  $(this).attr('name');
  	  sheng_name.html(now_sh);
	  map_city_list.show();
	
	  //cityImg.hide();
	  //$("#s_"+now_id).show();
	  
	  //要配置php文件才能正常演示，前端只能到这了
	  
	  //恢复初始状态
	   pageindex = 0;
	   last=0;  //分页开始设置
       exectue=false;
	  
	  request("");
	  
	});
	
	$(".NextPage").click(function(){
			request("go");
		});
		
	$(".PrePage").click(function(){
			request("back");
		});
	
    });