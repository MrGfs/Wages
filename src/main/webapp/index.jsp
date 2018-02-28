<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>生活费</title>
	</head>
	<!--
    	作者：offline
    	时间：2017-09-25
    	描述：导入easyui
    -->
    <link rel="shortcut icon" href="img/back.jpg">
    
	<link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css">   
	<link rel="stylesheet" type="text/css" href="easyui/themes/icon.css">   
	<script type="text/javascript" src="easyui/jquery.min.js"></script>   
	<script type="text/javascript" src="js/jquery.qrcode.min.js"></script> 
	<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>  
	<script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>  
	
	
	<link href="css/index.css" type="text/css" rel="stylesheet"/>
	<script type="text/javascript" src="js/index.js"></script>
	
	<body>
		
		<center>
		
		<input type="hidden" id="ip" value="${ip }" >
		<header>
			<ul>
				<li style="border-left:none;"><a href="javascript:void(0)">支取生活费</a></li>
				<li><a href="javascript:void(0)">添加经手人</a></li>
				<li><a href="javascript:void(0)">设置工作时长</a></li>
				<li><a href="javascript:void(0)">修改出勤天数</a></li>
			</ul>
		</header>
		
		<div id="contentDiv">
			<!-- 左侧  -->
			<div class="content" style="min-width: 200px;">
				<div>
				<table width="200px" style="padding: 20px">
					<tr>
						<td colspan="2" align="center">年度收支</td>
					</tr>
					<tr style="color: green;">
						<td align="right">总收入:</td><td id="yearInTd" align="right">0元</td>
					</tr>
					<tr style="color: red">
						<td align="right">总支出:</td><td id="yearOutTd" align="right">0元</td>
					</tr>
					<tr style="color: #0078d7">
						<td align="right">净收入:</td><td id="yearInOutTd" align="right">0元</td>
					</tr>
				</table>
				<div id="szT" style="margin-top: 5px;">
					
				</div>
				<table id="ndsc" style="min-width: 200px;padding: 20px">				
				</table>
				</div>
			</div>
			<!-- 中间 -->
			<div class="content" style="padding-left: 0;min-width: 550px;">
				 <div>
					 <input id="year" type="text"/>年度收支明细图<br>
					 <font id="gzsc"></font>
					 <!-- 年收入图 -->
					 <div style="width:500px; height:300px;justify-content:center;align-items:center;display:-webkit-flex;" >
						 <canvas id="yearInCanvas" width="300" height="300"  >  
				                浏览器不支持canvas  
				            </canvas>             
						<div id="yearInDiv">
						<div id="yearIn" >			
						</div>
						</div>
				    </div>
				    <!-- 年生活费支取记录图 -->
					 <div style="width:500px; height:300px;justify-content:center;align-items:center;display:-webkit-flex;margin-top: 20px" >
						 <canvas id="yearOutCanvas" width="300" height="300" >  
				                浏览器不支持canvas  
				            </canvas>             
						<div id="yearOutDiv">
						<div id="yearOut" >			
						</div>
						</div>
					 </div>
				 </div>
			</div>
			<!-- 右侧 -->
			<div class="content" style="min-width: 280px">
				<div id="cdiv">
					<!-- 收入 -->
					<div id="srDiv" style="padding:5px">
						<div>
						<span> 查询:</span>
						<input id="srV" style="width:210px"/> 
						<div id="ms" > 
							<div data-options="name:'年'">年</div> 
							<div data-options="name:'月'">月</div> 
						</div> 
						<input id="srAll" type="button" value="查询全部" >
						</div>
					</div>
					<table  id="sr" >			
					</table>
					
					<!-- 生活费支取记录 -->
					<div id="szDiv" style="padding:5px;">
						<div>
						<span> 查询:</span>
						<input id="szV" style="width:210px"/> 
						<div id="mm"> 
							<div data-options="name:'年'">年</div> 
							<div data-options="name:'月'">月</div> 
							<div data-options="name:'日'">日</div> 
						</div> 
						<input id="zhfAll" type="button" value="查询全部" >
						</div>
					</div>
					<table  id="sz" >			
					</table>
				</div>
			</div>
		
		</div>		
		
		<!--二维码r -->
		<div id="ewm">
			<div id="codeD"><div id="code"></div></div> 
			<div id="cz">展开</div>
		</div>
		<div id="rwmText">
			<div >
			<h2>生成二维码</h2>
			类型:
			<select name="type">
				<option value=0>文字、网站</option>
				<option value=1>WiFi</option>
				<option value=2>名片</option>
			</select>
			
			<div id="pt">
			<textarea placeholder="请输入要转换的文字、网站" id="rwmt" style="width: 360px;height: 240px;outline:none;resize:none;" ></textarea><br>
			<input type="button" value="提交" id="rwmb">
			</div>
			<table id="WiFi" width="100%">
				<tr>
				 <td width="50%" align="right">网络名称:</td><td><input type="text" name="S"></td>
				</tr>
				<tr>
				 <td align="right">密码:</td><td><input type="password" name="P"></td>	
				</tr>
				<tr>
				 <td align="right">加密类型:</td><td><select name="T"><option value="WPA/WPA2">WPA/WPA2</option><option value="WEP">WEP</option></select><input type="checkbox" name="H">隐藏</td>
				</tr>
				<tr>
				 <td></td><td align="center"><input type="button" name="WiFi" value="WiFi"></td>
				</tr>
			</table>
			<table id="mp" width="100%">
				<tr>
				 <td align="right" width="50%">姓名:</td><td><input type="text" name="N"></td>
				</tr>
				<tr>
				 <td align="right">手机:</td><td><input type="text" name="TEL"></td>
				</tr>
				<tr>
				 <td align="right">电话:</td><td><input type="text" name="TEL2"></td>
				</tr>
				<tr>
				<td align="right">邮箱:</td><td><input type="text" name="Email"></td>
				</tr>
				<tr>
				 <td align="right">地址:</td><td><input type="text" name="ADR"></td>
				</tr>
				<tr>
				 <td></td><td  align="center"><input type="button" name="mp" value="名片"></td>
				</tr>
			</table>			
			</div>
		</div>
		<div id="rwmText2">
			
		</div>
		
		
		
		<!-- 时间 -->
		<div id="timeDiv"> 
			<div id="nowTime"></div>
		</div>
		
		
		</center>
	
		<div id="op">
			<!-- 支取生活费 -->
			<table id="zqshf" class="op">
			    <tr>
			    	<td align="center" colspan="2" style="font-size: 20px">支取生活费</td>
			    </tr>
			    <tr>
			    	<td height="10px" align="right" colspan="2"><input type="checkbox" name="lx"/>连续添加　&nbsp;&nbsp;</td>
			    </tr>
				<tr>
				 <td align="right">日期:</td><td><input id="data" type="text"/>  </td>
				</tr>
				<tr>
				 <td align="right">支取生活费:</td><td><input id="shf" type="text"/>  </td>
				</tr>
				<tr>
				 <td align="right">经手人:</td><td><select id="jsrid"><c:forEach items="${Broks }" var="Brok"><option value=${Brok.b_id }>${Brok.b_name }</option></c:forEach></select> </td>
				</tr>
				<tr>
				 <td align="right">日基本工资:</td><td><input id="rjbgz" type="text"/>  </td>
				</tr>
				
				<tr>
				 <td align="right">出勤天数:</td><td><input id="chu" type="text"/>&nbsp;天</td>
				</tr>
				<tr>
				 <td align="center" colspan="2"><input type="button" value="支取"/></td>
				</tr>
			</table>
			<!-- 添加经手人 -->
			<table id="tjjsr" class="op">
			   <tr>
			    	<td align="center" colspan="2" style="font-size: 20px">添加经手人</td>
			    </tr>
			    <tr>
			    	<td height="10px" align="right" colspan="2"><input type="checkbox" name="lx"/>连续添加　&nbsp;&nbsp;</td>
			    </tr>
				<tr>
				 <td align="right">经手人姓名:</td><td><input type="text"/>  </td>
				</tr>
				<tr>
				 <td align="center" colspan="2"><input type="button" value="支取"/></td>
				</tr>
			</table>
			<!-- 设置年度时长 -->
			<table id="addndsc" class="op">		
				<tr>
					<td align="center" id="addTab" style="border-radius:20px 0 0 0;cursor: pointer;">添加</td><td align="center" id="updTab" style="border-radius:0 20px 0 0;cursor: pointer;" class="NSeleTab">修改</td>
				</tr>	
				<tr>
					<td rowspan="10" colspan="2">
						<table id="addNdscT" width="100%" height="100%" style="padding:20px;">
							<tr>
								<td>开始年月:</td><td><input type="text" id="TjQnian">年</td><td><select id="TjQyue"></select>月</td>
							</tr>
							<tr>
								<td>结束年月:</td><td><input type="text" id="TjZnian">年</td><td><select id="TjZyue"></select>月</td>
							</tr>
							<tr>
								<td colspan="3" align="center"><input type="button" id="AddNdsc" value="添加"></td>
							</tr>
						</table>
						<table id="updNdscT" width="100%" height="100%" style="padding:20px;display:none">
							<tr>
								<td>开始年月:</td><td><select id="xgQnian"></select>年</td><td><select id="xgQyue"></select>月</td>
							</tr>
							<tr>
								<td>结束年月:</td><td id="xfZnian">年</td><td><select id="xgZyue"></select>月</td>
							</tr>
							<tr>
								<td colspan="3" align="center"><input type="button" id="UpNdsc" value="修改"></td>
							</tr>
						</table>
					</td>
				</tr>	
			</table>
			<!-- 修改月收入 -->
			<table id=xgysr class="op">
			   <tr>
			    	<td align="center" colspan="2" style="font-size: 20px">修改月收入</td>
			    </tr>
			    <tr>
			    	<td height="10px" align="right" colspan="2"><select id="ysrType"><option value=0>按月修改</option><option value=1>按年修改</option></select><input type="checkbox" name="lx"/>连续添加　&nbsp;&nbsp;</td>
			    </tr>
				<tr>
				 <td align="right">年:</td><td><select id="ysrNian"></select></td>
				</tr>
				<tr>
				 <td align="right">月:</td><td><select id="ysrYue"></select></td>
				</tr>
				<tr>
				 <td align="right">日基本工资:</td><td><input id="ysrRjbgz"  type="text"/></td>
				</tr>
				<tr>
				 <td align="right">出勤天数:</td><td><input id="ysrChu" type="text"/></td>
				</tr>
				<tr>
				 <td align="center" colspan="2"><input type="button" id="ysrxg" value="修改"/></td>
				</tr>
			</table>
			
		</div>
		


	</body>
</html>
