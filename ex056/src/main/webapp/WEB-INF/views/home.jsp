<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html >
<style type="text/css">
</style>
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/jquery-ui.css'/>" />
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/jqgrid/ui.jqgrid.css'/>" />
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/tree/ui.fancytree.css'/>" />
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/common/common.css'/>" />
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/common/main.css'/>" />
<link rel="stylesheet" media="screen" type="text/css" href="<c:url value='/css/common/sub.css'/>" />
<script type="text/javascript" src="<c:url value='/script/jquery-1.11.0.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jquery-ui.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jquery.blockUI.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jquery.message.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jqgrid/grid.locale-kr.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/jqgrid/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/tree/jquery.fancytree-all.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/lims.com.js'/>"></script>
<script type="text/javascript" src="<c:url value='/script/lims.com.grid.js'/>"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.0/jquery.validate.min.js" ></script> <!--validate-->
<script src="http://malsup.github.com/jquery.form.js"></script> <!--ajaxSubmit-->
<script type="text/javascript">
	$(function() {
		  listGrid('select.lims', 'listForm', 'listGrid');
		  
		  $("#listForm1").validate({
			  rules: {
				  name:{required:true, email:true},
		  		  password:{required:true, minlength:3, number:true}
			  },
			  messages:{
				  name:{
					  required:"name을 입력하세요!!",
					  email:"이메일 형식으로 입력하세요!!"
				  },
			  	  password:{
			  		  required:"password를 입력하세요!!",
			  		  minlength: "password를 3자 이상 입력해주세요!!",
			  		  number:"숫자만 입력해주세요!!"

			  	  }		  
			  },
			  submitHandler: function (frm){
				  	console.log(frm)
	                frm.submit();  
	            }


		  	  	
			  
		  })
		  
	});
	
	function listGrid(url, form, grid) {
		
		$('#' + grid).jqGrid({
			datatype : function(json) {			
				fnGridData(url, form, grid);
			},
			height : '200',
			width:'auto',
			loadonce : true,
			mtype : "POST",
			gridview : true,
			shrinkToFit : false,
			rowNum : -1,
			rownumbers : false,
			colModel : [{
				type : 'not',
				label : '<input type="checkbox" id="chk"  />',
				name : 'chk',
				width : '40',
				sortable : false,
				align : 'center',
				formatter : "checkbox",
				formatoptions : {
					disabled : false
				}
			}, {
				label : '이름',
				name : 'name',
				align : 'center',
				key: true,
				editable:false,
				width : '300'
			}, {
				label : '비밀번호',
				name : 'password',
				width : '300',
				editable:true,
				align : 'center'
			}],
			
			gridComplete : function() {				
			},
			onSortCol : function(index, iCol, sortorder) {		
			},
			onSelectRow : function(rowId, status, e) {
				$("#name").val(rowId);
				$("#password").val($("#listGrid").jqGrid('getCell',rowId,'password'));
				
			},
			ondblClickRow : function(rowId, iRow, iCol, e) {
			
				$("#listGrid").setCell(rowId, 'chk', 'Yes');
				$("#listGrid").jqGrid('editRow',rowId,'password',true);
				var colModel = $("#listGrid").jqGrid('getGridParam', 'colModel');
			  
				console.log(colModel);	
				
			}
		});
	}
	
	function finding(){
		$('#listGrid').trigger('reloadGrid');
	}
	
	function updating(){
		var ids = $('#listGrid').jqGrid("getDataIDs");
		var data="";
		var b = false
		fnEditRelease('listGrid')
		if (ids.length > 0) {
			for ( var i in ids) {
				console.log(i)
				var row = $('#listGrid').getRowData(ids[i]);
				if (row.chk == 'Yes') {
					for(var colum in row){
						
						data=data+colum+","+row[colum]+"/";	
					}
					data=data+"#"
					b=true;			
				}
			}
		}
		if(b){
			console.log(data)
			var json=fnAjaxAction("update.lims","gridData="+data);
			if(json != null){
				alert("수정완료");
				$('#listGrid').trigger('reloadGrid');
			}
		}
	}
	
	
	
	function deleting(){
		var ids = $('#listGrid').jqGrid("getDataIDs");
		var data="";
		var b = false
		if (ids.length > 0) {
			for ( var i in ids) {
				var row = $('#listGrid').getRowData(ids[i]);
				if (row.chk == 'Yes') {
					data=data+row.name+",";
					b=true;			
				}
			}
		}
		if(b){
			var json=fnAjaxAction("delete.lims","name="+data);
			if(json != null){
				alert("삭제완료");
				$('#listGrid').trigger('reloadGrid');
			}
		}
	}
	

	function excel_download(){
	location.href="excel.lims"	
	}
	
	function mailSendTest(){
		$("#sendMail").ajaxSubmit({
			url :"mailsend",
			type : "POST",
		
			// data : $('#' + form).serialize(),
			success : function(json) {
				if(json!=null){
					alert("메일 전송 성공")
				}
				else{
					alert("실패")
				}
			}
		});
	}
	
	
	
	function jsonTest() {
		$.ajax({
			url:"jsonTest ",
			type:"post",
			data:$("#listForm1").serialize(),
			success: function (data){
				console.log(data.data)
				$("#jsonDiv").append(JSON.stringify(data.data))
			}			
		})		
	}
	

	function file_download(){
	location.href="download.lims"	
	}
	


