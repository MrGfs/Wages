var Zdata;
var M;
$(function(){
	
		nowTime();	  
		setInterval(nowTime,1000);	
		//时间可移动
		$('#timeDiv').draggable({ 
		handle:'#nowTime' 
		}); 
		sr();
		shf();		
		rwmzh();		
		zqshf();
		
		
		
		AllGz();
		ToggleTab();
		$("#year").numberbox({    
		    min:0,  
		    width:50,
		    max:Zdata.getFullYear(),
		    value:Zdata.getFullYear(),
		    onChange:function(){
		    	if($("#year").numberbox("getValue")!=''){
		    		init("yearOut");
					init("yearIn");
					yearOutIn();
					OYearOfNYear(1);
		    	}
				  
		    }
		   
	 	}); 
	
		OYearOfNYear(0);
		
		init("yearOut");
		init("yearIn");
		yearOutIn();
		
		for ( var int = 0; int <4; int++) {
			he(int);
		}
		
		//click
		xgysr();
		tjdnscb();
		xgdnscb();
		
});
	function ToggleTab(){
		$("#addndsc tr:eq(0)").click(function(){
			if($("#updTab").hasClass("NSeleTab")){
				$("#updTab").removeAttr("class");
				$("#addTab").attr("class","NSeleTab");
			}else {
				$("#addTab").removeAttr("class");
				$("#updTab").attr("class","NSeleTab");
			}
			$("#addNdscT").fadeToggle(0);
			$("#updNdscT").fadeToggle(0);
			
			
		});
	
		
	}

	/**
	 *年度时长 
	 */
	function AllGz(){
		$("#ndsc").html("");
		var q="<tr><td  align=\"center\">";
		var h="</td><td align=\"center\">";
		 $.ajax({
				type:"POST",
				url:"AllGz",
				//请求同步
				async: false,
				error: function() {
					$("#ndsc").append("<tr><td align=\"center\">服务器异常</td></tr>");
		            },
		   success: function(data) {
		        		if(data.length<=0){
		        			$("#ndsc").append("<tr><td  align=\"center\">暂无数据</td></tr>");
		        		}else{
		        			$.each(data,function(idnum,item){
		        				$("#ndsc").append(q+item.qnian+"年度"+h+item.qnian+"/"+item.qyue+"-"+(item.qnian+1)+"/"+item.zyue+"</td></tr>");
			        		}) ;		
		        		}
		        }
			});
		 
		
	}
	/**
	 * 修改月基本工资 出勤
	 */
	function xgysr(){
		$("#ysrType").change(function(){		
			if($("#ysrType").val()==1){
				$("#ysrYue").attr("disabled","disabled");
				$("#ysrChu").attr("disabled","disabled");
				return;
			}
			$("#ysrYue").removeAttr("disabled");
			$("#ysrChu").removeAttr("disabled");
		});
		$("#ysrNian").change(function(){
			WagesAllYueOfNian();
			WagesOfNy();
		});
		$("#ysrYue").change(function(){
			WagesOfNy();
		});
		$("#ysrxg").click(function(){
			var yjbgz=$("#ysrRjbgz").val();
			var chu=$("#ysrChu").val();
			if(yjbgz==""||chu==""){
				alert("请输入数据");
			}else{
				if(isNaN(chu)||isNaN(yjbgz)){
					alert("请输入数字");
					WagesOfNy();
				}else{
					var yue=$("#ysrType").val()==1?-1:$("#ysrYue").val();
				
					 $.ajax({
							type:"POST",
							url:"upWages",
							data:{"nian":$("#ysrNian").val(),"yue":yue,"yjbgz":yjbgz,"chu":chu},
							//请求同步
							async: false,
							error: function() {
								alert("服务器异常");
					            },
					        success: function(data) {
					        	if(!$("#xgysr input[name=lx]").get(0).checked){
					        		$("#op").fadeToggle(1000);
					        		$("#xgysr").fadeToggle(1000);
			        			}
					        	$('#sr').datagrid({url : 'sr.json?nys=0&type=null'});	
					        	alert("提交成功");					        	
					        	
					        		
					        }
					        
						});
				}
			}
		});
	}
	function OYearOfNYear(obj){
		var ynian=parseInt($("#year").numberbox("getValue"));
		var mm=M;
		if(obj!=0){
			mm=13;
		}
		$.ajax({
			type:"POST",
			url:"YearGzsc",
			data:{"nian":ynian,"yue":mm},//{"studid":studid}
			//请求同步
			async: false,
			error: function() {
	                alert("服务器异常,无法完成操作!");
	            },
	        success: function(data) {
	        	
	        		if(obj==0){
	        			if(data.kn){
		        			$("#year").numberbox("setValue",(Zdata.getFullYear()-1));
		        		}else{
		        			$("#year").numberbox("setValue",Zdata.getFullYear());
		        		}

        			}
	        		if(data.id!=0){
	        		
	        				$("#gzsc").html(data.qnian+"/"+data.qyue+"　至　"+(data.qnian+1)+"/"+data.zyue);
	        			if(data.kn){
	        				if(ynian!=(data.qnian+1)){
		        				$("#gzsc").html("暂未设置年度时长");
		        			}
	        			}	        			
	        			
	        		}else{
	        			$("#gzsc").html("暂未设置年度时长");
	        		}
	        }
	        
		});
		
	}
	function OfYears(){
		$.ajax({
			type:"POST",
			url:"OfYear",
			data:{"nian":$("#xgQnian").val()},
			//请求同步
			async: false,
			error: function() {
				$("#xfZnian").html("<option>服务器异常</option>");
	            },
	   success: function(data) {
		   $("#xgQyue").val(data.qyue);
			  $("#xgZyue").val(data.zyue);		   
	     }
		});
	}
	
	function he(int){
		var title_arr=["zqshf","tjjsr","addndsc","xgysr"];
		$("header ul li a:eq("+int+")").click(function(){
			$("#op").fadeToggle(1000);
			if($("#op").is(":hidden")!=$("#"+title_arr[int]).is(":hidden")){
				
				for ( var int2 = 0; int2 < title_arr.length; int2++) {
					$("#"+title_arr[int2]).css("display","none");
					
				}
				
				$("#"+title_arr[int]).fadeToggle(1000);	
				switch (int) {
				case 2:
					var yue;
					for ( var int2 = 1; int2 < 13; int2++) {
						yue+="<option value="+int2+">"+int2+"月</option>";						
					}		
					
					$("#TjQyue").html("");
					$("#TjZyue").html("");
					$("#xgQyue").html("");
					$("#xgZyue").html("");
					$("#TjQyue").html(yue);
					$("#TjZyue").html(yue);
					$("#xgQyue").html(yue);
					$("#xgZyue").html(yue);
					
					$("#TjZnian").attr("disabled","disabled");
					$.ajax({
						type:"POST",
						url:"AllGz",
						//请求同步
						async: false,
						error: function() {
							$("#xfZnian").html("<option>服务器异常</option>");
				            },
				   success: function(data) {
					   $("#xgQnian").html("");
					   $.each(data,function(idnum,item){
	        				$("#xgQnian").append("<option value="+item.qnian+">"+item.qnian+"年</option>");
	        				OfYears();
					   		}) ;	
											   
						  $("#xfZnian").html((parseInt($("#xgQnian").val())+1)+"年");
							$("#xgQnian").change(function(){
								OfYears();
							$("#xfZnian").html((parseInt($("#xgQnian").val())+1)+"年");
								
							});
							
				     }
					});
				
				
					$("#TjZnian").numberbox({    
					    min:0,  
					    width:50,
					    max:Zdata.getFullYear()+1,
					    value:Zdata.getFullYear()+1
				 	}); 
					$("#TjQnian").numberbox({    
					    min:0,  
					    width:50,
					    max:Zdata.getFullYear(),
					    value:Zdata.getFullYear(),
					    onChange:function(){
					    	var a=$("#TjQnian").numberbox("getValue");
					    	if(a!=''){
					    		$("#TjZnian").numberbox("setValue",(parseInt(a)+1));
					    	}else{
					    		$("#TjZnian").numberbox("setValue",'');
					    	}
					    }
				 	}); 
					
					break;
				case 3:
					WagesAllNian();
				
					break;
				}
			}
			
		});		
	}
	function tjdnscb(){
		$("#AddNdsc").click(function(){
			var qnian=$("#TjQnian").numberbox("getValue");
			var qyue=$("#TjQyue").val();
			var zyue=$("#TjZyue").val();
			//alert(qnian+"-"+qyue+"-"+zyue);
			
			$.ajax({
				type:"POST",
				url:"AddGz",
				data:{"qn":qnian,"qy":qyue,"zy":zyue},
				//请求同步
				async: false,
				error: function() {
					alert("服务器异常");
		            },
		   success: function(data) {
			   if(data==0){
				   alert("年度时长设置成功");
				   AllGz();
				   return;
			   }
			   if(data==-1){
				   alert("添加失败!!已经设置了"+qnian+"年度");
				   return;
			   }
				   alert("添加失败!!"+qnian+"年"+data+"月属于"+(qnian-1)+"年度");			   
		     }
			});
		});
	}
	function xgdnscb(){
		$("#UpNdsc").click(function(){
			var qnian=parseInt($("#xgQnian").val());
			var qyue=$("#xgQyue").val();
			var zyue=$("#xgZyue").val();
			//alert(qnian+"-"+qyue+"-"+zyue);
			
			$.ajax({
				type:"POST",
				url:"UpGz",
				data:{"qn":qnian,"qy":qyue,"zy":zyue},
				//请求同步
				async: false,
				error: function() {
					alert("服务器异常");
		            },
		   success: function(data) {  
			   if(data[0]==0){
				   alert("年度时长修改成功");
				   AllGz();
				   return;
			   }
			   if(data[0]==-1){
				   alert("修改失败!!"+qnian+"年"+data[1]+"月属于"+(qnian-1)+"年度");		
				   return;
			   }
				   alert("修改失败!!"+(qnian+1)+"年"+data[1]+"月属于"+(qnian+1)+"年度");			   
		     }
			});
		});
	}
	function AddJsr(){
		$("#tjjsr input[type=button]").click(function(){
			var name=$("#tjjsr input[type=text]").val();
			if(name==''){
				alert("请输入经手人姓名");
				return;
			}
			$.ajax({
				type:"POST",
				url:"AddJsr.action",
				data:"name="+name,//{"studid":studid}
				//请求同步
				async: false,
				error: function() {
		                alert("服务器异常,无法完成操作!");
		            },
		        success: function(data) {
		        		if(data==true){
		        			alert("经手人添加成功");
		        			if(!$("#tjjsr input[name=lx]").get(0).checked){
		        				$("#op").fadeToggle(1000);
		        				$("#tjjsr").fadeToggle(1000);
		        			}
		        		}else{
		        			alert("经手人添加失败");
		        		}
		        }
		        
			});
			
		});
	}
	/**
	 * 净收入
	 */
	function yearOutIn(){
		var In=parseFloat($("#yearInTd").html()).toFixed(2);
		var Out=parseFloat($("#yearOutTd").html()).toFixed(2);
		var InOut=(In-Out).toFixed(2);
		$("#yearInOutTd").html(InOut+"元");
		if(In!=0){			
			$("#szT").html("");
			$("#szT").attr( "title","总收入:"+In+"元");
			$("#szT").append("<div title='总收入:"+In+"元' style='width:270px;border-radius:20px; '>100.00%</div>");
			$("#szT").append("<div title='总支出:"+Out+"元' style='border: 1px solid #fff;width:"+((Out/In)*280)+"px;float: left;border-radius:0 0 0 20px;'>"+(Out/In*100).toFixed(2)+"%</div>");
			$("#szT").append("<div title='净收入:"+InOut+"元' style='border: 1px solid #fff;border-left:none;width:"+((InOut/In)*280)+"px;margin-right: -1px;float: right;border-radius:0 0  20px 0; '>"+(InOut/In*100).toFixed(2)+"%</div>");
			
		}else{
			$("#szT").html("暂无记录");
		}
		var color=["green","red","#0078d7"];
		for ( var int = 0; int < $("#szT div").size(); int++) {
			$("#szT div:eq("+int+")").css("background",color[int]);
		}
		
	}
	/**
	 * 时间
	 */
	function nowTime(){
		var time=new Date();
		
		var month=time.getMonth()+1;
		M=time.getMonth()+1;
		var dates=time.getDate();
		var hours=time.getHours();
		var minutes=time.getMinutes();
		var seconds=time.getSeconds();
		Zdata= new Date(time.getFullYear(),month,0);
		if(month<10){
			month="0"+(1+time.getMonth());
		}
		if(dates<10){
			dates="0"+time.getDate();
		}
		if(hours<10){
			hours="0"+time.getHours();
		}
		if(minutes<10){
			minutes="0"+time.getMinutes();
		}
		if(seconds<10){
			seconds="0"+time.getSeconds();
		}
		$("#nowTime").html(time.getFullYear()+"年"+month+"月"+
				dates+"日 "+time.getHours()+":"+minutes+":"+seconds);
	}
	/**
	 * 添加支取生活费
	 */
	function zqshf(){
		$('#data').datebox({    
		    required:true,
		    onSelect:function(){
		    	var data=$('#data').datebox('getValue'); 
		    	data=data.split("-");		    	
		    	Zdata= new Date(data[0],data[1],0);
		    	$('#chu').numberbox({    
				    min:0, 
				    max:Zdata.getDate(),
				    value:Zdata.getDate(),
				    width:33
				    
				});
		    }

		}); 
		$('#data').datebox('setValue', '.');
		$('#shf').numberbox({    
		    min:-1,  
		    value:-1,
		    precision:2,
		    prefix:"￥"
		});  
		$('#rjbgz').numberbox({    
		    min:0,    
		    value:216.6,
		    precision:2,
		    prefix:"￥"
		    
		});  
		$('#chu').numberbox({    
		    min:0, 
		    max:Zdata.getDate(),
		    value:Zdata.getDate(),
		    width:35
		    
		}); 
		$("#zqshf input[value='支取']").click(function(){
			var data=$('#data').datebox('getValue');
			var shf=$('#shf').numberbox('getValue');
			var rjbgz=$('#rjbgz').numberbox('getValue');
			var jsrid=$('#jsrid').val();
			var chu=$('#chu').numberbox('getValue');
			if(rjbgz==''){
				$('#rjbgz').numberbox('setValue',216.6);
			}
			if(shf==-1){
				alert("请输入支取的金额");
				return;
			}
		
			var map=data+"-"+rjbgz+"-"+shf+"-"+jsrid+"-"+chu;
			$.ajax({
				type:"POST",
				url:"AddShf",
				data:"map="+map,//{"studid":studid}
				//请求同步
				async: false,
				error: function() {
					alert("服务器错误");
		            },
		        success: function(data) {
		        	
		        	
		        	
		        		if(data>0){
		        			
				        	$('#shf').numberbox('setValue',-1);
		        			alert("生活费支取成功");
		        			if(!$("#zqshf input[name=lx]").get(0).checked){
		        				$("#op").fadeToggle(1000);
		        				$("#zqshf").fadeToggle(1000);
		        			}
		        			
		        			 init("yearOut");
		        			 init("yearIn");
				        	$('#sz').datagrid({url : 'name.json?nys=0&type=null'});	
				        	$('#sr').datagrid({url : 'sr.json?nys=0&type=null'});	
				        	
		        			
		        			
		        		}else {
		        			alert("生活费支取失败");
						}
		        }
		        
			});
			
		});
	}
	/**
	 * 二维码转换
	 */
	function rwmzh(){
		  //二维码
        rwm($("#ip").val()); 
        $("#cz").click(function(){
        	hdToggle(0);
        	$("#rwmText").fadeOut(1000);
        });
        
        $("#rwmText select[name=type]").change(
        	function(){
        		var a=$("#rwmText select[name=type]").val();
        		if(a==0){
        			$("#pt").css("display","block");
        			$("#WiFi").css("display","none");
        			$("#mp").css("display","none");
        		}
        		if(a==1){
        			$("#pt").css("display","none");
        			$("#WiFi").css("display","block");
        			$("#mp").css("display","none");
        		}
        		if(a==2){
        			$("#pt").css("display","none");
        			$("#WiFi").css("display","none");
        			$("#mp").css("display","block");
        		}
        	}
        );
        //网站文字
        $("#rwmb").click(function(){
        	var data=$("#rwmt").val();
        	if(data==''){
        		alert('请输入要转换的数据');
        		return;
        	}
        	$("#rwmText2").qrcode({ 
   	            render: "table", //table方式 
   	            width: 380, //宽度 
   	            height:380, //高度 
   	            background: "#ffffff",            //背景颜色
   	            foreground: "red",
   	            text: toUtf8(data) //任意内容 
   	        });
   		$("#rwmText2").fadeIn(1000);
        	
        });
        //wifi
        $("#WiFi input[name=WiFi]").click(function(){
        	var s=$("#WiFi input[name=S]").val();
        	var p=$("#WiFi input[name=P]").val();
        	var t=$("#WiFi select[name=T]").val();        	
        	if(s==''||p==''||t==''){
        		alert("请输入数据");
        		return;
        	}
        	var data="WIFI:S:"+s+";P:"+p+";T:"+t+";";
        	if($("#WiFi input[name=H]").get(0).checked){
        		data+="H:true";
        	}
       		 $("#rwmText2").qrcode({ 
       	            render: "table", //table方式 
       	            width: 380, //宽度 
       	            height:380, //高度 
       	            background: "#ffffff",            //背景颜色
       	            foreground: "red",
       	            text: toUtf8(data) //任意内容 
       	        });
       		$("#rwmText2").fadeIn(1000);
			
        });
      //名片
        $("#mp input[name=mp]").click(function(){
        	var n=$("#mp input[name=N]").val();
        	var tel=$("#mp input[name=TEL]").val();
        	var tel2=$("#mp input[name=TEL2]").val();
        	var Email=$("#mp input[name=Email]").val();
        	var ADR=$("#mp input[name=ADR]").val(); 
        	data="MECARD:";
        	if(n!=''){
        		data+="N:"+n+";";
        	}
        	if(tel!=''){
        		data+="TEL:"+tel+";";
        	}
        	if(tel!=''){
        		data+="TEL:"+tel2+";";
        	}
        	if(Email!=''){
        		data+="Email:"+Email+";";
        	}
        	if(n!=''){
        		data+="ADR:"+ADR+";";
        	}
       		 $("#rwmText2").qrcode({ 
       	            render: "table", //table方式 
       	            width: 380, //宽度 
       	            height:380, //高度 
       	            background: "#ffffff",            //背景颜色
       	            foreground: "red",
       	            text: toUtf8(data) //任意内容 
       	        });
       		$("#rwmText2").fadeIn(1000);
			
        });
        
        $('#rwmText2').click(function(){
        	$("#rwmText2").html("");
        	 $("#rwmText2").fadeOut(1000);
        });
      $('#ewm table').click(function(){
    	  $("#rwmText").fadeToggle(1000);
      });
	}
	/**
	 * 二维码滑动动画切换
	 * @param obj 为0时仅收起
	 */
	function hdToggle(obj){
		if($("#cz").html()=='展开'){
    		$("#ewm").animate({
        		left:'+=107px'
        	  });
    		$("#cz").html('收起');
    	}else if (obj==0){
    		$("#ewm").animate({
        		left:'-=107px'
        	  });
    		$("#cz").html('展开');
		}
	}
	/**
	 * 二维码生成
	 * @param obj
	 */
	function rwm(obj){
		//$('#code').html("");
		 $("#code").qrcode({ 
	            render: "table", //table方式 
	            width: 100, //宽度 
	            height:100, //高度 
	            background: "#ffffff",            //背景颜色
	            foreground: "red",
	            text: toUtf8(obj) //任意内容 
	        }); 
	}
	/**
	 * 解决中文转二维码乱码
	 * @param str
	 * @returns
	 */
	function toUtf8(str) {    
	    var out, i, len, c;    
	    out = "";    
	    len = str.length;    
	    for(i = 0; i < len; i++) {    
	        c = str.charCodeAt(i);    
	        if ((c >= 0x0001) && (c <= 0x007F)) {    
	            out += str.charAt(i);    
	        } else if (c > 0x07FF) {    
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));    
	            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));    
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
	        } else {    
	            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));    
	            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));    
	        }    
	    }    
	    return out;    
	} 
	/**
	 * 收入
	 * http://www.cnblogs.com/iaknehc/p/5968277.html
	 */
	function sr(){
        var yjgz=0;
        $('#sr').datagrid({
             url : 'sr.json?nys=0&type=null',
             method:'post',   //表格数据获取方式,请求地址是上面定义的url
             width:330,          
             toolbar:'#srDiv',//工具栏
             height:'auto',//表格高度
             pagination:true,//分页
             pageSize:10,   //表格中每页显示的行数
             pageList:[5,10,15,20],
             title:'月收入',
             iconCls: 'icon-edit',  //图标
             rownumbers:true,//是否显示行号
             remoteSort:false,//本地排序
             collapsible:true,//折叠  
             striped:true,           
             loadMsg : '数据加载中请稍后……',
             frozenColumns: [[  //固定在表格左侧的栏
                                   { field: 'nian', title: '　年',sortable: 'true', align:'center',
                                    formatter:function(value,row,index){
                                            if (row.user){
                                                return row.user.name;
                                            } else {
                                                return value+"年";
                                            }
                                        }

                                   }
                              ]],
             columns: [[  
                        { field: 'yue', title: '　　月　', sortable: 'true',align:'center',
                            formatter:function(value,row,index){
                                if (row.user){
                                    return row.user.name;
                                } else {
                                    if(value.yue<10){
                                        return 0+value+"月";
                                    }
                                    return value+"月";
                                }
                            }},  
                        { field: 'chu', title: '　出勤',sortable: 'true' ,align:'center',
                            formatter:function(value,row,index){
                                    if (row.user){
                                        return row.user.name;
                                    } else {
                                    	yjgz=value;
                                        return value;
                                    }
                                }   
                        },
                        { field: 'yjbgz', title: '　日工资　',sortable: 'true' ,align:'right',
                            formatter:function(value,row,index){
                                if (row.user){
                                    return row.user.name;
                                } else {
                                	yjgz*=value;
                                    return value.toFixed(2)+"元";
                                }
                            }   
                        },
                        { field: '', title: '　月工资　',align:'right',
                            formatter:function(value,row,index){
                               
                                    return yjgz.toFixed(2)+"元";
                                
                            }   }
                    ]],  
            
                         /**
                          * http://www.jb51.net/article/88256.htm
                          * 无数据时追加'暂无数据　　　　　'
                          * @param data
                          */
                        onLoadSuccess: function (data) {
                        	
                          if (data.total == 0) {
                            var body = $(this).data().datagrid.dc.body2;
                            body.find('table tbody').append('<tr><td width="188px" style="height: 30px;color:red; text-align: center;">暂无数据　　　　　</td></tr>');
                          }
                          
                        }

        });
        $('#srV').searchbox({ 
            searcher:function(value,name){              
                if(value==''){
                    $('#srV').searchbox({ prompt:'没有输入数据'});
                }else if(isNaN(value)||value==0){
                    $('#srV').searchbox({ value:''});
                    $('#srV').searchbox({ prompt:'仅允许输入大于0的数字'});
                }else{
                    SrBy(value,name);
                }           
            }, 
            menu:'#ms', 
            prompt:'请输入数据' ,            
            }); 
        $('#srAll').click(function(){
            $('#sr').datagrid({url : 'sr.json?nys=0&type=null'}); 
            $('#srV').searchbox({ prompt:'请输入数据'});
        });
    }
    
	/**
	 * 生活费支取记录
	 * http://www.cnblogs.com/iaknehc/p/5968277.html
	 */
	function shf(){
		
		$('#sz').datagrid({
			 url : 'shf.json?nys=0&type=null',
			 method:'post',   //表格数据获取方式,请求地址是上面定义的url
			 width:330,			 
			 toolbar:'#szDiv',//工具栏
			 height:'auto',//表格高度
			 pagination:true,//分页
			 pageSize:10,   //表格中每页显示的行数
			 pageList:[5,10,15,20],
			 title:'生活费支取记录',
			 iconCls: 'icon-edit',  //图标
			 rownumbers:true,//是否显示行号
			 remoteSort:false,//本地排序
			 collapsible:true,//折叠	
			 striped:true,			 
			 loadMsg : '数据加载中请稍后……',
			 columns: [[  
	                    { field: 'ri', title: '　　日　', sortable: 'true',align:'center',
	                    	formatter:function(value,row,index){
	            				if (row.user){
	            					return row.user.name;
	            				} else {
	            					if(value<10){
	            						value="0"+value;
	            					}
	            					return value+'日';
	            				}
            				}},  
	                    { field: 'jsr', title: '　经手人',align:'center',
	                    	formatter:function(value,row,index){
		            				if (row.user){
		            					return row.user.name;
		            				} else {
		            					return value.b_name;
		            				}
	            				}	
	                    },
	                    { field: 'shf', title: '　支取生活费　',sortable: 'true' ,align:'right',
	                    	formatter:function(value,row,index){
	            				if (row.user){
	            					return row.user.name;
	            				} else {
	            					return value.toFixed(2)+"元";
	            				}
            				}	}
	                ]],  
            frozenColumns: [[  //固定在表格左侧的栏
                               { field: 'ny', title: '　年月', align:'center',
                               	formatter:function(value,row,index){
                           				if (row.user){
                           					return row.user.name;
                           				} else {
                           					if(value.yue<10){
                           						return value.nian+"年"+0+value.yue+"月";
                           					}
                           					return value.nian+"年"+value.yue+"月";
                           				}
                       				}

                               }
               			  ]],
               			 /**
               			  * http://www.jb51.net/article/88256.htm
               			  * 无数据时追加'暂无数据　　　　　'
               			  * @param data
               			  */
               			onLoadSuccess: function (data) {
               			  if (data.total == 0) {
               			    var body = $(this).data().datagrid.dc.body2;
               			    body.find('table tbody').append('<tr><td width="188px" style="height: 30px;color:red; text-align: center;">暂无数据　　　　　</td></tr>');
               			  }
               			}

		});
		$('#szV').searchbox({ 
			searcher:function(value,name){ 				
				if(value==''){
					$('#szV').searchbox({ prompt:'没有输入数据'});
				}else if(isNaN(value)||value==0){
					$('#szV').searchbox({ value:''});
					$('#szV').searchbox({ prompt:'仅允许输入大于0的数字'});
				}else{
					ShfBy(value,name);
				}			
			}, 
			menu:'#mm', 
			prompt:'请输入数据' ,			
			}); 
        $('#zhfAll').click(function(){
        	$('#sz').datagrid({url : 'name.json?nys=0&type=null'});	
        	$('#szV').searchbox({ prompt:'请输入数据'});
        });
	}
	/**
	 * 按条件查询生活费
	 */
	function ShfBy(value,name){
		$('#sz').datagrid('loadData',{total:0,rows:[]});
		$('#sz').datagrid({
			
			url : 'name.json?nys='+value+"&type="+name,
			});	
		$('#sz').datagrid("reload");
		
		Toggles(5);
		
		
		
		$('#szV').searchbox({ value:''});
		
		if(name!='年月'){
			$('#szV').searchbox({ prompt:'关于"'+value+name+'"的查询结果'});
		}else{
			$('#szV').searchbox({ prompt:'关于"'+value[0]+'年'+value[1]+'月"的查询结果'});
		}
		
	}
	function ShfByNY(nian,yue,flg){
		var value=[nian,yue];
		ShfBy(value,"年月");
	}
	function ShfByN(nian,type,flg){
		var value=[nian];
		ShfBy(value,"年");
	}
	/**
	 * 按条件查询
	 */
	function SrBy(value,name){
		$('#sr').datagrid('loadData',{total:0,rows:[]});
		$('#sr').datagrid({
			
			url : 'sr.json?nys='+value+"&type="+name,
			});	
		$('#sr').datagrid("reload");
		Toggles(5);
		$('#srV').searchbox({ value:''});
		
		if(name!='年月'){
			$('#srV').searchbox({ prompt:'关于"'+value+name+'"的查询结果'});
		}else{
			$('#srV').searchbox({ prompt:'关于"'+value[0]+'年'+value[1]+'月"的查询结果'});
		}
		
	
		
	}
	function SrByNY(nian,yue,flg){
		var value=[nian,yue];
		SrBy(value,"年月");
	}
	function SrByN(nian,type,flg){
		var value=[nian];
		SrBy(value,"年");
	}
	
	/**
	 * 绘制圆饼图
	 * @param canvasId
	 * @param data_arr 比例数据
	 * @param color_arr 颜色
	 * @param text_arr 文字
	 */
	 function drawCircle(canvasId, data_arr, color_arr, text_arr,yua_arr){
         var ctx = $(canvasId).get(0).getContext("2d");  
         var c=4;//圆与canvas控件中间的差
         var radius = $(canvasId).get(0).height / 2 - 20; //半径  
         var ox = radius + 20, oy = radius + 20; //圆心  
         var width = 0, height = 0; //一个图例宽和高
         var posX =  0, posY = 0;   // 图例的位置 
         //var textX =  $(canvasId).get(0).width-18*text_arr.length, textY = $(canvasId).get(0).height-9*text_arr.length*2;  // 文字的位置 

         var startAngle = 0; //起始弧度  
         var endAngle = 0;   //结束弧度  
         for (var i = 0; i < data_arr.length; i++)  
         {  
             //绘制饼图  
             endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度  
             ctx.fillStyle = color_arr[i+2];  
             ctx.beginPath();  
             ctx.moveTo(ox, oy); //移动到到圆心  
             ctx.arc(ox, oy, radius, startAngle, endAngle, false);  
             ctx.closePath();  
             ctx.fill();  
             startAngle = endAngle; //设置起始弧度  

             //绘制比例图及文字  
            // ctx.fillStyle = color_arr[i];  
            // ctx.fillRect(posX, posY + 20 * i, width, height);  
            // ctx.moveTo(posX, posY + 20 * i);  
             //ctx.font = 'bold 12px 微软雅黑';    //斜体 30像素 微软雅黑字体  
             //ctx.fillStyle = color_arr[i]; //"#000000";  
           //  var percent = text_arr[i] + "：" + 100 * data_arr[i] + "%";  
             //var percent = text_arr[i] + "支取" + yua_arr[i] + "元";  
            // ctx.fillText(percent, textX, textY + 20 * i);  
         }  
     } 
	 /**
	  * 年度详细收/支表
	  * @param url 服务器地址
	  */
	 function init(url) {	
		 	var c=document.getElementById(url+"Canvas");
			var cxt=c.getContext("2d");
			cxt.clearRect(0,0,c.width,c.height);
		 	var data_arr = new Array(); //比例数据
			var color_arr1 = ["red","#91bec3", "#86bcd6", "#b4d5e8", "#cce0e7","#dbebea","#e8e8e8","#fff0eb","#e9c8cc","#eebbcc","#a48fb8","#61689f","#d7c4e0","#476a87","#cff7bf"]; //颜色
			var color_arr2 = ["green","#91bec3", "#f36a9a", "#23d3fe", "#3fef9b","#fca470","#def3df","#a1fabd","#d9b5f6","#63dbd2","#cff7bf","#e4d6be","#476a87","#183150","#96c2cb"]; //颜色
			var text_arr = new Array(); //文字
			var yua_arr = new Array(); //消费
			var isZ=url=="yearOut"?"支出":"收入";
			var clickFun=url=="yearOut"?"ShfByN":"SrByN";
			$.ajax({
				type:"POST",
				url:url+".json",
				data:"year="+$("#year").numberbox('getValue'),//{"studid":studid}
				//请求同步
				async: false,
				error: function() {
					$("#"+url).html("<div style='margin-left: -350px;font-size: 20px;height:260px;text-align:center;line-height:260px;width:500px'>服务器错误</div>");
		            },
		        success: function(data) {
		        		//将数据转换成json类型:var d = eval("("+data+")");
		        		var z=0;
		        		var znum=65*data.length;
		        		if(data.length<=0){
		        			$("#"+url).html("<div style='margin-left: -350px;font-size: 20px;height:260px;text-align:center;line-height:260px;width:500px'>暂无"+isZ+"记录</div>");
		        			

		        			$("#yearInTd").html("0.00元");
		        			$("#yearOutTd").html("0.00元");
		        		}else{
		        			$.each(data,function(idnum,item){
			        			
			        			z+=item.z;
			        		}) ;
			        		$("#"+url).html("");
			        		$.each(data,function(idnum,item){
			        			data_arr[idnum]=item.z/z;
			        			text_arr[idnum]=item.nian+"年"+item.yue+"月";
			        			yua_arr[idnum]=item.z;
			        			
			        			if(idnum==0){
			        				$("#"+url).append("<div value='"+item.nian+"-"+z+"' id='"+url+"Z' title='"+item.nian+"年度总"+isZ+":"+z+"元'  onclick='"+clickFun+"("+item.nian+",1)' style='margin-bottom: 5px;width:"+((item.z/z)*(znum-data.length-1)+70)+"px'>"+$("#year").numberbox('getValue')+"年度总"+isZ+":"+z+"元</div>");
			        			}
			        			
		        			$("#"+url).append("<div  title='"+item.nian+"年"+item.yue+"月"+isZ+""+item.z+"元' id='yueOut"+(idnum+1)+"' style='width:"+((item.z/z)*(znum-data.length-1))+"px;' onclick='"+clickFun+"Y("+item.nian+","+item.yue+",1)'>"+item.z+"元</div>");
			        		}) ;	
			        		$("#"+url+"Td").html(z.toFixed(2)+"元");
		        		}
		        			        		
		        		
		        }
		        
			});
			if(isZ=="支出"){
				for(a=0;a<$("#"+url+" div").size();a++){
					$("#"+url+" div:eq("+a+")").css("background",color_arr1[a+1]);
					$("#"+url+"Z").css("color",color_arr1[0]);					
				}
				 drawCircle("#"+url+"Canvas", data_arr, color_arr1, text_arr,yua_arr); 
			}else{
				for(a=0;a<$("#"+url+" div").size();a++){
					$("#"+url+" div:eq("+a+")").css("background",color_arr2[a+1]);
					$("#"+url+"Z").css("color",color_arr2[0]);
					
				}
				 drawCircle("#"+url+"Canvas", data_arr, color_arr2, text_arr,yua_arr); 
			}
			
			$("#"+url+" div:lt(2)").css("border-top","1px solid #fff");
			$("#"+url).css({"height":(20+1)*$("#yearOut div").size()+"px"});
      
  }  
	 /**
	  * 手机端
	  * @param obj
	  */
	 function Toggles(obj){
			var flg=$('header ul li:eq('+obj+')').val();
			var a=flg==0?1:0;
			var lr=obj==0?"R":"L";
			var xs=obj==0?"+":"-";
			var yc=obj==5?"+":"-";
			$('header ul li:eq('+obj+')').val(a);
				if(flg==0){
				$("#"+lr+"content").animate({
		        		left:xs+'=100%'
		        	  });
		        	  return;
				}
		        $("#"+lr+"content").animate({
		        		left:yc+'=100%'
		        	  });
		         
			}
	 
	 
	 function WagesAllNian(){
		 $("#ysrType").change(function(){
			 var flg=$("#ysrType").val();
			 if(flg==1){
				 $("#xgysr tr:eq(3)").fadeToggle(0);
				 $("#xgysr tr:eq(5)").fadeToggle(0);
			 }else{
				 $("#xgysr tr:eq(3)").fadeToggle(0);
				 $("#xgysr tr:eq(5)").fadeToggle(0);
			 }
		 });
		 $.ajax({
				type:"POST",
				url:"WagesAllNian",
				//请求同步
				async: false,
				error: function() {
					$("#ysrNian").append("<option>服务器异常</option>");
		            },
		        success: function(data) {
		        		
		        		if(data.length<=0){
		        			$("#ysrNian").append("<option>暂无数据</option>");
		        		}else{
		        			$("#ysrNian").html("");
		        			$.each(data,function(idnum,item){
			        			$("#ysrNian").append("<option>"+item+"</option>");
			        		}) ;
		        			WagesAllYueOfNian();
		        			
		        						$("#ysrNian").change(function(){
		        							WagesOfNy();
		        						});
		        						$("#ysrYue").change(function(){
		        							WagesOfNy();
		        						});
		        		}
		        				
		        			        		
		        		
		        }
		        
			});
		 
	 }
	 
	 function WagesAllYueOfNian(){
		 $("#ysrYue").html("");
		 $.ajax({
				type:"POST",
				url:"WagesAllYueOfNian",
				data:"nian="+$("#ysrNian").val(),
				//请求同步
				async: false,
				error: function() {
					$("#ysrYue").append("<option>服务器异常</option>");
		            },
		        success: function(data) {
		        		
		        		if(data.length<=0){
		        			$("#ysrYue").append("<option>暂无数据</option>");
		        		}else{
		        			$.each(data,function(idnum,item){
			        			$("#ysrYue").append("<option>"+item+"</option>");
			        		}) ;
		        			WagesOfNy();
		        			
		        			
		        		}
		        			        		
		        		
		        }
		        
			});
	 }
	 
	 function WagesOfNy(){
		 $.ajax({
				type:"POST",
				url:"WagesOfNy",
				data:{"nian":$("#ysrNian").val(),"yue":$("#ysrYue").val()},
				//请求同步
				async: false,
				error: function() {
					$("#ysrYue").append("<option>服务器异常</option>");
		            },
		        success: function(data) {
		        	$("#ysrRjbgz").val(data.yjbgz);
		        	$("#ysrChu").val(data.chu);
		        			        		
		        		
		        }
		        
			});
	 }
//	 function init() {	
//		 	var c=document.getElementById("test");
//			var cxt=c.getContext("2d");
//			cxt.clearRect(0,0,c.width,c.height);
//		 	var data_arr = new Array(); //比例数据
//			var color_arr = ["#91bec3", "#86bcd6", "#b4d5e8", "#cce0e7","#dbebea","#e8e8e8","#fff0eb","#e9c8cc","#eebbcc","#a48fb8","#61689f","#d7c4e0"]; //颜色
//			var text_arr = new Array(); //文字
//			var yua_arr = new Array(); //消费
//			
//			$.ajax({
//				type:"POST",
//				url:"yearOut.json",
//				data:"year="+$("#year").numberbox('getValue'),//{"studid":studid}
//				//请求同步
//				async: false,
//				error: function() {
//					$("#yearOut").html("服务器错误");
//		            },
//		        success: function(data) {
//		        		//将数据转换成json类型:var d = eval("("+data+")");
//		        		var z=0;
//		        		$.each(data,function(idnum,item){
//		        			
//		        			z+=item.z;
//		        		}) ;
//		        		$("#yearOut").html("");
//		        		$.each(data,function(idnum,item){
//		        			data_arr[idnum]=item.z/z;
//		        			text_arr[idnum]=item.nian+"年"+item.yue+"月";
//		        			yua_arr[idnum]=item.z;
//		        			
//		        			if(idnum==0){
//		        				$("#yearOut").append("<div title='"+item.nian+"年度总支出:"+z+"元'  onclick='ShfByN("+item.nian+")' style='margin-bottom: 5px;color:red;width:"+((item.z/z)*(600-data.length-1)+70)+"px'>"+$("#year").numberbox('getValue')+"年度总支出:"+z+"元</div>");
//		        				$("#yearOutDiv").css({"width":((item.z/z)*(600-data.length-1)+70)+"px",
//		        									  
//		        									});
//		        				
//		        			}
//		        			
//	        			$("#yearOut").append("<div  title='"+item.nian+"年"+item.yue+"月支取"+item.z+"元' id='yueOut"+(idnum+1)+"' style='width:"+((item.z/z)*(600-data.length-1))+"px;' onclick='ShfByNY("+item.nian+","+item.yue+")'>"+item.z+"元</div>");
//		        		}) ;
//		        		
//		        		
//		        }
//		        
//			});
//			
//			for(a=0;a<$("#yearOut div").size();a++){
//				$("#yearOut div:eq("+a+")").css("background",color_arr[a]);
//				
//			}
//			$("#yearOut div:lt(2)").css("border-top","1px solid #fff");
//			$("#yearOut").css({"height":(20+1)*$("#yearOut div").size()+"px"});
//         drawCircle("#test", data_arr, color_arr, text_arr,yua_arr);  
//     }  