</script>
<div style="margin-top:10%">
<form id="listForm" style="text-align: center;">
찾을 아이디:<input type="text" name="name" style="width:300px">
<button type="button" onclick="finding()">조회</button>
<button type="button" onclick="updating()">수정</button>
<button type="button" onclick="deleting()">삭제</button>
<button type="button" onclick="excel_download()">엑셀 다운로드</button>
</form>
<br>
<table id="listGrid"></table>
<br>
<br>
<div style="text-align: center;">
<form id="listForm1" action="insert.lims" method="post" >
아이디:<input type="text" name="name" id="name" style="width:300px"><br>
비밀번호:<input type="text" name="password" id="password" style="width:300px"><br>
<button type="submit">버튼</button>
</form>
<br>
<br>
<p>!!!메일전송!!!</p>
<form id="sendMail"  enctype="multipart/form-data">
받는사람:<input type="text" name="receiver" style="width:100px"> <br>
<input type="file" name="filename"><br>
<input type="button" value="전송" onclick="mailSendTest()" >
</form>
<br>
<button type="button" onclick="file_download()">파일 다운로드</button>
<br>
<br>
<a href="https://kauth.kakao.com/oauth/authorize?client_id=2cbd96c40bfa19c8f948ecf821fb0b82&redirect_uri=http://localhost:8181/wk123/kakaoLogin&response_type=code&prompt=login">카카오 로그인 테스트</a>
/ <a href="${naverLoginUrl}">네이버 로그인 테스트</a>
<br>
<br>
<button type="button" onclick="jsonTest()">JSON통신 테스트</button>
<div id="jsonDiv"></div>
<br>
<br>		
<p>!!!웹채팅!!!</p>

<textarea id="messageTextArea" readonly="readonly" rows="10" cols="45"></textarea><br />
<!-- 송신 메시지 텍스트박스 -->
<input type="text" id="messageText" style="width:200px"/>
<!-- 송신 버튼 -->
<input type="button" value="Send" onclick="sendMessage()" />

<script type="text/javascript">
//웹소켓 초기화
var webSocket = new WebSocket("ws://localhost:8181/wk123/broadsocket"); //진짜 통신을 하기 위해서는 localhost가 아닌 실제 ip를 적어야 한다!
var messageTextArea = document.getElementById("messageTextArea");
//메시지가 오면 messageTextArea요소에 메시지를 추가한다.
webSocket.onmessage = function processMessge(message){
//Json 풀기
var jsonData = JSON.parse(message.data);
if(jsonData.message != null) {
messageTextArea.value += jsonData.message + "\n"
};
}
//메시지 보내기
function sendMessage(){
var messageText =document.getElementById("messageText");

webSocket.send("${uid}:"+messageText.value);
messageText.value = "";
}


</script>
</div>
</div>




